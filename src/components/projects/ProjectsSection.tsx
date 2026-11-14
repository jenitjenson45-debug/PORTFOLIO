"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FEATURED_PROJECTS, Project } from "@/data/portfolioData";
import { ProjectModal } from "./ProjectModal";
import { Starburst } from "../common/Monogram";
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-center overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[650px] bg-[radial-gradient(circle,rgba(214,180,119,0.12)_0%,rgba(158,126,69,0.03)_50%,transparent_75%)] blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header matching Screenshot 2 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            {/* Section Index Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D] mb-4"
            >
              <span className="text-[#F0D5A5] font-serif font-semibold">03</span>
              <span className="text-[#AAA59D]/50">/</span>
              <span>My Projects</span>
            </motion.div>

            {/* Heading: Projects That Speak. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] text-[#F5F1E9]"
            >
              Projects <br />
              That <span className="text-gold-gradient italic font-normal">Speak.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-[#AAA59D] font-light"
            >
              A showcase of my creative and development work, from disaster management platforms to modern web experiences.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://github.com/jenitjenson45-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#F0D5A5] hover:text-white transition-colors pb-1 border-b border-[rgba(214,180,119,0.3)] hover:border-[#D6B477]"
            >
              <span>View All Projects on GitHub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* 3 Large Cinematic Project Cards Grid (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => setSelectedProject(project)}
              data-cursor-project="true"
              className="group relative rounded-3xl overflow-hidden glass-card-interactive border border-[rgba(214,180,119,0.18)] cursor-pointer flex flex-col justify-between"
            >
              {/* Card Image Thumbnail Layer */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#12110E]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90" />

                {/* Top Corner Pill Tag */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#080808]/80 backdrop-blur-md border border-[rgba(214,180,119,0.25)] text-[10px] tracking-wider uppercase text-[#F0D5A5] font-mono">
                  {`PROJECT 0${index + 1}`}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F5F1E9] group-hover:text-[#F0D5A5] transition-colors font-medium">
                      {project.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full border border-[rgba(214,180,119,0.3)] bg-[#141311] flex items-center justify-center transition-all duration-300 group-hover:border-[#D6B477] group-hover:scale-110 group-hover:bg-[#D6B477] group-hover:text-[#080808]">
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <p className="text-xs uppercase tracking-[0.16em] text-[#AAA59D] font-mono mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#AAA59D] leading-relaxed line-clamp-3 font-light">
                    {project.description}
                  </p>
                </div>

                {/* Technologies List */}
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#161512] text-[#AAA59D] border border-[rgba(214,180,119,0.12)] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full text-[#F0D5A5]/80 font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Project Detail Modal Overlay */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
