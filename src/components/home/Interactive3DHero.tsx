"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Interactive3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch (e) {
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group for the 3D Food Pavilion
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Serving Platter (Round base)
    const platterGeometry = new THREE.CylinderGeometry(2.3, 2.1, 0.12, 64);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xD99A43,
      metalness: 0.88,
      roughness: 0.22,
    });
    const platter = new THREE.Mesh(platterGeometry, goldMaterial);
    platter.position.y = -0.9;
    mainGroup.add(platter);

    // Platter inner dark marble inlay
    const marbleGeometry = new THREE.CylinderGeometry(2.05, 2.05, 0.13, 64);
    const marbleMaterial = new THREE.MeshStandardMaterial({
      color: 0x1F1A17,
      metalness: 0.3,
      roughness: 0.4,
    });
    const marbleInlay = new THREE.Mesh(marbleGeometry, marbleMaterial);
    marbleInlay.position.y = -0.88;
    mainGroup.add(marbleInlay);

    // 2. Luxury Dome / Cloche Lid (Half Sphere)
    const domeGeometry = new THREE.SphereGeometry(1.65, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.5);
    const domeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xD99A43,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });
    const dome = new THREE.Mesh(domeGeometry, domeMaterial);
    dome.position.y = -0.8;
    mainGroup.add(dome);

    // Cloche Handle
    const handleRingGeom = new THREE.TorusGeometry(0.24, 0.05, 16, 32);
    const handleMesh = new THREE.Mesh(handleRingGeom, goldMaterial);
    handleMesh.position.y = 0.95;
    handleMesh.rotation.x = Math.PI / 2;
    mainGroup.add(handleMesh);

    // 3. Orbiting Gold Spice Particles / Embers
    const particlesCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);
    const particleScales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 2.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3;

      particlePositions[i * 3] = radius * Math.cos(theta);
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = radius * Math.sin(theta);
      particleScales[i] = Math.random();
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xF0B96D,
      size: 0.08,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particlePoints);

    // 4. Subtle Ambient & Dynamic Point Lights
    const ambientLight = new THREE.AmbientLight(0xFFF4E5, 0.8);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xD99A43, 2.8, 15);
    warmLight.position.set(3, 4, 4);
    scene.add(warmLight);

    const orangeBacklight = new THREE.PointLight(0xC76B35, 2.5, 12);
    orangeBacklight.position.set(-3.5, 2, -3);
    scene.add(orangeBacklight);

    // Mouse Interaction
    let targetRotationX = 0.2;
    let targetRotationY = 0;
    let currentRotationX = 0.2;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 1.2;
      targetRotationX = 0.2 + y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse follow
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX;
      mainGroup.rotation.y = currentRotationY + elapsedTime * 0.25;

      // Gentle floating levitation
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Rotate particle cloud
      particlePoints.rotation.y = elapsedTime * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] relative pointer-events-none"
    />
  );
}
