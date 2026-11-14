"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Order, OrderStatus } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import {
  CheckCircle2,
  Clock,
  ChefHat,
  Truck,
  PackageCheck,
  ShoppingBag,
  MapPin,
  CreditCard,
  PhoneCall,
  Printer,
  RotateCcw,
  RefreshCw,
  AlertCircle,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const fetchOrder = async (showSpinner = false) => {
    if (showSpinner) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found");
      }
    } catch (e) {
      setError("Failed to fetch order status");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Poll every 8 seconds for live kitchen / admin status progression
    const interval = setInterval(() => {
      fetchOrder(false);
    }, 8000);
    return () => clearInterval(interval);
  }, [params.id]);

  const stages: { key: OrderStatus; label: string; icon: any; desc: string }[] = [
    {
      key: "pending",
      label: "Order Placed",
      icon: CheckCircle2,
      desc: "Received by restaurant system",
    },
    {
      key: "confirmed",
      label: "Confirmed",
      icon: Clock,
      desc: "Concierge accepted your order",
    },
    {
      key: "preparing",
      label: "In Kitchen",
      icon: ChefHat,
      desc: "Master chefs are preparing your dishes",
    },
    {
      key: "out_for_delivery",
      label: order?.orderType === "delivery" ? "Out for Delivery" : "Ready for Pickup",
      icon: Truck,
      desc: order?.orderType === "delivery" ? "On the way with insulated box" : "Packaged at pickup counter",
    },
    {
      key: "delivered",
      label: "Delivered",
      icon: PackageCheck,
      desc: "Enjoy your feast!",
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === "pending") return 0;
    if (status === "confirmed") return 1;
    if (status === "preparing") return 2;
    if (status === "out_for_delivery") return 3;
    if (status === "delivered") return 4;
    return -1; // cancelled
  };

  const currentStageIndex = order ? getStageIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PULSING PLACEHOLDER SKELETON STATE */}
          {loading ? (
            <div className="space-y-8 animate-pulse">
              {/* Header Skeleton */}
              <div className="p-6 rounded-2xl bg-[#24201D] border border-[#D99A43]/20 space-y-3">
                <div className="h-4 w-36 rounded bg-white/10 placeholder-shimmer" />
                <div className="h-8 w-64 rounded-lg bg-gradient-to-r from-white/15 via-[#D99A43]/20 to-white/10 placeholder-shimmer" />
                <div className="h-3.5 w-48 rounded bg-white/5" />
              </div>

              {/* Timeline Skeleton */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#24201D] border border-white/5 space-y-6">
                <div className="h-5 w-44 rounded bg-white/10 placeholder-shimmer" />
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-center p-3 rounded-xl bg-[#1D1916] border border-white/5 space-y-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 placeholder-shimmer" />
                      <div className="h-3.5 w-16 rounded bg-white/10" />
                      <div className="h-2.5 w-12 rounded bg-white/5" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[#24201D] border border-white/5 space-y-4">
                  <div className="h-5 w-36 rounded bg-white/10 placeholder-shimmer" />
                  <div className="space-y-3 pt-2">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 w-40 rounded bg-white/10" />
                        <div className="h-4 w-12 rounded bg-white/10" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#24201D] border border-white/5 space-y-4">
                  <div className="h-5 w-40 rounded bg-white/10 placeholder-shimmer" />
                  <div className="space-y-2 pt-2">
                    <div className="h-4 w-48 rounded bg-white/10" />
                    <div className="h-4 w-32 rounded bg-white/5" />
                  </div>
                </div>
              </div>
            </div>
          ) : error || !order ? (
            <div className="py-24 text-center max-w-md mx-auto space-y-4">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
              <h2 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                Order Not Found
              </h2>
              <p className="text-xs text-[#9D8F82]">
                We couldn&apos;t retrieve details for #{params.id}. Check the order ID or visit your
                account history.
              </p>
              <Link
                href="/account"
                className="inline-block px-6 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
              >
                View My Orders
              </Link>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Top Order Confirmation Banner */}
              <div className="p-6 rounded-2xl bg-[#24201D] border border-[#D99A43]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-widest text-[#D99A43] font-bold">
                      Order Reference:
                    </span>
                    <span className="font-mono font-bold text-sm text-[#FFF4E5]">
                      #{order.id}
                    </span>
                  </div>
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl font-black text-[#FFF4E5] mt-1">
                    {order.status === "delivered"
                      ? "Feast Successfully Completed"
                      : order.status === "cancelled"
                      ? "Order Cancelled"
                      : "Order in Progress"}
                  </h1>
                  <p className="text-xs text-[#9D8F82] mt-1">
                    Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Estimated time: {order.estimatedTime || "25-35 mins"}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => fetchOrder(true)}
                    className="p-2 rounded-xl bg-[#17110E] border border-white/10 text-[#D8C4A8] hover:text-[#D99A43] transition-colors"
                    title="Refresh live status"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#D99A43]" : ""}`} />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 rounded-xl bg-[#17110E] border border-white/10 text-[#D8C4A8] hover:text-[#D99A43] transition-colors"
                    title="Print Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 5-Step Order Progress Timeline with Concentric Radar Pulse Ring */}
              {order.status !== "cancelled" ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[#24201D] border border-[#D99A43]/20 space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#D99A43]" />
                      <span>Live Preparation & Dispatch Timeline</span>
                    </h3>
                    <span className="text-[11px] text-[#6F8D57] font-semibold flex items-center gap-1 bg-[#6F8D57]/10 px-2.5 py-0.5 rounded-full border border-[#6F8D57]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6F8D57] animate-ping" />
                      Live Kitchen Link
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
                    {stages.map((stage, idx) => {
                      const Icon = stage.icon;
                      const isCompleted = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div
                          key={stage.key}
                          className={`flex flex-col items-center text-center p-3 rounded-xl transition-all relative ${
                            isCurrent
                              ? "bg-[#D99A43]/15 border border-[#D99A43] shadow-lg shadow-[#D99A43]/10"
                              : isCompleted
                              ? "bg-[#17110E] border border-[#6F8D57]/40"
                              : "bg-[#17110E]/50 border border-white/5 opacity-40"
                          }`}
                        >
                          {/* Node Icon with Radar Ring when Current */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2.5 transition-colors ${
                              isCurrent
                                ? "bg-[#D99A43] text-[#17110E] radar-pulse-ring shadow-lg shadow-[#D99A43]/40"
                                : isCompleted
                                ? "bg-[#6F8D57] text-white"
                                : "bg-[#2E2824] text-[#9D8F82]"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <span
                            className={`text-xs font-bold leading-tight ${
                              isCurrent
                                ? "text-[#D99A43]"
                                : isCompleted
                                ? "text-[#FFF4E5]"
                                : "text-[#9D8F82]"
                            }`}
                          >
                            {stage.label}
                          </span>

                          <span className="text-[10px] text-[#9D8F82] mt-1 leading-tight">
                            {stage.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/40 text-red-300 text-sm">
                  This order was marked as cancelled by restaurant dispatch. Any online payment has
                  been queued for automatic reversal.
                </div>
              )}

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ordered Items Breakdown */}
                <div className="p-6 rounded-2xl bg-[#24201D] border border-white/10 space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#D99A43]" />
                    <span>Dishes in this Feast</span>
                  </h3>

                  <div className="space-y-3 divide-y divide-white/5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="pt-3 first:pt-0 flex items-start justify-between">
                        <div>
                          <span className="text-sm font-bold text-[#FFF4E5]">
                            {item.quantity}x {item.name}
                          </span>
                          {item.sizeName && (
                            <span className="block text-[11px] text-[#D99A43]">
                              {item.sizeName}
                            </span>
                          )}
                          {item.addOns && item.addOns.length > 0 && (
                            <span className="block text-[11px] text-[#9D8F82]">
                              + {item.addOns.map((a) => a.name).join(", ")}
                            </span>
                          )}
                          {item.specialInstructions && (
                            <span className="block text-[11px] text-[#D8C4A8] italic">
                              Note: {item.specialInstructions}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-[#FFF4E5]">₹{item.totalPrice}</span>
                      </div>
                    ))}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-[#D8C4A8]">
                    <div className="flex justify-between">
                      <span>Item Subtotal</span>
                      <span className="font-semibold text-white">₹{order.subtotal}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-[#6F8D57]">
                        <span>Coupon Savings ({order.couponCode})</span>
                        <span className="font-semibold">-₹{order.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-semibold text-white">
                        {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (5%)</span>
                      <span className="font-semibold text-white">₹{order.tax}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#D99A43] pt-2 border-t border-white/5">
                      <span>Total Paid/Payable</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information & Concierge */}
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-[#24201D] border border-white/10 space-y-4">
                    <h3 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#D99A43]" />
                      <span>Delivery & Guest Details</span>
                    </h3>

                    <div className="space-y-2.5 text-xs text-[#D8C4A8]">
                      <div>
                        <span className="text-[#9D8F82] block">Customer Name:</span>
                        <span className="font-bold text-white text-sm">{order.customerName}</span>
                      </div>

                      <div>
                        <span className="text-[#9D8F82] block">Contact Phone:</span>
                        <span className="font-bold text-white">{order.customerPhone}</span>
                      </div>

                      {order.orderType === "delivery" && order.deliveryAddress && (
                        <div>
                          <span className="text-[#9D8F82] block">Address:</span>
                          <span className="text-white leading-relaxed">
                            {order.deliveryAddress.street}
                            {order.deliveryAddress.landmark ? `, Near ${order.deliveryAddress.landmark}` : ""}
                            , {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                          </span>
                        </div>
                      )}

                      {order.orderType === "dine_in" && (
                        <div>
                          <span className="text-[#9D8F82] block">Table:</span>
                          <span className="text-white font-bold">{order.tableNumber}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-[#9D8F82] block">Payment Method:</span>
                        <span className="capitalize font-semibold text-white">
                          {order.paymentMethod === "razorpay"
                            ? "Razorpay Online (Captured)"
                            : order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Pay on Pickup"}
                        </span>
                        <span
                          className={`ml-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                            order.paymentStatus === "paid"
                              ? "bg-[#6F8D57]/20 text-[#6F8D57]"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Need Assistance Card */}
                  <div className="p-5 rounded-2xl bg-[#17110E] border border-[#D99A43]/20 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#FFF4E5] block">
                        Need Kitchen Assistance?
                      </span>
                      <span className="text-[11px] text-[#9D8F82]">
                        Speak with our Pavilion Dispatch Concierge
                      </span>
                    </div>

                    <a
                      href="tel:+919072104475"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#24201D] border border-[#D99A43]/40 text-[#D99A43] text-xs font-bold hover:bg-[#D99A43] hover:text-[#17110E] transition-all"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Concierge</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
