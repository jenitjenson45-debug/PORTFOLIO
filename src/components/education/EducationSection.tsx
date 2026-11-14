"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Starburst } from "../common/Monogram";
import { GraduationCap, Briefcase, BookOpen, Layers, CheckCircle2 } from "lucide-react";

export const EducationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathHeight = useTransform(scrollYProgress, [0.15, 0.75], ["0%", "100%"]);

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-center overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Background Soft Golden Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(214,180,119,0.1)_0%,rgba(158,126,69,0.02)_50%,transparent_75%)] blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header matching Screenshot 2 */}
        <div className="max-w-2xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D] mb-4"
          >
            <span className="text-[#F0D5A5] font-serif font-semibold">04</span>
            <span className="text-[#AAA59D]/50">/</span>
            <span>Experience &amp; Education</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#F5F1E9]"
          >
            Building a Strong <br />
            <span className="text-gold-gradient italic font-normal">Foundation.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-sm sm:text-base text-[#AAA59D] font-light leading-relaxed"
          >
            My academic journey and key contributions in the field of technology and design.
          </motion.p>
        </div>

        {/* Cinematic Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Golden Timeline Guide Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-[rgba(214,180,119,0.15)]">
            <motion.div
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-[#F0D5A5] via-[#D6B477] to-[#9E7E45] shadow-[0_0_12px_rgba(214,180,119,0.8)]"
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {/* Timeline Item 1: B.Tech Education */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 pl-14 sm:pl-0"
            >
              {/* Left Side Content (Desktop) */}
              <div className="w-full sm:w-1/2 sm:pr-12 text-left sm:text-right order-2 sm:order-1">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F0D5A5] font-mono block mb-1">
                  ACADEMIC FOUNDATION
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-medium">
                  {PERSONAL_INFO.degree}
                </h3>
                <p className="text-sm text-[#AAA59D] mt-1 font-medium">{PERSONAL_INFO.college}</p>
                <div className="mt-2.5 inline-block px-3 py-1 rounded-full bg-[#1A1815] border border-[rgba(214,180,119,0.25)] text-xs text-[#F0D5A5] font-mono">
                  {PERSONAL_INFO.status}
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#AAA59D] leading-relaxed font-light">
                  Focused coursework spanning Data Structures, Database Systems, Web Architectures,
                  and Software Engineering Principles with hands-on systems programming in C.
                </p>
              </div>

              {/* Center Floating Icon Pill */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#12110E] border-2 border-[#D6B477] flex items-center justify-center text-[#F0D5A5] shadow-gold-glow z-10 order-1 sm:order-2">
                <GraduationCap className="w-5 h-5" />
              </div>

              {/* Right Side Glass Card */}
              <div className="w-full sm:w-1/2 sm:pl-12 order-3">
                <div className="glass-card-interactive rounded-2xl p-6 border border-[rgba(214,180,119,0.18)]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#F0D5A5] mb-3">
                    Curriculum Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-[#AAA59D]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>Data Structures &amp; Algorithm Optimization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>Full-Stack Web Architectures &amp; Distributed APIs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>Object Oriented Engineering with C &amp; Modern JS</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Timeline Item 2: Project Contributions */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8 pl-14 sm:pl-0"
            >
              {/* Left Side Glass Card */}
              <div className="w-full sm:w-1/2 sm:pr-12 order-2 sm:order-1">
                <div className="glass-card-interactive rounded-2xl p-6 border border-[rgba(214,180,119,0.18)]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#F0D5A5] mb-3">
                    Core Project Involvements
                  </h4>
                  <ul className="space-y-2 text-xs text-[#AAA59D]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>ResQLink: Kerala Disaster SOS &amp; Logistics Hub</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>ResQMesh: Decentralized Responder Credential System</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D6B477]" />
                      <span>3D Portfolio: High-Precision Next.js &amp; Three.js Showcase</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Center Floating Icon Pill */}
              <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#12110E] border-2 border-[#D6B477] flex items-center justify-center text-[#F0D5A5] shadow-gold-glow z-10 order-1 sm:order-2">
                <Briefcase className="w-5 h-5" />
              </div>

              {/* Right Side Content (Desktop) */}
              <div className="w-full sm:w-1/2 sm:pl-12 order-3 text-left">
                <span className="text-xs uppercase tracking-[0.2em] text-[#F0D5A5] font-mono block mb-1">
                  PROJECT CONTRIBUTIONS
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] font-medium">
                  Practical Applied Innovation
                </h3>
                <p className="text-sm text-[#AAA59D] mt-1 font-medium">Kerala, India</p>
                <div className="mt-2.5 inline-block px-3 py-1 rounded-full bg-[#1A1815] border border-[rgba(214,180,119,0.25)] text-xs text-[#F0D5A5] font-mono">
                  Ongoing Active Engineering
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#AAA59D] leading-relaxed font-light">
                  {PERSONAL_INFO.contributions}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
