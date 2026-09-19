import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { CropCondition, ChemicalRemedy, NaturalRemedy } from '../types';
import { 
  Calculator, 
  FlaskConical, 
  Leaf, 
  Droplet, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Clock, 
  IndianRupee, 
  Layers,
  Sparkles,
  Flower2
} from 'lucide-react';

interface PesticideDosageCalcProps {
  selectedCondition: CropCondition | null;
  allConditions: CropCondition[];
  onSelectCondition: (condition: CropCondition) => void;
}

export const PesticideDosageCalc: React.FC<PesticideDosageCalcProps> = ({
  selectedCondition,
  allConditions,
  onSelectCondition,
}) => {
  const { t, language, speak, stopSpeaking, isSpeaking } = useLanguage();

  const current = selectedCondition || (allConditions.length > 0 ? allConditions[0] : null);

  const [activeTab, setActiveTab] = useState<'chemical' | 'natural'>('chemical');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [landArea, setLandArea] = useState<number>(1);
  const [landUnit, setLandUnit] = useState<'acres' | 'hectares' | 'guntas'>('acres');
  const [sprayerType, setSprayerType] = useState<'16l' | '20l' | '200l'>('16l');

  const [calculation, setCalculation] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!current) return;
    recalculate();
  }, [current, activeTab, selectedIndex, landArea, landUnit, sprayerType]);

  const recalculate = async () => {
    if (!current) return;
    setLoading(true);
    try {
      const res = await api.calculateDosage({
        diseaseId: current.id,
        type: activeTab,
        index: selectedIndex,
        landArea: Math.max(0.1, Number(landArea) || 1),
        landUnit,
        sprayerType,
      });
      setCalculation(res.calculation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceDosage = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    if (!calculation || !current) return;

    let text = '';
    const cropName = language === 'te' ? current.crop_te : language === 'hi' ? current.crop_hi : current.crop;
    const diseaseName = language === 'te' ? current.name_te : language === 'hi' ? current.name_hi : current.name;

    if (activeTab === 'chemical') {
      if (language === 'te') {
        text = `${cropName} పంటలో ${diseaseName} నివారణకు: రసాయనం ${calculation.remedyName}. మొత్తం అవసరమైన మందు ${calculation.totalChemical}. మొత్తం నీరు ${calculation.totalWaterLitres}. ఒక్కో స్ప్రేయర్ ట్యాంకుకు ${calculation.dosePerTank} కలపాలి. మొత్తం ${calculation.totalTanks} ట్యాంకులు పడుతుంది. కోతకు ముందు ${calculation.phiDays} రోజులు వేచి ఉండాలి.`;
      } else if (language === 'hi') {
        text = `${cropName} में ${diseaseName} के लिए: दवा ${calculation.remedyName}। कुल आवश्यक दवा ${calculation.totalChemical}। कुल पानी ${calculation.totalWaterLitres}। प्रति स्प्रेयर टैंक ${calculation.dosePerTank} मिलाएं। कुल ${calculation.totalTanks} टैंक लगेंगे।`;
      } else {
        text = `Dosage recommendation for ${cropName} ${diseaseName}: Active ingredient ${calculation.remedyName}. Total chemical required is ${calculation.totalChemical} in ${calculation.totalWaterLitres} of water. Add ${calculation.dosePerTank} per sprayer tank. Requires ${calculation.totalTanks} spray tanks. Pre-harvest waiting period is ${calculation.phiDays} days.`;
      }
    } else {
      if (language === 'te') {
        text = `సహజ పద్ధతి: ${calculation.remedyName}. మొత్తం నీరు ${calculation.totalWaterLitres}. ఎకరాకు దాదాపు ${calculation.estimatedCostSaving} రసాయన ఖర్చు ఆదా అవుతుంది. సేంద్రీయ తయారీ విధానాన్ని పాటించండి.`;
      } else if (language === 'hi') {
        text = `प्राकृतिक उपचार: ${calculation.remedyName}। कुल पानी ${calculation.totalWaterLitres}। इस जैविक विधि से लगभग ${calculation.estimatedCostSaving} की बचत होगी।`;
      } else {
        text = `Natural organic treatment: ${calculation.remedyName}. Mix with ${calculation.totalWaterLitres} of water across ${calculation.totalTanks} tanks. Estimated savings: ${calculation.estimatedCostSaving}.`;
      }
    }

    speak(text);
  };

  if (!current) return null;

  const currentChemicals = current.chemicalRemedies || [];
  const currentNaturals = current.naturalRemedies || [];

  return (
    <div id="pesticide-calculator" className="w-full my-8 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('calc_title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('calc_title')}
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          {t('calc_subtitle')}
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 border border-emerald-100 shadow-xl bg-white">
        {/* Crop & Disease Selector Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0 shadow-xs">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {language === 'te' ? 'ఎంపిక చేసిన పంట & సమస్య' : language === 'hi' ? 'चयनित फसल एवं समस्या' : 'Target Crop & Condition'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {language === 'te' ? current.crop_te : language === 'hi' ? current.crop_hi : current.crop} : {' '}
                <span className="text-emerald-600">
                  {language === 'te' ? current.name_te : language === 'hi' ? current.name_hi : current.name}
                </span>
              </h3>
            </div>
          </div>

          {/* Dropdown to switch crop condition */}
          <div className="w-full sm:w-auto">
            <select
              value={current.id}
              onChange={(e) => {
                const found = allConditions.find((c) => c.id === e.target.value);
                if (found) {
                  onSelectCondition(found);
                  setSelectedIndex(0);
                }
              }}
              className="w-full sm:w-64 bg-slate-50 border border-slate-300 text-slate-800 font-medium text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-xs"
            >
              {allConditions.map((cond) => (
                <option key={cond.id} value={cond.id}>
                  {cond.crop} - {cond.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Toggle: Chemical vs 100% Natural Organic */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <button
            onClick={() => {
              setActiveTab('chemical');
              setSelectedIndex(0);
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'chemical'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 border border-emerald-600'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>{t('tab_chemical')}</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('natural');
              setSelectedIndex(0);
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'natural'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/20 border border-emerald-600'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-200" />
            <span>{t('tab_natural')}</span>
          </button>
        </div>

        {/* Input Parameters Form (Area, Units, Sprayer Type) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 mb-6">
          {/* 1. Land Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('input_land_size')}
            </label>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={landArea}
              onChange={(e) => setLandArea(Number(e.target.value))}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-bold font-mono focus:border-emerald-600 focus:outline-none shadow-xs"
            />
          </div>

          {/* 2. Unit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('input_unit')}
            </label>
            <select
              value={landUnit}
              onChange={(e) => setLandUnit(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-600 focus:outline-none shadow-xs"
            >
              <option value="acres">{t('unit_acres')}</option>
              <option value="hectares">{t('unit_hectares')}</option>
              <option value="guntas">{t('unit_guntas')}</option>
            </select>
          </div>

          {/* 3. Sprayer Tank Capacity */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t('input_sprayer')}
            </label>
            <select
              value={sprayerType}
              onChange={(e) => setSprayerType(e.target.value as any)}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 font-medium focus:border-emerald-600 focus:outline-none shadow-xs"
            >
              <option value="16l">{t('sprayer_16l')}</option>
              <option value="20l">{t('sprayer_20l')}</option>
              <option value="200l">{t('sprayer_200l')}</option>
            </select>
          </div>
        </div>

        {/* Available Remedies Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-slate-700 mb-2">
            {activeTab === 'chemical' 
              ? (language === 'te' ? 'సిఫార్సు చేయబడిన రసాయనాలు:' : language === 'hi' ? 'अनुशंसित रसायन चुनें:' : 'Select Chemical Remedy:')
              : (language === 'te' ? 'సిఫార్సు చేయబడిన సేంద్రీయ పద్ధతులు:' : language === 'hi' ? 'अनुशंसित जैविक उपचार:' : 'Select Natural Remedy:')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {activeTab === 'chemical'
              ? currentChemicals.map((chem, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl text-left border-2 transition-all text-xs flex flex-col justify-between cursor-pointer ${
                      selectedIndex === idx
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block mb-1">{chem.activeIngredient}</span>
                    <span className="text-[11px] text-emerald-700">{chem.brandNames.join(', ')}</span>
                  </button>
                ))
              : currentNaturals.map((nat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`p-3 rounded-xl text-left border-2 transition-all text-xs flex flex-col justify-between cursor-pointer ${
                      selectedIndex === idx
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-bold text-slate-900 block mb-1">{nat.name}</span>
                    <span className="text-[11px] text-emerald-700 line-clamp-1">{nat.benefits}</span>
                  </button>
                ))}
          </div>
        </div>

        {/* Calculated Results Card */}
        {calculation && (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 border-2 border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                <h4 className="font-black text-slate-900 text-base sm:text-lg">
                  {t('calc_summary')}
                </h4>
              </div>

              {/* Voice Readout Button */}
              <button
                onClick={handleVoiceDosage}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all text-xs font-bold cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                    : 'bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-800 shadow-xs'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span>{isSpeaking ? t('audio_stop') : t('audio_listen')}</span>
              </button>
            </div>

            {/* Calculations Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              {activeTab === 'chemical' ? (
                <>
                  <div className="bg-gradient-to-br from-emerald-50 via-white to-green-100 p-4 rounded-2xl border-2 border-emerald-300 text-center shadow-sm">
                    <span className="text-[11px] text-emerald-800 block mb-1 font-black uppercase tracking-wider">{t('chem_required')}</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                      {calculation.totalChemical}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 via-white to-orange-100 p-4 rounded-2xl border-2 border-amber-300 text-center shadow-sm">
                    <span className="text-[11px] text-amber-800 block mb-1 font-black uppercase tracking-wider">{t('dose_per_tank')}</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-700 font-mono">
                      {calculation.dosePerTank}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 via-white to-blue-100 p-4 rounded-2xl border-2 border-cyan-300 text-center shadow-sm">
                    <span className="text-[11px] text-cyan-800 block mb-1 font-black uppercase tracking-wider">{t('water_required')}</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono">
                      {calculation.totalWaterLitres}
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-100 p-4 rounded-2xl border-2 border-purple-300 text-center shadow-sm">
                    <span className="text-[11px] text-purple-800 block mb-1 font-black uppercase tracking-wider">{t('tanks_required')}</span>
                    <span className="text-xl sm:text-2xl font-black text-purple-800 font-mono">
                      {calculation.totalTanks} Tanks
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-100 p-4 rounded-2xl border-2 border-emerald-300 text-center col-span-2 shadow-sm">
                    <span className="text-[11px] text-emerald-800 block mb-1 font-black uppercase tracking-wider">{t('natural_cost_save')}</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono flex items-center justify-center gap-1">
                      <IndianRupee className="w-6 h-6 text-emerald-600" />
                      {calculation.estimatedCostSaving}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 text-center shadow-xs">
                    <span className="text-[11px] text-slate-600 block mb-1 font-bold">{t('water_required')}</span>
                    <span className="text-lg sm:text-xl font-black text-blue-700 font-mono">
                      {calculation.totalWaterLitres}
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-emerald-100 text-center shadow-xs">
                    <span className="text-[11px] text-slate-600 block mb-1 font-bold">{t('tanks_required')}</span>
                    <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {calculation.totalTanks} Tanks
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Safety & Prescription Callouts */}
            {activeTab === 'chemical' ? (
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>{t('phi_label')}:</strong> {calculation.phiDays} Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>{t('toxicity_code')}:</strong> {calculation.toxicityLevel}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <span className="font-black text-emerald-800 uppercase tracking-wider block mb-1">
                    {t('app_instructions')}:
                  </span>
                  {calculation.instructions}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-xs">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {t('natural_prep')}:
                  </span>
                  {calculation.preparation}
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                  <span className="font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {t('natural_benefits')}:
                  </span>
                  {calculation.benefits}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
