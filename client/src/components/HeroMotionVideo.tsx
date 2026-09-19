import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Leaf, 
  Microscope, 
  Atom, 
  Zap, 
  Activity, 
  Info, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Compass,
  ArrowRight,
  Sun,
  Flame,
  Check,
  Search,
  Eye
} from 'lucide-react';
import { Hero3DPlant } from './Hero3DPlant';

type StageId = 'canopy' | 'stomata' | 'cellular';

interface StageConfig {
  id: StageId;
  targetTime: number; // Sweet-spot frame in video
  startTime: number;
  endTime: number;
  stepNumber: number;
  poster: string;
  name: string;
  name_te: string;
  name_hi: string;
  badge: string;
  badge_te: string;
  badge_hi: string;
  tagline: string;
  tagline_te: string;
  tagline_hi: string;
  description: string;
  description_te: string;
  description_hi: string;
  themeGradient: string;
  themeBorder: string;
  themeBadgeBg: string;
  themeBadgeText: string;
  iconBg: string;
  icon: React.ReactNode;
  vitals: {
    label: string;
    label_te: string;
    label_hi: string;
    value: string;
    status: string;
  }[];
  hotspots: {
    id: string;
    x: number;
    y: number;
    title: string;
    title_te: string;
    title_hi: string;
    detail: string;
    detail_te: string;
    detail_hi: string;
    colorClass: string;
    type: 'nutrient' | 'defense' | 'pathogen' | 'vital';
  }[];
}

