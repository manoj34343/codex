import { CropCondition, ScanResult, FarmerReview, CropAlert, WeatherRiskData } from '../types';

const API_BASE = 'https://cropshield-gqtm.onrender.com/api';

export const api = {
  async getDiseases(): Promise<CropCondition[]> {
    const res = await fetch(`${API_BASE}/diseases-pests`);
    if (!res.ok) throw new Error('Failed to load diseases');
    return res.json();
  },

  async getDiseaseById(id: string): Promise<CropCondition> {
    const res = await fetch(`${API_BASE}/diseases-pests/${id}`);
    if (!res.ok) throw new Error('Failed to load disease details');
    return res.json();
  },

  async scanCrop(payload: { sampleId?: string; imageBase64?: string; cropType?: string }): Promise<ScanResult> {
    const res = await fetch(`${API_BASE}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to scan crop');
    return res.json();
  },

  async analyzeCrop(payload: { imageBase64?: string; sampleId?: string; cropType?: string }): Promise<ScanResult> {
    try {
      const res = await fetch(`${API_BASE}/analyze-crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        if (data && (data.serviceError || data.diagnosis)) {
          return data as ScanResult;
        }
        throw new Error(data?.message || data?.error || `Server responded with status ${res.status}`);
      }
      return data as ScanResult;
    } catch (err: any) {
      if (err.message && !err.message.includes('Failed to fetch')) {
        throw err;
      }
      throw new Error('Could not connect to backend server. Please check your network connection.');
    }
  },

  async getAIStatus(): Promise<{ configured: boolean; model: string; supportedCropsCount: number; crops: string[] }> {
    const res = await fetch(`${API_BASE}/ai-status`);
    if (!res.ok) throw new Error('Failed to load AI status');
    return res.json();
  },

  async saveApiKey(apiKey: string): Promise<{ success: boolean; message: string; status: any }> {
    const res = await fetch(`${API_BASE}/save-key`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to save API key');
    }
    return res.json();
  },

  async calculateDosage(params: {
    diseaseId: string;
    type: 'chemical' | 'natural';
    index: number;
    landArea: number;
    landUnit: 'acres' | 'hectares' | 'guntas';
    sprayerType: '16l' | '20l' | '200l';
  }) {
    const res = await fetch(`${API_BASE}/calculate-dosage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Failed to calculate dosage');
    return res.json();
  },

  async getReviews(crop?: string): Promise<FarmerReview[]> {
    const url = crop && crop !== 'all' ? `${API_BASE}/reviews?crop=${encodeURIComponent(crop)}` : `${API_BASE}/reviews`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load reviews');
    return res.json();
  },

  async submitReview(reviewData: Partial<FarmerReview>): Promise<FarmerReview> {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to submit review');
    const data = await res.json();
    return data.review;
  },

  async getWeatherRisk(): Promise<WeatherRiskData> {
    const res = await fetch(`${API_BASE}/weather-risk`);
    if (!res.ok) throw new Error('Failed to load weather risk');
    return res.json();
  },

  async getAlerts(): Promise<CropAlert[]> {
    const res = await fetch(`${API_BASE}/alerts`);
    if (!res.ok) throw new Error('Failed to load crop alerts');
    return res.json();
  },

  async getTranslations() {
    const res = await fetch(`${API_BASE}/translations`);
    if (!res.ok) throw new Error('Failed to load translations');
    return res.json();
  },

  getTtsAudioUrl(text: string, lang = 'te'): string {
    return `${API_BASE}/tts?lang=${encodeURIComponent(lang)}&text=${encodeURIComponent(text)}`;
  }
};
