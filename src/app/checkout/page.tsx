"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import { OrderType, PaymentMethod } from "@/lib/types";
import {
  Truck,
  ShoppingBag,
  UtensilsCrossed,
  CreditCard,
  Banknote,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Lock,
  Sparkles,
  ChefHat,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, tax, discount, couponCode, grandTotal, clearCart } =
    useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("razorpay");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("Immediate Express (25-35 mins)");

  // Form Fields
  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [streetAddress, setStreetAddress] = useState(user?.savedAddresses[0]?.street || "");
  const [landmark, setLandmark] = useState(user?.savedAddresses[0]?.landmark || "");
  const [city, setCity] = useState("Kochi");
  const [pincode, setPincode] = useState("682011");
  const [tableNumber, setTableNumber] = useState("Table 5");
  const [instructions, setInstructions] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync user details if loaded late
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerPhone) setCustomerPhone(user.phone);
      if (!customerEmail) setCustomerEmail(user.email);
      if (!streetAddress && user.savedAddresses.length > 0) {
        setStreetAddress(user.savedAddresses[0].street);
        setLandmark(user.savedAddresses[0].landmark || "");
      }
    }
  }, [user]);

  // If cart is empty, redirect to cart page
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
        <Navbar />
        <div className="pt-36 pb-24 max-w-md mx-auto text-center px-4">
          <ShoppingBag className="w-16 h-16 text-[#9D8F82] mx-auto mb-4" />
          <h2 className="font-serif-luxury text-2xl font-bold">Your cart is empty</h2>
          <p className="text-xs text-[#9D8F82] mt-2 mb-6">
            Please add dishes from our menu before proceeding to checkout.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
          >
            Go to Menu
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!customerName.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }
    if (orderType === "delivery" && !streetAddress.trim()) {
      setErrorMessage("Please enter your delivery street and house/building address");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStep(1);

    try {
      // Step 1: Validating
      await new Promise((r) => setTimeout(r, 400));
      setSubmissionStep(2);

      // Step 2: Payment Gateway or COD Token
      let razorpayPaymentId: string | undefined = undefined;

      if (paymentMethod === "razorpay") {
        const payRes = await fetch("/api/payment/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create_order",
            amount: grandTotal,
            currency: "INR",
          }),
        });

        const payData = await payRes.json();
        if (!payData.success) {
          throw new Error(payData.error || "Failed to initialize payment gateway");
        }

        // Test / Sandbox verification token
        razorpayPaymentId = `pay_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const verifyRes = await fetch("/api/payment/razorpay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "verify_payment",
            razorpay_order_id: payData.orderId,
            razorpay_payment_id: razorpayPaymentId,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          throw new Error("Payment signature verification failed");
        }
      }

      setSubmissionStep(3);
      await new Promise((r) => setTimeout(r, 450));

      // Step 3: Record Order on server
      const orderPayload = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        orderType,
        deliveryAddress:
          orderType === "delivery"
            ? {
                street: streetAddress.trim(),
                landmark: landmark.trim() || undefined,
                city,
                pincode,
              }
            : undefined,
        tableNumber: orderType === "dine_in" ? tableNumber : undefined,
        instructions: instructions.trim(),
        items: items.map((i) => ({
          id: i.foodItem.id,
          quantity: i.quantity,
          sizeId: i.selectedSize?.id,
          sizeName: i.selectedSize?.name,
          addOns: i.selectedAddOns.map((a) => ({ id: a.id, name: a.name })),
          specialInstructions: i.specialInstructions,
        })),
        couponCode: couponCode || undefined,
        paymentMethod,
        razorpayPaymentId,
      };

      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await orderRes.json();

      if (!orderData.success || !orderData.order) {
        throw new Error(orderData.error || "Server failed to record order");
      }

      setSubmissionStep(4);
      await new Promise((r) => setTimeout(r, 500));

      // Clear cart
      clearCart();
      toast("Your order has been placed and confirmed!", "success");

      // Redirect immediately to live order tracking page
      router.push(`/orders/${orderData.order.id}`);
    } catch (err: any) {
      console.error("Checkout submission failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred during checkout.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5] relative">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-1">
              Final Step
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-black text-[#FFF4E5]">
              Confirm & Place Your Order
            </h1>
          </div>

          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Checkout Forms */}
            <div className="lg:col-span-8 space-y-8">
              {/* 1. Order Type Selection */}
              <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D99A43] text-[#17110E] text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <span>Select Dining Mode</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`glass-card-luxury p-4 rounded-xl text-left flex items-start gap-3 transition-all ${
                      orderType === "delivery"
                        ? "border-[#D99A43] ring-1 ring-[#D99A43]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Truck className="w-5 h-5 text-[#D99A43] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold block">Home Delivery</span>
                      <span className="text-[11px] text-[#D8C4A8]/70">To your door (30-40 mins)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("takeaway")}
                    className={`glass-card-luxury p-4 rounded-xl text-left flex items-start gap-3 transition-all ${
                      orderType === "takeaway"
                        ? "border-[#D99A43] ring-1 ring-[#D99A43]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 text-[#D99A43] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold block">Takeaway Pickup</span>
                      <span className="text-[11px] text-[#D8C4A8]/70">Pick up at restaurant</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType("dine_in")}
                    className={`glass-card-luxury p-4 rounded-xl text-left flex items-start gap-3 transition-all ${
                      orderType === "dine_in"
                        ? "border-[#D99A43] ring-1 ring-[#D99A43]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <UtensilsCrossed className="w-5 h-5 text-[#D99A43] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-bold block">Dine-In Table</span>
                      <span className="text-[11px] text-[#D8C4A8]/70">Serve to your table</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* 2. Customer Contact Details */}
              <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D99A43] text-[#17110E] text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span>Contact Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Tariq Mansoor"
                      className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                      Phone Number (WhatsApp reachable) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                      Email Address (For receipt & updates)
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. tariq@example.com"
                      className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Address OR Table Number */}
              {orderType === "delivery" && (
                <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D99A43] text-[#17110E] text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <span>Delivery Address</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                        House / Flat / Building / Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. Flat 4B, Skyview Towers, Marine Drive"
                        className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="Near High Court"
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                          Pincode
                        </label>
                        <input
                          type="text"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {orderType === "dine_in" && (
                <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#D99A43] text-[#17110E] text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <span>Table Service Details</span>
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                      Table Number / Pavilion Zone *
                    </label>
                    <input
                      type="text"
                      required
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 08 (Main Pavilion) or Majlis 2"
                      className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                    />
                  </div>
                </div>
              )}

              {/* Special Delivery or Dispatch Instructions */}
              <div className="glass-panel-luxury p-6 rounded-2xl space-y-3">
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider">
                  Delivery / Kitchen Dispatch Instructions (Optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Gate code, ring bell, leave at reception, pack extra napkins..."
                  rows={2}
                  className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43] resize-none"
                />
              </div>

              {/* 4. Payment Gateway Selection */}
              <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D99A43] text-[#17110E] text-xs font-black flex items-center justify-center">
                    4
                  </span>
                  <span>Payment Method</span>
                </h3>

                <div className="space-y-3">
                  {/* Razorpay Online */}
                  <label
                    className={`glass-card-luxury flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "razorpay"
                        ? "border-[#D99A43] ring-1 ring-[#D99A43]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={() => setPaymentMethod("razorpay")}
                        className="mt-1 accent-[#D99A43]"
                      />
                      <div>
                        <span className="text-sm font-bold flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#D99A43]" />
                          Razorpay Secure Online Payment (India)
                        </span>
                        <span className="text-xs text-[#D8C4A8]/70 block mt-0.5">
                          Instant checkout via UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards,
                          and Net Banking.
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#6F8D57] glass-pill px-2.5 py-0.5 rounded">
                      Recommended
                    </span>
                  </label>

                  {/* Cash on Delivery / Pay on Pickup */}
                  <label
                    className={`glass-card-luxury flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-[#D99A43] ring-1 ring-[#D99A43]"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-1 accent-[#D99A43]"
                      />
                      <div>
                        <span className="text-sm font-bold flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-[#D99A43]" />
                          {orderType === "delivery"
                            ? "Cash on Delivery (COD)"
                            : "Pay at Counter on Pickup"}
                        </span>
                        <span className="text-xs text-[#D8C4A8]/70 block mt-0.5">
                          Pay cash or scan courier UPI QR when your order arrives.
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="glass-panel-luxury p-6 rounded-2xl sticky top-28 space-y-4">
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5] border-b border-white/10 pb-3">
                  Feast Summary ({items.length} items)
                </h3>

                {/* Items preview list */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <div
                      key={i.cartItemId}
                      className="flex items-start justify-between text-xs text-[#D8C4A8]"
                    >
                      <div>
                        <span className="font-medium text-[#FFF4E5]">
                          {i.quantity}x {i.foodItem.name}
                        </span>
                        {i.selectedSize && (
                          <span className="block text-[10px] text-[#9D8F82]">
                            {i.selectedSize.name}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-[#FFF4E5]">₹{i.totalPrice}</span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-2 text-xs text-[#D8C4A8] border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#FFF4E5]">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#6F8D57]">
                      <span>Coupon Discount ({couponCode})</span>
                      <span className="font-semibold">-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-[#FFF4E5]">
                      {deliveryFee === 0 ? (
                        <span className="text-[#6F8D57]">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-semibold text-[#FFF4E5]">₹{tax}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between border-t border-[#D99A43]/20 pt-3">
                  <span className="font-serif-luxury text-lg font-bold text-[#FFF4E5]">
                    Grand Total
                  </span>
                  <span className="text-2xl font-black text-[#D99A43]">₹{grandTotal}</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-skeuomorphic-gold w-full flex items-center justify-center gap-2 py-4 rounded-xl font-black text-sm uppercase tracking-wider disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? "Securing Your Order..." : `Place Order (₹${grandTotal})`}
                  </span>
                </button>

                <p className="text-[11px] text-center text-[#9D8F82] leading-tight">
                  By clicking Place Order, you confirm your order and agree to ZAFFRAN Pavilion terms.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Matching bottom gradient to flow smoothly into Footer */}
        <MatchingBottomGradient
          fromColor="transparent"
          toColor="#17110E"
          className="mt-16 h-28"
        />
      </main>

      {/* LUXURY ORDER SUBMISSION PROGRESS OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-full max-w-md p-8 rounded-3xl bg-[#24201D] border border-[#D99A43]/50 shadow-2xl text-center space-y-6 relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#D99A43]/20 blur-2xl pointer-events-none" />

            {/* Pulsing Concentric Radar Ring Emblem */}
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="radar-pulse-ring w-20 h-20 rounded-full bg-gradient-to-br from-[#D99A43] via-[#C76B35] to-[#A66E22] flex items-center justify-center shadow-2xl shadow-[#D99A43]/30">
                <UtensilsCrossed className="w-9 h-9 text-[#17110E] animate-bounce" />
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#D99A43] block mb-1">
                Kitchen Dispatch Concierge
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                {submissionStep === 1 && "Verifying Culinary Selections"}
                {submissionStep === 2 && "Securing Payment Gateway"}
                {submissionStep === 3 && "Scheduling Kitchen Preparation"}
                {submissionStep === 4 && "Order Confirmed & Sealed!"}
              </h3>
              <p className="text-xs text-[#D8C4A8] mt-1.5 font-light">
                {submissionStep === 1 && "Verifying portions, portions offset, and spice notes..."}
                {submissionStep === 2 && "Processing verified token and payment signature..."}
                {submissionStep === 3 && "Alerting hearth masters and preparing dispatch..."}
                {submissionStep === 4 && "Redirecting to your live order progress tracker..."}
              </p>
            </div>

            {/* Glowing Indeterminate Progress Bar */}
            <div className="w-full h-2 rounded-full progress-bar-indeterminate overflow-hidden border border-white/10" />

            {/* 4-Step Progress Checkpoints */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-[#9D8F82]">
              <div className={`flex flex-col items-center gap-1 ${submissionStep >= 1 ? "text-[#D99A43] font-bold" : ""}`}>
                <div className={`w-3 h-3 rounded-full ${submissionStep >= 1 ? "bg-[#D99A43]" : "bg-white/10"}`} />
                <span>Verify</span>
              </div>
              <div className={`flex flex-col items-center gap-1 ${submissionStep >= 2 ? "text-[#D99A43] font-bold" : ""}`}>
                <div className={`w-3 h-3 rounded-full ${submissionStep >= 2 ? "bg-[#D99A43]" : "bg-white/10"}`} />
                <span>Payment</span>
              </div>
              <div className={`flex flex-col items-center gap-1 ${submissionStep >= 3 ? "text-[#D99A43] font-bold" : ""}`}>
                <div className={`w-3 h-3 rounded-full ${submissionStep >= 3 ? "bg-[#D99A43]" : "bg-white/10"}`} />
                <span>Kitchen</span>
              </div>
              <div className={`flex flex-col items-center gap-1 ${submissionStep >= 4 ? "text-[#6F8D57] font-bold" : ""}`}>
                <div className={`w-3 h-3 rounded-full ${submissionStep >= 4 ? "bg-[#6F8D57]" : "bg-white/10"}`} />
                <span>Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
