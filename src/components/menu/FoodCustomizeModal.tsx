"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check, Flame, Clock, Award } from "lucide-react";
import { FoodItem, FoodSize, FoodAddOn } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface FoodCustomizeModalProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FoodCustomizeModal({ item, isOpen, onClose }: FoodCustomizeModalProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<FoodSize | undefined>(undefined);
  const [selectedAddOns, setSelectedAddOns] = useState<FoodAddOn[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [instructions, setInstructions] = useState<string>("");

  useEffect(() => {
    if (item) {
      setSelectedSize(item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined);
      setSelectedAddOns([]);
      setQuantity(1);
      setInstructions("");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const currentUnitPrice =
    item.price +
    (selectedSize?.priceOffset || 0) +
    selectedAddOns.reduce((sum, a) => sum + a.price, 0);

  const totalCalculated = currentUnitPrice * quantity;

  const toggleAddOn = (addOn: FoodAddOn) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  const handleAddToCart = () => {
    addToCart(item, selectedSize, selectedAddOns, quantity, instructions);
    toast(`Added ${quantity}x "${item.name}" to your feast!`, "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-panel-luxury relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto text-[#FFF4E5] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Hero Food Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden bg-[#17110E]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 700px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#24201D] via-[#24201D]/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-pill text-[#FFF4E5] hover:bg-[#D99A43] hover:text-[#17110E] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on image */}
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                  item.isVeg
                    ? "bg-[#6F8D57]/30 text-[#8BC34A] border border-[#6F8D57]/50"
                    : "bg-[#C76B35]/30 text-[#F28C38] border border-[#C76B35]/50"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-[#8BC34A]" : "bg-[#F28C38]"}`} />
                {item.isVeg ? "Pure Veg" : "Non-Veg"}
              </span>

              {item.spicyLevel > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-950/60 border border-red-500/30 text-red-300">
                  <Flame className="w-3 h-3 text-red-400" />
                  {item.spicyLevel === 1 ? "Mild" : item.spicyLevel === 2 ? "Spicy" : "Extra Hot"}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-[#D8C4A8] glass-pill px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-[#D99A43]" />
              <span>{item.prepTime}</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Title & Description */}
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#FFF4E5]">
                {item.name}
              </h3>
              <div className="text-right">
                <span className="text-2xl font-bold text-[#D99A43]">₹{item.price}</span>
                <span className="block text-[11px] text-[#9D8F82]">Base price</span>
              </div>
            </div>
            <p className="mt-2 text-sm text-[#D8C4A8] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Portion / Size Selection */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#D99A43]/15">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-wide uppercase text-[#D99A43] flex items-center gap-2">
                  <Award className="w-4 h-4" /> Choose Portion Size
                </label>
                <span className="text-xs text-[#9D8F82]">Required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.sizes.map((size) => {
                  const isSelected = selectedSize?.id === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`glass-card-luxury flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-[#D99A43] text-[#FFF4E5] shadow-lg shadow-[#D99A43]/20 ring-1 ring-[#D99A43]"
                          : "text-[#D8C4A8]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-[#D99A43] bg-[#D99A43]" : "border-gray-500"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-[#17110E]" />}
                        </div>
                        <span className="text-sm font-medium">{size.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#D99A43]">
                        {size.priceOffset > 0 ? `+₹${size.priceOffset}` : "Standard"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Configuration */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-[#D99A43]/15">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-wide uppercase text-[#D99A43]">
                  Gourmet Add-ons & Accompaniments
                </label>
                <span className="text-xs text-[#9D8F82]">Optional</span>
              </div>
              <div className="space-y-2">
                {item.addOns.map((addOn) => {
                  const isAdded = selectedAddOns.some((a) => a.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      type="button"
                      onClick={() => toggleAddOn(addOn)}
                      className={`glass-card-luxury w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        isAdded
                          ? "border-[#D99A43] text-[#FFF4E5] ring-1 ring-[#D99A43]/60"
                          : "text-[#D8C4A8]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isAdded ? "bg-[#D99A43] border-[#D99A43]" : "border-gray-500"
                          }`}
                        >
                          {isAdded && <Check className="w-3 h-3 text-[#17110E]" />}
                        </div>
                        <span className="text-sm">{addOn.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#D99A43]">+₹{addOn.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Cooking Instructions */}
          <div className="space-y-2 pt-2 border-t border-[#D99A43]/15">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#9D8F82]">
              Special Chef Instructions (Optional)
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Less spicy, extra lemon slices, pack gravy separately..."
              rows={2}
              className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] placeholder-[#6C635B] focus:outline-none focus:border-[#D99A43] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add to Cart button */}
        <div className="p-4 sm:p-5 glass-panel-luxury border-t border-[#D99A43]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 glass-box-inset rounded-xl p-1.5 px-3">
            <span className="text-xs uppercase text-[#9D8F82] font-semibold mr-1">Qty</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg bg-[#2E2824] hover:bg-[#D99A43] hover:text-[#17110E] transition-colors disabled:opacity-30 disabled:hover:bg-[#2E2824] disabled:hover:text-inherit"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-bold text-sm text-[#FFF4E5]">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 rounded-lg bg-[#2E2824] hover:bg-[#D99A43] hover:text-[#17110E] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart Submit Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-skeuomorphic-gold w-full sm:w-auto flex-1 flex items-center justify-between sm:justify-center gap-3 px-6 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider"
          >
            <span>Add to Cart</span>
            <span className="bg-black/20 px-2.5 py-0.5 rounded-lg text-black font-extrabold text-sm">
              ₹{totalCalculated}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
