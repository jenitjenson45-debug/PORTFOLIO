"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monogram } from "../common/Monogram";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Detect current section in view
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      setMobileMenuOpen(false);
      const win = window as unknown as { lenis?: { scrollTo: (target: HTMLElement | string) => void } };
      if (win.lenis) {
        win.lenis.scrollTo(targetEl);
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-4 sm:px-8 transition-all duration-500 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left: Monogram JJ & Name in compact glass pill */}
          <motion.a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto group flex items-center gap-3 px-3.5 py-2 rounded-full glass-nav hover:border-[#858D70]/50 transition-all duration-300"
          >
            <Monogram size="sm" />
            <div className="flex flex-col pr-1">
              <span className="font-editorial-serif text-sm tracking-[0.14em] uppercase text-[#E9E3D5] group-hover:text-[#F5F3EC] transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[8.5px] tracking-[0.24em] uppercase text-[#A9A99D] font-sans">
                PORTFOLIO 2026
              </span>
            </div>
          </motion.a>

          {/* Middle: Floating Glassmorphism Center Pill (Desktop) */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-nav shadow-2xl shadow-black/60"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-[#E9E3D5] font-medium"
                      : "text-[#A9A99D] hover:text-[#E9E3D5] hover:bg-[#20231D]/40"
                  }`}
                >
                  {/* Olive Green Active Indicator Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#858D70]/25 border border-[#858D70]/40 rounded-full -z-10 shadow-[0_0_12px_rgba(133,141,112,0.3)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.name}
                </a>
              );
            })}
          </motion.nav>

          {/* Right: Availability Indicator & Let's Talk Button */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3"
          >
            {/* Small Animated Availability Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full glass-nav text-[10px] uppercase tracking-[0.2em] text-[#A9A99D]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#858D70] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#858D70]" />
              </span>
              <span>Available</span>
            </div>

            {/* Let's Talk Button */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#20231D] border border-[rgba(233,227,213,0.18)] hover:border-[#858D70] hover:bg-[#858D70]/20 text-[#E9E3D5] hover:text-[#F5F3EC] text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-lg shadow-black/40"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#858D70] group-hover:text-[#E9E3D5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full glass-nav text-[#E9E3D5] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl glass-panel md:hidden border border-[rgba(233,227,213,0.16)] shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm uppercase tracking-[0.2em] transition-colors ${
                    activeSection === link.href.substring(1)
                      ? "bg-[#858D70]/25 text-[#E9E3D5] border border-[#858D70]/40 font-medium"
                      : "text-[#A9A99D] hover:text-[#E9E3D5] hover:bg-[#20231D]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-[rgba(233,227,213,0.1)] flex items-center justify-between text-xs text-[#A9A99D]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#858D70] animate-pulse" />
                  <span>Available for freelance & projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
