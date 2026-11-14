"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScrollBlurFadeSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function ScrollBlurFadeSection({
  children,
  className = "",
  id,
}: ScrollBlurFadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blurAmount, setBlurAmount] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // When section top moves above viewport (scrolled past),
            // progressively blur without any opacity fading
            if (rect.top < 0 && rect.bottom > 0) {
              const scrolledPast = -rect.top;
              const fadeDistance = Math.min(rect.height * 0.65, 550);
              const progress = Math.min(1, Math.max(0, scrolledPast / fadeDistance));

              setBlurAmount(progress * 14); // 0px to 14px progressive optical blur
              setScale(1 - progress * 0.03); // subtle 3D depth recession
            } else if (rect.top >= 0) {
              setBlurAmount(0);
              setScale(1);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`relative will-change-transform ${className}`}
      style={{
        filter: blurAmount > 0.2 ? `blur(${blurAmount}px)` : "none",
        transform: scale !== 1 ? `scale(${scale})` : "none",
        transformOrigin: "center top",
        transition: "filter 0.12s ease-out, transform 0.12s ease-out",
      }}
    >
      {children}
    </div>
  );
}
