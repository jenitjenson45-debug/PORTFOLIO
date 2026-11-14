"use client";

import React, { useEffect, useRef } from "react";

interface Particle3D {
  type: "saffron" | "juice" | "mint" | "ember" | "steam";
  x: number;
  y: number;
  z: number; // 3D depth (0 near to 500 far)
  baseSize: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  secondaryColor?: string;
  wobbleSpeed: number;
  wobblePhase: number;
  length?: number; // for saffron strands
  aspectRatio?: number; // for mint leaves
}

/**
 * CulinaryParticles3D
 * Continuous 3D Culinary, Juice, and Restaurant Particle Motion System:
 * - Golden Saffron Filaments (crimson & gold strands flexing with 3D perspective)
 * - Effervescent Juice Bubbles & Droplets (specular refractions, rising buoyancy, amber/ruby/citrus)
 * - Fresh Botanical Mint Leaves (3D tumbling leaves with midrib veins)
 * - Charcoal Tandoor Embers (twinkling warm sparks with radial fire bloom)
 * - Aroma & Steam Wisps (soft rising vapor)
 * - Restaurant Background Motion (warm golden amber light sweeps and bokeh)
 * Active across the entire website from top to bottom.
 */
export function CulinaryParticles3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const scrollRef = useRef({ currentY: 0, lastY: 0, velocity: 0 });
  const currentBlurRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);

    // Responsive particle count (optimized for buttery 60/120 FPS on all devices)
    const isMobile = width < 768;
    const count = isMobile ? 30 : 65;

    // Rich Culinary Color Palettes
    const saffronColors = [
      { primary: "#D99A43", secondary: "#C76B35" }, // Golden Saffron & Ember
      { primary: "#F5B041", secondary: "#E67E22" }, // Rich Saffron Amber
      { primary: "#F4C430", secondary: "#D99A43" }, // Imperial Turmeric Gold
      { primary: "#E74C3C", secondary: "#C0392B" }, // Crimson Stigma Tip
    ];

    const juiceColors = [
      { primary: "rgba(217, 154, 67, 0.8)", secondary: "rgba(242, 201, 76, 0.95)" }, // Golden Honey Nectar
      { primary: "rgba(230, 126, 34, 0.8)", secondary: "rgba(255, 179, 71, 0.95)" }, // Citrus Orange Nectar
      { primary: "rgba(199, 107, 53, 0.75)", secondary: "rgba(255, 120, 80, 0.9)" }, // Pomegranate Ruby
      { primary: "rgba(111, 141, 87, 0.75)", secondary: "rgba(160, 215, 105, 0.9)" }, // Lime Mint Shimmer
      { primary: "rgba(240, 213, 165, 0.85)", secondary: "rgba(255, 255, 255, 0.98)" }, // Sparkling Effervescence
    ];

    const mintColors = [
      { primary: "#5A8F43", secondary: "#74A759" },
      { primary: "#4D7C36", secondary: "#659B48" },
      { primary: "#3E6B2C", secondary: "#52843A" },
    ];

    const emberColors = ["#FFA000", "#FF6F00", "#FFAB40", "#FFD54F", "#FF5722"];

    // Initialize 3D Particles
    const particles: Particle3D[] = [];

    const createParticle = (initialY?: number): Particle3D => {
      // Distribution: 28% Saffron, 34% Juice, 18% Mint, 15% Embers, 5% Aroma Steam
      const rand = Math.random();
      let type: Particle3D["type"];
      if (rand < 0.28) type = "saffron";
      else if (rand < 0.62) type = "juice";
      else if (rand < 0.8) type = "mint";
      else if (rand < 0.95) type = "ember";
      else type = "steam";

      const z = Math.random() * 450; // 0 (near, large) to 450 (far, small)
      const y = initialY !== undefined ? initialY : Math.random() * height;
      const x = Math.random() * width;

      if (type === "saffron") {
        const pal = saffronColors[Math.floor(Math.random() * saffronColors.length)];
        return {
          type,
          x,
          y,
          z,
          baseSize: 2.8 + Math.random() * 2.8,
          length: 35 + Math.random() * 45,
          vx: (Math.random() - 0.5) * 0.45,
          vy: -0.2 - Math.random() * 0.4, // gentle slow upward float
          vz: (Math.random() - 0.5) * 0.2,
          rotX: Math.random() * Math.PI * 2,
          rotY: Math.random() * Math.PI * 2,
          rotZ: Math.random() * Math.PI * 2,
          vRotX: (Math.random() - 0.5) * 0.02,
          vRotY: (Math.random() - 0.5) * 0.025,
          vRotZ: (Math.random() - 0.5) * 0.02,
          opacity: 0.9,
          baseOpacity: 0.9,
          color: pal.primary,
          secondaryColor: pal.secondary,
          wobbleSpeed: 0.025 + Math.random() * 0.03,
          wobblePhase: Math.random() * Math.PI * 2,
        };
      }

      if (type === "juice") {
        const pal = juiceColors[Math.floor(Math.random() * juiceColors.length)];
        return {
          type,
          x,
          y,
          z,
          baseSize: 7.5 + Math.random() * 12.5, // sparkling nectar droplets & bubbles
          vx: (Math.random() - 0.5) * 0.45,
          vy: -0.6 - Math.random() * 0.95, // buoyant upward bubble drift
          vz: (Math.random() - 0.5) * 0.2,
          rotX: 0,
          rotY: 0,
          rotZ: Math.random() * Math.PI * 2,
          vRotX: 0,
          vRotY: 0,
          vRotZ: (Math.random() - 0.5) * 0.015,
          opacity: 0.9,
          baseOpacity: 0.9,
          color: pal.primary,
          secondaryColor: pal.secondary,
          wobbleSpeed: 0.035 + Math.random() * 0.04,
          wobblePhase: Math.random() * Math.PI * 2,
        };
      }

      if (type === "mint") {
        const pal = mintColors[Math.floor(Math.random() * mintColors.length)];
        return {
          type,
          x,
          y,
          z,
          baseSize: 16 + Math.random() * 18, // healthy visible leaf size
          aspectRatio: 1.6 + Math.random() * 0.4,
          vx: (Math.random() - 0.5) * 0.55,
          vy: 0.25 + Math.random() * 0.45, // gentle falling/tumbling leaf
          vz: (Math.random() - 0.5) * 0.25,
          rotX: Math.random() * Math.PI * 2,
          rotY: Math.random() * Math.PI * 2,
          rotZ: Math.random() * Math.PI * 2,
          vRotX: (Math.random() - 0.5) * 0.025,
          vRotY: (Math.random() - 0.5) * 0.03,
          vRotZ: (Math.random() - 0.5) * 0.022,
          opacity: 0.9,
          baseOpacity: 0.9,
          color: pal.primary,
          secondaryColor: pal.secondary,
          wobbleSpeed: 0.02 + Math.random() * 0.025,
          wobblePhase: Math.random() * Math.PI * 2,
        };
      }

      if (type === "ember") {
        const col = emberColors[Math.floor(Math.random() * emberColors.length)];
        return {
          type,
          x,
          y,
          z,
          baseSize: 3.5 + Math.random() * 4.5, // glowing fire sparks
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.9 - Math.random() * 1.3, // fast glowing tandoor fire spark
          vz: (Math.random() - 0.5) * 0.35,
          rotX: 0,
          rotY: 0,
          rotZ: 0,
          vRotX: 0,
          vRotY: 0,
          vRotZ: 0,
          opacity: 0.95,
          baseOpacity: 0.95,
          color: col,
          wobbleSpeed: 0.06 + Math.random() * 0.06,
          wobblePhase: Math.random() * Math.PI * 2,
        };
      }

      // steam / aroma cloud
      return {
        type: "steam",
        x,
        y,
        z: 80 + Math.random() * 350,
        baseSize: 40 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.35 - Math.random() * 0.45,
        vz: 0,
        rotX: 0,
        rotY: 0,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: 0,
        vRotY: 0,
        vRotZ: 0.004,
        opacity: 0.12,
        baseOpacity: 0.12,
        color: "rgba(217, 154, 67, 0.12)",
        wobbleSpeed: 0.015,
        wobblePhase: Math.random() * Math.PI * 2,
      };
    };

    // Pre-populate particles throughout the screen
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }

    // Window Resize Handler with DPR preservation
    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    // Mouse Move & Scroll Tracking (Passive & Low Overhead)
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - scrollRef.current.lastY;
      scrollRef.current.velocity = diff * 0.07;
      scrollRef.current.lastY = current;
    };

    // Click interactive burst: spawns sparkling juice droplets & embers at click location
    const handlePointerDown = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let k = 0; k < 4; k++) {
        const p = createParticle(clickY + (Math.random() - 0.5) * 30);
        p.x = clickX + (Math.random() - 0.5) * 30;
        p.vx = (Math.random() - 0.5) * 2.5;
        p.vy = -1.5 - Math.random() * 2.0;
        particles.push(p);
        if (particles.length > count + 12) particles.shift();
      }
    };

    // Tab visibility change: pause loop during backgrounding to conserve 100% CPU and battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let time = 0;
    let lastAppliedBlur = -1;

    // Main 3D Particle Render Loop
    const render = () => {
      if (!isRunning) return;
      time += 0.016;

      // Mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Dynamic Scroll Blur with Adaptive Throttling:
      // Only updates DOM style.filter when the delta exceeds 0.15px to prevent continuous GPU reflows
      const currentScroll = window.scrollY || 0;
      const targetBlur = Math.min(isMobile ? 4.5 : 7.0, Math.max(0, (currentScroll / 320) * 4));
      currentBlurRef.current += (targetBlur - currentBlurRef.current) * 0.1;
      
      if (Math.abs(currentBlurRef.current - lastAppliedBlur) > 0.15) {
        lastAppliedBlur = currentBlurRef.current;
        if (currentBlurRef.current < 0.2) {
          if (canvas.style.filter !== "none") canvas.style.filter = "none";
        } else {
          canvas.style.filter = `blur(${currentBlurRef.current.toFixed(1)}px)`;
        }
      }

      // Scroll velocity decay
      scrollRef.current.velocity *= 0.93;
      const scrollPush = scrollRef.current.velocity;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Restaurant Motion Light Ray in Background
      const lightX = width * 0.5 + Math.sin(time * 0.35) * (width * 0.3);
      const lightY = height * 0.35 + Math.cos(time * 0.25) * (height * 0.2);
      const ambientGrad = ctx.createRadialGradient(
        lightX,
        lightY,
        15,
        lightX,
        lightY,
        width * 0.6
      );
      ambientGrad.addColorStop(0, "rgba(217, 154, 67, 0.04)");
      ambientGrad.addColorStop(0.5, "rgba(199, 107, 53, 0.015)");
      ambientGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render and update 3D Particles
      const fov = 420;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions with 3D wobble
        p.wobblePhase += p.wobbleSpeed;
        const wobbleX = Math.sin(p.wobblePhase) * 0.5;
        const wobbleY = Math.cos(p.wobblePhase) * 0.25;

        p.x += p.vx + wobbleX;
        p.y += p.vy + wobbleY - scrollPush; // physical reaction to scroll!
        p.z += p.vz;

        // Mouse gentle fluid avoidance / breeze
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (1 - dist / 150) * 1.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // 3D rotations
        p.rotX += p.vRotX;
        p.rotY += p.vRotY;
        p.rotZ += p.vRotZ;

        // Screen wrap-around with smooth boundary recycling
        if (p.y < -70) {
          p.y = height + 50;
          p.x = Math.random() * width;
        } else if (p.y > height + 70) {
          p.y = -50;
          p.x = Math.random() * width;
        }

        if (p.x < -70) p.x = width + 50;
        else if (p.x > width + 70) p.x = -50;

        // 3D Perspective Projection
        const scale = fov / (fov + p.z);
        const renderSize = p.baseSize * scale;
        const alpha = Math.max(0.15, Math.min(1, p.opacity * scale));

        ctx.save();
        ctx.translate(p.x, p.y);

        // ----------------------------------------------------
        // TYPE 1: GOLDEN SAFFRON FILAMENT
        // ----------------------------------------------------
        if (p.type === "saffron" && p.length) {
          ctx.rotate(p.rotZ);
          ctx.scale(scale * Math.cos(p.rotY), scale * Math.cos(p.rotX));

          const strandLen = p.length;
          const curveBend = Math.sin(time * 2.2 + p.wobblePhase) * 9;

          ctx.beginPath();
          ctx.moveTo(-strandLen * 0.5, 0);
          ctx.quadraticCurveTo(0, curveBend, strandLen * 0.5, 0);

          const grad = ctx.createLinearGradient(-strandLen * 0.5, 0, strandLen * 0.5, 0);
          grad.addColorStop(0, p.secondaryColor || "#C76B35");
          grad.addColorStop(0.65, p.color);
          grad.addColorStop(1, "#FFE082");

          ctx.strokeStyle = grad;
          ctx.lineWidth = renderSize * 1.6;
          ctx.lineCap = "round";
          ctx.globalAlpha = alpha;
          ctx.stroke();

          // Saffron stigma bulb
          ctx.beginPath();
          ctx.arc(strandLen * 0.5, 0, renderSize * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = "#FFB300";
          ctx.fill();
        }

        // ----------------------------------------------------
        // TYPE 2: EFFERVESCENT JUICE DROPLET & BUBBLE
        // ----------------------------------------------------
        else if (p.type === "juice") {
          ctx.rotate(p.rotZ);
          ctx.scale(scale, scale);

          // Outer luminous glow
          ctx.globalAlpha = alpha;

          const bubbleGrad = ctx.createRadialGradient(
            -renderSize * 0.35,
            -renderSize * 0.35,
            renderSize * 0.1,
            0,
            0,
            renderSize
          );
          bubbleGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
          bubbleGrad.addColorStop(0.25, p.secondaryColor || "rgba(242, 201, 76, 0.85)");
          bubbleGrad.addColorStop(0.7, p.color);
          bubbleGrad.addColorStop(1, "rgba(217, 154, 67, 0.3)");

          ctx.fillStyle = bubbleGrad;
          ctx.beginPath();
          ctx.arc(0, 0, renderSize, 0, Math.PI * 2);
          ctx.fill();

          // Crisp Specular Highlight Reflection (Juice Droplet Glint)
          ctx.beginPath();
          ctx.arc(-renderSize * 0.38, -renderSize * 0.38, renderSize * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.fill();

          // Rim light contour
          ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 1.0 * scale;
          ctx.stroke();
        }

        // ----------------------------------------------------
        // TYPE 3: FRESH BOTANICAL MINT LEAF
        // ----------------------------------------------------
        else if (p.type === "mint" && p.aspectRatio) {
          ctx.rotate(p.rotZ);
          // 3D pitch/roll tumbling
          ctx.scale(scale * Math.cos(p.rotY), scale * Math.cos(p.rotX));

          const leafW = renderSize;
          const leafH = renderSize * p.aspectRatio;

          ctx.globalAlpha = alpha;

          // Organic leaf contour
          ctx.beginPath();
          ctx.moveTo(0, -leafH * 0.5);
          ctx.bezierCurveTo(
            leafW * 0.88,
            -leafH * 0.25,
            leafW * 0.78,
            leafH * 0.35,
            0,
            leafH * 0.5
          );
          ctx.bezierCurveTo(
            -leafW * 0.78,
            leafH * 0.35,
            -leafW * 0.88,
            -leafH * 0.25,
            0,
            -leafH * 0.5
          );

          const leafGrad = ctx.createLinearGradient(0, -leafH * 0.5, 0, leafH * 0.5);
          leafGrad.addColorStop(0, p.secondaryColor || "#74A759");
          leafGrad.addColorStop(0.5, p.color);
          leafGrad.addColorStop(1, "#3E6B2C");

          ctx.fillStyle = leafGrad;
          ctx.fill();

          // Central midrib vein
          ctx.beginPath();
          ctx.moveTo(0, -leafH * 0.45);
          ctx.lineTo(0, leafH * 0.45);
          ctx.strokeStyle = "rgba(200, 240, 160, 0.55)";
          ctx.lineWidth = 1.1 * scale;
          ctx.stroke();
        }

        // ----------------------------------------------------
        // TYPE 4: CHARCOAL TANDOOR EMBER SPARK
        // ----------------------------------------------------
        else if (p.type === "ember") {
          ctx.scale(scale, scale);

          // Twinkle pulse
          const flicker = 0.8 + 0.25 * Math.sin(time * 14 + i);
          ctx.globalAlpha = Math.min(1, alpha * flicker);
          ctx.globalCompositeOperation = "lighter";

          // Radial fire bloom
          const emberGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, renderSize * 3);
          emberGrad.addColorStop(0, "#FFFFFF");
          emberGrad.addColorStop(0.2, p.color);
          emberGrad.addColorStop(0.65, "rgba(255, 87, 34, 0.5)");
          emberGrad.addColorStop(1, "rgba(255, 87, 34, 0)");

          ctx.fillStyle = emberGrad;
          ctx.beginPath();
          ctx.arc(0, 0, renderSize * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalCompositeOperation = "source-over";
        }

        // ----------------------------------------------------
        // TYPE 5: AROMA / STEAM CLOUD
        // ----------------------------------------------------
        else if (p.type === "steam") {
          ctx.scale(scale, scale);
          ctx.globalAlpha = alpha;

          const steamGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, renderSize);
          steamGrad.addColorStop(0, p.color);
          steamGrad.addColorStop(0.5, "rgba(217, 154, 67, 0.03)");
          steamGrad.addColorStop(1, "rgba(23, 17, 14, 0)");

          ctx.fillStyle = steamGrad;
          ctx.beginPath();
          ctx.arc(0, 0, renderSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0, // placed behind website sections
        willChange: "filter",
      }}
      aria-hidden="true"
    />
  );
}
