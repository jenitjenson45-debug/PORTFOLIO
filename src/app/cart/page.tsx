"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  Check,
  AlertCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    discount,
    couponCode,
    couponError,
    applyCoupon,
    removeCoupon,
    grandTotal,
    freeDeliveryRemaining,
  } = useCart();

  const { toast } = useToast();
  const [couponInput, setCouponInput] = useState("");
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplying(true);
    const success = await applyCoupon(couponInput.trim());
    setApplying(false);
    if (success) {
      toast(`Coupon "${couponInput.toUpperCase()}" applied successfully!`, "success");
      setCouponInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#D99A43]/15">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-1">
                Your Culinary Selection
              </span>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-black text-[#FFF4E5]">
                Dining Cart ({itemCount} {itemCount === 1 ? "dish" : "dishes"})
              </h1>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  toast("Cart cleared", "info");
                }}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 self-start sm:self-auto py-2 px-3 rounded-lg bg-red-950/30 border border-red-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Dishes</span>
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="py-24 text-center max-w-md mx-auto space-y-5">
              <div className="w-20 h-20 rounded-2xl bg-[#24201D] border border-[#D99A43]/30 flex items-center justify-center mx-auto text-[#D99A43]">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h2 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                Your dining cart is currently empty
              </h2>
              <p className="text-xs text-[#9D8F82] leading-relaxed">
                Explore our rich selection of authentic smoked Yemeni Mandi, charcoal Arabic
                skewers, and royal desserts.
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D99A43]/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore The Menu</span>
              </Link>
            </div>
          ) : (
            /* Active Cart Items & Billing */
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Column: Items List */}
              <div className="lg:col-span-8 space-y-4">
                {/* Free Delivery Bar */}
                {freeDeliveryRemaining > 0 ? (
                  <div className="glass-card-luxury p-3.5 rounded-xl flex items-center gap-3 text-xs text-[#D8C4A8]">
                    <Truck className="w-4 h-4 text-[#D99A43] shrink-0" />
                    <span>
                      Add items worth <strong className="text-[#D99A43]">₹{freeDeliveryRemaining}</strong> more
                      to unlock <strong>FREE express delivery</strong>!
                    </span>
                  </div>
                ) : (
                  <div className="glass-card-luxury p-3.5 rounded-xl border-[#6F8D57]/40 flex items-center gap-3 text-xs text-[#FFF4E5]">
                    <Check className="w-4 h-4 text-[#6F8D57] shrink-0" />
                    <span>
                      You have unlocked <strong>FREE Delivery</strong> for this feast!
                    </span>
                  </div>
                )}

                {/* Items */}
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="glass-card-luxury p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Food Thumbnail & Details */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#17110E]">
                        <Image
                          src={item.foodItem.image}
                          alt={item.foodItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.foodItem.isVeg ? "bg-[#6F8D57]" : "bg-[#C76B35]"
                            }`}
                          />
                          <h3 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] leading-tight">
                            {item.foodItem.name}
                          </h3>
                        </div>

                        {item.selectedSize && (
                          <span className="inline-block text-[11px] text-[#D99A43] font-semibold glass-pill px-2 py-0.5 rounded-md">
                            Size: {item.selectedSize.name}
                          </span>
                        )}

                        {item.selectedAddOns.length > 0 && (
                          <p className="text-[11px] text-[#D8C4A8]/75">
                            Add-ons: {item.selectedAddOns.map((a) => a.name).join(", ")}
                          </p>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[11px] text-[#D8C4A8] italic">
                            Note: &ldquo;{item.specialInstructions}&rdquo;
                          </p>
                        )}

                        <span className="block text-xs font-semibold text-[#D99A43]">
                          ₹{item.unitPrice} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls & Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                      <div className="flex items-center gap-2.5 glass-box-inset rounded-xl p-1 px-2.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 rounded text-[#9D8F82] hover:text-[#FFF4E5] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#FFF4E5]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 rounded text-[#9D8F82] hover:text-[#FFF4E5] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <span className="text-base font-bold text-[#FFF4E5]">
                          ₹{item.totalPrice}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          removeFromCart(item.cartItemId);
                          toast(`Removed item from cart`, "info");
                        }}
                        className="text-[#9D8F82] hover:text-red-400 p-1.5 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary & Promo Code */}
              <div className="lg:col-span-4 space-y-6">
                {/* Promo Code Input Card */}
                <div className="glass-panel-luxury p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D99A43]">
                    <Tag className="w-4 h-4" />
                    <span>Apply Coupon Code</span>
                  </div>

                  {couponCode ? (
                    <div className="glass-box-inset p-3 rounded-xl border border-[#6F8D57]/40 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-xs text-[#FFF4E5] block">
                          {couponCode} APPLIED
                        </span>
                        <span className="text-[11px] text-[#6F8D57] font-semibold">
                          You save ₹{discount}!
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-red-400 hover:text-red-300 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="e.g. ZAFFRAN100"
                        className="glass-box-inset flex-1 rounded-xl px-3 py-2 text-xs font-mono uppercase text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                      />
                      <button
                        type="submit"
                        disabled={applying || !couponInput.trim()}
                        className="btn-skeuomorphic-gold px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider disabled:opacity-50"
                      >
                        {applying ? "..." : "Apply"}
                      </button>
                    </form>
                  )}

                  {couponError && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {couponError}
                    </p>
                  )}
                </div>

                {/* Bill Breakdown Card */}
                <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5]">
                    Order Summary
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#D8C4A8] border-b border-white/10 pb-4">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-semibold text-[#FFF4E5]">₹{subtotal}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-[#6F8D57]">
                        <span>Coupon Savings ({couponCode})</span>
                        <span className="font-semibold">-₹{discount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Express Delivery Fee</span>
                      <span className="font-semibold text-[#FFF4E5]">
                        {deliveryFee === 0 ? (
                          <span className="text-[#6F8D57]">FREE</span>
                        ) : (
                          `₹${deliveryFee}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Taxes & GST (5%)</span>
                      <span className="font-semibold text-[#FFF4E5]">₹{tax}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-serif-luxury text-lg font-bold text-[#FFF4E5]">
                      Total Payable
                    </span>
                    <span className="text-2xl font-black text-[#D99A43]">₹{grandTotal}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="btn-skeuomorphic-gold w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-wider"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#9D8F82]">
                    <ShieldCheck className="w-4 h-4 text-[#D99A43]" />
                    <span>Safe & Verified Online Payments (UPI, Cards, COD)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Matching bottom gradient to flow smoothly into Footer */}
        <MatchingBottomGradient
          fromColor="transparent"
          toColor="#17110E"
          className="mt-16 h-28"
        />
      </main>

      <Footer />
    </div>
  );
}
