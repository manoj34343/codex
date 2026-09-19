// 100% Offline, high-resolution SVG illustrations for crop disease and pest samples

// Helper to encode SVG string to data URI
const svgToUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

// 1. Tomato Early Blight: Realistic tomato compound leaf with target-board lesions
export const TOMATO_EARLY_BLIGHT_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="leafBg" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="45%" stop-color="#22c55e"/>
      <stop offset="85%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#14532d"/>
    </radialGradient>
    <radialGradient id="lesionGrad1" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#1c1007"/>
      <stop offset="35%" stop-color="#451a03"/>
      <stop offset="65%" stop-color="#78350f"/>
      <stop offset="85%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#facc15" stop-opacity="0.8"/>
    </radialGradient>
    <radialGradient id="lesionGrad2" cx="45%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#1c1007"/>
      <stop offset="40%" stop-color="#58240c"/>
      <stop offset="70%" stop-color="#854d0e"/>
      <stop offset="90%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a3e635" stop-opacity="0.6"/>
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#052e16" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.6"/>

  <!-- Main Compound Petiole -->
  <path d="M 400 580 Q 402 360 395 60" fill="none" stroke="#22543d" stroke-width="14" stroke-linecap="round"/>
  <path d="M 400 580 Q 402 360 395 60" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" opacity="0.6"/>

  <!-- Terminal Tomato Leaflet -->
  <g filter="url(#shadow)">
    <path d="M 395 60 C 340 100, 310 160, 335 220 C 350 260, 395 280, 395 280 C 395 280, 440 260, 455 220 C 480 160, 450 100, 395 60 Z" fill="url(#leafBg)" stroke="#166534" stroke-width="2"/>
    <!-- Terminal Leaflet Veins -->
    <path d="M 395 60 L 395 280" stroke="#86efac" stroke-width="4" opacity="0.7"/>
    <path d="M 395 110 Q 360 125 340 150" stroke="#86efac" stroke-width="2.5" fill="none" opacity="0.6"/>
    <path d="M 395 110 Q 430 125 450 150" stroke="#86efac" stroke-width="2.5" fill="none" opacity="0.6"/>
    <path d="M 395 160 Q 360 180 345 205" stroke="#86efac" stroke-width="2.5" fill="none" opacity="0.6"/>
    <path d="M 395 160 Q 430 180 445 205" stroke="#86efac" stroke-width="2.5" fill="none" opacity="0.6"/>
  </g>

  <!-- Left Upper Leaflet with Primary Early Blight Lesion -->
  <g filter="url(#shadow)">
    <path d="M 398 250 Q 330 240 230 210 C 160 220, 140 280, 170 330 C 200 380, 260 385, 310 350 C 360 320, 398 250, 398 250 Z" fill="url(#leafBg)" stroke="#166534" stroke-width="2"/>
    <!-- Veins -->
    <path d="M 398 250 Q 310 280 180 300" stroke="#86efac" stroke-width="3.5" fill="none" opacity="0.7"/>
    
    <!-- Concentric Target-Board Lesion 1 (Alternaria solani) -->
    <g transform="translate(240, 290)">
      <!-- Chlorotic Yellow Halo -->
      <ellipse cx="0" cy="0" rx="65" ry="52" fill="#fef08a" opacity="0.75"/>
      <ellipse cx="0" cy="0" rx="54" ry="43" fill="url(#lesionGrad1)"/>
      <!-- Target Rings -->
      <ellipse cx="0" cy="0" rx="42" ry="33" fill="none" stroke="#261005" stroke-width="3" opacity="0.8"/>
      <ellipse cx="0" cy="0" rx="30" ry="23" fill="none" stroke="#261005" stroke-width="3" opacity="0.8"/>
      <ellipse cx="0" cy="0" rx="16" ry="12" fill="none" stroke="#1c0b02" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="7" fill="#0f0502"/>
    </g>

    <!-- Secondary Satellite Lesion -->
    <g transform="translate(300, 335)">
      <ellipse cx="0" cy="0" rx="28" ry="22" fill="#fef08a" opacity="0.7"/>
      <ellipse cx="0" cy="0" rx="22" ry="17" fill="url(#lesionGrad2)"/>
      <ellipse cx="0" cy="0" rx="12" ry="9" fill="none" stroke="#261005" stroke-width="2"/>
    </g>
  </g>

  <!-- Right Upper Leaflet -->
  <g filter="url(#shadow)">
    <path d="M 398 260 Q 470 250 570 210 C 640 220, 660 280, 630 330 C 600 380, 540 385, 490 350 C 440 320, 398 260, 398 260 Z" fill="url(#leafBg)" stroke="#166534" stroke-width="2"/>
    <path d="M 398 260 Q 486 280 620 300" stroke="#86efac" stroke-width="3.5" fill="none" opacity="0.7"/>
    <!-- Smaller Lesion -->
    <g transform="translate(530, 280)">
      <ellipse cx="0" cy="0" rx="42" ry="34" fill="#fef08a" opacity="0.7"/>
      <ellipse cx="0" cy="0" rx="33" ry="26" fill="url(#lesionGrad1)"/>
      <ellipse cx="0" cy="0" rx="22" ry="17" fill="none" stroke="#261005" stroke-width="2"/>
    </g>
  </g>

  <!-- Left Lower Leaflet -->
  <g filter="url(#shadow)">
    <path d="M 400 420 Q 310 420 200 400 C 130 420, 130 480, 170 520 C 220 560, 300 550, 350 500 C 390 460, 400 420, 400 420 Z" fill="url(#leafBg)" stroke="#166534" stroke-width="2"/>
    <path d="M 400 420 Q 290 460 180 480" stroke="#86efac" stroke-width="3" fill="none" opacity="0.7"/>
  </g>

  <!-- Right Lower Leaflet -->
  <g filter="url(#shadow)">
    <path d="M 400 430 Q 490 420 600 400 C 670 420, 670 480, 630 520 C 580 560, 500 550, 450 500 C 410 460, 400 430, 400 430 Z" fill="url(#leafBg)" stroke="#166534" stroke-width="2"/>
    <path d="M 400 430 Q 510 460 620 480" stroke="#86efac" stroke-width="3" fill="none" opacity="0.7"/>
  </g>

  <!-- Botanical Badge Overlay -->
  <rect x="24" y="24" width="220" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#ef4444"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Alternaria solani</text>
