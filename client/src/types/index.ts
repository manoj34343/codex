export type Language = 'en' | 'te' | 'hi';

export interface ChemicalRemedy {
  activeIngredient: string;
  brandNames: string[];
  dosePerAcre: string;
  dosePerLitre: string;
  waterPerAcre: string;
  phiDays: number;
  toxicityLevel: string;
  instructions: string;
}

export interface NaturalRemedy {
  name: string;
  dosePerAcre: string;
  dosePerLitre: string;
  preparation: string;
  benefits: string;
}

export interface CropCondition {
  id: string;
  crop: string;
  crop_te?: string;
  crop_hi?: string;
  name: string;
  name_te?: string;
  name_hi?: string;
  type: 'disease' | 'pest' | 'healthy';
  pathogenType: string;
  scientificName: string;
  severityLevel: string;
  symptoms: string[];
  symptoms_te?: string[];
  symptoms_hi?: string[];
  whyOccurred?: string[];
  whyOccurred_te?: string[];
  whyOccurred_hi?: string[];
  chemicalRemedies: ChemicalRemedy[];
  naturalRemedies: NaturalRemedy[];
  preventionMethods: string[];
  visualEvidence?: string[];
}

export interface HeatmapZone {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  label: string;
}

export interface IdentifiedPlant {
  cropKey: string;
  commonName: string;
  commonName_te: string;
  commonName_hi: string;
  scientificName: string;
  family: string;
  confidence: number;
  isFoliageDetected: boolean;
  tissueHealthStatus: 'Healthy' | 'Mild Infestation' | 'Moderate Disease' | 'Severe Outbreak';
  chlorophyllPercentage: number;
  chlorosisPercentage: number;
  necrosisPercentage: number;
  message?: string;
}

export type HealthStatus = 
  | 'healthy'
  | 'disease_suspected'
  | 'pest_suspected'
  | 'stress_suspected'
  | 'uncertain'
  | 'not_a_plant'
  | 'poor_quality'
  | 'service_error';

export interface DiseaseDiagnosis {
  name: string;
  name_te?: string;
  name_hi?: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'critical';
  pathogenType?: string;
  scientificName?: string;
  whyOccurred?: string[];
  whyOccurred_te?: string[];
  whyOccurred_hi?: string[];
}

export interface PestDiagnosis {
  name: string;
  name_te?: string;
  name_hi?: string;
  confidence: number;
  severity?: string;
  pestType?: string;
  whyOccurred?: string[];
  whyOccurred_te?: string[];
  whyOccurred_hi?: string[];
}

export interface PlantStressDiagnosis {
  type: string;
  type_te?: string;
  type_hi?: string;
  confidence: number;
  likelyCauses: string[];
  likelyCauses_te?: string[];
  likelyCauses_hi?: string[];
}

export interface ImageQualityMetrics {
  brightness: number;
  contrast: number;
  sharpness: number;
  isBlurry: boolean;
  isDark: boolean;
  isOverexposed: boolean;
  plantCoveragePct: number;
  isPlant: boolean;
  issues: string[];
  issues_te: string[];
  issues_hi: string[];
}

export interface StructuredCropAnalysis {
  isPlant: boolean;
  plantConfidence: number;
  plantName?: string;
  cropName?: string;
  crop: string | null;
  crop_te?: string | null;
  crop_hi?: string | null;
  cropConfidence: number;
  aiDetectedCrop?: string | null;
  userVerifiedCrop?: string | null;
  scientificName?: string;
  family?: string;
  healthStatus: HealthStatus;
  healthConfidence: number;
  disease: DiseaseDiagnosis | null;
  pest: PestDiagnosis | null;
  stress: PlantStressDiagnosis | null;
  symptoms: string[];
  symptoms_te?: string[];
  symptoms_hi?: string[];
  visualEvidence?: string[];
  whyOccurred?: string[];
  whyOccurred_te?: string[];
  whyOccurred_hi?: string[];
  naturalControls: string[];
  naturalControls_te?: string[];
  naturalControls_hi?: string[];
  treatmentOptions: ChemicalRemedy[];
  prevention: string[];
  prevention_te?: string[];
  prevention_hi?: string[];
  fertilizerRecommendation?: string | null;
  fertilizerRecommendation_te?: string | null;
  fertilizerRecommendation_hi?: string | null;
  weatherRiskAdvisory?: string | null;
  weatherRiskAdvisory_te?: string | null;
  weatherRiskAdvisory_hi?: string | null;
  uncertaintyReason?: string | null;
  uncertaintyReason_te?: string | null;
  uncertaintyReason_hi?: string | null;
  qualityMetrics?: ImageQualityMetrics;
  metrics?: {
    chlorophyllPct: number;
    chlorosisPct: number;
    necrosisPct: number;
    rustPct: number;
    mildewPct: number;
    plantCoveragePct: number;
    detectionTimeMs: number;
  };
  heatmapZones: HeatmapZone[];
  candidateCrops?: Array<{ key: string; name: string; name_te: string; name_hi: string }>;
}

