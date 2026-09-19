import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { ScanResult, CropCondition, StructuredCropAnalysis } from '../types';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Bug, 
  Activity, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Crosshair, 
  Check, 
  Sprout, 
  ShieldCheck, 
  ChevronDown,
  RotateCcw,
  HelpCircle,
  ShieldAlert,
  Droplets,
  Sun,
  Key
} from 'lucide-react';
import { 
  HEALTHY_TOMATO_LEAF_SVG,
  TOMATO_EARLY_BLIGHT_SVG, 
  COTTON_BOLLWORM_SVG, 
  RICE_BLAST_SVG, 
  CHILLI_LEAF_CURL_SVG, 
  MAIZE_ARMYWORM_SVG,
  SUGARCANE_RED_ROT_SVG
} from '../data/sampleImages';
import { performBotanicalDiagnosis, BOTANICAL_CROPS, detectCropFromFilename } from '../services/botanicalVisionEngine';
import { CameraCaptureModal } from './CameraCaptureModal';

interface CropScannerProps {
  onSelectForDosage: (disease: CropCondition) => void;
}

interface SampleOutbreak {
  id: string;
  name: string;
  name_te: string;
  name_hi: string;
  crop: string;
  type: 'healthy' | 'disease' | 'pest';
  image: string;
  colorActive: string;
  colorBg: string;
}

const SAMPLE_OUTBREAKS: SampleOutbreak[] = [
  {
    id: 'tomato_healthy',
    crop: 'Tomato',
    name: 'Tomato - Healthy Foliage',
    name_te: 'టమోటా - ఆరోగ్యకరమైన ఆకులు',
    name_hi: 'टमाटर - स्वस्थ पत्तियां',
    type: 'healthy',
    image: HEALTHY_TOMATO_LEAF_SVG,
    colorActive: 'bg-gradient-to-r from-emerald-600 to-green-600 text-white border-emerald-700 shadow-emerald-600/30',
    colorBg: 'bg-emerald-50/70 border-emerald-200 text-slate-800 hover:border-emerald-400'
  },
  {
    id: 'tomato_early_blight',
    crop: 'Tomato',
    name: 'Tomato - Early Blight',
    name_te: 'టమోటా - ఎర్లీ బ్లైట్ తెగులు',
    name_hi: 'टमाटर - अगेती झुलसा',
    type: 'disease',
    image: TOMATO_EARLY_BLIGHT_SVG,
    colorActive: 'bg-gradient-to-r from-rose-600 to-red-600 text-white border-rose-700 shadow-rose-600/30',
    colorBg: 'bg-rose-50/60 border-rose-200 text-slate-800 hover:border-rose-400'
  },
  {
    id: 'cotton_pink_bollworm',
    crop: 'Cotton',
    name: 'Cotton - Pink Bollworm',
    name_te: 'పత్తి - గులాబీ రంగు పురుగు',
    name_hi: 'कपास - गुलाबी सुंडी',
    type: 'pest',
    image: COTTON_BOLLWORM_SVG,
    colorActive: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-amber-500/30',
    colorBg: 'bg-amber-50/60 border-amber-200 text-slate-800 hover:border-amber-400'
  },
  {
    id: 'rice_blast',
    crop: 'Paddy / Rice',
    name: 'Paddy / Rice - Blast',
    name_te: 'వరి - అగ్గితెగులు (బ్లాస్ట్)',
    name_hi: 'धान - झोंका रोग (ब्लास्ट)',
    type: 'disease',
    image: RICE_BLAST_SVG,
    colorActive: 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-teal-700 shadow-teal-600/30',
    colorBg: 'bg-teal-50/60 border-teal-200 text-slate-800 hover:border-teal-400'
  },
  {
    id: 'chilli_leaf_curl',
    crop: 'Chilli',
    name: 'Chilli - Leaf Curl & Thrips',
    name_te: 'మిరప - ఆకు ముడత',
    name_hi: 'मिर्च - लीफ कर्ल',
    type: 'disease',
    image: CHILLI_LEAF_CURL_SVG,
    colorActive: 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-600 shadow-orange-500/30',
    colorBg: 'bg-orange-50/60 border-orange-200 text-slate-800 hover:border-orange-400'
  },
  {
    id: 'fall_armyworm_maize',
    crop: 'Corn / Maize',
    name: 'Maize - Fall Armyworm',
    name_te: 'మొక్కజొన్న - కత్తెర పురుగు',
    name_hi: 'मक्का - फॉल आर्मीवर्म',
    type: 'pest',
    image: MAIZE_ARMYWORM_SVG,
    colorActive: 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-yellow-600 shadow-yellow-500/30',
    colorBg: 'bg-yellow-50/60 border-yellow-200 text-slate-800 hover:border-yellow-400'
  },
  {
    id: 'sugarcane_red_rot',
    crop: 'Sugarcane',
    name: 'Sugarcane - Red Rot',
    name_te: 'చెరకు - ఎర్ర కుళ్లు తెగులు',
    name_hi: 'गन्ना - लाल सड़न',
    type: 'disease',
    image: SUGARCANE_RED_ROT_SVG,
    colorActive: 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-700 shadow-red-600/30',
    colorBg: 'bg-red-50/60 border-red-200 text-slate-800 hover:border-red-400'
  }
];

export const AVAILABLE_CROP_OPTIONS = [
  { key: 'auto', label: '🤖 Auto-Detect Plant & Crop (AI Neural Vision)', label_te: '🤖 ఆటో డిటెక్ట్ (AI మొక్క & పంట గుర్తింపు)', label_hi: '🤖 ऑटो-डिटेक्ट (एआई पौधा एवं फसल पहचान)' },
  { key: 'tomato', label: '🍅 Tomato (Solanum lycopersicum)', label_te: '🍅 టమోటా (Solanum lycopersicum)', label_hi: '🍅 टमाटर (Solanum lycopersicum)' },
  { key: 'potato', label: '🥔 Potato (Solanum tuberosum)', label_te: '🥔 బంగాళాదుంప (Solanum tuberosum)', label_hi: '🥔 आलू (Solanum tuberosum)' },
  { key: 'rice', label: '🌾 Paddy / Rice (Oryza sativa)', label_te: '🌾 వరి (Oryza sativa)', label_hi: '🌾 धान / चावल (Oryza sativa)' },
  { key: 'wheat', label: '🌾 Wheat (Triticum aestivum)', label_te: '🌾 గోధుమ (Triticum aestivum)', label_hi: '🌾 गेहूं (Triticum aestivum)' },
  { key: 'maize', label: '🌽 Corn / Maize (Zea mays)', label_te: '🌽 మొక్కజొన్న (Zea mays)', label_hi: '🌽 मक्का (Zea mays)' },
  { key: 'cotton', label: '☁️ Cotton (Gossypium hirsutum)', label_te: '☁️ పత్తి (Gossypium hirsutum)', label_hi: '☁️ कपास (Gossypium hirsutum)' },
  { key: 'chilli', label: '🌶️ Chilli (Capsicum annuum)', label_te: '🌶️ మిరప (Capsicum annuum)', label_hi: '🌶️ मिर्च (Capsicum annuum)' },
  { key: 'brinjal', label: '🍆 Brinjal / Eggplant (Solanum melongena)', label_te: '🍆 వంకాయ (Solanum melongena)', label_hi: '🍆 बैंगन (Solanum melongena)' },
  { key: 'okra', label: '🌿 Okra / Bhendi (Abelmoschus esculentus)', label_te: '🌿 బెండకాయ (Abelmoschus esculentus)', label_hi: '🌿 भिंडी (Abelmoschus esculentus)' },
  { key: 'mango', label: '🥭 Mango (Mangifera indica)', label_te: '🥭 మామిడి (Mangifera indica)', label_hi: '🥭 आम (Mangifera indica)' },
  { key: 'banana', label: '🍌 Banana (Musa acuminata)', label_te: '🍌 అరటి (Musa acuminata)', label_hi: '🍌 केला (Musa acuminata)' },
  { key: 'grapes', label: '🍇 Grapes (Vitis vinifera)', label_te: '🍇 ద్రాక్ష (Vitis vinifera)', label_hi: '🍇 अंगूर (Vitis vinifera)' },
  { key: 'apple', label: '🍎 Apple (Malus domestica)', label_te: '🍎 ఆపిల్ (Malus domestica)', label_hi: '🍎 सेब (Malus domestica)' },
  { key: 'groundnut', label: '🥜 Groundnut / Peanut (Arachis hypogaea)', label_te: '🥜 వేరుశనగ (Arachis hypogaea)', label_hi: '🥜 मूंगफली (Arachis hypogaea)' },
  { key: 'soybean', label: '🌱 Soybean (Glycine max)', label_te: '🌱 సోయాబీన్ (Glycine max)', label_hi: '🌱 सोयाबीन (Glycine max)' },
  { key: 'sugarcane', label: '🎋 Sugarcane (Saccharum officinarum)', label_te: '🎋 చెరకు (Saccharum officinarum)', label_hi: '🎋 गन्ना (Saccharum officinarum)' }
];

