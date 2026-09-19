// 100% Offline, high-resolution SVG visual backdrops for the 3 Biological Zoom Stages
// Guarantees zero black screens, instant 0ms rendering, and vibrant colorful graphics

const svgToUri = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

// 1. Stage 1: Whole Living Crop Plant with Foliage, Golden Blossoms, Stems & Fruit
export const STAGE1_PLANT_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f0fdf4"/>
      <stop offset="100%" stop-color="#dcfce7"/>
    </radialGradient>
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a" stop-opacity="0.8"/>
      <stop offset="40%" stop-color="#fef9c3" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#14532d"/>
      <stop offset="35%" stop-color="#22c55e"/>
      <stop offset="70%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80"/>
      <stop offset="40%" stop-color="#22c55e"/>
      <stop offset="85%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </linearGradient>
    <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="50%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#16a34a"/>
    </linearGradient>
    <radialGradient id="tomatoGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fca5a5"/>
      <stop offset="25%" stop-color="#ef4444"/>
      <stop offset="75%" stop-color="#b91c1c"/>
      <stop offset="100%" stop-color="#7f1d1d"/>
    </radialGradient>
    <radialGradient id="flowerGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#052e16" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Luminous Sky Background -->
  <rect width="1200" height="700" fill="url(#skyGrad)"/>
  <circle cx="600" cy="180" r="320" fill="url(#sunGlow)"/>

  <!-- Soil Mound -->
  <ellipse cx="600" cy="670" rx="380" ry="60" fill="#78350f" opacity="0.12"/>
  <ellipse cx="600" cy="660" rx="320" ry="40" fill="#451a03" opacity="0.15"/>

  <!-- Main Central Stem -->
  <g filter="url(#softShadow)">
    <path d="M 600 660 Q 595 440 605 240 Q 610 140 600 80" fill="none" stroke="url(#stemGrad)" stroke-width="22" stroke-linecap="round"/>
    <path d="M 596 660 Q 591 440 601 240 Q 606 140 596 80" fill="none" stroke="#86efac" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- Compound Leaves - Lower Left Tier -->
  <g filter="url(#softShadow)">
    <path d="M 598 480 Q 480 470 320 510 C 260 480, 240 430, 280 390 C 330 350, 420 380, 500 420 Q 550 445 598 480 Z" fill="url(#leafGrad)" stroke="#14532d" stroke-width="2"/>
    <path d="M 598 480 Q 430 440 280 390" fill="none" stroke="#86efac" stroke-width="4" opacity="0.7"/>
    <path d="M 460 448 Q 440 410 420 395" fill="none" stroke="#86efac" stroke-width="2" opacity="0.6"/>
    <path d="M 370 425 Q 350 390 330 380" fill="none" stroke="#86efac" stroke-width="2" opacity="0.6"/>
  </g>

  <!-- Compound Leaves - Lower Right Tier -->
  <g filter="url(#softShadow)">
    <path d="M 602 460 Q 720 450 880 490 C 940 460, 960 410, 920 370 C 870 330, 780 360, 700 400 Q 650 425 602 460 Z" fill="url(#leafGrad)" stroke="#14532d" stroke-width="2"/>
    <path d="M 602 460 Q 770 420 920 370" fill="none" stroke="#86efac" stroke-width="4" opacity="0.7"/>
    <path d="M 740 428 Q 760 390 780 375" fill="none" stroke="#86efac" stroke-width="2" opacity="0.6"/>
    <path d="M 830 405 Q 850 370 870 360" fill="none" stroke="#86efac" stroke-width="2" opacity="0.6"/>
  </g>

  <!-- Mid Left Leaf Branch -->
  <g filter="url(#softShadow)">
    <path d="M 600 350 Q 480 310 340 310 C 290 270, 310 210, 360 190 C 420 170, 490 220, 540 260 Q 575 300 600 350 Z" fill="url(#leafGradLight)" stroke="#15803d" stroke-width="2"/>
    <path d="M 600 350 Q 460 270 360 190" fill="none" stroke="#bbf7d0" stroke-width="3.5" opacity="0.8"/>
  </g>

  <!-- Mid Right Leaf Branch -->
  <g filter="url(#softShadow)">
    <path d="M 605 320 Q 740 280 860 270 C 910 230, 890 170, 840 160 C 770 140, 710 190, 660 240 Q 630 275 605 320 Z" fill="url(#leafGradLight)" stroke="#15803d" stroke-width="2"/>
    <path d="M 605 320 Q 730 235 840 160" fill="none" stroke="#bbf7d0" stroke-width="3.5" opacity="0.8"/>
  </g>

  <!-- Terminal Crown Leaflets -->
  <g filter="url(#softShadow)">
    <path d="M 600 130 C 560 60, 590 20, 600 10 C 610 20, 640 60, 600 130 Z" fill="url(#leafGradLight)" stroke="#15803d" stroke-width="2"/>
    <path d="M 600 130 L 600 20" stroke="#bbf7d0" stroke-width="2.5" opacity="0.9"/>
  </g>

  <!-- Glossy Red Tomatoes (Fruit Cluster) -->
  <g filter="url(#softShadow)">
    <!-- Tomato 1 -->
    <circle cx="530" cy="510" r="42" fill="url(#tomatoGrad)"/>
    <ellipse cx="516" cy="492" rx="14" ry="7" fill="#ffffff" opacity="0.45" transform="rotate(-25 516 492)"/>
    <!-- Calyx -->
    <path d="M 530 468 L 525 450 L 535 460 L 545 448 L 540 468 L 555 465 L 538 474 Z" fill="#15803d"/>

    <!-- Tomato 2 -->
    <circle cx="585" cy="535" r="34" fill="url(#tomatoGrad)"/>
    <ellipse cx="574" cy="520" rx="10" ry="5" fill="#ffffff" opacity="0.45" transform="rotate(-25 574 520)"/>
    <path d="M 585 501 L 580 488 L 590 496 L 598 486 L 593 501 Z" fill="#15803d"/>
  </g>

  <!-- Golden 5-Petaled Flower Blossoms -->
  <g filter="url(#softShadow)">
    <!-- Flower 1 -->
    <g transform="translate(645, 230)">
      <circle cx="0" cy="0" r="32" fill="none"/>
      <!-- 5 Petals -->
      <path d="M 0 0 L -8 -26 L 0 -34 L 8 -26 Z" fill="url(#flowerGrad)" stroke="#b45309" stroke-width="1.5"/>
      <path d="M 0 0 L 22 -14 L 30 -16 L 22 -4 Z" fill="url(#flowerGrad)" stroke="#b45309" stroke-width="1.5"/>
      <path d="M 0 0 L 20 18 L 24 26 L 12 24 Z" fill="url(#flowerGrad)" stroke="#b45309" stroke-width="1.5"/>
      <path d="M 0 0 L -12 24 L -18 30 L -22 18 Z" fill="url(#flowerGrad)" stroke="#b45309" stroke-width="1.5"/>
      <path d="M 0 0 L -24 -4 L -32 -10 L -22 -16 Z" fill="url(#flowerGrad)" stroke="#b45309" stroke-width="1.5"/>
      <!-- Cone Stamen -->
      <circle cx="0" cy="0" r="9" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="4" fill="#ffffff" opacity="0.6"/>
    </g>

    <!-- Flower 2 (Bud) -->
    <g transform="translate(545, 210)">
      <path d="M 0 0 C -12 -18, -4 -30, 0 -36 C 4 -30, 12 -18, 0 0 Z" fill="#facc15" stroke="#b45309" stroke-width="1.5"/>
      <path d="M -6 0 L -12 -15 L 0 -5 L 12 -15 L 6 0 Z" fill="#22c55e"/>
    </g>
  </g>

  <!-- Floating Pollen Specks -->
  <circle cx="680" cy="180" r="3" fill="#f59e0b" opacity="0.8"/>
  <circle cx="720" cy="210" r="2" fill="#eab308" opacity="0.7"/>
  <circle cx="510" cy="190" r="2.5" fill="#f59e0b" opacity="0.75"/>
  <circle cx="480" cy="240" r="3" fill="#ca8a04" opacity="0.6"/>
