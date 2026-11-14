"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DSceneProps {
  className?: string;
}

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // Group for mouse tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Materials - Champagne Gold Metallic
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6b477,
      metalness: 0.92,
      roughness: 0.18,
      emissive: 0x3d2c10,
      emissiveIntensity: 0.25,
    });

    const lightGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0d5a5,
      metalness: 0.88,
      roughness: 0.22,
      emissive: 0x473516,
      emissiveIntensity: 0.2,
    });

    // 1. Primary Outer Orbit Ring (Tilted)
    const ringGeom1 = new THREE.TorusGeometry(6.4, 0.07, 32, 120);
    const ring1 = new THREE.Mesh(ringGeom1, goldMaterial);
    ring1.rotation.x = Math.PI / 2.8;
    ring1.rotation.y = -Math.PI / 8;
    mainGroup.add(ring1);

    // 2. Secondary Inner Orbit Ring
    const ringGeom2 = new THREE.TorusGeometry(5.2, 0.045, 32, 100);
    const ring2 = new THREE.Mesh(ringGeom2, lightGoldMaterial);
    ring2.rotation.x = Math.PI / 2.3;
    ring2.rotation.y = Math.PI / 6;
    mainGroup.add(ring2);

    // 3. Third Subtle Orbit Ring (Fine accent)
    const ringGeom3 = new THREE.TorusGeometry(7.2, 0.025, 24, 100);
    const ring3 = new THREE.Mesh(ringGeom3, lightGoldMaterial);
    ring3.rotation.x = Math.PI / 3.2;
    ring3.rotation.z = Math.PI / 12;
    mainGroup.add(ring3);

    // 4. Floating Gold Dust Particles
    const particleCount = 65;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 4.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi) * 0.7;
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
      scales[i] = Math.random();
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf0d5a5,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.9);
    scene.add(ambientLight);

    const goldPointLight1 = new THREE.PointLight(0xf0d5a5, 2.5, 35);
    goldPointLight1.position.set(6, 6, 8);
    scene.add(goldPointLight1);

    const goldPointLight2 = new THREE.PointLight(0xd6b477, 1.8, 30);
    goldPointLight2.position.set(-6, -4, 6);
    scene.add(goldPointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.22;
      targetRotationX = -y * 0.22;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow smooth orbit rotations
      ring1.rotation.z = elapsedTime * 0.14;
      ring2.rotation.z = -elapsedTime * 0.19;
      ring3.rotation.z = elapsedTime * 0.08;

      particles.rotation.y = elapsedTime * 0.05;

      // Smooth mouse follow
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      ringGeom1.dispose();
      ringGeom2.dispose();
      ringGeom3.dispose();
      particleGeometry.dispose();
      goldMaterial.dispose();
      lightGoldMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* CSS Fallback Orbit Ring */}
        <div className="absolute w-[480px] h-[480px] rounded-full border-2 border-[#D6B477]/40 animate-spin-slow" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
