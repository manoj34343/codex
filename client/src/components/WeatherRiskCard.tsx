import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sun,
  CloudSun, 
  CloudRain,
  CloudLightning,
  Droplets, 
  Wind, 
  Thermometer, 
  AlertTriangle, 
  CheckCircle, 
  Volume2, 
  VolumeX, 
  MapPin,
  Calendar,
  ShieldAlert,
  Navigation,
  LocateFixed,
  RefreshCw,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { DayWeatherForecast, DetectedFarmLocation } from '../types';
import { 
  AGRO_DISTRICTS, 
  detectBrowserGPSLocation, 
  generateWeeklyForecast, 
  findNearestDistrict 
} from '../services/weatherForecastService';

interface LocationOccurrence {
  id: string;
  name: string;
  name_te: string;
  name_hi: string;
  state: string;
  temperatureC: number;
  humidityPercentage: number;
  rainfallProb: number;
  windSpeedKmh: number;
  forecast: string;
  currentOccurrence_en: string;
  currentOccurrence_te: string;
  currentOccurrence_hi: string;
  trigger_en: string;
  trigger_te: string;
  trigger_hi: string;
  fieldReport_en: string;
  fieldReport_te: string;
  fieldReport_hi: string;
  sprayWindow: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MODERATE';
}

