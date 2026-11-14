"use client";

import React from "react";
import {
  Sparkles,
  Globe2,
  Award,
  Zap,
  Armchair,
  ShoppingBag,
} from "lucide-react";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export function HighlightsSection() {
  const highlights = [
    {
      icon: Sparkles,
      title: "Fresh Farm Ingredients",
      description: "Direct farm-sourced country poultry, tender grass-fed meats, and pure hand-ground spices.",
      badge: "Purity Guaranteed",
    },
    {
      icon: Globe2,
      title: "Multi-Cuisine Mastery",
      description: "From earthen Arabian Mandi to spicy Malabar curries and wok-tossed Asian specialties under one roof.",
      badge: "13 Categories",
    },
    {
      icon: Award,
      title: "Master Culinary Craft",
      description: "Trained heritage chefs upholding time-honored slow-cooking methods in clay cauldrons.",
      badge: "Artisanal",
    },
    {
      icon: Zap,
      title: "Rapid Express Ordering",
      description: "Real-time kitchen tracking and prompt delivery straight from flame to your doorstep piping hot.",
      badge: "30 Min Target",
    },
    {
      icon: Armchair,
      title: "Palatial Ambience",
      description: "Opulent seating, soothing acoustics, and family-friendly private majlis dining pavilions.",
      badge: "Luxury Dine-In",
    },
    {
      icon: ShoppingBag,
      title: "Hygienic Takeaway",
      description: "Tamper-proof, thermal insulated packaging designed to maintain fresh texture and aroma.",
      badge: "Sealed Fresh",
    },
  ];

  return (
    <section className="py-20 bg-[#17110E]/75 backdrop-blur-[2px] relative border-t border-[#D99A43]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
            The Zaffran Standard
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
            Crafted for the Discerning Palate
          </h2>
          <p className="mt-3 text-sm text-[#D8C4A8]">
            We bridge centuries-old culinary secrets with contemporary culinary precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="glass-card-luxury group relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl glass-box-inset flex items-center justify-center text-[#D99A43] group-hover:scale-110 transition-transform group-hover:text-[#FFF4E5]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full glass-pill text-[#D8C4A8]">
                      {h.badge}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors mb-2">
                    {h.title}
                  </h3>
                  <p className="text-xs text-[#D8C4A8]/80 leading-relaxed">
                    {h.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-[#D99A43] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into next section when scrolling down */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#1C1815"
        className="mt-16 h-28"
      />
    </section>
  );
}
