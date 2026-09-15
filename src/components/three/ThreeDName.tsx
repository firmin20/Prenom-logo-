import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createGlyphGeometry } from './glyphBuilder';

export type ThreeDNameMaterial =
  | 'MINIMAL'
  | 'PREMIUM'
  | 'LUXURY'
  | 'MODERN'
  | 'TECHNOLOGY'
  | 'CREATIVE'
  | 'BUSINESS'
  | 'SIGNATURE';

export type TransformationPhase =
  | 'word'
  | 'separate'
  | 'highlight'
  | 'converge'
  | 'monogram'
  | 'symbol'
  | 'auto_loop';

export interface ThreeDNameProps {
  name: string;
  font?: string;
  color?: string; // color scheme id or hex
  material?: ThreeDNameMaterial | string;
  rotation?: [number, number, number];
  scale?: number;
  animationSpeed?: number;
  phase?: TransformationPhase;
  interactive?: boolean;
  onPhaseChange?: (phase: string, phaseIndex: number) => void;
  className?: string;
  height?: number | string;
  showParticles?: boolean;
  showPhaseIndicator?: boolean;
}

interface LetterItem {
  char: string;
  mesh: THREE.Mesh;
  initialX: number;
  separateX: number;
  convergeX: number;
  isKeyLetter: boolean;
}

