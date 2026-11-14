"use client";

import React from "react";
import Link from "next/link";
import { Tag, Sparkles, Copy, Check, Clock, Percent } from "lucide-react";
import { Coupon } from "@/lib/types";
import { useToast } from "@/context/ToastContext";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

interface SpecialOffersSectionProps {
  coupons: Coupon[];
}

export function SpecialOffersSection({ coupons }: SpecialOffersSectionProps) {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const activeCoupons = coupons.filter((c) => c.isActive);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast(`Promo code "${code}" copied to clipboard!`, "success");
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const comboPromos = [
    {
      title: "Royal Mandi Feast for 4",
      tag: "Family Platter",
      price: "₹1,499",
      originalPrice: "₹1,850",
      description: "Full Chicken Mandi + Mutton Shank + 4 Dakkoos + 4 Garlic Toum + 4 Special Sulaimani Teas",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Malabar Dum Biryani Box",
      tag: "Executive Lunch",
      price: "₹599",
      originalPrice: "₹720",
      description: "2x Thalassery Chicken Biryanis + Pazham Pori with Beef Roast dip + 2 Fresh Lime Coolers",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80",
    },
    {
      title: "Artisan Dessert Lounge Duo",
      tag: "Sweet Indulgence",
      price: "₹450",
      originalPrice: "₹520",
      description: "1x Royal Zaffran Special Falooda + 1x Belgian Dark Chocolate Monster Shake",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="offers" className="py-20 bg-[#17110E]/75 backdrop-blur-[2px] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
            Pavilion Privileges
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
            Special Offers & Combos
          </h2>
          <p className="mt-3 text-sm text-[#D8C4A8]">
            Exclusive dining combinations and coupon codes directly managed by our concierge.
          </p>
        </div>

        {/* Coupon Code Cards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {activeCoupons.map((coupon) => (
            <div
              key={coupon.id}
              className="glass-card-luxury relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden group transition-all"
            >
              {/* Decorative top ribbon */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                <div className="absolute transform rotate-45 bg-[#D99A43] text-[#17110E] text-[10px] font-extrabold uppercase py-1 right-[-35px] top-[18px] w-[120px] text-center shadow-md">
                  {coupon.discountPercent}% OFF
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-[#D99A43] mb-3">
                  <Tag className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Active Promo</span>
                </div>

                <p className="text-sm font-medium text-[#FFF4E5] leading-relaxed mb-4">
                  {coupon.description}
                </p>

                <div className="text-[11px] text-[#D8C4A8]/80 space-y-1 mb-5">
                  <p>• Minimum order: ₹{coupon.minOrder}</p>
                  {coupon.maxDiscount && <p>• Max discount: ₹{coupon.maxDiscount}</p>}
                </div>
              </div>

              {/* Code Box & Copy Button */}
              <div className="glass-box-inset flex items-center justify-between p-3 rounded-xl border border-dashed border-[#D99A43]/50">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#D99A43]" />
                  <span className="font-mono text-base font-black text-[#FFF4E5] tracking-widest">
                    {coupon.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(coupon.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D99A43]/20 text-[#D99A43] hover:bg-[#D99A43] hover:text-[#17110E] text-xs font-bold transition-all"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Combos Grid */}
        <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5] mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D99A43]" />
          <span>Curated Dining Combos</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comboPromos.map((combo, idx) => (
            <div
              key={idx}
              className="glass-card-luxury rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#24201D] via-transparent to-black/30" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D99A43] text-[#17110E] shadow">
                  {combo.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors">
                    {combo.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#D8C4A8]/80 leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#D99A43]">{combo.price}</span>
                    <span className="text-xs text-[#9D8F82] line-through">{combo.originalPrice}</span>
                  </div>

                  <Link
                    href="/menu"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
                  >
                    Order Combo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into StorySection (#17110E) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#17110E"
        className="mt-16 h-28"
      />
    </section>
  );
}
