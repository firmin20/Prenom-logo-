import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const Dashboard3DAccent: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setFallback(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    const size = 72;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      setFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 5;

    // Mini faceted crystal
    const geo = new THREE.OctahedronGeometry(1.2, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Mini ring
    const ringGeo = new THREE.TorusGeometry(1.6, 0.06, 8, 24);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Light
    const light1 = new THREE.DirectionalLight(0xffedd5, 3);
    light1.position.set(2, 3, 3);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x38bdf8, 1);
    light2.position.set(-2, -2, 2);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      mesh.rotation.y = elapsed * 0.7;
      mesh.rotation.x = Math.sin(elapsed * 0.5) * 0.3;
      ring.rotation.z = elapsed * 0.4;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  if (fallback) {
    return (
      <div className={`w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 font-cinzel font-bold text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)] ${className}`}>
        P
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-14 h-14 flex items-center justify-center shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
};
