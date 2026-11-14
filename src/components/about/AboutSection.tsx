"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Starburst } from "../common/Monogram";
import { GraduationCap, MapPin, Mail, ArrowRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-center overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Ambient Golden Background Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(214,180,119,0.12)_0%,rgba(158,126,69,0.04)_50%,transparent_75%)] blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* 3-Column Editorial Grid Faithful to Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (4 cols): Narrative & Heading */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-6">
            {/* Section Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D]"
            >
              <span className="text-[#F0D5A5] font-serif font-semibold">01</span>
              <span className="text-[#AAA59D]/50">/</span>
              <span>About Me</span>
            </motion.div>

            {/* Heading: Turning Ideas into Impact. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] text-[#F5F1E9]"
            >
              Turning Ideas <br />
              into <span className="text-gold-gradient italic font-normal">Impact.</span>
            </motion.h2>

            {/* Biography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-[#AAA59D] leading-relaxed font-light"
            >
              {PERSONAL_INFO.aboutBio}
            </motion.p>

            {/* Know More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2"
            >
              <button
                onClick={() => scrollToSection("education")}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[rgba(214,180,119,0.3)] bg-[#12110F]/80 backdrop-blur-md text-xs sm:text-sm tracking-wide text-[#F5F1E9] hover:border-[#D6B477] hover:text-[#080808] transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0D5A5] to-[#D6B477] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-medium">Know More</span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* Centre Column (5 cols): Monochrome Portrait in Floating Glass Frame + Golden Orbit Rings */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            {/* 3D Floating Glass Torus Ring (Matching Screenshot 2 right of portrait) */}
            <motion.div
              style={{ rotate: ringRotate }}
              className="absolute -top-6 -right-6 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-dashed border-[rgba(214,180,119,0.35)] opacity-60 pointer-events-none"
            />

            {/* Floating Glass Monolith Frame Container */}
            <motion.div
              style={{ y: portraitY }}
              className="relative w-[280px] sm:w-[340px] h-[380px] sm:h-[460px] rounded-3xl p-3 bg-gradient-to-b from-[#1C1A16]/90 to-[#0A0A09]/90 border border-[rgba(214,180,119,0.25)] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col justify-end overflow-hidden group"
            >
              {/* Internal Glass Reflection Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[rgba(255,255,255,0.04)] to-transparent pointer-events-none" />

              {/* Orbiting Golden Light Path Arc */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                viewBox="0 0 340 460"
                fill="none"
              >
                <ellipse
                  cx="170"
                  cy="260"
                  rx="160"
                  ry="90"
                  transform="rotate(-15 170 260)"
                  stroke="url(#orbitGoldGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="6 3"
                  opacity="0.85"
                />
                <defs>
                  <linearGradient id="orbitGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2DC" />
                    <stop offset="50%" stopColor="#D6B477" />
                    <stop offset="100%" stopColor="#9E7E45" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Monochrome Editorial Portrait of Jenit */}
              <div className="relative z-10 w-full h-full flex items-end justify-center overflow-hidden">
                <Image
                  src="/images/jenit.png"
                  alt="Jenit Jenson Editorial Portrait"
                  width={400}
                  height={500}
                  className="w-auto h-full object-contain object-bottom grayscale contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Bottom Subtle Golden Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-20" />
            </motion.div>
          </div>

          {/* Right Column (3 cols): Stacked Glass Cards */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Card 1: Education */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card-interactive rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A1815] border border-[rgba(214,180,119,0.3)] flex items-center justify-center flex-shrink-0 text-[#F0D5A5]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-[#F5F1E9]">{PERSONAL_INFO.degreeShort}</h4>
                <p className="text-xs text-[#AAA59D] mt-0.5">{PERSONAL_INFO.college}</p>
              </div>
            </motion.div>

            {/* Card 2: Location */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card-interactive rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A1815] border border-[rgba(214,180,119,0.3)] flex items-center justify-center flex-shrink-0 text-[#F0D5A5]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-medium text-[#F5F1E9]">{PERSONAL_INFO.location}</h4>
                <p className="text-xs text-[#AAA59D] mt-0.5">God&apos;s Own Country</p>
              </div>
            </motion.div>

            {/* Card 3: Email Contact */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card-interactive rounded-2xl p-5 flex items-start gap-4 group/email cursor-pointer"
              onClick={() => (window.location.href = `mailto:${PERSONAL_INFO.email}`)}
            >
              <div className="w-10 h-10 rounded-xl bg-[#1A1815] border border-[rgba(214,180,119,0.3)] flex items-center justify-center flex-shrink-0 text-[#F0D5A5] group-hover/email:border-[#D6B477] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-mono text-[#F5F1E9] group-hover/email:text-[#F0D5A5] transition-colors truncate">
                  {PERSONAL_INFO.email}
                </h4>
                <p className="text-[11px] text-[#AAA59D] mt-0.5">Direct Inquiry</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