export const CropScanner: React.FC<CropScannerProps> = ({ onSelectForDosage }) => {
  const { t, language, speak, stopSpeaking, isSpeaking } = useLanguage();

  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_OUTBREAKS[0].image);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_OUTBREAKS[0].id);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('auto');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(1);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(true);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const [apiKeyInput, setApiKeyInput] = useState<string>('');
  const [isSavingKey, setIsSavingKey] = useState<boolean>(false);
  const [saveKeyFeedback, setSaveKeyFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [showKeyForm, setShowKeyForm] = useState<boolean>(false);

  const handleSaveApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;
    setIsSavingKey(true);
    setSaveKeyFeedback(null);
    try {
      await api.saveApiKey(apiKeyInput.trim());
      setSaveKeyFeedback({ success: true, message: '✅ Gemini API Key connected and activated successfully!' });
      setShowKeyForm(false);
      // Re-run diagnosis with current image to immediately show live AI analysis
      setTimeout(() => {
        executeDiagnosis(selectedSampleId || undefined, selectedImage, selectedCropFilter);
      }, 500);
    } catch (err: any) {
      setSaveKeyFeedback({ success: false, message: err.message || 'Failed to save key' });
    } finally {
      setIsSavingKey(false);
    }
  };

  // Query backend AI Vision model status on mount
  useEffect(() => {
    api.getAIStatus().then(status => {
      console.log('[CropShield] AI Vision Model Backend Status:', status);
    }).catch(err => {
      console.warn('[CropShield] Could not connect to AI status endpoint:', err.message);
    });

    // Initialize with healthy leaf sample
    executeDiagnosis(SAMPLE_OUTBREAKS[0].id, SAMPLE_OUTBREAKS[0].image, 'auto');
  }, []);

  // Perform AI Multi-Stage Botanical & Pathogen Diagnosis
  const executeDiagnosis = async (
    sampleId?: string,
    customImageSrc?: string,
    cropFilter?: string,
    fileNameHint?: string,
    fileMeta?: { name: string; type: string; size: number; dimensions: string },
    imageSource: 'CAMERA' | 'UPLOAD' | 'SAMPLE' = 'SAMPLE'
  ) => {
    setIsScanning(true);
    setScanStep(1);
    setUploadError(null);

    // If analyzing a new custom upload or camera shot, clear previous scanResult
    // so stale diagnostic data from another plant is not displayed beside the image!
    if (!sampleId) {
      setScanResult(null);
    }

    const activeImage = customImageSrc || selectedImage || SAMPLE_OUTBREAKS[0].image;
    const activeCrop = cropFilter !== undefined ? cropFilter : selectedCropFilter;

    // 4-Phase Diagnostic Pipeline HUD Animation
    await new Promise((r) => setTimeout(r, 120));
    setScanStep(2);
    await new Promise((r) => setTimeout(r, 120));
    setScanStep(3);
    await new Promise((r) => setTimeout(r, 120));
    setScanStep(4);

    try {
      console.log('[CropShield] =====================================');
      console.log('[CropShield] Sending image for analysis...');
      console.log('[CropShield] Source:', imageSource);
      console.log('[CropShield] Sample ID:', sampleId || 'none (custom upload/camera)');
      console.log('[CropShield] Selected Crop Filter:', activeCrop);
      console.log('[CropShield] Image payload size (chars):', activeImage.length);

      let finalResult: ScanResult;

      // 1. If this is a user upload or camera capture, dispatch actual image to backend AI Vision Engine
      if (!sampleId) {
        console.log('[CropShield] Dispatching imageBase64 to backend POST /api/analyze-crop...');
        const payload = {
          imageBase64: activeImage,
          cropType: activeCrop !== 'auto' ? activeCrop : undefined
        };

        const serverResult = await api.analyzeCrop(payload);
        console.log('[CropShield] Backend /api/analyze-crop response received:', serverResult);

        if (serverResult.aiConnected === false) {
          console.warn('[CropShield] REAL AI MODEL NOT CONNECTED: No GEMINI_API_KEY in backend environment');
        } else {
          console.log('[CropShield] AI Vision Model response received successfully!');
          console.log('[CropShield] Identified crop:', serverResult.structuredAnalysis?.crop);
          console.log('[CropShield] Crop confidence:', serverResult.structuredAnalysis?.cropConfidence);
          console.log('[CropShield] Health status:', serverResult.structuredAnalysis?.healthStatus);
          console.log('[CropShield] Disease:', serverResult.structuredAnalysis?.disease?.name);
          console.log('[CropShield] Pest:', serverResult.structuredAnalysis?.pest?.name);
          console.log('[CropShield] Visual evidence:', serverResult.structuredAnalysis?.visualEvidence);
        }

        finalResult = serverResult;
      } else {
        // Reference catalog sample clicked
        console.log('[CropShield] Loading verified catalog sample:', sampleId);
        finalResult = await api.analyzeCrop({ sampleId, cropType: activeCrop });
      }

      setScanResult(finalResult);
      if (typeof window !== 'undefined') {
        (window as any).__LATEST_CROP_SCAN__ = finalResult;
      }
    } catch (err: any) {
      console.error('[CropShield] AI request failed:', err);
      const errorMessage = err.message || 'Failed to connect to AI vision service.';
      
      // Construct a clean, actionable Service Error ScanResult so the right column renders
      // the dedicated AI Service Unavailable card with retry, instead of stale plant data!
      const errorResult: ScanResult = {
        success: false,
        aiConnected: true,
        serviceError: true,
        apiError: errorMessage,
        httpStatus: 503,
        metrics: {
          confidence: 0,
          affectedAreaPercentage: 0,
          severity: 'Moderate',
          pathogenClass: 'None',
          detectionTimeMs: 0,
          heatmapZones: [],
          identifiedPlant: {
            cropKey: 'unknown',
            commonName: 'AI Service Unavailable',
            commonName_te: 'AI సేవ అందుబాటులో లేదు',
            commonName_hi: 'एआई सेवा अनुपलब्ध है',
            scientificName: 'N/A',
            family: 'N/A',
            confidence: 0,
            isFoliageDetected: false,
            tissueHealthStatus: 'Healthy',
            chlorophyllPercentage: 0,
            chlorosisPercentage: 0,
            necrosisPercentage: 0
          }
        },
        diagnosis: {
          id: 'ai_service_unavailable',
          crop: 'Service Notice',
          crop_te: 'సేవా నోటీసు',
          crop_hi: 'सेवा सूचना',
          name: 'AI Service Unavailable',
          name_te: 'AI సేవ అందుబాటులో లేదు',
          name_hi: 'एआई सेवा अनुपलब्ध है',
          type: 'disease',
          pathogenType: 'None',
          scientificName: 'N/A',
          severityLevel: 'Moderate',
          symptoms: [
            `The AI vision service encountered a connection issue: ${errorMessage}`,
            'Please verify backend connection and try again.'
          ],
          symptoms_te: [
            `AI విశ్లేషణ సేవతో అనుసంధానం కాలేకపోయింది: ${errorMessage}`,
            'దయచేసి మీ సర్వర్ లేదా ఇంటర్నెట్ కనెక్షన్ తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.'
          ],
          symptoms_hi: [
            `एआई विश्लेषण सेवा से संपर्क नहीं हो सका: ${errorMessage}`,
            'कृपया सर्वर या नेटवर्क कनेक्शन जांचें और पुनः प्रयास करें।'
          ],
          preventionMethods: [
            'Click "Retry Analysis" to re-send the image to the AI vision engine.',
            'Ensure the backend server is running on port 5000.'
          ],
          chemicalRemedies: [],
          naturalRemedies: []
        },
        structuredAnalysis: {
          isPlant: false,
          plantConfidence: 0,
          crop: null,
          cropConfidence: 0,
          healthStatus: 'service_error',
          healthConfidence: 0,
          disease: null,
          pest: null,
          stress: null,
          symptoms: [
            `The AI vision service encountered a connection issue: ${errorMessage}`,
            'Please verify backend connection and try again.'
          ],
          visualEvidence: [],
          naturalControls: [],
          treatmentOptions: [],
          prevention: [],
          heatmapZones: [],
          uncertaintyReason: errorMessage
        }
      };

      setScanResult(errorResult);
    } finally {
      setIsScanning(false);
    }
  };

  const handleSampleClick = (sample: SampleOutbreak) => {
    setSelectedImage(sample.image);
    setSelectedSampleId(sample.id);
    setSelectedCropFilter('auto');
    executeDiagnosis(sample.id, sample.image, 'auto', undefined, undefined, 'SAMPLE');
  };

  // Unified single function for processing both Camera Capture and Gallery Upload
  const analyzeCropImage = async (imageFile: File, source: 'CAMERA' | 'UPLOAD') => {
    // 1. Check file is an instance of File (Instruction #3)
    if (!(imageFile instanceof File)) {
      setUploadError('Invalid selection: Selected item is not a File.');
      return;
    }

    // 2. Validate MIME type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(imageFile.type)) {
      setUploadError(`Unsupported image format: "${imageFile.type || 'unknown'}". Please select a JPEG, PNG, or WebP image.`);
      return;
    }

    // 3. Validate file size
    if (imageFile.size <= 0) {
      setUploadError('The selected file is empty (0 bytes).');
      return;
    }
    if (imageFile.size > 20 * 1024 * 1024) {
      setUploadError('Image size exceeds 20MB limit. Please select a smaller photo.');
      return;
    }

    // Development Logging (Instruction #2 & Requirements)
    console.log(`[CropShield] Image received from: ${source}`);
    console.log('[CropShield] File name:', imageFile.name);
    console.log('[CropShield] File type:', imageFile.type);
    console.log('[CropShield] File size:', imageFile.size, 'bytes');

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        console.log('[CropShield] Image dimensions:', img.width, 'x', img.height);
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);
          setSelectedImage(compressedBase64);
          setSelectedSampleId(''); // custom user photo

          const fileMeta = {
            name: imageFile.name,
            type: imageFile.type,
            size: imageFile.size,
            dimensions: `${img.width}x${img.height}`
          };

          // Requirement #14: DO NOT use the filename to determine the crop. The actual image is analyzed.
          executeDiagnosis(undefined, compressedBase64, selectedCropFilter, undefined, fileMeta, source);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  // Safe client-side image processing & scaling for file input
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      analyzeCropImage(file, 'UPLOAD');
    }
    e.target.value = '';
  };

  const handleCropFilterChange = (newCrop: string) => {
    setSelectedCropFilter(newCrop);
    executeDiagnosis(undefined, selectedImage, newCrop);
  };

  // Synchronized Voice Agent Readout
  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    if (!scanResult) return;

    const sa = scanResult.structuredAnalysis;
    const plantName = sa?.crop || scanResult.metrics.identifiedPlant?.commonName || 'Plant';
    const plantName_te = sa?.crop_te || scanResult.metrics.identifiedPlant?.commonName_te || plantName;
    const plantName_hi = sa?.crop_hi || scanResult.metrics.identifiedPlant?.commonName_hi || plantName;

    let speechText = '';

    if (!sa || sa.healthStatus === 'healthy') {
      if (language === 'te') {
        speechText = `గుర్తించిన మొక్క: ${plantName_te}. మీ పంట పూర్తిగా ఆరోగ్యంగా ఉంది. ఎలాంటి తెగులు లేదా పురుగు దాడి లేదు. క్రమంతప్పకుండా క్షేత్ర పరిశీలన చేయండి.`;
      } else if (language === 'hi') {
        speechText = `पहचाना गया पौधा: ${plantName_hi}। आपकी फसल पूर्णतः स्वस्थ है। किसी रोग या कीट के लक्षण नहीं मिले हैं। नियमित देखभाल जारी रखें।`;
      } else {
        speechText = `Identified plant: ${plantName}. Your crop is healthy with zero disease or pest symptoms detected. Continue regular field scouting and balanced watering.`;
      }
    } else if (sa.healthStatus === 'disease_suspected') {
      const diseaseName = language === 'te' ? (sa.disease?.name_te || sa.disease?.name) : language === 'hi' ? (sa.disease?.name_hi || sa.disease?.name) : sa.disease?.name;
      const conf = Math.round((sa.disease?.confidence || 0.88) * 100);
      const reasons = language === 'te' 
        ? (sa.whyOccurred_te?.length ? sa.whyOccurred_te : scanResult?.diagnosis?.whyOccurred_te)
        : language === 'hi'
        ? (sa.whyOccurred_hi?.length ? sa.whyOccurred_hi : scanResult?.diagnosis?.whyOccurred_hi)
        : (sa.whyOccurred?.length ? sa.whyOccurred : scanResult?.diagnosis?.whyOccurred);
      const causeText = reasons && reasons.length > 0 ? reasons[0] : '';

      if (language === 'te') {
        speechText = `గుర్తించిన మొక్క: ${plantName_te}. వ్యాధి అనుమానించబడింది: ${diseaseName}. ఖచ్చితత్వం: ${conf} శాతం. తీవ్రత: ${sa.disease?.severity}. ${causeText ? `వ్యాధి రావడానికి గల కారణం: ${causeText}.` : ''} సరైన మందుల మోతాదును చూడండి.`;
      } else if (language === 'hi') {
        speechText = `पहचाना गया पौधा: ${plantName_hi}। संभावित रोग: ${diseaseName}। सटीकता: ${conf} प्रतिशत। गंभीरता: ${sa.disease?.severity}। ${causeText ? `यह रोग होने का मुख्य कारण: ${causeText}।` : ''} उपचार के लिए दवा की सटीक खुराक देखें।`;
      } else {
        speechText = `Identified plant: ${plantName}. Disease suspected: ${diseaseName} with ${conf} percent confidence. Rated as ${sa.disease?.severity} severity. ${causeText ? `Why it occurred: ${causeText}.` : ''} Please review the dosage calculator for treatment.`;
      }
    } else if (sa.healthStatus === 'pest_suspected') {
      const pestName = language === 'te' ? (sa.pest?.name_te || sa.pest?.name) : language === 'hi' ? (sa.pest?.name_hi || sa.pest?.name) : sa.pest?.name;
      const conf = Math.round((sa.pest?.confidence || 0.88) * 100);
      const reasons = language === 'te' 
        ? (sa.whyOccurred_te?.length ? sa.whyOccurred_te : scanResult?.diagnosis?.whyOccurred_te)
        : language === 'hi'
        ? (sa.whyOccurred_hi?.length ? sa.whyOccurred_hi : scanResult?.diagnosis?.whyOccurred_hi)
        : (sa.whyOccurred?.length ? sa.whyOccurred : scanResult?.diagnosis?.whyOccurred);
      const causeText = reasons && reasons.length > 0 ? reasons[0] : '';

      if (language === 'te') {
        speechText = `గుర్తించిన మొక్క: ${plantName_te}. పురుగు దాడి అనుమానించబడింది: ${pestName}. ఖచ్చితత్వం: ${conf} శాతం. ${causeText ? `పురుగు రావడానికి గల కారణం: ${causeText}.` : ''} నివారణ చర్యలను పరిశీలించండి.`;
      } else if (language === 'hi') {
        speechText = `पहचाना गया पौधा: ${plantName_hi}। कीट प्रकोप संभावित: ${pestName}। सटीकता: ${conf} प्रतिशत। ${causeText ? `कीट प्रकोप का मुख्य कारण: ${causeText}।` : ''} जैविक एवं कीटनाशक नियंत्रण देखें।`;
      } else {
        speechText = `Identified plant: ${plantName}. Pest suspected: ${pestName} with ${conf} percent confidence. ${causeText ? `Why it occurred: ${causeText}.` : ''} Check the recommended biological and IPM controls.`;
      }
    } else if (sa.healthStatus === 'stress_suspected') {
      if (language === 'te') {
        speechText = `గుర్తించిన మొక్క: ${plantName_te}. పోషకాలు లేదా తేమ ఒత్తిడి వల్ల ఆకులు పసుపుబారాయి. సూక్ష్మపోషకాల పిచికారీని పరిశీలించండి.`;
      } else if (language === 'hi') {
        speechText = `पहचाना गया पौधा: ${plantName_hi}। पोषक तत्वों अथवा नमी के तनाव से पत्तियां पीली पड़ी हैं। सूक्ष्म पोषक तत्व छिड़काव करें।`;
      } else {
        speechText = `Identified plant: ${plantName}. Plant stress detected, likely due to nutrient deficiency or moisture imbalance. Test soil and apply micronutrients.`;
      }
    } else {
      if (language === 'te') {
        speechText = `ఫోటో స్పష్టంగా లేదు లేదా పంట ఆకు గుర్తించబడలేదు. దయచేసి మంచి వెలుతురులో ఆకు దగ్గరగా ఫోటో తీయండి.`;
      } else if (language === 'hi') {
        speechText = `फोटो स्पष्ट नहीं है अथवा कोई पौधा नहीं मिला। कृपया अच्छी रोशनी में पास से स्पष्ट फोटो लें।`;
      } else {
        speechText = `Unable to confidently diagnose this image. Please take a clearer close-up photograph of the leaf in good lighting.`;
      }
    }

    speak(speechText);
  };

  const sa: StructuredCropAnalysis | undefined = scanResult?.structuredAnalysis;
  const isServiceError = sa?.healthStatus === 'service_error' || Boolean(scanResult?.serviceError);
  const isHealthy = sa?.healthStatus === 'healthy';
  const isDisease = sa?.healthStatus === 'disease_suspected';
  const isPest = sa?.healthStatus === 'pest_suspected';
  const isStress = sa?.healthStatus === 'stress_suspected';
  const isUncertain = sa?.healthStatus === 'uncertain';
  const isPoorQuality = sa?.healthStatus === 'poor_quality';
  const isNotPlant = sa?.healthStatus === 'not_a_plant';

  return (
    <div id="crop-scanner" className="w-full my-8 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black mb-3 shadow-xs">
          <Crosshair className="w-4 h-4 text-emerald-600 animate-spin" />
          <span>{t('scanner_title')}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'te' 
            ? 'AI మొక్క & పంట తెగుళ్ల గుర్తింపు వేదిక' 
            : language === 'hi' 
            ? 'सटीक एआई पौधा एवं फसल रोग पहचान इंजन' 
            : 'AI Crop, Plant & Disease Diagnostic Engine'}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2 font-medium">
          {language === 'te'
            ? 'మొక్క ఆకు లేదా కాయ ఫోటో తీయండి. AI స్వయంచాలకంగా మొక్కను గుర్తించి, ఆరోగ్య స్థితిని నిష్పక్షపాతంగా విశ్లేషిస్తుంది.'
            : language === 'hi'
            ? 'पौधे या फल की फोटो लें। एआई स्वचालित रूप से पौधे की पहचान करेगा एवं स्वस्थ अथवा रोग की स्थिति का निष्पक्ष विश्लेषण करेगा।'
            : 'Capture or upload a photo of any crop leaf or plant. Our multi-stage neural vision engine validates image quality, identifies crop species, and accurately classifies health.'}
        </p>
      </div>

      {/* Target Plant/Crop Selector Bar */}
      <div className="mb-4 bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 block">
              {language === 'te' ? 'పంట / మొక్క ఎంపిక (లేదా ఆటో డిటెక్ట్):' : language === 'hi' ? 'फसल / पौधा चुनें (या ऑटो-डिटेक्ट):' : 'Select Crop / Plant (or Auto-Detect):'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {language === 'te' ? '16 ప్రధాన పంటలకు మద్దతు కలదు (టమోటా, వరి, పత్తి, మిరప మొదలైనవి)' : language === 'hi' ? '16 प्रमुख फसलों का समर्थन (टमाटर, धान, कपास, मिर्च आदि)' : 'Supports 16 agricultural crops with botanical profiles'}
            </span>
          </div>
        </div>

        <div className="relative min-w-[260px]">
          <select
            value={selectedCropFilter}
            onChange={(e) => handleCropFilterChange(e.target.value)}
            className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border-2 border-emerald-300 rounded-xl text-xs sm:text-sm font-black text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all cursor-pointer appearance-none shadow-xs"
          >
            {AVAILABLE_CROP_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {language === 'te' ? opt.label_te : language === 'hi' ? opt.label_hi : opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-emerald-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Outbreak & Healthy Quick-Select Carousel Bar */}
      <div className="mb-6 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'te' ? 'వెంటనే పరీక్షించడానికి నమూనా పంటలు (ఆరోగ్యకరమైనవి & తెగుళ్లు):' : language === 'hi' ? 'तुरंत जांचने के लिए नमूना फसलें (स्वस्थ एवं रोग ग्रस्त):' : 'Quick Test Verified Samples (Healthy & Outbreaks):'}</span>
          </span>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
            7 Verified Samples
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SAMPLE_OUTBREAKS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                data-sample-id={sample.id}
                onClick={() => handleSampleClick(sample)}
                className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all border-2 cursor-pointer shadow-xs ${
                  isSelected
                    ? `${sample.colorActive} ring-2 ring-emerald-400/50 scale-102`
                    : `${sample.colorBg}`
                }`}
              >
                <img 
                  src={sample.image} 
                  alt={sample.name} 
                  className="w-8 h-8 rounded-lg object-cover border border-slate-200 shrink-0 bg-white shadow-xs" 
                />
                <div className="min-w-0">
                  <span className={`text-[9px] font-black uppercase tracking-wider block ${
                    isSelected ? 'text-white/90' : sample.type === 'healthy' ? 'text-emerald-800' : 'text-slate-900'
                  }`}>
                    {sample.crop}
                  </span>
                  <span className={`text-[11px] font-bold truncate block ${
                    isSelected ? 'text-white' : 'text-slate-700'
                  }`}>
                    {language === 'te' ? sample.name_te.split('-')[1] || sample.name_te : language === 'hi' ? sample.name_hi.split('-')[1] || sample.name_hi : sample.name.split('-')[1] || sample.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Image Viewfinder & Upload Actions */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-emerald-200 shadow-lg aspect-video sm:aspect-[4/3] flex items-center justify-center">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={selectedImage} 
                  alt="Scanned Crop Leaf" 
                  className="w-full h-full object-cover"
                />

                {/* Animated Laser Scanning Line */}
                {isScanning && (
                  <div className="animate-scan-line z-20 pointer-events-none" />
                )}

                {/* Dynamic Lesion Heatmap Overlays (Only for confirmed diseased/pest leaves) */}
                {!isScanning && scanResult && showHeatmap && !isHealthy && sa?.heatmapZones && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {sa.heatmapZones.map((zone, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border-2 border-red-500 bg-red-500/30 animate-pulse flex items-center justify-center"
                        style={{
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          width: `${zone.radius * 2}%`,
                          height: `${zone.radius * 2}%`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
                        }}
                      >
                        <span className="text-[10px] font-black text-white bg-red-600 px-2 py-0.5 rounded-full shadow-md">
                          {zone.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Multi-Phase AI Scanning Progress HUD */}
                {isScanning && (
                  <div className="absolute inset-0 bg-white/94 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-6 text-center">
                    <RefreshCw className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
                    
                    <h3 className="text-base font-black text-slate-900">
                      {language === 'te' 
                        ? 'AI బహుళ-దశల విశ్లేషణ జరుగుతోంది...' 
                        : language === 'hi' 
                        ? 'एआई बहु-स्तरीय विश्लेषण चल रहा है...' 
                        : 'Neural Diagnostic Pipeline Running...'}
                    </h3>

                    {/* Progress Steps */}
                    <div className="w-full max-w-xs mt-4 space-y-2 text-left">
                      <div className={`flex items-center gap-2 text-xs font-bold ${scanStep >= 1 ? 'text-emerald-700' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>1. Image Quality & Foliage Validation</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs font-bold ${scanStep >= 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>2. Botanical Crop & Venation Classification</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs font-bold ${scanStep >= 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>3. Healthy vs Disease vs Pest Discrimination</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs font-bold ${scanStep >= 4 ? 'text-emerald-700' : 'text-slate-400'}`}>
                        <Check className="w-3.5 h-3.5" />
                        <span>4. Confidence Threshold Gate & Knowledge Base</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center flex flex-col items-center">
                <Camera className="w-14 h-14 text-slate-300 mb-3" />
                <p className="text-sm text-slate-700 font-bold">{t('drop_photo')}</p>
                <p className="text-xs text-slate-500 mt-1">{t('supports_formats')}</p>
              </div>
            )}
          </div>

          {/* Photographic Capture Guidance Box */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-slate-700">
            <div className="flex items-center gap-2 font-black text-emerald-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'te' ? 'ఖచ్చితమైన AI ఫలితాల కోసం ఫోటో సూచనలు:' : language === 'hi' ? 'सटीक एआई जांच के लिए सुझाव:' : 'Photo Capture Best Practices for AI Accuracy:'}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium text-slate-600">
              <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-500" /> {language === 'te' ? 'సహజ వెలుతురు' : language === 'hi' ? 'प्राकृतिक रोशनी' : 'Natural daylight'}</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> {language === 'te' ? 'ఆకుపై స్పష్టమైన ఫోకస్' : language === 'hi' ? 'पत्ती पर स्पष्ट फोकस' : 'Sharp leaf focus'}</span>
              <span className="flex items-center gap-1"><Sprout className="w-3 h-3 text-emerald-600" /> {language === 'te' ? 'దగ్గరగా ఫోటో తీయండి' : language === 'hi' ? 'पास से फोटो लें' : 'Close-up framing'}</span>
              <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-600" /> {language === 'te' ? 'మసక లేకుండా' : language === 'hi' ? 'धुंधलापन रहित' : 'Zero blur & glare'}</span>
            </div>
          </div>

          {/* Action Buttons: Camera Snap / File Upload */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => setIsCameraOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white text-xs sm:text-sm font-bold cursor-pointer shadow-md shadow-emerald-600/20 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>{language === 'te' ? 'కెమెరాతో ఫోటో తీయండి' : language === 'hi' ? 'कैमरे से फोटो लें' : 'Take Crop Photo'}</span>
            </button>

            <label className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-emerald-50 active:scale-98 text-slate-800 border-2 border-emerald-300 text-xs sm:text-sm font-bold cursor-pointer shadow-xs transition-all">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{language === 'te' ? 'గ్యాలరీ నుండి అప్‌లోడ్' : language === 'hi' ? 'गैलरी से अपलोड' : 'Upload From Gallery'}</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </label>
          </div>

          {uploadError && (
            <p className="text-xs text-red-600 font-bold bg-red-50 p-2 rounded-lg border border-red-200">
              {uploadError}
            </p>
          )}
        </div>

        {/* Right Column: AI Diagnostic Report & Scientific Breakdown */}
        <div className="lg:col-span-6">
          {scanResult ? (
            <div className="rounded-2xl p-5 sm:p-6 border-2 border-emerald-200 shadow-xl flex flex-col gap-4 relative bg-white">
              
              {/* CRITICAL: REAL AI MODEL NOT CONNECTED BANNER */}
              {scanResult.aiConnected === false && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500 text-amber-950 flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">AI Backend Integration Status</span>
                      <h4 className="text-sm sm:text-base font-black text-amber-950">
                        REAL AI MODEL NOT CONNECTED
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    Crop Shield is operating with the real Gemini 2.5 Flash Vision pipeline ready, but <code className="font-mono font-bold bg-amber-200/70 px-1 py-0.5 rounded text-amber-950">GEMINI_API_KEY</code> has not yet been set in <code className="font-mono font-bold bg-amber-200/70 px-1 py-0.5 rounded text-amber-950">server/.env</code>.
                  </p>
                  <div className="bg-white/90 p-3 rounded-xl border border-amber-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">🔧 How to connect Google Gemini Vision AI:</span>
                    <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-600 font-medium">
                      <li>Get your free Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-bold">Google AI Studio</a>.</li>
                      <li>Create or open <code className="font-mono text-emerald-800 font-bold">server/.env</code> and set: <code className="font-mono text-emerald-800 font-bold">GEMINI_API_KEY=your_key_here</code>.</li>
                      <li>Restart the backend server (<code className="font-mono text-emerald-800 font-bold">node server.js</code>).</li>
                    </ol>
                    <p className="mt-2 text-[10px] text-slate-500 italic">
                      * Mock fallbacks (such as defaulting to Tomato Early Blight) are strictly disabled to prevent false diagnostic advice.
                    </p>

                    {/* Interactive Direct Key Connection */}
                    <div className="mt-3 pt-3 border-t border-amber-200">
                      <button
                        type="button"
                        onClick={() => setShowKeyForm(!showKeyForm)}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>{showKeyForm ? 'Close Key Input' : '🔑 Connect Gemini API Key (Instant Live Activation)'}</span>
                      </button>

                      {showKeyForm && (
                        <form onSubmit={handleSaveApiKey} className="mt-2.5 flex flex-col gap-2">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="password"
                              value={apiKeyInput}
                              onChange={(e) => setApiKeyInput(e.target.value)}
                              placeholder="Paste your Gemini API key (AIzaSy...)"
                              className="flex-1 px-3 py-2 bg-white border-2 border-amber-300 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-600 shadow-xs"
                              required
                            />
                            <button
                              type="submit"
                              disabled={isSavingKey}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-98 disabled:opacity-50 text-white text-xs font-black rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-1 shrink-0"
                            >
                              {isSavingKey ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                              <span>{isSavingKey ? 'Connecting...' : 'Save & Activate AI'}</span>
                            </button>
                          </div>
                          {saveKeyFeedback && (
                            <p className={`text-[11px] font-bold ${saveKeyFeedback.success ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {saveKeyFeedback.message}
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 1. NON-PLANT OBJECT REJECTION CARD */}
              {isNotPlant && (
                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">AI Image Validation Gatekeeper</span>
                      <h4 className="text-base font-black">
                        {language === 'te' ? 'మొక్క లేదా పంట ఆకు గుర్తించబడలేదు' : language === 'hi' ? 'कोई पौधा अथवा फसल नहीं पाई गई' : 'No Crop or Plant Detected'}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {sa?.uncertaintyReason}
                  </p>
                  <div className="p-3 bg-white/80 rounded-xl border border-amber-200 text-xs text-slate-700">
                    <span className="font-bold block mb-1">📸 {language === 'te' ? 'ఎలాంటి ఫోటో తీయాలి?' : language === 'hi' ? 'कैसी फोटो लें?' : 'How to take an agricultural photo:'}</span>
                    <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-600">
                      <li>{language === 'te' ? 'వ్యవసాయ పంట ఆకు లేదా కాండం దగ్గరగా ఉండేలా ఫోటో తీయండి' : language === 'hi' ? 'फसल की पत्ती अथवा तने की नजदीक से फोटो लें' : 'Photograph a real crop leaf, fruit, or stem.'}</li>
                      <li>{language === 'te' ? 'వాహనాలు, మనుషులు లేదా ఇంట్లోని వస్తువులు కాకుండా కేవలం పంటను మాత్రమే ఫోటో తీయండి' : language === 'hi' ? 'केवल कृषि पौधे की पत्ती को फ्रेम में रखें' : 'Avoid photographing vehicles, furniture, or non-agricultural objects.'}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 2. POOR QUALITY / BLURRY / DARK REJECTION CARD */}
              {isPoorQuality && (
                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">AI Image Quality Check</span>
                      <h4 className="text-base font-black">
                        {language === 'te' ? 'ఫోటో నాణ్యత సరిపోలేదు' : language === 'hi' ? 'फोटो की गुणवत्ता अपर्याप्त' : 'Image Quality Insufficient for AI Diagnosis'}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {language === 'te' ? sa?.uncertaintyReason_te : language === 'hi' ? sa?.uncertaintyReason_hi : sa?.uncertaintyReason}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                    <div className="bg-white p-2 rounded-lg border border-amber-200">
                      <span className="text-slate-500 font-bold block">Brightness</span>
                      <span className="font-black text-slate-800 text-xs">{sa?.qualityMetrics?.brightness} / 255</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-amber-200">
                      <span className="text-slate-500 font-bold block">Sharpness</span>
                      <span className="font-black text-slate-800 text-xs">{sa?.qualityMetrics?.sharpness} / 100</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-amber-200">
                      <span className="text-slate-500 font-bold block">Contrast</span>
                      <span className="font-black text-slate-800 text-xs">{sa?.qualityMetrics?.contrast} / 100</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SITUATION A: AI SERVICE UNAVAILABLE (API / UPSTREAM ERROR) */}
              {isServiceError && (
                <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 block">AI Gateway Notice</span>
                      <h4 className="text-base font-black">
                        {language === 'te' ? 'AI సేవ అందుబాటులో లేదు' : language === 'hi' ? 'एआई सेवा अनुपलब्ध है' : 'AI Service Unavailable'}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed font-medium">
                    {language === 'te'
                      ? 'AI విశ్లేషణ సేవ ప్రస్తుతం ఈ చిత్రాన్ని ప్రాసెస్ చేయలేకపోయింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
                      : language === 'hi'
                      ? 'एआई विश्लेषण सेवा वर्तमान में इस छवि को संसाधित नहीं कर सकी। कृपया पुनः प्रयास करें।'
                      : 'The AI analysis service could not process this image. Please try again.'}
                  </p>
                  {scanResult?.apiError && (
                    <div className="p-2.5 bg-white/90 rounded-lg border border-rose-200 font-mono text-[11px] text-rose-800 break-all">
                      <strong>HTTP {scanResult.httpStatus || 500}:</strong> {scanResult.apiError}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => executeDiagnosis(undefined, selectedImage, selectedCropFilter)}
                    className="w-full sm:w-auto self-start px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : language === 'hi' ? 'पुनः प्रयास करें' : 'Retry Analysis'}</span>
                  </button>
                </div>
              )}

              {/* SITUATION B: HONEST BOTANICAL UNCERTAINTY (LOW VISUAL EVIDENCE) */}
              {isUncertain && !isServiceError && (
                <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex flex-col gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">Botanical Evidence Gate</span>
                      <h4 className="text-base font-black">
                        {language === 'te' ? 'ఖచ్చితంగా నిర్ధారించలేకపోయాము' : language === 'hi' ? 'निश्चित निदान संभव नहीं' : 'Unable to Confidently Diagnose'}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {sa?.uncertaintyReason || (language === 'te' ? 'చిత్రం తగినంత స్పష్టంగా లేదు. దయచేసి దగ్గరగా స్పష్టమైన ఫోటో తీయండి.' : language === 'hi' ? 'छवि में पर्याप्त दृश्य प्रमाण नहीं हैं। कृपया पास से स्पष्ट फोटो लें।' : 'The image does not provide enough visual evidence. Please take a clearer close-up photograph.')}
                  </p>
                </div>
              )}

              {/* 4. IDENTIFIED PLANT & CROP SPECIES HEADER CARD (When plant is detected, AI connected and no service error) */}
              {!isNotPlant && !isServiceError && scanResult.aiConnected !== false && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border-2 border-emerald-300 shadow-xs flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <Sprout className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          {language === 'te' ? 'గుర్తించిన మొక్క / పంట' : language === 'hi' ? 'पहचाना गया पौधा / फसल' : 'Identified Plant Species'}
                        </span>
                        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          {language === 'te' 
                            ? `${sa?.crop_te || scanResult.metrics.identifiedPlant?.commonName_te} (${sa?.crop || scanResult.metrics.identifiedPlant?.commonName})` 
                            : language === 'hi' 
                            ? `${sa?.crop_hi || scanResult.metrics.identifiedPlant?.commonName_hi} (${sa?.crop || scanResult.metrics.identifiedPlant?.commonName})` 
                            : (sa?.crop || scanResult.metrics.identifiedPlant?.commonName)}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-xs font-black shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{Math.round((sa?.cropConfidence !== undefined ? sa.cropConfidence : 0.94) * 100)}% Match</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-1.5 border-t border-emerald-100 gap-1">
                    <span className="italic font-semibold text-emerald-950 font-serif">
                      {sa?.scientificName || scanResult.metrics.identifiedPlant?.scientificName}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {sa?.family || scanResult.metrics.identifiedPlant?.family}
                    </span>
                  </div>

                  {/* Spectral Foliage Composition Metrics */}
                  {sa?.metrics && (
                    <div className="mt-1 pt-2 border-t border-emerald-100 grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="bg-white/90 p-1.5 rounded-lg border border-emerald-200">
                        <span className="text-slate-500 font-bold block">Chlorophyll (Green)</span>
                        <span className="font-black text-emerald-700 font-mono text-xs">
                          {sa.metrics.chlorophyllPct}%
                        </span>
                      </div>
                      <div className="bg-white/90 p-1.5 rounded-lg border border-amber-200">
                        <span className="text-slate-500 font-bold block">Chlorosis (Yellow)</span>
                        <span className="font-black text-amber-700 font-mono text-xs">
                          {sa.metrics.chlorosisPct}%
                        </span>
                      </div>
                      <div className="bg-white/90 p-1.5 rounded-lg border border-rose-200">
                        <span className="text-slate-500 font-bold block">Necrosis (Dead)</span>
                        <span className="font-black text-rose-700 font-mono text-xs">
                          {sa.metrics.necrosisPct}%
                        </span>
                      </div>
                    </div>
                  )}

                  {/* One-Click Plant Confirmation / Quick Correct Switcher */}
                  <div className="mt-1 pt-2 border-t border-emerald-100 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-950 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {language === 'te' 
                          ? 'పంట సరిగ్గా ఉందా? వేరైతే 1-క్లిక్‌తో మార్చండి:' 
                          : language === 'hi' 
                          ? 'क्या फसल सही है? बदलने के लिए क्लिक करें:' 
                          : 'Is this your crop? Tap to verify or switch:'}
                      </span>
                      {selectedCropFilter !== 'auto' && (
                        <button
                          type="button"
                          onClick={() => handleCropFilterChange('auto')}
                          className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          {language === 'te' ? 'ఆటో-గుర్తింపు' : language === 'hi' ? 'ऑटो-डिटेक्ट' : 'Reset to Auto'}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {(sa?.candidateCrops && sa.candidateCrops.length > 0 ? sa.candidateCrops : [
                        { key: 'sugarcane', name: 'Sugarcane 🎋', name_te: 'చెరకు 🎋', name_hi: 'गन्ना 🎋' },
                        { key: 'maize', name: 'Maize 🌽', name_te: 'మొక్కజొన్న 🌽', name_hi: 'मक्का 🌽' },
                        { key: 'rice', name: 'Rice 🌾', name_te: 'వరి 🌾', name_hi: 'धान 🌾' },
                        { key: 'cotton', name: 'Cotton ☁️', name_te: 'పత్తి ☁️', name_hi: 'कपास ☁️' },
                        { key: 'chilli', name: 'Chilli 🌶️', name_te: 'మిరప 🌶️', name_hi: 'मिर्च 🌶️' },
                        { key: 'tomato', name: 'Tomato 🍅', name_te: 'టమోటా 🍅', name_hi: 'टमाटर 🍅' }
                      ]).map((cand) => {
                        const currentIdentifiedKey = scanResult.metrics.identifiedPlant?.cropKey || (sa?.crop ? Object.keys(BOTANICAL_CROPS).find(k => BOTANICAL_CROPS[k].commonName.toLowerCase() === sa.crop?.toLowerCase()) : '');
                        const isCurrentlyActive = selectedCropFilter === cand.key || (selectedCropFilter === 'auto' && currentIdentifiedKey === cand.key);
                        const displayName = language === 'te' ? cand.name_te : language === 'hi' ? cand.name_hi : cand.name;

                        return (
                          <button
                            key={cand.key}
                            type="button"
                            onClick={() => handleCropFilterChange(cand.key)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              isCurrentlyActive
                                ? 'bg-emerald-600 text-white shadow-xs border border-emerald-700'
                                : 'bg-white/90 hover:bg-emerald-100/80 text-slate-700 border border-emerald-200 hover:border-emerald-300'
                            }`}
                          >
                            {isCurrentlyActive && <Check className="w-3 h-3 text-white" />}
                            <span>{displayName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. HEALTH STATUS DIAGNOSIS HEADER */}
              {!isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      {isHealthy ? (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 bg-green-100 text-green-900 border border-green-300">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>{language === 'te' ? 'ఆరోగ్యకరమైన మొక్క (తెగులు లేదు)' : language === 'hi' ? 'स्वस्थ पौधा (रोग मुक्त)' : 'Healthy Plant (No Disease / Pest)'}</span>
                        </span>
                      ) : isPest ? (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300">
                          <Bug className="w-4 h-4 text-amber-700" />
                          <span>{language === 'te' ? 'పురుగు దాడి అనుమానించబడింది' : language === 'hi' ? 'कीट प्रकोप संभावित' : 'Pest Infestation Suspected'}</span>
                        </span>
                      ) : isStress ? (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 bg-blue-100 text-blue-900 border border-blue-300">
                          <Droplets className="w-4 h-4 text-blue-700" />
                          <span>{language === 'te' ? 'పోషకాలు / తేమ ఒత్తిడి' : language === 'hi' ? 'पोषक तत्व / नमी तनाव' : 'Abiotic Stress Suspected'}</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 bg-rose-100 text-rose-900 border border-rose-300">
                          <AlertTriangle className="w-4 h-4 text-rose-700" />
                          <span>{language === 'te' ? 'తెగులు వ్యాధి అనుమానించబడింది' : language === 'hi' ? 'संभावित फसल रोग' : 'Possible Disease Suspected'}</span>
                        </span>
                      )}

                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        {sa?.crop || scanResult.diagnosis.crop}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                      {isHealthy 
                        ? (language === 'te' ? 'ఆరోగ్యకరమైన పచ్చని ఆకులు' : language === 'hi' ? 'स्वस्थ पत्तियां एवं उत्तम वृद्धि' : 'Optimal Health & Vigorous Foliage')
                        : isPest 
                        ? (language === 'te' ? sa?.pest?.name_te || sa?.pest?.name : language === 'hi' ? sa?.pest?.name_hi || sa?.pest?.name : sa?.pest?.name)
                        : isStress 
                        ? (language === 'te' ? sa?.stress?.type_te : language === 'hi' ? sa?.stress?.type_hi : sa?.stress?.type)
                        : (language === 'te' ? sa?.disease?.name_te || scanResult.diagnosis.name_te : language === 'hi' ? sa?.disease?.name_hi || scanResult.diagnosis.name_hi : sa?.disease?.name || scanResult.diagnosis.name)}
                    </h3>

                    {/* Separate Disease and Pest confirmation indicators */}
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-600 font-semibold">
                      <span className="flex items-center gap-1">
                        <span className="text-slate-400">Disease:</span> 
                        <span className={sa?.disease ? "text-rose-700 font-black" : "text-emerald-700 font-bold"}>
                          {sa?.disease ? sa.disease.name : "None detected"}
                        </span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="text-slate-400">Pest:</span> 
                        <span className={sa?.pest ? "text-amber-700 font-black" : "text-emerald-700 font-bold"}>
                          {sa?.pest ? sa.pest.name : "None detected"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Voice Narration Button */}
                  <button
                    onClick={handleVoiceReadout}
                    className={`p-2.5 sm:p-3 rounded-xl border flex items-center gap-1.5 transition-all shadow-xs text-xs font-bold cursor-pointer ${
                      isSpeaking 
                        ? 'bg-amber-100 border-amber-400 text-amber-800 animate-pulse' 
                        : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                    }`}
                    title="Listen to Diagnosis in your language"
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                    <span className="hidden sm:inline">{isSpeaking ? t('audio_stop') : t('audio_listen')}</span>
                  </button>
                </div>
              )}

              {/* 6. VITAL METRICS GRID */}
              {!isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider block font-bold">{t('confidence')}</span>
                    <span className="text-lg sm:text-xl font-black text-emerald-700">
                      {Math.round((sa?.healthConfidence || 0.94) * 100)}%
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-center ${
                    isHealthy ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-200'
                  }`}>
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider block font-bold">{t('severity')}</span>
                    <span className={`text-lg sm:text-xl font-black ${
                      isHealthy ? 'text-green-700' : 'text-rose-700'
                    }`}>
                      {isHealthy ? 'Zero Threat' : sa?.disease?.severity?.toUpperCase() || sa?.pest?.severity || 'Moderate'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-600 uppercase tracking-wider block font-bold">{t('affected_area')}</span>
                    <span className="text-lg sm:text-xl font-black text-slate-800">
                      {isHealthy ? '0%' : `${scanResult.metrics.affectedAreaPercentage}%`}
                    </span>
                  </div>
                </div>
              )}

              {/* 7. OBSERVED SYMPTOMS OR HEALTH DIAGNOSTICS */}
              {!isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isHealthy ? (language === 'te' ? 'ఆరోగ్య లక్షణాలు' : language === 'hi' ? 'स्वास्थ्य लक्षण' : 'Observed Botanical Health') : t('observed_symptoms')}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {(language === 'te' && sa?.symptoms_te 
                      ? sa.symptoms_te 
                      : language === 'hi' && sa?.symptoms_hi 
                      ? sa.symptoms_hi 
                      : sa?.symptoms || scanResult.diagnosis.symptoms
                    ).map((symptom, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 font-medium">
                        <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${isHealthy ? 'bg-green-600' : 'bg-amber-500'}`} />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7.5. CONCRETE VISUAL EVIDENCE IDENTIFIED BY AI */}
              {!isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && sa?.visualEvidence && sa.visualEvidence.length > 0 && (
                <div className="bg-emerald-50/80 p-3.5 rounded-xl border-2 border-emerald-300 shadow-xs">
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'te' ? 'AI గుర్తించిన దృశ్య సాక్ష్యాలు (సాక్ష్యం):' : language === 'hi' ? 'एआई द्वारा पहचाने गए दृश्य साक्ष्य:' : 'Visual Evidence Identified by AI:'}</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {sa.visualEvidence.map((evidence, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7.6. WHY THIS DISEASE / PEST OCCURRED */}
              {!isHealthy && !isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (() => {
                const reasons: string[] = (language === 'te' && (sa?.whyOccurred_te?.length ? sa.whyOccurred_te : scanResult.diagnosis.whyOccurred_te))
                  ? (sa?.whyOccurred_te?.length ? sa.whyOccurred_te : scanResult.diagnosis.whyOccurred_te)!
                  : (language === 'hi' && (sa?.whyOccurred_hi?.length ? sa.whyOccurred_hi : scanResult.diagnosis.whyOccurred_hi))
                  ? (sa?.whyOccurred_hi?.length ? sa.whyOccurred_hi : scanResult.diagnosis.whyOccurred_hi)!
                  : (sa?.whyOccurred?.length ? sa.whyOccurred : (scanResult.diagnosis.whyOccurred || (sa?.stress?.likelyCauses || [])));

                if (!reasons || reasons.length === 0) return null;

                return (
                  <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-50/60 p-4 rounded-2xl border-2 border-amber-300 shadow-sm">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-amber-200">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                          <HelpCircle className="w-4 h-4" />
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-black text-amber-950 uppercase tracking-wide">
                            {t('why_disease_occurred')}
                          </h4>
                          <span className="text-[11px] text-amber-800 font-semibold block">
                            {t('causal_factors_title')}
                          </span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300 text-[10px] font-bold shrink-0">
                        <span>{reasons.length} {language === 'te' ? 'కారణాలు' : language === 'hi' ? 'मुख्य कारक' : 'Key Triggers'}</span>
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {reasons.map((reason, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-800 flex items-start gap-2.5 font-medium leading-relaxed bg-white/85 p-2.5 rounded-xl border border-amber-200/90 shadow-2xs">
                          <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-slate-800 font-semibold">{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* 8. PREVENTIVE GUIDANCE / FERTILIZER ADVICE */}
              {!isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (
                <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-200">
                  <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>{isHealthy ? (language === 'te' ? 'ఆరోగ్య సంరక్షణ & పర్యవేక్షణ సూచనలు' : language === 'hi' ? 'देखभाल एवं सुरक्षा उपाय' : 'Crop Health Maintenance & Scouting') : 'Recommended Prevention & Hygiene'}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {(language === 'te' && sa?.prevention_te 
                      ? sa.prevention_te 
                      : language === 'hi' && sa?.prevention_hi 
                      ? sa.prevention_hi 
                      : sa?.prevention || scanResult.diagnosis.preventionMethods
                    ).slice(0, 3).map((prev, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{prev}</span>
                      </li>
                    ))}
                  </ul>

                  {sa?.fertilizerRecommendation && (
                    <div className="mt-2.5 pt-2.5 border-t border-emerald-200/70 text-[11px] text-emerald-900 font-medium">
                      <span className="font-bold">🌱 {language === 'te' ? 'ఎరువుల సూచన:' : language === 'hi' ? 'उर्वरक सलाह:' : 'Fertilizer Guidance:'}</span>{' '}
                      {language === 'te' ? sa.fertilizerRecommendation_te : language === 'hi' ? sa.fertilizerRecommendation_hi : sa.fertilizerRecommendation}
                    </div>
                  )}
                </div>
              )}

              {/* 9. TOGGLE HEATMAP CHECKBOX (Only when diseases/pests exist) */}
              {!isHealthy && !isNotPlant && !isPoorQuality && !isUncertain && !isServiceError && (
                <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                  <span className="font-bold flex items-center gap-1.5">
                    <Crosshair className="w-3.5 h-3.5 text-red-500" />
                    <span>Visual Pathogen Heatmap Overlay</span>
                  </span>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`px-3 py-1 rounded-md text-xs font-bold border transition-colors cursor-pointer ${
                      showHeatmap 
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {showHeatmap ? 'Heatmap Active' : 'Show Heatmap'}
                  </button>
                </div>
              )}

              {/* 10. PRIMARY CALL TO ACTION BUTTON */}
              {isServiceError ? null : isHealthy ? (
                <a
                  href="#prevention"
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all text-center"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{language === 'te' ? 'నివారణ పద్ధతులు & సంరక్షణ చూడండి' : language === 'hi' ? 'निवारण विधियां एवं देखभाल देखें' : 'Explore Preventive Care & Crop Hygiene'}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : isNotPlant || isPoorQuality || isUncertain ? (
                <button
                  onClick={() => executeDiagnosis(SAMPLE_OUTBREAKS[0].id, SAMPLE_OUTBREAKS[0].image, 'auto')}
                  className="w-full py-3.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>{language === 'te' ? 'స్పష్టమైన ఫోటోతో మళ్లీ ప్రయత్నించండి' : language === 'hi' ? 'स्पष्ट फोटो के साथ पुनः प्रयास करें' : 'Retake with Clear Close-Up Photo'}</span>
                </button>
              ) : (
                <button
                  onClick={() => onSelectForDosage(scanResult.diagnosis)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-98 transition-all cursor-pointer"
                >
                  <span>{t('btn_proceed_dosage')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

            </div>
          ) : isScanning ? (
            <div className="rounded-2xl p-8 border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 flex flex-col items-center justify-center text-center gap-3 min-h-[360px] shadow-sm">
              <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin" />
              <h4 className="text-base font-black text-slate-800">
                {language === 'te' ? 'AI పంట విశ్లేషణ జరుగుతోంది...' : language === 'hi' ? 'एआई फसल विश्लेषण जारी है...' : 'AI Analyzing Crop Symptoms...'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm font-medium leading-relaxed">
                {language === 'te' 
                  ? 'కణజాలం, పత్రహరితం మరియు తెగులు సంకేతాలను గూగుల్ జెమిని విజన్ మోడల్ పరీక్షిస్తోంది.' 
                  : language === 'hi' 
                  ? 'पत्ती, क्लोरोफिल और रोग लक्षणों का विश्लेषण जेमिनी विजन मॉडल द्वारा किया जा रहा है।' 
                  : 'Inspecting leaf tissue, chlorophyll density, and pathogen markers with Google Gemini Vision AI.'}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Real Device Camera Capture Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(file) => analyzeCropImage(file, 'CAMERA')}
      />
    </div>
  );
};
