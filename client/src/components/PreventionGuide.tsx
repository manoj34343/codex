import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  Sprout, 
  RotateCcw, 
  Bug, 
  Droplets, 
  SunMedium, 
  Sparkles,
  CheckCircle2,
  Flower2
} from 'lucide-react';

export const PreventionGuide: React.FC = () => {
  const { t, language } = useLanguage();

  const preventionPillars = [
    {
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      title_en: '1. Seed Treatment (Beej Sanskar)',
      title_te: '1. విత్తన శుద్ధి (బీజ్ సంస్కార్)',
      title_hi: '1. बीज उपचार (बीज संस्कार)',
      desc_en: 'Treat seeds with Trichoderma viride @ 10g/kg or Pseudomonas fluorescens to eliminate seed-borne fungal spores before sowing in soil.',
      desc_te: 'విత్తే ముందు ట్రైకోడెర్మా లేదా సూడోమోనాస్ @ 10 గ్రా/కేజీతో విత్తన శుద్ధి చేయడం ద్వారా నేల ద్వారా వచ్చే తెగుళ్లను 90% అరికట్టవచ్చు.',
      desc_hi: 'बुवाई से पूर्व ट्राइकोडर्मा विरिडी (10 ग्राम/किग्रा) या स्यूडोमोनास से बीज उपचार करें, जिससे मिट्टी जनित रोगों की रोकथाम होती है।'
    },
    {
      icon: <Flower2 className="w-6 h-6 text-amber-500" />,
      title_en: '2. Crop Rotation & Marigold Trap Crops',
      title_te: '2. పంట మార్పిడి & బంతి పూల రక్షక పంటలు',
      title_hi: '2. फसल चक्र एवं गेंदा ट्रैप फसलें',
      desc_en: 'Rotate non-host crops (e.g. cereals after pulses). Plant bright yellow marigold around tomato and castor borders around cotton to divert pests.',
      desc_te: 'పంట మార్పిడి పాటించండి. టమోటా చుట్టూ బంతి పూలు, పత్తి చుట్టూ ఆముదం వంటి రక్షక పంటలను నాటడం ద్వారా పురుగులను దారి మళ్లించండి.',
      desc_hi: 'फसल चक्र अपनाएं। टमाटर के चारों ओर पीले गेंदे के फूल लगाएं ताकि कीट मुख्य फसल को छोड़कर गेंदे की ओर आकर्षित हों।'
    },
    {
      icon: <Bug className="w-6 h-6 text-emerald-600" />,
      title_en: '3. Biological & Predator Conservation',
      title_te: '3. మిత్ర పురుగుల సంరక్షణ',
      title_hi: '3. मित्र कीटों का संरक्षण',
      desc_en: 'Encourage natural predators like ladybird beetles, dragonflies, and predatory spiders. Avoid broad-spectrum chemical sprays early in the season.',
      desc_te: 'లేడీబర్డ్ బీటిల్స్, డ్రాగన్‌ఫ్లైస్ వంటి మిత్ర పురుగులను సంరక్షించండి. పంట ప్రారంభంలో విచక్షణా రహితంగా విష రసాయనాలు వాడవద్దు.',
      desc_hi: 'लेडीबर्ड भृंग, मकड़ियों और ड्रैगनफ्लाई जैसे मित्र कीटों को बचाएं। मौसम की शुरुआत में भारी कीटनाशकों से बचें।'
    },
    {
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      title_en: '4. Water Drainage & Micro-Climate Care',
      title_te: '4. నీటి పారుదల & తేమ యాజమాన్యం',
      title_hi: '4. जल निकासी एवं नमी प्रबंधन',
      desc_en: 'Ensure clean drainage furrows to prevent root stagnation. Avoid evening overhead sprinkler irrigation to reduce leaf wetness duration.',
      desc_te: 'చేలలో మురుగు నీరు నిల్వ ఉండకుండా బోదెలు తీయండి. సాయంత్రం వేళల్లో ఆకులపై నీరు చిమ్మడం మానుకోండి.',
      desc_hi: 'खेत में उचित जल निकासी रखें। शाम के समय फव्वारा सिंचाई से बचें ताकि पत्तियों पर रात भर नमी जमा न रहे।'
    }
  ];

  return (
    <div id="prevention-guide" className="w-full my-8 scroll-mt-20">
      {/* Header with Flower Motif */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('prevention_title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('prevention_title')}
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          {t('prevention_subtitle')}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {preventionPillars.map((pillar, i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-6 border border-emerald-100 flex items-start gap-4 hover:border-emerald-300 transition-all shadow-sm bg-white"
          >
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 shrink-0">
              {pillar.icon}
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 mb-1.5">
                {language === 'te' ? pillar.title_te : language === 'hi' ? pillar.title_hi : pillar.title_en}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === 'te' ? pillar.desc_te : language === 'hi' ? pillar.desc_hi : pillar.desc_en}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