</svg>
`);

// 2. Cotton Pink Bollworm: Green cotton boll with rosette flower & bored entry hole
export const COTTON_BOLLWORM_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="bollGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="40%" stop-color="#4ade80"/>
      <stop offset="80%" stop-color="#16a34a"/>
      <stop offset="100%" stop-color="#14532d"/>
    </radialGradient>
    <radialGradient id="petalGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="60%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </radialGradient>
    <filter id="bollShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#064e3b" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.6"/>

  <!-- Cotton Stem -->
  <path d="M 400 580 Q 400 460 400 360" stroke="#713f12" stroke-width="18" stroke-linecap="round" fill="none"/>

  <!-- Calyx Bracts (Involucre) -->
  <g fill="#2e7d32" stroke="#14532d" stroke-width="2">
    <path d="M 400 360 C 340 380, 240 370, 210 270 C 230 265, 250 290, 270 275 C 290 295, 310 270, 330 300 C 360 330, 400 360, 400 360 Z"/>
    <path d="M 400 360 C 460 380, 560 370, 590 270 C 570 265, 550 290, 530 275 C 510 295, 490 270, 470 300 C 440 330, 400 360, 400 360 Z"/>
  </g>

  <!-- Green Cotton Boll Fruit Body -->
  <g filter="url(#bollShadow)">
    <path d="M 400 130 C 490 190, 530 280, 480 370 C 440 410, 360 410, 320 370 C 270 280, 310 190, 400 130 Z" fill="url(#bollGrad)" stroke="#15803d" stroke-width="3"/>
    <!-- Locule Septum Grooves -->
    <path d="M 400 130 Q 360 260 400 395" stroke="#14532d" stroke-width="3" fill="none" opacity="0.6"/>
    <path d="M 400 130 Q 440 260 400 395" stroke="#14532d" stroke-width="3" fill="none" opacity="0.6"/>
    <!-- Pointed Beak Apex -->
    <path d="M 400 130 L 400 115" stroke="#14532d" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Rosette Flower (Premature Damaged Bloom) -->
  <g transform="translate(300, 170) rotate(-25)">
    <ellipse cx="0" cy="0" rx="35" ry="18" fill="url(#petalGrad)" stroke="#a16207" opacity="0.9"/>
    <ellipse cx="-15" cy="15" rx="30" ry="16" fill="url(#petalGrad)" stroke="#a16207" opacity="0.85"/>
    <ellipse cx="15" cy="15" rx="30" ry="16" fill="url(#petalGrad)" stroke="#a16207" opacity="0.85"/>
  </g>

  <!-- Larval Entry Borehole & Frass -->
  <g transform="translate(420, 270)">
    <circle cx="-14" cy="-8" r="4" fill="#78350f"/>
    <circle cx="12" cy="14" r="3.5" fill="#92400e"/>
    <circle cx="-10" cy="12" r="4.5" fill="#451a03"/>
    
    <ellipse cx="0" cy="0" rx="16" ry="14" fill="#0f0502" stroke="#451a03" stroke-width="3"/>
    <ellipse cx="2" cy="2" rx="10" ry="8" fill="#000000"/>

    <!-- Pink Bollworm Larva Peeking Out -->
    <path d="M 4 2 Q 25 12 38 -5 Q 46 -15 35 -24 Q 22 -15 10 -4 Z" fill="#f472b6" stroke="#db2777" stroke-width="2"/>
    <path d="M 16 0 L 22 -10" stroke="#be185d" stroke-width="2"/>
    <path d="M 26 5 L 32 -7" stroke="#be185d" stroke-width="2"/>
    <circle cx="36" cy="-18" r="3" fill="#831843"/>
  </g>

  <!-- Badge -->
  <rect x="24" y="24" width="260" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#f43f5e"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Pectinophora gossypiella</text>
</svg>
`);

