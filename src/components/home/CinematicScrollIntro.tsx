"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  Sparkles,
  Utensils,
  Star,
  ShieldCheck,
  Flame,
  ArrowRight,
  Award,
  MapPin,
} from "lucide-react";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export function CinematicScrollIntro() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    // 60/120 FPS Lerp for liquid-smooth 3D zoom transition
    const smoothLoop = () => {
      const diff = targetScrollRef.current - currentScrollRef.current;
      if (Math.abs(diff) > 0.08) {
        currentScrollRef.current += diff * 0.09;
        setScrollY(currentScrollRef.current);
      } else if (currentScrollRef.current !== targetScrollRef.current) {
        currentScrollRef.current = targetScrollRef.current;
        setScrollY(targetScrollRef.current);
      }
      animFrameRef.current = requestAnimationFrame(smoothLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animFrameRef.current = requestAnimationFrame(smoothLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Compute 3D Zoom progression (0px to 350px)
  const maxDistance = 350;
  const progress = Math.min(1, Math.max(0, scrollY / maxDistance));

  // 1. Foreground Title 3D Zoom (Fly through camera, letters parting)
  const titleTranslateZ = progress * 780;
  const titleScale = 1 + progress * 4.2;
  const titleLetterSpacing = `${0.22 + progress * 0.6}em`;
  const isZoomComplete = progress >= 0.96;

  // Intro page bottom gradient: fully visible at rest, smoothly fades away as intro opens
  const introGradientOpacity = Math.max(0, 1 - progress * 3);

  // 2. Background Hero Section 3D Expansion (emerging from depth into full position)
  const heroScale = 0.88 + progress * 0.12; // 0.88 to 1.0
  const heroTranslateZ = -70 + progress * 70; // -70px to 0px
  const heroTranslateY = (1 - progress) * 35; // 35px to 0px

  return (
    <div
      className="relative w-full h-[180vh] bg-transparent text-[#FFF4E5]"
      style={{ perspective: "1000px" }}
    >
      {/* Sticky Viewport Canvas hosting both layers in a unified 3D space with ZERO separation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Ambient Warm Golden Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D99A43]/15 via-[#C76B35]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#C76B35]/10 blur-[120px] pointer-events-none" />

        {/* LAYER 1: HERO SECTION (Emerging seamlessly from 3D depth, ZERO separation) */}
        <div
          id="hero-main-section"
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 lg:pt-12"
          style={{
            perspective: "1000px",
            transform: `perspective(1000px) translate3d(0, ${heroTranslateY}px, ${heroTranslateZ}px) scale(${heroScale})`,
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Text Content & CTAs */}
            <div className="lg:col-span-6 space-y-5 lg:space-y-6 text-center lg:text-left max-w-xl">
              {/* Pill Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24201D] border border-[#D99A43]/40 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#D99A43] animate-ping" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#D99A43]">
                  The Pinnacle of Multi-Cuisine Dining
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-luxury text-4xl sm:text-6xl xl:text-7xl font-black text-[#FFF4E5] leading-[1.08] tracking-tight">
                Where Saffron Meets{" "}
                <span className="text-gold-gradient block sm:inline">Ember & Smoke.</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#D8C4A8] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Immerse yourself in underground slow-smoked Yemeni Mandi, charcoal Arabic
                skewers, legendary Malabar dum biryanis, fiery Asian woks, and handcrafted artisan
                faloodas and mocktails.
              </p>

              {/* Skeuomorphic UI Buttons with physical bevels, depth and mechanical click */}
              <div className="pt-3 pb-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <Link
                  href="/menu"
                  className="btn-skeuomorphic-gold w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-wider group"
                >
                  <Sparkles className="w-4 h-4 text-[#17110E] drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]" />
                  <span>Order Online Now</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-[#17110E] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/menu"
                  className="btn-skeuomorphic-dark w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide group"
                >
                  <Utensils className="w-4 h-4 text-[#D99A43] group-hover:scale-110 transition-transform" />
                  <span>Explore Full Menu</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-[#D99A43]/15">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg glass-box-inset text-[#D99A43]">
                    <Star className="w-4 h-4 fill-[#D99A43]" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-[#FFF4E5]">4.9 / 5.0</span>
                    <span className="text-[11px] text-[#D8C4A8]/70">2,400+ Reviews</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg glass-box-inset text-[#6F8D57]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-[#FFF4E5]">100% Halal</span>
                    <span className="text-[11px] text-[#D8C4A8]/70">Farm Fresh Cuts</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg glass-box-inset text-[#C76B35]">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-[#FFF4E5]">Underground</span>
                    <span className="text-[11px] text-[#D8C4A8]/70">Clay Tandoor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Creative Showcase of the Brand Logo & Palatial Shop Pavilion */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end w-full">
              <div className="relative">
                {/* Grand Pavilion & Brand Emblem Showcase Card */}
                <div className="relative w-72 h-[380px] sm:w-84 sm:h-[420px] md:w-[400px] md:h-[450px] rounded-3xl overflow-hidden border-2 border-[#D99A43]/50 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(217,154,67,0.25)] bg-[#1A1411] group">
                  {/* Shop Pavilion Atmospheric Photo */}
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85"
                    alt="ZAFFRAN The Grand Pavilion Mundur Thrissur"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  {/* Layered cinematic darkening & radial ambient golden glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#150F0C]/75 to-black/40" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(217,154,67,0.2)_0%,_transparent_70%)]" />

                  {/* 3D Brand Logo Centerpiece hovering in the Pavilion */}
                  <div className="relative h-full flex flex-col items-center justify-start pt-12 sm:pt-14 px-4 text-center z-10">
                    {/* Glowing golden halo */}
                    <div className="absolute top-28 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-[#D99A43]/35 via-[#F2C94C]/25 to-[#C76B35]/30 blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                    {/* Sculpted 3D Brand Crest Medallion */}
                    <div className="relative mb-3 group-hover:-translate-y-1 transition-transform duration-500">
                      <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-[#D99A43] via-[#F2C94C] to-[#C76B35] opacity-70 blur-md group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#D99A43] via-[#F2C94C] to-[#C76B35] p-[2px] shadow-[0_12px_28px_rgba(217,154,67,0.5)]">
                        <div className="w-full h-full bg-[#150F0C]/95 rounded-[22px] flex flex-col items-center justify-center border border-[#D99A43]/40 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
                          <UtensilsCrossed className="w-9 h-9 sm:w-11 sm:h-11 text-[#D99A43] drop-shadow-[0_4px_12px_rgba(217,154,67,0.7)]" />
                          <div className="flex items-center gap-1 mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#D8C4A8]/90">
                            <Sparkles className="w-2.5 h-2.5 text-[#F2C94C]" />
                            <span>Est. 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brand Typography */}
                    <h3 className="font-serif-luxury font-black text-2xl sm:text-3xl text-[#FFF4E5] tracking-widest drop-shadow-[0_4px_16px_rgba(217,154,67,0.6)]">
                      ZAFFRAN
                    </h3>

                    {/* Royal Filigree Divider */}
                    <div className="my-2 flex items-center justify-center gap-2 w-32 sm:w-36 opacity-90">
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D99A43]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D99A43] shadow-[0_0_6px_#D99A43]" />
                      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D99A43]" />
                    </div>

                    <p className="font-serif-luxury text-xs sm:text-sm font-light text-gold-gradient tracking-[0.35em] uppercase">
                      The Grand Pavilion
                    </p>
                    <p className="text-[10px] text-[#D8C4A8]/80 mt-0.5 tracking-widest uppercase font-semibold">
                      Mundur • Thrissur
                    </p>
                  </div>

                  {/* Shop Details Luxury Bottom Banner */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-2xl glass-panel-luxury border border-[#D99A43]/35 z-20">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-[#D99A43]">
                        <Award className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Royal Multi-Cuisine Pavilion
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[#D99A43] text-xs font-black">
                        <Star className="w-3.5 h-3.5 fill-[#D99A43]" />
                        <span>4.9</span>
                      </div>
                    </div>
                    <h4 className="font-serif-luxury font-bold text-sm text-[#FFF4E5] leading-snug">
                      Iconic Palatial Restaurant &amp; Lounge
                    </h4>
                    <p className="text-[11px] text-[#D8C4A8] mt-0.5 line-clamp-1">
                      Underground Pit Mandi • Royal Majlis Dining • Charcoal Hearth
                    </p>
                  </div>
                </div>

                {/* Floating Shop Status Badge (Top-Left) */}
                <div className="glass-card-luxury absolute -top-4 -left-4 sm:-left-6 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3 z-20 border border-[#D99A43]/30 whitespace-nowrap">
                  <div className="w-9 h-9 rounded-xl bg-[#24201D] border border-[#D99A43]/40 flex items-center justify-center text-[#D99A43] shadow-inner shrink-0">
                    <MapPin className="w-4 h-4 text-[#D99A43]" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                        Open Daily • 11 AM - 11:30 PM
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#FFF4E5] block">Mundur, Thrissur</span>
                    <span className="text-[10px] text-[#D8C4A8]/80 font-medium">Kerala — 680541</span>
                  </div>
                </div>

                {/* Floating Shop Experience Badge (Bottom-Right) */}
                <div className="glass-card-luxury absolute -bottom-4 -right-4 sm:-right-6 p-2.5 sm:p-3 rounded-2xl shadow-2xl flex items-center gap-2.5 sm:gap-3 z-20 border border-[#D99A43]/30 whitespace-nowrap">
                  <div className="w-9 h-9 rounded-xl bg-[#24201D] border border-[#D99A43]/40 flex items-center justify-center text-[#C76B35] shadow-inner shrink-0">
                    <Flame className="w-4 h-4 text-[#C76B35]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider text-[#D99A43] font-bold block">
                      Authentic Hearth
                    </span>
                    <span className="text-xs font-bold text-[#FFF4E5] block">Pit Mandi &amp; Majlis</span>
                    <span className="text-[10px] text-[#6F8D57] font-semibold">Subterranean Smoke Chamber</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 2: FOREGROUND 3D ZOOM PORTAL (Logo & ZAFFRAN parting open in 3D) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none transition-opacity duration-300 ${
            isZoomComplete ? "invisible" : "visible"
          }`}
          style={{
            perspective: "1000px",
          }}
        >
          {/* Creative Dark Atmosphere Veil that naturally thins as you zoom through */}
          <div
            className="absolute inset-0 bg-[#17110E] transition-opacity duration-75"
            style={{
              opacity: Math.max(0, 1 - progress * 1.25),
            }}
          />

          <div
            className={`relative z-10 flex flex-col items-center text-center px-4 transition-all duration-1000 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transform: `perspective(1000px) translate3d(0, 0, ${titleTranslateZ}px) scale(${titleScale})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {/* Royal Crest Logo */}
            <div className="relative mb-6 sm:mb-8 group">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#D99A43] via-[#F2C94C] to-[#C76B35] opacity-60 blur-xl group-hover:opacity-95 transition-opacity" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-[#D99A43] via-[#F2C94C] to-[#C76B35] p-[2.5px] shadow-2xl shadow-[#D99A43]/40">
                <div className="w-full h-full bg-[#17110E] rounded-[22px] flex items-center justify-center border border-[#D99A43]/30">
                  <UtensilsCrossed className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-[#D99A43] drop-shadow-[0_4px_12px_rgba(217,154,67,0.5)]" />
                </div>
              </div>
            </div>

            {/* Restaurant Main Name */}
            <h1
              className="font-serif-luxury font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#FFF4E5] leading-none drop-shadow-[0_15px_40px_rgba(217,154,67,0.35)] select-none transition-all duration-75"
              style={{
                letterSpacing: titleLetterSpacing,
                marginRight: `-${titleLetterSpacing}`,
              }}
            >
              ZAFFRAN
            </h1>

            {/* Minimal Royal Golden Filament Divider */}
            <div className="my-5 sm:my-7 flex items-center justify-center gap-3 w-40 sm:w-56 opacity-80">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D99A43]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D99A43] shadow-[0_0_8px_#D99A43]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D99A43]" />
            </div>

            {/* Subtitle Name */}
            <h2 className="font-serif-luxury text-xs sm:text-sm md:text-lg font-light text-[#D8C4A8] tracking-[0.45em] sm:tracking-[0.6em] uppercase text-gold-gradient select-none">
              The Grand Pavilion
            </h2>
          </div>

          {/* Intro Page Matching Bottom Gradient: Fully visible on load, smoothly fades away as the intro page opens */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-150"
            style={{
              opacity: introGradientOpacity,
            }}
          >
            <MatchingBottomGradient
              fromColor="transparent"
              toColor="#17110E"
              className="h-24 sm:h-28"
            />
          </div>
        </div>
      </div>

      {/* Hero section exit gradient: Fades in only when user scrolls PAST the hero section into Highlights */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isZoomComplete ? Math.min(1, Math.max(0, (scrollY - 380) / 160)) : 0,
        }}
      >
        <MatchingBottomGradient
          fromColor="transparent"
          toColor="#17110E"
          className="h-28"
        />
      </div>
    </div>
  );
}
