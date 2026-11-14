"use client";

import React from "react";
import { UtensilsCrossed } from "lucide-react";

export function FoodCardSkeleton() {
  return (
    <div className="relative flex flex-col rounded-2xl bg-[#24201D] border border-[#D99A43]/15 overflow-hidden shadow-xl animate-pulse">
      {/* Food Image Placeholder with Shimmer & Watermark */}
      <div className="relative h-48 sm:h-52 w-full placeholder-shimmer bg-[#1D1916] flex items-center justify-center">
        {/* Ambient Cloche Icon Watermark */}
        <div className="w-12 h-12 rounded-full bg-[#D99A43]/5 border border-[#D99A43]/15 flex items-center justify-center text-[#D99A43]/30">
          <UtensilsCrossed className="w-6 h-6 animate-pulse" />
        </div>

        {/* Top Veg Tag Placeholder */}
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-white/10" />

        {/* Top Heart Placeholder */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10" />

        {/* Bottom Badges Placeholders */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <div className="w-16 h-4 rounded-full bg-white/10" />
          <div className="w-14 h-4 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Card Content Body Placeholders */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Dish Title */}
          <div className="h-5 w-3/4 rounded-lg bg-gradient-to-r from-white/15 via-[#D99A43]/20 to-white/10 placeholder-shimmer" />

          {/* Description 2 Lines */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-4/5 rounded bg-white/5" />
          </div>
        </div>

        {/* Price & Action Button Placeholders */}
        <div className="pt-3 border-t border-[#D99A43]/10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-5 w-14 rounded-md bg-[#D99A43]/25 placeholder-shimmer" />
            <div className="h-2.5 w-10 rounded bg-white/5" />
          </div>

          <div className="h-8 w-20 rounded-xl bg-gradient-to-r from-[#D99A43]/40 to-[#C76B35]/40 placeholder-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function FoodCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}