</svg>
`);

// 2. Stage 2: Microscopic Leaf Surface & Breathing Stomata Pores
export const STAGE2_STOMATA_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="epithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5"/>
      <stop offset="40%" stop-color="#d1fae5"/>
      <stop offset="80%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#6ee7b7"/>
    </linearGradient>
    <radialGradient id="guardCellGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="40%" stop-color="#22c55e"/>
      <stop offset="80%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </radialGradient>
    <radialGradient id="poreDarkness" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#022c22"/>
      <stop offset="60%" stop-color="#064e3b"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </radialGradient>
    <linearGradient id="vaporGrad" x1="50%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
      <stop offset="60%" stop-color="#67e8f9" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0"/>
    </linearGradient>
    <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#065f46" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- Microscopic Epidermis Background -->
  <rect width="1200" height="700" fill="url(#epithGrad)"/>

  <!-- Pavement Cells (Jigsaw puzzle pattern) -->
  <g stroke="#34d399" stroke-width="4" fill="none" opacity="0.65">
    <path d="M 0 100 Q 120 70 200 130 T 380 90 T 520 180 T 700 120 T 890 200 T 1080 110 L 1200 140"/>
    <path d="M 0 280 Q 150 240 260 320 T 440 260 T 600 370 T 780 290 T 960 380 T 1140 280 L 1200 310"/>
    <path d="M 0 460 Q 110 420 220 500 T 400 440 T 560 550 T 740 470 T 920 560 T 1100 460 L 1200 490"/>
    <path d="M 0 620 Q 140 580 280 660 T 460 600 T 640 710 T 820 630 T 1000 720 L 1200 650"/>
  </g>

  <!-- Waxy Cuticle Shimmer Spotlights -->
  <ellipse cx="320" cy="220" rx="90" ry="40" fill="#ffffff" opacity="0.35" transform="rotate(-15 320 220)"/>
  <ellipse cx="880" cy="480" rx="110" ry="50" fill="#ffffff" opacity="0.3" transform="rotate(20 880 480)"/>

  <!-- Secondary Background Stomata (Smaller) -->
  <g transform="translate(240, 260) scale(0.65)" filter="url(#cellShadow)">
    <ellipse cx="-45" cy="0" rx="35" ry="80" fill="url(#guardCellGrad)" transform="rotate(-12 -45 0)"/>
    <ellipse cx="45" cy="0" rx="35" ry="80" fill="url(#guardCellGrad)" transform="rotate(12 45 0)"/>
    <ellipse cx="0" cy="0" rx="18" ry="60" fill="url(#poreDarkness)"/>
  </g>

  <g transform="translate(940, 360) scale(0.7)" filter="url(#cellShadow)">
    <ellipse cx="-45" cy="0" rx="35" ry="80" fill="url(#guardCellGrad)" transform="rotate(-12 -45 0)"/>
    <ellipse cx="45" cy="0" rx="35" ry="80" fill="url(#guardCellGrad)" transform="rotate(12 45 0)"/>
    <ellipse cx="0" cy="0" rx="18" ry="60" fill="url(#poreDarkness)"/>
  </g>

  <!-- Primary Giant Stomatal Complex (Centerpiece) -->
  <g transform="translate(600, 350)" filter="url(#cellShadow)">
    <!-- Left Kidney-Shaped Guard Cell -->
    <path d="M -15 -170 C -110 -140, -140 -40, -140 0 C -140 40, -110 140, -15 170 C -40 120, -50 40, -50 0 C -50 -40, -40 -120, -15 -170 Z" 
          fill="url(#guardCellGrad)" stroke="#166534" stroke-width="4"/>

    <!-- Right Kidney-Shaped Guard Cell -->
    <path d="M 15 -170 C 110 -140, 140 -40, 140 0 C 140 40, 110 140, 15 170 C 40 120, 50 40, 50 0 C 50 -40, 40 -120, 15 -170 Z" 
          fill="url(#guardCellGrad)" stroke="#166534" stroke-width="4"/>

    <!-- Breathing Central Aperture Pore -->
    <ellipse cx="0" cy="0" rx="34" ry="135" fill="url(#poreDarkness)" stroke="#042f2e" stroke-width="3"/>

    <!-- Guard Cell Chloroplasts (Inside Left Guard Cell) -->
    <circle cx="-85" cy="-70" r="14" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
    <circle cx="-95" cy="0" r="16" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
    <circle cx="-80" cy="70" r="14" fill="#4ade80" stroke="#15803d" stroke-width="2"/>

    <!-- Guard Cell Chloroplasts (Inside Right Guard Cell) -->
    <circle cx="85" cy="-70" r="14" fill="#4ade80" stroke="#15803d" stroke-width="2"/>
    <circle cx="95" cy="0" r="16" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
    <circle cx="80" cy="70" r="14" fill="#4ade80" stroke="#15803d" stroke-width="2"/>

    <!-- Transpiration Stream (Vapor Rising Upward) -->
    <path d="M -25 0 Q -50 -120 -20 -240 Q 0 -300 20 -240 Q 50 -120 25 0 Z" fill="url(#vaporGrad)"/>
    <circle cx="-12" cy="-140" r="8" fill="#bae6fd" opacity="0.75"/>
    <circle cx="18" cy="-180" r="6" fill="#bae6fd" opacity="0.6"/>
    <circle cx="-5" cy="-220" r="10" fill="#e0f2fe" opacity="0.5"/>
  </g>

  <!-- Clear Dewdrop Refraction -->
  <g transform="translate(420, 460)">
    <circle cx="0" cy="0" r="28" fill="#38bdf8" opacity="0.3"/>
    <circle cx="0" cy="0" r="24" fill="#e0f2fe" opacity="0.75"/>
    <ellipse cx="-8" cy="-8" rx="7" ry="4" fill="#ffffff" opacity="0.9" transform="rotate(-30 -8 -8)"/>
  </g>
</svg>
`);

