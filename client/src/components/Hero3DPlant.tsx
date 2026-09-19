import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../context/LanguageContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Eye, 
  ShieldCheck, 
  Bug, 
  Sparkles, 
  Play, 
  Pause,
  Compass,
  Layers,
  Sun,
  Droplets,
  Flower2,
  Leaf,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';

type ViewStage = 'macro' | 'leaf' | 'cellular';

// In-memory procedural canvas texture generators for 100% offline, zero-asset failure
function createLeafTexture(isInfected = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base leaf blade gradient with rich chlorophyll depths
  const grad = ctx.createRadialGradient(512, 700, 50, 512, 512, 560);
  if (!isInfected) {
    grad.addColorStop(0, '#2e7d32');
    grad.addColorStop(0.4, '#1b5e20');
    grad.addColorStop(0.85, '#144617');
    grad.addColorStop(1, '#0d2e0f');
  } else {
    grad.addColorStop(0, '#689f38');
    grad.addColorStop(0.35, '#c0ca33');
    grad.addColorStop(0.65, '#8d4b10');
    grad.addColorStop(0.9, '#451a03');
    grad.addColorStop(1, '#1b5e20');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Epidermal cobblestone cellular texture overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 400; i++) {
    const cx = Math.random() * 1024;
    const cy = Math.random() * 1024;
    const cr = 6 + Math.random() * 14;
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Pale Central Midrib Vein
  ctx.strokeStyle = isInfected ? '#dce775' : '#81c784';
  ctx.lineWidth = 18;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(512, 1020);
  ctx.quadraticCurveTo(514, 512, 512, 20);
  ctx.stroke();

  // Secondary Lateral Veins
  for (let i = 0; i < 11; i++) {
    const y = 960 - i * 85;
    const len = 340 - i * 22;
    ctx.lineWidth = Math.max(3, 8 - i * 0.5);
    ctx.strokeStyle = isInfected ? '#c0ca33' : '#a5d6a7';
    // Left
    ctx.beginPath();
    ctx.moveTo(512, y);
    ctx.quadraticCurveTo(410, y - 25, 512 - len, y - 100);
    ctx.stroke();
    // Right
    ctx.beginPath();
    ctx.moveTo(512, y);
    ctx.quadraticCurveTo(614, y - 25, 512 + len, y - 100);
    ctx.stroke();

    // Tertiary fine veinlets
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(165, 214, 167, 0.35)';
    for (let v = 0; v < 4; v++) {
      const vx = 512 - len * (0.2 + v * 0.2);
      const vy = y - 40 - v * 15;
      ctx.beginPath();
      ctx.moveTo(vx, vy);
      ctx.lineTo(vx - 20, vy - 15);
      ctx.stroke();
    }
  }

  // Concentric target-board rings if infected
  if (isInfected) {
    ctx.fillStyle = '#1c0b02';
    ctx.beginPath();
    ctx.arc(420, 480, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(420, 480, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(420, 480, 95, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(420, 480, 130, 0, Math.PI * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

function createStemTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 512, 0, 0);
  grad.addColorStop(0, '#3e2723');
  grad.addColorStop(0.3, '#4e342e');
  grad.addColorStop(0.65, '#2e7d32');
  grad.addColorStop(1, '#43a047');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 512);

  // Woody striations
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  for (let x = 0; x < 256; x += 4) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  return new THREE.CanvasTexture(canvas);
}

// Epidermal microscopic pavement cell texture
function createEpidermisTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Fresh leaf green gradient
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#388e3c');
  grad.addColorStop(0.5, '#2e7d32');
  grad.addColorStop(1, '#1b5e20');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Pavement cell outlines (undulating jigsaw puzzle borders)
  ctx.strokeStyle = 'rgba(165, 214, 167, 0.4)';
  ctx.lineWidth = 3;
  for (let gx = 40; gx < 1000; gx += 80) {
    for (let gy = 40; gy < 1000; gy += 80) {
      ctx.beginPath();
      ctx.arc(gx + (Math.sin(gy) * 15), gy + (Math.cos(gx) * 15), 34, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // Waxy cuticle sheen spots
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  for (let i = 0; i < 200; i++) {
    const rx = Math.random() * 1024;
    const ry = Math.random() * 1024;
    ctx.beginPath();
    ctx.ellipse(rx, ry, 12, 6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
  }

  return new THREE.CanvasTexture(canvas);
}

export const Hero3DPlant: React.FC = () => {
  const { t, language, speak, stopSpeaking, isSpeaking } = useLanguage();
  const mountRef = useRef<HTMLDivElement>(null);

  // State
  const [stage, setStage] = useState<ViewStage>('macro');
  const [zoomDepth, setZoomDepth] = useState<number>(15);
  const [pathogenMode, setPathogenMode] = useState<'both' | 'nutrients' | 'pathogens'>('both');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [activeInfo, setActiveInfo] = useState<string>('');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const plantGroupRef = useRef<THREE.Group | null>(null);
  const leafMacroGroupRef = useRef<THREE.Group | null>(null);
  const cellularGroupRef = useRef<THREE.Group | null>(null);
  const nutrientParticlesRef = useRef<THREE.Points | null>(null);
  const pathogenGroupRef = useRef<THREE.Group | null>(null);
  const stomataVaporRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number>(0);

  // Camera targets for smooth cinematic lerp
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.8, 12.5));
  const targetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.6, 0));
  const currentLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0, 1.6, 0));

  // Interaction dragging
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene with Pure White Background (#ffffff)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 12.5);
    cameraRef.current = camera;

    // 3. Renderer with ACES Tone Mapping for vibrant natural colours
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting on Pure White Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    sunLight.position.set(9, 16, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    // Chlorophyll Emerald Bounce Light
    const leafRimLight = new THREE.DirectionalLight(0x22c55e, 1.2);
    leafRimLight.position.set(-9, 5, -8);
    scene.add(leafRimLight);

    // Soft Golden Warmth
    const fillLight = new THREE.DirectionalLight(0xfef08a, 0.7);
    fillLight.position.set(0, -6, 6);
    scene.add(fillLight);

    // Cellular Green/Gold Core Light for Stage 3
    const cellularGlow = new THREE.PointLight(0x10b981, 2.5, 14);
    cellularGlow.position.set(0, 1.6, 0);
    scene.add(cellularGlow);

    // Textures
    const healthyLeafTex = createLeafTexture(false);
    const infectedLeafTex = createLeafTexture(true);
    const stemTex = createStemTexture();
    const epidermisTex = createEpidermisTexture();

    // ========================================================================
    // STAGE 1: 3D LIVING REALISTIC CROP PLANT (Macro)
    // ========================================================================
    const plantGroup = new THREE.Group();
    plantGroupRef.current = plantGroup;
    scene.add(plantGroup);

    // Main Stem: Natural S-Curvature CatmullRom Spline Tube
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -3.4, 0),
      new THREE.Vector3(0.08, -1.8, 0.05),
      new THREE.Vector3(-0.1, 0.2, 0.08),
      new THREE.Vector3(0.14, 1.9, -0.06),
      new THREE.Vector3(-0.06, 3.6, 0.03),
      new THREE.Vector3(0.02, 5.0, 0.0)
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 72, 0.24, 14, false);
    const stemMat = new THREE.MeshStandardMaterial({ map: stemTex, roughness: 0.65 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = true;
    stemMesh.receiveShadow = true;
    plantGroup.add(stemMesh);

    // Soil Base Mound with Rich Loam Texture
    const soilGeo = new THREE.CylinderGeometry(2.8, 3.3, 0.8, 36);
    const soilMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.95 });
    const soil = new THREE.Mesh(soilGeo, soilMat);
    soil.position.y = -3.7;
    soil.receiveShadow = true;
    plantGroup.add(soil);

    // 3D Curved Double-Arched Compound Leaflet Generator
    const createCurvedLeaf = (w: number, l: number) => {
      const geo = new THREE.PlaneGeometry(w, l, 20, 28);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const normY = (y + l / 2) / l; // 0 to 1
        const normX = Math.abs(x) / (w / 2); // 0 to 1

        // Organic Leaf Tapering
        const taper = Math.sin(normY * Math.PI) * (1.0 - normY * 0.15);
        pos.setX(i, x * (0.28 + taper * 0.82));

        // Transverse V-Fold + Natural Downward Gravity Droop
        const vCrease = -normX * 0.22;
        const droop = -Math.pow(normY, 2.1) * (l * 0.38);
        pos.setZ(i, vCrease + droop);
      }
      geo.computeVertexNormals();
      return geo;
    };

    const healthyMat = new THREE.MeshStandardMaterial({
      map: healthyLeafTex,
      roughness: 0.34,
      side: THREE.DoubleSide
    });
    const infectedMat = new THREE.MeshStandardMaterial({
      map: infectedLeafTex,
      roughness: 0.46,
      side: THREE.DoubleSide
    });

    // 20 Lush Radial Compound Leaf Nodes (Fibonacci Phyllotaxis)
    const leafNodes: { group: THREE.Group; petiole: THREE.Mesh; blade: THREE.Mesh; phase: number }[] = [];
    for (let i = 0; i < 20; i++) {
      const frac = i / 20;
      const y = -2.6 + frac * 7.2;
      const angle = i * 137.5 * (Math.PI / 180); // Golden angle
      const scale = 0.7 + Math.sin(frac * Math.PI) * 0.55;

      const branch = new THREE.Group();
      branch.position.set(0, y, 0);
      branch.rotation.y = angle;

      // Primary Petiole
      const petLen = 0.95 * scale;
      const pCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(petLen * 0.45, 0.12 * scale, 0),
        new THREE.Vector3(petLen, -0.05 * scale, 0)
      ]);
      const pGeo = new THREE.TubeGeometry(pCurve, 10, 0.045 * scale, 8, false);
      const petiole = new THREE.Mesh(pGeo, stemMat);
      petiole.castShadow = true;
      branch.add(petiole);

      // Main Compound Leaflet
      const isInf = (i === 4 || i === 9 || i === 15);
      const bladeGeo = createCurvedLeaf(1.65 * scale, 2.8 * scale);
      const blade = new THREE.Mesh(bladeGeo, isInf ? infectedMat : healthyMat);
      blade.position.set(petLen, -0.05 * scale, 0);
      blade.rotation.set(0.2, 0, -0.35);
      blade.castShadow = true;
      branch.add(blade);

      // Secondary Lateral Leaflet Pairs for Full Compound Tomato Foliage
      const lateralGeo = createCurvedLeaf(1.1 * scale, 1.8 * scale);
      const leftSub = new THREE.Mesh(lateralGeo, isInf ? infectedMat : healthyMat);
      leftSub.position.set(petLen * 0.6, 0.02, 0.45 * scale);
      leftSub.rotation.set(0.15, 0.6, -0.25);
      leftSub.castShadow = true;
      branch.add(leftSub);

      const rightSub = new THREE.Mesh(lateralGeo, isInf ? infectedMat : healthyMat);
      rightSub.position.set(petLen * 0.6, 0.02, -0.45 * scale);
      rightSub.rotation.set(0.15, -0.6, -0.25);
      rightSub.castShadow = true;
      branch.add(rightSub);

      plantGroup.add(branch);
      leafNodes.push({ group: branch, petiole, blade, phase: i * 0.45 });
    }

    // 4 Trusses of Blooming Yellow 5-Petal Star Blossoms
    const flowerMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.28,
      emissive: 0xeab308,
      emissiveIntensity: 0.25
    });
    const centerMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 });
    const calyxMat = new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.45 });

    for (let f = 0; f < 4; f++) {
      const flowerGroup = new THREE.Group();
      // Center Cone
      const center = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 10), centerMat);
      center.rotateZ(Math.PI / 2);
      flowerGroup.add(center);

      // 5 Yellow Petals
      const petalGeo = new THREE.ConeGeometry(0.14, 0.38, 4);
      petalGeo.rotateZ(Math.PI / 2);
      for (let p = 0; p < 5; p++) {
        const petal = new THREE.Mesh(petalGeo, flowerMat);
        petal.rotation.y = (p / 5) * Math.PI * 2;
        petal.position.set(Math.cos(petal.rotation.y) * 0.18, 0, Math.sin(petal.rotation.y) * 0.18);
        flowerGroup.add(petal);

        // Green Sepal Behind Each Petal
        const sepal = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.3, 4), calyxMat);
        sepal.rotation.y = (p / 5) * Math.PI * 2 + 0.3;
        sepal.position.set(Math.cos(sepal.rotation.y) * 0.14, -0.04, Math.sin(sepal.rotation.y) * 0.14);
        sepal.rotation.z = -0.3;
        flowerGroup.add(sepal);
      }

      flowerGroup.position.set(Math.cos(f * 2.0) * 0.85, 0.8 + f * 1.1, Math.sin(f * 2.0) * 0.85);
      plantGroup.add(flowerGroup);
    }

    // Realistic Plump Tomatoes (Ripe Red, Orange Ripening & Firm Green)
    const createTomato = (x: number, y: number, z: number, r: number, color: number) => {
      const tg = new THREE.Group();
      tg.position.set(x, y, z);
      const fruitMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.18,
        metalness: 0.05
      });
      const fruit = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), fruitMat);
      fruit.scale.set(1.1, 0.95, 1.1);
      fruit.castShadow = true;
      fruit.receiveShadow = true;
      tg.add(fruit);

      // Star-Shaped 5-Point Green Calyx Sepals
      for (let s = 0; s < 5; s++) {
        const sep = new THREE.Mesh(new THREE.ConeGeometry(0.06, r * 0.7, 4), calyxMat);
        sep.position.y = r * 0.92;
        sep.rotation.y = (s / 5) * Math.PI * 2;
        sep.rotation.z = -0.55;
        tg.add(sep);
      }
      plantGroup.add(tg);
    };

    createTomato(0.9, -0.6, 0.75, 0.48, 0xd32f2f);  // Ripe Red Tomato 1
    createTomato(0.7, -0.8, 1.1, 0.38, 0xe53935);   // Ripe Red Tomato 2
    createTomato(-0.85, 0.4, -0.65, 0.44, 0xf97316); // Ripening Orange Tomato
    createTomato(0.75, 1.7, -0.55, 0.36, 0x65a30d); // Firm Green Unripe Tomato
    createTomato(-0.6, 2.3, 0.6, 0.3, 0x4d7c0f);   // Developing Small Green Fruit

    // ========================================================================
    // STAGE 2: 3D LEAF SURFACE & FUNCTIONAL STOMATA (MESO VIEW)
    // ========================================================================
    const leafMacroGroup = new THREE.Group();
    leafMacroGroupRef.current = leafMacroGroup;
    scene.add(leafMacroGroup);

    // Microscopic Leaf Epidermal Topography: Cobblestone Pavement Surface
    const epiGeo = new THREE.PlaneGeometry(10, 10, 48, 48);
    const epiPos = epiGeo.attributes.position;
    for (let i = 0; i < epiPos.count; i++) {
      const u = epiPos.getX(i);
      const v = epiPos.getY(i);
      // Gentle undulating cell ridges
      const ridge = Math.sin(u * 1.8) * 0.22 + Math.cos(v * 1.8) * 0.22;
      // Central Midrib Vein Elevation along Y
      const distFromVein = Math.abs(u);
      const veinHump = Math.exp(-Math.pow(distFromVein / 0.9, 2)) * 0.65;
      epiPos.setZ(i, ridge + veinHump);
    }
    epiGeo.computeVertexNormals();

    const epiMat = new THREE.MeshStandardMaterial({
      map: epidermisTex,
      roughness: 0.28,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const epiMesh = new THREE.Mesh(epiGeo, epiMat);
    epiMesh.position.set(0, 1.6, 0);
    epiMesh.rotation.x = -Math.PI / 3.4; // Tilted slightly towards camera
    epiMesh.receiveShadow = true;
    leafMacroGroup.add(epiMesh);

    // 3D Stomata Guard Cells (Functional Kidney-Shaped Pairs)
    const stomataList: THREE.Group[] = [];
    for (let s = 0; s < 28; s++) {
      const stoma = new THREE.Group();

      // Guard Cell 1 (Left)
      const gcLeft = new THREE.Mesh(
        new THREE.TorusGeometry(0.18, 0.06, 10, 18, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.35, emissive: 0x15803d, emissiveIntensity: 0.2 })
      );
      gcLeft.rotation.z = Math.PI / 2;
      stoma.add(gcLeft);

      // Guard Cell 2 (Right)
      const gcRight = gcLeft.clone();
      gcRight.rotation.z = -Math.PI / 2;
      stoma.add(gcRight);

      // Dark Central Pore Opening
      const pore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.22, 8),
        new THREE.MeshBasicMaterial({ color: 0x052e16 })
      );
      pore.rotation.x = Math.PI / 2;
      stoma.add(pore);

      // Position across epidermis (avoiding central midrib)
      let sx = (Math.random() - 0.5) * 7.5;
      if (Math.abs(sx) < 1.0) sx += (sx >= 0 ? 1.2 : -1.2);
      const sy = (Math.random() - 0.5) * 7.5;
      stoma.position.set(sx, sy, 0.25);
      stoma.rotation.z = Math.random() * Math.PI;
      epiMesh.add(stoma);
      stomataList.push(stoma);
    }

    // 3D Leaf Trichomes (Protective Plant Leaf Hairs)
    for (let h = 0; h < 24; h++) {
      const hairGroup = new THREE.Group();
      const hCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.06, 0.18, 0.2),
        new THREE.Vector3(-0.04, 0.38, 0.45)
      ]);
      const hMesh = new THREE.Mesh(
        new THREE.TubeGeometry(hCurve, 8, 0.02, 6, false),
        new THREE.MeshStandardMaterial({ color: 0xdcfce7, roughness: 0.2, transparent: true, opacity: 0.85 })
      );
      hairGroup.add(hMesh);

      // Spherical Glandular Tip
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xeab308, emissiveIntensity: 0.4 })
      );
      tip.position.set(-0.04, 0.38, 0.45);
      hairGroup.add(tip);

      hairGroup.position.set((Math.random() - 0.5) * 7.0, (Math.random() - 0.5) * 7.0, 0.25);
      epiMesh.add(hairGroup);
    }

    // 3D Transpiration Vapor Particles (Exhaling H2O & O2 from Stomata)
    const vCnt = 140;
    const vPos = new Float32Array(vCnt * 3);
    for (let v = 0; v < vCnt; v++) {
      vPos[v * 3] = (Math.random() - 0.5) * 6.5;
      vPos[v * 3 + 1] = (Math.random() - 0.5) * 6.5;
      vPos[v * 3 + 2] = 0.3 + Math.random() * 2.2;
    }
    const vGeo = new THREE.BufferGeometry();
    vGeo.setAttribute('position', new THREE.BufferAttribute(vPos, 3));
    const stomataVapor = new THREE.Points(
      vGeo,
      new THREE.PointsMaterial({
        size: 0.12,
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
      })
    );
    stomataVaporRef.current = stomataVapor;
    epiMesh.add(stomataVapor);

    // 3D Glistening Dewdrops on Surface
    const dewMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85
    });
    for (let d = 0; d < 12; d++) {
      const dew = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), dewMat);
      dew.scale.set(1.1, 0.65, 1.1);
      dew.position.set((Math.random() - 0.5) * 6.8, (Math.random() - 0.5) * 6.8, 0.25);
      epiMesh.add(dew);
    }

    // 3D Inoculated Early Blight Infection Zone with Brown Necrosis
    const lesionZone = new THREE.Group();
    lesionZone.position.set(-1.8, 1.2, 0.26);
    const lesionMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.95, 32),
      new THREE.MeshStandardMaterial({ color: 0x271202, roughness: 0.8 })
    );
    lesionZone.add(lesionMesh);

    // Yellow Chlorotic Border
    const haloMesh = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.4, 32),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4, side: THREE.DoubleSide })
    );
    lesionZone.add(haloMesh);
    epiMesh.add(lesionZone);

    // ========================================================================
    // STAGE 3: 3D CELLULAR INTERIOR: NUTRIENTS & BACTERIA (MICRO VIEW)
    // ========================================================================
    const cellularGroup = new THREE.Group();
    cellularGroupRef.current = cellularGroup;
    cellularGroup.position.set(0, 1.6, 0);
    scene.add(cellularGroup);

    // 3D Translucent Polygonal Cellulose Plant Cell Wall
    const cellWall = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.8, 2),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        wireframe: true,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      })
    );
    cellularGroup.add(cellWall);

    // Cytoplasm Inner Fluid Core
    const cyto = new THREE.Mesh(
      new THREE.SphereGeometry(2.25, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0x064e3b,
        transparent: true,
        opacity: 0.28,
        roughness: 0.1
      })
    );
    cellularGroup.add(cyto);

    // 12 Green Discoid Chloroplast Organelles with Stacking
    const cpList: THREE.Mesh[] = [];
    for (let c = 0; c < 12; c++) {
      const cp = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x22c55e,
          emissive: 0x15803d,
          emissiveIntensity: 0.45,
          roughness: 0.3
        })
      );
      cp.scale.set(1.4, 0.55, 0.9);
      const theta = (c / 12) * Math.PI * 2;
      cp.position.set(Math.cos(theta) * 1.45, Math.sin(theta * 2) * 0.75, Math.sin(theta) * 1.45);
      cellularGroup.add(cp);
      cpList.push(cp);
    }

    // 3D Glowing Nutrient Particles (Golden NPK Energy Streams)
    const nCnt = 380;
    const nPos = new Float32Array(nCnt * 3);
    const nCol = new Float32Array(nCnt * 3);
    for (let n = 0; n < nCnt; n++) {
      const rad = 0.25 + Math.random() * 1.7;
      const ang = Math.random() * Math.PI * 2;
      nPos[n * 3] = Math.cos(ang) * rad;
      nPos[n * 3 + 1] = (Math.random() - 0.5) * 3.8;
      nPos[n * 3 + 2] = Math.sin(ang) * rad;

      // Color Coding: Golden Nitrogen/Phosphorus, Emerald Chlorophyll, Azure Potassium
      if (n % 4 === 0) {
        nCol[n * 3] = 0.98; nCol[n * 3 + 1] = 0.82; nCol[n * 3 + 2] = 0.15; // Golden NPK
      } else if (n % 4 === 1) {
        nCol[n * 3] = 0.2; nCol[n * 3 + 1] = 0.95; nCol[n * 3 + 2] = 0.4; // Emerald
      } else if (n % 4 === 2) {
        nCol[n * 3] = 0.38; nCol[n * 3 + 1] = 0.82; nCol[n * 3 + 2] = 0.98; // Potassium Blue
      } else {
        nCol[n * 3] = 0.95; nCol[n * 3 + 1] = 0.6; nCol[n * 3 + 2] = 0.1; // Phosphorus Orange
      }
    }
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute('position', new THREE.BufferAttribute(nPos, 3));
    nGeo.setAttribute('color', new THREE.BufferAttribute(nCol, 3));
    const nutrientParticles = new THREE.Points(
      nGeo,
      new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, opacity: 0.95 })
    );
    nutrientParticlesRef.current = nutrientParticles;
    cellularGroup.add(nutrientParticles);

    // 3D Attacking Bacteria (Xanthomonas oryzae / campestris with Flagella)
    const pathogenGroup = new THREE.Group();
    pathogenGroupRef.current = pathogenGroup;
    cellularGroup.add(pathogenGroup);

    const bacGeo = new THREE.CapsuleGeometry(0.14, 0.5, 8, 12);
    const bacMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xb91c1c,
      emissiveIntensity: 0.6,
      roughness: 0.3
    });
    for (let b = 0; b < 18; b++) {
      const bg = new THREE.Group();
      const bMesh = new THREE.Mesh(bacGeo, bacMat);
      bg.add(bMesh);

      // Wriggling Flagella Tail
      const fCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.28, 0),
        new THREE.Vector3(0.09, -0.48, 0.05),
        new THREE.Vector3(-0.08, -0.72, -0.04),
        new THREE.Vector3(0.05, -0.92, 0.02)
      ]);
      const fMesh = new THREE.Mesh(new THREE.TubeGeometry(fCurve, 10, 0.016, 6, false), bacMat);
      bg.add(fMesh);

      const bAng = (b / 18) * Math.PI * 2;
      const bDist = 2.1 + Math.random() * 0.9;
      bg.position.set(Math.cos(bAng) * bDist, (Math.random() - 0.5) * 2.5, Math.sin(bAng) * bDist);
      bg.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      pathogenGroup.add(bg);
    }

    // Set initial stage
    updateStageState(stage);

    // ========================================================================
    // 3D ANIMATION LOOP
    // ========================================================================
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const tTime = clock.getElapsedTime();

      // 1. Stage 1: Living Organic Wind Sway
      if (plantGroupRef.current && plantGroupRef.current.visible) {
        if (isRotating) {
          plantGroupRef.current.rotation.y += 0.003;
        }

        // Stem swaying
        stemMesh.rotation.z = Math.sin(tTime * 1.2) * 0.018;

        // Leaf fluttering
        leafNodes.forEach((node) => {
          node.petiole.rotation.z = Math.sin(tTime * 1.8 + node.phase) * 0.028;
          node.blade.rotation.x = 0.2 + Math.cos(tTime * 2.3 + node.phase) * 0.038;
        });
      }

      // 2. Stage 2: Stomata Breathing & Vapor Exhalation
      if (leafMacroGroupRef.current && leafMacroGroupRef.current.visible) {
        if (isRotating) {
          leafMacroGroupRef.current.rotation.y += 0.002;
        }

        stomataList.forEach((stoma, idx) => {
          const breathe = 1 + Math.sin(tTime * 2.4 + idx) * 0.14;
          stoma.scale.set(breathe, 1, 1);
        });

        // Vapor particles rising
        if (stomataVaporRef.current) {
          const vArray = stomataVaporRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 2; i < vArray.length; i += 3) {
            vArray[i] += 0.015;
            if (vArray[i] > 2.5) vArray[i] = 0.3;
          }
          stomataVaporRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }

      // 3. Stage 3: Cytoplasmic Streaming & Nutrient Flow
      if (cellularGroupRef.current && cellularGroupRef.current.visible) {
        if (isRotating) {
          cellularGroupRef.current.rotation.y += 0.0025;
        }

        // Chloroplast cyclosis rotation
        cpList.forEach((cp, idx) => {
          cp.rotation.y += 0.01;
          const theta = (idx / 12) * Math.PI * 2 + tTime * 0.15;
          cp.position.set(Math.cos(theta) * 1.45, Math.sin(theta * 2) * 0.75, Math.sin(theta) * 1.45);
        });

        // Golden NPK particles stream upward
        if (nutrientParticlesRef.current) {
          const positions = nutrientParticlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 1; i < positions.length; i += 3) {
            positions[i] += 0.028;
            if (positions[i] > 1.9) positions[i] = -1.9;
          }
          nutrientParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        // Bacteria wriggling & attacking
        if (pathogenGroupRef.current) {
          pathogenGroupRef.current.children.forEach((bac, idx) => {
            bac.rotation.x += 0.02;
            bac.rotation.y += 0.028;
            bac.position.y += Math.sin(tTime * 3.5 + idx) * 0.006;
          });
        }
      }

      // 4. Smooth Cinematic Camera Glide
      camera.position.lerp(targetCameraPos.current, 0.07);
      currentLookAt.current.lerp(targetLookAt.current, 0.07);
      camera.lookAt(currentLookAt.current);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = mountRef.current.clientWidth;
      const newH = mountRef.current.clientHeight || 580;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Mouse & Touch Drag Rotation
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      if (plantGroupRef.current && stage === 'macro') {
        plantGroupRef.current.rotation.y += deltaX * 0.008;
      }
      if (leafMacroGroupRef.current && stage === 'leaf') {
        leafMacroGroupRef.current.rotation.y += deltaX * 0.008;
      }
      if (cellularGroupRef.current && stage === 'cellular') {
        cellularGroupRef.current.rotation.y += deltaX * 0.008;
      }
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => { isDragging.current = false; };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      if (plantGroupRef.current && stage === 'macro') {
        plantGroupRef.current.rotation.y += deltaX * 0.01;
      }
      if (leafMacroGroupRef.current && stage === 'leaf') {
        leafMacroGroupRef.current.rotation.y += deltaX * 0.01;
      }
      if (cellularGroupRef.current && stage === 'cellular') {
        cellularGroupRef.current.rotation.y += deltaX * 0.01;
      }
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => { isDragging.current = false; };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const updateStageState = (newStage: ViewStage) => {
    if (!plantGroupRef.current || !leafMacroGroupRef.current || !cellularGroupRef.current) return;

    if (newStage === 'macro') {
      plantGroupRef.current.visible = true;
      leafMacroGroupRef.current.visible = false;
      cellularGroupRef.current.visible = false;
      targetCameraPos.current.set(0, 1.8, 12.5);
      targetLookAt.current.set(0, 1.6, 0);
      setActiveInfo(
        language === 'te' 
          ? 'దశ 1: మొత్తం 3D మొక్క - సహజ కాండం, 20+ ఆకులు, పసుపు పూలు మరియు ఎర్రటి కాయల గాలి కదలికలు.'
          : language === 'hi'
          ? 'चरण 1: संपूर्ण 3D पौधा - प्राकृतिक तना, 20+ पत्तियां, पीले फूल एवं फल हवा में लहराते हुए।'
          : 'Stage 1: Whole Living Crop Plant - Organic stem, compound foliage canopy, yellow blossoms & tomatoes.'
      );
    } else if (newStage === 'leaf') {
      plantGroupRef.current.visible = false;
      leafMacroGroupRef.current.visible = true;
      cellularGroupRef.current.visible = false;
      targetCameraPos.current.set(0, 2.2, 5.8);
      targetLookAt.current.set(0, 1.6, 0);
      setActiveInfo(
        language === 'te'
          ? 'దశ 2: ఆకు బాహ్య పొర - శ్వాసించే స్టొమాటా కణాలు, నీటి ఆవిరి బుడగలు, ఆకు వెంట్రుకలు (ట్రైకోమ్స్) మరియు మంచు బిందువులు.'
          : language === 'hi'
          ? 'चरण 2: पत्ती की सतह - सांस लेते स्टोमेटा छिद्र, जलवाष्प कण, सुरक्षात्मक रोम (ट्राइकोम) एवं ओस की बूंदें।'
          : 'Stage 2: 3D Leaf Surface - Breathing stomata guard cells exhaling vapor bubbles, leaf hairs & dew.'
      );
    } else if (newStage === 'cellular') {
      plantGroupRef.current.visible = false;
      leafMacroGroupRef.current.visible = false;
      cellularGroupRef.current.visible = true;
      targetCameraPos.current.set(0, 1.6, 3.4);
      targetLookAt.current.set(0, 1.6, 0);
      setActiveInfo(
        language === 'te'
          ? 'దశ 3: కణాల అంతర్గత రూపం - సెల్యులోజ్ కణకవచం, హరితరేణువులు, NPK పోషక ప్రవాహం vs దాడి చేసే జాంతోమోనాస్ బ్యాక్టీరియా.'
          : language === 'hi'
          ? 'चरण 3: सूक्ष्म कोशिका - सेल्यूलोज भित्ति, क्लोरोप्लास्ट, NPK पोषक धाराएं एवं हमलावर जैंथोमोनास बैक्टीरिया।'
          : 'Stage 3: 3D Cellular Interior - Cellulose cell wall, chloroplasts, glowing NPK streams vs flagellated bacteria.'
      );
    }
  };

  const handleStageSelect = (s: ViewStage) => {
    setStage(s);
    if (s === 'macro') setZoomDepth(15);
    if (s === 'leaf') setZoomDepth(50);
    if (s === 'cellular') setZoomDepth(90);
    updateStageState(s);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setZoomDepth(val);
    if (val < 35) {
      if (stage !== 'macro') {
        setStage('macro');
        updateStageState('macro');
      }
    } else if (val < 70) {
      if (stage !== 'leaf') {
        setStage('leaf');
        updateStageState('leaf');
      }
    } else {
      if (stage !== 'cellular') {
        setStage('cellular');
        updateStageState('cellular');
      }
    }
  };

  // Zoom In / Zoom Out Controls
  const handleZoomIn = () => {
    if (stage === 'macro') handleStageSelect('leaf');
    else if (stage === 'leaf') handleStageSelect('cellular');
  };

  const handleZoomOut = () => {
    if (stage === 'cellular') handleStageSelect('leaf');
    else if (stage === 'leaf') handleStageSelect('macro');
  };

  // Clickable 3D Hotspots on the Plant
  const handleHotspotClick = (spot: 'blossom' | 'fruit' | 'foliage' | 'stem') => {
    setActiveHotspot(spot);
    if (stage !== 'macro') {
      handleStageSelect('macro');
    }

    if (spot === 'blossom') {
      targetCameraPos.current.set(0.6, 1.4, 5.0);
      targetLookAt.current.set(0.3, 1.2, 0.3);
      setActiveInfo(
        language === 'te'
          ? '🌸 పువ్వులు & పిందెలు: పసుపు పూత అధిక దిగుబడికి పునాది. ఇక్కడే నల్ల తామర పురుగులు దాడి చేస్తాయి.'
          : language === 'hi'
          ? '🌸 पीले फूल एवं कलियां: यह परागण और फल बनने का मुख्य हिस्सा है। थ्रिप्स कीट यहीं हमला करते हैं।'
          : '🌸 Yellow Blossoms: Vital for pollination & fruit set. Highly susceptible to flower thrips.'
      );
    } else if (spot === 'fruit') {
      targetCameraPos.current.set(0.9, -0.4, 4.5);
      targetLookAt.current.set(0.8, -0.6, 0.6);
      setActiveInfo(
        language === 'te'
          ? '🍅 కాయల గుత్తి: కాయ తొలిచే పురుగుల నుండి రక్షించడానికి వేప నూనె లేదా పెంపుడు పరాన్నజీవులను వాడండి.'
          : language === 'hi'
          ? '🍅 फल गुच्छा: फल छेदक सुंडी से बचाव के लिए फेरोमोन ट्रैप एवं जैविक कीटनाशक का उपयोग करें।'
          : '🍅 Fruit Truss: Maturing red & green tomatoes. Requires monitoring for fruit borer larvae.'
      );
    } else if (spot === 'foliage') {
      targetCameraPos.current.set(-0.8, 0.5, 4.8);
      targetLookAt.current.set(-0.6, 0.3, 0);
      setActiveInfo(
        language === 'te'
          ? '🍃 ఆకుల పందిరి: కిరణజన్య సంయోగక్రియ జరుగుతుంది. ఎర్లీ బ్లైట్ మరియు నల్ల మచ్చల నివారణ ముఖ్యం.'
          : language === 'hi'
          ? '🍃 पत्तियों की छतरी: प्रकाश संश्लेषण का केंद्र। अगेती झुलसा के चकत्तों पर तुरंत ध्यान दें।'
          : '🍃 Foliage Canopy: Photosynthetic center. Inspect for Early Blight target lesions.'
      );
    } else if (spot === 'stem') {
      targetCameraPos.current.set(0, -1.0, 5.2);
      targetLookAt.current.set(0, -1.2, 0);
      setActiveInfo(
        language === 'te'
          ? '🪵 ప్రధాన కాండం: వేర్ల నుండి నీరు, పోషకాలను ఆకులకు సరఫరా చేసే వాహిక వ్యవస్థ.'
          : language === 'hi'
          ? '🪵 मुख्य तना: जड़ों से पोषक तत्वों को पत्तियों तक पहुंचाने वाली संवहनी प्रणाली।'
          : '🪵 Main Stem: Vascular xylem and phloem transport highway connecting roots to canopy.'
      );
    }
  };

  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    speak(activeInfo);
  };

  useEffect(() => {
    if (!nutrientParticlesRef.current || !pathogenGroupRef.current) return;
    if (pathogenMode === 'both') {
      nutrientParticlesRef.current.visible = true;
      pathogenGroupRef.current.visible = true;
    } else if (pathogenMode === 'nutrients') {
      nutrientParticlesRef.current.visible = true;
      pathogenGroupRef.current.visible = false;
    } else {
      nutrientParticlesRef.current.visible = false;
      pathogenGroupRef.current.visible = true;
    }
  }, [pathogenMode]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-white border-2 border-emerald-200 shadow-xl my-6">
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-[540px] sm:h-[600px] lg:h-[660px] cursor-grab active:cursor-grabbing touch-none select-none relative bg-white"
      >
        {/* Top Watermark & 3D Interactive Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-300 text-emerald-800 text-xs font-black tracking-wider uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>3D Interactive WebGL Crop</span>
          </div>
          <p className="text-xs text-slate-700 bg-white/95 px-3 py-1 rounded-lg backdrop-blur-sm border border-slate-200 font-bold shadow-xs">
            {language === 'te' 
              ? 'మౌస్ లేదా వేలితో 360° తిప్పండి • కింద ఉన్న 3 దశల బటన్లను వాడండి'
              : language === 'hi'
              ? 'माउस या उंगली से 360° घुमाएं • नीचे दिए गए 3 चरणों के बटन दबाएं'
              : 'Drag to rotate 360° • Click Stage 1, 2, or 3 to zoom in full 3D'}
          </p>
        </div>

        {/* Right Top Quick Action Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
            title="Toggle Auto Rotation"
          >
            {isRotating ? <Pause className="w-4 h-4 text-emerald-600" /> : <Play className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={handleZoomIn}
            className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
            title="Zoom In to Next Stage"
          >
            <ZoomIn className="w-4 h-4 text-emerald-600" />
          </button>

          <button
            onClick={handleZoomOut}
            className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
            title="Zoom Out to Previous Stage"
          >
            <ZoomOut className="w-4 h-4 text-slate-600" />
          </button>

          <button
            onClick={() => {
              setActiveHotspot(null);
              handleStageSelect('macro');
            }}
            className="p-3 rounded-2xl bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 transition-all shadow-md active:scale-95 cursor-pointer"
            title="Reset Camera View"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
          </button>
        </div>

        {/* Interactive 3D Hotspots on Plant (Visible in Macro Stage 1) */}
        {stage === 'macro' && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* 1. Flower Blossom Hotspot */}
            <button
              onClick={() => handleHotspotClick('blossom')}
              className={`absolute left-[54%] top-[34%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg transition-all transform hover:scale-110 cursor-pointer border ${
                activeHotspot === 'blossom' 
                  ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-400/40' 
                  : 'bg-white/95 text-slate-800 border-amber-300 hover:bg-amber-50'
              }`}
            >
              <Flower2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{language === 'te' ? 'పూత' : language === 'hi' ? 'फूल' : 'Blossoms'}</span>
            </button>

            {/* 2. Tomato Fruit Hotspot */}
            <button
              onClick={() => handleHotspotClick('fruit')}
              className={`absolute left-[58%] top-[56%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg transition-all transform hover:scale-110 cursor-pointer border ${
                activeHotspot === 'fruit' 
                  ? 'bg-red-600 text-white border-red-400 ring-4 ring-red-400/40' 
                  : 'bg-white/95 text-slate-800 border-red-300 hover:bg-red-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              <span>{language === 'te' ? 'కాయల గుత్తి' : language === 'hi' ? 'फल' : 'Fruit Truss'}</span>
            </button>

            {/* 3. Foliage Leaf Hotspot */}
            <button
              onClick={() => handleHotspotClick('foliage')}
              className={`absolute left-[38%] top-[46%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg transition-all transform hover:scale-110 cursor-pointer border ${
                activeHotspot === 'foliage' 
                  ? 'bg-emerald-600 text-white border-emerald-400 ring-4 ring-emerald-400/40' 
                  : 'bg-white/95 text-slate-800 border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'te' ? 'ఆకులు' : language === 'hi' ? 'पत्तियां' : 'Foliage'}</span>
            </button>

            {/* 4. Central Stem Hotspot */}
            <button
              onClick={() => handleHotspotClick('stem')}
              className={`absolute left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-lg transition-all transform hover:scale-110 cursor-pointer border ${
                activeHotspot === 'stem' 
                  ? 'bg-amber-800 text-white border-amber-600 ring-4 ring-amber-600/40' 
                  : 'bg-white/95 text-slate-800 border-amber-700/30 hover:bg-amber-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-800" />
              <span>{language === 'te' ? 'కాండం' : language === 'hi' ? 'तना' : 'Stem'}</span>
            </button>
          </div>
        )}

        {/* Stage 2 Meso Leaf Micro-Landscape Overlay Annotations */}
        {stage === 'leaf' && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="absolute left-6 top-24 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-emerald-300 shadow-md text-xs font-bold text-slate-800 max-w-xs">
              <span className="text-emerald-700 font-black block text-[11px] uppercase">
                🔬 {language === 'te' ? 'స్టొమాటా రంధ్రాలు' : language === 'hi' ? 'स्टोमेटा छिद्र' : 'Stomata Guard Cells'}
              </span>
              <span>{language === 'te' ? 'నీటి ఆవిరి & వాయు మార్పిడి చేసే శ్వాస రంధ్రాలు' : language === 'hi' ? 'गैस एवं वाष्पोत्सर्जन करने वाले छिद्र' : 'Functional breathing pores transpiring water vapor'}</span>
            </div>

            <div className="absolute right-6 top-24 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border-2 border-amber-300 shadow-md text-xs font-bold text-slate-800 max-w-xs text-right">
              <span className="text-amber-700 font-black block text-[11px] uppercase">
                💧 {language === 'te' ? 'మంచు & క్యూటికల్' : language === 'hi' ? 'क्यूटिकल परत' : 'Cuticle & Dewdrops'}
              </span>
              <span>{language === 'te' ? 'నీటిని నిలిపి ఉంచే మైనపు పొర' : language === 'hi' ? 'रोगजनकों से रक्षा करने वाली मोमी परत' : 'Protective waxy waterproof barrier'}</span>
            </div>
          </div>
        )}

        {/* Active Stage Scientific Context Callout with Voice Audio */}
        <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-10">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-emerald-300 shadow-xl text-xs leading-relaxed text-slate-800">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${stage === 'cellular' ? 'bg-amber-500 animate-ping' : 'bg-emerald-600'}`} />
                <span className="font-black text-emerald-800 uppercase tracking-wide text-xs">
                  {stage === 'macro' ? 'Stage 1: ' + t('view_macro') : stage === 'leaf' ? 'Stage 2: ' + t('view_leaf') : 'Stage 3: ' + t('view_micro')}
                </span>
              </div>
              <button
                onClick={handleVoiceReadout}
                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all cursor-pointer"
                title="Listen to Explanation"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            </div>
            <p className="text-slate-700 font-medium">{activeInfo}</p>
          </div>
        </div>
      </div>

      {/* Control Bar in Pure Clean White */}
      <div className="p-5 bg-white border-t-2 border-emerald-100 flex flex-col gap-4">
        {/* 3 Main View Stage Buttons (Stage 1, 2, 3 Clearly Visible & Clickable) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleStageSelect('macro')}
            className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              stage === 'macro'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border-2 border-emerald-600 scale-[1.02]'
                : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-2 border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-black text-xs sm:text-sm">1. {t('view_macro')}</span>
              <span className="block text-[10px] opacity-85 font-medium">Whole Crop Plant (Canopy & Fruit)</span>
            </div>
          </button>

          <button
            onClick={() => handleStageSelect('leaf')}
            className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              stage === 'leaf'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border-2 border-emerald-600 scale-[1.02]'
                : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-2 border-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <div className="text-left">
              <span className="block font-black text-xs sm:text-sm">2. {t('view_leaf')}</span>
              <span className="block text-[10px] opacity-85 font-medium">Leaf Surface & Stomata Pores</span>
            </div>
          </button>

          <button
            onClick={() => handleStageSelect('cellular')}
            className={`flex items-center justify-center gap-2.5 px-4 py-4 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              stage === 'cellular'
                ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white shadow-lg shadow-emerald-600/30 border-2 border-emerald-600 scale-[1.02]'
                : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-2 border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <div className="text-left">
              <span className="block font-black text-xs sm:text-sm">3. {t('view_micro')}</span>
              <span className="block text-[10px] opacity-85 font-medium">Cellular Nutrients & Pathogens</span>
            </div>
          </button>
        </div>

        {/* Continuous Zoom Slider + Cellular Pathogen/Nutrient Filters */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-1">
          {/* Continuous Zoom Slider */}
          <div className="flex items-center gap-3 w-full lg:w-1/2">
            <ZoomOut className="w-4 h-4 text-slate-400 shrink-0" />
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={zoomDepth}
                onChange={handleSliderChange}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <ZoomIn className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-mono font-bold text-slate-700 w-16 text-right">{zoomDepth}% Zoom</span>
          </div>

          {/* Microscopic Sub-Toggles (Bacteria vs Nutrients in Stage 3) */}
          {stage === 'cellular' && (
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1">
              <button
                onClick={() => setPathogenMode('nutrients')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathogenMode === 'nutrients'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'పోషకాలు (NPK)' : language === 'hi' ? 'पोषक तत्व' : 'Nutrients (NPK)'}</span>
              </button>

              <button
                onClick={() => setPathogenMode('pathogens')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathogenMode === 'pathogens'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bug className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'బాక్టీరియా తెగులు' : language === 'hi' ? 'बैक्टीरिया' : 'Bacteria (Xanthomonas)'}</span>
              </button>

              <button
                onClick={() => setPathogenMode('both')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pathogenMode === 'both'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'రెండు కలిపి' : language === 'hi' ? 'दोनों' : 'Side-by-Side'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
