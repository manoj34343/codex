import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { FarmerReview } from '../types';
import { 
  Users, 
  Star, 
  ThumbsUp, 
  CheckCircle, 
  PlusCircle, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  Filter,
  X,
  Flower2
} from 'lucide-react';

export const FarmerReviews: React.FC = () => {
  const { t, language } = useLanguage();

  const [reviews, setReviews] = useState<FarmerReview[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    farmerName: '',
    village: '',
    district: '',
    state: 'Telangana',
    crop: 'Cotton',
    issue: 'Pink Bollworm',
    pesticideUsed: '',
    type: 'Integrated',
    rating: 5,
    effectiveness: 90,
    recoveryDays: 7,
    review: ''
  });

  useEffect(() => {
    loadReviews();
  }, [selectedCrop]);

  const loadReviews = async () => {
    try {
      const data = await api.getReviews(selectedCrop);
      setReviews(data);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.farmerName || !formData.pesticideUsed || !formData.review) {
      alert('Please fill in required fields');
      return;
    }

    setSubmitting(true);
    try {
      const newRev = await api.submitReview(formData);
      setReviews([newRev, ...reviews]);
      setShowModal(false);
      setFormData({
        farmerName: '',
        village: '',
        district: '',
        state: 'Telangana',
        crop: 'Cotton',
        issue: '',
        pesticideUsed: '',
        type: 'Integrated',
        rating: 5,
        effectiveness: 90,
        recoveryDays: 7,
        review: ''
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpvote = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  return (
    <div id="farmer-reviews" className="w-full my-8 scroll-mt-20">
      {/* Header with Flower Motif */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <Users className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('reviews_title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('reviews_title')}
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          {t('reviews_subtitle')}
        </p>
      </div>

      {/* Filter Bar & Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Crop Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-emerald-600 shrink-0" />
          {['all', 'Cotton', 'Chilli', 'Paddy / Rice', 'Tomato', 'Corn / Maize'].map((cropKey) => (
            <button
              key={cropKey}
              onClick={() => setSelectedCrop(cropKey)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCrop === cropKey
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 hover:border-emerald-300 border-slate-200'
              }`}
            >
              {cropKey === 'all' ? t('filter_all_crops') : cropKey}
            </button>
          ))}
        </div>

        {/* Share Review Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('btn_write_review')}</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="glass-card rounded-2xl p-5 border border-slate-200 flex flex-col justify-between hover:border-emerald-400 transition-all shadow-sm bg-white"
          >
            <div>
              {/* Farmer Info Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{rev.farmerName}</h4>
                    {rev.verified && (
                      <span title={t('verified_farmer')} className="text-emerald-600">
                        <CheckCircle className="w-4 h-4 fill-emerald-100" />
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {rev.village}, {rev.district}, {rev.state}
                  </p>
                </div>

                {/* Rating Badge */}
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-700 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>

              {/* Crop & Problem Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  {language === 'te' && rev.crop_te ? rev.crop_te : language === 'hi' && rev.crop_hi ? rev.crop_hi : rev.crop}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium">
                  {rev.issue}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px]">
                  {rev.type}
                </span>
              </div>

              {/* Remedy Used Callout */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 mb-3 text-xs">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {language === 'te' ? 'వాడిన మందు / కషాయం:' : language === 'hi' ? 'इस्तेमाल की गई दवा:' : 'Pesticide / Remedy Used:'}
                </span>
                <span className="font-bold text-emerald-800">{rev.pesticideUsed}</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                "{language === 'te' && rev.review_te 
                  ? rev.review_te 
                  : language === 'hi' && rev.review_hi 
                  ? rev.review_hi 
                  : rev.review}"
              </p>
            </div>

            {/* Metrics & Helpful Upvote Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-700 font-bold" title={t('effectiveness_rating')}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  {rev.effectiveness}%
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium" title={t('recovery_days')}>
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  {rev.recoveryDays} {t('recovery_days')}
                </span>
              </div>

              <button
                onClick={() => handleUpvote(rev.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 border border-slate-200 text-slate-700 text-xs active:scale-95 transition-all cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-bold">{rev.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>{t('btn_write_review')}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              {language === 'te' 
                ? 'మీ అనుభవం తోటి రైతులకు సరైన మందును ఎంచుకోవడానికి ఎంతో సహాయపడుతుంది.'
                : language === 'hi'
                ? 'आपका अनुभव अन्य किसानों को सही दवा चुनने में मदद करेगा।'
                : 'Your field experience helps fellow farmers make informed pest management decisions.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_name')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.farmerName}
                    onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_village')}</label>
                  <input
                    type="text"
                    placeholder="e.g. Jangaon"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_district')}</label>
                  <input
                    type="text"
                    placeholder="e.g. Warangal, Telangana"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_crop')}</label>
                  <select
                    value={formData.crop}
                    onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Cotton">Cotton (పత్తి / कपास)</option>
                    <option value="Chilli">Chilli (మిరప / मिर्च)</option>
                    <option value="Paddy / Rice">Paddy / Rice (వరి / धान)</option>
                    <option value="Tomato">Tomato (టమోటా / टमाटर)</option>
                    <option value="Corn / Maize">Corn / Maize (మొక్కజొన్న / मक्का)</option>
                    <option value="Sugarcane">Sugarcane (చెరకు / गन्ना)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_issue')}</label>
                  <input
                    type="text"
                    placeholder="e.g. Early Blight / Pink Bollworm"
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_remedy')} *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coragen / Neem Oil 10000 ppm"
                    value={formData.pesticideUsed}
                    onChange={(e) => setFormData({ ...formData, pesticideUsed: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_rating')}</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                    <option value={2}>⭐⭐ (2/5)</option>
                    <option value={1}>⭐ (1/5)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_effectiveness')}</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={formData.effectiveness}
                    onChange={(e) => setFormData({ ...formData, effectiveness: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{t('form_days')}</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.recoveryDays}
                    onChange={(e) => setFormData({ ...formData, recoveryDays: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{t('form_comment')} *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe dosage used, spray technique, weather, and results..."
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 font-medium focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? 'Publishing...' : t('btn_submit_review')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
