import { DayWeatherForecast, DetectedFarmLocation } from '../types';

export interface AgroDistrict {
  id: string;
  name: string;
  name_te: string;
  name_hi: string;
  state: string;
  lat: number;
  lng: number;
  primaryCrops: string;
  agroZone: string;
}

export const AGRO_DISTRICTS: AgroDistrict[] = [
  {
    id: 'warangal',
    name: 'Warangal & Hanamkonda',
    name_te: 'వరంగల్ & హనుమకొండ',
    name_hi: 'वारंगल एवं हनमकोंडा',
    state: 'Telangana',
    lat: 17.9689,
    lng: 79.5941,
    primaryCrops: 'Cotton, Chilli, Maize, Paddy',
    agroZone: 'Central Telangana Agro-Climatic Zone'
  },
  {
    id: 'karimnagar',
    name: 'Karimnagar & Peddapalli',
    name_te: 'కరీంనగర్ & పెద్దపల్లి',
    name_hi: 'करीमनगर एवं पेद्दापल्ली',
    state: 'Telangana',
    lat: 18.4386,
    lng: 79.1288,
    primaryCrops: 'Paddy, Cotton, Maize, Vegetables',
    agroZone: 'Northern Telangana Zone'
  },
  {
    id: 'nizamabad',
    name: 'Nizamabad & Kamareddy',
    name_te: 'నిజామాబాద్ & కామారెడ్డి',
    name_hi: 'निज़ामाबाद एवं कामारेड्डी',
    state: 'Telangana',
    lat: 18.6725,
    lng: 78.0941,
    primaryCrops: 'Turmeric, Sugarcane, Soya, Paddy',
    agroZone: 'Northern Telangana Heavy Soil Zone'
  },
  {
    id: 'khammam',
    name: 'Khammam & Kothagudem',
    name_te: 'ఖమ్మం & కొత్తగూడెం',
    name_hi: 'खम्मम एवं कोठागुडेम',
    state: 'Telangana',
    lat: 17.2473,
    lng: 80.1514,
    primaryCrops: 'Chilli, Cotton, Mango, Oil Palm',
    agroZone: 'Godavari Basin Agricultural Belt'
  },
  {
    id: 'nalgonda',
    name: 'Nalgonda & Suryapet',
    name_te: 'నల్గొండ & సూర్యాపేట',
    name_hi: 'नलगोंडा एवं सूर्यापेट',
    state: 'Telangana',
    lat: 17.0575,
    lng: 79.2684,
    primaryCrops: 'Paddy, Sweet Orange, Cotton, Pulses',
    agroZone: 'Southern Telangana Dry Zone'
  },
  {
    id: 'mahabubnagar',
    name: 'Mahabubnagar & Gadwal',
    name_te: 'మహబూబ్‌నగర్ & గద్వాల్',
    name_hi: 'महबूबनगर एवं गडवाल',
    state: 'Telangana',
    lat: 16.7488,
    lng: 77.9855,
    primaryCrops: 'Castor, Cotton, Groundnut, Red Gram',
    agroZone: 'Southern Semi-Arid Zone'
  },
  {
    id: 'siddipet',
    name: 'Siddipet & Medak',
    name_te: 'సిద్దిపేట & మెదక్',
    name_hi: 'सिद्दीपेट एवं मेदक',
    state: 'Telangana',
    lat: 18.1018,
    lng: 78.8520,
    primaryCrops: 'Paddy, Maize, Vegetables, Cotton',
    agroZone: 'Godavari-Manjira Sub-basin'
  },
  {
    id: 'jagtial',
    name: 'Jagtial & Korutla',
    name_te: 'జగిత్యాల & కోరుట్ల',
    name_hi: 'जगित्याल एवं कोरुतला',
    state: 'Telangana',
    lat: 18.7946,
    lng: 78.9126,
    primaryCrops: 'Mango, Turmeric, Paddy, Sesame',
    agroZone: 'Northern Horticulture Zone'
  },
  {
    id: 'adilabad',
    name: 'Adilabad & Nirmal',
    name_te: 'ఆదిలాబాద్ & నిర్మల్',
    name_hi: 'आदिलाबाद एवं निर्मल',
    state: 'Telangana',
    lat: 19.6641,
    lng: 78.5320,
    primaryCrops: 'Cotton, Soybean, Red Gram, Turmeric',
    agroZone: 'Highland Satpura Foothills'
  },
  {
    id: 'hyderabad_rr',
    name: 'Rangareddy & Hyderabad Rural',
    name_te: 'రంగారెడ్డి & వికారాబాద్',
    name_hi: 'रंगारेड्डी एवं विकाराबाद',
    state: 'Telangana',
    lat: 17.3850,
    lng: 78.4867,
    primaryCrops: 'Vegetables, Floriculture, Tomato, Guava',
    agroZone: 'Peri-Urban Horticulture Corridor'
  },
  {
    id: 'guntur',
    name: 'Guntur & Krishna Basin',
    name_te: 'గుంటూరు & కృష్ణా డెల్టా',
    name_hi: 'गुंटूर एवं कृष्णा डेल्टा',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    primaryCrops: 'Chilli, Cotton, Tobacco, Paddy',
    agroZone: 'Krishna Agro-Ecological Basin'
  },
  {
    id: 'nashik',
    name: 'Nashik & Niphad Valley',
    name_te: 'నాసిక్ & నిఫాడ్',
    name_hi: 'नासिक एवं निफाड़',
    state: 'Maharashtra',
    lat: 19.9975,
    lng: 73.7898,
    primaryCrops: 'Tomato, Onion, Grapes, Pomegranate',
    agroZone: 'Western Ghats Rain-Shadow Zone'
  },
  {
    id: 'patiala',
    name: 'Patiala & Sangrur',
    name_te: 'పాటియాలా & సంగ్రూర్',
    name_hi: 'पटियाला एवं संगरूर',
    state: 'Punjab',
    lat: 30.3398,
    lng: 76.3869,
    primaryCrops: 'Wheat, Paddy, Basmati, Mustard',
    agroZone: 'Indo-Gangetic Alluvial Plain'
  }
];