// 3. Rice Blast (Magnaporthe oryzae): Spindle-shaped lesions on paddy blade
export const RICE_BLAST_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="paddyBlade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d"/>
      <stop offset="30%" stop-color="#22c55e"/>
      <stop offset="50%" stop-color="#4ade80"/>
      <stop offset="70%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
    <radialGradient id="spindleLesion" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="40%" stop-color="#94a3b8"/>
      <stop offset="70%" stop-color="#78350f"/>
      <stop offset="85%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#facc15" stop-opacity="0.8"/>
    </radialGradient>
    <filter id="paddyShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#064e3b" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.6"/>

  <path d="M 260 580 Q 240 320 180 80 C 190 75, 230 140, 270 280 C 300 400, 310 580, 310 580 Z" fill="url(#paddyBlade)" opacity="0.65"/>

  <g filter="url(#paddyShadow)">
    <path d="M 360 590 C 370 420, 380 250, 400 40 C 420 250, 430 420, 440 590 Z" fill="url(#paddyBlade)" stroke="#166534" stroke-width="2"/>
    <path d="M 400 40 L 400 590" stroke="#bbf7d0" stroke-width="4" opacity="0.75"/>

    <!-- Primary Diamond-Spindle Blast Lesion -->
    <g transform="translate(400, 240)">
      <path d="M 0 -70 C 30 -30, 30 30, 0 70 C -30 30, -30 -30, 0 -70 Z" fill="#fef08a" opacity="0.75"/>
      <path d="M 0 -58 C 22 -25, 22 25, 0 58 C -22 25, -22 -25, 0 -58 Z" fill="url(#spindleLesion)"/>
      <ellipse cx="0" cy="0" rx="10" ry="24" fill="#f1f5f9" opacity="0.9"/>
    </g>

    <!-- Developing Blast Lesion -->
    <g transform="translate(400, 390)">
      <path d="M 0 -45 C 18 -18, 18 18, 0 45 C -18 18, -18 -18, 0 -45 Z" fill="#fef08a" opacity="0.75"/>
      <path d="M 0 -36 C 14 -14, 14 14, 0 36 C -14 14, -14 -14, 0 -36 Z" fill="url(#spindleLesion)"/>
      <ellipse cx="0" cy="0" rx="6" ry="14" fill="#f1f5f9" opacity="0.9"/>
    </g>
  </g>

  <path d="M 520 580 Q 550 340 610 90 C 600 85, 560 150, 520 290 C 490 410, 480 580, 480 580 Z" fill="url(#paddyBlade)" opacity="0.65"/>

  <!-- Badge -->
  <rect x="24" y="24" width="240" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#ef4444"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Magnaporthe oryzae</text>