const LOCATIONS_DATA: LocationOccurrence[] = [
  {
    id: 'warangal',
    name: 'Warangal & Hanamkonda',
    name_te: 'వరంగల్ & హనుమకొండ',
    name_hi: 'वारंगल एवं हनमकोंडा',
    state: 'Telangana',
    temperatureC: 28.5,
    humidityPercentage: 86,
    rainfallProb: 40,
    windSpeedKmh: 8.5,
    forecast: 'Cloudy with sporadic humidity bursts',
    currentOccurrence_en: 'Pink Bollworm Rosette flower damage and larval entry into young green cotton bolls. Early squares shedding.',
    currentOccurrence_te: 'పత్తి పంటలో గులాబీ రంగు పురుగు దాడి - రోసెట్ పూలు వికసించకపోవడం మరియు పిందెలు రాలిపోవడం జరుగుతోంది.',
    currentOccurrence_hi: 'कपास की फसल में गुलाबी सुंडी का प्रकोप - फूल बंद रहना (रोसेट) और छोटी गूलरों का झड़ना जारी है।',
    trigger_en: 'High night-time humidity (86%) and warm ambient 28°C accelerating egg hatch rates within 36 hours.',
    trigger_te: 'రాత్రి వేళల్లో 86% తేమ మరియు 28°C ఉష్ణోగ్రత వల్ల పురుగు గుడ్లు వేగంగా పిల్లలుగా మారుతున్నాయి.',
    trigger_hi: 'रात के समय 86% नमी और 28°C तापमान के कारण सुंडी के अंडों से बच्चे तेजी से निकल रहे हैं।',
    fieldReport_en: '14 adjacent mandals reported trap counts exceeding ETL threshold (8-10 moths/trap/night).',
    fieldReport_te: '14 మండలాల్లో లింగాకర్షక బుట్టలలో పురుగుల సంఖ్య పరిమితిని మించింది (రాత్రికి 8-10 రెక్కల పురుగులు).',
    fieldReport_hi: '14 मंडलों में फेरोमोन ट्रैप में कीटों की संख्या आर्थिक सीमा (8-10 कीट/रात) पार कर चुकी है।',
    sprayWindow: '4:30 PM - 6:45 PM (Low Drift Window)',
    riskLevel: 'HIGH'
  },
  {
    id: 'karimnagar',
    name: 'Karimnagar & Peddapalli',
    name_te: 'కరీంనగర్ & పెద్దపల్లి',
    name_hi: 'करीमनगर एवं पेद्दापल्ली',
    state: 'Telangana',
    temperatureC: 29.2,
    humidityPercentage: 82,
    rainfallProb: 35,
    windSpeedKmh: 7.8,
    forecast: 'Warm afternoon clearing to humid evening',
    currentOccurrence_en: 'Brown Plant Hopper (BPH) hopperburn circular patches in dense paddy canopy and leaf folder caterpillar folding leaves.',
    currentOccurrence_te: 'వరిలో సుడిదోమ (BPH) మరియు ఆకు చుట్టు పురుగు ఉధృతి - మొదళ్ల వద్ద రసం పీల్చడం వల్ల మొక్కలు ఎండిపోతున్నాయి.',
    currentOccurrence_hi: 'धान की फसल में भूरा फुदका (BPH) और पत्ता लपेटक कीड़ा - पौधों के आधार से रस चूसने के कारण हॉपरबर्न के गोल धब्बे बन रहे हैं।',
    trigger_en: 'Dense planting combined with 82% microclimate humidity at the water-stem interface creating ideal breeding incubator.',
    trigger_te: 'మొక్కల మధ్య ఎడం తక్కువగా ఉండటం మరియు నీటి మట్టం వద్ద 82% తేమ సుడిదోమ వేగవంతమైన వృద్ధికి కారణమవుతోంది.',
    trigger_hi: 'घने पौधे और तने के पास 82% नमी भूरा फुदका के तेजी से प्रजनन के लिए अनुकूल है।',
    fieldReport_en: 'Paddy nursery and tillering clusters in Jammikunta reporting 15-20 nymphs per hill.',
    fieldReport_te: 'జమ్మికుంట మండలంలో దుబ్బుకు 15-20 వరకు దోమ పిల్లలు ఉన్నట్లు నమోదు చేయబడింది.',
    fieldReport_hi: 'जम्मिकुंटा क्षेत्र में प्रति पौधा 15-20 फुदके दर्ज किए गए।',
    sprayWindow: '5:00 PM - 7:00 PM (Direct nozzle at plant base)',
    riskLevel: 'HIGH'
  },
  {
    id: 'nizamabad',
    name: 'Nizamabad & Kamareddy',
    name_te: 'నిజామాబాద్ & కామారెడ్డి',
    name_hi: 'निज़ामाबाद एवं कामारेड्डी',
    state: 'Telangana',
    temperatureC: 27.8,
    humidityPercentage: 88,
    rainfallProb: 55,
    windSpeedKmh: 6.5,
    forecast: 'Intermittent drizzles with cloudy skies',
    currentOccurrence_en: 'Turmeric Leaf Spot (Colletotrichum capsici) and Rhizome Rot water-soaked lesions in low-lying black soils.',
    currentOccurrence_te: 'పసుపు పంటలో ఆకు మచ్చ తెగులు మరియు దుంప కుళ్లు తెగులు - ఆకులపై గోధుమ రంగు మచ్చలు విస్తరిస్తున్నాయి.',
    currentOccurrence_hi: 'हल्दी की फसल में पत्ती धब्बा एवं कंद सड़न रोग - काली मिट्टी में जलभराव से जड़ें सड़ रही हैं।',
    trigger_en: 'Prolonged soil saturation and 88% atmospheric humidity triggering fungal zoospore motility.',
    trigger_te: 'భూమిలో అధిక తేమ మరియు 88% వాతావరణ తేమ ఫంగస్ విత్తనాలు వేగంగా కదలడానికి దారితీస్తోంది.',
    trigger_hi: 'लगातार नमी और 88% आर्द्रता से फफूंद के बीजाणु तेजी से जड़ तंत्र पर हमला कर रहे हैं।',
    fieldReport_en: 'Armoor turmeric pocket reporting 12% affected rhizome hills; drainage ridge shaping advised.',
    fieldReport_te: 'ఆర్మూర్ ప్రాంతంలో 12% వరకు దుంప కుళ్లు గుర్తించారు; మురుగు నీటి కాలువలు తీయడం తప్పనిసరి.',
    fieldReport_hi: 'आर्मूर क्षेत्र में 12% हल्दी के पौधों में सड़न देखी गई; जल निकासी की सलाह दी गई।',
    sprayWindow: 'Tomorrow Morning 7:30 AM - 9:30 AM (Add Sticker)',
    riskLevel: 'CRITICAL'
  },
  {
    id: 'khammam',
    name: 'Khammam & Kothagudem',
    name_te: 'ఖమ్మం & కొత్తగూడెం',
    name_hi: 'खम्मम एवं कोठागुडेम',
    state: 'Telangana',
    temperatureC: 30.5,
    humidityPercentage: 80,
    rainfallProb: 45,
    windSpeedKmh: 9.0,
    forecast: 'Warm tropical humidity with evening thunderstorms',
    currentOccurrence_en: 'Chilli Anthracnose / Fruit Rot (Die-back) circular sunken lesions on ripe pods and Black Thrips flower infesting.',
    currentOccurrence_te: 'మిరపలో కాయ కుళ్లు / కొమ్మ ఎండు తెగులు మరియు పూతపై నల్ల తామర పురుగు దాడి.',
    currentOccurrence_hi: 'मिर्च की फसल में फल सड़न (एंथ्रेक्नोज़) और फूलों पर काले थ्रिप्स का हमला।',
    trigger_en: 'Frequent intermittent showers followed by 30°C temperature creating perfect moisture-heat incubation cycle.',
    trigger_te: 'వర్షం పడి వెంటనే ఎండ కాయడం వల్ల ఫంగస్ కాయలపై త్వరగా వ్యాపిస్తోంది.',
    trigger_hi: 'बारिश के बाद तेज धूप और 30°C तापमान से फफूंद तेजी से फलों को सड़ा रही है।',
    fieldReport_en: 'Wyra and Madhira mandals noted pod spotting on early flush pickings.',
    fieldReport_te: 'వైరా, మధిర మండలాల్లో మొదటి కోత కాయలపై మచ్చలు గమనించబడ్డాయి.',
    fieldReport_hi: 'वायरा और मधिरा क्षेत्र में पहली तुड़ाई की मिर्चियों पर काले धब्बे देखे गए।',
    sprayWindow: '4:00 PM - 6:15 PM (Pre-shower window)',
    riskLevel: 'HIGH'
  },
  {
    id: 'nalgonda',
    name: 'Nalgonda & Suryapet',
    name_te: 'నల్గొండ & సూర్యాపేట',
    name_hi: 'नलगोंडा एवं सूर्यापेट',
    state: 'Telangana',
    temperatureC: 31.0,
    humidityPercentage: 74,
    rainfallProb: 25,
    windSpeedKmh: 10.5,
    forecast: 'Breezy partly overcast with bright sunlight',
    currentOccurrence_en: 'Sweet Orange / Citrus Canker raised corky lesions on fruit rinds and Leaf Miner silvery serpentine leaf tunnels.',
    currentOccurrence_te: 'బత్తాయి తోటల్లో గజ్జి తెగులు (సిట్రస్ కాంకర్) మరియు ఆకు తొలుచు పురుగు ఉధృతి.',
    currentOccurrence_hi: 'मौसंबी/नींबू में सिट्रस कैंकर रोग और लीफ माइनर कीट द्वारा पत्तियों में सर्पिलाकार सुरंगे।',
    trigger_en: 'Moderate wind velocity spreading Xanthomonas bacteria droplets across touching orchard foliage.',
    trigger_te: 'గాలి వీయడం వల్ల బాక్టీరియా తుంపర్లు ఒక చెట్టు నుంచి మరొక చెట్టుకు సులభంగా వ్యాపిస్తున్నాయి.',
    trigger_hi: 'हवा के साथ बैक्टीरिया की बूंदें एक पेड़ से दूसरे पेड़ पर फैल रही हैं।',
    fieldReport_en: 'Miryalaguda citrus belt reports 8% fruit blemishing on young marble-sized fruits.',
    fieldReport_te: 'మిర్యాలగూడ బత్తాయి తోటల్లో పిందెలపై గజ్జి మచ్చలు గమనించారు.',
    fieldReport_hi: 'मिर्यालगुडा क्षेत्र में छोटे फलों पर कैंकर के उभरे हुए धब्बे पाए गए।',
    sprayWindow: '4:30 PM - 6:30 PM Today',
    riskLevel: 'MODERATE'
  },
  {
    id: 'guntur',
    name: 'Guntur & Krishna Basin',
    name_te: 'గుంటూరు & కృష్ణా డెల్టా',
    name_hi: 'गुंटूर एवं कृष्णा डेल्टा',
    state: 'Andhra Pradesh',
    temperatureC: 32.0,
    humidityPercentage: 68,
    rainfallProb: 15,
    windSpeedKmh: 12.0,
    forecast: 'Dry warm winds with intense sunlight',
    currentOccurrence_en: 'Invasive Black Thrips (Thrips parvispinus) swarm feeding on chilli flowers, causing upward leaf curling and flower abortion.',
    currentOccurrence_te: 'మిరప తోటల్లో నల్ల తామర పురుగు తీవ్ర వ్యాప్తి - ఆకులు పైకి ముడుచుకుపోవడం మరియు పూత రాలిపోవడం జరుగుతోంది.',
    currentOccurrence_hi: 'मिर्च की फसल में काले थ्रिप्स का भारी हमला - पत्तियां ऊपर मुड़ना और फूलों का गिरना शुरू हो गया है।',
    trigger_en: 'Warm dry breeze accelerating adult thrips reproductive cycles from egg to adult in under 12 days.',
    trigger_te: 'వేడి పొడి గాలుల వల్ల తామర పురుగు 12 రోజుల్లోనే రెట్టింపు వేగంతో గుడ్లు పెట్టి వ్యాపిస్తోంది.',
    trigger_hi: 'गर्म हवाओं के कारण थ्रिप्स का जीवन चक्र केवल 12 दिनों में पूरा हो रहा है जिससे संख्या तेजी से बढ़ रही है।',
    fieldReport_en: 'Over 28 village clusters noted boat-shaped leaves and severe terminal shoot bunching.',
    fieldReport_te: '28 కి పైగా గ్రామాల్లో ఆకులు పడవ ఆకారంలో ముడుచుకుపోవడం గుర్తించబడింది.',
    fieldReport_hi: '28 से अधिक गांवों में पत्तियों का नाव जैसा मुड़ना और पौधों का विकास रुकना देखा गया।',
    sprayWindow: '5:00 PM - 7:00 PM Today (Avoid midday heat)',
    riskLevel: 'CRITICAL'
  },
  {
    id: 'patiala',
    name: 'Patiala & Sangrur',
    name_te: 'పాటియాలా & సంగ్రూర్',
    name_hi: 'पटियाला एवं संगरूर',
    state: 'Punjab',
    temperatureC: 26.2,
    humidityPercentage: 92,
    rainfallProb: 65,
    windSpeedKmh: 6.0,
    forecast: 'Overcast skies with intermittent light drizzle',
    currentOccurrence_en: 'Rice Blast (Magnaporthe oryzae) spindle lesions expanding on leaf blades; panicle neck rot emerging in early sown paddy.',
    currentOccurrence_te: 'వరి ఆకులపై అగ్గితెగులు కంటి ఆకారపు మచ్చలు మరియు వెన్ను మెడ విరుపు తెగులు వేగంగా వ్యాపిస్తోంది.',
    currentOccurrence_hi: 'धान की पत्तियों पर झोंका रोग (ब्लास्ट) के आंख जैसे धब्बे और बालियों की गर्दन टूटने का रोग फैल रहा है।',
    trigger_en: 'Continuous leaf wetness for > 14 hours and persistent relative humidity > 90% triggering conidiospore release.',
    trigger_te: 'ఆకులపై 14 గంటలకు పైగా నీటి బిందువులు మరియు 90% పైగా తేమ ఉండటం వల్ల ఫంగస్ విత్తనాలు మొలకెత్తుతున్నాయి.',
    trigger_hi: 'पत्तियों पर 14 घंटे से अधिक समय तक नमी रहने और 90% आर्द्रता से फफूंद के बीजाणु तेजी से फैल रहे हैं।',
    fieldReport_en: '19 panchayats flagged neck rot discoloration during reproductive panicle initiation.',
    fieldReport_te: '19 పంచాయతీలలో వెన్ను మెడ నల్లగా మారి విరిగిపోవడం గమనించబడింది.',
    fieldReport_hi: '19 पंचायतों में धान की बालियों के आधार पर कालापन और सड़न दर्ज की गई है।',
    sprayWindow: 'Tomorrow Morning 7:00 AM - 9:30 AM (During dry lull)',
    riskLevel: 'HIGH'
  },
  {
    id: 'nashik',
    name: 'Nashik & Niphad Valley',
    name_te: 'నాసిక్ & నిఫాడ్',
    name_hi: 'नासिक एवं निफाड़',
    state: 'Maharashtra',
    temperatureC: 25.0,
    humidityPercentage: 78,
    rainfallProb: 30,
    windSpeedKmh: 9.0,
    forecast: 'Morning mist clearing to mild sunny afternoon',
    currentOccurrence_en: 'Tomato Early Blight target lesions on bottom leaves and Tomato Pinworm (Tuta absoluta) leaf tunneling.',
    currentOccurrence_te: 'టమోటా అడుగు ఆకులపై ఎర్లీ బ్లైట్ నల్లటి వలయాల మచ్చలు మరియు ఆకు తొలుచు పురుగు కలుగుతోంది.',
    currentOccurrence_hi: 'टमाटर की निचली पत्तियों पर अगेती झुलसा के धब्बे और लीफ माइनर कीड़े द्वारा पत्तियों में सुरंगे बनाना जारी है।',
    trigger_en: 'Alternating morning heavy dews and mild daytime temperatures favorable for Alternaria conidia germination.',
    trigger_te: 'ఉదయం పడే దట్టమైన మంచు మరియు పగటి వేడి ఆల్టర్నేరియా ఫంగస్ వ్యాప్తికి అనుకూలంగా మారింది.',
    trigger_hi: 'सुबह की तेज ओस और दिन के तापमान के अंतर से फफूंद के फैलाव के लिए अनुकूल स्थिति बन रही है।',
    fieldReport_en: 'Farmer clusters reporting 18-24% lower leaf necrosis across 9 mandals.',
    fieldReport_te: '9 మండలాల్లోని టమోటా తోటల్లో 20% వరకు ఆకు మచ్చలు ఉన్నట్లు గుర్తించారు.',
    fieldReport_hi: '9 तहसीलों में टमाटर की निचली पत्तियों पर 20% तक झुलसा देखा गया।',
    sprayWindow: '3:30 PM - 6:00 PM Today',
    riskLevel: 'MODERATE'
  }
];