export const ThreeDName: React.FC<ThreeDNameProps> = ({
  name = 'FIRMIN',
  color = 'noir_or',
  material = 'PREMIUM',
  rotation = [0, 0, 0],
  scale = 1.0,
  animationSpeed = 1.0,
  phase = 'auto_loop',
  interactive = true,
  onPhaseChange,
  className = '',
  height = 360,
  showParticles = true,
  showPhaseIndicator = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  const phaseNames: Array<{ key: TransformationPhase; label: string; desc: string }> = [
    { key: 'word', label: '1. Prénom 3D', desc: 'Typographie sculptée avec profondeur réelle' },
    { key: 'separate', label: '2. Décomposition', desc: 'Séparation géométrique des lettres' },
    { key: 'highlight', label: '3. Extraction', desc: 'Isolement des initiales fondatrices' },
    { key: 'converge', label: '4. Convergence', desc: 'Fusion axiale des composantes' },
    { key: 'monogram', label: '5. Monogramme', desc: 'Structuration en monogramme architectural' },
    { key: 'symbol', label: '6. Logo Final', desc: 'Identité visuelle de marque complète' },
  ];

  // Ref to hold dynamic variables for animation loop
  const animStateRef = useRef({
    phase: phase,
    manualPhaseIndex: 0,
    targetRotationX: rotation[0],
    targetRotationY: rotation[1],
    mouseX: 0,
    mouseY: 0,
    isHovered: false,
    color,
    material,
    name,
  });

  // Keep animStateRef in sync with props
  useEffect(() => {
    animStateRef.current.phase = phase;
    animStateRef.current.color = color;
    animStateRef.current.material = material;
    animStateRef.current.name = name;
  }, [phase, color, material, name]);

  useEffect(() => {
    // Accessibility check: prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setWebglFailed(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let containerHeight = typeof height === 'number' ? height : container.clientHeight || 360;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, containerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
    } catch {
      setWebglFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / containerHeight, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Letters Group
    const lettersGroup = new THREE.Group();
    rootGroup.add(lettersGroup);

    // Monogram & Symbol Group (for Phase 5 & 6)
    const emblemGroup = new THREE.Group();
    emblemGroup.visible = false;
    rootGroup.add(emblemGroup);

    // Letter Particles Group
    const particlesGroup = new THREE.Group();
    rootGroup.add(particlesGroup);

    // --- MATERIAL RESOLVER ---
    const getMaterialConfig = (matType: string, col: string) => {
      let mainColor = 0xf59e0b; // Gold default
      let roughness = 0.22;
      let metalness = 0.88;
      let clearcoat = 0.1;
      let emissive = 0x000000;

      // Color mapping
      if (col.includes('or') || col === 'gold' || col === 'noir_or') {
        mainColor = 0xf59e0b;
      } else if (col.includes('bleu') || col === 'sky' || col === 'blue') {
        mainColor = 0x38bdf8;
      } else if (col.includes('emeraude') || col === 'vert' || col === 'green') {
        mainColor = 0x10b981;
      } else if (col.includes('pourpre') || col === 'purple') {
        mainColor = 0xa855f7;
      } else if (col.includes('rose') || col === 'rouge' || col === 'red') {
        mainColor = 0xf43f5e;
      } else if (col.includes('monochrome') || col === 'black' || col === 'blanc') {
        mainColor = 0xe2e8f0;
        roughness = 0.35;
        metalness = 0.6;
      }

      // Material type overrides
      switch (matType.toUpperCase()) {
        case 'MINIMAL':
          roughness = 0.55;
          metalness = 0.2;
          break;
        case 'LUXURY':
          roughness = 0.12;
          metalness = 0.95;
          break;
        case 'MODERN':
          roughness = 0.18;
          metalness = 0.7;
          clearcoat = 0.6;
          break;
        case 'TECHNOLOGY':
          roughness = 0.2;
          metalness = 0.9;
          emissive = mainColor;
          break;
        case 'CREATIVE':
          roughness = 0.25;
          metalness = 0.8;
          break;
        case 'BUSINESS':
          mainColor = col.includes('or') ? 0xd97706 : 0x94a3b8;
          roughness = 0.3;
          metalness = 0.85;
          break;
        case 'SIGNATURE':
          roughness = 0.15;
          metalness = 0.92;
          break;
        case 'PREMIUM':
        default:
          roughness = 0.22;
          metalness = 0.88;
          break;
      }

      return { mainColor, roughness, metalness, clearcoat, emissive };
    };

    const matConfig = getMaterialConfig(animStateRef.current.material, animStateRef.current.color);

    const letterMaterial = new THREE.MeshStandardMaterial({
      color: matConfig.mainColor,
      roughness: matConfig.roughness,
      metalness: matConfig.metalness,
      emissive: matConfig.emissive,
      emissiveIntensity: animStateRef.current.material === 'TECHNOLOGY' ? 0.2 : 0,
    });

    const keyLetterMaterial = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      roughness: 0.12,
      metalness: 0.95,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.25,
    });

    // Monogram & Symbol Construction
    const emblemCoreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const emblemCoreMesh = new THREE.Mesh(emblemCoreGeo, keyLetterMaterial);
    emblemCoreMesh.scale.set(1.1, 1.35, 0.85);
    emblemGroup.add(emblemCoreMesh);

    const emblemRingGeo = new THREE.TorusGeometry(1.9, 0.15, 16, 6);
    const emblemRingMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const emblemRingMesh = new THREE.Mesh(emblemRingGeo, emblemRingMat);
    emblemRingMesh.rotation.x = Math.PI / 3;
    emblemRingMesh.rotation.y = Math.PI / 6;
    emblemGroup.add(emblemRingMesh);

    const innerRingGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 32);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, letterMaterial);
    innerRingMesh.rotation.x = -Math.PI / 4;
    emblemGroup.add(innerRingMesh);

    // Particle cloud during transitions
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: matConfig.mainColor,
      size: 0.06,
      transparent: true,
      opacity: 0,
    });
    const transitionParticles = new THREE.Points(particleGeo, particleMat);
    particlesGroup.add(transitionParticles);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(matConfig.mainColor, 2.0, 18);
    rimLight.position.set(0, 3.5, -3.5);
    scene.add(rimLight);

    // --- BUILD 3D LETTERS FOR CURRENT NAME ---
    let letterItems: LetterItem[] = [];

    const buildLetters = (rawText: string) => {
      // Clear old meshes
      letterItems.forEach((item) => {
        lettersGroup.remove(item.mesh);
        item.mesh.geometry.dispose();
      });
      letterItems = [];

      const cleanText = (rawText || 'FIRMIN').trim().toUpperCase().slice(0, 12) || 'LOGO';
      const count = cleanText.length;

      // Determine letter widths and total width
      const glyphInfos = [];
      let totalWidth = 0;
      const letterSpacing = 0.18;

      for (let i = 0; i < count; i++) {
        const char = cleanText[i];
        const { geometry, width } = createGlyphGeometry(char, 0.28);
        glyphInfos.push({ char, geometry, width });
        totalWidth += width + (i < count - 1 ? letterSpacing : 0);
      }

      // Responsive base scaling
      // If name is long, scale down proportionally so it never overflows
      let autoScale = scale;
      if (totalWidth > 5.5) {
        autoScale = scale * (5.5 / totalWidth);
      } else if (width < 480 && totalWidth > 3.8) {
        autoScale = scale * (3.8 / totalWidth);
      }
      lettersGroup.scale.set(autoScale, autoScale, autoScale);
      emblemGroup.scale.set(autoScale * 1.05, autoScale * 1.05, autoScale * 1.05);

      // Center letters horizontally and vertically
      let currentX = -totalWidth / 2;
      const keyCount = Math.min(2, Math.max(1, Math.floor(count / 3)));

      for (let i = 0; i < count; i++) {
        const { char, geometry, width: charWidth } = glyphInfos[i];
        const isKeyLetter = i < keyCount;

        const mesh = new THREE.Mesh(
          geometry,
          isKeyLetter ? keyLetterMaterial : letterMaterial
        );

        // Center glyph mesh on its own origin
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox!;
        const centerX = (bbox.max.x - bbox.min.x) / 2;
        const centerY = (bbox.max.y - bbox.min.y) / 2;
        geometry.translate(-centerX, -centerY, -0.14);

        const targetX = currentX + charWidth / 2;
        mesh.position.set(targetX, 0, 0);

        lettersGroup.add(mesh);

        // Calculate positions for each animation phase
        const separationFactor = 1.6;
        const separateX = targetX * separationFactor;
        const convergeX = (i - (keyCount - 1) / 2) * 0.75;

        letterItems.push({
          char,
          mesh,
          initialX: targetX,
          separateX,
          convergeX,
          isKeyLetter,
        });

        currentX += charWidth + letterSpacing;
      }
    };

    buildLetters(animStateRef.current.name);

    // --- MOUSE & TOUCH EVENT HANDLERS ---
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.mouseX = x;
      animStateRef.current.mouseY = y;
      animStateRef.current.targetRotationY = x * 0.45;
      animStateRef.current.targetRotationX = -y * 0.35;
    };

    const handleMouseEnter = () => {
      animStateRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      animStateRef.current.isHovered = false;
      animStateRef.current.targetRotationX = rotation[0];
      animStateRef.current.targetRotationY = rotation[1];
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      animStateRef.current.targetRotationY = x * 0.35;
      animStateRef.current.targetRotationX = -y * 0.25;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- ANIMATION LOOP & PHASE TRANSITIONS ---
    let frameId: number;
    let clock = new THREE.Clock();
    let phaseTimer = 0;
    const phaseDuration = 3.2 / animationSpeed; // seconds per phase in auto_loop mode
    let prevName = animStateRef.current.name;
    let prevColor = animStateRef.current.color;
    let prevMaterial = animStateRef.current.material;
    let lastBroadcastPhase = -1;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Check if name changed dynamically
      if (animStateRef.current.name !== prevName) {
        prevName = animStateRef.current.name;
        buildLetters(prevName);
      }

      // Check if material or color changed dynamically
      if (
        animStateRef.current.material !== prevMaterial ||
        animStateRef.current.color !== prevColor
      ) {
        prevMaterial = animStateRef.current.material;
        prevColor = animStateRef.current.color;
        const newConf = getMaterialConfig(prevMaterial, prevColor);
        letterMaterial.color.setHex(newConf.mainColor);
        letterMaterial.roughness = newConf.roughness;
        letterMaterial.metalness = newConf.metalness;
        letterMaterial.emissive.setHex(newConf.emissive);
        rimLight.color.setHex(newConf.mainColor);
        particleMat.color.setHex(newConf.mainColor);
      }

      // Phase Progress Calculation
      let activePhaseIndex = 0;
      let phaseProgress = 0; // 0 to 1 within the phase

      if (animStateRef.current.phase === 'auto_loop') {
        phaseTimer += delta;
        const totalPhases = 6;
        const cycleTime = phaseDuration * totalPhases;
        const cycleElapsed = phaseTimer % cycleTime;
        activePhaseIndex = Math.floor(cycleElapsed / phaseDuration);
        phaseProgress = (cycleElapsed % phaseDuration) / phaseDuration;
      } else {
        // Manual single phase
        const map: Record<string, number> = {
          word: 0,
          separate: 1,
          highlight: 2,
          converge: 3,
          monogram: 4,
          symbol: 5,
        };
        activePhaseIndex = map[animStateRef.current.phase] ?? 0;
        phaseProgress = 1.0;
      }

      if (activePhaseIndex !== lastBroadcastPhase) {
        lastBroadcastPhase = activePhaseIndex;
        setCurrentPhaseIndex(activePhaseIndex);
        if (onPhaseChange) {
          onPhaseChange(phaseNames[activePhaseIndex].key, activePhaseIndex);
        }
      }

      // Smooth camera / root group floating motion
      const floatY = Math.sin(elapsed * 1.4) * 0.08;
      const floatRotZ = Math.sin(elapsed * 0.8) * 0.02;

      rootGroup.position.y = floatY;
      rootGroup.rotation.z = floatRotZ;

      // Smooth slerp towards mouse interactive tilt
      rootGroup.rotation.y +=
        (animStateRef.current.targetRotationY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x +=
        (animStateRef.current.targetRotationX - rootGroup.rotation.x) * 0.08;

      // Smooth ease function
      const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const smoothP = easeInOut(Math.min(1, Math.max(0, phaseProgress)));

      // --- APPLY PHASE-SPECIFIC GEOMETRIC TRANSFORMATION ---
      // PHASE 0: Full 3D Word
      // PHASE 1: Letters separate (F I R M I N expands)
      // PHASE 2: Highlight initial keys, fade other letters
      // PHASE 3: Key letters converge to center
      // PHASE 4: Letters morph into architectural monogram
      // PHASE 5: Monogram becomes full professional symbol logo

      if (activePhaseIndex <= 3) {
        lettersGroup.visible = true;
        emblemGroup.visible = false;
        particleMat.opacity = 0;

        letterItems.forEach((item, idx) => {
          const mesh = item.mesh;

          if (activePhaseIndex === 0) {
            // Slerp to initial Word layout
            mesh.position.x += (item.initialX - mesh.position.x) * 0.1;
            mesh.position.y = Math.sin(elapsed * 2 + idx * 0.4) * 0.03;
            mesh.position.z = 0;
            mesh.scale.set(1, 1, 1);
            (mesh.material as THREE.MeshStandardMaterial).opacity = 1;
            (mesh.material as THREE.MeshStandardMaterial).transparent = false;
          } else if (activePhaseIndex === 1) {
            // Letters separate
            const targetX = THREE.MathUtils.lerp(item.initialX, item.separateX, smoothP);
            mesh.position.x += (targetX - mesh.position.x) * 0.15;
            mesh.rotation.y = Math.sin(elapsed * 1.5 + idx) * 0.12;
            mesh.position.z = 0;
          } else if (activePhaseIndex === 2) {
            // Key letters remain sharp, others fade & recess
            if (item.isKeyLetter) {
              mesh.position.x += (item.separateX * 0.85 - mesh.position.x) * 0.15;
              mesh.scale.set(1.15, 1.15, 1.15);
              mesh.position.z = 0.2;
            } else {
              mesh.position.x += (item.separateX * 1.1 - mesh.position.x) * 0.15;
              mesh.scale.set(0.85, 0.85, 0.85);
              mesh.position.z = -0.4;
              (mesh.material as THREE.MeshStandardMaterial).transparent = true;
              (mesh.material as THREE.MeshStandardMaterial).opacity = 0.35;
            }
          } else if (activePhaseIndex === 3) {
            // Letters converge to center
            if (item.isKeyLetter) {
              mesh.position.x += (item.convergeX - mesh.position.x) * 0.15;
              mesh.scale.set(1.1, 1.1, 1.1);
              mesh.position.z = 0.1;
            } else {
              // Fade out remaining letters
              mesh.scale.set(0.01, 0.01, 0.01);
              mesh.position.z = -1.5;
            }
          }
        });
      } else {
        // PHASE 4 (Monogram) & PHASE 5 (Full Symbol Logo)
        lettersGroup.visible = false;
        emblemGroup.visible = true;

        if (activePhaseIndex === 4) {
          // Monogram rotating slowly with wireframe accents
          emblemGroup.rotation.y = elapsed * 0.45;
          emblemRingMesh.rotation.z = elapsed * 0.25;
          innerRingMesh.rotation.y = -elapsed * 0.35;
          emblemRingMesh.visible = false;
          innerRingMesh.visible = true;
          particleMat.opacity = Math.sin(elapsed * 2) * 0.4 + 0.3;
        } else {
          // Full Symbol with Outer Ring
          emblemGroup.rotation.y = elapsed * 0.3;
          emblemRingMesh.visible = true;
          innerRingMesh.visible = true;
          emblemRingMesh.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.5) * 0.1;
          emblemRingMesh.rotation.y = Math.PI / 6 + elapsed * 0.2;
          particleMat.opacity = 0.6;
        }
      }

      // Rotate transition particles
      particlesGroup.rotation.y = elapsed * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 400;
      const newHeight = typeof height === 'number' ? height : container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      buildLetters(animStateRef.current.name);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);

      // Dispose Three.js objects to prevent memory leak
      letterItems.forEach((item) => {
        item.mesh.geometry.dispose();
      });
      emblemCoreGeo.dispose();
      emblemRingGeo.dispose();
      innerRingGeo.dispose();
      particleGeo.dispose();
      letterMaterial.dispose();
      keyLetterMaterial.dispose();
      emblemRingMat.dispose();
      particleMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [height, interactive, rotation, scale, animationSpeed]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="w-full relative flex items-center justify-center overflow-hidden"
      >
        {/* WebGL Fallback if device has no WebGL or prefers reduced motion */}
        {webglFailed && (
          <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="text-4xl sm:text-6xl font-black font-cinzel tracking-widest bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(245,158,11,0.3)]">
              {(name || 'FIRMIN').toUpperCase()}
            </div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-300">
              <span>PRÉNOM</span>
              <span>→</span>
              <span>LETTRES</span>
              <span>→</span>
              <span>SYMBOLE</span>
            </div>
          </div>
        )}
      </div>

      {/* Optional Phase Step Indicator Pills */}
      {showPhaseIndicator && (
        <div className="w-full max-w-xl px-4 mt-2">
          <div className="flex items-center justify-between gap-1 sm:gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            {phaseNames.map((p, idx) => {
              const isActive = currentPhaseIndex === idx;
              return (
                <div
                  key={p.key}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white text-xs'
                  }`}
                >
                  <span className="block text-[11px] sm:text-xs font-mono font-bold whitespace-nowrap">
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-2.5">
            <p className="text-xs text-amber-300/90 font-medium">
              {phaseNames[currentPhaseIndex]?.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
