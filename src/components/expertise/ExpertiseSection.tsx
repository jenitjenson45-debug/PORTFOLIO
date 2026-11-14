"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Starburst } from "../common/Monogram";
import { ArrowRight, Palette, Layout, Type, Disc, Grid, Sparkles, Code2, Terminal, GitBranch, Github } from "lucide-react";

interface Skill {
  name: string;
  category: "design" | "dev";
  tag: string;
  desc: string;
  color: string;
}

const ALL_SKILLS: Skill[] = [
  // Design & Visual Communication
  { name: "UI/UX Design", category: "design", tag: "Design", desc: "User research, wireframing & interactive design", color: "#D6B477" },
  { name: "Graphic Design", category: "design", tag: "Design", desc: "Brand visuals, digital assets & storytelling", color: "#F0D5A5" },
  { name: "Typography", category: "design", tag: "Design", desc: "Editorial pairing, kerning & scale systems", color: "#E5C890" },
  { name: "Colour Theory", category: "design", tag: "Design", desc: "Harmonics, contrast & emotional psychology", color: "#D6B477" },
  { name: "Visual Composition", category: "design", tag: "Design", desc: "Focal balance, golden ratio & spatial rhythm", color: "#F0D5A5" },
  { name: "Digital Content", category: "design", tag: "Design", desc: "Interactive media & modern web aesthetics", color: "#D6B477" },
  { name: "Figma", category: "design", tag: "Tool", desc: "Component architecture & dynamic design systems", color: "#A259FF" },

  // Development
  { name: "React.js", category: "dev", tag: "Framework", desc: "Reusable components, hooks & state trees", color: "#61DAFB" },
  { name: "Next.js", category: "dev", tag: "Framework", desc: "App router, SSR, SSG & edge rendering", color: "#FFFFFF" },
  { name: "TypeScript", category: "dev", tag: "Language", desc: "Strict type safety & scalable architectural contracts", color: "#3178C6" },
  { name: "JavaScript", category: "dev", tag: "Language", desc: "ES6+, async architecture & DOM orchestration", color: "#F7DF1E" },
  { name: "HTML5", category: "dev", tag: "Core", desc: "Semantic structure, accessibility & SEO foundation", color: "#E34F26" },
  { name: "CSS3", category: "dev", tag: "Styling", desc: "Flexbox, Grid, keyframe animations & responsive layout", color: "#1572B6" },
  { name: "C Language", category: "dev", tag: "Systems", desc: "Low-level memory management, pointers & algorithms", color: "#A8B9CC" },
  { name: "Git", category: "dev", tag: "DevOps", desc: "Branching strategies, commits & merge workflows", color: "#F05032" },
  { name: "GitHub", category: "dev", tag: "Platform", desc: "Repository management, CI/CD & collaboration", color: "#FFFFFF" },
];

export const ExpertiseSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "design" | "dev">("all");

  const filteredSkills = ALL_SKILLS.filter((s) => {
    if (filter === "all") return true;
    return s.category === filter;
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-center overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Golden Radial Backlight */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(214,180,119,0.1)_0%,rgba(158,126,69,0.03)_50%,transparent_75%)] blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top Header & Intro Row matching Screenshot 2 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            {/* Section Index Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D] mb-4"
            >
              <span className="text-[#F0D5A5] font-serif font-semibold">02</span>
              <span className="text-[#AAA59D]/50">/</span>
              <span>My Skills</span>
            </motion.div>

            {/* Heading: Tools of My Trade. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#F5F1E9]"
            >
              Tools of <br />
              My <span className="text-gold-gradient italic font-normal">Trade.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-[#AAA59D] font-light"
            >
              A versatile skill set to design, develop and innovate.
            </motion.p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { id: "all", label: "All Disciplines" },
              { id: "design", label: "Design & Visual Communication" },
              { id: "dev", label: "Development & Engineering" },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as "all" | "design" | "dev")}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-300 border ${
                    active
                      ? "bg-gradient-to-r from-[#F0D5A5] to-[#D6B477] text-[#080808] font-medium border-[#D6B477] shadow-gold-glow"
                      : "bg-[#141311]/70 text-[#AAA59D] border-[rgba(214,180,119,0.18)] hover:border-[#D6B477]/50 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Glass Skills Grid */}
        <div className="relative">
          {/* Floating 3D Metallic Ring graphic on right edge */}
          <div className="hidden xl:block absolute -top-16 -right-12 w-44 h-44 rounded-full border-4 border-[rgba(214,180,119,0.2)] border-t-[rgba(240,213,165,0.7)] pointer-events-none animate-spin-slow opacity-60" />

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.03 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card-interactive rounded-2xl p-5 border border-[rgba(214,180,119,0.15)] flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top gold sheen on hover */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F0D5A5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Header: Skill Tag & Mini Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-[#181714] border border-[rgba(255,255,255,0.06)] text-[#AAA59D]">
                        {skill.tag}
                      </span>
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                      />
                    </div>

                    {/* Skill Name */}
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9] group-hover:text-[#F0D5A5] transition-colors">
                      {skill.name}
                    </h3>

                    {/* Skill Description */}
                    <p className="mt-2 text-xs text-[#AAA59D] leading-relaxed font-light">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-[#AAA59D]/60 font-mono">
                      {skill.category === "design" ? "VISUAL" : "ENGINEERING"}
                    </span>
                    <Starburst size={11} className="text-[#D6B477] opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
