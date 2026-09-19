import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  X, 
  RotateCcw, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Radio, 
  ExternalLink,
  Brain,
  MessageSquare
} from 'lucide-react';
import { 
  processFarmerVoiceQuery, 
  SupportedLanguage, 
  VoiceAgentResponse,
  detectLanguageFromText 
} from '../services/voiceAgentEngine';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  displayText?: string;
  language: SupportedLanguage;
  action?: string;
  actionLabel?: string;
  timestamp: string;
}

type AgentState = 'IDLE' | 'LISTENING' | 'THINKING' | 'SPEAKING';

export const VoiceAgent: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  // UI State
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    return typeof window !== 'undefined' && (window.location.search.includes('voice=open') || window.location.hash === '#voice-agent');
  });
  const [agentState, setAgentState] = useState<AgentState>('IDLE');
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [lastSpeechAnswer, setLastSpeechAnswer] = useState<string>('');
  const [lastSpeechLang, setLastSpeechLang] = useState<SupportedLanguage>('en');

  // Speech Recognition & Audio Streaming Ref
  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const isStoppingRef = useRef<boolean>(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Initialize Welcome Message
  useEffect(() => {
    const welcome = getWelcomeMessage(language as SupportedLanguage);
    setChatLog([welcome]);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const autoAsk = params.get('ask');
      if (autoAsk === 'hi_yellow') {
        setTimeout(() => {
          handleUserQuery('मेरी फसल की पत्तियाँ पीली हो रही हैं। मुझे क्या करना चाहिए?');
        }, 500);
      } else if (autoAsk === 'wrong_crop') {
        setTimeout(() => {
          handleUserQuery('What is wrong with this crop?');
        }, 500);
      }
    }
  }, [language]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatLog, agentState]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  function getWelcomeMessage(lang: SupportedLanguage): ChatMessage {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (lang === 'te') {
      return {
        id: 'welcome',
        sender: 'agent',
        text: 'నమస్కారం! నేను మీ క్రాప్ షీల్డ్ AI వాయిస్ అసిస్టెంట్. మీ పంటల ఆకులు పసుపు రంగులోకి మారడం, తెగుళ్ల నిర్ధారణ, సరైన మందుల మోతాదు లేదా వాతావరణం గురించి నాతో మాట్లాడండి.',
        displayText: 'నమస్కారం రైతు సోదరులారా! మైక్రోఫోన్ బటన్ నొక్కి మీ సహజ స్వరంతో నన్ను ఏదైనా ప్రశ్న అడగండి.',
        language: 'te',
        timestamp: time
      };
    }
    if (lang === 'hi') {
      return {
        id: 'welcome',
        sender: 'agent',
        text: 'नमस्ते! मैं आपका क्रॉप शील्ड AI वॉइस असिस्टेंट हूँ। पत्तियों के पीले पड़ने, बीमारी की पहचान, कीटनाशक की मात्रा या मौसम के बारे में बेझिझक बोलकर पूछें।',
        displayText: 'नमस्ते किसान भाइयों! माइक्रोफ़ोन दबाकर अपनी आवाज़ में कोई भी सवाल पूछें।',
        language: 'hi',
        timestamp: time
      };
    }
    return {
      id: 'welcome',
      sender: 'agent',
      text: 'Hello farmer! I am your Crop Shield AI Voice Assistant. Tap the microphone and speak naturally to ask about yellowing leaves, crop diseases, spray windows, or pesticide dosages.',
      displayText: 'Welcome to Crop Shield AI Voice Assistant. Tap the mic or choose a starter question below to talk with Crop Shield.',
      language: 'en',
      timestamp: time
    };
  }

  // High-fidelity audio stream player for Telugu / Hindi when browser TTS voice is absent
  const playAudioStream = (text: string, lang: SupportedLanguage) => {
    try {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }

      const url = `/api/tts?lang=${lang}&text=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audioPlayerRef.current = audio;

      audio.onplay = () => setAgentState('SPEAKING');
      audio.onended = () => {
        setAgentState('IDLE');
        audioPlayerRef.current = null;
      };
      audio.onerror = () => {
        setAgentState('IDLE');
        audioPlayerRef.current = null;
      };

      audio.play().catch(() => {
        setAgentState('IDLE');
        audioPlayerRef.current = null;
      });
    } catch {
      setAgentState('IDLE');
    }
  };

  // Speak text using browser Web Speech Synthesis with streaming fallback
  const speakText = (text: string, lang: SupportedLanguage) => {
    if (!text || !text.trim()) return;

    stopSpeaking();
    setLastSpeechAnswer(text);
    setLastSpeechLang(lang);

    const targetLang: SupportedLanguage = 
      (lang === 'te' || /[\u0C00-\u0C7F]/.test(text)) ? 'te' : 
      (lang === 'hi' || /[\u0900-\u097F]/.test(text)) ? 'hi' : 'en';

    const hasSynth = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const voices = hasSynth ? window.speechSynthesis.getVoices() : [];

    // For Telugu: specifically check if a genuine Telugu voice exists
    if (targetLang === 'te') {
      const teluguVoice = voices.find((v) => 
        v.lang === 'te-IN' || 
        v.lang.startsWith('te') || 
        v.name.toLowerCase().includes('telugu') || 
        v.name.includes('తెలుగు') ||
        v.name.includes('Mohan') ||
        v.name.includes('Shruti')
      );

      // If no native Telugu voice installed on user's machine, stream authentic audio from server
      if (!teluguVoice) {
        playAudioStream(text, 'te');
        return;
      }

      setAgentState('SPEAKING');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = teluguVoice;
      utterance.lang = 'te-IN';
      utterance.rate = 0.90;
      utterance.pitch = 1.0;

      utterance.onend = () => setAgentState('IDLE');
      utterance.onerror = () => {
        playAudioStream(text, 'te');
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // For Hindi
    if (targetLang === 'hi') {
      const hindiVoice = voices.find((v) => 
        v.lang === 'hi-IN' || 
        v.lang.startsWith('hi') || 
        v.name.toLowerCase().includes('hindi') || 
        v.name.includes('हिन्दी') ||
        v.name.includes('Kalpana') ||
        v.name.includes('Hemant')
      );

      if (!hindiVoice) {
        playAudioStream(text, 'hi');
        return;
      }

      setAgentState('SPEAKING');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onend = () => setAgentState('IDLE');
      utterance.onerror = () => {
        playAudioStream(text, 'hi');
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // For English
    if (hasSynth) {
      setAgentState('SPEAKING');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => setAgentState('IDLE');
      utterance.onerror = () => {
        playAudioStream(text, 'en');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      playAudioStream(text, 'en');
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      } catch (_) {}
      audioPlayerRef.current = null;
    }
    if (agentState === 'SPEAKING') {
      setAgentState('IDLE');
    }
  };

  // Replay the last AI voice answer
  const handleReplayAnswer = () => {
    if (lastSpeechAnswer) {
      speakText(lastSpeechAnswer, lastSpeechLang);
    }
  };

  // Start Voice Recognition (Speech-to-Text)
  const startListening = () => {
    stopSpeaking();
    isStoppingRef.current = false;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(language === 'te' 
        ? 'ఈ బ్రౌజర్‌లో మైక్రోఫోన్ వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి కింద ఉన్న టెక్స్ట్ బాక్స్‌లో టైప్ చేయండి లేదా ప్రశ్నను ఎంచుకోండి.' 
        : 'Speech recognition is not supported in this browser. Please use the text input below.');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      // Set recognition locale according to selected language
      if (language === 'te') {
        recognition.lang = 'te-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setAgentState('LISTENING');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          handleUserQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setAgentState('IDLE');
        if (event.error === 'no-speech' || event.error === 'network' || event.error === 'not-allowed') {
          const errorMsg = language === 'te'
            ? 'వాయిస్ వినపడలేదు. దయచేసి మైక్ నొక్కి స్పష్టంగా మాట్లాడండి లేదా కింద ఉన్న ప్రశ్నను ఎంచుకోండి.'
            : language === 'hi'
            ? 'आवाज नहीं पहचानी जा सकी। कृपया दोबारा बोलें या नीचे दिया गया प्रश्न चुनें।'
            : 'Could not capture speech. Please tap the mic again or choose a question below.';
          
          setChatLog((prev) => [
            ...prev,
            {
              id: `system-${Date.now()}`,
              sender: 'agent',
              text: errorMsg,
              language: language as SupportedLanguage,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      };

      recognition.onend = () => {
        if (!isStoppingRef.current && agentState === 'LISTENING') {
          setAgentState('IDLE');
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Recognition error:', err);
      setAgentState('IDLE');
    }
  };

  // Stop Voice Recognition
  const stopListening = () => {
    isStoppingRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setAgentState('IDLE');
  };

  // Process User Query (from Voice or Text Input)
  const handleUserQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    stopSpeaking();
    stopListening();

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const detectedLang = detectLanguageFromText(queryText, language as SupportedLanguage);

    // If user spoke in Telugu or Hindi, automatically sync the application language
    if (detectedLang !== language) {
      setLanguage(detectedLang);
    }

    // Append user message to log
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      language: detectedLang,
      timestamp
    };

    setChatLog((prev) => [...prev, userMsg]);
    setAgentState('THINKING');

    // Simulate natural AI thinking latency (300-600ms)
    await new Promise((r) => setTimeout(r, 450));

    // Retrieve latest crop diagnostic scan from window memory
    let recentScan = undefined;
    if (typeof window !== 'undefined' && (window as any).__LATEST_CROP_SCAN__) {
      const sc = (window as any).__LATEST_CROP_SCAN__;
      const sa = sc.structuredAnalysis;
      recentScan = {
        cropName: sa?.crop || sc.diagnosis.crop,
        cropName_te: sa?.crop_te || sc.diagnosis.crop_te,
        cropName_hi: sa?.crop_hi || sc.diagnosis.crop_hi,
        conditionName: sa?.disease?.name || sa?.pest?.name || sc.diagnosis.name,
        conditionName_te: sa?.disease?.name_te || sa?.pest?.name_te || sc.diagnosis.name_te,
        conditionName_hi: sa?.disease?.name_hi || sa?.pest?.name_hi || sc.diagnosis.name_hi,
        healthStatus: sa?.healthStatus,
        isHealthy: sa?.healthStatus === 'healthy' || sc.diagnosis.id?.includes('_healthy'),
        severity: sa?.disease?.severity || sc.metrics?.severity || 'Moderate',
        confidence: Math.round((sa?.healthConfidence || 0.94) * 100),
        remedy: sa?.treatmentOptions?.[0]?.activeIngredient || sc.diagnosis.chemicalRemedies?.[0]?.activeIngredient
      };
    }

    // Generate intelligent agricultural response
    const agentResponse: VoiceAgentResponse = processFarmerVoiceQuery(
      queryText,
      detectedLang,
      recentScan
    );

    const agentMsg: ChatMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      text: agentResponse.speechText,
      displayText: agentResponse.displayText,
      language: agentResponse.language,
      action: agentResponse.action,
      actionLabel: agentResponse.actionLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLog((prev) => [...prev, agentMsg]);

    // Speak the answer aloud
    speakText(agentResponse.speechText, agentResponse.language);
  };

  // Trigger quick prompt
  const handlePromptClick = (promptText: string) => {
    handleUserQuery(promptText);
  };

  // Handle action navigation
  const handleActionClick = (action?: string) => {
    if (!action) return;

    let targetId = '';
    if (action === 'OPEN_SCANNER') targetId = '#crop-scanner';
    else if (action === 'OPEN_DOSAGE') targetId = '#dosage-calculator';
    else if (action === 'OPEN_WEATHER') targetId = '#weather-risk';
    else if (action === 'OPEN_SHOPS') targetId = '#crop-health-map';
    else if (action === 'OPEN_REVIEWS') targetId = '#farmer-reviews';

    if (targetId) {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
      }
    }
  };

  // Suggested questions based on language
  const suggestedQuestions = language === 'te' 
    ? [
        'పురుగు మందు మోతాదు ఎంత కలపాలి?',
        'నా పంట ఆకులు పసుపు రంగులోకి మారుతున్నాయి. ఏమి చేయాలి?',
        'వరిలో అగ్గితెగులు నివారణ ఏమిటి?',
        'పత్తిలో గులాబీ రంగు పురుగు మందు ఏమిటి?',
        'మిరపలో నల్ల తామర పురుగు నివారణ ఏమిటి?',
        'ఈరోజు మందు పిచికారీ చేయవచ్చా?',
        'పురుగులకు సేంద్రీయ నివారణ ఏమిటి?',
        'సమీప ఎరువుల దుకాణం ఎక్కడ ఉంది?'
      ]
    : language === 'hi'
    ? [
        'मेरी फसल की पत्तियाँ पीली हो रही हैं। मुझे क्या करना चाहिए?',
        'इस फसल में क्या खराबी है?',
        'क्या आज कीटनाशक का छिड़काव सुरक्षित है?',
        'कीटों का प्राकृतिक जैविक उपाय क्या है?',
        'नजदीकी खाद व कीटनाशक दुकान कहां है?'
      ]
    : [
        'My crop has yellow leaves. What should I do?',
        'What is wrong with this crop?',
        'Can I spray pesticide today?',
        'What natural remedies work for pests?',
        'Where can I buy pesticides and fertilizer?'
      ];

  return (
    <>
      {/* =================================================================== */}
      {/* 1. FLOATING LAUNCHER BUTTON: 🎙️ Talk to Crop Shield */}
      {/* =================================================================== */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <button
            id="crop-shield-voice-launcher"
            data-voice-launcher="true"
            onClick={() => {
              setIsOpen(true);
              startListening();
            }}
            className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white font-black text-sm sm:text-base px-5 py-3.5 rounded-full shadow-2xl hover:shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-emerald-300/80 cursor-pointer"
            title="Speak with Crop Shield Voice Agent"
          >
            {/* Ambient Pulse Ping */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300"></span>
            </span>

            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>

            <span className="tracking-wide font-black">
              {language === 'te' 
                ? '🎙️ మాట్లాడండి (Talk to Crop Shield)' 
                : language === 'hi' 
                ? '🎙️ बात करें (Talk to Crop Shield)' 
                : '🎙️ Talk to Crop Shield'}
            </span>
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. EXPANDED VOICE AGENT MODAL / DIALOGUE SHEET */}
      {/* =================================================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
          <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl border-2 border-emerald-200 shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-emerald-300">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg tracking-tight">
                      {language === 'te' 
                        ? 'క్రాప్ షీల్డ్ AI వాయిస్ అసిస్టెంట్' 
                        : language === 'hi' 
                        ? 'क्रॉप शील्ड AI वॉइस असिस्टेंट' 
                        : 'Crop Shield AI Voice Assistant'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-black uppercase tracking-wider border border-emerald-400/30">
                      Live AI
                    </span>
                  </div>
                  <p className="text-xs text-emerald-100/90 font-medium">
                    {language === 'te' ? 'రైతుల కోసం స్వర ఆధారిత సలహాదారు' : language === 'hi' ? 'किसानों के लिए आवाज आधारित सहायक' : 'Natural voice agricultural pair assistant'}
                  </p>
                </div>
              </div>

              {/* Language Switcher & Close */}
              <div className="flex items-center gap-2">
                {/* Language Pills */}
                <div className="hidden sm:flex items-center bg-black/25 rounded-xl p-1 border border-white/15 text-xs font-bold">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      language === 'en' ? 'bg-white text-emerald-900 shadow-xs' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('te')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      language === 'te' ? 'bg-white text-emerald-900 shadow-xs' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => setLanguage('hi')}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      language === 'hi' ? 'bg-white text-emerald-900 shadow-xs' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => {
                    stopSpeaking();
                    stopListening();
                    setIsOpen(false);
                  }}
                  className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Close Voice Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dynamic Status Indicator Banner */}
            <div className={`py-2.5 px-4 text-xs font-black flex items-center justify-between border-b transition-colors ${
              agentState === 'LISTENING' 
                ? 'bg-amber-50 text-amber-900 border-amber-200' 
                : agentState === 'THINKING'
                ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                : agentState === 'SPEAKING'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                {agentState === 'LISTENING' && (
                  <>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-4 bg-amber-600 rounded-full animate-bounce"></span>
                      <span className="w-2 h-6 bg-amber-600 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                      <span className="w-2 h-3 bg-amber-600 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                    <span className="text-sm font-black text-amber-900">
                      {language === 'te' ? 'వినబడుతోంది... (Listening...)' : language === 'hi' ? 'सुन रहा है... (Listening...)' : 'Listening... Speak now'}
                    </span>
                  </>
                )}

                {agentState === 'THINKING' && (
                  <>
                    <Brain className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span className="text-sm font-black text-indigo-900">
                      {language === 'te' ? 'ఆలోచిస్తోంది... (Thinking...)' : language === 'hi' ? 'विचार कर रहा है... (Thinking...)' : 'Thinking... Analyzing agricultural knowledge'}
                    </span>
                  </>
                )}

                {agentState === 'SPEAKING' && (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span className="text-sm font-black text-emerald-900">
                      {language === 'te' ? 'క్రాప్ షీల్డ్ మాట్లాడుతోంది... (Crop Shield is speaking...)' : language === 'hi' ? 'क्रॉप शील्ड बोल रहा है... (Crop Shield is speaking...)' : 'Crop Shield is speaking...'}
                    </span>
                  </>
                )}

                {agentState === 'IDLE' && (
                  <>
                    <Radio className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-600">
                      {language === 'te' ? 'మైక్ నొక్కి మాట్లాడండి లేదా ప్రశ్నను ఎంచుకోండి' : language === 'hi' ? 'माइक दबाकर बोलें या सवाल चुनें' : 'Tap the microphone or choose a question below'}
                    </span>
                  </>
                )}
              </div>

              {/* Stop Speaking / Replay Button */}
              {agentState === 'SPEAKING' ? (
                <button
                  onClick={stopSpeaking}
                  className="px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer"
                >
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'ఆపండి' : language === 'hi' ? 'रोकें' : 'Stop Audio'}</span>
                </button>
              ) : lastSpeechAnswer ? (
                <button
                  onClick={handleReplayAnswer}
                  className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-black flex items-center gap-1 transition-all cursor-pointer"
                  title="Replay Voice"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'మళ్లీ వినండి' : language === 'hi' ? 'दोबारा सुनें' : 'Replay Voice'}</span>
                </button>
              ) : null}
            </div>

            {/* Chat Transcript Feed */}
            <div 
              ref={chatScrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50 min-h-[220px]"
            >
              {chatLog.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'agent' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-xs text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white font-medium rounded-tr-xs'
                      : 'bg-white border-2 border-slate-200/80 text-slate-900 rounded-tl-xs'
                  }`}>
                    {/* User / Agent Label */}
                    <div className="flex items-center justify-between gap-3 mb-1 text-[10px] font-bold opacity-75">
                      <span>{msg.sender === 'user' ? 'You' : 'Crop Shield AI'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    {/* Message Body */}
                    <div className="whitespace-pre-line font-normal">
                      {msg.displayText || msg.text}
                    </div>

                    {/* Replay & Action Button if Agent Message */}
                    {msg.sender === 'agent' && (
                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => speakText(msg.text, msg.language)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200 transition-all cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Listen'}</span>
                        </button>

                        {msg.action && msg.action !== 'NONE' && (
                          <button
                            onClick={() => handleActionClick(msg.action)}
                            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                          >
                            <span>{msg.actionLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Voice Prompt Starter Chips */}
            <div className="p-3 bg-white border-t border-slate-200 overflow-x-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-1.5 px-1">
                {language === 'te' ? 'రైతు ప్రాచుర్య ప్రశ్నలు (Tap to ask):' : language === 'hi' ? 'किसानों के सामान्य सवाल (Tap to ask):' : 'Popular Farmer Questions (Tap to ask):'}
              </span>
              <div className="flex items-center gap-1.5 flex-nowrap pb-1">
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(q)}
                    className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-900 border border-slate-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Mic Controls & Text Fallback Footer */}
            <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
              {/* Large Microphone Action Button */}
              <button
                onClick={() => {
                  if (agentState === 'LISTENING') {
                    stopListening();
                  } else {
                    startListening();
                  }
                }}
                className={`w-13 h-13 rounded-2xl flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-md ${
                  agentState === 'LISTENING'
                    ? 'bg-red-600 text-white ring-4 ring-red-200 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={agentState === 'LISTENING' ? 'Stop Speaking' : 'Start Speaking'}
              >
                {agentState === 'LISTENING' ? (
                  <MicOff className="w-6 h-6" />
                ) : (
                  <Mic className="w-6 h-6" />
                )}
              </button>

              {/* Text Input Fallback */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (textInput.trim()) {
                    handleUserQuery(textInput);
                    setTextInput('');
                  }
                }}
                className="flex-1 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={
                    language === 'te' 
                      ? 'మైక్ నొక్కండి లేదా మీ ప్రశ్నను టైప్ చేయండి...' 
                      : language === 'hi' 
                      ? 'माइक दबाएं या अपना प्रश्न टाइप करें...' 
                      : 'Tap mic to speak or type your question...'
                  }
                  className="flex-1 bg-white border border-slate-300 text-slate-900 font-medium text-xs sm:text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:border-emerald-600 shadow-xs"
                />
                
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-400 transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
