import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DLogoProps {
  className?: string;
}

export const Hero3DLogo: React.FC<Hero3DLogoProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setWebglFailed(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 360;
    let height = container.clientHeight || 360;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);
    } catch {
      setWebglFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    // Group containing the entire 3D logo
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);

    // --- MATERIALS ---
    // Luxury Brushed Gold / Champagne Metal
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.88,
      roughness: 0.22,
    });

    // Dark Platinum Titanium for high-contrast facets
    const platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.92,
      roughness: 0.18,
    });

    // Luminous Gold Wireframe Accent
    const goldGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xfde68a,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // --- GEOMETRY: Sculpted Interlocking Geometric Monogram ---
    // 1. Central Faceted Monogram Emblem (Stylized Architectural 'P' / Diamond Core)
    const coreGeo = new THREE.OctahedronGeometry(1.6, 0);
    const coreMesh = new THREE.Mesh(coreGeo, goldMaterial);
    coreMesh.scale.set(1.1, 1.4, 0.85);
    logoGroup.add(coreMesh);

    const wireframeMesh = new THREE.Mesh(coreGeo, goldGlowMaterial);
    wireframeMesh.scale.set(1.14, 1.44, 0.89);
    logoGroup.add(wireframeMesh);

    // 2. Interlocking Outer Ring (Beveled Torus with angular facets)
    const outerRingGeo = new THREE.TorusGeometry(2.35, 0.22, 16, 6);
    const outerRingMesh = new THREE.Mesh(outerRingGeo, platinumMaterial);
    outerRingMesh.rotation.x = Math.PI / 3;
    outerRingMesh.rotation.y = Math.PI / 6;
    logoGroup.add(outerRingMesh);

    // 3. Second Intersecting Orbit Ring (Sculpted gold ribbon)
    const innerRingGeo = new THREE.TorusGeometry(2.0, 0.12, 16, 32);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, goldMaterial);
    innerRingMesh.rotation.x = -Math.PI / 4;
    innerRingMesh.rotation.y = Math.PI / 3;
    logoGroup.add(innerRingMesh);

    // 4. Subtle floating accent diamond nodes
    const nodeGeo = new THREE.OctahedronGeometry(0.18, 0);
    const nodes: THREE.Mesh[] = [];
    const nodePositions = [
      [2.5, 1.2, 0.5],
      [-2.3, -1.1, 0.4],
      [0.8, 2.4, -0.6],
      [-0.9, -2.3, -0.5],
    ];

    nodePositions.forEach(([x, y, z]) => {
      const node = new THREE.Mesh(nodeGeo, goldMaterial);
      node.position.set(x, y, z);
      logoGroup.add(node);
      nodes.push(node);
    });

    // --- LIGHTING ---
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key warm directional light
    const keyLight = new THREE.DirectionalLight(0xffedd5, 3.2);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    // Cool cyan fill light for depth and contrast
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Rim light behind for edge highlights
    const rimLight = new THREE.PointLight(0xf59e0b, 2.5, 20);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // --- INTERACTION & ANIMATION ---
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentRotationX = 0.2;
    let currentRotationY = 0;

    let mouseX = 0;
    let mouseY = 0;

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouseX = x * 2; // -1 to 1
      mouseY = y * 2; // -1 to 1
    };

    // Touch interaction handler
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        setIsInteracting(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = (e.touches[0].clientX - touchStartX) * 0.005;
        const deltaY = (e.touches[0].clientY - touchStartY) * 0.005;
        targetRotationY += deltaX;
        targetRotationX += deltaY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle idle rotation
      const baseRotationSpeed = 0.35;
      const autoY = elapsedTime * baseRotationSpeed;

      // Combine auto rotation and mouse parallax
      targetRotationY = autoY + mouseX * 0.6;
      targetRotationX = 0.2 + mouseY * 0.5;

      // Smooth interpolation (lerp)
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      logoGroup.rotation.x = currentRotationX;
      logoGroup.rotation.y = currentRotationY;

      // Subtle breathing scale pulse
      const breathe = 1 + Math.sin(elapsedTime * 1.5) * 0.02;
      logoGroup.scale.set(breathe, breathe, breathe);

      // Orbit nodes pulse
      nodes.forEach((node, i) => {
        const offset = i * 1.2;
        node.position.y += Math.sin(elapsedTime * 2 + offset) * 0.003;
        node.rotation.x = elapsedTime * 0.8;
        node.rotation.y = elapsedTime * 1.1;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      outerRingGeo.dispose();
      innerRingGeo.dispose();
      nodeGeo.dispose();
      goldMaterial.dispose();
      platinumMaterial.dispose();
      goldGlowMaterial.dispose();
    };
  }, []);

  // WebGL Fallback: High-end static SVG Monogram presentation
  if (webglFailed) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-64 h-64 rounded-3xl bg-gradient-to-br from-[#121829] to-[#0A0D15] border border-amber-500/30 flex items-center justify-center p-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60" />
          <svg className="w-32 h-32 text-amber-400 drop-shadow-[0_10px_25px_rgba(245,158,11,0.3)] transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100" fill="none">
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
            <polygon points="50,20 78,36 78,64 50,80 22,64 22,36" stroke="currentColor" strokeWidth="3" fill="rgba(245,158,11,0.06)" />
            <path d="M42 32 H58 C65 32, 68 36, 68 42 C68 48, 65 52, 58 52 H42 V68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute bottom-3 text-[10px] uppercase font-mono font-bold tracking-widest text-amber-300/70">
            Monogramme 3D Stylisé
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Background Soft Aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-amber-400/5 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full max-w-[380px] max-h-[380px] aspect-square cursor-grab active:cursor-grabbing touch-none select-none"
        title="Faites glisser ou déplacez la souris pour interagir avec le monogramme 3D"
        aria-label="Monogramme 3D interactif PRÉNOM LOGO AI"
      />

      {/* Subtle interaction tip */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400/80 font-mono tracking-wider flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        <span>3D interactif • Déplacez la souris</span>
      </div>
    </div>
  );
};
