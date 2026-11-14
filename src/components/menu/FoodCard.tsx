"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Plus, Flame, Clock, Star } from "lucide-react";
import { FoodItem } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface FoodCardProps {
  item: FoodItem;
  onOpenModal: (item: FoodItem) => void;
}

export function FoodCard({ item, onOpenModal }: FoodCardProps) {
  const { isFavorite, toggleFavorite } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const tiltTickingRef = React.useRef(false);

  const fav = isFavorite(item.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Skip 3D tilt on mobile / touch devices for maximum scroll performance
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    if (tiltTickingRef.current) return;
    tiltTickingRef.current = true;
    const currentTarget = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;

    requestAnimationFrame(() => {
      if (currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        const x = (((clientX - rect.left) / rect.width - 0.5) * 7).toFixed(1);
        const y = (((clientY - rect.top) / rect.height - 0.5) * -7).toFixed(1);
        currentTarget.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;
      }
      tiltTickingRef.current = false;
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.isAvailable) return;
    // If dish has sizes or addOns, open customization modal for best user experience
    if ((item.sizes && item.sizes.length > 0) || (item.addOns && item.addOns.length > 0)) {
      onOpenModal(item);
    } else {
      addToCart(item);
      toast(`Added 1x "${item.name}" to cart!`, "success");
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(item)}
      className={`glass-card-luxury group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
        !item.isAvailable ? "opacity-60 grayscale" : ""
      }`}
    >
      {/* Top Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#17110E]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-108"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24201D] via-transparent to-black/30" />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(item.id);
            toast(
              fav ? `Removed from favorites` : `Saved "${item.name}" to your favorites!`,
              "info"
            );
          }}
          className="absolute top-3 right-3 p-2 rounded-full glass-pill text-white hover:text-red-400 hover:scale-110 transition-all z-10"
          aria-label="Add to favorites"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              fav ? "fill-red-500 text-red-500 scale-110" : ""
            }`}
          />
        </button>

        {/* Veg/Non-Veg & Spicy Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold backdrop-blur-md shadow-sm ${
              item.isVeg
                ? "bg-[#6F8D57]/90 text-white border border-[#6F8D57]"
                : "bg-[#C76B35]/90 text-white border border-[#C76B35]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {item.isVeg ? "Veg" : "Non-Veg"}
          </span>

          {item.spicyLevel > 0 && (
            <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[11px] bg-red-950/85 backdrop-blur-md text-red-300 border border-red-500/40">
              <Flame className="w-3 h-3 text-red-400" />
              {item.spicyLevel === 3 ? "Extra Hot" : item.spicyLevel === 2 ? "Spicy" : "Mild"}
            </span>
          )}
        </div>

        {/* Prep Time & Rating Badges at bottom of image */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs text-[#D8C4A8]">
          <div className="flex items-center gap-1 glass-pill px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-[#D99A43] text-[#D99A43]" />
            <span className="font-bold text-[#FFF4E5]">{item.rating.toFixed(1)}</span>
            <span className="text-[10px] text-[#D8C4A8]/80">({item.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1 glass-pill px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-[#D99A43]" />
            <span>{item.prepTime}</span>
          </div>
        </div>

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-900/90 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-red-500/50 shadow-xl">
              Sold Out Today
            </span>
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors line-clamp-1">
              {item.name}
            </h4>
          </div>
          <p className="mt-1.5 text-xs text-[#D8C4A8]/80 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#D99A43] drop-shadow-sm">₹{item.price}</span>
            {item.sizes && item.sizes.length > 0 && (
              <span className="block text-[10px] text-[#D8C4A8]/70">Customizable</span>
            )}
          </div>

          <button
            type="button"
            disabled={!item.isAvailable}
            onClick={handleQuickAdd}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md shadow-[#D99A43]/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{item.sizes && item.sizes.length > 0 ? "Options" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
