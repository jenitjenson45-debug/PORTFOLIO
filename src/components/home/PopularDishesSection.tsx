"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FoodItem } from "@/lib/types";
import { FoodCard } from "@/components/menu/FoodCard";
import { FoodCustomizeModal } from "@/components/menu/FoodCustomizeModal";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

interface PopularDishesSectionProps {
  items: FoodItem[];
}

export function PopularDishesSection({ items }: PopularDishesSectionProps) {
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredDishes = items.filter((i) => i.isFeatured || i.isPopular).slice(0, 8);

  const handleOpenModal = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-[#17110E]/75 backdrop-blur-[2px] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
              Culinary Signatures
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
              Most Celebrated Creations
            </h2>
            <p className="mt-2 text-sm text-[#D8C4A8]">
              Handcrafted dishes that have earned legendary devotion across our dining halls.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#D99A43] hover:text-[#FFF4E5] transition-colors group self-start md:self-auto"
          >
            <span>Explore All 40+ Menu Specialties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3D Tilt Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((dish) => (
            <FoodCard key={dish.id} item={dish} onOpenModal={handleOpenModal} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="glass-card-luxury inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[#FFF4E5] font-semibold text-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D99A43]" />
            <span>Discover Full Multi-Cuisine Menu</span>
          </Link>
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into CategoryShowcase (#24201D) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#24201D"
        className="mt-16 h-28"
      />

      {/* Customization Modal */}
      <FoodCustomizeModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
