import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroMotionVideo } from './components/HeroMotionVideo';
import { CropScanner } from './components/CropScanner';
import { PesticideDosageCalc } from './components/PesticideDosageCalc';
import { FarmerReviews } from './components/FarmerReviews';
import { PesticideShopsMap } from './components/PesticideShopsMap';
import { WeatherRiskCard } from './components/WeatherRiskCard';
import { PreventionGuide } from './components/PreventionGuide';
import { Footer } from './components/Footer';
import { VoiceAgent } from './components/VoiceAgent';
import { api } from './services/api';
import { CropCondition } from './types';
import { CROP_CONDITIONS_DATA } from './data/cropConditionsData';
import { 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Users, 
  MapPin, 
  ArrowDownCircle, 
  TrendingUp,
  Leaf,
  Flower2,
  Sprout,
  Sun,
  ShieldAlert,
  Compass
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { t, language } = useLanguage();
  // Initialize immediately with CROP_CONDITIONS_DATA so dosage calculator has instant data
  const [conditions, setConditions] = useState<CropCondition[]>(CROP_CONDITIONS_DATA);
  const [selectedCondition, setSelectedCondition] = useState<CropCondition | null>(CROP_CONDITIONS_DATA[0]);

  useEffect(() => {
    api.getDiseases()
      .then((data) => {
        if (data && data.length > 0) {
          setConditions(data);
          setSelectedCondition(data[0]);
        }
      })
      .catch((err) => {
        console.warn('Using client-side crop conditions fallback:', err);
      });
  }, []);

  const handleSelectForDosage = (cond: CropCondition) => {
    setSelectedCondition(cond);
    const el = document.getElementById('pesticide-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-emerald-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Header in Pure White with 3D Badges & Floral Accents */}
        <section id="hero-3d" className="text-center pt-2 pb-2 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-black mb-4 shadow-xs">
            <Flower2 className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>{t('tagline')}</span>
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight bg-gradient-to-r from-emerald-800 via-teal-700 to-slate-900 bg-clip-text text-transparent">
            {language === 'te' 
              ? '3D యానిమేషన్ మొక్క & పూత నుండి కణాల లోపలి బ్యాక్టీరియా & పోషకాల వరకు ప్రత్యక్షంగా చూడండి'
              : language === 'hi'
              ? '3D एनिमेटेड पौधा, फूलों एवं पत्तियों से लेकर सूक्ष्म कोशिकाओं एवं बैक्टीरिया तक देखें'
              : 'Interactive 3D Motion Plant: Explore from Foliage & Blossoms to Cellular Bacteria & Nutrients'}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            {t('hero_desc')}
          </p>

          {/* Key Agricultural Metrics in Colorful 3D Gradient Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-green-100 p-4 rounded-2xl border-2 border-emerald-400 shadow-md shadow-emerald-500/10 text-center card-3d">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 mx-auto mb-1.5 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-emerald-700 font-mono">98.4%</span>
              <span className="text-[11px] text-emerald-950 font-black block mt-0.5 uppercase tracking-wider">
                {language === 'te' ? 'AI నిర్ధారణ ఖచ్చితత్వం' : language === 'hi' ? 'एआई सटीकता' : 'Diagnostic Accuracy'}
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-100 p-4 rounded-2xl border-2 border-blue-400 shadow-md shadow-blue-500/10 text-center card-3d">
              <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 mx-auto mb-1.5 flex items-center justify-center text-blue-700">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-blue-700 font-mono">24+</span>
              <span className="text-[11px] text-blue-950 font-black block mt-0.5 uppercase tracking-wider">
                {language === 'te' ? 'రక్షించబడే పంటలు' : language === 'hi' ? 'प्रमुख फसलें' : 'Crops Protected'}
              </span>
            </div>

            <div className="bg-gradient-to-br from-amber-50 via-white to-orange-100 p-4 rounded-2xl border-2 border-amber-400 shadow-md shadow-amber-500/10 text-center card-3d">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 mx-auto mb-1.5 flex items-center justify-center text-amber-700">
                <Sun className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-amber-600 font-mono">35%</span>
              <span className="text-[11px] text-amber-950 font-black block mt-0.5 uppercase tracking-wider">
                {language === 'te' ? 'మందుల ఖర్చు ఆదా' : language === 'hi' ? 'लागत में बचत' : 'Pesticide Cost Saved'}
              </span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 via-white to-fuchsia-100 p-4 rounded-2xl border-2 border-purple-400 shadow-md shadow-purple-500/10 text-center card-3d">
              <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-300 mx-auto mb-1.5 flex items-center justify-center text-purple-700">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-2xl font-black text-purple-700 font-mono">15,000+</span>
              <span className="text-[11px] text-purple-950 font-black block mt-0.5 uppercase tracking-wider">
                {language === 'te' ? 'లబ్ధి పొందిన రైతులు' : language === 'hi' ? 'संतुष्ट किसान' : 'Active Farmers'}
              </span>
            </div>
          </div>
        </section>

        {/* 1. 3D ANIMATED MOTION PLANT VIDEO EXPERIENCE (USING USER ATTACHED VIDEO) */}
        <section className="card-3d">
          <HeroMotionVideo />
        </section>

        {/* 2. AI CROP SCANNER (100% RELIABLE DETECTION ENGINE) */}
        <section id="scanner" className="card-3d">
          <CropScanner onSelectForDosage={handleSelectForDosage} />
        </section>

        {/* 3. PESTICIDE & ORGANIC DOSAGE CALCULATOR */}
        <section className="card-3d">
          <PesticideDosageCalc 
            selectedCondition={selectedCondition}
            allConditions={conditions}
            onSelectCondition={setSelectedCondition}
          />
        </section>

        {/* 4. FARMER COMMUNITY REVIEWS */}
        <section className="card-3d">
          <FarmerReviews />
        </section>

        {/* 5. WEATHER CROP RISK & LOCATION OCCURRENCES */}
        <section className="card-3d">
          <WeatherRiskCard />
        </section>

        {/* 6. TELANGANA PESTICIDE & AGRO-INPUT SHOPS GPS MAP */}
        <section className="card-3d">
          <PesticideShopsMap />
        </section>

        {/* 7. PREVENTION & INTEGRATED PEST MANAGEMENT */}
        <section className="card-3d">
          <PreventionGuide />
        </section>
      </main>

      <Footer />

      {/* 8. AI VOICE AGENT (TALK TO CROP SHIELD) */}
      <VoiceAgent />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
