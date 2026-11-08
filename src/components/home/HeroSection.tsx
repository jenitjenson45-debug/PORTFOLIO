"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { CircularSeal, Starburst } from "../common/Monogram";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const yBgText = useTransform(scrollY, [0, 600], [0, 100]);
  const yPortrait = useTransform(scrollY, [0, 600], [0, 45]);
  const yContent = useTransform(scrollY, [0, 600], [0, 30]);

  // Subtle interactive mouse tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const portraitRotateX = useTransform(smoothMouseY, [-300, 300], [3, -3]);
  const portraitRotateY = useTransform(smoothMouseX, [-300, 300], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) {
      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(el);
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#11120F]"
    >
      {/* Background Giant Editorial "PORTFOLIO" Typography (Image 02 Language) */}
      <motion.div
        style={{ y: yBgText }}
        className="absolute top-12 md:top-16 inset-x-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden"
      >
        <span className="font-condensed text-[19vw] leading-none tracking-normal text-[#E9E3D5]/[0.06] whitespace-nowrap uppercase">
          PORTFOLIO
        </span>
      </motion.div>

      {/* Subtle Olive Ambient Glow Aura */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-[#858D70]/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      {/* Top Header Labels (Image 02 Language) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto flex items-center justify-between border-b border-[rgba(233,227,213,0.12)] pb-4 mb-4 sm:mb-6 text-xs uppercase tracking-[0.28em] text-[#A9A99D]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#858D70]" />
          <span className="text-[#E9E3D5] font-medium">PORTFOLIO / 2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span>WEB DESIGNER & UI/UX DESIGNER</span>
        </div>
      </div>

      {/* Main Hero Container — Centered & Towering */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(82vh-100px)]">
          
          {/* Left Column (5 cols on lg): Editorial Typography & Bio */}
          <motion.div
            style={{ y: yContent }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative z-20 pt-4 lg:pt-0"
          >
            {/* Minimal Sub-Label */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-[#858D70]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#A0AA87] font-sans font-medium">
                HELLO, I&apos;M
              </span>
            </div>

            {/* Designer Name in High-Fashion Editorial Serif */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-editorial-serif text-3xl sm:text-5xl lg:text-6xl text-[#E9E3D5] font-normal tracking-tight mb-3"
            >
              JENIT JENSON
            </motion.h2>

            {/* Muted Olive Pill Designation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#858D70]/20 border border-[#858D70]/40 w-fit mb-5">
              <Starburst size={12} className="text-[#A0AA87]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#E9E3D5] font-sans font-medium">
                WEB & UI/UX DESIGNER
              </span>
            </div>

            {/* Main Oversized Headline (Condensed Typography) */}
            <div className="mb-5">
              <h1 className="font-condensed text-5xl sm:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-tight text-[#E9E3D5] uppercase">
                DESIGNING <br />
                <span className="text-[#858D70]">DIGITAL</span> <br />
                EXPERIENCES.
              </h1>
            </div>

            {/* Narrative Bio Paragraph */}
            <p className="text-[#A9A99D] text-sm sm:text-base font-sans font-light leading-relaxed max-w-lg mb-8">
              I&apos;m a Computer Science Engineering student with a passion for designing
              digital experiences that combine thoughtful aesthetics, intuitive interactions
              and modern design systems.
            </p>

            {/* Editorial CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Button 01: Explore My Work */}
              <button
                onClick={scrollToWork}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#858D70] text-[#11120F] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#A0AA87] transition-all duration-300 shadow-lg shadow-black/50 hover:shadow-[0_0_25px_rgba(133,141,112,0.35)]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
              </button>

              {/* Button 02: Let's Connect */}
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[rgba(233,227,213,0.22)] bg-transparent text-[#E9E3D5] text-xs uppercase tracking-[0.22em] font-medium hover:border-[#858D70] hover:text-[#F5F3EC] hover:bg-[#20231D]/50 transition-all duration-300"
              >
                <span>LET&apos;S CONNECT</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#858D70] group-hover:text-[#E9E3D5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column (7 cols on lg): MONUMENTAL PORTRAIT OCCUPYING OVER 75% OF SECTION HEIGHT */}
          <motion.div
            style={{
              y: yPortrait,
              rotateX: portraitRotateX,
              rotateY: portraitRotateY,
              transformPerspective: 1000,
            }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative flex items-end justify-center order-1 lg:order-2 h-[68vh] sm:h-[75vh] lg:h-[82vh] min-h-[500px] lg:min-h-[660px] w-full"
          >
            {/* Layer 1: Background Muted Olive-Green Circle Shape (From Image 02 Reference) */}
            <div className="absolute w-[340px] sm:w-[480px] lg:w-[560px] h-[340px] sm:h-[480px] lg:h-[560px] rounded-full bg-[#858D70]/40 top-4 sm:top-2 right-4 sm:right-10 pointer-events-none blur-[3px] -z-10" />

            {/* Layer 2: Rotating Editorial Circular Seal Badge (Image 02 Reference) */}
            <div className="absolute top-2 right-2 sm:top-6 sm:right-4 z-30 pointer-events-none">
              <CircularSeal />
            </div>

            {/* Layer 3: Minimal Floating Location Tag */}
            <div className="absolute top-16 left-2 sm:left-4 z-30 hidden sm:flex flex-col gap-1 p-3 rounded-xl glass-panel border border-[rgba(233,227,213,0.12)]">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#A0AA87]">
                LOCATION
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-[#E9E3D5] font-medium">
                KERALA, INDIA
              </span>
            </div>

            {/* Layer 4: The Monumental Portrait Cutout (Dominating 75%+ of the section height) */}
            <div className="relative w-full h-full max-w-[560px] lg:max-w-[620px] flex items-end justify-center select-none overflow-hidden">
              <div className="relative w-full h-full flex items-end justify-center">
                <Image
                  src="/images/jenit-portrait.jpg"
                  alt="Jenit Jenson — Web & UI/UX Designer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 620px"
                  className="object-contain object-bottom filter grayscale contrast-110 brightness-100 mix-blend-screen"
                />

                {/* Seamless Blending Masks */}
                {/* Bottom Torso Fade to blend smoothly into the section background */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#11120F] via-[#11120F]/80 to-transparent pointer-events-none" />
                {/* Left Edge Subtle Blend */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#11120F] to-transparent pointer-events-none" />
                {/* Right Edge Subtle Blend */}
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#11120F] to-transparent pointer-events-none" />
                {/* Top Subtle Vignette */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#11120F]/70 to-transparent pointer-events-none" />

                {/* Subtle Ambient Olive Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#858D70]/20 via-transparent to-transparent mix-blend-color-dodge pointer-events-none" />
              </div>

              {/* Status Floating Pill Overlapping Lower Area */}
              <div className="absolute bottom-6 right-6 sm:right-10 z-30 flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[rgba(233,227,213,0.16)] shadow-xl">
                <span className="w-2 h-2 rounded-full bg-[#858D70] animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9E3D5] font-sans font-medium">
                  3RD YEAR CSE · B.TECH
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Hero Ribbon: Scroll Indicator & Editorial Discipline Tags (No Frontend) */}
      <div className="relative z-20 max-w-7xl w-full mx-auto pt-4 border-t border-[rgba(233,227,213,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9A99D]">
        {/* Scroll Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[#858D70] font-editorial-serif text-sm italic">01</span>
          <div className="w-8 h-[1px] bg-[#858D70]/60 relative overflow-hidden">
            <motion.div
              className="w-3 h-full bg-[#E9E3D5]"
              animate={{ x: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="uppercase tracking-[0.28em] text-[10px] text-[#A9A99D]">
            SCROLL TO EXPLORE
          </span>
        </div>

        {/* Discipline Badges — Pure Design & Creative Systems */}
        <div className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.28em]">
          <span>UI/UX DESIGN</span>
          <span className="text-[#858D70]">✦</span>
          <span>WEBSITE LAYOUTS</span>
          <span className="text-[#858D70]">✦</span>
          <span>BRAND IDENTITY</span>
          <span className="text-[#858D70]">✦</span>
          <span>DESIGN SYSTEMS</span>
          <span className="text-[#858D70]">✦</span>
          <span>CREATIVE EXPERIENCES</span>
        </div>

        {/* Availability Status */}
        <div className="flex items-center gap-2 text-[#E9E3D5] text-[10.5px]">
          <Sparkles className="w-3.5 h-3.5 text-[#858D70]" />
          <span className="tracking-[0.22em] uppercase">
            AVAILABLE FOR DESIGN PROJECTS
          </span>
        </div>
      </div>
    </section>
  );
};
