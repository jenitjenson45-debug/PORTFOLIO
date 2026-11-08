"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FALLBACK_PROJECTS, Project, PERSONAL_INFO } from "@/data/portfolioData";
import {
  ResqlinkVisual,
  RoyalFoodsVisual,
  EditorialVisual,
  AegisVisual,
} from "./ProjectVisuals";
import { ProjectModal } from "./ProjectModal";
import { ExternalLink, Github, ArrowUpRight, Sparkles, RefreshCw } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);
  const [githubLoaded, setGithubLoaded] = useState(false);

  // Dynamic GitHub Integration
  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        setIsLoadingGithub(true);
        const res = await fetch(
          "https://api.github.com/users/jenitjenson45-debug/repos?sort=updated&per_page=100",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!res.ok) {
          // If rate-limited or error, fallback projects are already in place
          return;
        }

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Map and merge with our curated project showcase
          const updatedProjects = FALLBACK_PROJECTS.map((fallback) => {
            const match = data.find(
              (r) =>
                r.name.toLowerCase() === fallback.id.toLowerCase() ||
                r.html_url.toLowerCase() === fallback.githubUrl.toLowerCase() ||
                r.name.toLowerCase().includes(fallback.id.toLowerCase())
            );

            if (match) {
              return {
                ...fallback,
                description: match.description || fallback.description,
                githubUrl: match.html_url || fallback.githubUrl,
                tags: match.language
                  ? Array.from(new Set([match.language, ...fallback.tags]))
                  : fallback.tags,
                year: match.updated_at
                  ? new Date(match.updated_at).getFullYear().toString()
                  : fallback.year,
              };
            }
            return fallback;
          });

          setProjects(updatedProjects);
          setGithubLoaded(true);
        }
      } catch {
        // Offline or sandbox network limit — fallback remains smoothly active
      } finally {
        setIsLoadingGithub(false);
      }
    };

    fetchGithubRepos();
  }, []);

  const renderVisual = (id: string) => {
    switch (id) {
      case "resqlink":
        return <ResqlinkVisual />;
      case "royal-foods":
        return <RoyalFoodsVisual />;
      case "portfolio-editorial":
        return <EditorialVisual />;
      case "aegis-platform":
        return <AegisVisual />;
      default:
        return <ResqlinkVisual />;
    }
  };

  return (
    <section
      id="work"
      className="relative min-h-screen py-24 sm:py-32 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#11120F] flex flex-col justify-center"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-[#858D70]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Header Bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#858D70] font-editorial-serif text-sm italic">04</span>
          <span className="w-8 h-[1px] bg-[#858D70]/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-[#A0AA87] font-sans font-medium">
            PORTFOLIO SHOWCASE
          </span>
        </div>

        {/* Section Title & Subtitle (Image 02 Language) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-condensed text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E9E3D5] leading-[0.88] tracking-tight uppercase"
            >
              SELECTED WORK.
            </motion.h2>
            <p className="mt-4 text-[#A9A99D] text-base sm:text-lg font-sans max-w-2xl font-light">
              A collection of digital experiences, experiments and projects shaped by
              curiosity, creativity and technology.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {githubLoaded && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#858D70] flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20231D] border border-[#858D70]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#858D70] animate-pulse" />
                Live GitHub Synced
              </span>
            )}
            <a
              href="https://github.com/jenitjenson45-debug?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#E9E3D5] hover:text-[#858D70] transition-colors pb-1.5 border-b border-[#858D70]/40 group"
            >
              <span>VIEW ALL PROJECTS</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#858D70] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Editorial Project Gallery Grid (3-column on desktop, responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.8 }}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl glass-card border border-[rgba(233,227,213,0.12)] hover:border-[#858D70]/60 transition-all duration-500 overflow-hidden"
            >
              <div>
                {/* Visual Preview Container */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer mb-6 group-hover:shadow-2xl transition-all duration-500"
                >
                  <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                    {renderVisual(project.id)}
                  </div>

                  {/* Gentle Image Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#11120F]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full glass-panel text-xs uppercase tracking-[0.2em] text-[#E9E3D5] font-medium border border-[#858D70]/40">
                      EXPLORE DETAILS
                    </span>
                  </div>
                </div>

                {/* Category & Year */}
                <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-[0.24em] text-[#A0AA87]">
                  <span>{project.category}</span>
                  <span className="text-[#A9A99D] font-mono">{project.year}</span>
                </div>

                {/* Project Title */}
                <h3
                  onClick={() => setSelectedProject(project)}
                  className="font-condensed text-3xl sm:text-4xl text-[#E9E3D5] group-hover:text-[#F5F3EC] tracking-wide mb-2 uppercase cursor-pointer transition-colors"
                >
                  {project.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#A9A99D] font-sans font-light leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                {/* Technology Labels */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] rounded-full bg-[#20231D] text-[#E9E3D5] font-sans border border-[rgba(233,227,213,0.08)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-1 text-[10px] rounded-full bg-[#20231D] text-[#A9A99D] font-sans">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-4 border-t border-[rgba(233,227,213,0.08)] flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs uppercase tracking-[0.2em] text-[#858D70] hover:text-[#E9E3D5] font-medium transition-colors"
                >
                  VIEW PROJECT
                </button>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#20231D] hover:bg-[#858D70] text-[#A9A99D] hover:text-[#11120F] transition-colors"
                      title="Open Live Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-[#20231D] hover:bg-[#858D70] text-[#A9A99D] hover:text-[#11120F] transition-colors"
                    title="Open GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Central Button */}
        <div className="text-center pt-8">
          <a
            href="https://github.com/jenitjenson45-debug?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#20231D] border border-[rgba(233,227,213,0.18)] hover:border-[#858D70] hover:bg-[#858D70]/20 text-[#E9E3D5] text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 shadow-xl"
          >
            <span>VIEW ALL PROJECTS ON GITHUB</span>
            <ArrowUpRight className="w-4 h-4 text-[#858D70] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
