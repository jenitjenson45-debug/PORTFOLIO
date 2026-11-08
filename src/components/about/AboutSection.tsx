"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO, SKILL_GROUPS, PROCESS_STEPS } from "@/data/portfolioData";
import { Starburst } from "../common/Monogram";
import { GraduationCap, Code2, Palette, Sparkles, Compass } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 sm:py-32 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#11120F] flex flex-col justify-center"
    >
      {/* Background Subtle Olive Glow */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[550px] h-[550px] bg-[#858D70]/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Index & Subtitle Bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#858D70] font-editorial-serif text-sm italic">02</span>
          <span className="w-8 h-[1px] bg-[#858D70]/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-[#A0AA87] font-sans font-medium">
            BEHIND THE PIXELS
          </span>
        </div>

        {/* Section Main Large Heading */}
        <div className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E9E3D5] leading-[0.88] tracking-tight uppercase max-w-5xl"
          >
            DESIGN WITH PURPOSE. <br />
            <span className="text-[#858D70]">BUILD WITH PASSION.</span>
          </motion.h2>
        </div>

        {/* Editorial Magazine Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column (7 cols): Authentic Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6 text-[#A9A99D] text-base sm:text-lg font-sans font-light leading-relaxed">
              <p className="text-[#E9E3D5] text-lg sm:text-xl font-normal leading-relaxed border-l-2 border-[#858D70] pl-6">
                I&apos;m <strong className="text-[#F5F3EC] font-semibold">Jenit Jenson</strong>, a
                third-year Computer Science Engineering student who enjoys exploring the
                intersection of design and technology.
              </p>
              <p>
                I believe a great website is more than just an attractive interface. It should
                communicate clearly, feel effortless to use and create a memorable experience.
              </p>
              <p>
                I enjoy transforming ideas into meaningful digital products through creative
                design, thoughtful layouts, design systems and interactive experiences.
              </p>
            </div>

            {/* Personal Detail Area (Prompt Requirement) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl glass-card border border-[rgba(233,227,213,0.12)]">
                <div className="flex items-center gap-3 mb-2 text-[#858D70]">
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#A0AA87]">
                    ACADEMICS
                  </span>
                </div>
                <h4 className="text-sm font-medium text-[#E9E3D5] mb-1">
                  B.Tech Computer Science Engineering
                </h4>
                <p className="text-xs text-[#A9A99D]">
                  Third-year undergraduate student
                </p>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-[rgba(233,227,213,0.12)]">
                <div className="flex items-center gap-3 mb-2 text-[#858D70]">
                  <Palette className="w-5 h-5" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#A0AA87]">
                    CORE FOCUS
                  </span>
                </div>
                <h4 className="text-sm font-medium text-[#E9E3D5] mb-1">
                  Web & UI/UX Design
                </h4>
                <p className="text-xs text-[#A9A99D]">
                  UI/UX exploration & creative digital experiences
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column (5 cols): Editorial Quote & Philosophy Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-8 sm:p-10 rounded-2xl bg-[#191B16] border border-[rgba(233,227,213,0.14)] overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-20 text-[#858D70]">
                <Starburst size={48} />
              </div>

              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-[#858D70] mb-4">
                AUTHENTIC POSITIONING
              </span>

              <p className="font-editorial-serif italic text-xl sm:text-2xl text-[#E9E3D5] leading-snug mb-6">
                &ldquo;{PERSONAL_INFO.positioning}&rdquo;
              </p>

              <div className="pt-6 border-t border-[rgba(233,227,213,0.1)] flex items-center justify-between text-xs text-[#A9A99D]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#858D70]" />
                  <span>Ambitious & Authentic</span>
                </div>
                <span className="uppercase tracking-[0.18em] text-[10px]">
                  KERALA, INDIA
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Presentation: Typography-Based Layout (No ordinary progress bars) */}
        <div className="pt-12 border-t border-[rgba(233,227,213,0.12)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.28em] text-[#858D70] font-sans font-medium block mb-2">
                TECHNICAL & CREATIVE REPERTOIRE
              </span>
              <h3 className="font-condensed text-4xl sm:text-5xl text-[#E9E3D5] tracking-tight uppercase">
                SKILLS & PROFICIENCIES
              </h3>
            </div>

            {/* Category Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {SKILL_GROUPS.map((group, idx) => (
                <button
                  key={group.category}
                  onClick={() => setActiveSkillCategory(idx)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                    activeSkillCategory === idx
                      ? "bg-[#858D70] text-[#11120F] font-semibold shadow-md"
                      : "bg-[#20231D] text-[#A9A99D] hover:text-[#E9E3D5] border border-[rgba(233,227,213,0.1)]"
                  }`}
                >
                  {group.category}
                </button>
              ))}
            </div>
          </div>

          {/* Active Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SKILL_GROUPS[activeSkillCategory].skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="group p-6 rounded-2xl glass-card border border-[rgba(233,227,213,0.1)] hover:border-[#858D70]/60 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base sm:text-lg font-medium text-[#E9E3D5] group-hover:text-[#F5F3EC] transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[#858D70] opacity-0 group-hover:opacity-100 transition-opacity">
                    ✦
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A9A99D] font-light leading-relaxed">
                  {skill.description}
                </p>

                {/* Subtle bottom indicator line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#858D70] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Editorial Process Steps (Image 02 Language) */}
        <div className="mt-24 pt-16 border-t border-[rgba(233,227,213,0.12)]">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs uppercase tracking-[0.28em] text-[#858D70]">
              MY PROCESS // STEPS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="p-5 rounded-2xl bg-[#191B16]/60 border border-[rgba(233,227,213,0.08)] hover:border-[#858D70]/40 transition-colors"
              >
                <span className="font-editorial-serif text-2xl text-[#858D70] italic block mb-2">
                  {step.number}
                </span>
                <h5 className="font-condensed text-xl text-[#E9E3D5] tracking-wide mb-2 uppercase">
                  {step.title}
                </h5>
                <p className="text-xs text-[#A9A99D] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