const STAGES: StageConfig[] = [
  {
    id: 'canopy',
    targetTime: 0.5,
    startTime: 0.0,
    endTime: 2.5,
    stepNumber: 1,
    poster: '/crop_stage1_poster.jpg',
    name: 'Stage 1: Whole Plant & Foliage',
    name_te: 'దశ 1: సంపూర్ణ మొక్క & పూత',
    name_hi: 'चरण 1: संपूर्ण पौधा एवं पत्तियां',
    badge: 'Macro Architecture',
    badge_te: 'స్థూల నిర్మాణం',
    badge_hi: 'स्थूल संरचना',
    tagline: 'Living Crop Canopy & Flower Buds',
    tagline_te: 'ఆరోగ్యకరమైన ఆకులు & పూత',
    tagline_hi: 'स्वस्थ पत्तियां एवं फूल',
    description: 'Whole living crop plant showing lush vegetative canopy, stem vascular transport, golden blossoms, and developing tomatoes.',
    description_te: 'ఆరోగ్యకరమైన ఆకులు, కాండం యొక్క ప్రసరణ వ్యవస్థ మరియు వికసిస్తున్న పువ్వుల స్థూల దృశ్యం.',
    description_hi: 'पौधे की समग्र संरचना, स्वस्थ पत्तियां, तना और खिलती हुई कलियों का प्रत्यक्ष दृश्य।',
    themeGradient: 'from-emerald-600 via-green-500 to-teal-600',
    themeBorder: 'border-emerald-400',
    themeBadgeBg: 'bg-emerald-100',
    themeBadgeText: 'text-emerald-900',
    iconBg: 'bg-emerald-600 text-white',
    icon: <Leaf className="w-5 h-5 text-white" />,
    vitals: [
      { label: 'Leaf Cuticle Health', label_te: 'మైనపు పొర రక్షణ', label_hi: 'मोमी परत स्वास्थ्य', value: '100% Intact', status: 'Optimal' },
      { label: 'Canopy Solar Uptake', label_te: 'సూర్యరశ్మి గ్రహణం', label_hi: 'सौर ऊर्जा अवशोषण', value: '94.8%', status: 'Active' },
      { label: 'Flowering Truss Status', label_te: 'పూత దశ', label_hi: 'फूल अवस्था', value: 'Active Bloom', status: 'Healthy' }
    ],
    hotspots: [
      {
        id: 'canopy-leaf',
        x: 35,
        y: 45,
        title: 'Cuticular Wax Layer',
        title_te: 'మైనపు పూత రక్షణ కవచం',
        title_hi: 'मोमी सुरक्षा परत',
        detail: 'Hydrophobic waxy cuticle layer repels fungal spores and prevents excessive moisture accumulation on leaves.',
        detail_te: 'నీటిని వికర్షించే మైనపు పొర శిలీంధ్రాల బీజాలు ఆకులపై అంటుకోకుండా కాపాడుతుంది.',
        detail_hi: 'जल-विकर्षक मोमी परत फंगल बीजाणुओं को चिपकने से रोकती है।',
        colorClass: 'bg-emerald-600 border-emerald-300',
        type: 'defense'
      },
      {
        id: 'canopy-flower',
        x: 64,
        y: 35,
        title: 'Floral Blossom & Nectar',
        title_te: 'పూత & పుప్పొడి రక్షణ',
        title_hi: 'पुष्प एवं परागकण',
        detail: 'Critical bloom phase vulnerable to thrips and bollworms. Requires delicate organic pest deterrents.',
        detail_te: 'పూత దశలో తామర పురుగులు, గులాబీ రంగు పురుగుల దాడి ఎక్కువగా ఉంటుంది. తగిన జాగ్రత్తలు అవసరం.',
        detail_hi: 'पुष्प अवस्था थ्रिप्स और सुंडी के प्रति संवेदनशील होती है। समय पर सुरक्षा आवश्यक है।',
        colorClass: 'bg-amber-500 border-amber-300',
        type: 'vital'
      }
    ]
  },
  {
    id: 'stomata',
    targetTime: 3.5,
    startTime: 2.8,
    endTime: 5.5,
    stepNumber: 2,
    poster: '/crop_stage2_poster.jpg',
    name: 'Stage 2: Leaf Surface & Stomata',
    name_te: 'దశ 2: ఆకు ఉపరితలం & పత్రరంధ్రాలు',
    name_hi: 'चरण 2: पत्ती की सतह एवं रंध्र (स्टोमेटा)',
    badge: 'Microscopic Epidermis',
    badge_te: 'సూక్ష్మ పత్ర చర్మం',
    badge_hi: 'सूक्ष्म बाह्यत्वचा',
    tagline: 'Breathing Guard Cells & Transpiration',
    tagline_te: 'శ్వాస రంధ్రాలు & బాష్పోత్సేకం',
    tagline_hi: 'श्वास रंध्र एवं वाष्पोत्सर्जन',
    description: 'Microscopic zoom into breathing stomatal apertures and guard cells regulating moisture transpiration and CO2 gas exchange.',
    description_te: 'శ్వాసక్రియ మరియు బాష్పోత్సేకం నియంత్రించే పత్రరంధ్రాలు (స్టొమాటా) మరియు రక్షక కణాల ప్రత్యక్ష కదలిక.',
    description_hi: 'पत्तियों के सूक्ष्म रंध्र (स्टोमेटा) और रक्षक कोशिकाएं जो वाष्पोत्सर्जन और गैस विनिमय करती हैं।',
    themeGradient: 'from-cyan-600 via-teal-500 to-blue-600',
    themeBorder: 'border-cyan-400',
    themeBadgeBg: 'bg-cyan-100',
    themeBadgeText: 'text-cyan-900',
    iconBg: 'bg-cyan-600 text-white',
    icon: <Microscope className="w-5 h-5 text-white" />,
    vitals: [
      { label: 'Stomatal Aperture', label_te: 'పత్రరంధ్ర వ్యాసం', label_hi: 'रंध्र छिद्र आकार', value: 'Open (8.4 µm)', status: 'Active' },
      { label: 'Transpiration Stream', label_te: 'బాష్పోత్సేక రేటు', label_hi: 'वाष्पोत्सर्जन दर', value: '18.4 ml/hr', status: 'Normal' },
      { label: 'Leaf Temperature', label_te: 'ఆకు ఉష్ణోగ్రత', label_hi: 'पत्ती का तापमान', value: '24.5°C', status: 'Cool' }
    ],
    hotspots: [
      {
        id: 'stoma-pore',
        x: 50,
        y: 48,
        title: 'Stomatal Aperture & Guard Cells',
        title_te: 'పత్రరంధ్రం & రక్షక కణాలు',
        title_hi: 'रंध्र छिद्र एवं रक्षक कोशिकाएं',
        detail: 'Turgor pressure controls pore opening. High humidity signals pathogenic germ tubes to penetrate here.',
        detail_te: 'పీడనం ఆధారంగా రంధ్రం తెరుచుకుంటుంది. అధిక తేమ ఉన్నప్పుడు శిలీంధ్రాలు దీని ద్వారా లోపలికి ప్రవేశిస్తాయి.',
        detail_hi: 'स्फीति दबाव से रंध्र खुलते हैं। अधिक नमी होने पर फफूंद इसके रास्ते प्रवेश करती है।',
        colorClass: 'bg-rose-600 border-rose-300',
        type: 'pathogen'
      },
      {
        id: 'stoma-transpiration',
        x: 74,
        y: 36,
        title: 'Transpirational Vapor Stream',
        title_te: 'బాష్పోత్సేక నీటి ఆవిరి ప్రవాహం',
        title_hi: 'वाष्पोत्सर्जन जल वाष्प',
        detail: 'Evaporative cooling maintaining optimum leaf temperature between 22°C to 28°C.',
        detail_te: 'మొక్కల ఉష్ణోగ్రతను సమతుల్యంగా ఉంచే నీటి ఆవిరి విడుదల ప్రక్రియ.',
        detail_hi: 'पौधे के तापमान को अनुकूल बनाए रखने के लिए जल वाष्प का उत्सर्जन।',
        colorClass: 'bg-blue-600 border-blue-300',
        type: 'vital'
      }
    ]
  },
  {
    id: 'cellular',
    targetTime: 7.5,
    startTime: 5.8,
    endTime: 9.0,
    stepNumber: 3,
    poster: '/crop_stage3_poster.jpg',
    name: 'Stage 3: Deep Cellular Organelles & Nutrients',
    name_te: 'దశ 3: కణజాలం, బ్యాక్టీరియా & పోషకాలు',
    name_hi: 'चरण 3: आंतरिक कोशिकाएं, बैक्टीरिया एवं पोषक तत्व',
    badge: 'Nanoscale Cytoplasm',
    badge_te: 'అంతర్గత జీవకణం',
    badge_hi: 'कोशिकीय द्रव्य',
    tagline: 'Hexagonal Walls, Chloroplasts & Bacteria',
    tagline_te: 'కణ కవచాలు, క్లోరోఫిల్ & బ్యాక్టీరియా',
    tagline_hi: 'कोशिका भित्ति, हरितलवक एवं बैक्टीरिया',
    description: 'Deep cellular interior showing hexagonal cellulose walls, floating chloroplasts, active N-P-K nutrient flows, and microbial bacteria.',
    description_te: 'కణ కవచాలు, హరితరేణువులు, బ్యాక్టీరియా కదలికలు మరియు నత్రజని, భాస్వరం, పొటాష్ పోషకాల ప్రసరణ.',
    description_hi: 'कोशिका भित्ति, हरितलवक (क्लोरोप्लास्ट), सूक्ष्म बैक्टीरिया और आवश्यक पोषक तत्वों का आंतरिक संचार।',
    themeGradient: 'from-purple-600 via-fuchsia-500 to-amber-600',
    themeBorder: 'border-purple-400',
    themeBadgeBg: 'bg-purple-100',
    themeBadgeText: 'text-purple-900',
    iconBg: 'bg-purple-600 text-white',
    icon: <Atom className="w-5 h-5 text-white" />,
    vitals: [
      { label: 'Chloroplast Synthesis', label_te: 'హరితరేణువుల సామర్థ్యం', label_hi: 'हरितलवक दक्षता', value: '98.2%', status: 'Active' },
      { label: 'N-P-K Translocation', label_te: 'పోషక ప్రసరణ', label_hi: 'पोषक तत्व संचार', value: 'Optimal K+ / N', status: 'Balanced' },
      { label: 'Pathogen Barrier Defense', label_te: 'కణ రక్షణ కవచం', label_hi: 'कोशिका सुरक्षा स्तर', value: 'High Resistance', status: 'Guarded' }
    ],
    hotspots: [
      {
        id: 'cell-chloroplast',
        x: 40,
        y: 35,
        title: 'Chloroplast Organelles (Chlorophyll)',
        title_te: 'హరితరేణువులు (క్లోరోఫిల్ సంశ్లేషణ)',
        title_hi: 'क्लोरोप्लास्ट (हरितलवक)',
        detail: 'Solar photosynthetic factories producing sugars. Blight pathogens destroy chlorophyll causing chlorosis.',
        detail_te: 'సూర్యకాంతిని ఆహారంగా మార్చే కేంద్రాలు. తెగుళ్లు సోకినప్పుడు ఇవి దెబ్బతిని ఆకులు పసుపుబారుతాయి.',
        detail_hi: 'प्रकाश संश्लेषण द्वारा भोजन निर्माण केंद्र। रोग लगने पर ये नष्ट होकर पत्तियां पीली पड़ जाती हैं।',
        colorClass: 'bg-emerald-600 border-emerald-300',
        type: 'nutrient'
      },
      {
        id: 'cell-npk',
        x: 50,
        y: 44,
        title: 'Active N-P-K Nutrient Translocation',
        title_te: 'నత్రజని-భాస్వరం-పొటాష్ పోషక ప్రవాహం',
        title_hi: 'एन-पी-के पोषक तत्व प्रवाह',
        detail: 'Cytoplasmic streaming transporting Potassium (K) ions for membrane integrity and disease resilience.',
        detail_te: 'కణాల్లో పోషకాల ప్రవాహం. పొటాష్ పోషకం మొక్కలకు వ్యాధి నిరోధక శక్తిని అందిస్తుంది.',
        detail_hi: 'पोटैशियम और नाइट्रोजन का संचार जो रोग प्रतिरोधक क्षमता को बढ़ाता है।',
        colorClass: 'bg-amber-500 border-amber-300',
        type: 'nutrient'
      },
      {
        id: 'cell-bacteria',
        x: 72,
        y: 44,
        title: 'Microbial Pathogen Colony',
        title_te: 'హానికర బ్యాక్టీరియా & శిలీంధ్ర బీజాలు',
        title_hi: 'रोगजनक बैक्टीरिया एवं फंगल कॉलोनी',
        detail: 'Bacterial colonies secret enzymes degrading cell walls. Target with Copper Oxychloride or Trichoderma.',
        detail_te: 'కణ కవచాలను నాశనం చేసే బ్యాక్టీరియా. కాపర్ ఆక్సిక్లోరైడ్ లేదా ట్రైకోడెర్మ తో నియంత్రించవచ్చు.',
        detail_hi: 'कोशिका भित्ति को नुकसान पहुंचाने वाले जीवाणु। कॉपर ऑक्सीक्लोराइड या ट्राइकोडर्मा से रोकें।',
        colorClass: 'bg-rose-600 border-rose-300',
        type: 'pathogen'
      }
    ]
  }
];

