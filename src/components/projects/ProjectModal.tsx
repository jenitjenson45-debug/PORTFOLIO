"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { Starburst } from "../common/Monogram";
import { X, ExternalLink, Github, CheckCircle2, ArrowRight } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#080808]/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-luxury rounded-3xl p-6 sm:p-10 border border-[rgba(214,180,119,0.3)] shadow-[0_25px_70px_rgba(0,0,0,0.9)] my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-[#181714] border border-[rgba(255,255,255,0.08)] text-[#AAA59D] hover:text-white hover:border-[#D6B477] transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <Starburst size={14} className="text-[#D6B477]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#F0D5A5] font-mono">
              {project.category}
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#F5F1E9] leading-tight">
            {project.title}
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#AAA59D] font-light leading-relaxed">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pb-6 border-b border-[rgba(214,180,119,0.15)]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#F0D5A5] to-[#D6B477] text-[#080808] font-medium text-xs sm:text-sm tracking-wide shadow-gold-glow hover:scale-[1.02] transition-transform"
              >
                <span>Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#181714] border border-[rgba(214,180,119,0.3)] text-[#F5F1E9] hover:border-[#D6B477] hover:text-[#F0D5A5] text-xs sm:text-sm tracking-wide transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Repository</span>
              </a>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Problem Statement */}
            <div className="p-6 rounded-2xl bg-[#12110F]/80 border border-[rgba(255,255,255,0.06)]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F0D5A5] font-mono mb-2">
                Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#AAA59D] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="p-6 rounded-2xl bg-[#12110F]/80 border border-[rgba(255,255,255,0.06)]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#F0D5A5] font-mono mb-2">
                Proposed Solution
              </h3>
              <p className="text-xs sm:text-sm text-[#AAA59D] leading-relaxed">
                {project.proposedSolution}
              </p>
            </div>
          </div>

          {/* Main Key Features */}
          <div className="mt-8">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F0D5A5] font-mono mb-4">
              Main Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#141311] border border-[rgba(214,180,119,0.12)] text-xs sm:text-sm text-[#F5F1E9]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D6B477] flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="mt-8 pt-6 border-t border-[rgba(214,180,119,0.15)]">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#AAA59D] font-mono mb-3">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[#181714] border border-[rgba(214,180,119,0.2)] text-[#F0D5A5] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
