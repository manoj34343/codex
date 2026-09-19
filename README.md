# 🌾 CropShield - 3D AI Crop Disease & Pest Management Platform

CropShield is a fullstack agricultural intelligence platform designed to empower farmers with early detection and management of crop diseases and pest infestations. Featuring interactive 3D motion plant visualization (from macro foliage to cellular bacteria and nutrients), AI visual diagnosis, precision pesticide dosage calculation, natural and organic remedy recipes, farmer community reviews, weather-based risk forecasting, and regional outbreak mapping.

---

## 🌟 Key Features

1. **Interactive 3D Motion Plant Experience (Three.js WebGL)**:
   - **Macro Plant View**: Realistic 3D crop structure with animated organic wind sway and foliage inspection.
   - **Leaf Surface View**: Microscopic examination of leaf epidermis, stomata pores, and initial fungal spore contact zones.
   - **Cellular & Microscopic View**: Deep zoom inside plant cell walls showing active flowing nutrients (NPK, chlorophyll energy) vs attacking bacterial pathogens (*Xanthomonas*, fungal hyphae).
   - Interactive zoom depth slider, 360° touch/mouse rotation, and nutrient vs. pathogen toggle.

2. **AI Crop Disease & Pest Scanner**:
   - Camera photo capture or image upload with drag-and-drop.
   - Pre-loaded high-resolution field outbreak sample library (Tomato Early Blight, Cotton Pink Bollworm, Rice Blast, Chilli Leaf Curl, Corn Fall Armyworm, Sugarcane Red Rot).
   - Animated laser scan line and heat-map bounding circles highlighting damaged tissue areas.
   - Scientific pathogen classification, AI confidence score (%), and severity rating (Mild, Moderate, Critical).

3. **Precision Pesticide & Organic Dosage Calculator**:
   - **Chemical Solutions**: Active ingredients, commercial brands, waiting period (PHI days), and CIBRC toxicity classification.
   - **100% Natural & Organic Remedies**: Neem oil (Azadirachtin), Dashaparni Kashayam, Jeevamrutha, Beauveria bassiana, Trichoderma viride, and sticky/pheromone traps with calculated cost savings in ₹.
   - **Dynamic Farm Acreage Inputs**: Calculate exact chemical volume (ml/g), water volume (L), number of spray tank refills, and dosage per tank based on farm size (Acres, Hectares, Guntas/Cents) and sprayer capacity (16L Hand/Knapsack, 20L Battery, 200L Tractor/Barrel).

4. **Farmer Community Reviews & Feedback Hub**:
   - Field-tested experiences, star ratings (1-5), and visible recovery timelines (days).
   - Filter reviews by crop.
   - Interactive review submission form with instant persistence to the backend.

5. **Weather-Based Crop Risk Forecast & Spray Window**:
   - Micro-climate sensors: Temperature (°C), Relative Humidity (%), Rain Probability (%), Wind velocity (km/h).
   - Automated disease risk index for persistent humidity and fungal spore outbreaks.
   - Optimal spray window advisory with rain-free and low drift recommendations.

6. **Crop Health Geospatial Outbreak Radar**:
   - Interactive visual radar tracking active disease clusters and pest migrations across major agricultural districts.
   - Threat radius rings (km), affected village counts, and preventive buffer spray advisories.

7. **Trilingual Localization & Audio Voice Assistant**:
   - Instant dynamic switching between **English, Telugu (తెలుగు), and Hindi (हिंदी)**.
   - Built-in Web Speech API voice reader: "Listen to Voice Advisory" reads diagnostic findings and pesticide dosage prescriptions aloud for rural farmers.

8. **Mobile-First Responsive Design**:
   - Large, ergonomic touch targets, high-contrast dark green agricultural palette, and offline-resilient UI.

---

## 🚀 Running the Project

### Prerequisites
- Node.js 18+ and npm installed

### Quick Start

1. **Install dependencies**:
   ```bash
   # From root c:\codex
   npm run install:all
   ```

2. **Start Backend API Server (Port 5000)**:
   ```bash
   npm run dev:server
   ```

3. **Start Frontend Client Server (Port 5173)**:
   ```bash
   npm run dev:client
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/diseases-pests` | Complete crop disease and pest knowledge base |
| `GET` | `/api/diseases-pests/:id` | Single disease details with chemical and organic remedies |
| `POST` | `/api/scan` | AI visual diagnosis simulation with heatmap metrics |
| `POST` | `/api/calculate-dosage` | Acreage and sprayer-specific pesticide dosage formula |
| `GET` | `/api/reviews` | Farmer reviews with crop filtering |
| `POST` | `/api/reviews` | Submit and persist a new farmer review |
| `GET` | `/api/weather-risk` | Agricultural meteorological risk forecast |
| `GET` | `/api/alerts` | Regional geospatial outbreak alerts |
| `GET` | `/api/translations/:lang` | Localization dictionary (en, te, hi) |