export const HeroMotionVideo: React.FC = () => {
  const { t, language, speak, stopSpeaking, isSpeaking } = useLanguage();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playTimerRef = useRef<number | null>(null);
  const stopTimeRef = useRef<number | null>(0.5);

  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [isPlayingMotion, setIsPlayingMotion] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<StageConfig['hotspots'][0] | null>(null);
  const [heroMode, setHeroMode] = useState<'video' | 'three'>('video');
  const [showLoupe, setShowLoupe] = useState<boolean>(false);

  const currentStage = STAGES[currentStageIndex];

  // Initialize video frame to Stage 1 targetTime (0.5s) on load
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupInitialFrame = () => {
      video.currentTime = STAGES[0].targetTime;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = STAGES[0].targetTime;
            }
          }, 80);
        }).catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      setupInitialFrame();
    } else {
      video.addEventListener('loadeddata', setupInitialFrame, { once: true });
      video.addEventListener('loadedmetadata', setupInitialFrame, { once: true });
    }
  }, []);

  // Handle high-precision time updates to pause at target stage frame
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (stopTimeRef.current !== null && video.currentTime >= stopTimeRef.current) {
      video.pause();
      video.currentTime = stopTimeRef.current;
      stopTimeRef.current = null;
      setIsPlayingMotion(false);
    }
  };

  // Go to a specific stage smoothly with motion video
  const goToStage = useCallback((stageIdx: number, playMotion = true) => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }

    const stage = STAGES[stageIdx];
    setCurrentStageIndex(stageIdx);
    setSelectedHotspot(null);

    const video = videoRef.current;
    if (!video) return;

    if (playMotion) {
      setIsPlayingMotion(true);
      if (stageIdx === 0) {
        video.currentTime = 0;
        stopTimeRef.current = stage.targetTime;
        video.play().catch(() => {});
      } else {
        stopTimeRef.current = stage.targetTime;
        video.play().catch(() => {});
      }

      // Safety fallback timer if timeupdate is throttled
      playTimerRef.current = window.setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = stage.targetTime;
          setIsPlayingMotion(false);
          stopTimeRef.current = null;
        }
      }, 4500);
    } else {
      stopTimeRef.current = null;
      video.pause();
      video.currentTime = stage.targetTime;
      setIsPlayingMotion(false);
    }
  }, []);

  // Handle "Next Stage" button
  const handleNextStage = () => {
    const nextIdx = (currentStageIndex + 1) % STAGES.length;
    goToStage(nextIdx, true);
  };

  // Handle "Previous Stage" button
  const handlePrevStage = () => {
    const prevIdx = (currentStageIndex - 1 + STAGES.length) % STAGES.length;
    goToStage(prevIdx, false);
  };

  // Play / Pause toggle
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlayingMotion) {
      stopTimeRef.current = null;
      video.pause();
      setIsPlayingMotion(false);
    } else {
      stopTimeRef.current = null;
      video.play().catch(() => {});
      setIsPlayingMotion(true);
    }
  };

  // Audio voiceover readout
  const handleListenStage = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    let speechText = '';
    if (language === 'te') {
      speechText = `${currentStage.name_te}. ${currentStage.description_te}. క్రింది 'ముందరి దశ' బటన్ ద్వారా తదుపరి మైక్రోస్కోపిక్ దశకు వెళ్లండి.`;
    } else if (language === 'hi') {
      speechText = `${currentStage.name_hi}। ${currentStage.description_hi}। नीचे दिए गए 'अगला चरण' बटन द्वारा सूक्ष्म दृश्य देखें।`;
    } else {
      speechText = `${currentStage.name}. ${currentStage.description}. Click the Next Stage button to step through the microscopic zoom.`;
    }

    speak(speechText);
  };

  return (
    <div className="w-full relative">
      {/* Top Colorful Header Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-md shadow-emerald-500/50" />
          <span className="text-xs font-black tracking-wider uppercase text-emerald-950 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-800 bg-clip-text text-transparent font-extrabold text-sm">
              {language === 'te' 
                ? '3D యానిమేషన్ ప్లాంట్ & మైక్రోస్కోపిక్ దృశ్యాలు (దశల వారీగా)' 
                : language === 'hi' 
                ? '3D एनिमेटेड पौधा एवं सूक्ष्मदर्शी दृश्य (चरणबद्ध)' 
                : 'Interactive 3D Motion Plant & Microscopic Stages'}
            </span>
          </span>
        </div>

        {/* View Controls & Mode Toggle */}
        <div className="flex items-center gap-2">
          {/* Microscope Loupe Toggle */}
          <button
            onClick={() => setShowLoupe(!showLoupe)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border transition-all cursor-pointer ${
              showLoupe
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 shadow-xs'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>{showLoupe ? 'Hide Loupe' : '🔬 Microscope Loupe'}</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-emerald-50 p-1 rounded-xl border-2 border-emerald-200 shadow-xs">
            <button
              onClick={() => setHeroMode('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                heroMode === 'video'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-emerald-800'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>{language === 'te' ? '3D దశల వీడియో' : language === 'hi' ? '3D वीडियो' : '3D Stage Motion'}</span>
            </button>
            <button
              onClick={() => setHeroMode('three')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
                heroMode === 'three'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-700 hover:text-emerald-800'
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>{language === 'te' ? '3D త్రీ.జేఎస్' : language === 'hi' ? '3D मॉडल' : '3D Three.js Model'}</span>
            </button>
          </div>
        </div>
      </div>

      {heroMode === 'three' ? (
        <Hero3DPlant />
      ) : (
        <div className="relative">
          {/* Main Card Container in Pure Crisp White & Radiant Emerald Outline */}
          <div className="relative w-full rounded-3xl overflow-hidden bg-white border-3 border-emerald-300 shadow-2xl shadow-emerald-950/10">
            {/* Viewport for Active Stage: 3D Motion Video (100% visible, no static image overlays) */}
            <div className="relative w-full aspect-[16/9] bg-slate-50 flex items-center justify-center overflow-hidden">
              {/* 3D Motion Video: Primary 3D Plant & Microscopic Zoom Visual */}
              <video
                ref={videoRef}
                src="/crop_hero_video.mp4"
                poster={currentStage.poster}
                autoPlay
                playsInline
                muted
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlayingMotion(true)}
                onPause={() => setIsPlayingMotion(false)}
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />

              {/* Subtle daylight vignette */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-900/10 pointer-events-none z-10" />

              {/* Top Overlay: Active Stage Header & Action Controls */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
                {/* Active Stage Indicator Badge */}
                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border-2 border-emerald-300 shadow-lg">
                  <span className={`w-3 h-3 rounded-full ${
                    currentStageIndex === 0 ? 'bg-emerald-500' : currentStageIndex === 1 ? 'bg-cyan-500' : 'bg-purple-500'
                  } ${isPlayingMotion ? 'animate-ping' : ''}`} />

                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    {language === 'te' 
                      ? currentStage.badge_te 
                      : language === 'hi' 
                      ? currentStage.badge_hi 
                      : currentStage.badge}
                  </span>

                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    currentStageIndex === 0 
                      ? 'bg-emerald-100 text-emerald-900' 
                      : currentStageIndex === 1 
                      ? 'bg-cyan-100 text-cyan-900' 
                      : 'bg-purple-100 text-purple-900'
                  }`}>
                    {currentStageIndex + 1} of 3
                  </span>
                </div>

                {/* Right controls: Play / Pause & Audio Guide */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className="bg-white/95 hover:bg-emerald-50 text-slate-900 border-2 border-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    {isPlayingMotion ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Play Motion</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleListenStage}
                    className={`px-3.5 py-1.5 rounded-full border-2 flex items-center gap-1.5 transition-all shadow-md text-xs font-black cursor-pointer active:scale-95 ${
                      isSpeaking
                        ? 'bg-amber-400 border-amber-500 text-slate-950 animate-pulse'
                        : 'bg-white/95 hover:bg-emerald-50 border-emerald-300 text-emerald-900'
                    }`}
                    title="Audio Explanation"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-900" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
                    <span className="hidden sm:inline">{isSpeaking ? t('audio_stop') : t('audio_listen')}</span>
                  </button>
                </div>
              </div>

              {/* Interactive AR Hotspots */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {currentStage.hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="absolute pointer-events-auto group"
                  >
                    <button
                      onClick={() => setSelectedHotspot(selectedHotspot?.id === spot.id ? null : spot)}
                      className="relative flex items-center justify-center p-2.5 rounded-full cursor-pointer transition-transform hover:scale-115 active:scale-95"
                    >
                      {/* Pulse Ring */}
                      <span className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                        spot.type === 'pathogen' ? 'bg-rose-500' : spot.type === 'nutrient' ? 'bg-amber-400' : 'bg-emerald-400'
                      }`} />

                      {/* Center Badge */}
                      <span className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-xl backdrop-blur-md text-white font-bold ${
                        spot.colorClass
                      }`}>
                        {spot.type === 'pathogen' ? <Activity className="w-5 h-5" /> : spot.type === 'nutrient' ? <Zap className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex flex-col items-center pointer-events-none z-30">
                      <div className="bg-slate-900 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap border border-slate-700">
                        {language === 'te' ? spot.title_te : language === 'hi' ? spot.title_hi : spot.title}
                      </div>
                      <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotspot Detailed Popup Card */}
              {selectedHotspot && (
                <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-sm z-30 bg-white p-4 rounded-2xl border-2 border-emerald-400 shadow-2xl animate-fade-in pointer-events-auto">
                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className={`p-2 rounded-xl text-white ${selectedHotspot.colorClass}`}>
                        {selectedHotspot.type === 'pathogen' ? <Activity className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                      </span>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">
                          {language === 'te' ? selectedHotspot.title_te : language === 'hi' ? selectedHotspot.title_hi : selectedHotspot.title}
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase">
                          {selectedHotspot.type} TARGET
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedHotspot(null)}
                      className="text-slate-400 hover:text-slate-700 text-sm font-black px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed">
                    {language === 'te' ? selectedHotspot.detail_te : language === 'hi' ? selectedHotspot.detail_hi : selectedHotspot.detail}
                  </p>
                </div>
              )}

              {/* Optional Microscope Loupe Overlay (Creative Feature) */}
              {showLoupe && (
                <div className="absolute bottom-6 left-6 z-30 bg-white/95 backdrop-blur-md p-3 rounded-2xl border-2 border-amber-400 shadow-xl pointer-events-auto flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-500 shadow-inner shrink-0 bg-emerald-950 flex items-center justify-center relative">
                    <video 
                      src="/crop_hero_video.mp4#t=7.5" 
                      muted 
                      playsInline
                      className="w-full h-full object-cover scale-225 pointer-events-none" 
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black uppercase text-amber-700 block">Microscope 500x Magnification</span>
                    <h5 className="text-xs font-black text-slate-900">Hexagonal Cells & Chloroplasts</h5>
                    <p className="text-[10px] text-slate-600 mt-0.5">Stomata opening: 8.4 µm • Cyclosis Active</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Colorful Control Deck */}
            <div className="p-4 sm:p-6 bg-gradient-to-b from-white via-emerald-50/30 to-teal-50/40 border-t-2 border-emerald-200">
              {/* 3 Large Stage Selector Cards with Rich Vibrant Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                {STAGES.map((stage, idx) => {
                  const isActive = currentStageIndex === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => goToStage(idx, true)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl text-left transition-all border-2 cursor-pointer relative overflow-hidden ${
                        isActive
                          ? `bg-gradient-to-r ${stage.themeGradient} text-white border-transparent shadow-xl scale-102 ring-2 ring-emerald-400/50`
                          : 'bg-white hover:bg-emerald-50/80 text-slate-900 border-slate-200 hover:border-emerald-300 shadow-sm'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl shrink-0 shadow-sm ${
                        isActive ? 'bg-white/20 text-white' : stage.iconBg
                      }`}>
                        {stage.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black uppercase tracking-wider block ${
                            isActive ? 'text-white/90' : 'text-emerald-700'
                          }`}>
                            {language === 'te' ? stage.badge_te : language === 'hi' ? stage.badge_hi : stage.badge}
                          </span>
                          {isActive && (
                            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-black truncate mt-0.5">
                          {language === 'te' ? stage.name_te : language === 'hi' ? stage.name_hi : stage.name}
                        </h4>

                        <p className={`text-[11px] font-medium truncate mt-0.5 ${
                          isActive ? 'text-white/85' : 'text-slate-500'
                        }`}>
                          {language === 'te' ? stage.tagline_te : language === 'hi' ? stage.tagline_hi : stage.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Stage Vitals Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
                {currentStage.vitals.map((v, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">
                        {language === 'te' ? v.label_te : language === 'hi' ? v.label_hi : v.label}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">{v.value}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {v.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage Stepping Action Deck with NEXT and PREV Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {/* Previous Stage Button */}
                <button
                  onClick={handlePrevStage}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border-2 border-slate-200 text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  <span>{language === 'te' ? 'వెనుకటి దశ' : language === 'hi' ? 'पिछला चरण' : 'Previous Stage'}</span>
                </button>

                {/* Center Stage Dots Indicator */}
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-slate-200 shadow-xs">
                  {STAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToStage(idx, true)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        currentStageIndex === idx
                          ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                      title={`Go to Stage ${idx + 1}`}
                    />
                  ))}
                  <span className="text-[11px] font-black text-slate-600 ml-1">
                    {language === 'te' 
                      ? `దశ ${currentStageIndex + 1} / 3` 
                      : language === 'hi' 
                      ? `चरण ${currentStageIndex + 1} / 3` 
                      : `Stage ${currentStageIndex + 1} of 3`}
                  </span>
                </div>

                {/* Primary NEXT STAGE Button */}
                <button
                  onClick={handleNextStage}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white text-xs sm:text-sm font-black shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <span>
                    {language === 'te' 
                      ? 'తదుపరి దశకు వెళ్ళండి' 
                      : language === 'hi' 
                      ? 'अगला चरण देखें' 
                      : 'Next Stage (Zoom In)'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Information Strip for the current stage */}
              <div className="mt-4 p-3 bg-white rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">
                    {language === 'te' 
                      ? currentStage.description_te 
                      : language === 'hi' 
                      ? currentStage.description_hi 
                      : currentStage.description}
                  </span>
                </div>

                <a
                  href="#crop-scanner"
                  className="hidden md:inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800 shrink-0 ml-2"
                >
                  <span>{t('scanner_title')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
