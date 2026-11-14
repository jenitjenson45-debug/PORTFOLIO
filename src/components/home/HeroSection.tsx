"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Utensils, Star, ShieldCheck, Flame, ArrowRight, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero-main-section" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#17110E]">
      {/* Background cinematic radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D99A43]/15 via-[#C76B35]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#C76B35]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Text Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
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

            {/* Skeuomorphic UI Buttons */}
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
                <div className="p-2 rounded-lg bg-[#24201D] border border-white/5 text-[#D99A43]">
                  <Star className="w-4 h-4 fill-[#D99A43]" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-[#FFF4E5]">4.9 / 5.0</span>
                  <span className="text-[11px] text-[#9D8F82]">2,400+ Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#24201D] border border-white/5 text-[#6F8D57]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-[#FFF4E5]">100% Halal</span>
                  <span className="text-[11px] text-[#9D8F82]">Farm Fresh Cuts</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#24201D] border border-white/5 text-[#C76B35]">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-[#FFF4E5]">Underground</span>
                  <span className="text-[11px] text-[#9D8F82]">Clay Tandoor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Static Gourmet Platter Showcase (Clean & Ultra-Crisp, No Video/3D) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Showcase Platter Image */}
            <div className="relative w-72 h-80 sm:w-88 sm:h-96 md:w-96 md:h-[420px] rounded-3xl overflow-hidden border-2 border-[#D99A43]/40 shadow-2xl bg-[#24201D] group">
              <Image
                src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1000&auto=format&fit=crop&q=85"
                alt="Royal Signature Yemeni Mandi Platter"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17110E] via-transparent to-black/20" />

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#17110E]/90 backdrop-blur-md border border-[#D99A43]/30">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-[#D99A43]">
                    <Award className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Royal Imperial Feast
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#D99A43]">₹680</span>
                </div>
                <h4 className="font-serif-luxury font-bold text-sm text-[#FFF4E5] leading-snug">
                  Signature Mutton Mandi Platter
                </h4>
                <p className="text-[11px] text-[#D8C4A8] mt-0.5 line-clamp-1">
                  Slow-cooked 6 hours in subterranean earthen charcoal pit
                </p>
              </div>
            </div>

            {/* Static Floating Dish Card Overlay Top Left */}
            <div className="absolute -top-3 -left-4 sm:-left-3 p-3 rounded-2xl bg-[#24201D]/95 backdrop-blur-md border border-[#D99A43]/40 shadow-2xl flex items-center gap-3 z-20 max-w-xs">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=200&auto=format&fit=crop&q=80"
                  alt="Al Faham Murgh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#D99A43] font-bold block">
                  Charcoal Grill
                </span>
                <span className="text-xs font-bold text-[#FFF4E5] block">Al Faham Murgh</span>
                <span className="text-[11px] font-semibold text-[#D99A43]">₹380</span>
              </div>
            </div>

            {/* Static Floating Dish Card Overlay Bottom Right */}
            <div className="absolute -bottom-4 -right-4 sm:-right-2 p-3 rounded-2xl bg-[#24201D]/95 backdrop-blur-md border border-[#D99A43]/40 shadow-2xl flex items-center gap-3 z-20 max-w-xs">
              <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&auto=format&fit=crop&q=80"
                  alt="Royal Falooda"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#6F8D57] font-bold block">
                  Artisan Falooda
                </span>
                <span className="text-xs font-bold text-[#FFF4E5] block">Saffron Delight</span>
                <span className="text-[11px] font-semibold text-[#D99A43]">₹220</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