</svg>
`);

// 4. Chilli Leaf Curl (Thrips parvispinus): Upward curled, boat-shaped leaves
export const CHILLI_LEAF_CURL_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="chilliLeaf" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="50%" stop-color="#22c55e"/>
      <stop offset="90%" stop-color="#166534"/>
    </radialGradient>
    <linearGradient id="crinkleUnder" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="100%" stop-color="#4ade80"/>
    </linearGradient>
    <filter id="chilliShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#064e3b" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.6"/>

  <path d="M 400 580 Q 395 380 400 200" stroke="#15803d" stroke-width="12" stroke-linecap="round" fill="none"/>

  <g filter="url(#chilliShadow)">
    <path d="M 395 340 C 330 330, 200 320, 160 250 C 210 230, 310 260, 395 340 Z" fill="url(#crinkleUnder)" stroke="#15803d" stroke-width="2"/>
    <path d="M 395 340 C 310 355, 180 345, 155 260 C 200 240, 300 270, 395 340 Z" fill="url(#chilliLeaf)" stroke="#166534" stroke-width="2"/>
    <path d="M 230 270 Q 250 310 270 280" stroke="#14532d" stroke-width="2.5" fill="none" opacity="0.6"/>
  </g>

  <g filter="url(#chilliShadow)">
    <path d="M 405 320 C 470 310, 600 300, 640 230 C 590 210, 490 240, 405 320 Z" fill="url(#crinkleUnder)" stroke="#15803d" stroke-width="2"/>
    <path d="M 405 320 C 490 335, 620 325, 645 240 C 600 220, 500 250, 405 320 Z" fill="url(#chilliLeaf)" stroke="#166534" stroke-width="2"/>
  </g>

  <!-- Distorted Apex -->
  <g filter="url(#chilliShadow)">
    <ellipse cx="400" cy="180" rx="35" ry="50" fill="url(#chilliLeaf)" stroke="#166534" stroke-width="2"/>
    <circle cx="400" cy="130" r="12" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
    <circle cx="400" cy="130" r="5" fill="#713f12"/>
  </g>

  <!-- Badge -->
  <rect x="24" y="24" width="240" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#f59e0b"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Thrips parvispinus</text>
</svg>
`);

// 5. Maize Fall Armyworm (Spodoptera frugiperda): Whorl windowpaning & chewing
export const MAIZE_ARMYWORM_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="maizeLeaf" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d"/>
      <stop offset="30%" stop-color="#22c55e"/>
      <stop offset="50%" stop-color="#4ade80"/>
      <stop offset="70%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <filter id="maizeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#064e3b" flood-opacity="0.2"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.6"/>

  <path d="M 400 580 L 400 420" stroke="#166534" stroke-width="32" stroke-linecap="round"/>

  <g filter="url(#maizeShadow)">
    <path d="M 385 450 C 320 380, 180 360, 80 440 C 90 420, 220 280, 385 350 Z" fill="url(#maizeLeaf)" stroke="#14532d" stroke-width="2"/>
    <path d="M 220 360 Q 250 340 280 370 Q 250 390 220 360 Z" fill="#f8fafc" stroke="#78350f" stroke-width="2"/>

    <path d="M 415 450 C 480 380, 620 360, 720 440 C 710 420, 580 280, 415 350 Z" fill="url(#maizeLeaf)" stroke="#14532d" stroke-width="2"/>
    <path d="M 520 360 Q 550 340 580 370 Q 550 390 520 360 Z" fill="#f8fafc" stroke="#78350f" stroke-width="2"/>

    <path d="M 400 420 C 370 280, 360 140, 400 50 C 440 140, 430 280, 400 420 Z" fill="url(#maizeLeaf)" stroke="#14532d" stroke-width="2"/>
    <path d="M 400 50 L 400 420" stroke="#bbf7d0" stroke-width="5" opacity="0.8"/>

    <!-- Caterpillar Inside Whorl -->
    <g transform="translate(370, 260) rotate(-35)">
      <path d="M 0 0 C 20 -15, 60 -15, 80 0 C 60 15, 20 15, 0 0 Z" fill="#65a30d" stroke="#365314" stroke-width="2"/>
      <circle cx="85" cy="0" r="9" fill="#78350f" stroke="#1c1917" stroke-width="1.5"/>
    </g>
  </g>

  <!-- Badge -->
  <rect x="24" y="24" width="240" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#ef4444"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Spodoptera frugiperda</text>
