import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { api } from '../services/api';

// Fallback dictionary for initial render & reliability
const initialTranslations: Record<Language, Record<string, string>> = {
  en: {
    app_name: 'CropShield',
    tagline: 'AI-Powered Early Detection & 3D Motion Crop Protection Platform',
    sub_tagline: 'Empowering farmers with instant visual diagnosis, calculated pesticide dosages, organic remedies, and community defense.',
    nav_3d: '3D Motion Plant',
    nav_scanner: 'AI Crop Scanner',
    nav_dosage: 'Pesticide Calculator',
    nav_reviews: 'Farmer Reviews',
    nav_weather: 'Weather Risk',
    nav_map: 'Pesticide Shops GPS',
    nav_prevention: 'Prevention Guide',
    badge_3d: 'Interactive 3D Motion',
    hero_title: 'Inspect Crop Health from Whole Plant to Cellular Nutrients & Bacteria',
    hero_desc: 'Explore how pathogens invade plant tissues and how nutrients nourish the cellular structure. Use the 3D controls below to zoom from macro foliage down to microscopic bacteria and chlorophyll.',
    view_macro: 'Whole Plant View',
    view_leaf: 'Leaf Surface & Stomata',
    view_micro: 'Cellular Level (Bacteria & Nutrients)',
    toggle_pathogens: 'Show Attacking Pathogens (Bacteria / Fungi)',
    toggle_nutrients: 'Show Flowing Nutrients (NPK & Chlorophyll)',
    zoom_slider: '3D Zoom Depth',
    reset_camera: 'Reset View',
    auto_rotate: 'Auto Sway & Rotate',
    scanner_title: 'AI Crop Disease & Pest Scanner',
    scanner_subtitle: 'Snap or upload a photo of your affected leaf, stem, or fruit for immediate scientific identification.',
    drop_photo: 'Drag & Drop or Click to Take Crop Photo',
    supports_formats: 'Supports JPG, PNG, WEBP (Clear close-up works best)',
    or_try_sample: 'Or try these pre-loaded field outbreak samples:',
    btn_scan: 'Analyze Crop Symptoms',
    btn_retake: 'Upload New Photo',
    scanning_status: 'Analyzing cellular symptoms and matching pathogen database...',
    diagnosis_result: 'AI Diagnostic Analysis',
    detection_type: 'Classification',
    scientific_name: 'Scientific Name',
    confidence: 'AI Confidence',
    severity: 'Severity Level',
    affected_area: 'Affected Foliage Area',
    observed_symptoms: 'Diagnosed Symptoms & Damage',
    why_disease_occurred: 'Why This Disease / Pest Occurred',
    causal_factors_title: 'Primary Causes, Weather Triggers & Vectors',
    btn_proceed_dosage: 'Calculate Required Pesticide Dosage',
    calc_title: 'Pesticide & Natural Remedy Dosage Calculator',
    calc_subtitle: 'Precise formulation calculation based on your farm acreage and sprayer equipment capacity.',
    tab_chemical: 'Scientific Chemical Solutions',
    tab_natural: '100% Natural & Organic Remedies',
    input_land_size: 'Total Farm Land Area',
    input_unit: 'Land Measurement Unit',
    unit_acres: 'Acres',
    unit_hectares: 'Hectares',
    unit_guntas: 'Guntas / Cents (1/40 Acre)',
    input_sprayer: 'Sprayer Equipment Type',
    sprayer_16l: '16 Litre Hand / Knapsack Sprayer',
    sprayer_20l: '20 Litre Battery / Electric Sprayer',
    sprayer_200l: '200 Litre Tractor Mounted / Barrel Sprayer',
    calc_summary: 'Dosage & Spray Application Prescription',
    chem_active: 'Active Ingredient',
    chem_brands: 'Standard Brands',
    chem_required: 'Total Chemical Required',
    water_required: 'Total Water Required',
    tanks_required: 'Number of Sprayer Tanks',
    dose_per_tank: 'Dose Per Sprayer Tank',
    phi_label: 'Pre-Harvest Interval (Waiting Period)',
    toxicity_code: 'Toxicity Classification',
    app_instructions: 'Application Instructions',
    natural_prep: 'Preparation & Recipe Steps',
    natural_benefits: 'Ecological & Crop Benefits',
    natural_cost_save: 'Estimated Cost Savings',
    reviews_title: 'Farmer Community Reviews on Pesticides',
    reviews_subtitle: 'Field-tested experiences, efficacy ratings, and recovery timelines submitted by verified farmers.',
    btn_write_review: 'Share Your Crop Experience',
    filter_all_crops: 'All Crops',
    recovery_days: 'Days to Visible Recovery',
    effectiveness_rating: 'Treatment Effectiveness',
    verified_farmer: 'Verified Farmer',
    form_name: 'Your Name',
    form_village: 'Village / Mandal',
    form_district: 'District & State',
    form_crop: 'Crop Cultivated',
    form_issue: 'Disease / Pest Problem',
    form_remedy: 'Pesticide or Remedy Used',
    form_rating: 'Star Rating (1 to 5)',
    form_effectiveness: 'Estimated Effectiveness (%)',
    form_days: 'Days for Recovery',
    form_comment: 'Detailed Field Review & Observations',
    btn_submit_review: 'Publish Farmer Review',
    weather_title: 'Weather-Based Crop Risk Forecast',
    weather_subtitle: 'Micro-climate indicators predicting spore germination, insect hatching, and safe spraying windows.',
    weather_temp: 'Temperature',
    weather_humidity: 'Relative Humidity',
    weather_rain: 'Rain Probability',
    weather_wind: 'Wind Velocity',
    risk_index: 'Crop Disease / Pest Risk Index',
    spray_suitability: 'Spraying Conditions Window',
    weather_7day_title: '7-Day Micro-Climate & Crop Risk Forecast',
    weather_gps_btn: 'Detect Farm Location (GPS)',
    weather_gps_locating: 'Acquiring GPS Satellite Lock...',
    weather_gps_active: 'GPS Farm Location Active',
    weather_gps_refresh: 'Refresh GPS',
    weather_day_forecast: 'Daily Pathogen & Spray Outlook',
    weather_select_day: 'Click any day to inspect detailed microclimate parameters',
    map_title: 'Telangana Pesticide & Agro-Input Shops GPS Locator',
    map_subtitle: 'Locate authorized pesticide retailers, certified organic bio-input dealers, and Rythu Seva Kendras across all Telangana districts.',
    map_alert_radius: 'Threat Radius',
    map_affected: 'Affected Villages Reported',
    map_advisory: 'Regional Preventive Advisory',
    audio_listen: 'Listen to Voice Advisory',
    audio_stop: 'Stop Audio',
    audio_playing: 'Speaking...',
    prevention_title: 'Integrated Pest Management (IPM) & Prevention',
    prevention_subtitle: 'Long-term soil health, biological resistance, and cultural practices to minimize chemical dependence.'
  },
  te: {
    app_name: 'క్రాప్ షీల్డ్ (CropShield)',
    tagline: 'AI ఆధారిత పంట తెగుళ్లు మరియు పురుగుల ముందస్తు గుర్తింపు & రక్షణ వేదిక',
    sub_tagline: 'రైతులకు తక్షణ వ్యాధి నిర్ధారణ, సరైన మందుల మోతాదు లెక్కింపు, సేంద్రీయ నివారణలు మరియు సామూహిక హెచ్చరికలు.',
    nav_3d: '3D యానిమేషన్ మొక్క',
    nav_scanner: 'AI పంట స్కానర్',
    nav_dosage: 'మందుల మోతాదు కాలిక్యులేటర్',
    nav_reviews: 'రైతుల సమీక్షలు',
    nav_weather: 'వాతావరణ ప్రమాద సూచిక',
    nav_map: 'పురుగుమందుల దుకాణాలు (GPS)',
    nav_prevention: 'నివారణ పద్ధతులు',
    badge_3d: 'ఇంటరాక్టివ్ 3D మోషన్',
    hero_title: 'మొక్క బాహ్య రూపం నుండి కణాల లోపలి బ్యాక్టీరియా & పోషకాల వరకు 3D లో చూడండి',
    hero_desc: 'తెగులు కలిగించే బ్యాక్టీరియా కణాలపై ఎలా దాడి చేస్తుందో, పోషకాలు మొక్కకు ఎలా బలాన్నిస్తాయో తెలుసుకోండి. జూమ్ కంట్రోల్స్ ద్వారా ఆకు పొరలను మరియు కణాలను పరీక్షించండి.',
    view_macro: 'మొత్తం మొక్క దృశ్యం',
    view_leaf: 'ఆకు పైభాగం & రంధ్రాలు (స్టొమాటా)',
    view_micro: 'కణాల స్థాయి (బ్యాక్టీరియా & పోషకాలు)',
    toggle_pathogens: 'దాడి చేసే బ్యాక్టీరియా / శిలీంధ్రాలను చూపించు',
    toggle_nutrients: 'ప్రవహించే పోషకాలను చూపించు (NPK & క్లోరోఫిల్)',
    zoom_slider: '3D జూమ్ లోతు',
    reset_camera: 'కెమెరాను రీసెట్ చేయండి',
    auto_rotate: 'ఆటో స్వే & రొటేట్',
    scanner_title: 'AI పంట తెగుళ్లు & పురుగుల స్కానర్',
    scanner_subtitle: 'బాధిత ఆకు, కాండం లేదా కాయ ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి. AI క్షణాల్లో వ్యాధిని గుర్తిస్తుంది.',
    drop_photo: 'పంట ఫోటోను ఇక్కడ వేయండి లేదా కెమెరాతో తీయండి',
    supports_formats: 'JPG, PNG, WEBP ఆమోదించబడతాయి (సమీపంలో తీసిన స్పష్టమైన ఫోటో మంచిది)',
    or_try_sample: 'లేదా ఈ నమూనా పంట తెగుళ్లను పరీక్షించండి:',
    btn_scan: 'పంట లక్షణాలను విశ్లేషించండి',
    btn_retake: 'మరొక ఫోటో తీయండి',
    scanning_status: 'ఆకు కణాలను విశ్లేషిస్తోంది, తెగులు డేటాతో సరిపోలుస్తోంది...',
    diagnosis_result: 'AI వ్యాధి నిర్ధారణ ఫలితం',
    detection_type: 'రకం',
    scientific_name: 'శాస్త్రీయ నామం',
    confidence: 'ఖచ్చితత్వం (విశ్వసనీయత)',
    severity: 'తీవ్రత స్థాయి',
    affected_area: 'దెబ్బతిన్న ఆకు విస్తీర్ణం',
    observed_symptoms: 'గుర్తించిన లక్షణాలు & నష్టం',
    why_disease_occurred: 'ఈ తెగులు / పురుగు దాడి రావడానికి గల కారణాలు',
    causal_factors_title: 'ప్రధాన కారణాలు, వాతావరణ పరిస్థితులు & వాహకాలు',
    btn_proceed_dosage: 'అవసరమైన మందుల మోతాదును లెక్కించండి',
    calc_title: 'పురుగుమందులు & సేంద్రీయ నివారణల మోతాదు కాలిక్యులేటర్',
    calc_subtitle: 'మీ పొలం విస్తీర్ణం మరియు స్ప్రేయర్ ట్యాంక్ సామర్థ్యాన్ని బట్టి ఖచ్చితమైన మోతాదు లెక్కింపు.',
    tab_chemical: 'శాస్త్రీయ రసాయన మందులు',
    tab_natural: '100% సహజ & సేంద్రీయ పద్ధతులు',
    input_land_size: 'మొత్తం పొలం విస్తీర్ణం',
    input_unit: 'కొలత ప్రమాణం',
    unit_acres: 'ఎకరాలు',
    unit_hectares: 'హెక్టార్లు',
    unit_guntas: 'గుంటలు / సెంట్లు',
    input_sprayer: 'స్ప్రేయర్ రకం',
    sprayer_16l: '16 లీటర్ల చేతి / నాప్‌సాక్ స్ప్రేయర్',
    sprayer_20l: '20 లీటర్ల బ్యాటరీ స్ప్రేయర్',
    sprayer_200l: '200 లీటర్ల ట్రాక్టర్ / బ్యారెల్ స్ప్రేయర్',
    calc_summary: 'స్ప్రే చేయాల్సిన ఖచ్చితమైన మోతాదు వివరాలు',
    chem_active: 'క్రియాశీల పదార్ధం (యాక్టివ్ ఇంగ్రీడియంట్)',
    chem_brands: 'మార్కెట్ బ్రాండ్లు',
    chem_required: 'మొత్తం అవసరమైన మందు',
    water_required: 'మొత్తం అవసరమైన నీరు',
    tanks_required: 'అవసరమైన స్ప్రేయర్ ట్యాంకుల సంఖ్య',
    dose_per_tank: 'ఒక్కో ట్యాంకుకు కలపాల్సిన మందు',
    phi_label: 'విరామ సమయం (కోతకు ముందు వేచి చూడాల్సిన రోజులు)',
    toxicity_code: 'విషపూరిత వర్గీకరణ త్రిభుజం',
    app_instructions: 'పిచికారీ చేసే విధానం & జాగ్రత్తలు',
    natural_prep: 'తయారీ విధానం & కావలసిన వస్తువులు',
    natural_benefits: 'సేంద్రీయ లాభాలు & నేల బలం',
    natural_cost_save: 'ఆదా అయ్యే ఖర్చు అంచనా',
    reviews_title: 'రైతుల నిజమైన సమీక్షలు & అనుభవాలు',
    reviews_subtitle: 'వివిధ జిల్లాల రైతులు వాడిన మందులు, వాటి ఫలితాలు మరియు రికవరీ వివరాలు.',
    btn_write_review: 'మీ అనుభవాన్ని పంచుకోండి',
    filter_all_crops: 'అన్ని పంటలు',
    recovery_days: 'ఫలితం కనిపించిన రోజులు',
    effectiveness_rating: 'నివారణ సామర్థ్యం',
    verified_farmer: 'ధృవీకరించబడిన రైతు',
    form_name: 'మీ పేరు',
    form_village: 'గ్రామం / మండలం',
    form_district: 'జిల్లా & రాష్ట్రం',
    form_crop: 'పండించిన పంట',
    form_issue: 'ఎదుర్కొన్న తెగులు / పురుగు సమస్య',
    form_remedy: 'వాడిన మందు లేదా కషాయం',
    form_rating: 'రేటింగ్ (1 నుండి 5 నక్షత్రాలు)',
    form_effectiveness: 'ఫలిత శాతం (%)',
    form_days: 'ఎన్ని రోజుల్లో నయమైంది',
    form_comment: 'మీ క్షేత్ర స్థాయి అనుభవం',
    btn_submit_review: 'సమీక్షను సమర్పించండి',
    weather_title: 'వాతావరణ ఆధారిత పంట ప్రమాద హెచ్చరిక',
    weather_subtitle: 'తేమ, ఉష్ణోగ్రత ఆధారంగా తెగుళ్లు వచ్చే అవకాశాన్ని ముందుగానే పసిగట్టడం.',
    weather_temp: 'ఉష్ణోగ్రత',
    weather_humidity: 'గాలిలో తేమ (హ్యుమిడిటీ)',
    weather_rain: 'వర్ష సూచన',
    weather_wind: 'గాలి వేగం',
    risk_index: 'తెగులు వచ్చే ప్రమాద స్థాయి',
    spray_suitability: 'పిచికారీ చేయడానికి అనుకూల సమయం',
    weather_7day_title: '7 రోజుల వాతావరణం మరియు పంట ప్రమాద సూచన',
    weather_gps_btn: 'నా పొలం లొకేషన్ గుర్తించండి (GPS)',
    weather_gps_locating: 'GPS ఉపగ్రహ సిగ్నల్ గుర్తిస్తోంది...',
    weather_gps_active: 'GPS పొలం స్థానం అనుసంధానించబడింది',
    weather_gps_refresh: 'GPS రిఫ్రెష్',
    weather_day_forecast: 'రోజువారీ తెగులు మరియు పిచికారీ సూచన',
    weather_select_day: 'వివరణాత్మక పారామితులను చూడటానికి ఏదైనా రోజుపై క్లిక్ చేయండి',
    map_title: 'తెలంగాణ పురుగుమందుల & ఎరువుల దుకాణాల GPS మ్యాప్',
    map_subtitle: 'తెలంగాణలోని అన్ని జిల్లాల అధీకృత పురుగుమందుల డీలర్లు, సేంద్రీయ కేంద్రాలు మరియు రైతు సేవా కేంద్రాలు.',
    map_alert_radius: 'ప్రభావిత పరిధి',
    map_affected: 'ప్రభావిత గ్రామాలు',
    map_advisory: 'ప్రాంతీయ నివారణ సలహా',
    audio_listen: 'వాయిస్ ద్వారా వినండి',
    audio_stop: 'ఆపండి',
    audio_playing: 'చెబుతోంది...',
    prevention_title: 'సమగ్ర సస్యరక్షణ (IPM) & ముందస్తు జాగ్రత్తలు',
    prevention_subtitle: 'విత్తన శుద్ధి, సరైన ఎరువుల యాజమాన్యం మరియు సేంద్రీయ పద్ధతుల ద్వారా పంట రక్షణ.'
  },
  hi: {
    app_name: 'क्रॉप शील्ड (CropShield)',
    tagline: 'एआई संचालित फसल रोग एवं कीट पूर्व पहचान एवं प्रबंधन प्रणाली',
    sub_tagline: 'किसानों के लिए त्वरित दृश्य निदान, सटीक कीटनाशक खुराक गणना, जैविक उपचार और सामुदायिक सुरक्षा।',
    nav_3d: '3D मोशन पौधा',
    nav_scanner: 'एआई फसल स्कैनर',
    nav_dosage: 'दवा खुराक कैलकुलेटर',
    nav_reviews: 'किसान समीक्षाएं',
    nav_weather: 'मौसम जोखिम पूर्वानुमान',
    nav_map: 'कीटनाशक दुकानें (GPS)',
    nav_prevention: 'रोकथाम उपाय',
    badge_3d: 'इंटरएक्टिव 3D मोशन',
    hero_title: 'पौधे के बाहरी स्वरूप से लेकर कोशिकाओं के भीतर बैक्टीरिया और पोषक तत्वों तक देखें',
    hero_desc: 'देखें कि कैसे रोग पैदा करने वाले बैक्टीरिया कोशिकाओं पर हमला करते हैं और पोषक तत्व पौधे को पोषण देते हैं। 3D नियंत्रणों से सूक्ष्मदर्शी स्तर तक ज़ूम करें।',
    view_macro: 'पूरे पौधे का दृश्य',
    view_leaf: 'पत्ती की सतह और रंध्र (स्टोमेटा)',
    view_micro: 'कोशिका स्तर (बैक्टीरिया एवं पोषक तत्व)',
    toggle_pathogens: 'हमलावर बैक्टीरिया / फफूंद दिखाएं',
    toggle_nutrients: 'प्रवाहित पोषक तत्व दिखाएं (NPK एवं क्लोरोफिल)',
    zoom_slider: '3D ज़ूम गहराई',
    reset_camera: 'कैमरा रीसेट करें',
    auto_rotate: 'ऑटो घूर्णन एवं हवा में लहराना',
    scanner_title: 'एआई फसल रोग एवं कीट स्कैनर',
    scanner_subtitle: 'प्रभावित पत्ती, तने या फल की तस्वीर लें या अपलोड करें। एआई तुरंत वैज्ञानिक पहचान करेगा।',
    drop_photo: 'फसल की फोटो यहां खींचें या कैमरे से लें',
    supports_formats: 'JPG, PNG, WEBP समर्थित (साफ नजदीकी फोटो सबसे अच्छी है)',
    or_try_sample: 'या इन नमूना फसल प्रकोपों को आज़माएं:',
    btn_scan: 'फसल लक्षणों का विश्लेषण करें',
    btn_retake: 'नई फोटो लें',
    scanning_status: 'पत्ती की कोशिकाओं का विश्लेषण और रोग डेटाबेस से मिलान जारी है...',
    diagnosis_result: 'एआई रोग निदान रिपोर्ट',
    detection_type: 'प्रकार',
    scientific_name: 'वैज्ञानिक नाम',
    confidence: 'सटीकता (विश्वास स्तर)',
    severity: 'गंभीरता का स्तर',
    affected_area: 'प्रभावित पत्ती क्षेत्र',
    observed_symptoms: 'पहचाने गए लक्षण एवं क्षति',
    why_disease_occurred: 'यह रोग / कीट प्रकोप होने के मुख्य कारण',
    causal_factors_title: 'प्रमुख कारण, मौसमी कारक एवं वाहक',
    btn_proceed_dosage: 'आवश्यक कीटनाशक खुराक की गणना करें',
    calc_title: 'कीटनाशक एवं जैविक उपचार खुराक कैलकुलेटर',
    calc_subtitle: 'आपके खेत के रकबे और स्प्रेयर टैंक की क्षमता के अनुसार सटीक वैज्ञानिक खुराक की गणना।',
    tab_chemical: 'वैज्ञानिक रासायनिक उपचार',
    tab_natural: '100% प्राकृतिक एवं जैविक उपाय',
    input_land_size: 'कुल खेत का क्षेत्रफल',
    input_unit: 'माप की इकाई',
    unit_acres: 'एकड़',
    unit_hectares: 'हेक्टेयर',
    unit_guntas: 'गुंठा / बीघा / बिस्वा',
    input_sprayer: 'स्प्रेयर उपकरण का प्रकार',
    sprayer_16l: '16 लीटर हैंड / नैपसैक स्प्रेयर',
    sprayer_20l: '20 लीटर बैटरी स्प्रेयर',
    sprayer_200l: '200 लीटर ट्रैक्टर चालित / बैरल स्प्रेयर',
    calc_summary: 'स्प्रे की सटीक मात्रा और निर्देश',
    chem_active: 'सक्रिय घटक (एक्टिव इंग्रीडिएंट)',
    chem_brands: 'प्रमुख बाजार ब्रांड',
    chem_required: 'कुल आवश्यक दवा',
    water_required: 'कुल आवश्यक पानी',
    tanks_required: 'स्प्रेयर टैंकों की संख्या',
    dose_per_tank: 'प्रति स्प्रेयर टैंक दवा की मात्रा',
    phi_label: 'प्रतीक्षा अवधि (कटाई से पूर्व सुरक्षित दिन)',
    toxicity_code: 'विषाक्तता का रंग संकेत',
    app_instructions: 'छिड़काव के निर्देश एवं सावधानियां',
    natural_prep: 'तैयारी की विधि एवं सामग्री',
    natural_benefits: 'पर्यावरण एवं मिट्टी को लाभ',
    natural_cost_save: 'अनुमानित लागत बचत',
    reviews_title: 'कीटनाशकों पर किसानों की वास्तविक समीक्षाएं',
    reviews_subtitle: 'विभिन्न क्षेत्रों के किसानों द्वारा साझा किए गए वास्तविक अनुभव, रेटिंग और सुधार के दिन।',
    btn_write_review: 'अपना अनुभव साझा करें',
    filter_all_crops: 'सभी फसलें',
    recovery_days: 'सुधार दिखने में लगे दिन',
    effectiveness_rating: 'उपचार का असर',
    verified_farmer: 'सत्यापित किसान',
    form_name: 'आपका नाम',
    form_village: 'गांव / तहसील',
    form_district: 'जिला एवं राज्य',
    form_crop: 'उगाई गई फसल',
    form_issue: 'फसल में आई बीमारी या कीट',
    form_remedy: 'इस्तेमाल की गई दवा या जैविक काढ़ा',
    form_rating: 'रेटिंग (1 से 5 स्टार)',
    form_effectiveness: 'असर का प्रतिशत (%)',
    form_days: 'कितने दिनों में सुधार हुआ',
    form_comment: 'विस्तृत अनुभव एवं राय',
    btn_submit_review: 'समीक्षा प्रकाशित करें',
    weather_title: 'मौसम आधारित फसल जोखिम पूर्वानुमान',
    weather_subtitle: 'तापमान और आर्द्रता के आधार पर फफूंद और कीट प्रकोप की पूर्व चेतावनी।',
    weather_temp: 'तापमान',
    weather_humidity: 'हवा में नमी (आर्द्रता)',
    weather_rain: 'बारिश की संभावना',
    weather_wind: 'हवा की गति',
    risk_index: 'रोग / कीट जोखिम सूचकांक',
    spray_suitability: 'छिड़काव की अनुकूलता स्थिति',
    weather_7day_title: '7 दिवसीय मौसम एवं फसल जोखिम पूर्वानुमान',
    weather_gps_btn: 'मेरे खेत की लोकेशन (GPS)',
    weather_gps_locating: 'जीपीएस उपग्रह सिग्नल खोज रहा है...',
    weather_gps_active: 'जीपीएस खेत स्थान सक्रिय',
    weather_gps_refresh: 'जीपीएस रीफ्रेश',
    weather_day_forecast: 'दैनिक रोग एवं छिड़काव दृष्टिकोण',
    weather_select_day: 'विस्तृत विवरण देखने के लिए किसी भी दिन पर क्लिक करें',
    map_title: 'तेलंगाना कीटनाशक एवं खाद दुकानें GPS मानचित्र',
    map_subtitle: 'तेलंगाना के सभी जिलों में अधिकृत कीटनाशक विक्रेता, जैविक केंद्र एवं किसान सेवा केंद्र खोजें।',
    map_alert_radius: 'खतरे का दायरा',
    map_affected: 'प्रभावित गांव',
    map_advisory: 'क्षेत्रीय सुरक्षा सलाह',
    audio_listen: 'आवाज़ में सुनें',
    audio_stop: 'रोकें',
    audio_playing: 'बोल रहा है...',
    prevention_title: 'एकीकृत कीट प्रबंधन (IPM) एवं बचाव',
    prevention_subtitle: 'बीज उपचार, फसल चक्र और जैविक उपायों द्वारा रासायनिक निर्भरता कम करें।'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  speak: (text: string, forceLang?: Language) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('cropshield_lang');
    return (saved === 'te' || saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const [dict, setDict] = useState<Record<Language, Record<string, string>>>(initialTranslations);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Fetch fresh translations if available
    api.getTranslations()
      .then((data) => {
        if (data && data.en && data.te && data.hi) {
          setDict(data);
        }
      })
      .catch(() => {
        // Fallback to embedded dictionary
      });

    return () => {
      stopSpeaking();
    };
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cropshield_lang', lang);
    stopSpeaking();
  };

  const t = (key: string): string => {
    if (dict[language] && dict[language][key]) {
      return dict[language][key];
    }
    if (initialTranslations[language] && initialTranslations[language][key]) {
      return initialTranslations[language][key];
    }
    if (initialTranslations.en[key]) {
      return initialTranslations.en[key];
    }
    return key;
  };

  // High-reliability audio fallback using backend streaming / Google Neural TTS
  const playAudioStream = (text: string, lang: Language) => {
    try {
      const url = api.getTtsAudioUrl(text, lang);
      const audio = new Audio(url);
      audioPlayerRef.current = audio;

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        audioPlayerRef.current = null;
      };
      audio.onerror = (e) => {
        console.warn('Audio streaming fallback error:', e);
        setIsSpeaking(false);
        audioPlayerRef.current = null;
      };

      audio.play().catch((err) => {
        console.warn('Playback error (e.g. autoplay restriction):', err);
        setIsSpeaking(false);
        audioPlayerRef.current = null;
      });
    } catch (err) {
      console.error('Audio stream setup failed:', err);
      setIsSpeaking(false);
    }
  };

  const speak = (text: string, forceLang?: Language) => {
    if (!text || !text.trim()) return;

    // Always cancel any ongoing audio / synthesis
    stopSpeaking();

    // Auto-detect Telugu or Hindi script if not explicitly forced
    const isTelugu = forceLang === 'te' || (forceLang === undefined && (/[\u0C00-\u0C7F]/.test(text) || language === 'te'));
    const isHindi = forceLang === 'hi' || (forceLang === undefined && !isTelugu && (/[\u0900-\u097F]/.test(text) || language === 'hi'));
    const targetLang: Language = isTelugu ? 'te' : isHindi ? 'hi' : 'en';

    // Check browser speech synthesis availability
    const hasSynth = typeof window !== 'undefined' && 'speechSynthesis' in window;
    const voices = hasSynth ? window.speechSynthesis.getVoices() : [];

    // For Telugu: specifically inspect if a genuine Telugu voice exists
    if (targetLang === 'te') {
      const teluguVoice = voices.find((v) => 
        v.lang === 'te-IN' || 
        v.lang.startsWith('te') || 
        v.name.toLowerCase().includes('telugu') || 
        v.name.includes('తెలుగు') ||
        v.name.includes('Mohan') ||
        v.name.includes('Shruti')
      );

      // If no native Telugu voice is installed on user's system, use our high-fidelity streaming API
      if (!teluguVoice) {
        playAudioStream(text, 'te');
        return;
      }

      // If native voice exists, try speech synthesis with fallback on error
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = teluguVoice;
      utterance.lang = 'te-IN';
      utterance.rate = 0.90;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        // Native synthesis failed, fallback to audio stream
        playAudioStream(text, 'te');
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // For Hindi
    if (targetLang === 'hi') {
      const hindiVoice = voices.find((v) => 
        v.lang === 'hi-IN' || 
        v.lang.startsWith('hi') || 
        v.name.toLowerCase().includes('hindi') || 
        v.name.includes('हिन्दी') ||
        v.name.includes('Kalpana') ||
        v.name.includes('Hemant')
      );

      if (!hindiVoice) {
        playAudioStream(text, 'hi');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = hindiVoice;
      utterance.lang = 'hi-IN';
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        playAudioStream(text, 'hi');
      };

      window.speechSynthesis.speak(utterance);
      return;
    }

    // For English
    if (hasSynth) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        playAudioStream(text, 'en');
      };

      window.speechSynthesis.speak(utterance);
    } else {
      playAudioStream(text, 'en');
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    if (audioPlayerRef.current) {
      try {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      } catch (_) {}
      audioPlayerRef.current = null;
    }
    setIsSpeaking(false);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speak, stopSpeaking, isSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
