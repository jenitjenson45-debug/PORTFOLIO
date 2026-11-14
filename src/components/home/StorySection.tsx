"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, HeartHandshake, Compass } from "lucide-react";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export function StorySection() {
  return (
    <section className="py-24 bg-[#17110E]/75 backdrop-blur-[2px] relative overflow-hidden border-t border-[#D99A43]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Artistic Photography Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-[#D99A43]/30 shadow-2xl aspect-[4/3] bg-[#24201D]">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80"
                alt="Chef preparing signature barbecue grills"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#D99A43] font-bold block mb-1">
                  Heritage Charcoal Hearth
                </span>
                <p className="text-sm font-serif-luxury text-[#FFF4E5] italic">
                  &ldquo;A great feast is not merely cooked; it is awakened with patient embers and sacred spices.&rdquo;
                </p>
              </div>
            </div>

            {/* Overlapping smaller image */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 w-52 h-44 rounded-2xl overflow-hidden border-2 border-[#D99A43]/40 shadow-2xl z-20 bg-[#24201D]">
              <Image
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80"
                alt="Exotic whole spice pantry"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24201D] border border-[#D99A43]/30">
              <Compass className="w-3.5 h-3.5 text-[#D99A43]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D99A43]">
                Our Culinary Genesis
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5] leading-tight">
              An Ode to the Ancient Spice Routes & Desert Hearth
            </h2>

            <p className="text-sm text-[#D8C4A8] leading-relaxed">
              ZAFFRAN was conceived from a deep reverence for authentic hospitality. We set out to
              recreate the magnificent feasts that once brought together sultans, merchants, and
              travelers along the historic maritime trade routes from the Arabian Gulf to the verdant
              coasts of Malabar.
            </p>

            <p className="text-sm text-[#D8C4A8] leading-relaxed">
              Every cut of meat is chosen with uncompromising standards and smoked within subterranean
              brick tandoors. Our biryani is slowly coaxed under live coal dum, and our chilled
              faloodas and fresh mojitos are crafted to deliver sweet euphoria at the journey&apos;s end.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="glass-box-luxury p-4 rounded-xl">
                <Flame className="w-5 h-5 text-[#D99A43] mb-2" />
                <h4 className="font-serif-luxury text-base font-bold text-[#FFF4E5]">Woodfire Cooking</h4>
                <p className="text-[11px] text-[#D8C4A8]/80 mt-1">
                  100% natural mangrove & applewood charcoal embers.
                </p>
              </div>

              <div className="glass-box-luxury p-4 rounded-xl">
                <HeartHandshake className="w-5 h-5 text-[#6F8D57] mb-2" />
                <h4 className="font-serif-luxury text-base font-bold text-[#FFF4E5]">Pure Hospitality</h4>
                <p className="text-[11px] text-[#D8C4A8]/80 mt-1">
                  Royal banquet dignity with warm, welcoming attentiveness.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="glass-card-luxury inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[#FFF4E5] font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Full Restaurant Story</span>
                <ArrowRight className="w-4 h-4 text-[#D99A43]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into GallerySection (#24201D) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#24201D"
        className="mt-16 h-28"
      />
    </section>
  );
}
