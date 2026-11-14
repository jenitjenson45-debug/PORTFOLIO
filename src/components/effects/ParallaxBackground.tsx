"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const ParallaxBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Mouse tracking spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#080808]">
      {/* Base Dark Palette */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Mouse-Following Champagne Gold Spotlight */}
      {mounted && (
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{
            x: springX,
            y: springY,
            background:
              "radial-gradient(circle, rgba(240, 213, 165, 0.45) 0%, rgba(214, 180, 119, 0.2) 40%, transparent 75%)",
          }}
        />
      )}

      {/* Hero Ambient Champagne Gold Glow - Center Top Right */}
      <motion.div
        className="absolute -top-[10%] right-[10%] w-[900px] h-[800px] rounded-full blur-[180px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 180, 119, 0.35) 0%, rgba(158, 126, 69, 0.18) 50%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle Warm Accent - Left Side */}
      <motion.div
        className="absolute top-[40%] -left-[10%] w-[750px] h-[750px] rounded-full blur-[190px] opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 213, 165, 0.28) 0%, rgba(214, 180, 119, 0.12) 55%, transparent 75%)",
        }}
        animate={{
          y: [0, 40, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Subtle Gold Ambience */}
      <motion.div
        className="absolute -bottom-[15%] right-[15%] w-[800px] h-[700px] rounded-full blur-[200px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(214, 180, 119, 0.25) 0%, rgba(110, 85, 40, 0.15) 60%, transparent 80%)",
        }}
      />

      {/* Subtle Cinematic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(214,180,119,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(214,180,119,0.02)_1px,transparent_1px)] bg-[size:120px_120px]" />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,8,8,0.7)_80%,#080808_100%)]" />

      {/* Floating Champagne Gold Dust Embers */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#F0D5A5]"
              style={{
                width: `${(i % 3) + 1.2}px`,
                height: `${(i % 3) + 1.2}px`,
                left: `${(i * 6.3 + 5) % 94}%`,
                top: `${(i * 8.7 + 7) % 92}%`,
                boxShadow: "0 0 8px rgba(240, 213, 165, 0.8)",
                opacity: 0.35,
              }}
              animate={{
                y: [0, -45, 0],
                x: [0, (i % 2 === 0 ? 1 : -1) * 22, 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
