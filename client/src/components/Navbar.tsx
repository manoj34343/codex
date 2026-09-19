import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { 
  ShieldCheck, 
  Languages, 
  Menu, 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Flower2,
  Leaf
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, speak, stopSpeaking, isSpeaking } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setMobileMenuOpen(false);
  };

  const handleWelcomeSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    let welcomeText = '';
    if (language === 'te') {
      welcomeText = 'క్రాప్ షీల్డ్ కు స్వాగతం. పంట తెగుళ్ల గుర్తింపు, సరైన మందుల మోతాదు లెక్కింపు, మరియు సేంద్రీయ నివారణల కోసం కింద ఉన్న స్కానర్ ను ఉపయోగించండి.';
    } else if (language === 'hi') {
      welcomeText = 'क्रॉप शील्ड में आपका स्वागत है। फसल रोग पहचान, सटीक दवा की खुराक और जैविक उपचार के लिए नीचे दिए गए स्कैनर का उपयोग करें।';
    } else {
      welcomeText = 'Welcome to CropShield. Use the real botanical plant explorer and AI crop scanner below to diagnose crop diseases and calculate exact pesticide dosages.';
    }

    speak(welcomeText);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand with Floral Accent */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-0.5 shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Crop<span className="text-emerald-600">Shield</span>
                  <Flower2 className="w-4 h-4 text-amber-500 inline" />
                </span>
                <span className="hidden sm:block text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  {language === 'te' ? 'రైతు రక్షణ & పంట ఆరోగ్యం' : language === 'hi' ? 'फसल सुरक्षा एवं स्वास्थ्य' : 'Agricultural Defense Platform'}
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-700">
            <a href="#hero-3d" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
              <span>{t('nav_3d')}</span>
            </a>
            <a href="#crop-scanner" className="hover:text-emerald-600 transition-colors">{t('nav_scanner')}</a>
            <a href="#pesticide-calculator" className="hover:text-emerald-600 transition-colors">{t('nav_dosage')}</a>
            <a href="#farmer-reviews" className="hover:text-emerald-600 transition-colors">{t('nav_reviews')}</a>
            <a href="#weather-risk" className="hover:text-emerald-600 transition-colors">{t('nav_weather')}</a>
            <a href="#pesticide-shops-map" className="hover:text-emerald-600 transition-colors">{t('nav_map')}</a>
          </div>

          {/* Language Selector & Audio Voice Assistant */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Assistant */}
            <button
              onClick={handleWelcomeSpeech}
              className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-semibold ${
                isSpeaking
                  ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200 text-emerald-800'
              }`}
              title="Listen to Assistant"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              <span>{isSpeaking ? t('audio_stop') : t('audio_listen')}</span>
            </button>

            {/* Language Switcher Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('te')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'te'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => handleLanguageChange('hi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'hi'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleWelcomeSpeech}
              className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-600" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-5 pt-2 border-t border-slate-100 space-y-3">
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-emerald-600" />
                Language
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('te')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === 'te' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    language === 'hi' ? 'bg-emerald-600 text-white' : 'text-slate-600'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a
                href="#hero-3d"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 font-bold text-center"
              >
                {t('nav_3d')}
              </a>
              <a
                href="#crop-scanner"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-center"
              >
                {t('nav_scanner')}
              </a>
              <a
                href="#pesticide-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-center"
              >
                {t('nav_dosage')}
              </a>
              <a
                href="#farmer-reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-center"
              >
                {t('nav_reviews')}
              </a>
              <a
                href="#weather-risk"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-center"
              >
                {t('nav_weather')}
              </a>
              <a
                href="#pesticide-shops-map"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 font-bold text-center"
              >
                {t('nav_map')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