</svg>
`);

// 6. Sugarcane Red Rot (Colletotrichum falcatum): Red pith with white transverse bands
export const SUGARCANE_RED_ROT_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="caneStalk" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b91c1c"/>
      <stop offset="30%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#fee2e2"/>
      <stop offset="70%" stop-color="#ef4444"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <filter id="caneShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#450a0a" flood-opacity="0.25"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#fef2f2" opacity="0.6"/>

  <!-- Cane Stalk Section -->
  <g filter="url(#caneShadow)">
    <rect x="310" y="50" width="180" height="500" rx="24" fill="url(#caneStalk)" stroke="#7f1d1d" stroke-width="3"/>
    
    <!-- Nodes -->
    <rect x="290" y="160" width="220" height="18" rx="9" fill="#7f1d1d" opacity="0.85"/>
    <rect x="290" y="380" width="220" height="18" rx="9" fill="#7f1d1d" opacity="0.85"/>

    <!-- Red Rot Lesions with White Transverse Patches -->
    <ellipse cx="400" cy="270" rx="55" ry="75" fill="#7f1d1d"/>
    <rect x="350" y="260" width="100" height="22" rx="6" fill="#ffffff" opacity="0.9"/>
    <ellipse cx="400" cy="460" rx="45" ry="50" fill="#7f1d1d"/>
    <rect x="365" y="450" width="70" height="18" rx="5" fill="#ffffff" opacity="0.85"/>
  </g>

  <!-- Badge -->
  <rect x="24" y="24" width="240" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#dc2626"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Colletotrichum falcatum</text>
</svg>
`);