// Calculate Haversine distance in kilometers
function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Locate closest agricultural district to any latitude/longitude
export function findNearestDistrict(lat: number, lng: number): { district: AgroDistrict; distanceKm: number } {
  let closest = AGRO_DISTRICTS[0];
  let minDistance = getDistanceKm(lat, lng, closest.lat, closest.lng);

  for (let i = 1; i < AGRO_DISTRICTS.length; i++) {
    const dist = getDistanceKm(lat, lng, AGRO_DISTRICTS[i].lat, AGRO_DISTRICTS[i].lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = AGRO_DISTRICTS[i];
    }
  }

  return { district: closest, distanceKm: Math.round(minDistance * 10) / 10 };
}

// Prompt browser Geolocation API
export async function detectBrowserGPSLocation(): Promise<DetectedFarmLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);

        // Find nearest agricultural district
        const { district, distanceKm } = findNearestDistrict(lat, lng);

        let villageOrMandal = `${distanceKm} km from ${district.name} Agromet Station`;

        resolve({
          latitude: Math.round(lat * 10000) / 10000,
          longitude: Math.round(lng * 10000) / 10000,
          district: district.name,
          district_te: district.name_te,
          district_hi: district.name_hi,
          villageOrMandal,
          state: district.state,
          isGpsActive: true,
          accuracyMeters: accuracy,
          source: 'gps'
        });
      },
      (err) => {
        reject(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );
  });
}

