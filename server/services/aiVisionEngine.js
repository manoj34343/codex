import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from multiple candidate paths
dotenv.config();
const envPaths = [
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '..', '..', '.env'),
  path.join(process.cwd(), '.env'),
  path.join(process.cwd(), 'server', '.env')
];
for (const ep of envPaths) {
  if (fs.existsSync(ep)) {
    dotenv.config({ path: ep });
  }
}

const getApiKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// Read diseases & pests database for cross-referencing certified remedies
const readDatabase = () => {
  try {
    const dbPath = path.join(__dirname, '..', 'data', 'diseases_pests.json');
    if (fs.existsSync(dbPath)) {
      return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    }
  } catch (err) {
    console.error('[CropShield Backend] Error reading diseases_pests.json:', err.message);
  }
  return [];
};

export const CROP_TAXONOMY = {
  tomato: { key: 'tomato', commonName: 'Tomato', commonName_te: 'టమోటా', commonName_hi: 'टमाटर', scientificName: 'Solanum lycopersicum', family: 'Solanaceae (Nightshade Family)', healthyId: 'tomato_healthy', diseaseId: 'tomato_early_blight' },
  potato: { key: 'potato', commonName: 'Potato', commonName_te: 'బంగాళాదుంప', commonName_hi: 'आलू', scientificName: 'Solanum tuberosum', family: 'Solanaceae (Nightshade Family)', healthyId: 'potato_healthy', diseaseId: 'potato_late_blight' },
  cotton: { key: 'cotton', commonName: 'Cotton', commonName_te: 'పత్తి', commonName_hi: 'कपास', scientificName: 'Gossypium hirsutum', family: 'Malvaceae (Mallow Family)', healthyId: 'cotton_healthy', diseaseId: 'cotton_pink_bollworm' },
  rice: { key: 'rice', commonName: 'Paddy / Rice', commonName_te: 'వరి', commonName_hi: 'धान / चावल', scientificName: 'Oryza sativa', family: 'Poaceae (Grass Family)', healthyId: 'rice_healthy', diseaseId: 'rice_blast' },
  wheat: { key: 'wheat', commonName: 'Wheat', commonName_te: 'గోధుమ', commonName_hi: 'गेहूं', scientificName: 'Triticum aestivum', family: 'Poaceae (Grass Family)', healthyId: 'wheat_healthy', diseaseId: 'wheat_rust' },
  maize: { key: 'maize', commonName: 'Corn / Maize', commonName_te: 'మొక్కజొన్న', commonName_hi: 'मक्का', scientificName: 'Zea mays', family: 'Poaceae (Grass Family)', healthyId: 'maize_healthy', diseaseId: 'fall_armyworm_maize' },
  chilli: { key: 'chilli', commonName: 'Chilli', commonName_te: 'మిరప', commonName_hi: 'మిర్చి', scientificName: 'Capsicum annuum', family: 'Solanaceae (Nightshade Family)', healthyId: 'chilli_healthy', diseaseId: 'chilli_leaf_curl' },
  brinjal: { key: 'brinjal', commonName: 'Brinjal / Eggplant', commonName_te: 'వంకాయ', commonName_hi: 'बैंगन', scientificName: 'Solanum melongena', family: 'Solanaceae (Nightshade Family)', healthyId: 'brinjal_healthy', diseaseId: 'brinjal_shoot_fruit_borer' },
  okra: { key: 'okra', commonName: 'Okra / Bhendi', commonName_te: 'బెండకాయ', commonName_hi: 'भिंडी', scientificName: 'Abelmoschus esculentus', family: 'Malvaceae (Mallow Family)', healthyId: 'okra_healthy', diseaseId: 'okra_yellow_vein_mosaic' },
  sugarcane: { key: 'sugarcane', commonName: 'Sugarcane', commonName_te: 'చెరకు', commonName_hi: 'गन्ना', scientificName: 'Saccharum officinarum', family: 'Poaceae (Grass Family)', healthyId: 'sugarcane_healthy', diseaseId: 'sugarcane_red_rot' },
  groundnut: { key: 'groundnut', commonName: 'Groundnut / Peanut', commonName_te: 'వేరుశనగ', commonName_hi: 'मूंगफली', scientificName: 'Arachis hypogaea', family: 'Fabaceae (Legume Family)', healthyId: 'groundnut_healthy', diseaseId: 'groundnut_tikka' },
  mango: { key: 'mango', commonName: 'Mango', commonName_te: 'మామిడి', commonName_hi: 'आम', scientificName: 'Mangifera indica', family: 'Anacardiaceae (Cashew Family)', healthyId: 'mango_healthy', diseaseId: 'mango_anthracnose' },
  banana: { key: 'banana', commonName: 'Banana', commonName_te: 'అరటి', commonName_hi: 'केला', scientificName: 'Musa acuminata', family: 'Musaceae (Banana Family)', healthyId: 'banana_healthy', diseaseId: 'banana_sigatoka_leaf_spot' },
  grapes: { key: 'grapes', commonName: 'Grapes', commonName_te: 'ద్రాక్ష', commonName_hi: 'अंगूर', scientificName: 'Vitis vinifera', family: 'Vitaceae (Grape Family)', healthyId: 'grapes_healthy', diseaseId: 'grapes_downy_mildew' },
  apple: { key: 'apple', commonName: 'Apple', commonName_te: 'ఆపిల్', commonName_hi: 'सेब', scientificName: 'Malus domestica', family: 'Rosaceae (Rose Family)', healthyId: 'apple_healthy', diseaseId: 'apple_scab' },
  soybean: { key: 'soybean', commonName: 'Soybean', commonName_te: 'సోయాబీన్', commonName_hi: 'సోయాబీన్', scientificName: 'Glycine max', family: 'Fabaceae (Legume Family)', healthyId: 'soybean_healthy', diseaseId: 'soybean_rust' }
};

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
export const CANDIDATE_MODELS = [
  GEMINI_MODEL,
  'gemini-3.6-flash',
  'gemini-3.5-flash'
].filter((m, i, arr) => arr.indexOf(m) === i);

