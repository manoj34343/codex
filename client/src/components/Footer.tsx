import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, PhoneCall, Heart, ExternalLink, AlertTriangle, Flower2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="mt-20 bg-white border-t-2 border-emerald-100 text-slate-700 text-xs shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                Crop<span className="text-emerald-600">Shield</span>
                <Flower2 className="w-4 h-4 text-amber-500" />
              </span>
            </div>
            <p className="text-slate-600 text-xs max-w-sm leading-relaxed font-medium">
              {t('sub_tagline')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold font-mono">
                English • తెలుగు • हिंदी
              </div>
              <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold font-mono">
                Pure White Clean Theme v2.0
              </div>
            </div>
          </div>

          {/* Kisan Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {language === 'te' ? 'రైతు సహాయ కేంద్రాలు' : language === 'hi' ? 'किसान हेल्पलाइन' : 'Farmer Support Numbers'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-700 font-medium">
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kisan Call Center: <strong className="text-slate-900 font-bold">1800-180-1551</strong></span>
              </li>
              <li className="flex items-center gap-2 text-slate-700 font-medium">
                <PhoneCall className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Agro Advisory: <strong className="text-slate-900 font-bold">1551</strong> (Toll Free)</span>
              </li>
              <li className="text-slate-500 text-[11px] leading-relaxed">
                {language === 'te' ? 'ఉదయం 6 నుండి రాత్రి 10 గంటల వరకు ఉచిత వ్యవసాయ సలహాలు.' : language === 'hi' ? 'सुबह 6 से रात 10 बजे तक निःशुल्क सलाह सेवा।' : 'Toll-free agricultural helpline available in Telugu, Hindi & English.'}
              </li>
            </ul>
          </div>

          {/* Agricultural Universities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {language === 'te' ? 'వ్యవసాయ పరిశోధన సంస్థలు' : language === 'hi' ? 'कृषि अनुसंधान परिषद' : 'Research Alliances'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-600 font-medium">
              <li>• ICAR - Indian Council of Agricultural Research</li>
              <li>• PJTSAU - Telangana State Agricultural University</li>
              <li>• ANGRAU - Acharya N.G. Ranga Agricultural University</li>
              <li>• PAU - Punjab Agricultural University</li>
            </ul>
          </div>
        </div>

        {/* Safety Warning in Clean Warning Card */}
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-start gap-3 mb-8 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
            <strong className="text-amber-900">
              {language === 'te' ? 'పురుగుమందుల భద్రతా హెచ్చరిక:' : language === 'hi' ? 'कीटनाशक सुरक्षा चेतावनी:' : 'Pesticide Safety Warning:'}
            </strong>{' '}
            {language === 'te'
              ? 'పురుగుమందులను పిచికారీ చేసేటప్పుడు చేతులకు తొడుగులు, ముఖానికి మాస్క్ తప్పనిసరిగా ధరించండి. గాలి వీచే దిశకు ఎదురుగా పిచికారీ చేయవద్దు. ఖాళీ డబ్బాలను సురక్షితంగా నాశనం చేయండి.'
              : language === 'hi'
              ? 'कीटनाशकों के छिड़काव के दौरान दस्ताने और मास्क का अनिवार्य रूप से उपयोग करें। हवा की विपरीत दिशा में छिड़काव न करें। खाली बोतलों को सुरक्षित रूप से नष्ट करें।'
              : 'Always wear protective gear (gloves, goggles, mask) during chemical spray application. Never spray against the wind direction. Store agro-chemicals safely away from children.'}
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} CropShield - Professional Crop Disease & Pest Management Platform.</p>
          <p className="flex items-center gap-1 text-slate-600 font-semibold">
            Dedicated with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> to farmers and sustainable harvests.
          </p>
        </div>
      </div>
    </footer>
  );
};