export interface ScanResult {
  success?: boolean;
  aiConnected?: boolean;
  serviceError?: boolean;
  apiError?: string;
  httpStatus?: number;
  modelUsed?: string | null;
  error?: string;
  message?: string;
  diagnosis: CropCondition;
  metrics: {
    confidence: number;
    affectedAreaPercentage: number;
    severity: 'Mild' | 'Moderate' | 'Critical';
    pathogenClass: string;
    detectionTimeMs: number;
    heatmapZones: HeatmapZone[];
    identifiedPlant?: IdentifiedPlant;
  };
  structuredAnalysis?: StructuredCropAnalysis;
}

export interface FarmerReview {
  id: string;
  farmerName: string;
  village: string;
  district: string;
  state: string;
  crop: string;
  crop_te?: string;
  crop_hi?: string;
  issue: string;
  pesticideUsed: string;
  type: string;
  rating: number;
  effectiveness: number;
  recoveryDays: number;
  review: string;
  review_te?: string;
  review_hi?: string;
  date: string;
  verified: boolean;
  upvotes: number;
}

export interface CropAlert {
  id: string;
  district: string;
  state: string;
  crop: string;
  crop_te?: string;
  crop_hi?: string;
  issue: string;
  issue_te?: string;
  issue_hi?: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  radiusKm: number;
  affectedVillages: number;
  lat: number;
  lng: number;
  advisory: string;
  advisory_te?: string;
  advisory_hi?: string;
}

export interface DayWeatherForecast {
  date: string; // ISO date '2026-09-10'
  dayIndex: number; // 0 to 6
  dayName: string; // 'Today', 'Fri', 'Sat', etc.
  dayName_te: string;
  dayName_hi: string;
  formattedDate: string; // '10 Sep'
  tempMax: number;
  tempMin: number;
  humidityPercentage: number;
  rainfallProb: number;
  precipitationMm: number;
  windSpeedKmh: number;
  weatherCode: number;
  condition: string;
  condition_te: string;
  condition_hi: string;
  iconType: 'sunny' | 'partlyCloudy' | 'cloudy' | 'rain' | 'heavyRain' | 'thunderstorm' | 'fog';
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  diseaseRisk: string;
  diseaseRisk_te: string;
  diseaseRisk_hi: string;
  spraySuitability: 'OPTIMAL' | 'MODERATE' | 'POOR' | 'PROHIBITED';
  sprayAdvice: string;
  sprayAdvice_te: string;
  sprayAdvice_hi: string;
}

export interface DetectedFarmLocation {
  latitude: number;
  longitude: number;
  district: string;
  district_te?: string;
  district_hi?: string;
  villageOrMandal?: string;
  state: string;
  isGpsActive: boolean;
  accuracyMeters?: number;
  source: 'gps' | 'district_selection' | 'default';
}

export interface WeatherRiskData {
  location: string;
  temperatureC: number;
  humidityPercentage: number;
  rainfallProb: number;
  windSpeedKmh: number;
  uvIndex: number;
  forecast: string;
  detectedLocation?: DetectedFarmLocation;
  weeklyForecast?: DayWeatherForecast[];
  risks: {
    crop: string;
    riskLevel: string;
    category: string;
    reason: string;
    advisory: string;
  }[];
  sprayWindow: {
    suitability: string;
    window: string;
    windCondition: string;
    rainWindowHours: string;
  };
}