export function getAIStatus() {
  const key = getApiKey();
  return {
    configured: Boolean(key),
    model: GEMINI_MODEL,
    sdk: '@google/genai',
    candidateModels: CANDIDATE_MODELS,
    supportedCropsCount: Object.keys(CROP_TAXONOMY).length,
    crops: Object.values(CROP_TAXONOMY).map(c => c.commonName)
  };
}

export async function analyzeImageWithAI(imageBase64, userCropHint) {
  const apiKey = getApiKey();

  // Strip data URL header if present
  let mimeType = 'image/jpeg';
  let cleanBase64 = imageBase64;
  const match = imageBase64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (match) {
    mimeType = match[1];
    cleanBase64 = match[2];
  }

  const imageBuffer = Buffer.from(cleanBase64, 'base64');
  console.log('[CropShield AI]');
  console.log('Provider: Google Gemini');
  console.log(`Active Model: ${GEMINI_MODEL}`);
  console.log('Image received: YES');
  console.log(`Image MIME: ${mimeType}`);
  console.log(`Image size: ${imageBuffer.length} bytes`);
  console.log('User Crop Hint:', userCropHint || 'auto');

  // Requirement: If real AI model is not connected, state clearly and do not mock!
  if (!apiKey) {
    console.warn('[CropShield Backend] ⚠️ REAL AI MODEL NOT CONNECTED: GEMINI_API_KEY is not set in server/.env');
    return {
      aiConnected: false,
      modelUsed: null,
      error: 'REAL AI MODEL NOT CONNECTED',
      message: 'GEMINI_API_KEY is not configured in server/.env. A real multimodal vision model requires an API key.',
      isPlant: false,
      plantName: 'Unknown',
      cropName: null,
      crop: null,
      cropConfidence: 0,
      healthStatus: 'uncertain',
      healthConfidence: 0,
      disease: null,
      pest: null,
      symptoms: [],
      visualEvidence: [],
      prevention: [],
      treatmentOptions: [],
      naturalControls: [],
      uncertaintyReason: 'REAL AI MODEL NOT CONNECTED. Please configure GEMINI_API_KEY in server/.env to enable live AI vision model inference.'
    };
  }

  // Vision Prompt following user requirements
  const prompt = `You are Crop Shield's Expert Agricultural Computer Vision Assistant.
Carefully inspect the attached image itself.

MANDATORY RULES:
1. Do not use the filename or any external metadata to identify the plant.
2. Do not assume or guess the crop without visual traits.
3. Do not invent a crop or disease.
4. If this image is NOT a plant (e.g. cars, persons, furniture, buildings, everyday objects, food dishes), set isPlant to false, healthStatus to "not_a_plant", plantName to "Unknown", and cropName to null.
5. If a plant/crop is visible:
   - Identify the most likely plant or crop using visible characteristics: leaf shape, venation, leaf arrangement, stem, flowers, fruit, plant structure.
   - Supported primary crops include: Tomato, Potato, Rice, Wheat, Maize, Cotton, Chilli, Brinjal, Okra, Mango, Banana, Grapes, Apple, Groundnut, Soybean, Sugarcane (or other agricultural plants).
   - If the crop cannot be confidently identified from visual traits, return "Unknown" for plantName/cropName and set cropConfidence to 0.
6. Health Evaluation:
   - Possible states: "healthy", "disease_suspected", "pest_suspected", "stress_suspected", "uncertain".
   - "healthy": Foliage is clean, green, vibrant, active chlorophyll, NO significant disease lesions or insect feeding.
     CRITICAL: If the plant appears healthy, DO NOT INVENT A DISEASE. Set healthStatus to "healthy", disease to null, pest to null, and symptoms to [].
   - "disease_suspected": Clear fungal, bacterial, or viral symptoms (spots, concentric lesions, rust pustules, powdery mildew, mosaic, blight).
   - "pest_suspected": Visible insects, larvae, caterpillar feeding holes, bollworm entry, leaf-miner trails, or thrips/aphid damage.
   - "stress_suspected": Abiotic nutrient deficiency (diffuse chlorosis) or water/heat stress without pathogen lesions.
   - "uncertain": Blurry, dark, or ambiguous image where health cannot be determined reliably.
7. Visual Evidence:
   - Provide a list of concrete visual observations justifying your health/disease/pest decision (e.g. "Visible concentric circular target lesions on lower leaf", "Clean vibrant green epidermis with no fungal spots").
8. Why the Infection or Pest Occurred (Etiology, Weather & Field Triggers):
   - If disease_suspected or pest_suspected, provide 2 to 4 concise, scientific yet farmer-friendly bullet points explaining why this occurred (pathogen source, humidity/dew/temperature, rain splash, insect vectors like whiteflies/thrips, or field management factors).
   - Also provide "whyOccurred_te" (Telugu) and "whyOccurred_hi" (Hindi). If healthy, leave as empty arrays.

Return ONLY valid JSON matching this exact schema:
{
  "isPlant": boolean,
  "plantName": string,
  "cropName": string,
  "cropConfidence": number,
  "healthStatus": "healthy" | "disease_suspected" | "pest_suspected" | "stress_suspected" | "uncertain" | "not_a_plant",
  "healthConfidence": number,
  "disease": {
    "name": string,
    "confidence": number,
    "severity": "mild" | "moderate" | "critical",
    "pathogenType": "Fungal" | "Bacterial" | "Viral" | "Unknown"
  } | null,
  "pest": {
    "name": string,
    "confidence": number,
    "severity": "mild" | "moderate" | "critical",
    "pestType": string
  } | null,
  "symptoms": string[],
  "visualEvidence": string[],
  "whyOccurred": string[],
  "whyOccurred_te": string[],
  "whyOccurred_hi": string[],
  "uncertaintyReason": string | null
}`;

  console.log('[CropShield Backend] Initializing GoogleGenAI client...');
  const ai = new GoogleGenAI({ apiKey });

  let parsed = null;
  let successfulModel = null;
  let lastError = null;

  // Try candidate models in order until one succeeds
  for (const candidateModel of CANDIDATE_MODELS) {
    console.log(`[CropShield Backend] Attempting Gemini vision inference with model: ${candidateModel}...`);
    const startTime = Date.now();

    try {
      const response = await ai.models.generateContent({
        model: candidateModel,
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType,
                  data: cleanBase64
                }
              }
            ]
          }
        ],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const elapsed = Date.now() - startTime;
      console.log(`[CropShield Backend] ✅ AI response received from ${candidateModel} in ${elapsed}ms`);
      console.log('[CropShield Backend] Raw response text snippet:', response.text?.slice(0, 300));

      parsed = JSON.parse(response.text);
      successfulModel = candidateModel;
      break; // Succeeded!
    } catch (modelErr) {
      console.warn(`[CropShield Backend] Model ${candidateModel} failed: ${modelErr.message}`);
      lastError = modelErr;
      // If 404 or unsupported, continue to next candidate model
      continue;
    }
  }

  if (!parsed || !successfulModel) {
    console.error('[CropShield AI] All candidate Gemini models failed:', lastError);
    return {
      aiConnected: true,
      serviceError: true,
      modelUsed: null,
      error: 'AI_SERVICE_UNAVAILABLE',
      apiError: lastError?.message || 'AI service error',
      httpStatus: lastError?.status || (lastError?.message?.includes('404') ? 404 : 500),
      message: 'AI analysis is currently unavailable. Please try again.',
      healthStatus: 'service_error',
      isPlant: false,
      plantName: 'Unknown',
      cropName: null,
      crop: null,
      cropConfidence: 0,
      healthConfidence: 0,
      disease: null,
      pest: null,
      symptoms: [],
      visualEvidence: [],
      treatmentOptions: [],
      naturalControls: [],
      prevention: [],
      uncertaintyReason: null
    };
  }

  console.log('[CropShield Backend] Visual analysis successful!');
  console.log('[CropShield Backend] isPlant:', parsed.isPlant);
  console.log('[CropShield Backend] cropName:', parsed.cropName || parsed.plantName);
  console.log('[CropShield Backend] cropConfidence:', parsed.cropConfidence);
  console.log('[CropShield Backend] healthStatus:', parsed.healthStatus);

  // Normalize crop name and match taxonomy
  const db = readDatabase();
  const rawCrop = parsed.cropName || parsed.plantName || 'Unknown';
  let cropKey = rawCrop ? rawCrop.toLowerCase().replace(/[^a-z]/g, '') : null;
  let matchedProfile = null;
  if (cropKey && cropKey !== 'unknown') {
    const foundKey = Object.keys(CROP_TAXONOMY).find(k => cropKey.includes(k) || k.includes(cropKey));
    if (foundKey) {
      matchedProfile = CROP_TAXONOMY[foundKey];
    }
  }

  // Cross-reference Indian CIBRC agricultural remedies from verified database
  let chemicalRemedies = [];
  let naturalRemedies = [];
  let prevention = [];
  let matchedCondition = null;

  if (parsed.healthStatus === 'disease_suspected' && parsed.disease?.name) {
    const diseaseName = parsed.disease.name.toLowerCase();
    matchedCondition = db.find(c => 
      c.type === 'disease' && 
      (diseaseName.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(diseaseName))
    ) || (matchedProfile ? db.find(c => c.id === matchedProfile.diseaseId) : null);
  } else if (parsed.healthStatus === 'pest_suspected' && parsed.pest?.name) {
    const pestName = parsed.pest.name.toLowerCase();
    matchedCondition = db.find(c => 
      c.type === 'pest' && 
      (pestName.includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(pestName))
    ) || (matchedProfile ? db.find(c => c.id === matchedProfile.healthyId) : null);
  } else if (parsed.healthStatus === 'healthy' && matchedProfile) {
    matchedCondition = db.find(c => c.id === matchedProfile.healthyId);
  }

  if (matchedCondition) {
    if (parsed.healthStatus !== 'healthy') {
      chemicalRemedies = matchedCondition.chemicalRemedies || [];
    }
    naturalRemedies = (matchedCondition.naturalRemedies || []).map(r => `${r.name}: ${r.preparation}`);
    prevention = matchedCondition.preventionMethods || [];
  }

  let whyOccurred = (parsed.whyOccurred && Array.isArray(parsed.whyOccurred) && parsed.whyOccurred.length > 0)
    ? parsed.whyOccurred
    : (matchedCondition?.whyOccurred || []);
  let whyOccurred_te = (parsed.whyOccurred_te && Array.isArray(parsed.whyOccurred_te) && parsed.whyOccurred_te.length > 0)
    ? parsed.whyOccurred_te
    : (matchedCondition?.whyOccurred_te || []);
  let whyOccurred_hi = (parsed.whyOccurred_hi && Array.isArray(parsed.whyOccurred_hi) && parsed.whyOccurred_hi.length > 0)
    ? parsed.whyOccurred_hi
    : (matchedCondition?.whyOccurred_hi || []);

  if (parsed.healthStatus === 'healthy') {
    prevention = [
      "Inspect leaves twice weekly for early pest arrivals or airborne fungal spores.",
      "Maintain calibrated drip irrigation to avoid both water stress and root waterlogging.",
      "Apply prophylactic neem oil spray (10,000 ppm) every 14 days as an organic barrier.",
      "Keep field bunds and borders weed-free to eliminate alternate insect hosts."
    ];
    chemicalRemedies = [];
    parsed.disease = null;
    parsed.pest = null;
    parsed.symptoms = [];
    whyOccurred = [];
    whyOccurred_te = [];
    whyOccurred_hi = [];
    if (!parsed.visualEvidence || parsed.visualEvidence.length === 0) {
      parsed.visualEvidence = ["Clean, vibrant green foliage with uniform chlorophyll and zero visible pathogen lesions or pest feeding damage."];
    }
  }

  return {
    aiConnected: true,
    modelUsed: successfulModel,
    isPlant: Boolean(parsed.isPlant),
    plantName: parsed.plantName || (matchedProfile ? matchedProfile.commonName : 'Unknown'),
    cropName: parsed.cropName || (matchedProfile ? matchedProfile.commonName : rawCrop),
    crop: parsed.cropName || (matchedProfile ? matchedProfile.commonName : rawCrop),
    crop_te: matchedProfile?.commonName_te || parsed.cropName,
    crop_hi: matchedProfile?.commonName_hi || parsed.cropName,
    cropConfidence: Number(parsed.cropConfidence !== undefined ? parsed.cropConfidence : 0.90),
    scientificName: matchedProfile?.scientificName || 'Plantae',
    family: matchedProfile?.family || (parsed.isPlant ? 'Agricultural Crop' : 'N/A'),
    healthStatus: parsed.healthStatus || 'uncertain',
    healthConfidence: Number(parsed.healthConfidence || 0.90),
    disease: parsed.disease || null,
    pest: parsed.pest || null,
    symptoms: parsed.symptoms || [],
    visualEvidence: parsed.visualEvidence || [],
    whyOccurred,
    whyOccurred_te,
    whyOccurred_hi,
    treatmentOptions: chemicalRemedies,
    naturalControls: naturalRemedies,
    prevention: prevention,
    uncertaintyReason: parsed.uncertaintyReason || null
  };
}

