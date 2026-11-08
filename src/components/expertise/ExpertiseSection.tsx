"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SERVICES, Service } from "@/data/portfolioData";
import { Palette, Layout, Code2, Sparkles, ArrowUpRight, CheckCircle2, Layers } from "lucide-react";

export const ExpertiseSection: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Palette":
        return <Palette className="w-6 h-6 text-[#858D70]" />;
      case "Layout":
        return <Layout className="w-6 h-6 text-[#858D70]" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#858D70]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#858D70]" />;
      default:
        return <Layout className="w-6 h-6 text-[#858D70]" />;
    }
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 sm:py-32 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#11120F] flex flex-col justify-center"
    >
      {/* Background Soft Olive Lighting */}
      <div className="absolute top-1/3 right-1/4 w-[650px] h-[650px] bg-[#858D70]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Index & Subtitle Bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#858D70] font-editorial-serif text-sm italic">03</span>
          <span className="w-8 h-[1px] bg-[#858D70]/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-[#A0AA87] font-sans font-medium">
            WHAT I BRING TO THE TABLE
          </span>
        </div>

        {/* Section Heading (Image 02 Style: WHAT I DO / SERVICES) */}
        <div className="mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.28em] text-[#A9A99D] font-sans block mb-2">
            WHAT I DO
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-condensed text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E9E3D5] leading-[0.88] tracking-tight uppercase"
          >
            SERVICES.
          </motion.h2>
          <p className="mt-4 text-[#A9A99D] text-base sm:text-lg font-sans max-w-2xl font-light">
            Crafting memorable digital products where thoughtful UI/UX strategy meets
            refined visual aesthetics, modern design systems, and engaging interactions.
          </p>
        </div>

        {/* 4 Premium Glassmorphism Service Cards Grid (Image 03 Inspired) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredService === service.number;

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.8 }}
                onMouseEnter={() => setHoveredService(service.number)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative p-8 sm:p-10 rounded-2xl glass-card border border-[rgba(233,227,213,0.12)] hover:border-[#858D70]/50 transition-all duration-500 overflow-hidden"
              >
                {/* Background Ambient Olive Glow on Card Hover */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#858D70]/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Top Row: Number & Icon */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(233,227,213,0.1)]">
                  <span className="font-editorial-serif text-3xl text-[#858D70] italic font-light">
                    {service.number}
                  </span>
                  <div className="p-3 rounded-full bg-[#20231D] border border-[rgba(233,227,213,0.1)] group-hover:scale-110 group-hover:border-[#858D70]/40 transition-all duration-300">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-condensed text-3xl sm:text-4xl text-[#E9E3D5] group-hover:text-[#F5F3EC] tracking-wide mb-3 uppercase transition-colors">
                  {service.title}
                </h3>

                {/* Tagline */}
                <span className="block text-xs uppercase tracking-[0.2em] text-[#A0AA87] font-medium mb-4">
                  {service.tagline}
                </span>

                {/* Concise Description (Prompt specification) */}
                <p className="text-sm sm:text-base text-[#A9A99D] font-sans font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 pt-4 border-t border-[rgba(233,227,213,0.08)]">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9E3D5] font-medium block mb-2">
                    KEY CAPABILITIES
                  </span>
                  {service.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-[#A9A99D] group-hover:text-[#E9E3D5] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#858D70]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Subtle Interactive Arrow in Bottom Corner */}
                <div className="mt-8 pt-4 flex items-center justify-between text-xs text-[#858D70]">
                  <span className="uppercase tracking-[0.2em] text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    DISCUSS THIS SERVICE
                  </span>
                  <a
                    href="#contact"
                    className="p-2 rounded-full bg-[#20231D] group-hover:bg-[#858D70] group-hover:text-[#11120F] text-[#858D70] transition-colors duration-300"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
