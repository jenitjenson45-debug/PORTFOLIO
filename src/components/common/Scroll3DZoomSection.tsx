"use client";

import React, { useRef, useEffect, useState } from "react";

interface Scroll3DZoomProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function Scroll3DZoomSection({
  children,
  className = "",
  intensity = 0.085, // Noticeable, luxurious 3D zoom effect (~9-10% scale)
}: Scroll3DZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateTransform = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Skip offscreen sections completely to save GPU & CPU cycles
      if (rect.bottom < -100 || rect.top > viewportHeight + 100) {
        return;
      }

      // Distance of section center from viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distFromCenter = sectionCenter - viewportCenter;
      const maxDist = (viewportHeight + rect.height) / 2;

      // Focus factor: 1 when perfectly centered, 0 when far above/below
      const absNorm = Math.min(1, Math.abs(distFromCenter) / maxDist);
      const focus = Math.max(0, 1 - absNorm);

      // 1. Noticeable 3D Zoom (scales from 0.92 to 1.04)
      const currentScale = (0.92 + focus * intensity * 1.35).toFixed(4);

      // 2. 3D Z-translation (up to 75px forward in 3D perspective)
      const currentZ = (focus * 75).toFixed(1);

      // 3. Subtle 3D tilt based on scroll direction relative to center
      const tiltDir = distFromCenter > 0 ? -1 : 1;
      const currentRotateX = ((1 - focus) * tiltDir * 2.8).toFixed(2);

      // Direct hardware-accelerated style mutation: ZERO React component re-renders!
      el.style.transform = `perspective(1000px) translate3d(0, 0, ${currentZ}px) scale(${currentScale}) rotateX(${currentRotateX}deg)`;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateTransform();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`relative will-change-transform ${className}`}
      style={{
        perspective: "1000px",
        transform: "perspective(1000px) translate3d(0, 0, 0) scale(0.92) rotateX(0deg)",
        transformOrigin: "center center",
        transition: "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1)",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
