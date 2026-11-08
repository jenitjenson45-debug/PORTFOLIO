"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ParallaxBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Deep Charcoal Near-Black Background */}
      <div className="absolute inset-0 bg-[#11120F]" />

      {/* Subtle Olive-Green Ambient Lighting - Top Center */}
      <motion.div
        className="absolute -top-[12%] left-1/2 -translate-x-1/2 w-[850px] h-[750px] rounded-full blur-[160px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(133, 141, 112, 0.65) 0%, rgba(32, 35, 29, 0.3) 55%, transparent 75%)",
        }}
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.2, 0.28, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle Olive Ambient Glow - Middle Right (Behind Hero Portrait area) */}
      <motion.div
        className="absolute top-[28%] -right-[8%] w-[700px] h-[700px] rounded-full blur-[170px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(160, 170, 135, 0.5) 0%, rgba(32, 35, 29, 0.2) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Deep Surface Accent - Bottom Left */}
      <motion.div
        className="absolute -bottom-[15%] -left-[10%] w-[750px] h-[750px] rounded-full blur-[180px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(133, 141, 112, 0.45) 0%, rgba(25, 27, 22, 0.3) 60%, transparent 80%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fine Architectural Grid & Dividers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(233,227,213,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(233,227,213,0.015)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Subtle Atmospheric Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(17,18,15,0.7)_80%,rgba(17,18,15,0.95)_100%)]" />

      {/* Subtle Floating Muted Olive Dust Particles */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#A0AA87]/30"
              style={{
                top: `${(i * 17) % 94}%`,
                left: `${(i * 21) % 95}%`,
                filter: "blur(0.4px)",
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [0.7, 1.2, 0.7],
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5 + (i % 4) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
