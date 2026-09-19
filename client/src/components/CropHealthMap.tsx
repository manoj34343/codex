import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { CropAlert } from '../types';
import { 
  MapPin, 
  AlertOctagon, 
  Radio, 
  Compass, 
  ShieldAlert, 
  Layers, 
  Navigation,
  Flower2
} from 'lucide-react';

export const CropHealthMap: React.FC = () => {
  const { t, language } = useLanguage();
  const [alerts, setAlerts] = useState<CropAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<CropAlert | null>(null);

  useEffect(() => {
    api.getAlerts()
      .then((data) => {
        setAlerts(data);
        if (data.length > 0) setSelectedAlert(data[0]);
      })
      .catch(console.error);
  }, []);

  return (
    <div id="crop-health-map" className="w-full my-8 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <Radio className="w-3.5 h-3.5 animate-pulse text-red-600" />
          <span>{t('map_title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('map_title')}
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          {t('map_subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Agricultural Geospatial Radar View */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-xl bg-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                {language === 'te' ? 'ప్రత్యక్ష తెగుళ్ల రాడార్' : language === 'hi' ? 'लाइव प्रकोप राडार' : 'Active Field Outbreak Radar'}
              </span>
            </div>
            <span className="text-xs text-emerald-800 font-bold font-mono">
              {alerts.length} {language === 'te' ? 'ప్రాంతాల్లో హెచ్చరికలు' : language === 'hi' ? 'क्षेत्रों में अलर्ट' : 'Zones Active'}
            </span>
          </div>

          {/* Clean Map Representation */}
          <div className="relative w-full h-[360px] sm:h-[400px] bg-emerald-50/50 rounded-2xl border-2 border-emerald-100 overflow-hidden flex items-center justify-center">
            {/* Background Grid & Radar Sweep Rings */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#05966912_1px,transparent_1px),linear-gradient(to_bottom,#05966912_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            {/* Concentric Radar Rings */}
            <div className="absolute w-72 h-72 rounded-full border border-emerald-400/25 pointer-events-none" />
            <div className="absolute w-96 h-96 rounded-full border border-emerald-400/35 pointer-events-none" />
            <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-400/20 pointer-events-none" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-400/30 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-400/30 pointer-events-none" />

            {/* Agricultural Outbreak Hotspots on Map */}
            {alerts.map((alert, idx) => {
              const positions = [
                { x: 48, y: 52 }, // Warangal
                { x: 55, y: 64 }, // Guntur
                { x: 38, y: 22 }, // Punjab
                { x: 32, y: 58 }, // Nashik
                { x: 28, y: 72 }  // Belagavi
              ];
              const pos = positions[idx % positions.length];
              const isSelected = selectedAlert?.id === alert.id;

              return (
                <button
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className="absolute z-20 group -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {/* Outer Pulsing Threat Ring */}
                  <span
                    className={`absolute -inset-3 rounded-full opacity-75 animate-ping pointer-events-none ${
                      alert.severity === 'CRITICAL' ? 'bg-red-500' : alert.severity === 'HIGH' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                  />

                  {/* Marker Pin */}
                  <div
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-125 ${
                      isSelected 
                        ? 'ring-4 ring-emerald-600 scale-125' 
                        : ''
                    } ${
                      alert.severity === 'CRITICAL' 
                        ? 'bg-red-600 text-white' 
                        : alert.severity === 'HIGH' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Label tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-9 px-2 py-0.5 rounded-md bg-white text-slate-800 text-[10px] font-bold whitespace-nowrap border border-slate-200 shadow-md pointer-events-none">
                    {alert.district.split('&')[0]}
                  </span>
                </button>
              );
            })}

            {/* Coordinates Status */}
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md border border-emerald-100 text-[10px] font-mono text-emerald-800 font-bold pointer-events-none shadow-xs">
              ZONE: DECCAN & INDO-GANGETIC AGRICULTURAL BELT
            </div>
          </div>
        </div>

        {/* Selected Outbreak Alert Details */}
        <div className="lg:col-span-5">
          {selectedAlert ? (
            <div className="glass-card rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-xl flex flex-col gap-4 bg-white">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      selectedAlert.severity === 'CRITICAL' 
                        ? 'bg-red-100 text-red-800 border border-red-300' 
                        : selectedAlert.severity === 'HIGH' 
                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {selectedAlert.severity} ALERT
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{selectedAlert.state}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">{selectedAlert.district}</h3>
                  <p className="text-xs text-emerald-700 font-bold">
                    {language === 'te' && selectedAlert.crop_te ? selectedAlert.crop_te : language === 'hi' && selectedAlert.crop_hi ? selectedAlert.crop_hi : selectedAlert.crop}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">{t('map_alert_radius')}</span>
                  <span className="text-base font-black text-amber-700 font-mono">
                    {selectedAlert.radiusKm} km
                  </span>
                </div>
              </div>

              {/* Issue Description */}
              <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                <span className="text-[10px] text-rose-700 uppercase font-black block mb-1">
                  {language === 'te' ? 'తెగులు లేదా పురుగు తీవ్రత:' : language === 'hi' ? 'समस्या एवं प्रभाव:' : 'Outbreak Diagnosis:'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-red-900">
                  {language === 'te' && selectedAlert.issue_te ? selectedAlert.issue_te : language === 'hi' && selectedAlert.issue_hi ? selectedAlert.issue_hi : selectedAlert.issue}
                </p>
              </div>

              {/* Affected Villages Metric */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-slate-600 font-semibold">{t('map_affected')}:</span>
                <span className="font-black text-slate-900 font-mono">{selectedAlert.affectedVillages} Villages</span>
              </div>

              {/* Regional Preventive Advisory */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                <span className="font-black text-emerald-800 uppercase tracking-wider block mb-1">
                  {t('map_advisory')}:
                </span>
                {language === 'te' && selectedAlert.advisory_te 
                  ? selectedAlert.advisory_te 
                  : language === 'hi' && selectedAlert.advisory_hi 
                  ? selectedAlert.advisory_hi 
                  : selectedAlert.advisory}
              </div>

              {/* Action Banner */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-center font-medium">
                {language === 'te' 
                  ? 'మీ పొలం 25 కి.మీ పరిధిలో ఉంటే వెంటనే ముందస్తు పిచికారీ చేపట్టండి.'
                  : language === 'hi'
                  ? 'यदि आपका खेत 25 किमी के दायरे में है, तो तुरंत सुरक्षात्मक उपाय करें।'
                  : 'If your farm is within 25 km of this hotspot, apply preventive buffer sprays immediately.'}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