// 3. Stage 3: Deep Cellular Organelles, Hexagonal Walls, Chloroplasts, Nutrients & Bacteria
export const STAGE3_CELLULAR_SVG = svgToUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
    <linearGradient id="cytoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4"/>
      <stop offset="50%" stop-color="#dcfce7"/>
      <stop offset="100%" stop-color="#bbf7d0"/>
    </linearGradient>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#15803d"/>
      <stop offset="50%" stop-color="#4ade80"/>
      <stop offset="100%" stop-color="#166534"/>
    </linearGradient>
    <radialGradient id="chloroplastGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#86efac"/>
      <stop offset="40%" stop-color="#22c55e"/>
      <stop offset="85%" stop-color="#15803d"/>
      <stop offset="100%" stop-color="#052e16"/>
    </radialGradient>
    <radialGradient id="bacteriaGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#f43f5e"/>
      <stop offset="50%" stop-color="#e11d48"/>
      <stop offset="100%" stop-color="#881337"/>
    </radialGradient>
    <radialGradient id="npkNutrient" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#b45309"/>
    </radialGradient>
    <filter id="organelleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#052e16" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- Cytoplasm Fluid Background -->
  <rect width="1200" height="700" fill="url(#cytoGrad)"/>

  <!-- Hexagonal Cellulose Cell Wall Network -->
  <g stroke="url(#wallGrad)" stroke-width="16" fill="none" opacity="0.85" stroke-linejoin="round">
    <!-- Center Cell -->
    <polygon points="600,120 780,225 780,435 600,540 420,435 420,225"/>
    
    <!-- Adjacent Upper Left -->
    <polygon points="420,20 600,120 420,225 240,120 240,-90 420,-190"/>
    <!-- Adjacent Upper Right -->
    <polygon points="780,20 960,-85 960,120 780,225 600,120 780,20"/>
    <!-- Adjacent Left -->
    <polygon points="240,120 420,225 420,435 240,540 60,435 60,225"/>
    <!-- Adjacent Right -->
    <polygon points="960,120 1140,225 1140,435 960,540 780,435 780,225"/>
    <!-- Adjacent Lower Left -->
    <polygon points="420,435 600,540 420,645 240,750 240,540 420,435"/>
    <!-- Adjacent Lower Right -->
    <polygon points="780,435 960,540 960,750 780,645 600,540 780,435"/>
  </g>

  <!-- Middle Lamella Inner Border -->
  <polygon points="600,136 764,233 764,427 600,524 436,427 436,233" 
           fill="#ecfdf5" stroke="#86efac" stroke-width="4" opacity="0.6"/>

  <!-- Large Central Vacuole -->
  <ellipse cx="600" cy="330" rx="140" ry="110" fill="#bae6fd" opacity="0.35" stroke="#38bdf8" stroke-width="2"/>
  <ellipse cx="580" cy="300" rx="70" ry="40" fill="#ffffff" opacity="0.4"/>

  <!-- Circulating Chloroplast Organelles (Cyclosis) -->
  <g filter="url(#organelleShadow)">
    <ellipse cx="480" cy="240" rx="36" ry="22" fill="url(#chloroplastGrad)" transform="rotate(-30 480 240)"/>
    <ellipse cx="720" cy="240" rx="36" ry="22" fill="url(#chloroplastGrad)" transform="rotate(30 720 240)"/>
    <ellipse cx="730" cy="400" rx="38" ry="24" fill="url(#chloroplastGrad)" transform="rotate(-25 730 400)"/>
    <ellipse cx="490" cy="420" rx="38" ry="24" fill="url(#chloroplastGrad)" transform="rotate(25 490 420)"/>
    <ellipse cx="600" cy="180" rx="34" ry="20" fill="url(#chloroplastGrad)"/>
    <ellipse cx="600" cy="480" rx="36" ry="22" fill="url(#chloroplastGrad)"/>
    
    <!-- Internal Thylakoid Grana Stacks -->
    <line x1="465" y1="240" x2="495" y2="240" stroke="#86efac" stroke-width="2.5"/>
    <line x1="705" y1="240" x2="735" y2="240" stroke="#86efac" stroke-width="2.5"/>
    <line x1="715" y1="400" x2="745" y2="400" stroke="#86efac" stroke-width="2.5"/>
    <line x1="475" y1="420" x2="505" y2="420" stroke="#86efac" stroke-width="2.5"/>
  </g>

  <!-- Streaming N-P-K Golden Nutrient Ions (Nitrogen, Phosphorus, Potassium) -->
  <g filter="url(#organelleShadow)">
    <!-- Potassium K+ Stream -->
    <circle cx="530" cy="310" r="11" fill="url(#npkNutrient)" stroke="#ca8a04" stroke-width="2"/>
    <text x="530" y="315" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#451a03" text-anchor="middle">K+</text>

    <!-- Nitrogen N Stream -->
    <circle cx="670" cy="310" r="11" fill="url(#npkNutrient)" stroke="#ca8a04" stroke-width="2"/>
    <text x="670" y="315" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#451a03" text-anchor="middle">N</text>

    <!-- Phosphorus P Stream -->
    <circle cx="600" cy="270" r="11" fill="url(#npkNutrient)" stroke="#ca8a04" stroke-width="2"/>
    <text x="600" y="275" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#451a03" text-anchor="middle">P</text>

    <!-- Extra Nutrient micro-beads -->
    <circle cx="560" cy="350" r="5" fill="#facc15"/>
    <circle cx="640" cy="360" r="6" fill="#facc15"/>
    <circle cx="620" cy="220" r="5" fill="#facc15"/>
  </g>

  <!-- Swimming Pathogen Bacteria (Xanthomonas / Alternaria Spores) -->
  <g filter="url(#organelleShadow)">
    <!-- Bacteria 1 -->
    <g transform="translate(860, 310) rotate(25)">
      <!-- Capsule Body -->
      <rect x="-35" y="-12" width="70" height="24" rx="12" fill="url(#bacteriaGrad)" stroke="#4c0519" stroke-width="2"/>
      <!-- Flagella Tails -->
      <path d="M 35 0 Q 55 -15 75 -5 T 110 -10" fill="none" stroke="#e11d48" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 35 6 Q 60 20 85 10 T 115 20" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Bacteria 2 -->
    <g transform="translate(300, 380) rotate(-40)">
      <rect x="-28" y="-10" width="56" height="20" rx="10" fill="url(#bacteriaGrad)" stroke="#4c0519" stroke-width="2"/>
      <path d="M 28 0 Q 48 -12 65 -4 T 95 -8" fill="none" stroke="#e11d48" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>
</svg>
`);
