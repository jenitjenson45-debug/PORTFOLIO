"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Starburst } from "../common/Monogram";
import { CREATIVE_INTERESTS } from "@/data/portfolioData";
import { Sparkles, Palette, Code, Film, Compass, Cpu } from "lucide-react";

export const InterestsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax for 3D Chess Piece
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const chessRotateY = useTransform(springX, [-300, 300], [-18, 18]);
  const chessRotateX = useTransform(springY, [-300, 300], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getInterestIcon = (name: string) => {
    switch (name) {
      case "UI/UX Design":
        return <Palette className="w-4 h-4 text-[#D6B477]" />;
      case "Web Development":
        return <Code className="w-4 h-4 text-[#F0D5A5]" />;
      case "Cinematic Visuals":
        return <Film className="w-4 h-4 text-[#D6B477]" />;
      case "Branding":
        return <Compass className="w-4 h-4 text-[#F0D5A5]" />;
      case "Tech Innovation":
        return <Cpu className="w-4 h-4 text-[#D6B477]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#D6B477]" />;
    }
  };

  return (
    <section
      id="interests"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-center overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Golden Backlight Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(214,180,119,0.12)_0%,rgba(158,126,69,0.02)_50%,transparent_75%)] blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols): Heading & Floating Glass Labels */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Section Index Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D] mb-4"
            >
              <span className="text-[#F0D5A5] font-serif font-semibold">05</span>
              <span className="text-[#AAA59D]/50">/</span>
              <span>My Interests</span>
            </motion.div>

            {/* Heading: Beyond The Screen. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#F5F1E9]"
            >
              Beyond <br />
              The <span className="text-gold-gradient italic font-normal">Screen.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-xs sm:text-sm uppercase tracking-[0.22em] text-[#F0D5A5] font-mono"
            >
              Design. Tech. Creativity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-sm sm:text-base text-[#AAA59D] font-light max-w-xl leading-relaxed"
            >
              Strategic thinking, aesthetic discipline, and relentless curiosity inspire every line of
              code and design decision.
            </motion.p>

            {/* Floating Glass Interest Labels (Matching Screenshot 2) */}
            <div className="mt-8 flex flex-wrap gap-3">
              {CREATIVE_INTERESTS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#12110F]/80 backdrop-blur-md border border-[rgba(214,180,119,0.22)] hover:border-[#D6B477] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-default group"
                >
                  {getInterestIcon(item.name)}
                  <span className="text-xs sm:text-sm text-[#F5F1E9] font-medium tracking-wide group-hover:text-[#F0D5A5] transition-colors">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Premium Metallic Champagne-Gold Chess Piece */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[420px]">
            {/* Pedestal Ambient Light */}
            <div className="absolute inset-x-12 bottom-6 h-16 rounded-full bg-[radial-gradient(ellipse,rgba(214,180,119,0.3)_0%,rgba(158,126,69,0.08)_50%,transparent_75%)] blur-2xl pointer-events-none" />

            {/* 3D Rotating Metallic Chess Piece */}
            <motion.div
              style={{
                rotateY: chessRotateY,
                rotateX: chessRotateX,
                transformStyle: "preserve-3d",
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-96 flex items-center justify-center filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
            >
              {/* Metallic Gold Chess King / Queen / Knight SVG with Specular Lighting */}
              <svg
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(214,180,119,0.35)]"
                viewBox="0 0 200 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Metallic Gold Vertical Body Gradient */}
                  <linearGradient id="chessGoldBody" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7A5D2A" />
                    <stop offset="25%" stopColor="#D6B477" />
                    <stop offset="50%" stopColor="#FFF2DC" />
                    <stop offset="75%" stopColor="#D6B477" />
                    <stop offset="100%" stopColor="#4A3716" />
                  </linearGradient>

                  {/* Top Cross / Finial Light Gold */}
                  <linearGradient id="chessGoldFinial" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#F0D5A5" />
                    <stop offset="100%" stopColor="#9E7E45" />
                  </linearGradient>

                  {/* Soft Metallic Glow Filter */}
                  <filter id="chessSpecular" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                    <feSpecularLighting result="specOut" specularExponent="24" lightingColor="#FFF2DC">
                      <fePointLight x="100" y="50" z="180" />
                    </feSpecularLighting>
                    <feComposite in="SourceGraphic" in2="specOut" operator="over" />
                  </filter>
                </defs>

                {/* Top Cross */}
                <path
                  d="M97 18 H103 V28 H113 V34 H103 V44 H97 V34 H87 V28 H97 Z"
                  fill="url(#chessGoldFinial)"
                />

                {/* Crown / Finial Ball */}
                <circle cx="100" cy="50" r="12" fill="url(#chessGoldBody)" />

                {/* Crown Rim with Arch Cutouts */}
                <path
                  d="M74 72 C74 62, 85 58, 100 58 C115 58, 126 62, 126 72 L120 86 C115 88, 85 88, 80 86 Z"
                  fill="url(#chessGoldBody)"
                />

                {/* Upper Collar Ring */}
                <ellipse cx="100" cy="94" rx="30" ry="7" fill="url(#chessGoldBody)" />
                <ellipse cx="100" cy="100" rx="27" ry="6" fill="#4A3716" opacity="0.6" />

                {/* Tapered Stem / Column */}
                <path
                  d="M78 102 C82 140, 84 180, 72 230 L128 230 C116 180, 118 140, 122 102 Z"
                  fill="url(#chessGoldBody)"
                />

                {/* Lower Tier / Stepped Rings */}
                <ellipse cx="100" cy="235" rx="36" ry="8" fill="url(#chessGoldBody)" />
                <ellipse cx="100" cy="248" rx="44" ry="10" fill="url(#chessGoldBody)" />

                {/* Flared Pedestal Base */}
                <path
                  d="M54 260 C54 250, 72 245, 100 245 C128 245, 146 250, 146 260 L152 284 C152 296, 128 304, 100 304 C72 304, 48 296, 48 284 Z"
                  fill="url(#chessGoldBody)"
                />

                {/* Base Bottom Lip */}
                <ellipse cx="100" cy="286" rx="52" ry="11" fill="url(#chessGoldBody)" />
                <ellipse cx="100" cy="292" rx="54" ry="12" fill="#2E220D" opacity="0.8" />

                {/* Fine Highlight Glint along Left Edge */}
                <path
                  d="M82 108 C86 142, 88 178, 76 226"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeOpacity="0.75"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
