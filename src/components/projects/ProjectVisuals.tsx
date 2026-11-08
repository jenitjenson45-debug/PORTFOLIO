"use client";

import React from "react";
import { Shield, Sparkles, Navigation, Flame, Eye, Lock, Layers, Code } from "lucide-react";

export const ResqlinkVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] bg-gradient-to-br from-[#191B16] via-[#20231D] to-[#11120F] p-6 flex flex-col justify-between overflow-hidden border border-[rgba(233,227,213,0.12)] rounded-xl group-hover:border-[#858D70]/60 transition-colors duration-500">
      {/* Background Radar Rings */}
      <div className="absolute inset-0 bg-[radial-gradient(#858D70_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-[#858D70]/20 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-[#858D70]/30" />

      {/* Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11120F]/80 border border-[rgba(233,227,213,0.14)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#858D70] animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#E9E3D5] font-mono">
            KSDMA · LIVE SYSTEM
          </span>
        </div>
        <span className="text-[10px] text-[#A9A99D] font-mono tracking-widest">
          14-DISTRICTS
        </span>
      </div>

      {/* Center Tactical Graphic */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#858D70]/20 border border-[#858D70]/40 flex items-center justify-center mb-2.5 shadow-lg group-hover:scale-105 transition-transform duration-500">
          <Navigation className="w-7 h-7 text-[#E9E3D5]" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#E9E3D5] font-medium font-sans">
          RAY-CASTING RISK TWIN
        </span>
        <span className="text-[10px] text-[#A9A99D] font-mono mt-0.5">
          GPS SOS · DLT SMS · SURVIVAL MESH
        </span>
      </div>

      {/* Bottom Live Metrics */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(233,227,213,0.1)] text-center">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Coverage</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">14 Polygons</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">SMS Flow</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">DLT Certified</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Command</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">SEOC Unified</span>
        </div>
      </div>
    </div>
  );
};

export const RoyalFoodsVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] bg-gradient-to-br from-[#191B16] via-[#20231D] to-[#11120F] p-6 flex flex-col justify-between overflow-hidden border border-[rgba(233,227,213,0.12)] rounded-xl group-hover:border-[#858D70]/60 transition-colors duration-500">
      {/* Muted Olive Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#858D70]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#A0AA87_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11120F]/80 border border-[rgba(233,227,213,0.14)] backdrop-blur-md">
          <Sparkles className="w-3 h-3 text-[#858D70]" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#E9E3D5] font-sans font-medium">
            THREE.JS · WEBGL 3D
          </span>
        </div>
        <span className="text-[10px] text-[#A9A99D] font-editorial-serif italic tracking-wider">
          Haute Kerala Heritage
        </span>
      </div>

      {/* Center 3D Jar Graphic Silhouette */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
        <div className="relative w-18 h-22 rounded-t-xl rounded-b-2xl border-2 border-[#858D70]/50 bg-gradient-to-b from-[#858D70]/15 via-[#20231D]/80 to-[#11120F] backdrop-blur-md flex flex-col items-center justify-center p-2 shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <div className="w-10 h-2 rounded-full bg-[#858D70]/60 border border-[#858D70] mb-2" />
          <Flame className="w-5 h-5 text-[#E9E3D5]" />
          <span className="text-[7px] uppercase tracking-[0.2em] text-[#A0AA87] font-sans font-semibold mt-1">
            ROYAL
          </span>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#E9E3D5] font-medium font-sans mt-3">
          GLASSMORPHISM 3D JAR
        </span>
        <span className="text-[10px] text-[#A9A99D] font-mono mt-0.5">
          PHYSICAL TRANSMISSION · WEB AUDIO
        </span>
      </div>

      {/* Bottom Attributes */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(233,227,213,0.1)] text-center">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Visuals</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">WebGL Swarm</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Soundscape</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">Procedural</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Framerate</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">60 FPS</span>
        </div>
      </div>
    </div>
  );
};

export const EditorialVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] bg-gradient-to-br from-[#191B16] via-[#20231D] to-[#11120F] p-6 flex flex-col justify-between overflow-hidden border border-[rgba(233,227,213,0.12)] rounded-xl group-hover:border-[#858D70]/60 transition-colors duration-500">
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11120F]/80 border border-[rgba(233,227,213,0.14)] backdrop-blur-md">
          <Layers className="w-3 h-3 text-[#858D70]" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#E9E3D5] font-mono">
            NEXT.JS 14 · FRAMER MOTION
          </span>
        </div>
        <span className="text-[10px] text-[#A9A99D] font-mono tracking-widest">
          PORTFOLIO 2026
        </span>
      </div>

      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#858D70]/20 border border-[#858D70]/40 flex items-center justify-center mb-2.5 shadow-lg group-hover:scale-105 transition-transform duration-500">
          <Code className="w-7 h-7 text-[#E9E3D5]" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#E9E3D5] font-medium font-sans">
          EDITORIAL LUXURY SHOWCASE
        </span>
        <span className="text-[10px] text-[#A9A99D] font-mono mt-0.5">
          CHARCOAL MINIMALISM · GLASSMORPHISM
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(233,227,213,0.1)] text-center">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Stack</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">App Router</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Lighthouse</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">99+ Perf</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Motion</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">Lenis Smooth</span>
        </div>
      </div>
    </div>
  );
};

export const AegisVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] bg-gradient-to-br from-[#191B16] via-[#20231D] to-[#11120F] p-6 flex flex-col justify-between overflow-hidden border border-[rgba(233,227,213,0.12)] rounded-xl group-hover:border-[#858D70]/60 transition-colors duration-500">
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11120F]/80 border border-[rgba(233,227,213,0.14)] backdrop-blur-md">
          <Shield className="w-3 h-3 text-[#858D70]" />
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#E9E3D5] font-mono">
            WEBSOCKET · TELEMETRY
          </span>
        </div>
        <span className="text-[10px] text-[#A9A99D] font-mono tracking-widest">
          LIVE SOC
        </span>
      </div>

      <div className="relative z-10 my-auto py-4 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#858D70]/20 border border-[#858D70]/40 flex items-center justify-center mb-2.5 shadow-lg group-hover:scale-105 transition-transform duration-500">
          <Lock className="w-7 h-7 text-[#E9E3D5]" />
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#E9E3D5] font-medium font-sans">
          THREAT SURVEILLANCE
        </span>
        <span className="text-[10px] text-[#A9A99D] font-mono mt-0.5">
          REAL-TIME ANOMALY DETECTION
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-[rgba(233,227,213,0.1)] text-center">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Latency</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">&lt; 25ms</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Events</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">10k/sec</span>
        </div>
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-[#A9A99D]">Cluster</span>
          <span className="text-xs font-mono text-[#E9E3D5] font-semibold">Distributed</span>
        </div>
      </div>
    </div>
  );
};
