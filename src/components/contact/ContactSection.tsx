"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Monogram, Starburst } from "../common/Monogram";
import confetti from "canvas-confetti";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  ArrowUp,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Spam prevention field
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [mailtoFallbackUrl, setMailtoFallbackUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#858D70", "#A0AA87", "#E9E3D5", "#F5F3EC"],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setStatusMessage("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(
          data.message || "Thank you! Your message has been prepared successfully."
        );
        if (data.mailtoUrl) {
          setMailtoFallbackUrl(data.mailtoUrl);
        }
        triggerConfetti();
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "An error occurred. Please reach out via email.");
      }
    } catch {
      // Offline or network error fallback
      const fallback = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setStatus("success");
      setMailtoFallbackUrl(fallback);
      setStatusMessage(
        "Network connection interrupted. Click below to launch your email client directly."
      );
    }
  };

  const scrollToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo: (target: number | string) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative min-h-screen pt-24 sm:pt-32 pb-12 px-6 md:px-12 lg:px-16 bg-[#11120F] overflow-hidden flex flex-col justify-between"
    >
      {/* Background Ambient Olive Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[700px] bg-[#858D70]/12 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Header Bar */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#858D70] font-editorial-serif text-sm italic">05</span>
          <span className="w-8 h-[1px] bg-[#858D70]/60" />
          <span className="text-xs uppercase tracking-[0.28em] text-[#A0AA87] font-sans font-medium">
            GET IN TOUCH // COLLABORATE
          </span>
        </div>

        {/* Section Main Editorial Heading */}
        <div className="mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-condensed text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#E9E3D5] leading-[0.88] tracking-tight uppercase max-w-5xl"
          >
            LET&apos;S CREATE <br />
            <span className="text-[#858D70]">SOMETHING MEANINGFUL.</span>
          </motion.h2>
          <p className="mt-4 text-[#A9A99D] text-base sm:text-lg font-sans max-w-2xl font-light">
            Have an idea, a project or an opportunity to collaborate? I&apos;d love to hear
            about it. Let&apos;s turn your next idea into something remarkable.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Glassmorphism Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Left Column (5 cols): Direct Contact Information & Alternatives */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#191B16] border border-[rgba(233,227,213,0.12)] space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#858D70] font-sans block">
                DIRECT CONTACT CHANNELS
              </span>

              {/* Email Link (Working mailto) */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#20231D] text-[#858D70] border border-[rgba(233,227,213,0.1)]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D]">
                    EMAIL DIRECTLY
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-base sm:text-lg text-[#E9E3D5] hover:text-[#858D70] font-medium transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone Link (Working tel) */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#20231D] text-[#858D70] border border-[rgba(233,227,213,0.1)]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D]">
                    CALL / WHATSAPP
                  </span>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-base sm:text-lg text-[#E9E3D5] hover:text-[#858D70] font-medium transition-colors"
                  >
                    {PERSONAL_INFO.phoneFormatted}
                  </a>
                </div>
              </div>

              {/* Social & Professional Networks */}
              <div className="pt-6 border-t border-[rgba(233,227,213,0.08)] flex flex-wrap gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20231D] hover:bg-[#858D70] text-[#E9E3D5] hover:text-[#11120F] text-xs uppercase tracking-[0.18em] transition-colors border border-[rgba(233,227,213,0.1)]"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20231D] hover:bg-[#858D70] text-[#E9E3D5] hover:text-[#11120F] text-xs uppercase tracking-[0.18em] transition-colors border border-[rgba(233,227,213,0.1)]"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry`}
                className="p-4 rounded-xl glass-card border border-[rgba(233,227,213,0.1)] flex items-center justify-between text-xs text-[#E9E3D5] hover:text-[#858D70] transition-colors"
              >
                <span>Email Me</span>
                <ArrowUpRight className="w-4 h-4 text-[#858D70]" />
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-4 rounded-xl glass-card border border-[rgba(233,227,213,0.1)] flex items-center justify-between text-xs text-[#E9E3D5] hover:text-[#858D70] transition-colors"
              >
                <span>Call Me</span>
                <ArrowUpRight className="w-4 h-4 text-[#858D70]" />
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): Elegant Glassmorphism Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl glass-card border border-[rgba(233,227,213,0.16)] shadow-2xl relative">
              <h3 className="font-condensed text-3xl sm:text-4xl text-[#E9E3D5] tracking-wide mb-2 uppercase">
                SEND A DIRECT MESSAGE
              </h3>
              <p className="text-xs sm:text-sm text-[#A9A99D] font-sans font-light mb-8">
                Fill out the details below and I will respond to your inquiry promptly.
              </p>

              {/* Status Banner */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-[#858D70]/20 border border-[#858D70]/50 text-xs text-[#E9E3D5] space-y-2">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#858D70]" />
                    <span>{statusMessage}</span>
                  </div>
                  {mailtoFallbackUrl && (
                    <a
                      href={mailtoFallbackUrl}
                      className="inline-flex items-center gap-1.5 underline text-[#A0AA87] hover:text-[#F5F3EC] mt-1"
                    >
                      Open Email Client Directly
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-900/30 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Spam Protection Honeypot Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D] mb-2 font-medium">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alexander Vance"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#11120F] border border-[rgba(233,227,213,0.12)] text-[#E9E3D5] text-sm placeholder:text-[#A9A99D]/40 focus:outline-none focus:border-[#858D70] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D] mb-2 font-medium">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@studio.design"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#11120F] border border-[rgba(233,227,213,0.12)] text-[#E9E3D5] text-sm placeholder:text-[#A9A99D]/40 focus:outline-none focus:border-[#858D70] transition-colors"
                    />
                  </div>
                </div>

                {/* Subject / Project Scope Field */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D] mb-2 font-medium">
                    PROJECT / SUBJECT
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Website Design & Modern Development"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#11120F] border border-[rgba(233,227,213,0.12)] text-[#E9E3D5] text-sm placeholder:text-[#A9A99D]/40 focus:outline-none focus:border-[#858D70] transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#A9A99D] mb-2 font-medium">
                    MESSAGE *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and vision..."
                    className="w-full px-4 py-3.5 rounded-xl bg-[#11120F] border border-[rgba(233,227,213,0.12)] text-[#E9E3D5] text-sm placeholder:text-[#A9A99D]/40 focus:outline-none focus:border-[#858D70] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#858D70] hover:bg-[#A0AA87] text-[#11120F] text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/50 hover:shadow-[0_0_25px_rgba(133,141,112,0.35)] disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Minimal Luxury Footer (Image 02 Language) */}
        <div className="pt-12 border-t border-[rgba(233,227,213,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#A9A99D]">
          {/* Copyright Tagline */}
          <div className="flex items-center gap-3">
            <Monogram size="sm" />
            <span className="uppercase tracking-[0.22em] text-[10.5px] text-[#E9E3D5] font-medium">
              {PERSONAL_INFO.footerTagline}
            </span>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A9A99D] hover:text-[#E9E3D5] transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A9A99D] hover:text-[#E9E3D5] transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#A9A99D] hover:text-[#E9E3D5] transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <div className="w-[1px] h-4 bg-[rgba(233,227,213,0.15)]" />

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#E9E3D5] hover:text-[#858D70] transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1 text-[#858D70]" />
            </button>
          </div>
        </div>

        {/* Copyright Year Subtext */}
        <div className="mt-4 text-center text-[10px] text-[#A9A99D]/60 uppercase tracking-[0.2em]">
          &copy; {currentYear} JENIT JENSON. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