export const WeatherRiskCard: React.FC = () => {
  const { t, language, speak, stopSpeaking, isSpeaking } = useLanguage();
  
  // Location & GPS State
  const [selectedLocId, setSelectedLocId] = useState<string>('warangal');
  const [detectedGps, setDetectedGps] = useState<DetectedFarmLocation | null>(null);
  const [isLocatingGps, setIsLocatingGps] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  
  // 7-Day Forecast State
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Active district metadata
  const activeLoc = useMemo(() => {
    return LOCATIONS_DATA.find(l => l.id === selectedLocId) || LOCATIONS_DATA[0];
  }, [selectedLocId]);

  // Coordinates for forecast calculation
  const currentCoords = useMemo(() => {
    if (detectedGps && detectedGps.isGpsActive) {
      return { lat: detectedGps.latitude, lng: detectedGps.longitude };
    }
    const dist = AGRO_DISTRICTS.find(d => d.id === selectedLocId) || AGRO_DISTRICTS[0];
    return { lat: dist.lat, lng: dist.lng };
  }, [detectedGps, selectedLocId]);

  // Generate high-accuracy 7-Day Forecast
  const weeklyForecast: DayWeatherForecast[] = useMemo(() => {
    return generateWeeklyForecast(currentCoords.lat, currentCoords.lng, selectedLocId);
  }, [currentCoords.lat, currentCoords.lng, selectedLocId]);

  // Active selected day from the 7-day forecast
  const activeDay: DayWeatherForecast = weeklyForecast[selectedDayIndex] || weeklyForecast[0];

  // Detect GPS Position automatically on button click
  const handleDetectGPS = async () => {
    setIsLocatingGps(true);
    setGpsError(null);

    try {
      const gpsLocation = await detectBrowserGPSLocation();
      setDetectedGps(gpsLocation);

      // Find nearest district in LOCATIONS_DATA
      const { district } = findNearestDistrict(gpsLocation.latitude, gpsLocation.longitude);
      const matched = LOCATIONS_DATA.find(l => l.id === district.id);
      if (matched) {
        setSelectedLocId(matched.id);
      }
      setSelectedDayIndex(0); // Reset to today
    } catch (err: any) {
      console.warn('GPS detection notice:', err.message);
      setGpsError(
        language === 'te' 
          ? 'GPS సిగ్నల్ అందుబాటులో లేదు. డిఫాల్ట్ ప్రాంతీయ వాతావరణ కేంద్రాన్ని ఉపయోగిస్తున్నాం.' 
          : language === 'hi' 
          ? 'जीपीएस संकेत अनुपलब्ध। क्षेत्रीय मौसम केंद्र का उपयोग किया जा रहा है।' 
          : 'GPS location unavailable. Using regional agro-meteorological station.'
      );
    } finally {
      setIsLocatingGps(false);
    }
  };

  // Voice Narration
  const handleVoiceWeather = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const locDisplayName = detectedGps && detectedGps.isGpsActive
      ? `${detectedGps.district} (${detectedGps.state})`
      : language === 'te' ? activeLoc.name_te : language === 'hi' ? activeLoc.name_hi : activeLoc.name;

    const dayName = language === 'te' ? activeDay.dayName_te : language === 'hi' ? activeDay.dayName_hi : activeDay.dayName;
    const condition = language === 'te' ? activeDay.condition_te : language === 'hi' ? activeDay.condition_hi : activeDay.condition;
    const diseaseRisk = language === 'te' ? activeDay.diseaseRisk_te : language === 'hi' ? activeDay.diseaseRisk_hi : activeDay.diseaseRisk;
    const sprayAdvice = language === 'te' ? activeDay.sprayAdvice_te : language === 'hi' ? activeDay.sprayAdvice_hi : activeDay.sprayAdvice;

    let speech = '';
    if (language === 'te') {
      speech = `ప్రాంతం: ${locDisplayName}. రోజు: ${dayName} ${activeDay.formattedDate}. వాతావరణం: ${condition}. ఉష్ణోగ్రత ${activeDay.tempMax} డిగ్రీలు, గాలిలో తేమ ${activeDay.humidityPercentage} శాతం, వర్ష సూచన ${activeDay.rainfallProb} శాతం. తెగులు ప్రమాదం: ${diseaseRisk}. పిచికారీ సలహా: ${sprayAdvice}.`;
    } else if (language === 'hi') {
      speech = `स्थान: ${locDisplayName}। दिन: ${dayName} ${activeDay.formattedDate}। मौसम: ${condition}। तापमान ${activeDay.tempMax} डिग्री, आर्द्रता ${activeDay.humidityPercentage} प्रतिशत, वर्षा की संभावना ${activeDay.rainfallProb} प्रतिशत। फसल रोग जोखिम: ${diseaseRisk}। छिड़काव सलाह: ${sprayAdvice}।`;
    } else {
      speech = `Location: ${locDisplayName}. Forecast for ${dayName} ${activeDay.formattedDate}: ${condition}. Temperature reaches ${activeDay.tempMax} degrees Celsius with ${activeDay.humidityPercentage} percent relative humidity and ${activeDay.rainfallProb} percent rain probability. Crop disease risk: ${diseaseRisk}. Spraying advice: ${sprayAdvice}.`;
    }

    speak(speech);
  };

  // Render weather icon based on iconType
  const renderWeatherIcon = (type: DayWeatherForecast['iconType'], className = "w-6 h-6") => {
    switch (type) {
      case 'sunny':
        return <Sun className={`${className} text-amber-500 animate-spin-slow`} />;
      case 'partlyCloudy':
        return <CloudSun className={`${className} text-amber-600`} />;
      case 'thunderstorm':
        return <CloudLightning className={`${className} text-purple-600`} />;
      case 'rain':
      case 'heavyRain':
        return <CloudRain className={`${className} text-blue-600`} />;
      case 'fog':
        return <Droplets className={`${className} text-teal-600`} />;
      case 'cloudy':
      default:
        return <CloudSun className={`${className} text-slate-600`} />;
    }
  };

  return (
    <div id="weather-risk" className="w-full my-8 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold mb-2 shadow-xs">
          <CloudSun className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t('weather_title')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t('weather_title')}
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          {t('weather_subtitle')}
        </p>
      </div>

      {/* Main Container in Pure White Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-emerald-100 shadow-xl space-y-6">
        
        {/* ================================================================= */}
        {/* 1. GPS LOCATION DETECTION & DISTRICT SELECTOR BAR */}
        {/* ================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-slate-50 border-2 border-emerald-200/80 shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Left: Location Identity & GPS Status */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs ${
                detectedGps?.isGpsActive 
                  ? 'bg-emerald-600 text-white border-emerald-700 ring-4 ring-emerald-100' 
                  : 'bg-emerald-100/80 text-emerald-800 border-emerald-300'
              }`}>
                {detectedGps?.isGpsActive ? (
                  <LocateFixed className="w-6 h-6 animate-pulse" />
                ) : (
                  <MapPin className="w-6 h-6" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                    {detectedGps?.isGpsActive ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        {t('weather_gps_active')}
                      </span>
                    ) : (
                      language === 'te' ? 'పంట పొలం స్థానం' : language === 'hi' ? 'खेत की स्थिति' : 'Farm Agro-Climate Hub'
                    )}
                  </span>

                  {detectedGps?.isGpsActive && (
                    <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {detectedGps.latitude}° N, {detectedGps.longitude}° E (±{detectedGps.accuracyMeters}m)
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  {detectedGps?.isGpsActive ? (
                    <span>
                      {detectedGps.district} <span className="text-sm font-semibold text-slate-500">({detectedGps.state})</span>
                    </span>
                  ) : (
                    <span>{language === 'te' ? activeLoc.name_te : language === 'hi' ? activeLoc.name_hi : activeLoc.name}</span>
                  )}
                </h3>

                {detectedGps?.isGpsActive ? (
                  <p className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{detectedGps.villageOrMandal}</span>
                  </p>
                ) : (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {language === 'te' ? 'జిల్లాల ఎంపిక లేదా తక్షణ GPS గుర్తింపు ద్వారా వాతావరణాన్ని చూడండి' : language === 'hi' ? 'जिला चुनें या जीपीएस से अपने खेत का सटीक मौसम जानें' : 'Real-time agro-met data aligned to Telangana & regional microclimates'}
                  </p>
                )}
              </div>
            </div>

            {/* Right: GPS Trigger Button & District Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
              
              {/* GPS Auto-Detect Button */}
              <button
                onClick={handleDetectGPS}
                disabled={isLocatingGps}
                className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
                  detectedGps?.isGpsActive
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
                }`}
                title="Detect precise GPS location from your device"
              >
                {isLocatingGps ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('weather_gps_locating')}</span>
                  </>
                ) : detectedGps?.isGpsActive ? (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>{t('weather_gps_refresh')}</span>
                  </>
                ) : (
                  <>
                    <LocateFixed className="w-4 h-4 text-emerald-200" />
                    <span>{t('weather_gps_btn')}</span>
                  </>
                )}
              </button>

              {/* District Dropdown */}
              <select
                value={selectedLocId}
                onChange={(e) => {
                  setSelectedLocId(e.target.value);
                  if (detectedGps) {
                    // Switch back to manual district mode
                    setDetectedGps(prev => prev ? { ...prev, isGpsActive: false } : null);
                  }
                  setSelectedDayIndex(0);
                }}
                className="bg-white border-2 border-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-emerald-600 shadow-xs cursor-pointer"
              >
                {LOCATIONS_DATA.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.state})
                  </option>
                ))}
              </select>

              {/* Voice Advisory Button */}
              <button
                onClick={handleVoiceWeather}
                className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 transition-all text-xs font-bold shrink-0 cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                    : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-xs'
                }`}
                title="Listen to Weather Advisory"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
                <span className="hidden sm:inline">{isSpeaking ? t('audio_stop') : t('audio_listen')}</span>
              </button>
            </div>
          </div>

          {/* GPS Error Notification if any */}
          {gpsError && (
            <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{gpsError}</span>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* 2. 7-DAY WEATHER CONDITION & CROP RISK FORECAST STRIP */}
        {/* ================================================================= */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {t('weather_7day_title')}
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {t('weather_select_day')}
            </span>
          </div>

          {/* 7-Day Horizontal Responsive Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {weeklyForecast.map((day) => {
              const isSelected = selectedDayIndex === day.dayIndex;
              const dayLabel = language === 'te' ? day.dayName_te : language === 'hi' ? day.dayName_hi : day.dayName;
              const conditionLabel = language === 'te' ? day.condition_te : language === 'hi' ? day.condition_hi : day.condition;

              return (
                <button
                  key={day.dayIndex}
                  onClick={() => setSelectedDayIndex(day.dayIndex)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between relative cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50/40 border-emerald-600 shadow-md ring-2 ring-emerald-400/40 scale-[1.02]'
                      : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Active Indicator Pin */}
                  {isSelected && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wider">
                      {day.dayIndex === 0 ? 'Today' : 'Viewing'}
                    </div>
                  )}

                  {/* Day Header */}
                  <div className="border-b border-slate-200/60 pb-2 mb-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-wider ${
                        isSelected ? 'text-emerald-900' : 'text-slate-800'
                      }`}>
                        {dayLabel}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600">
                        {day.formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Weather Icon & Condition Text */}
                  <div className="my-1 text-center flex flex-col items-center">
                    <div className="p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs mb-1.5">
                      {renderWeatherIcon(day.iconType, "w-6 h-6")}
                    </div>
                    <span className="text-[11px] font-black text-slate-800 line-clamp-1 leading-tight text-center" title={conditionLabel}>
                      {conditionLabel}
                    </span>
                  </div>

                  {/* High / Low Temp */}
                  <div className="text-center my-1.5">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {day.tempMax}°
                    </span>
                    <span className="text-xs text-slate-600 font-mono ml-1">
                      / {day.tempMin}°C
                    </span>
                  </div>

                  {/* Micro-Parameters: Rain, Humidity, Wind */}
                  <div className="space-y-1 text-[10px] text-slate-600 pt-2 border-t border-slate-200/60 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-blue-700">
                        <CloudRain className="w-3 h-3" />
                        <span>{day.rainfallProb}%</span>
                      </span>
                      <span className="flex items-center gap-1 text-cyan-700">
                        <Droplets className="w-3 h-3" />
                        <span>{day.humidityPercentage}%</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] text-slate-600">
                      <span className="flex items-center gap-0.5">
                        <Wind className="w-2.5 h-2.5 text-slate-600" />
                        <span>{day.windSpeedKmh}k/h</span>
                      </span>
                      {day.precipitationMm > 0 ? (
                        <span className="text-blue-700 font-bold">{day.precipitationMm}mm</span>
                      ) : (
                        <span className="text-slate-600 font-medium">0mm</span>
                      )}
                    </div>
                  </div>

                  {/* Pathogen Risk Pill */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-200/60">
                    <div className={`px-1.5 py-0.5 rounded text-[9px] font-black text-center uppercase truncate ${
                      day.riskLevel === 'CRITICAL'
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : day.riskLevel === 'HIGH'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : day.riskLevel === 'MODERATE'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {day.riskLevel}
                    </div>

                    {/* Spray Suitability Icon Dot */}
                    <div className="mt-1 flex items-center justify-center gap-1 text-[9px] font-semibold text-slate-600">
                      {day.spraySuitability === 'OPTIMAL' ? (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle className="w-2.5 h-2.5" /> Spray OK
                        </span>
                      ) : day.spraySuitability === 'PROHIBITED' ? (
                        <span className="text-red-700 flex items-center gap-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" /> Washout
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-0.5">
                          <Wind className="w-2.5 h-2.5" /> Drift Risk
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. ACTIVE DAY METEOROLOGICAL SENSORS READOUT */}
        {/* ================================================================= */}
        <div>
          {/* Active Day Headline Banner */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                {language === 'te' 
                  ? `${activeDay.dayName_te} (${activeDay.formattedDate}) సూక్ష్మ వాతావరణ పారామితులు` 
                  : language === 'hi' 
                  ? `${activeDay.dayName_hi} (${activeDay.formattedDate}) के सूक्ष्म मौसम मापदंड` 
                  : `Microclimate Sensors for ${activeDay.dayName} (${activeDay.formattedDate})`}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              {language === 'te' ? activeDay.condition_te : language === 'hi' ? activeDay.condition_hi : activeDay.condition}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* Sensor 1: Temperature */}
            <div className="bg-gradient-to-br from-amber-100 via-white to-orange-100 p-4 rounded-2xl border-2 border-orange-300 text-center flex flex-col items-center justify-center shadow-xs">
              <Thermometer className="w-7 h-7 text-orange-600 mb-1" />
              <span className="text-[11px] text-orange-900 font-black uppercase tracking-wider">{t('weather_temp')}</span>
              <span className="text-2xl font-black text-orange-950 font-mono mt-0.5">{activeDay.tempMax}°C</span>
              <span className="text-[10px] text-orange-800/80 font-bold mt-0.5">Min: {activeDay.tempMin}°C</span>
            </div>

            {/* Sensor 2: Humidity */}
            <div className="bg-gradient-to-br from-cyan-100 via-white to-blue-100 p-4 rounded-2xl border-2 border-cyan-300 text-center flex flex-col items-center justify-center shadow-xs">
              <Droplets className="w-7 h-7 text-cyan-600 mb-1" />
              <span className="text-[11px] text-cyan-900 font-black uppercase tracking-wider">{t('weather_humidity')}</span>
              <span className="text-2xl font-black text-cyan-950 font-mono mt-0.5">{activeDay.humidityPercentage}%</span>
              <span className="text-[10px] text-cyan-800/80 font-bold mt-0.5">
                {activeDay.humidityPercentage > 80 ? 'Spore Germination Zone' : 'Optimal Leaf Transpiration'}
              </span>
            </div>

            {/* Sensor 3: Rain Probability */}
            <div className="bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-4 rounded-2xl border-2 border-indigo-300 text-center flex flex-col items-center justify-center shadow-xs">
              <CloudRain className="w-7 h-7 text-indigo-600 mb-1" />
              <span className="text-[11px] text-indigo-900 font-black uppercase tracking-wider">{t('weather_rain')}</span>
              <span className="text-2xl font-black text-indigo-950 font-mono mt-0.5">{activeDay.rainfallProb}%</span>
              <span className="text-[10px] text-indigo-800/80 font-bold mt-0.5">
                {activeDay.precipitationMm > 0 ? `Expected: ${activeDay.precipitationMm} mm` : 'Dry Canopy'}
              </span>
            </div>

            {/* Sensor 4: Wind Speed */}
            <div className="bg-gradient-to-br from-emerald-100 via-white to-teal-100 p-4 rounded-2xl border-2 border-emerald-300 text-center flex flex-col items-center justify-center shadow-xs">
              <Wind className="w-7 h-7 text-emerald-600 mb-1" />
              <span className="text-[11px] text-emerald-900 font-black uppercase tracking-wider">{t('weather_wind')}</span>
              <span className="text-2xl font-black text-emerald-950 font-mono mt-0.5">{activeDay.windSpeedKmh} km/h</span>
              <span className="text-[10px] text-emerald-800/80 font-bold mt-0.5">
                {activeDay.windSpeedKmh > 12 ? 'High Drift Risk' : 'Calm / Gentle Spray Drift'}
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. WHAT OCCURS AT THIS LOCATION ON THIS DAY */}
        {/* ================================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50/70 via-white to-amber-50/60 border-2 border-rose-200 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h4 className="text-sm sm:text-base font-black text-red-950 uppercase tracking-wide">
                {language === 'te' 
                  ? `${detectedGps?.isGpsActive ? detectedGps.district : activeLoc.name_te} లో ${activeDay.dayName_te} నాటి వ్యాధి / పురుగు పరిస్థితి:`
                  : language === 'hi'
                  ? `${detectedGps?.isGpsActive ? detectedGps.district : activeLoc.name_hi} में ${activeDay.dayName_hi} की रोग एवं कीट स्थिति:`
                  : `Occurrences & Pathogen Pressure for ${activeDay.dayName} (${detectedGps?.isGpsActive ? detectedGps.district : activeLoc.name}):`}
              </h4>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase shadow-2xs ${
              activeDay.riskLevel === 'CRITICAL' 
                ? 'bg-red-600 text-white' 
                : activeDay.riskLevel === 'HIGH' 
                ? 'bg-amber-500 text-slate-900' 
                : 'bg-emerald-600 text-white'
            }`}>
              {activeDay.riskLevel} Threat
            </span>
          </div>

          {/* Primary Condition Occurrence Description */}
          <p className="text-sm font-bold text-slate-900 mb-3 leading-relaxed">
            {language === 'te' 
              ? activeLoc.currentOccurrence_te 
              : language === 'hi' 
              ? activeLoc.currentOccurrence_hi 
              : activeLoc.currentOccurrence_en}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Trigger Card */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
              <strong className="text-amber-800 flex items-center gap-1 mb-1 font-bold">
                <span>🌡️</span>
                <span>{language === 'te' ? 'వాతావరణ ప్రేరణ (ట్రిగ్గర్):' : language === 'hi' ? 'मौसम का प्रभाव (ट्रिगर):' : 'Day Microclimate Trigger:'}</span>
              </strong>
              <p className="text-slate-600 leading-relaxed font-medium">
                {language === 'te' ? activeDay.diseaseRisk_te : language === 'hi' ? activeDay.diseaseRisk_hi : activeDay.diseaseRisk}
              </p>
            </div>

            {/* Field Scouting Report */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs shadow-xs">
              <strong className="text-emerald-800 flex items-center gap-1 mb-1 font-bold">
                <span>📋</span>
                <span>{language === 'te' ? 'క్షేత్ర స్థాయి నివేదిక:' : language === 'hi' ? 'खेत स्तर की रिपोर्ट:' : 'Field Scouting Report:'}</span>
              </strong>
              <p className="text-slate-600 leading-relaxed font-medium">
                {language === 'te' ? activeLoc.fieldReport_te : language === 'hi' ? activeLoc.fieldReport_hi : activeLoc.fieldReport_en}
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. OPTIMAL SPRAY WINDOW & ADVISORY BANNER FOR SELECTED DAY */}
        {/* ================================================================= */}
        <div className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs ${
          activeDay.spraySuitability === 'OPTIMAL'
            ? 'bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-300'
            : activeDay.spraySuitability === 'PROHIBITED'
            ? 'bg-gradient-to-r from-red-50 via-white to-rose-50 border-red-300'
            : 'bg-gradient-to-r from-amber-50 via-white to-yellow-50 border-amber-300'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              activeDay.spraySuitability === 'OPTIMAL'
                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                : activeDay.spraySuitability === 'PROHIBITED'
                ? 'bg-red-100 border-red-300 text-red-700'
                : 'bg-amber-100 border-amber-300 text-amber-700'
            }`}>
              {activeDay.spraySuitability === 'OPTIMAL' ? (
                <CheckCircle className="w-5 h-5" />
              ) : activeDay.spraySuitability === 'PROHIBITED' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>

            <div>
              <span className={`text-[11px] font-black uppercase tracking-wider block ${
                activeDay.spraySuitability === 'OPTIMAL'
                  ? 'text-emerald-800'
                  : activeDay.spraySuitability === 'PROHIBITED'
                  ? 'text-red-800'
                  : 'text-amber-800'
              }`}>
                {activeDay.dayName} ({activeDay.formattedDate}) • {t('spray_suitability')}
              </span>
              
              <p className="text-sm font-black text-slate-900 mt-0.5">
                {language === 'te' ? activeDay.sprayAdvice_te : language === 'hi' ? activeDay.sprayAdvice_hi : activeDay.sprayAdvice}
              </p>
              
              <p className="text-xs text-slate-600 mt-0.5">
                Wind: {activeDay.windSpeedKmh} km/h • Rain Prob: {activeDay.rainfallProb}% • Canopy Moisture: {activeDay.humidityPercentage}%
              </p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs shrink-0 ${
            activeDay.spraySuitability === 'OPTIMAL'
              ? 'bg-emerald-600 text-white'
              : activeDay.spraySuitability === 'PROHIBITED'
              ? 'bg-red-600 text-white'
              : 'bg-amber-500 text-slate-900'
          }`}>
            {activeDay.spraySuitability === 'OPTIMAL'
              ? (language === 'te' ? 'పిచికారీకి అనుకూలం' : language === 'hi' ? 'छिड़काव के लिए उत्तम' : 'Optimal Spray Window')
              : activeDay.spraySuitability === 'PROHIBITED'
              ? (language === 'te' ? 'పిచికారీ చేయరాదు (వర్షం)' : language === 'hi' ? 'छिड़काव न करें (वर्षा)' : 'Spraying Prohibited')
              : (language === 'te' ? 'జాగ్రత్తతో పిచికారీ చేయండి' : language === 'hi' ? 'सावधानीपूर्वक छिड़काव' : 'Cautious Spray Window')}
          </div>
        </div>

      </div>
    </div>
  );
};
