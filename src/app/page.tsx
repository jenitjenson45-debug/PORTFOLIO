import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ExpertiseSection } from "@/components/expertise/ExpertiseSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#11120F] text-[#E9E3D5] selection:bg-[#858D70] selection:text-[#11120F] overflow-x-hidden">
      {/* Cinematic Ambient Parallax Background Layer */}
      <ParallaxBackground />

      {/* Floating Glassmorphism Navigation Bar */}
      <Navbar />

      {/* Exactly Five Continuous Scrolling Sections */}
      <div className="relative z-10 flex flex-col w-full">
        {/* Section 01: Home / Hero Experience */}
        <HeroSection />

        {/* Section 02: About Me */}
        <AboutSection />

        {/* Section 03: Services */}
        <ExpertiseSection />

        {/* Section 04: Selected Work */}
        <ProjectsSection />

        {/* Section 05: Contact & Luxury Footer */}
        <ContactSection />
      </div>
    </main>
  );
}
