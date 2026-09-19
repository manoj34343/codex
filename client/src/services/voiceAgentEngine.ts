// CropShield AI Voice Agent - Agricultural Dialogue & Knowledge Engine
// Supports English, Telugu (తెలుగు), and Hindi (हिन्दी)

export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface VoiceAgentResponse {
  speechText: string;
  displayText: string;
  language: SupportedLanguage;
  intent: string;
  action?: 'OPEN_SCANNER' | 'OPEN_DOSAGE' | 'OPEN_WEATHER' | 'OPEN_SHOPS' | 'OPEN_REVIEWS' | 'NONE';
  actionLabel?: string;
  suggestedPrompts?: string[];
}

// Detect language from text if possible
export function detectLanguageFromText(text: string, defaultLang: SupportedLanguage): SupportedLanguage {
  // Telugu Unicode range: 0C00 - 0C7F
  const teluguRegex = /[\u0C00-\u0C7F]/;
  // Devanagari (Hindi) Unicode range: 0900 - 097F
  const hindiRegex = /[\u0900-\u097F]/;

  if (teluguRegex.test(text)) {
    return 'te';
  }
  if (hindiRegex.test(text)) {
    return 'hi';
  }

  // Common Romanized Telugu words
  const teluguPhonetics = [
    'panta', 'pasupu', 'aakulu', 'aaku', 'mandulu', 'mothadu', 'tegulu', 
    'purugu', 'dookanam', 'varsham', 'tamata', 'mirapa', 'patti', 'vari', 
    'mokkajonna', 'cheraku', 'eruvulu', 'vepa', 'majiga', 'namaskaram',
    'em cheyali', 'ela', 'ekkada', 'enni', 'entha', 'raithu', 'rythu', 'shethram'
  ];
  const lower = text.toLowerCase();
  for (const word of teluguPhonetics) {
    if (lower.includes(word)) {
      return 'te';
    }
  }

  // Common Romanized Hindi words
  const hindiPhonetics = ['peeli', 'keede', 'kisan', 'dawa', 'khet', 'fasal', 'mausam', 'barish', 'namaste'];
  for (const hw of hindiPhonetics) {
    if (lower.includes(hw)) {
      return 'hi';
    }
  }

  // If user interface is currently set to Telugu, prioritize Telugu response
  if (defaultLang === 'te') {
    return 'te';
  }

  return defaultLang;
}

export interface LastScanContext {
  cropName?: string;
  cropName_te?: string;
  cropName_hi?: string;
  conditionName?: string;
  conditionName_te?: string;
  conditionName_hi?: string;
  healthStatus?: string;
  isHealthy?: boolean;
  confidence?: number;
  severity?: string;
  remedy?: string;
  diseaseName?: string;
  pestName?: string;
}