// 7. Healthy Tomato Leaf: Vibrant, lush, clean green foliage with zero lesions or necrosis
export const HEALTHY_TOMATO_LEAF_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="healthyLeafBg" cx="45%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="35%" stop-color="#4ade80"/>
      <stop offset="70%" stop-color="#22c55e"/>
      <stop offset="92%" stop-color="#16a34a"/>
      <stop offset="100%" stop-color="#14532d"/>
    </radialGradient>
    <radialGradient id="healthyVeinGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#bbf7d0"/>
      <stop offset="100%" stop-color="#86efac"/>
    </radialGradient>
    <filter id="healthyShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#052e16" flood-opacity="0.18"/>
    </filter>
  </defs>

  <rect width="800" height="600" fill="#f8fafc"/>
  <circle cx="400" cy="300" r="280" fill="#ecfdf5" opacity="0.8"/>

  <!-- Main Compound Petiole -->
  <path d="M 400 580 Q 402 360 395 60" fill="none" stroke="#15803d" stroke-width="13" stroke-linecap="round"/>
  <path d="M 400 580 Q 402 360 395 60" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" opacity="0.7"/>

  <!-- Terminal Tomato Leaflet (100% Healthy) -->
  <g filter="url(#healthyShadow)">
    <path d="M 395 60 C 340 100, 310 160, 335 220 C 350 260, 395 280, 395 280 C 395 280, 440 260, 455 220 C 480 160, 450 100, 395 60 Z" fill="url(#healthyLeafBg)" stroke="#15803d" stroke-width="2"/>
    <path d="M 395 60 L 395 280" stroke="url(#healthyVeinGrad)" stroke-width="4.5" opacity="0.85"/>
    <path d="M 395 110 Q 360 125 340 150" stroke="url(#healthyVeinGrad)" stroke-width="2.5" fill="none" opacity="0.75"/>
    <path d="M 395 110 Q 430 125 450 150" stroke="url(#healthyVeinGrad)" stroke-width="2.5" fill="none" opacity="0.75"/>
    <path d="M 395 160 Q 360 180 345 205" stroke="url(#healthyVeinGrad)" stroke-width="2.5" fill="none" opacity="0.75"/>
    <path d="M 395 160 Q 430 180 445 205" stroke="url(#healthyVeinGrad)" stroke-width="2.5" fill="none" opacity="0.75"/>
  </g>

  <!-- Left Upper Leaflet (Lush Healthy) -->
  <g filter="url(#healthyShadow)">
    <path d="M 398 250 Q 330 240 230 210 C 160 220, 140 280, 170 330 C 200 380, 260 385, 310 350 C 360 320, 398 250, 398 250 Z" fill="url(#healthyLeafBg)" stroke="#15803d" stroke-width="2"/>
    <path d="M 398 250 Q 310 280 180 300" stroke="url(#healthyVeinGrad)" stroke-width="3.8" fill="none" opacity="0.8"/>
    <path d="M 350 265 Q 315 250 280 235" stroke="url(#healthyVeinGrad)" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M 310 280 Q 280 310 250 330" stroke="url(#healthyVeinGrad)" stroke-width="2" fill="none" opacity="0.7"/>
  </g>

  <!-- Right Upper Leaflet (Lush Healthy) -->
  <g filter="url(#healthyShadow)">
    <path d="M 398 260 Q 470 250 570 210 C 640 220, 660 280, 630 330 C 600 380, 540 385, 490 350 C 440 320, 398 260, 398 260 Z" fill="url(#healthyLeafBg)" stroke="#15803d" stroke-width="2"/>
    <path d="M 398 260 Q 486 280 620 300" stroke="url(#healthyVeinGrad)" stroke-width="3.8" fill="none" opacity="0.8"/>
    <path d="M 445 265 Q 480 250 515 235" stroke="url(#healthyVeinGrad)" stroke-width="2" fill="none" opacity="0.7"/>
    <path d="M 485 280 Q 515 310 545 330" stroke="url(#healthyVeinGrad)" stroke-width="2" fill="none" opacity="0.7"/>
  </g>

  <!-- Left Lower Leaflet (Lush Healthy) -->
  <g filter="url(#healthyShadow)">
    <path d="M 400 420 Q 310 420 200 400 C 130 420, 130 480, 170 520 C 220 560, 300 550, 350 500 C 390 460, 400 420, 400 420 Z" fill="url(#healthyLeafBg)" stroke="#15803d" stroke-width="2"/>
    <path d="M 400 420 Q 290 460 180 480" stroke="url(#healthyVeinGrad)" stroke-width="3.5" fill="none" opacity="0.8"/>
  </g>

  <!-- Right Lower Leaflet (Lush Healthy) -->
  <g filter="url(#healthyShadow)">
    <path d="M 400 430 Q 490 420 600 400 C 670 420, 670 480, 630 520 C 580 560, 500 550, 450 500 C 410 460, 400 430, 400 430 Z" fill="url(#healthyLeafBg)" stroke="#15803d" stroke-width="2"/>
    <path d="M 400 430 Q 510 460 620 480" stroke="url(#healthyVeinGrad)" stroke-width="3.5" fill="none" opacity="0.8"/>
  </g>

  <!-- Botanical Badge Overlay -->
  <rect x="24" y="24" width="240" height="42" rx="21" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
  <circle cx="45" cy="45" r="10" fill="#22c55e"/>
  <text x="68" y="50" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#15803d">Healthy Foliage</text>
</svg>
`);

