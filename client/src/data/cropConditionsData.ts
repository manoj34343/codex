import { CropCondition } from '../types';

export const CROP_CONDITIONS_DATA: CropCondition[] = [
  {
    "id": "tomato_early_blight",
    "crop": "Tomato",
    "crop_te": "టమోటా",
    "crop_hi": "टमाटर",
    "name": "Early Blight",
    "name_te": "ముందస్తు తెగులు (ఎర్లీ బ్లైట్)",
    "name_hi": "अगेती झुलसा (अर्ली ब्लाइट)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Alternaria solani",
    "severityLevel": "Moderate to High",
    "symptoms": [
      "Concentric dark rings forming 'target board' lesions on older leaves",
      "Yellowing (chlorosis) surrounding the dark necrotic patches",
      "Premature leaf drop and stem collar rot leading to fruit sunscald"
    ],
    "symptoms_te": [
      "పాత ఆకులపై 'టార్గెట్ బోర్డ్' లాంటి ముదురు రంగు వలయాలు ఏర్పడటం",
      "మచ్చల చుట్టూ ఆకులు పసుపు రంగులోకి మారడం",
      "ఆకులు రాలిపోవడం మరియు కాయలపై నల్లటి మచ్చలు రావడం"
    ],
    "symptoms_hi": [
      "पुरानी पत्तियों पर गाढ़े छल्लों वाले धब्बे बनना (टारगेट बोर्ड लक्षण)",
      "धब्बों के चारों ओर पत्तियों का पीला पड़ना",
      "पत्तियों का असमय गिरना और तने पर सड़ांध"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Mancozeb 75% WP",
        "brandNames": [
          "Dithane M-45",
          "Indofil M-45"
        ],
        "dosePerAcre": "600-800 grams",
        "dosePerLitre": "2.5 - 3.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 7,
        "toxicityLevel": "Green (Slightly Toxic)",
        "instructions": "Spray thoroughly covering upper and underside of leaves during morning or late afternoon."
      },
      {
        "activeIngredient": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC",
        "brandNames": [
          "Amistar Top",
          "Custodia"
        ],
        "dosePerAcre": "200 ml",
        "dosePerLitre": "1.0 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 5,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic and curative action. Apply at the first appearance of leaf spots."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Neem Seed Kernel Extract (NSKE 5%) or 10,000 ppm Neem Oil",
        "dosePerAcre": "1000 ml",
        "dosePerLitre": "5 ml / L + 1 ml natural soap emulsifier",
        "preparation": "Crush 50g neem seeds per litre of water or mix cold-pressed pure neem oil with soap nut (reetha) water. Spray once every 7-10 days.",
        "benefits": "Inhibits fungal spore germination and repels carrier insects without harming beneficial pollinators."
      },
      {
        "name": "Trichoderma viride / harzianum (Bio-Fungicide)",
        "dosePerAcre": "1000 grams / 2.5 kg with 50kg farmyard manure",
        "dosePerLitre": "5 - 10 g / L for foliar spray",
        "preparation": "Mix with well-rotted cow dung compost and apply to root zone or spray on foliage during overcast days.",
        "benefits": "Antagonistic beneficial fungus that colonizes plant tissues and feeds on pathogenic Alternaria mycelium."
      },
      {
        "name": "Sour Buttermilk (Sour Curd) Spray",
        "dosePerAcre": "5 Litres diluted in 150 Litres water",
        "dosePerLitre": "30 - 40 ml / L",
        "preparation": "Ferment 5 liters of cow curd/buttermilk in a copper or mud pot for 7 days until highly acidic. Dilute with water.",
        "benefits": "Lactic acid bacteria suppresses fungal spores and acts as a mild organic plant tonic."
      }
    ],
    "preventionMethods": [
      "Practice 3-year crop rotation avoiding Solanaceous crops (potato, brinjal, tomato).",
      "Maintain adequate plant spacing (60 x 45 cm) to encourage air circulation.",
      "Use drip irrigation to keep foliage dry and minimize leaf wetness duration.",
      "Stake plants and mulch soil with dry straw to prevent soil-splashing of fungal spores."
    ]
  },
  {
    "id": "cotton_pink_bollworm",
    "crop": "Cotton",
    "crop_te": "పత్తి",
    "crop_hi": "कपास",
    "name": "Pink Bollworm Infestation",
    "name_te": "గులాబీ రంగు కాయ తొలుచు పురుగు",
    "name_hi": "गुलाबी सुंडी (पिंक बॉलवर्म)",
    "type": "pest",
    "pathogenType": "Insect Larvae",
    "scientificName": "Pectinophora gossypiella",
    "severityLevel": "High to Severe",
    "symptoms": [
      "Rosetted flower appearance ('rosette flowers') that fail to open normally",
      "Bored holes in young green bolls plugged with larval frass",
      "Stained lint, destroyed cotton seeds, and premature boll shedding"
    ],
    "symptoms_te": [
      "వికసించని 'గులాబీ ఆకారపు పువ్వులు' (రోసెట్ పూలు)",
      "పత్తి కాయలపై రంధ్రాలు మరియు మలం మిగిలి ఉండటం",
      "దూది పాడైపోవడం మరియు గింజలు దెబ్బతినడం"
    ],
    "symptoms_hi": [
      "फूलों का गुलाब की कली जैसा बंद रहना (रोसेट फूल)",
      "हरी गूलरों में छेद और अंदर सुंडी द्वारा खाया हुआ मल",
      "कपास की गुणवत्ता खराब होना और गूलर का समय से पहले गिरना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Chlorantraniliprole 18.5% SC",
        "brandNames": [
          "Coragen",
          "Cover"
        ],
        "dosePerAcre": "60 ml",
        "dosePerLitre": "0.3 - 0.4 ml / L",
        "waterPerAcre": "150-200 Litres",
        "phiDays": 21,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Rynaxypyr molecule disrupts calcium channels of caterpillars. Best sprayed during egg hatch stage."
      },
      {
        "activeIngredient": "Emamectin Benzoate 5% SG",
        "brandNames": [
          "Proclaim",
          "EM-1"
        ],
        "dosePerAcre": "80-100 grams",
        "dosePerLitre": "0.5 g / L",
        "waterPerAcre": "150-200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Translaminar action controls internal larvae feeding within buds and young bolls."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Pheromone Trap Installation (Gossyplure Lure)",
        "dosePerAcre": "8 to 10 traps / acre",
        "dosePerLitre": "N/A",
        "preparation": "Install yellow delta or sleeve traps at canopy height. Replace rubber septa lures every 25 days.",
        "benefits": "Mass trapping of male moths and precision monitoring to prevent egg laying on flowers."
      },
      {
        "name": "Trichogramma bactrae Egg Parasitoid Cards",
        "dosePerAcre": "60,000 parasitoids (3 tricho-cards) / acre",
        "dosePerLitre": "N/A",
        "preparation": "Staple egg cards under leaf surfaces at 7-day intervals starting from 45 days after sowing.",
        "benefits": "Tiny beneficial wasps lay eggs inside bollworm eggs, parasitizing and killing them before hatching."
      },
      {
        "name": "Brahmastra (Cow Urine + 5 Bitter Leaf Extract)",
        "dosePerAcre": "2 to 2.5 Litres diluted in 150L water",
        "dosePerLitre": "15 - 20 ml / L",
        "preparation": "Boil cow urine with neem, custard apple, papaya, lantana, and guava leaves. Filter and spray.",
        "benefits": "Strong repulsive smell and bitter alkaloids stop moth oviposition and stun young larvae."
      }
    ],
    "preventionMethods": [
      "Avoid extending the cotton crop beyond 150-160 days (terminate ratoon crop).",
      "Destroy and burn shed flowers, squares, and dried bolls containing diapause larvae.",
      "Install light traps (1 per 5 acres) between 7 PM and 10 PM during flowering.",
      "Grow okra or castor as trap crops along field borders to monitor moth influx."
    ]
  },
  {
    "id": "rice_blast",
    "crop": "Paddy / Rice",
    "crop_te": "వరి",
    "crop_hi": "धान",
    "name": "Rice Blast Disease (Neck & Leaf Blast)",
    "name_te": "వరి అగ్గితెగులు (బ్లాస్ట్ వ్యాధి)",
    "name_hi": "धान का झोंका रोग (ब्लास्ट)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Magnaporthe oryzae (Pyricularia oryzae)",
    "severityLevel": "Severe to Critical",
    "symptoms": [
      "Spindle-shaped elliptical lesions with grey/ash-colored centers and dark brown borders on leaves",
      "Blackish-brown rotting at the panicle neck (Neck Blast) causing empty chaffy grains",
      "Severe foliar blighting giving a burnt or scorched appearance to the entire paddy field"
    ],
    "symptoms_te": [
      "ఆకులపై కంటి లేదా కండె ఆకారపు మచ్చలు, బూడిద రంగు మధ్యభాగం మరియు గోధుమ రంగు అంచులు",
      "కంకి మెడ వద్ద నల్లబడి విరిగిపోవడం (మెడ విరుపు తెగులు), తాలు గింజలు రావడం",
      "చేను మొత్తం మంటల్లో కాలినట్లుగా ఎండిపోయి కనిపించడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर आंख या धुरी के आकार के धब्बे जिनका केंद्र राख जैसे रंग का और किनारे भूरे होते हैं",
      "बाली की गर्दन पर कालापन और सड़न (गर्दन तोड़ रोग) जिससे दाने नहीं भरते",
      "खेत ऐसा दिखता है मानो आग से झुलस गया हो"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Tricyclazole 75% WP",
        "brandNames": [
          "Beam",
          "Baan",
          "Sivic"
        ],
        "dosePerAcre": "120-160 grams",
        "dosePerLitre": "0.6 - 0.8 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 30,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Gold standard systemic fungicide for rice blast. Inhibits melanin biosynthesis of fungal appressoria. Spray at tillering and boot leaf stage."
      },
      {
        "activeIngredient": "Isoprothiolane 40% EC",
        "brandNames": [
          "Fuji-one",
          "Blast-off"
        ],
        "dosePerAcre": "300 ml",
        "dosePerLitre": "1.5 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 21,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Absorbed through roots and leaves; provides curative protection against both leaf and neck blast."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Pseudomonas fluorescens (Bio-Control Agent)",
        "dosePerAcre": "1000 grams / acre",
        "dosePerLitre": "5 - 10 g / L",
        "preparation": "Dissolve 1kg talc formulation in 200L water with 100ml jaggery syrup as food source. Spray during cloudy afternoon.",
        "benefits": "Colonizes the phyllosphere and secretes phenazine antibiotics that stop Magnaporthe spore germination."
      },
      {
        "name": "Casuarina / Eucalyptus Leaf Aqueous Extract",
        "dosePerAcre": "5 Litres extract / acre",
        "dosePerLitre": "25 ml / L",
        "preparation": "Boil 5kg fresh Casuarina needle leaves in 10L water for 45 mins. Dilute to 200 Litres.",
        "benefits": "Rich in polyphenols and tannins which strengthen silica deposition in rice leaf epidermal walls."
      },
      {
        "name": "Wood Ash & Slaked Lime Dusting",
        "dosePerAcre": "20 kg ash + 2 kg lime / acre",
        "dosePerLitre": "Dry foliar dusting",
        "preparation": "Mix fine dry wood ash with slaked lime and dust early morning when dew is present on paddy leaves.",
        "benefits": "Increases leaf surface pH above 8.5, creating a hostile environment for blast spores."
      }
    ],
    "preventionMethods": [
      "Avoid excessive nitrogen fertilizer application; split urea into 3-4 split doses rather than heavy basal doses.",
      "Maintain continuous shallow water layer (2-3 cm) in fields; drought stress drastically increases blast susceptibility.",
      "Seed treatment with Pseudomonas fluorescens @ 10g/kg seed or Carbendazim @ 2g/kg seed before sowing.",
      "Plant blast-tolerant regional paddy cultivars (e.g., MTU 1010, BPT 5204 tolerant crosses)."
    ]
  },
  {
    "id": "chilli_leaf_curl",
    "crop": "Chilli",
    "crop_te": "మిరప",
    "crop_hi": "मिर्च",
    "name": "Chilli Leaf Curl & Murda Disease",
    "name_te": "మిరప ఆకు ముడత (బొబ్బెర / ముర్దా తెగులు)",
    "name_hi": "मिर्च का पर्ण कुंचन (मुरड़ा रोग)",
    "type": "disease",
    "pathogenType": "Viral & Vector Pest Complex",
    "scientificName": "Chilli Leaf Curl Virus (ChiLCV) vectored by Bemisia tabaci / Thrips parvispinus",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Upward curling and boat-like cupping of leaves caused by thrips feeding",
      "Downward curling and crinkling caused by yellow mite infestation",
      "Stunted bushy plant growth with shortened internodes and severe flower abortion"
    ],
    "symptoms_te": [
      "ఆకులు పైకి దోనె ఆకారంలో ముడుచుకుపోవడం (తామర పురుగుల దాడి వల్ల)",
      "ఆకులు కిందికి ముడుచుకుని దళసరిగా మారడం (నల్లి దాడి వల్ల)",
      "మొక్కలు గిడసబారిపోయి పూత పిందె రాలిపోవడం"
    ],
    "symptoms_hi": [
      "पत्तियों का नाव के आकार में ऊपर की ओर मुड़ना (थ्रिप्स के कारण)",
      "पत्तियों का नीचे की ओर मुड़ना और मोटा होना (माइट्स के कारण)",
      "पौधे का कद छोटा रह जाना और फूलों का झड़ना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Fipronil 5% SC",
        "brandNames": [
          "Regent",
          "Mahaveer"
        ],
        "dosePerAcre": "350-400 ml",
        "dosePerLitre": "1.5 - 2.0 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 7,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Broad-spectrum GABA-inhibitor pesticide targeting invasive black thrips (Thrips parvispinus)."
      },
      {
        "activeIngredient": "Diafenthiuron 50% WP",
        "brandNames": [
          "Pegasus",
          "Derby"
        ],
        "dosePerAcre": "250 grams",
        "dosePerLitre": "1.25 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Photoconverted into carbodiimide compound on sunlight exposure; highly lethal to both mites and nymphs."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Agniastra Bio-Pesticide (Cow Urine + Garlic + Green Chilli + Ginger)",
        "dosePerAcre": "2.5 Litres diluted in 150L water",
        "dosePerLitre": "15 - 20 ml / L",
        "preparation": "Boil crushed garlic (500g), spicy green chillies (500g), ginger (250g), and neem leaves (2kg) in 15L cow urine. Ferment 48 hours.",
        "benefits": "Capsaicin and allicin vapor destroy soft exoskeletons of sucking thrips and whiteflies."
      },
      {
        "name": "Blue & Yellow Sticky Traps Combination",
        "dosePerAcre": "30 traps/acre (15 Blue for Thrips + 15 Yellow for Whitefly)",
        "dosePerLitre": "Physical Installation",
        "preparation": "Hang sticky sheets at 15 cm above crop canopy. Clean dust and reapply insect glue every 15 days.",
        "benefits": "Blue wavelength is specifically attractive to Frankliniella & Thrips parvispinus species."
      },
      {
        "name": "Lecanicillium lecanii (Verticillium lecanii) Bio-Agent",
        "dosePerAcre": "1000 grams / acre",
        "dosePerLitre": "5 g / L",
        "preparation": "Mix entomopathogenic fungal spores with water and 1ml sunflower oil spreader. Spray at twilight.",
        "benefits": "Fungal mycelium penetrates thrips body and consumes internal fluids within 48 to 72 hours."
      }
    ],
    "preventionMethods": [
      "Erect 2-3 border rows of tall barrier crops like maize, sorghum, or pearl millet 20 days prior to chilli transplanting.",
      "Silver-black plastic mulching (25-30 microns) reflects UV radiation and deters whitefly and thrips landing.",
      "Regularly uproot and burn virus-infected plants showing severe chlorotic leaf curl to stop secondary spread.",
      "Avoid excess nitrogenous fertilizers which promote tender succulent shoots beloved by sucking pests."
    ]
  },
  {
    "id": "fall_armyworm_maize",
    "crop": "Corn / Maize",
    "crop_te": "మొక్కజొన్న",
    "crop_hi": "मक्का",
    "name": "Fall Armyworm (FAW)",
    "name_te": "మొక్కజొన్న కత్తెర పురుగు",
    "name_hi": "मक्का का फॉल आर्मीवर्म",
    "type": "pest",
    "pathogenType": "Invasive Lepidopteran Caterpillar",
    "scientificName": "Spodoptera frugiperda",
    "severityLevel": "Severe to Critical",
    "symptoms": [
      "Elongated papery semi-transparent patches ('windowpaning') on young whorl leaves",
      "Ragged shot holes and saw-dust-like larval fecal pellets (frass) packed deep inside leaf whorls",
      "Complete destruction of central growing tip (dead heart) and bored developing cobs"
    ],
    "symptoms_te": [
      "సుడులలో ఆకులు కొరికి వేయడం మరియు అద్దం లాంటి కిటికీ మచ్చలు ఏర్పడటం",
      "సుడి లోపల పిండి లాంటి పురుగు మలం (విసర్జితం) ఎక్కువగా కనిపించడం",
      "మొక్క ఎదగకుండా మొవ్వు చనిపోవడం మరియు కంకులపై రంధ్రాలు చేయడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर पारदर्शी खिड़कियों जैसे धब्बे (विंडोपेन लक्षण)",
      "पत्तियों के चक्र (व्होर्ल) में लकड़ी के बुरादे जैसा सुंडी का मल भरा होना",
      "पौधे का मुख्य सिरा नष्ट हो जाना (डेड हार्ट) और भुट्टों में छेद"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Spinetoram 11.7% SC",
        "brandNames": [
          "Delegate",
          "Largo"
        ],
        "dosePerAcre": "180 ml",
        "dosePerLitre": "0.9 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Derived from Saccharopolyspora spinosa fermentation. Direct nozzle spray directly into the whorls using knapsack sprayer with solid cone nozzle."
      },
      {
        "activeIngredient": "Chlorantraniliprole 18.5% SC",
        "brandNames": [
          "Coragen"
        ],
        "dosePerAcre": "80 ml",
        "dosePerLitre": "0.4 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 21,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Systemic translaminar protection; effective against 1st to 3rd instar FAW larvae."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Dry Soil / Wood Ash Application into Whorls",
        "dosePerAcre": "10-15 kg fine sieved river sand or wood ash",
        "dosePerLitre": "Pinch application per whorl",
        "preparation": "Drop a small pinch of dry fine sand mixed with lime or ash into each maize whorl.",
        "benefits": "Abrasive silica particles irritate caterpillar cuticles and disrupt feeding without chemical residues."
      },
      {
        "name": "Bacillus thuringiensis kurstaki (Bt - 55000 IU/mg)",
        "dosePerAcre": "400 grams / acre",
        "dosePerLitre": "2 g / L",
        "preparation": "Mix Bt powder with lukewarm water and 0.5g jaggery. Spray directly targeting central whorls.",
        "benefits": "Bt delta-endotoxin dissolves in caterpillar alkaline gut, causing fatal gut paralysis within 48h."
      },
      {
        "name": "Beauveria bassiana (1x10^8 CFU/g)",
        "dosePerAcre": "1000 grams / acre",
        "dosePerLitre": "5 g / L",
        "preparation": "Mix formulation with 200L water and spray during evening hours when humidity is above 70%.",
        "benefits": "White muscardine fungus sprouts inside caterpillar haemolymph, producing white fungal bloom."
      }
    ],
    "preventionMethods": [
      "Deep summer ploughing to expose pupae in soil to scorching sunlight and predatory birds.",
      "Seed treatment with Cyantraniliprole 19.8% + Thiamethoxam 19.8% FS @ 6 ml/kg seed protects seedlings for 20-25 days.",
      "Intercrop maize with cowpea, pigeon pea, or Desmodium (push-pull strategy).",
      "Deploy FAW pheromone traps @ 5 per acre within 10 days of seedling emergence."
    ]
  },
  {
    "id": "sugarcane_red_rot",
    "crop": "Sugarcane",
    "crop_te": "చెరకు",
    "crop_hi": "गन्ना",
    "name": "Red Rot of Sugarcane",
    "name_te": "చెరకు ఎర్ర కుళ్లు తెగులు (క్యాన్సర్ వ్యాధి)",
    "name_hi": "गन्ने का लाल सड़न रोग (रेड रॉट)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Colletotrichum falcatum",
    "severityLevel": "Critical",
    "symptoms": [
      "Yellowing and drying of crown leaves from margins inward (withering top)",
      "Longitudinal splitting reveals crimson red internal pith with distinctive white transverse bands",
      "Alcoholic fermentation / sour wine odor from diseased split stalks and hollow stems"
    ],
    "symptoms_te": [
      "పై ఆకులు అంచుల నుండి పసుపు రంగులోకి మారి ఎండిపోవడం (సుడి ఎండటం)",
      "గడలను నిలువుగా చీల్చినప్పుడు ఎర్రటి రంగు మరియు తెల్లటి అడ్డ మచ్చలు కనిపించడం",
      "చెరకు గడ నుండి పులిసిన మద్యం లాంటి వాసన రావడం మరియు గడలు డొల్లగా మారడం"
    ],
    "symptoms_hi": [
      "ऊपरी पत्तियों का किनारों से सूखना और पीला पड़ना",
      "गन्ने को चीरने पर अंदर लाल गूदा और सफेद आड़े धब्बे दिखाई देना",
      "गन्ने से खट्टी शराब या सिरके जैसी दुर्गंध आना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Thiophanate Methyl 70% WP",
        "brandNames": [
          "Topsin-M",
          "Roko"
        ],
        "dosePerAcre": "400 grams",
        "dosePerLitre": "2.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 28,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Sett dip treatment for 15 minutes prior to planting, or soil drenching along furrow lines."
      },
      {
        "activeIngredient": "Carbendazim 50% WP",
        "brandNames": [
          "Bavistin",
          "Derosal"
        ],
        "dosePerAcre": "300 grams",
        "dosePerLitre": "1.5 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 30,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic benzimidazole fungicide. Dip seed cane setts in 0.1% solution."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Trichoderma harzianum Sett Dipping",
        "dosePerAcre": "2.5 kg / acre",
        "dosePerLitre": "10 g / L water slurry",
        "preparation": "Mix Trichoderma in water slurry with 1kg cow dung compost. Soak 3-budded setts for 30 minutes before planting.",
        "benefits": "Fungal antagonist forms protective mantle over cane cuts, preventing Colletotrichum hyphae entry."
      },
      {
        "name": "Moist Hot Air Therapy (MHAT) of Seed Setts",
        "dosePerAcre": "Physical Sett Treatment",
        "dosePerLitre": "Thermal process: 54°C for 2.5 hours",
        "preparation": "Treat seed cane setts in specialized MHAT chamber prior to nursery planting.",
        "benefits": "Heat destroys deep mycelium within vascular bundles without damaging dormant buds."
      },
      {
        "name": "Jeevamrutha Furrow Application",
        "dosePerAcre": "200 Litres / acre via drip or furrow flooding",
        "dosePerLitre": "Pure fermented formulation",
        "preparation": "Ferment cow dung (10kg), urine (10L), jaggery (2kg), pulse flour (2kg) and forest soil for 4 days.",
        "benefits": "Multiplies beneficial soil microbes that outcompete and suppress resting chlamydospores."
      }
    ],
    "preventionMethods": [
      "Select only healthy certified seed cane from disease-free breeder seed nurseries.",
      "Practice 2-year crop rotation with paddy or green manure crops (sunn hemp / daincha) to starve spores.",
      "Avoid ratooning of infected sugarcane crops; completely uproot and burn dry stubble.",
      "Ensure laser leveling and avoid stagnation of irrigation water across sugarcane fields."
    ]
  },
  {
    "id": "tomato_healthy",
    "crop": "Tomato",
    "crop_te": "టమోటా",
    "crop_hi": "टमाटर",
    "name": "Healthy Plant & Vigorous Foliage",
    "name_te": "ఆరోగ్యకరమైన మొక్క & పచ్చని ఆకులు",
    "name_hi": "स्वस्थ पौधा एवं हरी पत्तियां",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Solanum lycopersicum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform vibrant green leaf canopy with active chlorophyll synthesis",
      "Clean leaf lamina with zero necrotic rings, spots, or viral curling",
      "Sturdy apical growth with abundant healthy flowering trusses"
    ],
    "symptoms_te": [
      "ఆకులన్నీ పచ్చగా, ఏ విధమైన మచ్చలు లేదా ముడతలు లేకుండా ఆరోగ్యంగా ఉండటం",
      "మొక్క ఏపుగా పెరిగి పుష్కలంగా పూత, పిందెలు ఏర్పడటం",
      "తెగుళ్లు లేదా పురుగుల దాడి లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा एवं चमकदार रंग, बिना किसी धब्बे या सिकुड़न के",
      "पौधे की उत्कृष्ट वानस्पतिक वृद्धि और स्वस्थ फूल",
      "किसी भी प्रकार के कीट या फफूंद से पूर्णतः मुक्त"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Chelated Micronutrient Fertilizer (Zn, Fe, Mn, B, Cu)",
        "brandNames": [
          "Multiplex Multimin",
          "Tracel-7"
        ],
        "dosePerAcre": "500 grams",
        "dosePerLitre": "2.5 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Non-Toxic Plant Nutrient)",
        "instructions": "Foliar spray to maintain balanced physiological health and flower retention."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional formulation of cow dung, urine, milk, curd, ghee, sugarcane juice, and tender coconut water.",
        "benefits": "Rich in beneficial microbial flora, auxins, and gibberellins that boost plant immunity and yield."
      },
      {
        "name": "Jeevamrutha Soil Drenching",
        "dosePerAcre": "200 Litres / acre via irrigation",
        "dosePerLitre": "Pure fermented formulation",
        "preparation": "Ferment cow dung, urine, gram flour, jaggery, and rhizosphere soil for 48 hours.",
        "benefits": "Activates indigenous earthworms and nutrient-solubilizing soil microorganisms."
      }
    ],
    "preventionMethods": [
      "Maintain consistent drip irrigation scheduling to prevent water stress.",
      "Prune bottom leaves touching the soil surface to maintain air circulation.",
      "Apply prophylactic neem oil spray (10,000 ppm) every 14 days to deter incoming pests."
    ]
  },
  {
    "id": "cotton_healthy",
    "crop": "Cotton",
    "crop_te": "పత్తి",
    "crop_hi": "कपास",
    "name": "Healthy Cotton Canopy & Squares",
    "name_te": "ఆరోగ్యకరమైన పత్తి తోట & కాయలు",
    "name_hi": "स्वस्थ कपास फसल एवं गूलर",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Gossypium hirsutum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Lush broad palmate green leaves without curling or chlorotic yellow edges",
      "Intact developing green bolls and squares without entrance bore-holes or frass",
      "Strong monopodial and sympodial branch formation"
    ],
    "symptoms_te": [
      "ఆకులు వెడల్పుగా పచ్చగా ఉండి, రసం పీల్చే పురుగుల ప్రభావం లేకపోవడం",
      "పూత మరియు కాయలపై ఎలాంటి పురుగు రంధ్రాలు లేకుండా స్వచ్ఛంగా ఉండటం",
      "మొక్క బలంగా శాఖోపశాఖలుగా ఎదగడం"
    ],
    "symptoms_hi": [
      "चौड़ी और स्वस्थ हरी पत्तियां, बिना किसी रस चूसक कीट के प्रभाव के",
      "बिना किसी सुंडी छेद के स्वस्थ फूल एवं फल (गूलर)",
      "पौधे का संतुलित विकास"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Soluble NPK 19:19:19 + Boron 20%",
        "brandNames": [
          "Polyfeed 19-19-19",
          "Borax 20"
        ],
        "dosePerAcre": "1000 grams",
        "dosePerLitre": "5.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Foliar Nutrition)",
        "instructions": "Spray during square formation and boll development for heavy boll weight."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Dashaparni Kashayam Preventive Spray",
        "dosePerAcre": "2 Litres / acre in 150L water",
        "dosePerLitre": "15 ml / L",
        "preparation": "Extract of 10 herbal leaves (neem, custard apple, pongamia, papaya, vitex, etc.) fermented in cow urine.",
        "benefits": "Creates natural herbal resistance against sucking insects and early bollworm egg-laying."
      }
    ],
    "preventionMethods": [
      "Install yellow and blue sticky traps at canopy level as early alert sentinels.",
      "Mount pheromone traps (5/acre) to monitor bollworm moth activity."
    ]
  },
  {
    "id": "rice_healthy",
    "crop": "Paddy / Rice",
    "crop_te": "వరి",
    "crop_hi": "धान",
    "name": "Healthy Paddy Tillers & Panicles",
    "name_te": "ఆరోగ్యకరమైన వరి పైరు & వెన్నులు",
    "name_hi": "स्वस्थ धान की फसल एवं बालियां",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Oryza sativa (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform emerald-green erect leaf blades free of spindle blast lesions",
      "Clean leaf sheaths with zero water-soaked spots or hopper burn",
      "Strong tillering capacity with heavy filled grain panicles"
    ],
    "symptoms_te": [
      "వరి ఆకులు పచ్చగా నిటారుగా ఉండి, అగ్గితెగులు మచ్చలు లేకపోవడం",
      "పిలకలు ఎక్కువగా వచ్చి మొదళ్లు స్వచ్ఛంగా ఉండటం",
      "గింజలు నిండుగా పాలుపోసుకుని బరువుగా మారడం"
    ],
    "symptoms_hi": [
      "धान की पत्तियां पूरी तरह हरी एवं ब्लास्ट धब्बों से मुक्त",
      "अधिक कल्ले (टिलर्स) एवं मजबूत तने",
      "स्वस्थ एवं दानों से भरी बालियां"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Zinc Sulphate Heptahydrate (Zn 21%)",
        "brandNames": [
          "Zinc-21",
          "Ankur Zinc"
        ],
        "dosePerAcre": "10 kg basal or 1 kg foliar",
        "dosePerLitre": "5.0 g / L (foliar)",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Mineral Micronutrient)",
        "instructions": "Prevents Khaira disease and promotes vigorous enzymatic chlorophyll synthesis."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Azospirillum & PSB Bio-Fertilizer Consortia",
        "dosePerAcre": "2 kg / acre mixed in 50kg farmyard manure",
        "dosePerLitre": "Soil application",
        "preparation": "Broadcast over moist soil during active tillering stage.",
        "benefits": "Fixes atmospheric nitrogen and solubilizes native soil phosphorus for deep root expansion."
      }
    ],
    "preventionMethods": [
      "Maintain intermittent wetting and drying (AWD) water management to aerate root systems.",
      "Avoid excessive single-dose urea applications."
    ]
  },
  {
    "id": "chilli_healthy",
    "crop": "Chilli",
    "crop_te": "మిరప",
    "crop_hi": "मिर्च",
    "name": "Healthy Chilli Foliage & Blooms",
    "name_te": "ఆరోగ్యకరమైన మిరప తోట & పూత",
    "name_hi": "स्वस्थ मिर्च की फसल एवं फूल",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Capsicum annuum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Glossy flat dark green leaves with smooth margins and zero curling",
      "Abundant white floral buds with strong petal attachment",
      "Vigorous branching with healthy elongated shiny green pods"
    ],
    "symptoms_te": [
      "ఆకులు ముడత లేకుండా వెడల్పుగా, నిగనిగలాడుతూ ఉండటం",
      "పూత రాలకుండా పిందెలు విరివిగా కట్టడం",
      "కాయలు పొడవుగా నాణ్యమైన మెరుపుతో పెరగడం"
    ],
    "symptoms_hi": [
      "चमकदार सपाट हरी पत्तियां, बिना किसी मरोड़िया रोग के",
      "प्रचुर मात्रा में फूल और फल लगना",
      "पौधे का सर्वांगीण उत्तम विकास"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Calcium Nitrate 15.5:0:0 + Boron 0.2%",
        "brandNames": [
          "YaraLiva Nitrabor",
          "Cal-Bor"
        ],
        "dosePerAcre": "1000 grams",
        "dosePerLitre": "5.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Foliar Calcium Nutrition)",
        "instructions": "Strengthens cell wall pectin and stops blossom drop."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Fermented Sour Buttermilk + Reetha Spray",
        "dosePerAcre": "4 Litres in 150L water",
        "dosePerLitre": "25 ml / L",
        "preparation": "Ferment cow buttermilk with a pinch of turmeric for 5 days. Spray during late afternoon.",
        "benefits": "Lactic flora coats leaves, preventing pathogen adherence while providing natural organic nitrogen."
      }
    ],
    "preventionMethods": [
      "Maintain border barrier crops of maize or sorghum to block incoming thrips swarms.",
      "Use silver-black mulching to suppress weeds and insect reflection."
    ]
  },
  {
    "id": "maize_healthy",
    "crop": "Corn / Maize",
    "crop_te": "మొక్కజొన్న",
    "crop_hi": "मक्का",
    "name": "Healthy Maize Crop & Silks",
    "name_te": "ఆరోగ్యకరమైన మొక్కజొన్న & కంకులు",
    "name_hi": "स्वस्थ मक्का एवं भुट्टे",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Zea mays (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Broad, thick, dark green leaves with crisp margins and zero shot holes",
      "Central whorl clean and free from caterpillar sawdust frass",
      "Well-developed central cobs with fresh golden silking"
    ],
    "symptoms_te": [
      "ఆకులపై పురుగు తిన్న రంధ్రాలు లేదా మచ్చలు లేకుండా శుభ్రంగా ఉండటం",
      "సుడిలో కత్తెర పురుగు మలం లేకుండా మొవ్వు బలంగా ఉండటం",
      "కంకులు లావుగా గింజలతో నిండుగా పెరగడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर बिना किसी छेद या कीट क्षति के स्वच्छ हरी पत्तियां",
      "अंदरूनी चक्र में फॉल आर्मीवर्म का कोई निशान न होना",
      "स्वस्थ एवं बड़े भुट्टे"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Water Soluble NPK 13:00:45 (Potassium Nitrate)",
        "brandNames": [
          "K-Plus",
          "Multi-K"
        ],
        "dosePerAcre": "1000 grams",
        "dosePerLitre": "5.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Foliar Potassium)",
        "instructions": "Spray at cob initiation stage for kernel boldness."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Trichogramma chilonis Egg Parasitoid Cards",
        "dosePerAcre": "2 cards (40,000 parasitoids / acre)",
        "dosePerLitre": "Field Bio-Release",
        "preparation": "Staple parasitoid egg cards under maize leaf surface at 10-day intervals.",
        "benefits": "Beneficial micro-wasps seek and destroy pest caterpillar eggs before they can hatch."
      }
    ],
    "preventionMethods": [
      "Maintain field sanitation and intercrop with cowpea or pigeon pea.",
      "Monitor whorls weekly during early vegetative stages."
    ]
  },
  {
    "id": "sugarcane_healthy",
    "crop": "Sugarcane",
    "crop_te": "చెరకు",
    "crop_hi": "गन्ना",
    "name": "Healthy Sugarcane Stalks",
    "name_te": "ఆరోగ్యకరమైన చెరకు గడలు",
    "name_hi": "स्वस्थ गन्ना फसल",
    "type": "disease",
    "pathogenType": "None - Optimal Botanical Health",
    "scientificName": "Saccharum officinarum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Deep green fibrous top canopy with zero yellowing crown tips",
      "Thick, solid, juicy cane stalks without internal reddening or hollow cavities",
      "Uniform internode elongation and firm root anchoring"
    ],
    "symptoms_te": [
      "పై ఆకులు పచ్చగా నిగనిగలాడుతూ ఉండటం",
      "గడలు దృఢంగా, తీపి రసంతో బరువుగా ఉండటం",
      "ఎర్ర కుళ్లు తెగులు లేదా పులిసిన వాసన లేకుండా ఉండటం"
    ],
    "symptoms_hi": [
      "गन्ने की ऊपरी पत्तियां पूरी तरह हरी एवं स्वस्थ",
      "मोटे, ठोस एवं रसदार गन्ने के तने",
      "किसी भी प्रकार के आंतरिक लाल सड़न से पूर्णतः मुक्त"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Ferrous Sulphate 19% + Urea",
        "brandNames": [
          "Green Iron",
          "Fe-Chelate"
        ],
        "dosePerAcre": "1000 grams FeSO4 + 1000g Urea",
        "dosePerLitre": "5.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 0,
        "toxicityLevel": "Green (Micro-Mineral Foliar)",
        "instructions": "Corrects iron chlorosis and intensifies photosynthesis in alkaline calcareous soils."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Vermiwash & Enriched Cow Dung Slurry",
        "dosePerAcre": "50 Litres / acre via furrow irrigation",
        "dosePerLitre": "Soil application",
        "preparation": "Collect vermiwash from active earthworm beds, dilute with fresh water and apply to root zone.",
        "benefits": "Supplies humic acids, vitamins, and beneficial plant growth enzymes."
      }
    ],
    "preventionMethods": [
      "Plant only certified disease-free setts from registered nurseries.",
      "Ensure proper drainage during heavy monsoon showers."
    ]
  },
  {
    "id": "wheat_rust",
    "crop": "Wheat",
    "crop_te": "గోధుమ",
    "crop_hi": "गेहूं",
    "name": "Yellow / Stripe Rust of Wheat",
    "name_te": "గోధుమ పసుపు రంగు కుంకుమ తెగులు",
    "name_hi": "गेहूं का पीला रतुआ (स्ट्राइप रस्ट)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Puccinia striiformis",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Bright yellow, powdery pustules arranged in characteristic linear stripes along leaf veins",
      "Powdery yellow spores rubbing off easily on fingertips or clothing",
      "Chlorotic and necrotic stripes leading to premature leaf desiccation and shriveled grain"
    ],
    "symptoms_te": [
      "ఆకుల ఈనెల వెంబడి వరుసలుగా పసుపు రంగు పొడి లాంటి బుడిపెలు ఏర్పడటం",
      "చేతితో తాకినప్పుడు వేళ్లకు పసుపు రంగు పౌడర్ అంటుకోవడం",
      "ఆకులు ఎండిపోయి గింజలు ముడుచుకుపోవడం"
    ],
    "symptoms_hi": [
      "पत्तियों की नसों के समानांतर चमकीले पीले पाउडर जैसी धारियां बनना",
      "हाथ लगाने पर उंगलियों पर पीले रंग का चूर्ण लगना",
      "पत्तियों का जल्दी सूखना और दानों का बारीक रह जाना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Propiconazole 25% EC",
        "brandNames": [
          "Tilt",
          "Bumper"
        ],
        "dosePerAcre": "200 ml",
        "dosePerLitre": "1.0 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 30,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic triazole fungicide. Spray at the very first appearance of yellow pustule stripes."
      },
      {
        "activeIngredient": "Tebuconazole 25.9% EC",
        "brandNames": [
          "Folicur",
          "Orius"
        ],
        "dosePerAcre": "250 ml",
        "dosePerLitre": "1.25 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 28,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Broad-spectrum curative action that stops spore sporulation and mycelium growth."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Fermented Sour Curd + Garlic Extract",
        "dosePerAcre": "5 Litres curd + 500g crushed garlic in 150L water",
        "dosePerLitre": "30 ml / L",
        "preparation": "Ferment sour curd for 7 days in a copper vessel with crushed garlic. Dilute and spray early morning.",
        "benefits": "Allicin vapor and copper lactate inhibit Puccinia urediniospore germination."
      }
    ],
    "preventionMethods": [
      "Sow rust-resistant wheat varieties recommended for the agro-climatic zone.",
      "Avoid delayed sowing which exposes crops to warm humid winds carrying spores."
    ]
  },
  {
    "id": "groundnut_tikka",
    "crop": "Groundnut",
    "crop_te": "వేరుశనగ",
    "crop_hi": "मूंगफली",
    "name": "Tikka Leaf Spot (Cercospora)",
    "name_te": "వేరుశనగ టిక్కా ఆకుమచ్చ తెగులు",
    "name_hi": "मूंगफली का टिक्का रोग (पत्ती धब्बा)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Cercospora arachidicola / Phaeoisariopsis personata",
    "severityLevel": "Moderate to High",
    "symptoms": [
      "Circular dark brown to black necrotic spots surrounded by a bright yellow halo",
      "Premature leaf yellowing, drying, and extensive defoliation leaving bare stems",
      "Poor pod filling and lightweight shriveled peanut kernels"
    ],
    "symptoms_te": [
      "ఆకులపై గుండ్రటి నల్లటి లేదా ముదురు గోధుమ రంగు మచ్చలు ఏర్పడి చుట్టూ పసుపు వలయం ఉండటం",
      "ఆకులు రాలిపోయి కేవలం కాండం మాత్రమే మిగలడం",
      "కాయల్లో గింజలు సరిగ్గా ఊరక తాలు కాయలు రావడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर गोल काले-भूरे धब्बे जिनके चारों तरफ पीला घेरा होता है",
      "पत्तियों का तेजी से पीला पड़कर गिर जाना",
      "फलियों में दाने छोटे एवं सिकुड़े रह जाना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Carbendazim 12% + Mancozeb 63% WP",
        "brandNames": [
          "Saaf",
          "Sixer"
        ],
        "dosePerAcre": "400 grams",
        "dosePerLitre": "2.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Green (Slightly Toxic)",
        "instructions": "Dual systemic and contact protection against both early and late leaf spot."
      },
      {
        "activeIngredient": "Hexaconazole 5% SC",
        "brandNames": [
          "Contaf Plus",
          "Sitara"
        ],
        "dosePerAcre": "400 ml",
        "dosePerLitre": "2.0 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 20,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Ergosterol biosynthesis inhibitor providing curative systemic eradication."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Neem Seed Kernel Extract (NSKE 5%)",
        "dosePerAcre": "1000 ml",
        "dosePerLitre": "5 ml / L",
        "preparation": "Soak 5kg powdered neem seeds in water overnight. Filter and mix with natural soap solution.",
        "benefits": "Foliar barrier disrupts Cercospora spore germination and repels leafhoppers."
      },
      {
        "name": "Trichoderma viride Bio-Fungicide",
        "dosePerAcre": "1000 grams / acre",
        "dosePerLitre": "5 g / L",
        "preparation": "Foliar spray during humid evening hours.",
        "benefits": "Suppresses Cercospora conidial load on canopy."
      }
    ],
    "preventionMethods": [
      "Seed treatment with Trichoderma @ 10g/kg seed or Thiram @ 3g/kg seed before sowing.",
      "Practice crop rotation avoiding continuous groundnut cultivation on the same plot."
    ]
  },
  {
    "id": "mango_anthracnose",
    "crop": "Mango",
    "crop_te": "మామిడి",
    "crop_hi": "आम",
    "name": "Anthracnose & Blossom Blight",
    "name_te": "మామిడి ఆంథ్రాక్నోస్ & పూత మాడ తెగులు",
    "name_hi": "आम का एन्थ्रेक्नोज एवं फूल झुलसा रोग",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Colletotrichum gloeosporioides",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Irregular dark brown to black necrotic spots with 'shot hole' tears on tender leaves",
      "Blackening and rapid withering of blossom panicles causing complete flower drop",
      "Circular sunken black spots developing on mature mango fruits leading to post-harvest rot"
    ],
    "symptoms_te": [
      "లేత ఆకులపై నల్లటి మచ్చలు ఏర్పడి ఆకులు చిల్లులు పడటం",
      "మామిడి పూత మాడిపోయి రాలిపోవడం (పూత మాడ తెగులు)",
      "కాయలపై నల్లటి గుంటల మచ్చలు ఏర్పడి కాయలు కుళ్లిపోవడం"
    ],
    "symptoms_hi": [
      "कोमल पत्तियों पर अनियमित काले-भूरे धब्बे और छेद होना",
      "बौर (फूलों के गुच्छे) का काला पड़कर सूख जाना",
      "फलों पर धंसे हुए काले धब्बे बनना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Copper Oxychloride 50% WP",
        "brandNames": [
          "Blitox",
          "Cupramar"
        ],
        "dosePerAcre": "600 grams",
        "dosePerLitre": "3.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Spray thoroughly targeting blossom panicles before flowers open and after fruit set."
      },
      {
        "activeIngredient": "Azoxystrobin 23% SC",
        "brandNames": [
          "Amistar",
          "Mirador"
        ],
        "dosePerAcre": "200 ml",
        "dosePerLitre": "1.0 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 7,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Strobilurin class fungicide with translaminar movement providing premium fruit finish."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Bordeaux Mixture (1%)",
        "dosePerAcre": "2 kg Copper Sulphate + 2 kg Slaked Lime in 200L water",
        "dosePerLitre": "Standard 1% formulation",
        "preparation": "Dissolve copper sulphate and slaked lime separately, mix together thoroughly and test with iron knife for neutral pH.",
        "benefits": "Time-tested broad-spectrum fungicidal wash that adheres tenaciously to leaves during rain."
      }
    ],
    "preventionMethods": [
      "Prune dead twigs, criss-crossing branches, and mummified fruits after harvest and burn them.",
      "Spray copper fungicide immediately after annual tree pruning to seal wounds."
    ]
  },
  {
    "id": "potato_healthy",
    "crop": "Potato",
    "crop_te": "బంగాళాదుంప",
    "crop_hi": "आलू",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Solanum tuberosum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "wheat_healthy",
    "crop": "Wheat",
    "crop_te": "గోధుమ",
    "crop_hi": "गेहूं",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Triticum aestivum (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "brinjal_healthy",
    "crop": "Brinjal / Eggplant",
    "crop_te": "వంకాయ",
    "crop_hi": "बैंगन",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Solanum melongena (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "okra_healthy",
    "crop": "Okra / Bhendi",
    "crop_te": "బెండకాయ",
    "crop_hi": "भिंडी",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Abelmoschus esculentus (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "mango_healthy",
    "crop": "Mango",
    "crop_te": "మామిడి",
    "crop_hi": "आम",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Mangifera indica (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "banana_healthy",
    "crop": "Banana",
    "crop_te": "అరటి",
    "crop_hi": "केला",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Musa acuminata (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "grapes_healthy",
    "crop": "Grapes",
    "crop_te": "ద్రాక్ష",
    "crop_hi": "अंगूर",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Vitis vinifera (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "apple_healthy",
    "crop": "Apple",
    "crop_te": "ఆపిల్",
    "crop_hi": "सेब",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Malus domestica (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "groundnut_healthy",
    "crop": "Groundnut / Peanut",
    "crop_te": "వేరుశనగ",
    "crop_hi": "मूंगफली",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Arachis hypogaea (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "soybean_healthy",
    "crop": "Soybean",
    "crop_te": "సోయాబీన్",
    "crop_hi": "सोयाबीन",
    "name": "Healthy Foliage & Optimal Growth",
    "name_te": "ఆరోగ్యకరమైన పచ్చని ఆకులు & ఏపుగా ఎదుగుదల",
    "name_hi": "स्वस्थ पत्तियां एवं उत्तम वृद्धि",
    "type": "healthy",
    "pathogenType": "None - Optimal Physiological Health",
    "scientificName": "Glycine max (Healthy)",
    "severityLevel": "Optimal / No Threat",
    "symptoms": [
      "Uniform leaf coloration with vigorous chlorophyll synthesis and turgid venation",
      "Clean leaf lamina free of fungal spots, viral mosaic mottling, or insect punctures",
      "Healthy vegetative canopy with robust node development"
    ],
    "symptoms_te": [
      "ఆకులు సహజ పచ్చదనంతో ఏ విధమైన తెగులు మచ్చలు లేదా రంధ్రాలు లేకుండా ఉండటం",
      "మొక్క ఏపుగా పెరిగి ఆరోగ్యకరమైన కొమ్మలు, మొగ్గలతో కళకళలాడటం",
      "పురుగులు లేదా సూక్ష్మజీవుల ముప్పు లేని సురక్షిత స్థితి"
    ],
    "symptoms_hi": [
      "पत्तियों का गहरा हरा रंग, बिना किसी धब्बे, सिकुड़न या कीट नुकसान के",
      "पौधे की उत्तम वानस्पतिक वृद्धि और मजबूत शाखाएं",
      "रोग एवं कीट मुक्त पूर्णतः स्वस्थ स्थिति"
    ],
    "chemicalRemedies": [],
    "naturalRemedies": [
      {
        "name": "Panchagavya Organic Bio-Stimulant Spray",
        "dosePerAcre": "3 Litres diluted in 150L water",
        "dosePerLitre": "20 - 30 ml / L",
        "preparation": "Traditional blend of cow dung, urine, milk, curd, ghee, sugarcane jaggery, and tender coconut water. Ferment for 21 days.",
        "benefits": "Rich in beneficial lactobacillus, auxins, and gibberellins that fortify plant cellular walls against future pathogen entry."
      },
      {
        "name": "Prophylactic Cold-Pressed Neem Oil (10,000 ppm)",
        "dosePerAcre": "500 - 800 ml",
        "dosePerLitre": "3 - 4 ml / L + 1 ml natural emulsifier",
        "preparation": "Emulsify cold-pressed pure neem oil in water. Spray in late afternoon.",
        "benefits": "Forms an organic protective shield that prevents insect pests from laying eggs on tender leaves."
      }
    ],
    "preventionMethods": [
      "Maintain regular scouting visits twice weekly to detect initial pest or disease arrivals.",
      "Ensure calibrated drip irrigation without creating waterlogged root zones.",
      "Follow balanced NPK nutrient management based on soil health card recommendations.",
      "Maintain clean farm borders and weed-free field bunds."
    ]
  },
  {
    "id": "potato_late_blight",
    "crop": "Potato",
    "crop_te": "బంగాళాదుంప",
    "crop_hi": "आलू",
    "name": "Late Blight of Potato",
    "name_te": "బంగాళాదుంప లేట్ బ్లైట్ తెగులు",
    "name_hi": "आलू का पछेती झुलसा (लेट ब्लाइट)",
    "type": "disease",
    "pathogenType": "Oomycete / Water Mold",
    "scientificName": "Phytophthora infestans",
    "severityLevel": "Critical",
    "symptoms": [
      "Water-soaked, irregular pale-to-dark green lesions that rapidly turn purplish-black",
      "Delicate white fuzzy mildew growth on the undersides of leaves during humid morning hours",
      "Rapid foliar collapse and rotten, foul-smelling tubers with granular brown rot"
    ],
    "symptoms_te": [
      "ఆకులపై తడి మచ్చలు ఏర్పడి వేగంగా ముదురు గోధుమ లేదా నలుపు రంగులోకి మారడం",
      "తేమ ఎక్కువగా ఉన్నప్పుడు ఆకుల అడుగున తెల్లటి బూజు లాంటి శిలీంధ్రం కనిపించడం",
      "మొక్కలు వేగంగా ఎండిపోయి దుంపలు కుళ్లి దుర్వాసన రావడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर पानी से भीगे हुए अनियमित धब्बे जो तेजी से भूरे-काले हो जाते हैं",
      "अधिक नमी में पत्तियों की निचली सतह पर सफेद फफूंद दिखना",
      "पौधे का तेजी से मुरझाना और आलू के कंदों में सड़न"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Cymoxanil 8% + Mancozeb 64% WP",
        "brandNames": [
          "Curzate M8",
          "Moximate"
        ],
        "dosePerAcre": "600 grams",
        "dosePerLitre": "3.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Kickback curative and preventative action. Apply as soon as cloudy humid weather arrives."
      },
      {
        "activeIngredient": "Dimethomorph 50% WP",
        "brandNames": [
          "Acrobat",
          "Zampro"
        ],
        "dosePerAcre": "400 grams",
        "dosePerLitre": "2.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 10,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic oomycete inhibitor that destroys Phytophthora cell wall synthesis."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Copper Oxychloride (50% WP) + Pseudomonas fluorescens",
        "dosePerAcre": "500g COC + 1kg Pseudomonas",
        "dosePerLitre": "2.5 g / L",
        "preparation": "Apply copper preventative spray before rain. Follow up with antagonistic Pseudomonas.",
        "benefits": "Suppresses zoospore motility and coats leaf epidermis."
      }
    ],
    "preventionMethods": [
      "Plant certified disease-free seed tubers treated with Trichoderma @ 10g/kg.",
      "Avoid excess overhead sprinkler irrigation; keep foliage dry."
    ]
  },
  {
    "id": "brinjal_shoot_fruit_borer",
    "crop": "Brinjal / Eggplant",
    "crop_te": "వంకాయ",
    "crop_hi": "बैंगन",
    "name": "Shoot and Fruit Borer",
    "name_te": "వంకాయ కొమ్మ మరియు కాయ తొలుచు పురుగు",
    "name_hi": "बैंगन का तना एवं फल छेदक कीट",
    "type": "pest",
    "pathogenType": "Lepidopteran Larvae",
    "scientificName": "Leucinodes orbonalis",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Wilting and drooping of tender apical shoots ('dead hearts')",
      "Circular exit holes in brinjal fruits plugged with larval excreta (frass)",
      "Internal fruit rotting and hollowed chambers rendering harvest unmarketable"
    ],
    "symptoms_te": [
      "లేత రెమ్మల చివర్లు వడలిపోయి ఎండిపోవడం (డెడ్ హార్ట్స్)",
      "కాయలపై రంధ్రాలు పడి లోపల పురుగు తిని మలం విసర్జించడం",
      "కాయలు కుళ్లిపోయి మార్కెట్ విలువ కోల్పోవడం"
    ],
    "symptoms_hi": [
      "पौधे की कोमल शाखाओं के सिरों का मुरझाकर सूख जाना",
      "फलों में गोल छेद और अंदर कीड़ा व विष्ठा पाया जाना",
      "फलों का सड़ना और बिक्री योग्य न रहना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Chlorantraniliprole 18.5% SC",
        "brandNames": [
          "Coragen",
          "Vesticor"
        ],
        "dosePerAcre": "60 ml",
        "dosePerLitre": "0.3 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 3,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Ovicidal and larvicidal activity. Spray at early vegetative flowering stage."
      },
      {
        "activeIngredient": "Emamectin Benzoate 5% SG",
        "brandNames": [
          "Proclaim",
          "EM-1"
        ],
        "dosePerAcre": "80-100 grams",
        "dosePerLitre": "0.5 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 3,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Translaminar stomach poison paralyzing caterpillar feeding within 2 hours."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Pheromone Traps (Leucilure)",
        "dosePerAcre": "12 - 15 traps per acre",
        "dosePerLitre": "N/A (Lure trap)",
        "preparation": "Install traps at canopy height. Replace rubber septa every 25 days.",
        "benefits": "Mass trapping of male moths disrupts mating cycle without any chemicals."
      },
      {
        "name": "Bacillus thuringiensis (Bt kurstaki 55,000 SU/mg)",
        "dosePerAcre": "400 grams",
        "dosePerLitre": "2.0 g / L",
        "preparation": "Foliar spray during evening hours when young larvae hatch.",
        "benefits": "Endotoxin crystals perforate larval gut specifically."
      }
    ],
    "preventionMethods": [
      "Clip and safely bury drooping withered shoots every 3 days.",
      "Intercrop with coriander or marigold to invite natural parasitoid wasps."
    ]
  },
  {
    "id": "okra_yellow_vein_mosaic",
    "crop": "Okra / Bhendi",
    "crop_te": "బెండకాయ",
    "crop_hi": "भिंडी",
    "name": "Yellow Vein Mosaic Virus (YVMV)",
    "name_te": "బెండ పసుపు ఈనెల తెగులు (వైరస్)",
    "name_hi": "भिंडी का पीली शिरा मोजेक वायरस (YVMV)",
    "type": "disease",
    "pathogenType": "Begomovirus (Whitefly Vector)",
    "scientificName": "Bhendi yellow vein mosaic virus",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Alternating network of bright yellow thickened leaf veins against green interveinal tissue",
      "Stunted growth with reduced leaf size and upward cupping",
      "Yellowish-white, small, fibrous, deformed pods"
    ],
    "symptoms_te": [
      "ఆకుల ఈనెలు పసుపు రంగులోకి మారి చిక్కగా అల్లుకోవడం",
      "మొక్క ఎదుగుదల ఆగిపోయి గిడసబారిపోవడం",
      "కాయలు పసుపుగా, గట్టిగా మారి నాణ్యత కోల్పోవడం"
    ],
    "symptoms_hi": [
      "पत्तियों की नसों का गहरा पीला पड़ना और जालीदार दिखना",
      "पौधे का बौना रह जाना और पत्तियों का छोटा होना",
      "फलों का पीला, कड़ा एवं विकृत हो जाना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Diafenthiuron 50% WP",
        "brandNames": [
          "Pegasus",
          "Derby"
        ],
        "dosePerAcre": "250 grams",
        "dosePerLitre": "1.25 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 5,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Controls vector whiteflies (Bemisia tabaci) to halt viral dissemination."
      },
      {
        "activeIngredient": "Acetamiprid 20% SP",
        "brandNames": [
          "Pride",
          "Manik"
        ],
        "dosePerAcre": "40-50 grams",
        "dosePerLitre": "0.25 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 3,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic neonicotinoid targeting whitefly nymphs on leaf undersides."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Yellow Sticky Traps + 10,000 ppm Neem Oil",
        "dosePerAcre": "20 yellow cards/acre + 600ml neem oil",
        "dosePerLitre": "3 ml / L",
        "preparation": "Hang bright yellow sticky sheets at canopy top. Spray neem oil weekly.",
        "benefits": "Traps adult whiteflies mechanically and prevents feeding."
      }
    ],
    "preventionMethods": [
      "Grow YVMV-tolerant hybrids such as Arka Anamika or Parbhani Kranti.",
      "Remove and incinerate infected plants immediately upon first yellowing symptoms."
    ]
  },
  {
    "id": "banana_sigatoka_leaf_spot",
    "crop": "Banana",
    "crop_te": "అరటి",
    "crop_hi": "केला",
    "name": "Black Sigatoka Leaf Spot",
    "name_te": "అరటి సిగటోకా ఆకుమచ్చ తెగులు",
    "name_hi": "केले का सिगाटोका पत्ती धब्बा रोग",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Pseudocercospora fijiensis / Mycosphaerella",
    "severityLevel": "High",
    "symptoms": [
      "Narrow reddish-brown streaks parallel to leaf veins that enlarge into elliptical necrotic spots",
      "Lesions with grey sunken centers surrounded by prominent yellow haloes",
      "Premature leaf desiccation resulting in poor bunch filling and premature fruit ripening"
    ],
    "symptoms_te": [
      "ఆకులపై ఎరుపు-గోధుమ రంగు చిన్న గీతలు ఏర్పడి క్రమంగా నల్లటి మచ్చలుగా మారడం",
      "మచ్చల మధ్య భాగం బూడిద రంగులో ఉండి చుట్టూ పసుపు వలయం ఉండటం",
      "ఆకులు అకాలంగా ఎండిపోయి గెలలు సరిగ్గా ఎదగకపోవడం"
    ],
    "symptoms_hi": [
      "पत्तियों पर लाल-भूरे रंग की लंबी लकीरें जो बड़े काले धब्बों में बदल जाती हैं",
      "धब्बों के बीच में राख जैसा रंग और चारों ओर पीला घेरा",
      "पत्तियों का जल्दी सूखना जिससे केले के घौद का विकास रुक जाना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Propiconazole 25% EC",
        "brandNames": [
          "Tilt",
          "Bumper"
        ],
        "dosePerAcre": "200 ml",
        "dosePerLitre": "1.0 ml / L + mineral oil (10 ml/L)",
        "waterPerAcre": "200 Litres",
        "phiDays": 30,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Mix with horticultural mineral oil for superior translaminar leaf penetration."
      },
      {
        "activeIngredient": "Trifloxystrobin 25% + Tebuconazole 50% WG",
        "brandNames": [
          "Nativo"
        ],
        "dosePerAcre": "120 grams",
        "dosePerLitre": "0.6 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Stops spore germination and curatively destroys developing mycelium."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Bio-Wash with Pseudomonas fluorescens + Fermented Butter Milk",
        "dosePerAcre": "1000g Pseudomonas + 5L buttermilk",
        "dosePerLitre": "5 g / L",
        "preparation": "Foliar spray targeted under leaves during early morning.",
        "benefits": "Antagonistic rhizobacteria suppress leaf surface spore germination."
      }
    ],
    "preventionMethods": [
      "De-leaf dry, infected leaves regularly and destroy away from the orchard.",
      "Improve plantation drainage and widen spacing to reduce relative humidity."
    ]
  },
  {
    "id": "grapes_downy_mildew",
    "crop": "Grapes",
    "crop_te": "ద్రాక్ష",
    "crop_hi": "अंगूर",
    "name": "Downy Mildew of Grapes",
    "name_te": "ద్రాక్ష డౌనీ మిల్డో (బూడిద తెగులు)",
    "name_hi": "अंगूर का डाउनी मिल्ड्यू (मृदुरोमिल आसिता)",
    "type": "disease",
    "pathogenType": "Oomycete",
    "scientificName": "Plasmopara viticola",
    "severityLevel": "Critical",
    "symptoms": [
      "Translucent yellowish oily 'oil-spots' on upper leaf lamina",
      "Dense white cottony downy growth on the corresponding undersides",
      "Infected berries turn dull greyish-lead color, shrivel into hard mummies, and drop"
    ],
    "symptoms_te": [
      "ఆకులపై నూనె పూసినట్లు పసుపు మచ్చలు ('ఆయిల్ స్పాట్స్') కనిపించడం",
      "ఆకుల అడుగు భాగంలో తెల్లటి దూది లాంటి బూజు ఏర్పడటం",
      "ద్రాక్ష కాయలు నల్లబడి ఎండు ద్రాక్షలా ముడుచుకుపోయి రాలిపోవడం"
    ],
    "symptoms_hi": [
      "पत्तियों की ऊपरी सतह पर तेल जैसे पीले पारदर्शी धब्बे (ऑयल स्पॉट्स)",
      "पत्तियों के नीचे सफेद रुई जैसी फफूंद का गुच्छा",
      "अंगूर के दानों का सिकुड़कर भूरा होना और झड़ जाना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Dimethomorph 50% WP",
        "brandNames": [
          "Acrobat",
          "Sphinx"
        ],
        "dosePerAcre": "400 grams",
        "dosePerLitre": "1.5 - 2.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic antisporulant. Apply during cloudy weather before rainfall."
      },
      {
        "activeIngredient": "Mandipropamid 23.4% SC",
        "brandNames": [
          "Revus"
        ],
        "dosePerAcre": "160 ml",
        "dosePerLitre": "0.8 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 10,
        "toxicityLevel": "Green (Target Specific)",
        "instructions": "Binds tightly to leaf wax layers providing rainfast protection."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Bordeaux Mixture (0.8% - 1.0%)",
        "dosePerAcre": "2kg Copper Sulphate + 2kg Lime in 200L water",
        "dosePerLitre": "Standard 1% formulation",
        "preparation": "Freshly prepared neutral Bordeaux mixture sprayed after pruning.",
        "benefits": "Classic multi-site preventative coating preventing spore penetration."
      }
    ],
    "preventionMethods": [
      "Prune vines for open airy canopy structure allowing sunlight penetration.",
      "Remove water sprouts and sucker shoots close to the ground."
    ]
  },
  {
    "id": "apple_scab",
    "crop": "Apple",
    "crop_te": "ఆపిల్",
    "crop_hi": "सेब",
    "name": "Apple Scab (Venturia inaequalis)",
    "name_te": "ఆపిల్ స్కాబ్ తెగులు",
    "name_hi": "सेब का स्कैब रोग",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Venturia inaequalis",
    "severityLevel": "High to Critical",
    "symptoms": [
      "Dull olive-green to black velvety spots on tender leaves with irregular borders",
      "Leaves become distorted, puckered, yellowed, and drop prematurely",
      "Scabby, rough, corky black lesions on apples with deep fruit cracking"
    ],
    "symptoms_te": [
      "ఆకులపై ఆలివ్ గ్రీన్ లేదా నల్లటి వెల్వెట్ లాంటి మచ్చలు ఏర్పడటం",
      "ఆకులు వంకర్లు తిరిగి అకాలంగా రాలిపోవడం",
      "ఆపిల్ పండ్లపై గరుకుగా నల్లటి పొలుసులు మరియు పగుళ్లు ఏర్పడటం"
    ],
    "symptoms_hi": [
      "पत्तियों पर जैतून-हरे से काले मखमली धब्बे",
      "पत्तियों का मुड़ना और असमय गिर जाना",
      "फलों पर खुरदरे काले धब्बे और फलों में दरारें पड़ना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Difenoconazole 25% EC",
        "brandNames": [
          "Score",
          "Brio"
        ],
        "dosePerAcre": "100 ml",
        "dosePerLitre": "0.5 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Systemic triazole with 72-hour kickback eradicant activity."
      },
      {
        "activeIngredient": "Captan 50% WP",
        "brandNames": [
          "Captaf",
          "Deltan"
        ],
        "dosePerAcre": "600 grams",
        "dosePerLitre": "2.5 - 3.0 g / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 14,
        "toxicityLevel": "Green (Slightly Toxic)",
        "instructions": "Protective multi-site contact fungicide preventing spore attachment."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Urea 5% Foliar Spray (Post-Harvest Leaf Degradation)",
        "dosePerAcre": "10 kg in 200L water",
        "dosePerLitre": "50 g / L",
        "preparation": "Spray immediately prior to leaf fall in autumn.",
        "benefits": "Accelerates microbial decomposition of fallen leaves, destroying overwintering pseudothecia."
      }
    ],
    "preventionMethods": [
      "Shred or rake and compost all fallen autumn orchard leaves.",
      "Prune trees to open centers to maximize airflow and rapid leaf drying."
    ]
  },
  {
    "id": "soybean_rust",
    "crop": "Soybean",
    "crop_te": "సోయాబీన్",
    "crop_hi": "सोयाबीन",
    "name": "Asian Soybean Rust",
    "name_te": "సోయాబీన్ కుంకుమ తెగులు (రస్ట్)",
    "name_hi": "सोयाबीन का एशियाई गेरुआ रोग (रस्ट)",
    "type": "disease",
    "pathogenType": "Fungal",
    "scientificName": "Phakopsora pachyrhizi",
    "severityLevel": "Critical",
    "symptoms": [
      "Tiny chlorotic flecks on lower leaves that develop into raised reddish-brown pustules",
      "Pustules on leaf undersides erupting with tan-to-brown urediniospores",
      "Severe premature defoliation, stunted pods, and lightweight empty pods"
    ],
    "symptoms_te": [
      "క్రింది ఆకులపై చిన్న పసుపు చుక్కలు ఏర్పడి ఎరుపు-గోధుమ రంగు బుడిపెలుగా మారడం",
      "ఆకుల అడుగున గోధుమ రంగు పొడి రాలడం",
      "ఆకులు వేగంగా రాలిపోయి కాయల్లో గింజలు సరిగ్గా పట్టకపోవడం"
    ],
    "symptoms_hi": [
      "निचली पत्तियों पर छोटे पीले धब्बे जो बाद में उभरे हुए लाल-भूरे दानों में बदल जाते हैं",
      "पत्तियों की निचली सतह पर फफूंद का चूर्ण दिखाई देना",
      "पत्तियों का जल्दी गिरना और फलियों में दाने न भरना"
    ],
    "chemicalRemedies": [
      {
        "activeIngredient": "Pyraclostrobin 133 g/L + Epoxiconazole 50 g/L SE",
        "brandNames": [
          "Opera",
          "Priaxor"
        ],
        "dosePerAcre": "300 ml",
        "dosePerLitre": "1.5 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 21,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Apply prophylactically at R1-R3 flowering/pod initiation stages."
      },
      {
        "activeIngredient": "Hexaconazole 5% SC",
        "brandNames": [
          "Contaf",
          "Sitara"
        ],
        "dosePerAcre": "300 ml",
        "dosePerLitre": "1.5 ml / L",
        "waterPerAcre": "200 Litres",
        "phiDays": 20,
        "toxicityLevel": "Blue (Moderately Toxic)",
        "instructions": "Cost-effective triazole delivering curative post-infection stop."
      }
    ],
    "naturalRemedies": [
      {
        "name": "Neem Seed Kernel Extract (NSKE 5%)",
        "dosePerAcre": "1000 ml",
        "dosePerLitre": "5 ml / L",
        "preparation": "Spray during early overcast vegetative stage before flowering.",
        "benefits": "Reduces urediniospore germination on foliage."
      }
    ],
    "preventionMethods": [
      "Plant rust-resistant or early-maturing soybean cultivars.",
      "Monitor early planted sentinel plots to detect windblown spore influx."
    ]
  }
];
