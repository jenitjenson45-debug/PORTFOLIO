"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/portfolioData";
import { X, ExternalLink, Github, Sparkles } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#11120F]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#191B16] border border-[rgba(233,227,213,0.18)] rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black overflow-y-auto z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full border border-[rgba(233,227,213,0.15)] text-[#A9A99D] hover:text-[#E9E3D5] hover:bg-[#20231D] hover:border-[#858D70] transition-colors duration-200"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category & Year Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#858D70] font-mono font-medium">
                {project.category}
              </span>
              <span className="text-[#858D70]/40">✦</span>
              <span className="text-xs text-[#A9A99D] font-mono">{project.year}</span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-condensed text-4xl sm:text-5xl md:text-6xl text-[#E9E3D5] tracking-tight mb-2 uppercase">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base font-editorial-serif italic text-[#A0AA87] mb-6">
              {project.subtitle}
            </p>

            {/* Long Description */}
            <div className="space-y-4 text-[#A9A99D] font-sans font-light leading-relaxed text-sm sm:text-base mb-8">
              <p>{project.longDescription}</p>
            </div>

            {/* Metrics Highlights */}
            {project.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-[#20231D] border border-[rgba(233,227,213,0.1)] mb-8">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <span className="block text-[10px] uppercase tracking-wider text-[#A9A99D] font-sans">
                      {m.label}
                    </span>
                    <span className="text-base sm:text-lg font-mono text-[#E9E3D5] font-semibold mt-0.5 block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Tags */}
            <div className="mb-8">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#858D70] font-sans mb-3">
                TECHNOLOGY ARCHITECTURE
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-[#11120F] border border-[rgba(233,227,213,0.12)] text-[#E9E3D5] font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[rgba(233,227,213,0.1)]">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#858D70] text-[#11120F] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-[#A0AA87] transition-colors"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(233,227,213,0.2)] text-[#E9E3D5] text-xs uppercase tracking-[0.22em] font-medium hover:border-[#858D70] hover:text-[#F5F3EC] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