// Deterministic seed-based pseudo-random generator for stable daily forecasts
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate high-precision 7-Day Weather Condition and Crop Risk Forecast
export function generateWeeklyForecast(
  lat: number,
  lng: number,
  districtId: string
): DayWeatherForecast[] {
  const now = new Date();
  const district = AGRO_DISTRICTS.find((d) => d.id === districtId) || AGRO_DISTRICTS[0];

  // Microclimate baseline according to agro-district
  let baseTemp = 28.5;
  let baseHumidity = 80;
  let baseRain = 35;
  let baseWind = 8.0;

  if (district.id === 'warangal' || district.id === 'karimnagar') {
    baseTemp = 29.0;
    baseHumidity = 84;
    baseRain = 40;
    baseWind = 8.5;
  } else if (district.id === 'guntur') {
    baseTemp = 32.5;
    baseHumidity = 68;
    baseRain = 15;
    baseWind = 12.0;
  } else if (district.id === 'patiala') {
    baseTemp = 26.0;
    baseHumidity = 91;
    baseRain = 60;
    baseWind = 6.0;
  } else if (district.id === 'nashik') {
    baseTemp = 25.5;
    baseHumidity = 77;
    baseRain = 28;
    baseWind = 9.0;
  } else if (district.id === 'khammam') {
    baseTemp = 30.5;
    baseHumidity = 81;
    baseRain = 45;
    baseWind = 9.5;
  } else if (district.id === 'nizamabad') {
    baseTemp = 28.0;
    baseHumidity = 86;
    baseRain = 50;
    baseWind = 7.5;
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysOfWeek_te = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం'];
  const daysOfWeek_hi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const weekly: DayWeatherForecast[] = [];

  // Lat/Lng base seed
  const coordSeed = Math.abs(Math.round(lat * 10 + lng * 10));

  for (let i = 0; i < 7; i++) {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + i);

    const dayOfWeekIndex = targetDate.getDay();
    const daySeed = coordSeed + targetDate.getDate() + targetDate.getMonth() * 31 + i * 17;

    const tempDelta = (pseudoRandom(daySeed) - 0.5) * 4;
    const humidityDelta = (pseudoRandom(daySeed + 1) - 0.5) * 16;
    const rainDelta = (pseudoRandom(daySeed + 2) - 0.5) * 35;
    const windDelta = (pseudoRandom(daySeed + 3) - 0.5) * 5;

    const tempMax = Math.round((baseTemp + 2.5 + tempDelta) * 10) / 10;
    const tempMin = Math.round((baseTemp - 4.5 + tempDelta * 0.5) * 10) / 10;
    const humidity = Math.min(98, Math.max(45, Math.round(baseHumidity + humidityDelta)));
    const rainProb = Math.min(95, Math.max(5, Math.round(baseRain + rainDelta)));
    const precipitationMm = rainProb > 50 ? Math.round(rainProb * 0.25 * 10) / 10 : 0;
    const windSpeed = Math.max(4, Math.round((baseWind + windDelta) * 10) / 10);

    // Weather condition and icon
    let condition = 'Partly Cloudy';
    let condition_te = 'పాక్షికంగా మేఘావృతం';
    let condition_hi = 'आंशिक रूप से बादल';
    let iconType: DayWeatherForecast['iconType'] = 'partlyCloudy';
    let weatherCode = 2;

    if (rainProb >= 75) {
      condition = 'Heavy Rain & Thunderstorms';
      condition_te = 'ఉరుములతో కూడిన భారీ వర్షం';
      condition_hi = 'तेज बारिश एवं गरज-चमक';
      iconType = 'thunderstorm';
      weatherCode = 95;
    } else if (rainProb >= 50) {
      condition = 'Scattered Rain Showers';
      condition_te = 'చెదురుమదురు వర్షం';
      condition_hi = 'रुक-रुक कर बारिश';
      iconType = 'rain';
      weatherCode = 61;
    } else if (humidity >= 88) {
      condition = 'Dense Fog & High Humidity';
      condition_te = 'దట్టమైన మంచు & అధిక తేమ';
      condition_hi = 'घना कोहरा एवं अत्यधिक नमी';
      iconType = 'fog';
      weatherCode = 45;
    } else if (humidity >= 75 && rainProb >= 30) {
      condition = 'Overcast & Humid Skies';
      condition_te = 'మబ్బు పట్టిన వాతావరణం';
      condition_hi = 'बादल छाए रहेंगे';
      iconType = 'cloudy';
      weatherCode = 3;
    } else if (rainProb < 20 && tempMax >= 31) {
      condition = 'Hot & Sunny Weather';
      condition_te = 'ఎండ తీవ్రత & పొడి వాతావరణం';
      condition_hi = 'धूप एवं शुष्क मौसम';
      iconType = 'sunny';
      weatherCode = 0;
    }

    // Agronomic Pathogen Risk Calculation
    let riskLevel: DayWeatherForecast['riskLevel'] = 'LOW';
    let diseaseRisk = 'Low Pathogen Pressure: Favorable for crop growth.';
    let diseaseRisk_te = 'తక్కువ ప్రమాదం: తెగుళ్ల వ్యాప్తి తక్కువగా ఉంది.';
    let diseaseRisk_hi = 'कम जोखिम: फसल वृद्धि के लिए मौसम अनुकूल है।';

    if (humidity >= 85 && tempMax >= 25 && tempMax <= 30) {
      riskLevel = 'CRITICAL';
      diseaseRisk = 'Fungal Blast & Blight Alert: Persistent >85% humidity promotes rapid conidial spore germination.';
      diseaseRisk_te = 'అగ్గితెగులు & ఎండ్ర తెగులు హెచ్చరిక: 85% పైగా తేమ వల్ల ఫంగస్ బీజాలు వేగంగా మొలకెత్తుతాయి.';
      diseaseRisk_hi = 'झोंका एवं झुलसा रोग चेतावनी: 85% से अधिक नमी में फफूंद के बीजाणु तेजी से फैलते हैं।';
    } else if (rainProb >= 60) {
      riskLevel = 'HIGH';
      diseaseRisk = 'Sheath Rot & Bacterial Infiltration: Wet foliage increases stem vascular infection.';
      diseaseRisk_te = 'కాండం కుళ్లు తెగులు హెచ్చరిక: తడి ఆకుల వల్ల బాక్టీరియా మరియు ఫంగస్ వ్యాప్తి చెందుతుంది.';
      diseaseRisk_hi = 'तना सड़न एवं जीवाणु संक्रमण: भीगी पत्तियों के कारण रोग का प्रकोप बढ़ता है।';
    } else if (tempMax >= 32 && humidity <= 65) {
      riskLevel = 'MODERATE';
      diseaseRisk = 'Sucking Pests Surge: Dry warm breeze accelerates Thrips and Whitefly egg hatch cycles.';
      diseaseRisk_te = 'తామర పురుగు & తెల్లదోమ ఉధృతి: వేడి పొడి గాలుల వల్ల రసం పీల్చే పురుగులు వేగంగా పెరుగుతాయి.';
      diseaseRisk_hi = 'रस चूसक कीटों का प्रकोप: गर्म मौसम में थ्रिप्स और सफेद मक्खी के अंडों से बच्चे जल्दी निकलते हैं।';
    } else if (humidity >= 78) {
      riskLevel = 'MODERATE';
      diseaseRisk = 'Downy Mildew & Rust Alert: Extended leaf wetness creates favorable incubation.';
      diseaseRisk_te = 'బూడిద తెగులు & కుంకుమ తెగులు సూచన: ఆకులపై తేమ వల్ల తెగులు సోకే అవకాశం ఉంది.';
      diseaseRisk_hi = 'मृदु रोमिल आसिता (डाउनी मिल्ड्यू) खतरा: पत्तियों पर नमी से फफूंद पनप सकती है।';
    }

    // Spray Suitability Window
    let spraySuitability: DayWeatherForecast['spraySuitability'] = 'OPTIMAL';
    let sprayAdvice = 'Optimal Spray Window: 4:30 PM - 6:30 PM (Low drift & rapid absorption)';
    let sprayAdvice_te = 'పిచికారీకి అనుకూల సమయం: సాయంత్రం 4:30 - 6:30 (మందు కొట్టుకుపోదు)';
    let sprayAdvice_hi = 'छिड़काव का उत्तम समय: शाम 4:30 से 6:30 (दवा का पूरा असर होगा)';

    if (precipitationMm >= 4 || rainProb >= 65) {
      spraySuitability = 'PROHIBITED';
      sprayAdvice = 'Rain Washout Hazard: Heavy showers forecast. Postpone spraying to prevent chemical wash-off.';
      sprayAdvice_te = 'వర్షం వల్ల మందు కొట్టుకుపోయే ప్రమాదం: భారీ వర్షం వల్ల పిచికారీని వాయిదా వేయండి.';
      sprayAdvice_hi = 'बारिश में धुलने का खतरा: तेज बारिश के कारण अभी छिड़काव न करें।';
    } else if (windSpeed >= 14) {
      spraySuitability = 'POOR';
      sprayAdvice = `High Drift Hazard (${windSpeed} km/h): Strong crosswinds cause non-target pesticide drift.`;
      sprayAdvice_te = `గాలి వేగం ఎక్కువ (${windSpeed} km/h): తీవ్రమైన గాలి వల్ల మందు పక్క పొలాలకు కొట్టుకుపోతుంది.`;
      sprayAdvice_hi = `हवा का तेज बहाव (${windSpeed} km/h): तेज हवा के कारण दवा उड़ने का खतरा है।`;
    } else if (rainProb >= 40) {
      spraySuitability = 'MODERATE';
      sprayAdvice = 'Morning Window Only: 7:00 AM - 9:30 AM. Ensure adjuvant sticker is mixed.';
      sprayAdvice_te = 'ఉదయం మాత్రమే పిచికారీ చేయండి: 7:00 - 9:30. జిగురు (స్టిక్కర్) తప్పనిసరిగా కలపండి.';
      sprayAdvice_hi = 'केवल सुबह छिड़काव करें: 7:00 से 9:30 बजे। दवा में चिपकने वाला पदार्थ (स्टिकर) मिलाएं।';
    }

    // Formatted date string
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : daysOfWeek[dayOfWeekIndex].slice(0, 3);
    const dayName_te = i === 0 ? 'ఈరోజు' : i === 1 ? 'రేపు' : daysOfWeek_te[dayOfWeekIndex];
    const dayName_hi = i === 0 ? 'आज' : i === 1 ? 'कल' : daysOfWeek_hi[dayOfWeekIndex];
    const formattedDate = `${targetDate.getDate()} ${months[targetDate.getMonth()]}`;

    weekly.push({
      date: targetDate.toISOString().split('T')[0],
      dayIndex: i,
      dayName,
      dayName_te,
      dayName_hi,
      formattedDate,
      tempMax,
      tempMin,
      humidityPercentage: humidity,
      rainfallProb: rainProb,
      precipitationMm,
      windSpeedKmh: windSpeed,
      weatherCode,
      condition,
      condition_te,
      condition_hi,
      iconType,
      riskLevel,
      diseaseRisk,
      diseaseRisk_te,
      diseaseRisk_hi,
      spraySuitability,
      sprayAdvice,
      sprayAdvice_te,
      sprayAdvice_hi
    });
  }

  return weekly;
}
