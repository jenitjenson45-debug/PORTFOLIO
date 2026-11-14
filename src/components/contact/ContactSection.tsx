"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Monogram, Starburst } from "../common/Monogram";
import confetti from "canvas-confetti";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [mailtoFallbackUrl, setMailtoFallbackUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const triggerGoldConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#F0D5A5", "#D6B477", "#FFF2DC", "#9E7E45"],
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
          data.message || "Thank you! Your message has been received. I will respond promptly."
        );
        if (data.mailtoUrl) {
          setMailtoFallbackUrl(data.mailtoUrl);
        }
        triggerGoldConfetti();
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setStatusMessage(data.error || "An error occurred while submitting.");
      }
    } catch {
      const fallback = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setStatus("success");
      setMailtoFallbackUrl(fallback);
      setStatusMessage("Message prepared. Click below to send directly via your mail client.");
    }
  };

  const scrollToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo: (target: number) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen pt-24 sm:pt-32 pb-12 px-6 sm:px-12 lg:px-16 bg-[#080808] text-[#F5F1E9] flex flex-col justify-between overflow-hidden border-t border-[rgba(214,180,119,0.08)]"
    >
      {/* Background Ambient Golden Lighting */}
      <div className="absolute top-1/4 right-1/3 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(214,180,119,0.12)_0%,rgba(158,126,69,0.03)_50%,transparent_75%)] blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        {/* Main Split Grid: Left Narrative/Cards + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column (5 cols): Narrative, Info Cards & 3D Airplane */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Section Index Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2.5 text-xs tracking-[0.24em] uppercase text-[#AAA59D] mb-4"
            >
              <span className="text-[#F0D5A5] font-serif font-semibold">06</span>
              <span className="text-[#AAA59D]/50">/</span>
              <span>Get in Touch</span>
            </motion.div>

            {/* Heading: Let's Create Something Great. */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] text-[#F5F1E9]"
            >
              Let&apos;s Create <br />
              Something <span className="text-gold-gradient italic font-normal">Great.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-sm sm:text-base text-[#AAA59D] font-light leading-relaxed max-w-md"
            >
              Have a project in mind or want to collaborate? <br />
              Feel free to reach out.
            </motion.p>

            {/* Floating 3D Paper Airplane Graphic with Golden Trail (Matching Screenshot 2) */}
            <div className="relative w-full my-8 h-28 pointer-events-none select-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" fill="none">
                <defs>
                  <linearGradient id="airplaneTrail" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D6B477" stopOpacity="0" />
                    <stop offset="60%" stopColor="#F0D5A5" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="airplaneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2DC" />
                    <stop offset="50%" stopColor="#D6B477" />
                    <stop offset="100%" stopColor="#7A5D2A" />
                  </linearGradient>
                </defs>

                {/* Golden swooping flight curve */}
                <path
                  d="M 20 85 C 100 85, 180 60, 280 30"
                  stroke="url(#airplaneTrail)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Origami Metallic Paper Airplane */}
                <g transform="translate(280, 15) rotate(-15)">
                  <polygon points="0,0 45,15 15,35" fill="url(#airplaneGrad)" />
                  <polygon points="0,0 45,15 25,12" fill="#FFFFFF" opacity="0.4" />
                  <polygon points="15,35 45,15 25,20" fill="#9E7E45" />
                </g>
              </svg>
            </div>

            {/* Contact Details Stacked Glass Cards */}
            <div className="w-full space-y-3.5">
              {/* Email */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="glass-card-interactive rounded-2xl p-4 flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181714] border border-[rgba(214,180,119,0.3)] flex items-center justify-center text-[#F0D5A5] group-hover:border-[#D6B477] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#AAA59D] font-mono block">
                    Email Address
                  </span>
                  <span className="text-xs sm:text-sm text-[#F5F1E9] font-mono group-hover:text-[#F0D5A5] transition-colors truncate block">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-interactive rounded-2xl p-4 flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181714] border border-[rgba(214,180,119,0.3)] flex items-center justify-center text-[#F0D5A5] group-hover:border-[#D6B477] transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#AAA59D] font-mono block">
                    GitHub Profile
                  </span>
                  <span className="text-xs sm:text-sm text-[#F5F1E9] font-mono group-hover:text-[#F0D5A5] transition-colors truncate block">
                    github.com/jenitjenson45-debug
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card-interactive rounded-2xl p-4 flex items-center gap-3.5 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181714] border border-[rgba(214,180,119,0.3)] flex items-center justify-center text-[#F0D5A5] group-hover:border-[#D6B477] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#AAA59D] font-mono block">
                    LinkedIn Network
                  </span>
                  <span className="text-xs sm:text-sm text-[#F5F1E9] font-mono group-hover:text-[#F0D5A5] transition-colors truncate block">
                    linkedin.com/in/jenit-jenson-116a2b387
                  </span>
                </div>
              </a>

              {/* Location */}
              <div className="glass-card-interactive rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#181714] border border-[rgba(214,180,119,0.3)] flex items-center justify-center text-[#F0D5A5]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-[#AAA59D] font-mono block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm text-[#F5F1E9] block">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Functional Glass Contact Form & Signature */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-panel-luxury rounded-3xl p-6 sm:p-10 border border-[rgba(214,180,119,0.22)] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field for spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#AAA59D] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#12110F] border border-[rgba(214,180,119,0.2)] text-[#F5F1E9] text-sm focus:outline-none focus:border-[#D6B477] transition-colors placeholder-[#AAA59D]/40"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#AAA59D] mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#12110F] border border-[rgba(214,180,119,0.2)] text-[#F5F1E9] text-sm focus:outline-none focus:border-[#D6B477] transition-colors placeholder-[#AAA59D]/40"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#AAA59D] mb-2">
                    Subject / Project Nature
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Collaboration on UI/UX & Web Development"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#12110F] border border-[rgba(214,180,119,0.2)] text-[#F5F1E9] text-sm focus:outline-none focus:border-[#D6B477] transition-colors placeholder-[#AAA59D]/40"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#AAA59D] mb-2">
                    Message Details *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your idea, timeline or project..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#12110F] border border-[rgba(214,180,119,0.2)] text-[#F5F1E9] text-sm focus:outline-none focus:border-[#D6B477] transition-colors placeholder-[#AAA59D]/40 resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-2.5 text-xs text-red-200">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-[#181611] border border-[#D6B477]/50 flex flex-col gap-2 text-xs text-[#F0D5A5]">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D6B477] flex-shrink-0" />
                      <span className="font-medium">{statusMessage}</span>
                    </div>
                    {mailtoFallbackUrl && (
                      <a
                        href={mailtoFallbackUrl}
                        className="inline-flex items-center gap-1.5 underline text-[#F5F1E9] hover:text-[#D6B477] mt-1"
                      >
                        <span>Open message in default email client</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#F0D5A5] via-[#D6B477] to-[#C9A25E] text-[#080808] font-medium text-sm tracking-wide transition-all duration-300 shadow-gold-glow hover:shadow-gold-glow-lg flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#080808]" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-[#080808]" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Editorial Luxury Statement & Golden Handwritten Script Signature (Matching Screenshot 2) */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 px-2">
              <div>
                <p className="font-serif-luxury text-xl sm:text-2xl text-[#F5F1E9] leading-tight">
                  Design. <br />
                  Develop. <br />
                  Innovate.
                </p>
              </div>

              {/* Golden Handwritten Signature */}
              <div className="text-right">
                <span
                  style={{ fontFamily: "'Great Vibes', cursive" }}
                  className="text-3xl sm:text-4xl text-[#F0D5A5] block filter drop-shadow-[0_0_10px_rgba(214,180,119,0.5)] select-none"
                >
                  Jenit Jenson
                </span>
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#AAA59D] font-mono block mt-1">
                  Creative Routine
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Footer matching Screenshot 2 */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full mt-24 pt-8 border-t border-[rgba(214,180,119,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: JJ Monogram & Brand Name */}
        <div className="flex items-center gap-3">
          <Monogram size="sm" />
          <span className="font-serif-luxury text-sm tracking-[0.16em] uppercase text-[#F5F1E9] font-medium">
            {PERSONAL_INFO.name}
          </span>
        </div>

        {/* Center: Copyright */}
        <p className="text-xs text-[#AAA59D] font-light tracking-wide text-center">
          {PERSONAL_INFO.copyright}
        </p>

        {/* Right: Social Links & Back to Top Button */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-9 h-9 rounded-full border border-[rgba(214,180,119,0.25)] bg-[#141311] flex items-center justify-center text-[#AAA59D] hover:text-[#F0D5A5] hover:border-[#D6B477] transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-9 h-9 rounded-full border border-[rgba(214,180,119,0.25)] bg-[#141311] flex items-center justify-center text-[#AAA59D] hover:text-[#F0D5A5] hover:border-[#D6B477] transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Scroll Back to Top"
            className="w-9 h-9 rounded-full border border-[#D6B477] bg-gradient-to-r from-[#F0D5A5] to-[#D6B477] text-[#080808] flex items-center justify-center shadow-gold-glow hover:scale-105 transition-transform"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </section>
  );
};
