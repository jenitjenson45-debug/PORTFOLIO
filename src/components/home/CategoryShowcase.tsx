"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FoodCategory } from "@/lib/types";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

interface CategoryShowcaseProps {
  categories: FoodCategory[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <section className="py-20 bg-[#24201D]/75 backdrop-blur-[2px] relative border-y border-[#D99A43]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
            Multi-Cuisine Journey
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
            Explore 13 Specialized Pantries
          </h2>
          <p className="mt-3 text-sm text-[#D8C4A8]">
            Select a realm below to delve into traditional slow roasts, Arabian pits, wok fires,
            or artisan dessert lounges.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="glass-card-luxury group relative rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-500 hover:scale-[1.02] flex flex-col justify-end p-4 sm:p-5"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17110E] via-[#17110E]/60 to-transparent group-hover:via-[#17110E]/40 transition-colors" />

              {/* Badge if available */}
              {cat.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D99A43] text-[#17110E] shadow-md">
                    {cat.badge}
                  </span>
                </div>
              )}

              {/* Arrow Icon */}
              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full glass-pill flex items-center justify-center text-[#FFF4E5] group-hover:bg-[#D99A43] group-hover:text-[#17110E] transition-all transform group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Frosted Glass Text Info Capsule */}
              <div className="relative z-10 glass-panel-luxury p-3 rounded-xl">
                <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="mt-1 text-[11px] text-[#D8C4A8]/90 line-clamp-2 leading-relaxed font-light hidden sm:block">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into SpecialOffersSection (#17110E) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#17110E"
        className="mt-16 h-28"
      />
    </section>
  );
}