// Process farmer spoken text and return intelligent agricultural response
export function processFarmerVoiceQuery(
  rawQuery: string,
  currentLanguage: SupportedLanguage,
  lastScanData?: LastScanContext
): VoiceAgentResponse {
  const query = rawQuery.trim();
  const queryLower = query.toLowerCase();
  const detectedLang = detectLanguageFromText(query, currentLanguage);

  // =========================================================================
  // 1. PESTICIDE DOSAGE & CALCULATION INQUIRIES
  // =========================================================================
  if (
    query.includes('మోతాదు') ||
    query.includes('పురుగుమందు') ||
    query.includes('పురుగు మందు') ||
    query.includes('మందులు') ||
    query.includes('ఎంత కలపాలి') ||
    query.includes('ఎకరాకు ఎంత') ||
    query.includes('ట్యాంకుకు ఎంత') ||
    query.includes('కాలిక్యులేటర్') ||
    queryLower.includes('mothadu') ||
    queryLower.includes('mandulu') ||
    queryLower.includes('dosage') ||
    queryLower.includes('how much chemical') ||
    queryLower.includes('how much pesticide') ||
    queryLower.includes('pesticide dose') ||
    queryLower.includes('pesticide quantity') ||
    (queryLower.includes('pesticide') && (queryLower.includes('spray') || queryLower.includes('how much') || queryLower.includes('mix') || queryLower.includes('rate'))) ||
    queryLower.includes('mix per tank') ||
    query.includes('मात्रा') ||
    query.includes('खुराक') ||
    query.includes('कितनी दवा')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'DOSAGE_INQUIRY',
        speechText:
          'పురుగుమందు సరైన మోతాదు పంట మరియు స్ప్రేయర్ రకంపై ఆధారపడి ఉంటుంది. ఉదాహరణకు 16 లీటర్ల చేతి పంపుకు 30 నుండి 40 మిల్లీలీటర్ల మందు లేదా 40 గ్రాముల పొడి మందు అవసరం. ఎకరాకు 200 లీటర్ల నీటిని వాడాలి. మీ పంట విస్తీర్ణం మరియు స్ప్రేయర్ ప్రకారం ఖచ్చితమైన మోతాదు లెక్కించడానికి మా మోతాదు కాలిక్యులేటర్‌ను ఉపయోగించండి.',
        displayText:
          'శాస్త్రీయ పురుగుమందు మోతాదు మార్గదర్శకాలు:\n• 16 లీటర్ల చేతి స్ప్రేయర్: 30-40 ml ద్రవ మందు లేదా 35-40 గ్రాముల పొడి మందు.\n• ఎకరాకు నీటి పరిమాణం: 8 నుండి 10 స్ప్రేయర్ ట్యాంకులు (150-200 లీటర్ల నీరు).\n• 200 లీటర్ల ట్రాక్టర్ బ్యారెల్: 400-500 ml రసాయనం.\n• గమనిక: మందులలో ఎల్లప్పుడూ స్టిక్కర్ (జిగురు) కలపండి. వర్షం వచ్చే సూచన ఉంటే పిచికారీ చేయకండి.\n• మీ ఖచ్చితమైన మోతాదు కోసం క్రింది బటన్ నొక్కండి.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'మోతాదు కాలిక్యులేటర్ తెరవండి (Open Dosage Calculator)',
        suggestedPrompts: ['సేంద్రీయ వేప నూనె మోతాదు ఎంత?', 'ఈరోజు స్ప్రే చేయడానికి అనుకూల సమయం?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'DOSAGE_INQUIRY',
        speechText:
          'कीटनाशक की सही मात्रा फसल और स्प्रेयर की क्षमता पर निर्भर करती है। 16 लीटर के नैपसैक पंप में 35 से 40 मिलीलीटर दवा मिलानी चाहिए। प्रति एकड़ 150 से 200 लीटर पानी का उपयोग करें। सटीक मात्रा की गणना के लिए हमारे डोज कैलकुलेटर का उपयोग करें।',
        displayText:
          'कीटनाशक मात्रा एवं छिड़काव दिशा-निर्देश:\n• 16 लीटर हैंड स्प्रेयर: 30-40 ml तरल दवा अथवा 40 ग्राम घुलनशील पाउडर।\n• प्रति एकड़ पानी: 150-200 लीटर (8-10 टंकी प्रति एकड़)।\n• 200 लीटर ट्रैक्टर बैरल: 400-500 ml दवा।\n• सटीक एकड़ के अनुसार गणना के लिए नीचे दिए गए बटन पर टैप करें।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'मात्रा कैलकुलेटर खोलें (Open Dosage Calculator)',
        suggestedPrompts: ['जैविक नीम तेल की मात्रा?', 'क्या आज छिड़काव सुरक्षित है?', 'पास की खाद दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'DOSAGE_INQUIRY',
      speechText:
        'Pesticide dosage depends on your crop type and sprayer capacity. A standard 16-liter knapsack sprayer requires 30 to 40 ml of active chemical. Use 150 to 200 liters of water per acre. Use our dosage calculator below to compute the exact formulation for your field.',
      displayText:
        'Scientific Pesticide Dosage Guidelines:\n• 16L Hand Sprayer: 30-40 ml liquid or 35-40g soluble powder.\n• Water Volume per Acre: 8 to 10 tanks (150-200 Litres).\n• 200L Tractor Sprayer: 400-500 ml active ingredient.\n• Always mix an agricultural wetting agent (sticker) for prolonged foliar adhesion.\n• Tap below to calculate exact acre quantities.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Open Dosage Calculator',
      suggestedPrompts: ['What organic remedies work?', 'Can I spray pesticide today?', 'Find nearby shops']
    };
  }

  // =========================================================================
  // 2. TOMATO CROP INQUIRIES
  // =========================================================================
  if (
    query.includes('టమాటా') ||
    query.includes('టమోటా') ||
    queryLower.includes('tomato') ||
    queryLower.includes('tamata') ||
    query.includes('टमाटर')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'CROP_TOMATO',
        speechText:
          'టమాటా పంటలో ఎర్లీ బ్లైట్ ఆకుమచ్చ తెగులు, లేట్ బ్లైట్ మరియు ఆకుముడత ప్రధాన సమస్యలు. ఎర్లీ బ్లైట్ నివారణకు లీటరు నీటికి రెండున్నర గ్రాముల మాంకోజెబ్ లేదా రిడోమిల్ గోల్డ్ రెండు గ్రాములు పిచికారీ చేయండి. తెగులు సోకిన కింద ఆకులను తొలగించండి. ఖచ్చితమైన నిర్ధారణకు ఆకు ఫోటోను స్కాన్ చేయండి.',
        displayText:
          'టమాటా పంట రక్షణ & నివారణ సూచనలు:\n1. ఎర్లీ బ్లైట్ (Early Blight): ఆకులపై నల్లటి వలయాల మచ్చలు. నివారణకు మాంకోజెబ్ (Mancozeb 75% WP) 2.5 గ్రా/లీటరు లేదా రిడోమిల్ గోల్డ్ 2 గ్రా/లీటరు పిచికారీ చేయండి.\n2. లేట్ బ్లైట్ (Late Blight): ఆకుల చివర్లలో తడి మచ్చలు. కాపర్ ఆక్సిక్లోరైడ్ 3 గ్రా/లీటరు పిచికారీ చేయాలి.\n3. ఆకుముడత వైరస్ (Leaf Curl): తెల్లదోమ వ్యాప్తి చేస్తుంది. డైమిథోయేట్ 2ml/లీటరు లేదా వేప నూనె పిచికారీ చేయండి.',
        action: 'OPEN_SCANNER',
        actionLabel: 'టమాటా ఆకును స్కాన్ చేయండి (Scan Tomato Leaf)',
        suggestedPrompts: ['టమాటాకు ఎంత మందు మోతాదు?', 'సేంద్రీయ వేప నూనె ఎలా వాడాలి?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'CROP_TOMATO',
        speechText:
          'टमाटर में अगेती झुलसा (अर्ली ब्लाइट) और पत्ती मुड़न (लीफ कर्ल) प्रमुख रोग हैं। रोकथाम के लिए मैंकोजेब 2.5 ग्राम प्रति लीटर या रिडोमिल गोल्ड 2 ग्राम प्रति लीटर का छिड़काव करें। सटीक जांच के लिए पत्ती की फोटो लें।',
        displayText:
          'टमाटर फसल सुरक्षा:\n• अगेती झुलसा (Early Blight): गोल छल्लेदार काले धब्बे। मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर छिड़कें।\n• लीफ कर्ल: सफेद मक्खी नियंत्रण के लिए नीम तेल 10,000 ppm @ 2ml/लीटर छिड़कें।',
        action: 'OPEN_SCANNER',
        actionLabel: 'टमाटर पत्ती स्कैन करें (Scan Tomato Leaf)',
        suggestedPrompts: ['टमाटर की दवा की मात्रा?', 'जैविक उपाय क्या है?', 'पास की दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'CROP_TOMATO',
      speechText:
        'Common tomato conditions include Early Blight, Late Blight, and Leaf Curl Virus. For Early Blight concentric rings, spray Mancozeb 75% WP at 2.5 grams per litre or Ridomil Gold at 2 grams per litre. Remove infected lower leaves.',
      displayText:
        'Tomato Disease Management:\n• Early Blight (Alternaria solani): Target-board lesions. Apply Mancozeb @ 2.5g/L or Azoxystrobin @ 1ml/L.\n• Late Blight (Phytophthora infestans): Water-soaked lesions. Spray Copper Oxychloride @ 3g/L.\n• Leaf Curl Virus: Vector controlled by Whiteflies; apply Neem Oil @ 2ml/L.',
      action: 'OPEN_SCANNER',
      actionLabel: 'Scan Tomato Leaf',
      suggestedPrompts: ['What dosage should I use?', 'Safe spray window today?', 'Nearby agro-dealers']
    };
  }

  // =========================================================================
  // 3. COTTON CROP & BOLLWORM INQUIRIES
  // =========================================================================
  if (
    query.includes('పత్తి') ||
    queryLower.includes('cotton') ||
    queryLower.includes('patti') ||
    queryLower.includes('bollworm') ||
    query.includes('कपास') ||
    query.includes('गुलाबी सुंडी')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'CROP_COTTON',
        speechText:
          'పత్తిలో గులాబీ రంగు పురుగు నివారణకు ఎకరాకు 8 లింగాకర్షక బుట్టలు అమర్చండి. పూత దశలో వేప నూనె పదివేల పీపీఎం 500 మిల్లీలీటర్లు మరియు పురుగు ఉధృతి ఉంటే కోరాజెన్ 60 మిల్లీలీటర్లు లేదా ప్రొఫెనోఫాస్ 400 మిల్లీలీటర్లు ఎకరాకు పిచికారీ చేయండి.',
        displayText:
          'పత్తి పంట రక్షణ ప్రణాళిక:\n1. గులాబీ రంగు పురుగు (Pink Bollworm): ఎకరాకు 8 ఫెరమోన్ బుట్టలు పెట్టండి. పూత దశలో క్లోరాంట్రానిలిప్రోల్ (Coragen) 60ml/ఎకరా లేదా ప్రొఫెనోఫాస్ 400ml/ఎకరా పిచికారీ చేయండి.\n2. రసం పీల్చే పురుగులు (తెల్లదోమ/తామర): వేప నూనె 2ml/లీటరు లేదా థయామిథోక్సామ్ 0.3 గ్రా/లీటరు.\n3. ఎకరా మోతాదు వివరాల కోసం కాలిక్యులేటర్‌ను చూడండి.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'పత్తి మందుల మోతాదు చూడండి (Cotton Dosage)',
        suggestedPrompts: ['పత్తిలో ఆకులు పసుపుగా మారుతున్నాయి?', 'ఈరోజు పిచికారీ చేయవచ్చా?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'CROP_COTTON',
        speechText:
          'कपास में गुलाबी सुंडी के नियंत्रण के लिए प्रति एकड़ 8 फेरोमोन ट्रैप लगाएं। फूल आने पर नीम तेल 500 मिलीलीटर और प्रकोप होने पर कोराजन 60 मिलीलीटर प्रति एकड़ छिड़कें।',
        displayText:
          'कपास सुरक्षा उपाय:\n• गुलाबी सुंडी: 8 फेरोमोन ट्रैप प्रति एकड़ + कोराजन (Coragen) 60ml प्रति एकड़।\n• रस चूसक कीट: नीम तेल 10,000 ppm @ 2ml/लीटर।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'कपास दवा मात्रा देखें (Cotton Dosage)',
        suggestedPrompts: ['छिड़काव का सही समय?', 'जैविक उपाय?', 'खाद दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'CROP_COTTON',
      speechText:
        'For Pink Bollworm in Cotton, install 8 pheromone traps per acre. Apply Chlorantraniliprole (Coragen) at 60 ml per acre or Profenofos at 400 ml per acre. Spray Neem Oil 10,000 ppm during flowering.',
      displayText:
        'Cotton Pest Protection:\n• Pink Bollworm: 8 pheromone monitoring traps/acre + Coragen 18.5% SC @ 60ml/acre.\n• Sucking Pests (Whitefly/Thrips): Spray Neem Oil @ 2ml/L or Flonicamid @ 60g/acre.\n• Review precise dosage calculator below.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Calculate Cotton Dosage',
      suggestedPrompts: ['Calculate pesticide quantity', 'Weather forecast today', 'Nearby shops map']
    };
  }

  // =========================================================================
  // 4. RICE / PADDY CROP & BLAST / SHEATH ROT
  // =========================================================================
  if (
    query.includes('వరి') ||
    queryLower.includes('rice') ||
    queryLower.includes('paddy') ||
    queryLower.includes('vari') ||
    queryLower.includes('blast') ||
    query.includes('धान') ||
    query.includes('ब्लास्ट')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'CROP_RICE',
        speechText:
          'వరి పంటలో అగ్గితెగులు మరియు పొడ తెగులు ప్రధాన నష్టం కలిగిస్తాయి. అగ్గితెగులు కంటి ఆకారపు మచ్చలుగా కనిపిస్తుంది. నివారణకు ట్రైసైక్లాజోల్ 75 శాతం డబ్ల్యూపీ ఎకరాకు 140 గ్రాములు లేదా ఐసోప్రోథియోలేన్ 300 మిల్లీలీటర్లు పిచికారీ చేయండి. పొడ తెగులుకు హెక్సాకోనాజోల్ 400 మిల్లీలీటర్లు వాడండి.',
        displayText:
          'వరి పంట తెగుళ్ల సమగ్ర నివారణ:\n1. అగ్గితెగులు (Rice Blast): కంటి ఆకారపు మచ్చలు. ట్రైసైక్లాజోల్ (Beam 75% WP) ఎకరాకు 140 గ్రాములు లేదా కాసుగామైసిన్ 400 ml పిచికారీ చేయండి.\n2. పొడ తెగులు (Sheath Blight): ఆకు తొడుగులపై పాము చారల మచ్చలు. హెక్సాకోనాజోల్ 5% SC @ 400 ml/ఎకరా.\n3. సుడి దోమ (BPH): పైమెట్రోజైన్ 120 గ్రాములు/ఎకరా. నత్రజని అధిక వాడకాన్ని తగ్గించండి.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'వరి మందుల మోతాదు చూడండి (Rice Dosage)',
        suggestedPrompts: ['వరిలో ఎరువుల మోతాదు ఎంత?', 'ఈరోజు పిచికారీ చేయవచ్చా?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'CROP_RICE',
        speechText:
          'धान में झोंका रोग (ब्लास्ट) और शीथ ब्लाइट मुख्य समस्याएं हैं। ब्लास्ट के लिए ट्राइसाइक्लाजोल 140 ग्राम प्रति एकड़ का छिड़काव करें। शीथ ब्लाइट के लिए हेक्साकोनाजोल 400 मिलीलीटर प्रति एकड़ डालें। यूरिया का अधिक उपयोग रोकें।',
        displayText:
          'धान रोग नियंत्रण:\n• ब्लास्ट (झोंका रोग): ट्राइसाइक्लाजोल 75% WP @ 140 ग्राम/एकड़।\n• शीथ ब्लाइट: हेक्साकोनाजोल 5% SC @ 400 ml/एकड़।\n• दवा की सटीक मात्रा नीचे कैलकुलेटर में देखें।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'धान दवा मात्रा देखें (Rice Dosage)',
        suggestedPrompts: ['छिड़काव का सही समय?', 'जैविक उपाय?', 'खाद दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'CROP_RICE',
      speechText:
        'In Paddy, Rice Blast and Sheath Blight are critical threats. For Blast eye-shaped lesions, spray Tricyclazole 75% WP at 140 grams per acre. For Sheath Blight, spray Hexaconazole at 400 ml per acre. Avoid excess nitrogen topdressing.',
      displayText:
        'Paddy Disease Management:\n• Rice Blast (Magnaporthe oryzae): Tricyclazole 75% WP @ 140g/acre or Isoprothiolane @ 300ml/acre.\n• Sheath Blight (Rhizoctonia solani): Hexaconazole 5% SC @ 400ml/acre.\n• Brown Planthopper (BPH): Pymetrozine 50% WDG @ 120g/acre.\n• View dosage calculator below.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Calculate Rice Dosage',
      suggestedPrompts: ['Check spraying window', 'Organic solutions', 'Dealer map']
    };
  }

  // =========================================================================
  // 5. CHILLI CROP & BLACK THRIPS / LEAF CURL
  // =========================================================================
  if (
    query.includes('మిరప') ||
    queryLower.includes('chilli') ||
    queryLower.includes('mirapa') ||
    queryLower.includes('thrips') ||
    query.includes('తామర') ||
    query.includes('ముడత') ||
    query.includes('मिर्च') ||
    query.includes('थ्रिप्स')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'CROP_CHILLI',
        speechText:
          'మిరప పంటలో నల్ల తామర పురుగు మరియు ఆకుముడత తీవ్ర నష్టం కలిగిస్తాయి. నివారణకు ఎకరాకు 30 నీలిరంగు మరియు పసుపు జిగురు అట్టలు పెట్టండి. పూత దశలో స్పైనెటోరమ్ 180 మిల్లీలీటర్లు లేదా పెగాసస్ 250 గ్రాములు ఎకరాకు పిచికారీ చేయాలి. వేప నూనెను క్రమం తప్పకుండా పిచికారీ చేయండి.',
        displayText:
          'మిరప పంట సమగ్ర రక్షణ పద్ధతులు:\n1. నల్ల తామర పురుగు (Black Thrips): ఎకరాకు 30 నీలిరంగు జిగురు అట్టలు పెట్టండి. స్పైనెటోరమ్ (Delegate 11.7% SC) 180 ml/ఎకరా లేదా డైఫెంథియురాన్ (Pegasus) 250 గ్రా/ఎకరా పిచికారీ చేయండి.\n2. ఆకు ముడత వైరస్ (Gemini Virus): తెల్లదోమల నివారణకు ఎసిటామిప్రిడ్ 0.5 గ్రా/లీటరు.\n3. కాయకుళ్లు తెగులు (Anthracnose): అజోక్సిస్ట్రోబిన్ + డైఫెనోకోనజోల్ (Amistar Top) 1 ml/లీటరు.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'మిరప మందుల మోతాదు చూడండి (Chilli Dosage)',
        suggestedPrompts: ['మిరపలో పుల్లటి మజ్జిగ వాడొచ్చా?', 'ఈరోజు పిచికారీ చేయవచ్చా?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'CROP_CHILLI',
        speechText:
          'मिर्च में काले थ्रिप्स और पत्ती मुड़न रोग के लिए प्रति एकड़ 30 नीले चिपचिपे कार्ड लगाएं। स्पाइनेटोरम 180 मिलीलीटर या पेगासस 250 ग्राम प्रति एकड़ का छिड़काव करें। नीम तेल का छिड़काव जारी रखें।',
        displayText:
          'मिर्च सुरक्षा उपाय:\n• काले थ्रिप्स: 30 नीले चिपचिपे कार्ड प्रति एकड़ + स्पाइनेटोरम (Delegate) 180 ml/एकड़।\n• पत्ती मुड़न: एसिटामिप्रिड 0.5 ग्राम/लीटर।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'मिर्च दवा मात्रा देखें (Chilli Dosage)',
        suggestedPrompts: ['छिड़काव का सही समय?', 'जैविक उपचार?', 'खाद दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'CROP_CHILLI',
      speechText:
        'For invasive Black Thrips and Leaf Curl in Chilli, install 30 blue and yellow sticky cards per acre. Spray Spinetoram (Delegate) at 180 ml per acre or Diafenthiuron (Pegasus) at 250 grams per acre. Maintain regular neem sprays.',
      displayText:
        'Chilli Protection Protocol:\n• Black Thrips (Thrips parvispinus): 30 blue sticky traps/acre + Spinetoram 11.7% SC @ 180ml/acre.\n• Gemini Leaf Curl: Manage whitefly vectors using Flonicamid @ 60g/acre.\n• Anthracnose Fruit Rot: Amistar Top @ 1ml/L.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Calculate Chilli Dosage',
      suggestedPrompts: ['Check pesticide dosage', 'Weather conditions today', 'Pesticide shops map']
    };
  }

  // =========================================================================
  // 6. FERTILIZERS & NUTRIENTS INQUIRIES
  // =========================================================================
  if (
    query.includes('ఎరువులు') ||
    query.includes('యూరియా') ||
    query.includes('డిఎపి') ||
    query.includes('పొటాష్') ||
    query.includes('సూక్ష్మ పోషకాలు') ||
    query.includes('జింక్') ||
    query.includes('నత్రజని') ||
    queryLower.includes('fertilizer') ||
    queryLower.includes('urea') ||
    queryLower.includes('eruvulu') ||
    query.includes('उर्वरक') ||
    query.includes('खाद') ||
    query.includes('यूरिया')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'FERTILIZER_INQUIRY',
        speechText:
          'పంటలకు సమతుల్య ఎరువుల యాజమాన్యం ఎంతో ముఖ్యం. అధిక యూరియా వాడటం వల్ల రసం పీల్చే పురుగులు మరియు ఫంగస్ తెగుళ్లు ఎక్కువవుతాయి. నాటే సమయంలో డీఏపీ, పొటాష్ మరియు జింక్ సల్ఫేట్ ఎకరాకు 10 కిలోలు వేయాలి. పంట ఎదుగుదల కోసం 19:19:19 ఎకరాకు ఒక కిలో నీటిలో కలిపి పిచికారీ చేయండి.',
        displayText:
          'శాస్త్రీయ ఎరువుల యాజమాన్యం:\n1. ప్రాథమిక ఎరువులు: నాటే సమయంలో DAP (50 కిలోలు) + MOP పొటాష్ (25 కిలోలు) ఎకరాకు వేయాలి.\n2. యూరియా నియంత్రణ: యూరియాను 3 దఫాలుగా వేయాలి. అధిక యూరియా వాడకం పురుగుల దాడిని పెంచుతుంది.\n3. సూక్ష్మ పోషకాలు: జింక్ సల్ఫేట్ 10 kg/ఎకరా. పైపాటుగా ఫార్ములా-4 లేదా 19:19:19 (5 గ్రా/లీటరు) పిచికారీ చేయండి.\n4. సేంద్రీయ ఎరువులు: ఎకరాకు 2 టన్నుల పశువుల ఎరువు లేదా వర్మీ కంపోస్ట్ తప్పనిసరి.',
        action: 'OPEN_WEATHER',
        actionLabel: 'వాతావరణం & ఎరువుల సమయం చూడండి (View Weather)',
        suggestedPrompts: ['సేంద్రీయ ఎరువులు ఎలా వాడాలి?', 'పురుగుమందుల మోతాదు ఎంత?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'FERTILIZER_INQUIRY',
        speechText:
          'फसलों में संतुलित उर्वरक प्रबंधन करें। यूरिया का अत्यधिक उपयोग कीटों और रोगों को आमंत्रित करता है। बुवाई के समय डीएपी, पोटाश और 10 किलो जिंक सल्फेट प्रति एकड़ डालें। 19:19:19 का 5 ग्राम प्रति लीटर छिड़काव करें।',
        displayText:
          'संतुलित खाद एवं उर्वरक प्रबंधन:\n• बुवाई समय: DAP 50 किग्रा + पोटाश 25 किग्रा प्रति एकड़।\n• जिंक सल्फेट: 10 किग्रा प्रति एकड़।\n• 19:19:19 घुलनशील खाद @ 5 ग्राम/लीटर पानी में छिड़कें।',
        action: 'OPEN_WEATHER',
        actionLabel: 'मौसम अनुकूलता देखें (View Weather)',
        suggestedPrompts: ['कीटनाशक की मात्रा?', 'जैविक खाद उपाय?', 'खाद दुकान खोजें']
      };
    }

    return {
      language: 'en',
      intent: 'FERTILIZER_INQUIRY',
      speechText:
        'Balanced fertilizer management is essential. Excess urea accelerates vegetative growth and invites sucking pests. Apply DAP and MOP Potash at basal planting with 10 kg Zinc Sulphate per acre. Foliar spray 19:19:19 at 5 grams per litre for rapid vigor.',
      displayText:
        'Balanced Plant Nutrition Guide:\n• Basal Application: DAP 50kg + MOP Potash 25kg + Zinc Sulphate 10kg per acre.\n• Split Urea Topdressing: Avoid heavy single doses.\n• Foliar Recovery: Spray water-soluble 19:19:19 @ 5g/L.\n• Organic Soil Conditioning: Incorporate 2 tons FYM or vermicompost.',
      action: 'OPEN_WEATHER',
      actionLabel: 'Check Weather & Spray Windows',
      suggestedPrompts: ['Calculate pesticide dosage', 'Organic remedies', 'Nearby fertilizer dealers']
    };
  }

  // =========================================================================
  // 7. YELLOW LEAVES / CHLOROSIS INQUIRIES
  // =========================================================================
  if (
    queryLower.includes('yellow') ||
    queryLower.includes('chlorosis') ||
    queryLower.includes('pasupu') ||
    query.includes('పసుపు') ||
    query.includes('ఆకులు పసుపు') ||
    query.includes('పీలీ') ||
    query.includes('पीली') ||
    query.includes('पीला')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'YELLOW_LEAVES',
        speechText:
          'ఆకులు పసుపు రంగులోకి మారడం నత్రజని లేదా ఐరన్ లోపం వల్ల లేదా తెల్లదోమ, తామర పురుగుల దాడి వల్ల జరుగుతుంది. ఆకులు పైకి ముడుచుకుంటే వేప నూనె పదివేల పీపీఎం ఎకరాకు 500 మిల్లీలీటర్లు పిచికారీ చేయండి. సమతుల్య సూక్ష్మ పోషకాలు అందించండి. ఖచ్చితమైన నిర్ధారణ కోసం మా AI క్రాప్ స్కానర్ ద్వారా ఆకు ఫోటో తీయండి.',
        displayText:
          'ఆకులు పసుపు రంగులోకి మారడానికి ప్రధాన కారణాలు:\n1. నత్రజని లేదా ఐరన్ లోపం: యూరియా లేదా సూక్ష్మ పోషకాలు (Fe EDTA) అందించండి.\n2. తామర పురుగు / తెల్లదోమ: ఆకులు పైకి ముడుచుకుంటే వేప నూనె (10,000 ppm) 2ml/లీటరు లేదా థయామిథోక్సామ్ 0.3 గ్రా/లీటరు పిచికారీ చేయండి.\n3. ఎర్లీ బ్లైట్ ఫంగస్: పసుపు వలయంలో నల్లటి మచ్చలు ఉంటే మాంకోజెబ్ 2 గ్రా/లీటరు పిచికారీ చేయండి.\n\nఖచ్చితమైన నిర్ధారణ కోసం మీ ఆకు ఫోటోను స్కానర్‌లో అప్‌లోడ్ చేయండి.',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI స్కానర్ తెరవండి (Open Scanner)',
        suggestedPrompts: [
          'ఈ తెగులుకు మందుల మోతాదు ఎంత?',
          'ఈరోజు మందు పిచికారీ చేయవచ్చా?',
          'సేంద్రీయ నివారణ ఏమిటి?'
        ]
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'YELLOW_LEAVES',
        speechText:
          'पत्तियों का पीला पड़ना नाइट्रोजन की कमी या फफूंद रोग का लक्षण है। यदि पत्तियां ऊपर मुड़ रही हैं, तो यह थ्रिप्स या सफेद मक्खी का प्रकोप हो सकता है। रोकथाम के लिए 5 प्रतिशत नीम का तेल या संतुलित सूक्ष्म पोषक तत्वों का छिड़काव करें। सटीक जांच के लिए AI स्कैनर से फोटो लें।',
        displayText:
          'पत्तियों के पीले होने के मुख्य कारण एवं समाधान:\n1. पोषक तत्वों की कमी: नाइट्रोजन या फेरस सल्फेट की कमी से पत्तियां पीली होती हैं।\n2. रस चूसक कीट: नीम का तेल (10,000 ppm) 2ml/लीटर छिड़कें।\n3. अगेती झुलसा: मैंकोजेब 2 ग्राम/लीटर का छिड़काव करें।',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI स्कैनर खोलें (Open Scanner)',
        suggestedPrompts: [
          'कीटनाशक की सही मात्रा कितनी है?',
          'क्या आज छिड़काव करना सुरक्षित है?',
          'प्राकृतिक जैविक उपाय क्या हैं?'
        ]
      };
    }

    return {
      language: 'en',
      intent: 'YELLOW_LEAVES',
      speechText:
        'Yellowing of leaves, known as chlorosis, is commonly caused by nitrogen or iron deficiency, or early fungal infection. If leaves are also curling upward, sucking pests like Thrips or Whiteflies are feeding. For natural protection, spray 10,000 ppm Neem Oil at 2 ml per litre. For exact diagnosis, please take a picture using our AI Crop Scanner.',
      displayText:
        'Key Causes of Yellowing Foliage (Chlorosis):\n1. Nutrient Deficiency (Nitrogen/Iron): Apply balanced foliar micronutrients or urea spray.\n2. Sucking Pests (Thrips / Whiteflies): If leaves boat upward, spray 10,000 ppm Neem Oil (2ml/L).\n3. Early Blight Fungal Spots: Apply Mancozeb 75% WP @ 2.5g/L.\n\nTake a leaf photo with our AI Scanner for instant visual diagnosis.',
      action: 'OPEN_SCANNER',
      actionLabel: 'Open AI Crop Scanner',
      suggestedPrompts: [
        'What dosage should I use?',
        'Can I spray pesticide today?',
        'What natural remedies work?'
      ]
    };
  }

  // =========================================================================
  // 8. "WHAT IS WRONG WITH THIS CROP?" / SCANNER INTEGRATION
  // =========================================================================
  if (
    queryLower.includes('wrong with this') ||
    queryLower.includes('wrong with my') ||
    queryLower.includes('analyze') ||
    queryLower.includes('what is this disease') ||
    queryLower.includes('identify this') ||
    queryLower.includes('scan my crop') ||
    queryLower.includes('is my plant healthy') ||
    queryLower.includes('is it healthy') ||
    query.includes('ఏమైంది') ||
    query.includes('ఈ పంటకు') ||
    query.includes('పరీక్షించండి') ||
    query.includes('వ్యాధి ఏమిటి') ||
    query.includes('తెగులు ఏమిటి') ||
    query.includes('ఆరోగ్యంగా ఉందా') ||
    query.includes('क्या खराबी') ||
    query.includes('क्या हुआ है') ||
    query.includes('रोग पहचानें') ||
    query.includes('जांच करें') ||
    query.includes('क्या यह स्वस्थ है')
  ) {
    if (lastScanData && lastScanData.cropName) {
      const isCropHealthy = lastScanData.isHealthy || lastScanData.healthStatus === 'healthy' || (lastScanData.conditionName && lastScanData.conditionName.toLowerCase().includes('healthy'));

      if (isCropHealthy) {
        if (detectedLang === 'te') {
          return {
            language: 'te',
            intent: 'SCAN_RESULT_HEALTHY',
            speechText: `మీరు ఇటీవల స్కాన్ చేసిన ${lastScanData.cropName_te || lastScanData.cropName} పంట పూర్తి ఆరోగ్యంగా ఉంది. ఎలాంటి తెగులు లేదా పురుగు దాడి కనిపించలేదు. మీ పంట పచ్చగా, ఏపుగా ఎదుగుతోంది. క్రమం తప్పకుండా నీటి యాజమాన్యం మరియు క్షేత్ర పర్యవేక్షణ కొనసాగించండి.`,
            displayText: `ఇటీవలి AI స్కానింగ్ ఫలితం:\n• పంట: ${lastScanData.cropName_te || lastScanData.cropName}\n• ఆరోగ్య స్థితి: సంపూర్ణ ఆరోగ్యం (HEALTHY - తెగులు లేదు)\n• పురుగులు: ఏవీ లేవు (None detected)\n• సిఫార్సు: క్రమం తప్పకుండా క్షేత్ర పరిశీలన చేయండి. అధిక నత్రజని వాడకండి.`,
            action: 'OPEN_SCANNER',
            actionLabel: 'పంట స్కానర్ చూడండి (View Scanner)',
            suggestedPrompts: ['పంట సంరక్షణ సూచనలు?', 'ఈరోజు పిచికారీ చేయవచ్చా?', 'ఎరువుల సమతుల్యత ఏమిటి?']
          };
        }
        if (detectedLang === 'hi') {
          return {
            language: 'hi',
            intent: 'SCAN_RESULT_HEALTHY',
            speechText: `आपकी हालिया स्कैन की गई ${lastScanData.cropName_hi || lastScanData.cropName} फसल पूरी तरह स्वस्थ है। किसी बीमारी या कीट के लक्षण नहीं मिले हैं। पत्तियां हरी-भरी हैं। संतुलित खाद और सिंचाई जारी रखें।`,
            displayText: `हालिया AI स्कैन परिणाम:\n• फसल: ${lastScanData.cropName_hi || lastScanData.cropName}\n• स्वास्थ्य स्थिति: पूर्णतः स्वस्थ (HEALTHY - रोग मुक्त)\n• कीट: कोई नहीं मिला (None detected)\n• सलाह: समय पर सिंचाई और संतुलित एनपीके (NPK) खाद दें।`,
            action: 'OPEN_SCANNER',
            actionLabel: 'क्रॉप स्कैनर देखें (View Scanner)',
            suggestedPrompts: ['देखभाल के उपाय?', 'छिड़काव का मौसम?', 'संतुलित खाद क्या दें?']
          };
        }
        return {
          language: 'en',
          intent: 'SCAN_RESULT_HEALTHY',
          speechText: `Your latest scan of ${lastScanData.cropName} indicates optimal botanical health. No active disease or pest infestation was detected. The leaf foliage shows healthy chlorophyll. Continue routine monitoring and balanced watering.`,
          displayText: `Recent AI Scan Diagnostic:\n• Crop: ${lastScanData.cropName}\n• Health Status: HEALTHY (No Disease Detected)\n• Pests: None detected\n• Recommendation: Continue routine field scouting and balanced NPK nutrition.`,
          action: 'OPEN_SCANNER',
          actionLabel: 'View Crop Scanner',
          suggestedPrompts: ['What are good prevention tips?', 'Is it safe to spray today?', 'Balanced fertilizer guide']
        };
      }

      if (lastScanData.healthStatus === 'pest_suspected') {
        const pestName = detectedLang === 'te' ? (lastScanData.conditionName_te || lastScanData.conditionName) : detectedLang === 'hi' ? (lastScanData.conditionName_hi || lastScanData.conditionName) : lastScanData.conditionName;
        if (detectedLang === 'te') {
          return {
            language: 'te',
            intent: 'SCAN_RESULT_PEST',
            speechText: `మీరు స్కాన్ చేసిన ${lastScanData.cropName_te || lastScanData.cropName} పంటలో పురుగు దాడి అనుమానించబడింది: ${pestName}. నష్టం నివారించడానికి తగిన పురుగుమందు లేదా సేంద్రీయ ఎరలను వాడండి.`,
            displayText: `ఇటీవలి AI స్కానింగ్ ఫలితం:\n• పంట: ${lastScanData.cropName}\n• పురుగు దాడి: ${pestName}\n• సూచించిన నివారణ: క్రింద మోతాదు కాలిక్యులేటర్‌ను చూడండి.`,
            action: 'OPEN_DOSAGE',
            actionLabel: 'పురుగుమందు మోతాదు చూడండి (View Dosage)',
            suggestedPrompts: ['ఎంత మందు కలపాలి?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?', 'సహజ నివారణ ఏమిటి?']
          };
        }
      }

      if (detectedLang === 'te') {
        return {
          language: 'te',
          intent: 'SCAN_RESULT_EXPLANATION',
          speechText: `మీరు ఇటీవల స్కాన్ చేసిన ${lastScanData.cropName_te || lastScanData.cropName} పంటలో వ్యాధి లక్షణాలు అనుమానించబడ్డాయి: ${lastScanData.conditionName_te || lastScanData.conditionName}. దీని తీవ్రత ${lastScanData.severity || 'మధ్యస్థం'}. తగిన నివారణకు మోతాదు కాలిక్యులేటర్‌ను చూడండి.`,
          displayText: `ఇటీవలి AI స్కానింగ్ ఫలితం:\n• పంట: ${lastScanData.cropName}\n• సమస్య: ${lastScanData.conditionName}\n• తీవ్రత: ${lastScanData.severity || 'మధ్యస్థం'}\n• సూచించిన నివారణ: ${lastScanData.remedy || 'మోతాదు కాలిక్యులేటర్‌ను చూడండి'}.`,
          action: 'OPEN_DOSAGE',
          actionLabel: 'మందుల మోతాదు చూడండి (View Dosage)',
          suggestedPrompts: ['మందుల మోతాదు ఎంత?', 'సేంద్రీయ నివారణ ఏమిటి?', 'దగ్గరలోని ఎరువుల దుకాణం ఎక్కడ?']
        };
      }
      if (detectedLang === 'hi') {
        return {
          language: 'hi',
          intent: 'SCAN_RESULT_EXPLANATION',
          speechText: `आपकी हालिया स्कैन की गई ${lastScanData.cropName_hi || lastScanData.cropName} फसल में संभावित रोग पाया गया है: ${lastScanData.conditionName_hi || lastScanData.conditionName}। इसका प्रकोप ${lastScanData.severity || 'मध्यम'} है। अनुशंसित उपचार के लिए दवा की खुराक देखें।`,
          displayText: `हालिया AI स्कैन परिणाम:\n• फसल: ${lastScanData.cropName}\n• रोग/कीट: ${lastScanData.conditionName}\n• तीव्रता: ${lastScanData.severity || 'मध्यम'}\n• उपचार: ${lastScanData.remedy || 'दवा की सटीक मात्रा की गणना करें'}।`,
          action: 'OPEN_DOSAGE',
          actionLabel: 'दवा की मात्रा देखें (View Dosage)',
          suggestedPrompts: ['दवा की मात्रा कितनी है?', 'जैविक उपचार क्या है?', 'निकटतम कीटनाशक दुकान कहां है?']
        };
      }
      return {
        language: 'en',
        intent: 'SCAN_RESULT_EXPLANATION',
        speechText: `Your recent scan of ${lastScanData.cropName} detected possible signs of ${lastScanData.conditionName} with ${lastScanData.severity || 'moderate'} severity. Please review the recommended treatments in our dosage calculator.`,
        displayText: `Recent AI Scan Diagnostic:\n• Crop: ${lastScanData.cropName}\n• Condition: ${lastScanData.conditionName}\n• Severity: ${lastScanData.severity || 'Moderate'}\n• Recommended Action: ${lastScanData.remedy || 'Review dosage calculator below'}.`,
        action: 'OPEN_DOSAGE',
        actionLabel: 'Calculate Dosage',
        suggestedPrompts: ['How much chemical should I mix?', 'What organic options exist?', 'Where can I buy this?']
      };
    }

    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'PROMPT_SCAN',
        speechText:
          'దయచేసి మీ పంట ఆకు ఫోటో తీయండి, తద్వారా నేను మొక్క రకం మరియు వ్యాధిని ఖచ్చితంగా విశ్లేషిస్తాను. స్కానర్ తెరవడానికి క్రింది బటన్ నొక్కండి.',
        displayText:
          'దయచేసి మీ పంట ఆకు లేదా కాండం ఫోటో తీయండి. మా న్యూరల్ విజన్ మోడల్ మొక్క రకం, ఆకు ఆరోగ్య శాతం మరియు సోకిన తెగులును కొన్ని సెకన్లలోనే గుర్తిస్తుంది.',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI క్రాప్ స్కానర్ తెరవండి (Open Crop Scanner)',
        suggestedPrompts: ['టమోటా ఎర్లీ బ్లైట్ అంటే ఏమిటి?', 'పత్తిలో గులాబీ రంగు పురుగు ఎలా గుర్తించాలి?', 'వరిలో అగ్గితెగులు లక్షణాలు ఏమిటి?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'PROMPT_SCAN',
        speechText:
          'कृपया फसल या पत्ती की एक स्पष्ट फोटो लें ताकि मैं पौधे की पहचान और बीमारी का विश्लेषण कर सकूं। स्कैनर खोलने के लिए नीचे दिए गए बटन पर टैप करें।',
        displayText:
          'कृपया अपनी फसल की पत्ती की फोटो अपलोड करें। हमारा AI मॉडल पौधे की पहचान, पत्तियों के स्वास्थ्य का प्रतिशत और बीमारी की पहचान करेगा।',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI क्रॉप स्कैनर खोलें (Open Crop Scanner)',
        suggestedPrompts: ['टमाटर में अगेती झुलसा?', 'कपास में गुलाबी सुंडी?', 'धान में ब्लास्ट?']
      };
    }

    return {
      language: 'en',
      intent: 'PROMPT_SCAN',
      speechText:
        'Please take a picture of the crop leaf so I can analyze the plant species and diagnose any disease or pest. Click the button below to open the AI Crop Scanner.',
      displayText:
        'Please capture or upload a clear photo of your crop leaf. Our neural botanical vision engine will identify the plant species, quantify tissue health, and pinpoint any active disease or pest in seconds.',
      action: 'OPEN_SCANNER',
      actionLabel: 'Open AI Crop Scanner',
      suggestedPrompts: ['What are symptoms of Early Blight?', 'How to detect Pink Bollworm?', 'How to treat Rice Blast?']
    };
  }

  // =========================================================================
  // 8B. "ARE YOU SURE?" / DIAGNOSTIC UNCERTAINTY INQUIRIES
  // =========================================================================
  if (
    queryLower.includes('are you sure') ||
    queryLower.includes('how sure') ||
    queryLower.includes('is this confirmed') ||
    queryLower.includes('how confident') ||
    query.includes('ఖచ్చితమేనా') ||
    query.includes('నిజమేనా') ||
    query.includes('నమ్మవచ్చా') ||
    query.includes('क्या आप निश्चित हैं') ||
    query.includes('क्या यह पक्का है')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'DIAGNOSTIC_CERTAINTY',
        speechText: 'ఫోటో ఆధారంగా AI విశ్లేషణ బలమైన సంకేతాలను మాత్రమే తెలియజేస్తుంది, కానీ 100 శాతం ఖచ్చితంగా ధృవీకరించలేదు. మీకు సందేహం ఉంటే మీ మండల వ్యవసాయ అధికారి లేదా రైతు భరోసా కేంద్రాన్ని సంప్రదించండి.',
        displayText: 'AI విశ్లేషణ ఖచ్చితత్వ సమాచారం:\n• ఫోటో ద్వారా వ్యాధి లక్షణాల సంకేతాలు మాత్రమే అంచనా వేయబడతాయి.\n• 100% వ్యాధి నిర్ధారణకు క్షేత్ర పరిశీలన లేదా ప్రయోగశాల పరీక్ష అవసరం.\n• ముఖ్యమైన నిర్ణయాలకు మండల వ్యవసాయ నిపుణుడి సలహా తీసుకోండి.',
        action: 'OPEN_SCANNER',
        actionLabel: 'మరొక ఫోటో తీయండి (Take Another Photo)',
        suggestedPrompts: ['మరొక ఫోటో ఎలా తీయాలి?', 'రైతు భరోసా కేంద్రం ఎక్కడ?', 'ఈరోజు పిచికారీ చేయవచ్చా?']
      };
    }
    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'DIAGNOSTIC_CERTAINTY',
        speechText: 'केवल फोटो के आधार पर 100 प्रतिशत पुष्टि नहीं की जा सकती। यह विश्लेषण पत्ती के लक्षणों पर आधारित संभावित संकेत है। यदि संदेह हो तो स्थानीय कृषि विस्तार अधिकारी या कृषि विज्ञान केंद्र से संपर्क करें।',
        displayText: 'AI निदान विश्वसनीयता सूचना:\n• फोटो विश्लेषण संभावित रोग के मजबूत संकेत प्रदान करता है, परंतु यह प्रयोगशाला परीक्षण का विकल्प नहीं है।\n• किसी भी रासायनिक छिड़काव से पहले स्थानीय कृषि विशेषज्ञ से पुष्टि कर लें।',
        action: 'OPEN_SCANNER',
        actionLabel: 'दूसरी फोटो लें (Take Another Photo)',
        suggestedPrompts: ['अच्छी फोटो कैसे लें?', 'उर्वरक सलाह?', 'छिड़काव का सही समय?']
      };
    }
    return {
      language: 'en',
      intent: 'DIAGNOSTIC_CERTAINTY',
      speechText: 'I cannot confirm the diagnosis with 100 percent certainty from a photograph alone. The AI analysis provides indicative probabilities based on visible leaf patterns. For critical interventions, please consult your local agricultural extension officer.',
      displayText: 'AI Diagnostic Confidence Notice:\n• Optical analysis identifies indicative pathogenic symptoms; it does not replace laboratory tissue pathology.\n• If symptoms are borderline, take another close-up photo in clear daylight or consult local agricultural officers.',
      action: 'OPEN_SCANNER',
      actionLabel: 'Take Another Close-Up Photo',
      suggestedPrompts: ['How to take a better photo?', 'Check dosage calculator', 'Weather conditions today']
    };
  }

  // =========================================================================
  // 8C. "WHAT SHOULD I DO?" / NEXT STEPS
  // =========================================================================
  if (
    queryLower.includes('what should i do') ||
    queryLower.includes('what to do next') ||
    queryLower.includes('how to proceed') ||
    query.includes('ఏమి చేయాలి') ||
    query.includes('నేను ఏమి చేయాలి') ||
    query.includes('తర్వాత ఏమి చేయాలి') ||
    query.includes('मुझे क्या करना चाहिए') ||
    query.includes('अब क्या करें')
  ) {
    if (lastScanData && (lastScanData.isHealthy || lastScanData.healthStatus === 'healthy')) {
      if (detectedLang === 'te') {
        return {
          language: 'te',
          intent: 'NEXT_STEPS_HEALTHY',
          speechText: 'మీ పంట ఆరోగ్యంగా ఉన్నందున రసాయన మందుల పిచికారీ అవసరం లేదు. ప్రతి వారం క్షేత్ర పర్యవేక్షణ చేయండి మరియు సమతుల్య ఎరువులను అందించండి.',
          displayText: 'ఆరోగ్యకరమైన పంట సంరక్షణ సూచనలు:\n1. రసాయన మందులు వాడవద్దు (No chemical sprays needed).\n2. ప్రతి 14 రోజులకు వేప నూనె (10,000 ppm) పిచికారీ చేయండి.\n3. క్రమం తప్పకుండా డ్రిప్ నీటి యాజమాన్యం పాటించండి.',
          action: 'NONE',
          suggestedPrompts: ['ఎరువుల సూచనలు ఏమిటి?', 'వాతావరణం ఎలా ఉంది?']
        };
      }
      if (detectedLang === 'hi') {
        return {
          language: 'hi',
          intent: 'NEXT_STEPS_HEALTHY',
          speechText: 'आपकी फसल स्वस्थ है, इसलिए रासायनिक छिड़काव की आवश्यकता नहीं है। नियमित देखभाल करें और संतुलित खाद दें।',
          displayText: 'स्वस्थ फसल प्रबंधन:\n1. रासायनिक कीटनाशक न डालें।\n2. 14 दिनों के अंतराल पर नीम तेल का छिड़काव करें।\n3. समय पर सिंचाई करें।',
          action: 'NONE',
          suggestedPrompts: ['खाद की सलाह?', 'मौसम पूर्वानुमान?']
        };
      }
      return {
        language: 'en',
        intent: 'NEXT_STEPS_HEALTHY',
        speechText: 'Since your crop is healthy, no chemical spray is required. Maintain routine scouting visits and balanced drip irrigation.',
        displayText: 'Healthy Crop Management:\n1. No chemical fungicides needed.\n2. Apply prophylactic neem oil (10,000 ppm) every 14 days.\n3. Maintain balanced NPK fertigation.',
        action: 'NONE',
        suggestedPrompts: ['Check 7-day weather', 'Fertilizer guidance', 'Nearest agro stores']
      };
    }

    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'NEXT_STEPS_DISEASE',
        speechText: 'ముందుగా సోకిన ఆకులను తీసివేసి నాశనం చేయండి. ఆపై మీ పంట విస్తీర్ణానికి సరిపడా ఖచ్చితమైన మందుల మోతాదును మా కాలిక్యులేటర్‌లో లెక్కించండి. గాలిలో తేమ మరియు వర్ష సూచనను చూసి సాయంత్రం వేళ పిచికారీ చేయండి.',
        displayText: 'తక్షణ కార్యాచరణ ప్రణాళిక:\n1. తెగులు సోకిన కొమ్మలను తొలగించి తగులబెట్టండి.\n2. మా మోతాదు కాలిక్యులేటర్‌ను ఉపయోగించి ఎకరాకు సరైన నీరు మరియు మందును కొలవండి.\n3. సాయంత్రం వేళ గాలి తక్కువగా ఉన్నప్పుడు పిచికారీ చేయండి.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'మోతాదు కాలిక్యులేటర్ తెరవండి (Open Dosage)',
        suggestedPrompts: ['ఎకరాకు ఎంత మందు కలపాలి?', 'ఈరోజు వాతావరణం అనుకూలమా?', 'సేంద్రీయ ప్రత్యామ్నాయాలు ఏమిటి?']
      };
    }
    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'NEXT_STEPS_DISEASE',
        speechText: 'संक्रमित पत्तियों को तोड़कर खेत से दूर नष्ट करें। दवा की सही मात्रा जानने के लिए हमारे खुराक कैलकुलेटर का उपयोग करें और शांत मौसम में शाम को छिड़काव करें।',
        displayText: 'त्वरित कार्रवाई कदम:\n1. प्रभावित पत्तियों को हटाकर नष्ट करें।\n2. खुराक कैलकुलेटर से सही मात्रा ज्ञात करें।\n3. शाम को हवा कम होने पर छिड़काव करें।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'खुराक कैलकुलेटर खोलें (Open Dosage)',
        suggestedPrompts: ['दवा की मात्रा कितनी है?', 'मौसम सुरक्षित है?', 'जैविक उपचार?']
      };
    }
    return {
      language: 'en',
      intent: 'NEXT_STEPS_DISEASE',
      speechText: 'First, rogue out and safely destroy heavily infected leaves. Then, use our dosage calculator to determine the exact water and chemical quantity for your land acreage. Spray in calm afternoon conditions.',
      displayText: 'Actionable Next Steps:\n1. Prune and destroy severely infected foliage.\n2. Open the dosage calculator to get exact active ingredient dilution.\n3. Check 7-day weather risk before spraying.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Open Dosage Calculator',
      suggestedPrompts: ['How much chemical should I mix?', 'Is weather safe today?', 'Organic remedies']
    };
  }

  // =========================================================================
  // 9. WEATHER & SPRAYING WINDOW INQUIRIES
  // =========================================================================
  if (
    queryLower.includes('spray today') ||
    queryLower.includes('weather') ||
    queryLower.includes('rain') ||
    queryLower.includes('wind') ||
    queryLower.includes('safe to spray') ||
    queryLower.includes('varsham') ||
    query.includes('పిచికారీ') ||
    query.includes('స్ప్రే') ||
    query.includes('వర్షం') ||
    query.includes('వాతావరణం') ||
    query.includes('తేమ') ||
    query.includes('छिड़काव') ||
    query.includes('स्प्रे') ||
    query.includes('बारिश') ||
    query.includes('मौसम')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'WEATHER_SPRAY',
        speechText:
          'వాతావరణ సమాచారం ప్రకారం, గాలిలో తేమ 80 శాతం కంటే ఎక్కువ ఉన్నప్పుడు ఫంగస్ తెగుళ్లు వేగంగా వ్యాపిస్తాయి. భారీ వర్ష సూచన ఉన్నప్పుడు మందులు పిచికారీ చేయకూడదు, లేకుంటే మందు కొట్టుకుపోతుంది. ఉత్తమ పిచికారీ సమయం సాయంత్రం 4:30 నుండి 6:30 వరకు, గాలి వేగం తక్కువగా ఉన్నప్పుడు మాత్రమే చేయాలి.',
        displayText:
          'వాతావరణం & పిచికారీ నియమాలు:\n• తేమ & ఉష్ణోగ్రత: 85% తేమ ఫంగస్ బీజాల మొలకకు దారితీస్తుంది.\n• వర్ష సూచన హెచ్చరిక: 50% పైగా వర్షం ఉంటే పిచికారీ వాయిదా వేయండి, లేకపోతే మందు కొట్టుకుపోతుంది.\n• సురక్షిత సమయం: సాయంత్రం 4:30 - 6:30 (గాలి వేగం < 10 km/h ఉన్నప్పుడు).\n• మీ ఖచ్చితమైన GPS లొకేషన్ 7 రోజుల సూచన కోసం క్రింద చూడండి.',
        action: 'OPEN_WEATHER',
        actionLabel: '7 రోజుల వాతావరణం చూడండి (View 7-Day Forecast)',
        suggestedPrompts: ['నా పొలం లొకేషన్ గుర్తించండి', 'వర్షం ఎప్పుడు పడుతుంది?', 'తెగులు వచ్చే ప్రమాదం ఎంత?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'WEATHER_SPRAY',
        speechText:
          'मौसम पूर्वानुमान के अनुसार, 80 प्रतिशत से अधिक आर्द्रता में फफूंद रोग तेजी से पनपते हैं। यदि भारी बारिश की संभावना हो तो छिड़काव न करें, अन्यथा दवा धुल जाएगी। छिड़काव का सबसे सुरक्षित समय शाम 4:30 से 6:30 बजे के बीच है।',
        displayText:
          'मौसम एवं सुरक्षित छिड़काव सलाह:\n• आर्द्रता प्रभाव: 85% से अधिक नमी में ब्लास्ट और झुलसा के बीजाणु तेजी से फैलते हैं।\n• बारिश की चेतावनी: यदि बारिश की संभावना 50% से अधिक है तो छिड़काव टालें।\n• उत्तम समय: शाम 4:30 से 6:30 बजे (हवा की गति 10 किमी/घंटा से कम)।',
        action: 'OPEN_WEATHER',
        actionLabel: '7 दिवसीय मौसम देखें (View 7-Day Weather)',
        suggestedPrompts: ['मेरे खेत की लोकेशन पहचानें', 'बारिश की क्या संभावना है?', 'फसल जोखिम पूर्वानुमान क्या है?']
      };
    }

    return {
      language: 'en',
      intent: 'WEATHER_SPRAY',
      speechText:
        'According to microclimate forecasting, relative humidity above 80% accelerates fungal spore release. If rain probability is high, avoid spraying to prevent chemical wash-off. The optimal spraying window is late afternoon between 4:30 PM and 6:30 PM when wind velocity is under 10 km/h.',
      displayText:
        'Weather & Safe Spraying Guidelines:\n• Humidity Impact: Relative humidity >80% triggers conidial germination for Blight and Blast.\n• Rain Washout Warning: If rain probability exceeds 50%, postpone spraying to avoid chemical runoff.\n• Optimal Window: 4:30 PM - 6:30 PM (Low drift hazard, wind speed <10 km/h).\n• View your farm’s real-time 7-day GPS forecast below.',
      action: 'OPEN_WEATHER',
      actionLabel: 'View 7-Day Weather Forecast',
      suggestedPrompts: ['Detect my farm GPS location', 'When is the next dry window?', 'What diseases are triggered today?']
    };
  }

  // =========================================================================
  // 10. NATURAL & ORGANIC REMEDIES
  // =========================================================================
  if (
    queryLower.includes('organic') ||
    queryLower.includes('natural') ||
    queryLower.includes('neem') ||
    queryLower.includes('buttermilk') ||
    queryLower.includes('vepa') ||
    queryLower.includes('majiga') ||
    query.includes('సేంద్రీయ') ||
    query.includes('సహజ') ||
    query.includes('వేప') ||
    query.includes('మజ్జిగ') ||
    query.includes('కషాయం') ||
    query.includes('జీవామృతం') ||
    query.includes('పంచగవ్య') ||
    query.includes('जैविक') ||
    query.includes('प्राकृतिक') ||
    query.includes('नीम') ||
    query.includes('छाछ')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'ORGANIC_REMEDY',
        speechText:
          'సేంద్రీయ రక్షణ కోసం వేప నూనె పదివేల పీపీఎం ఎకరాకు 500 మిల్లీలీటర్లు లేదా పుల్లటి మజ్జిగ ద్రావణం అత్యంత ప్రభావవంతమైనవి. పుల్లటి మజ్జిగను రాగి పాత్రలో ఏడు రోజులు పులియబెట్టి, లీటరు నీటికి 50 మిల్లీలీటర్లు కలిపి పిచికారీ చేస్తే బూడిద తెగులు మరియు ఆకు మచ్చలు పూర్తిగా నయమవుతాయి.',
        displayText:
          'రైతు-ధృవీకరించిన సేంద్రీయ నివారణలు:\n1. వేప నూనె (Neem Oil 10,000 ppm): ఎకరాకు 500-600 ml. రసం పీల్చే పురుగుల గుడ్లను నాశనం చేస్తుంది.\n2. పుల్లటి మజ్జిగ కషాయం (Sour Buttermilk): 5 లీటర్ల ఆవు మజ్జిగను రాగి పాత్రలో 7 రోజులు ఉంచి, 100 లీటర్ల నీటితో కలిపి పిచికారీ చేయాలి. ఫంగస్ తెగుళ్లకు అద్భుత నివారణ.\n3. ట్రైకోడెర్మా విరిడే (Trichoderma): ఎకరాకు 2 కిలోలు పశువుల ఎరువుతో కలిపి వేస్తే వేరుకుళ్లు రాకుండా కాపాడుతుంది.\n4. జీవామృతం: ప్రతి 15 రోజులకు ఒకసారి పారకపు నీటితో పాటు అందించండి.',
        action: 'OPEN_DOSAGE',
        actionLabel: 'సేంద్రీయ మోతాదు చూడండి (Organic Dosage)',
        suggestedPrompts: ['పుల్లటి మజ్జిగ ఎలా తయారు చేయాలి?', 'రైతుల సమీక్షలు చూడండి', 'రసాయన మందుల మోతాదు ఎంత?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'ORGANIC_REMEDY',
        speechText:
          'जैविक फसल सुरक्षा के लिए 10,000 पीपीएम नीम का तेल प्रति एकड़ 500 मिलीलीटर या खट्टी छाछ का घोल अत्यंत असरदार है। खट्टी छाछ को तांबे के बर्तन में 7 दिनों तक सड़ाकर छिड़कने से फफूंद जनित रोग पूरी तरह रुक जाते हैं।',
        displayText:
          'प्राकृतिक एवं जैविक फसल सुरक्षा उपाय:\n1. नीम का तेल (Neem Oil 10,000 ppm): प्रति एकड़ 500-600 मिली।\n2. खट्टी छाछ का घोल: 5 लीटर छाछ को तांबे के बर्तन में 7 दिन रखकर 100 लीटर पानी में मिलाकर छिड़कें।\n3. ट्राइकोडर्मा विरिडी: 2 किग्रा प्रति एकड़ गोबर की खाद में मिलाकर डालें।',
        action: 'OPEN_DOSAGE',
        actionLabel: 'जैविक मात्रा देखें (Organic Dosage)',
        suggestedPrompts: ['खट्टी छाछ कैसे बनाएं?', 'किसानों के अनुभव पढ़ें', 'रासायनिक कीटनाशक की मात्रा?']
      };
    }

    return {
      language: 'en',
      intent: 'ORGANIC_REMEDY',
      speechText:
        'For organic crop protection, 10,000 ppm Neem Oil at 500 ml per acre or fermented Sour Buttermilk spray works wonders. Fermenting sour buttermilk in a copper pot for 7 days creates natural copper-infused antifungal antibodies that stop leaf blight and mildew.',
      displayText:
        'Farmer-Verified Organic Remedies:\n1. Cold-Pressed Neem Oil (10,000 ppm): 500-600 ml/acre. Disrupts insect feeding and halts oviposition.\n2. Fermented Sour Buttermilk (5L / 100L water): Aged in a copper vessel for 7 days; generates bio-fungicidal lactic copper compounds.\n3. Trichoderma viride: 2 kg/acre mixed with FYM prevents soil-borne root rot and wilt.',
      action: 'OPEN_DOSAGE',
      actionLabel: 'Calculate Organic Dosage',
      suggestedPrompts: ['How to prepare sour buttermilk?', 'See verified farmer reviews', 'What chemical pesticide should I use?']
    };
  }

  // =========================================================================
  // 11. NEARBY PESTICIDE & FERTILIZER SHOPS
  // =========================================================================
  if (
    queryLower.includes('shop') ||
    queryLower.includes('store') ||
    queryLower.includes('dealer') ||
    queryLower.includes('buy pesticide') ||
    queryLower.includes('dookanam') ||
    query.includes('దుకాణం') ||
    query.includes('షాప్') ||
    query.includes('కొనాలి') ||
    query.includes('మందుల దుకాణం') ||
    query.includes('రైతు సేవా కేంద్రం') ||
    query.includes('दुकान') ||
    query.includes('दुकानें') ||
    query.includes('खाद की दुकान')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'NEARBY_SHOPS',
        speechText:
          'తెలంగాణలోని అన్ని 33 జిల్లాల్లో అధీకృత పురుగుమందుల డీలర్లు మరియు రైతు సేవా కేంద్రాల GPS లొకేషన్లు మా మ్యాప్‌లో అందుబాటులో ఉన్నాయి. మీ సమీప దుకాణం చిరునామా, ఫోన్ నంబర్ మరియు రూట్ చూడటానికి క్రింది బటన్ నొక్కండి.',
        displayText:
          'తెలంగాణ పురుగుమందుల & ఎరువుల దుకాణాల GPS మ్యాప్:\n• వరంగల్, కరీంనగర్, నిజామాబాద్, ఖమ్మం, నల్గొండ సహా అన్ని జిల్లాల్లో అధీకృత డీలర్లు.\n• నేరుగా కాల్ చేయడం, వాట్సాప్ విచారణ మరియు గూగుల్ మ్యాప్స్ దిశలు (GPS రూట్) అందుబాటులో ఉన్నాయి.\n• కింద ఉన్న మ్యాప్‌లో మీ జిల్లాను ఎంచుకోండి లేదా సమీప దుకాణాన్ని కనుగొనండి.',
        action: 'OPEN_SHOPS',
        actionLabel: 'షాపుల GPS మ్యాప్ తెరవండి (Open Shops Map)',
        suggestedPrompts: ['వరంగల్ మార్కెట్ యార్డ్ దుకాణం', 'సేంద్రీయ ఎరువుల కేంద్రం ఎక్కడ?', 'రైతు సేవా కేంద్రం ఫోన్ నంబర్']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'NEARBY_SHOPS',
        speechText:
          'तेलंगाना के सभी 33 जिलों में अधिकृत कीटनाशक विक्रेताओं और किसान सेवा केंद्रों की जीपीएस स्थिति हमारे मानचित्र पर उपलब्ध है। निकटतम दुकान का पता और फोन नंबर देखने के लिए नीचे दिए गए बटन पर टैप करें।',
        displayText:
          'तेलंगाना कीटनाशक एवं उर्वरक दुकानें GPS मानचित्र:\n• वारंगल, करीमनगर, निज़ामाबाद, खम्मम सहित सभी 33 जिलों में कृषि विभाग द्वारा लाइसेंस प्राप्त दुकानें।\n• सीधे फोन कॉल, व्हाट्सएप पूछताछ और गूगल मैप्स दिशा-निर्देश उपलब्ध हैं।',
        action: 'OPEN_SHOPS',
        actionLabel: 'दुकानें GPS नक्शा खोलें (Open Shops Map)',
        suggestedPrompts: ['वारंगल में खाद की दुकान?', 'जैविक खाद केंद्र कहां है?', 'किसान सेवा केंद्र से संपर्क करें']
      };
    }

    return {
      language: 'en',
      intent: 'NEARBY_SHOPS',
      speechText:
        'We have mapped licensed agrochemical retailers and Rythu Seva Kendras across all 33 districts of Telangana. You can view addresses, phone numbers, and direct GPS driving directions on our map below.',
      displayText:
        'Telangana Pesticide & Agro-Input Shops GPS Locator:\n• Comprehensive coverage across Warangal, Karimnagar, Nizamabad, Khammam, Nalgonda, and all 33 districts.\n• Direct calling, WhatsApp inquiry, and Google Maps GPS navigation.\n• Explore the interactive shop locator map below.',
      action: 'OPEN_SHOPS',
      actionLabel: 'Open Pesticide Shops GPS Map',
      suggestedPrompts: ['Warangal Enumamula market shop', 'Where to buy organic bio-inputs?', 'Rythu Seva Kendra contact']
    };
  }

  // =========================================================================
  // 12. GREETING & GENERAL HELP
  // =========================================================================
  if (
    queryLower.includes('hello') ||
    queryLower.includes('hi') ||
    queryLower.includes('help') ||
    queryLower.includes('namaskaram') ||
    query.includes('నమస్కారం') ||
    query.includes('హలో') ||
    query.includes('సహాయం') ||
    query.includes('బాగున్నారా') ||
    query.includes('नमस्ते') ||
    query.includes('मदद') ||
    query.includes('प्रणाम')
  ) {
    if (detectedLang === 'te') {
      return {
        language: 'te',
        intent: 'GREETING',
        speechText:
          'నమస్కారం రైతు సోదరులారా! నేను క్రాప్ షీల్డ్ AI వాయిస్ అసిస్టెంట్‌ని. మీ పంటల తెగుళ్లు, ఆకులు పసుపు రంగులోకి మారడం, పురుగుమందుల సరైన మోతాదు, వాతావరణం లేదా సమీప ఎరువుల దుకాణాల గురించి నన్ను అడగవచ్చు.',
        displayText:
          'నమస్కారం! క్రాప్ షీల్డ్ AI వాయిస్ అసిస్టెంట్‌కు స్వాగతం. మీరు నన్ను వీటి గురించి అడగవచ్చు:\n• "నా పంట ఆకులు పసుపు రంగులోకి మారుతున్నాయి. నేను ఏమి చేయాలి?"\n• "పురుగు మందు మోతాదు ఎంత?"\n• "ఈ పంటకు ఏమైంది?" (ఫోటో స్కాన్ ఆధారంగా సమాధానం)\n• "ఈరోజు మందు పిచికారీ చేయవచ్చా?" (వాతావరణ విశ్లేషణ)\n• "సేంద్రీయ వేప నూనె మోతాదు ఎంత?"\n• "సమీప పురుగుమందుల దుకాణం ఎక్కడ ఉంది?"',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI స్కానర్ తెరవండి (Open Scanner)',
        suggestedPrompts: ['మందుల మోతాదు ఎంత?', 'ఆకులు పసుపుగా మారుతున్నాయి?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
      };
    }

    if (detectedLang === 'hi') {
      return {
        language: 'hi',
        intent: 'GREETING',
        speechText:
          'नमस्ते किसान भाइयों! मैं क्रॉप शील्ड AI वॉइस असिस्टेंट हूँ। आप मुझसे फसल की बीमारियों, पत्तियों के पीले पड़ने, कीटनाशक की सही मात्रा, मौसम पूर्वानुमान या नजदीकी दुकानों के बारे में पूछ सकते हैं।',
        displayText:
          'नमस्ते! क्रॉप शील्ड AI वॉइस असिस्टेंट में आपका स्वागत है। आप मुझसे पूछ सकते हैं:\n• "मेरी फसल की पत्तियाँ पीली हो रही हैं?"\n• "कीटनाशक की सही मात्रा कितनी है?"\n• "क्या आज कीटनाशक का छिड़काव सुरक्षित है?"\n• "नजदीकी कीटनाशक दुकान कहां है?"',
        action: 'OPEN_SCANNER',
        actionLabel: 'AI स्कैनर खोलें (Open Scanner)',
        suggestedPrompts: ['कीटनाशक की मात्रा?', 'पत्तियां पीली हो रही हैं?', 'नजदीकी खाद दुकान कहां है?']
      };
    }

    return {
      language: 'en',
      intent: 'GREETING',
      speechText:
        'Hello farmer! I am your Crop Shield AI Voice Assistant. You can ask me about crop diseases, yellowing leaves, chemical and organic dosages, weather spraying windows, or nearby fertilizer shops.',
      displayText:
        'Welcome to Crop Shield AI Voice Assistant!\nFeel free to speak and ask questions such as:\n• "How much pesticide dosage should I mix?"\n• "My crop has yellow leaves. What should I do?"\n• "What is wrong with this crop?" (AI Image Scanner diagnosis)\n• "Can I spray pesticide today?" (Microclimate weather outlook)\n• "Where is the nearest fertilizer shop?"',
      action: 'OPEN_SCANNER',
      actionLabel: 'Open AI Crop Scanner',
      suggestedPrompts: ['Calculate pesticide dosage', 'My crop has yellow leaves', 'Find nearby pesticide shops']
    };
  }

  // =========================================================================
  // 13. FALLBACK / GENERAL AGRICULTURAL ADVISORY
  // =========================================================================
  if (detectedLang === 'te') {
    return {
      language: 'te',
      intent: 'GENERAL_ADVICE',
      speechText: `మీరు అడిగిన "${query}" గురించి: పంటల రక్షణ కోసం ఆకు యొక్క కింద మరియు పై భాగాలను నిశితంగా గమనించండి. మచ్చలు లేదా పురుగులు ఉంటే మా AI స్కానర్ ద్వారా ఫోటో తీసి వెంటనే విశ్లేషించండి లేదా మోతాదు కాలిక్యులేటర్‌ను చూడండి.`,
      displayText: `మీ ప్రశ్న: "${query}"\n\nరైతు రక్షణ సలహా:\n1. పంటలో తెగులు లేదా పురుగు లక్షణాలు కనిపిస్తే వెంటనే మా AI స్కానర్‌లో ఆకు ఫోటో తీయండి.\n2. సరైన రసాయన మరియు సేంద్రీయ మోతాదు కోసం మోతాదు కాలిక్యులేటర్‌ను ఉపయోగించండి.\n3. వర్షం మరియు గాలి వేగం ఆధారంగా సాయంత్రం వేళల్లో మాత్రమే పిచికారీ చేయండి.`,
      action: 'OPEN_SCANNER',
      actionLabel: 'AI స్కానర్ తెరవండి (Open Scanner)',
      suggestedPrompts: ['పురుగుమందుల మోతాదు ఎంత?', 'ఆకులు పసుపుగా మారుతున్నాయి?', 'సమీప ఎరువుల దుకాణం ఎక్కడ?']
    };
  }

  if (detectedLang === 'hi') {
    return {
      language: 'hi',
      intent: 'GENERAL_ADVICE',
      speechText: `आपके प्रश्न "${query}" के संबंध में: सटीक जानकारी के लिए AI स्कैनर में अपनी फसल की फोटो अपलोड करें अथवा दवा की मात्रा कैलकुलेटर की सहायता लें।`,
      displayText: `आपकी जिज्ञासा: "${query}"\n\nफसल सुरक्षा परामर्श:\n1. यदि पत्तियों पर धब्बे, मुड़ाव या सुंडी दिखे तो तुरंत हमारे AI स्कैनर से जांच करें।\n2. सही मात्रा के लिए कीटनाशक कैलकुलेटर का उपयोग करें।\n3. मौसम और हवा की गति को ध्यान में रखकर ही छिड़काव करें।`,
      action: 'OPEN_SCANNER',
      actionLabel: 'AI स्कैनर खोलें (Open Scanner)',
      suggestedPrompts: ['दवा की मात्रा कितनी है?', 'पत्तियां पीली हो रही हैं?', 'दुकान कहां है?']
    };
  }

  return {
    language: 'en',
    intent: 'GENERAL_ADVICE',
    speechText: `Regarding "${query}": For accurate botanical and disease diagnosis, please upload a leaf photo to our AI Crop Scanner or check the pesticide dosage calculator below.`,
    displayText: `Query received: "${query}"\n\nGeneral Crop Defense Advisory:\n1. For active leaf spots, discoloration, or pests, capture a leaf photo with our AI Scanner.\n2. Compute scientific chemical and organic dosages using our Dosage Calculator.\n3. Check the 7-day weather outlook before spraying to avoid chemical washout.`,
    action: 'OPEN_SCANNER',
    actionLabel: 'Open AI Crop Scanner',
    suggestedPrompts: ['Calculate pesticide dosage', 'My crop has yellow leaves', 'Nearby fertilizer shops']
  };
}
