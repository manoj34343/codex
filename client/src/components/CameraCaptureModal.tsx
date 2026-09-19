import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, X, Check, RotateCcw, AlertTriangle, SwitchCamera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const { language } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [capturedBlobUrl, setCapturedBlobUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState<boolean>(false);

  // Stop active video stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Check if device has multiple cameras (back and front)
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const videoInputs = devices.filter((d) => d.kind === 'videoinput');
        if (videoInputs.length > 1) {
          setHasMultipleCameras(true);
        }
      }).catch((e) => {
        console.warn('[CameraCapture] Error enumerating devices:', e);
      });
    }
  }, []);

  // Start video stream with specified facingMode
  const startCamera = useCallback(async (mode: 'environment' | 'user') => {
    stopStream();
    setCameraError(null);
    setIsLoadingCamera(true);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        language === 'te'
          ? 'మీ బ్రౌజర్ కెమెరాను మద్దతు ఇవ్వడం లేదు. దయచేసి గ్యాలరీ అప్‌లోడ్ ఉపయోగించండి.'
          : language === 'hi'
          ? 'आपका ब्राउज़र कैमरा समर्थित नहीं करता है। कृपया गैलरी अपलोड का उपयोग करें।'
          : 'Camera access is not supported by your browser. Please use Gallery Upload instead.'
      );
      setIsLoadingCamera(false);
      return;
    }

    try {
      // First attempt with preferred facingMode
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: mode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
      } catch (errFirst) {
        console.warn('[CameraCapture] Facing mode error, falling back to basic video:', errFirst);
        // Fallback: request any video track
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((playErr) => {
          console.warn('[CameraCapture] Video play interrupted:', playErr);
        });
      }
    } catch (err: any) {
      console.error('[CameraCapture] getUserMedia error:', err);
      let msg = '';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = language === 'te'
          ? 'కెమెరా అనుమతి తిరస్కరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో కెమెరా యాక్సెస్ అనుమతించండి.'
          : language === 'hi'
          ? 'कैमरा अनुमति अस्वीकृत। कृपया ब्राउज़र सेटिंग्स में कैमरा एक्सेस की अनुमति दें।'
          : 'Camera permission was denied. Please allow camera access in your browser settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = language === 'te'
          ? 'పరికరంలో కెమెరా కనుగొనబడలేదు.'
          : language === 'hi'
          ? 'डिवाइस पर कोई कैमरा नहीं मिला।'
          : 'No camera device found on this system.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        msg = language === 'te'
          ? 'కెమెరాను ఇతర అప్లికేషన్ వాడుతోంది. దయచేసి దాన్ని మూసివేసి మళ్లీ ప్రయత్నించండి.'
          : language === 'hi'
          ? 'कैमरा किसी अन्य ऐप द्वारा उपयोग में है। कृपया उसे बंद करके पुनः प्रयास करें।'
          : 'Camera is currently in use by another application or tab.';
      } else {
        msg = language === 'te'
          ? `కెమెరా ప్రారంభం కాలేదు (${err.message || 'Error'}).`
          : language === 'hi'
          ? `कैमरा चालू नहीं हो सका (${err.message || 'Error'})।`
          : `Could not start camera (${err.message || 'Unknown error'}).`;
      }
      setCameraError(msg);
    } finally {
      setIsLoadingCamera(false);
    }
  }, [language, stopStream]);

  // Handle open/close lifecycle
  useEffect(() => {
    if (isOpen) {
      setCapturedBlobUrl(null);
      setCapturedFile(null);
      startCamera(facingMode);
    } else {
      stopStream();
      if (capturedBlobUrl) {
        URL.revokeObjectURL(capturedBlobUrl);
        setCapturedBlobUrl(null);
      }
      setCapturedFile(null);
      setCameraError(null);
    }
    return () => {
      stopStream();
    };
  }, [isOpen, facingMode, startCamera, stopStream]);

  // Toggle Camera Facing Mode (Back <-> Front)
  const handleToggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  // Capture frame from active video onto canvas
  const handleSnap = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.videoWidth === 0 || video.videoHeight === 0) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const fileName = `crop_photo_${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        const blobUrl = URL.createObjectURL(blob);

        setCapturedBlobUrl(blobUrl);
        setCapturedFile(file);
        // Pause and stop live stream while reviewing captured snapshot
        stopStream();
      },
      'image/jpeg',
      0.92
    );
  };

  // Retake photo: discard snapshot and restart stream
  const handleRetake = () => {
    if (capturedBlobUrl) {
      URL.revokeObjectURL(capturedBlobUrl);
      setCapturedBlobUrl(null);
    }
    setCapturedFile(null);
    startCamera(facingMode);
  };

  // Confirm photo: dispatch file to unified analysis
  const handleConfirm = () => {
    if (capturedFile) {
      onCapture(capturedFile);
      handleClose();
    }
  };

  // Clean close
  const handleClose = () => {
    stopStream();
    if (capturedBlobUrl) {
      URL.revokeObjectURL(capturedBlobUrl);
      setCapturedBlobUrl(null);
    }
    setCapturedFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-emerald-500 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white leading-tight">
                {language === 'te' ? 'పంట లైవ్ కెమెరా' : language === 'hi' ? 'लाइव फसल कैमरा' : 'Crop Shield Camera'}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {language === 'te' ? 'ఆకు దగ్గరగా ఫోకస్ చేసి ఫోటో తీయండి' : language === 'hi' ? 'पत्ती पर स्पष्ट फोकस करके फोटो लें' : 'Align leaf inside the frame and capture'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Area */}
        <div className="relative w-full bg-black flex-1 min-h-[320px] max-h-[65vh] flex items-center justify-center overflow-hidden">
          
          {/* Error state */}
          {cameraError ? (
            <div className="p-6 text-center max-w-md flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">
                {language === 'te' ? 'కెమెరా లోపం' : language === 'hi' ? 'कैमरा समस्या' : 'Camera Access Error'}
              </h4>
              <p className="text-xs text-rose-300 leading-relaxed">
                {cameraError}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => startCamera(facingMode)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : language === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  {language === 'te' ? 'మూసివేయి' : language === 'hi' ? 'बंद करें' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : capturedBlobUrl ? (
            /* Review captured snapshot */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={capturedBlobUrl}
                alt="Captured Crop"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'te' ? 'ఫోటో తీయబడింది' : language === 'hi' ? 'फोटो ली गई' : 'Photo Captured'}</span>
              </div>
            </div>
          ) : (
            /* Live video stream */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Viewfinder Target Reticle */}
              <div className="absolute inset-6 sm:inset-10 pointer-events-none border-2 border-emerald-400/40 rounded-2xl flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-3 border-l-3 border-emerald-400 rounded-tl-lg" />
                  <div className="w-6 h-6 border-t-3 border-r-3 border-emerald-400 rounded-tr-lg" />
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-slate-950/75 px-2.5 py-1 rounded-full border border-emerald-500/40 backdrop-blur-xs">
                    {facingMode === 'environment' ? 'REAR / CROP LENS' : 'FRONT LENS'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-3 border-l-3 border-emerald-400 rounded-bl-lg" />
                  <div className="w-6 h-6 border-b-3 border-r-3 border-emerald-400 rounded-br-lg" />
                </div>
              </div>

              {isLoadingCamera && (
                <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center gap-2 text-white">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                  <span className="text-xs font-bold text-slate-200">
                    {language === 'te' ? 'కెమెరా ఆన్ అవుతోంది...' : language === 'hi' ? 'कैमरा चालू हो रहा है...' : 'Starting camera...'}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls Toolbar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {capturedBlobUrl ? (
            /* Snapshot Review Actions */
            <div className="w-full flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>{language === 'te' ? 'మళ్లీ తీయండి' : language === 'hi' ? 'पुनः फोटो लें' : 'Retake Photo'}</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 text-white" />
                <span>{language === 'te' ? 'ఈ ఫోటోతో AI విశ్లేషించు' : language === 'hi' ? 'इस फोटो का विश्लेषण करें' : 'Analyze With AI'}</span>
              </button>
            </div>
          ) : (
            /* Live Camera Controls */
            <div className="w-full flex items-center justify-between">
              {/* Camera Switcher (if supported) */}
              <button
                type="button"
                onClick={handleToggleFacingMode}
                disabled={!hasMultipleCameras && facingMode === 'environment'}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Switch Camera (Front/Rear)"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>

              {/* Big Shutter Button */}
              <button
                type="button"
                onClick={handleSnap}
                disabled={isLoadingCamera || !!cameraError}
                className="w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 active:scale-90 border-4 border-white/80 shadow-xl shadow-emerald-500/40 flex items-center justify-center cursor-pointer transition-all disabled:opacity-50"
                title="Capture Frame"
              >
                <div className="w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-slate-950" />
                </div>
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleClose}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer transition-all"
              >
                {language === 'te' ? 'రద్దు' : language === 'hi' ? 'रद्द करें' : 'Cancel'}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
