"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import { Order, FoodItem } from "@/lib/types";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  Clock,
  ArrowRight,
  Plus,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function AccountPage() {
  const { user, login, logout, favorites, addAddress } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"orders" | "favorites" | "addresses" | "profile">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [favoriteDishes, setFavoriteDishes] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Login form state (if not logged in)
  const [loginName, setLoginName] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  // New Address state
  const [newStreet, setNewStreet] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newCity, setNewCity] = useState("Kochi");
  const [newPincode, setNewPincode] = useState("682011");
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [ordersRes, menuRes] = await Promise.all([
          fetch("/api/orders"),
          fetch("/api/menu"),
        ]);
        const ordersData = await ordersRes.json();
        const menuData = await menuRes.json();

        if (ordersData.success) {
          setOrders(ordersData.orders);
        }
        if (menuData.success) {
          const favs = menuData.items.filter((i: FoodItem) => favorites.includes(i.id));
          setFavoriteDishes(favs);
        }
      } catch (e) {
        console.error("Failed to load account data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [favorites]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName || !loginPhone) return;
    login(loginName, loginPhone, loginEmail);
    toast(`Welcome back, ${loginName}!`, "success");
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet) return;
    addAddress({
      label: "Saved Delivery Address",
      street: newStreet,
      landmark: newLandmark,
      city: newCity,
      pincode: newPincode,
    });
    setNewStreet("");
    setNewLandmark("");
    setShowAddressModal(false);
    toast("New address saved to your profile!", "success");
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      // Find food item or create placeholder item
      const foodItem: FoodItem = {
        id: item.id,
        name: item.name,
        description: "",
        categoryId: "reorder",
        categoryName: "Reordered",
        price: item.unitPrice,
        image: item.image || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80",
        isVeg: false,
        spicyLevel: 1,
        isPopular: true,
        isFeatured: false,
        isAvailable: true,
        rating: 5,
        reviewsCount: 1,
        prepTime: "20 mins",
      };
      addToCart(foodItem, undefined, item.addOns as any, item.quantity, item.specialInstructions);
    });
    toast(`Re-added ${order.items.length} items to your cart!`, "success");
  };

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* If user not logged in, show Guest / Sign-in form */}
          {!user ? (
            <div className="max-w-md mx-auto p-8 rounded-2xl glass-panel-luxury space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl glass-box-inset text-[#D99A43] flex items-center justify-center mx-auto mb-3">
                  <User className="w-7 h-7" />
                </div>
                <h2 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                  Sign In to ZAFFRAN Concierge
                </h2>
                <p className="text-xs text-[#D8C4A8]/70 mt-1">
                  Access your past orders, delivery addresses, and saved favorite dishes.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D8C4A8] uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="tariq@example.com"
                    className="glass-box-inset w-full rounded-xl p-3 text-sm text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-skeuomorphic-gold w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider"
                >
                  Enter Pavilion Account
                </button>
              </form>
            </div>
          ) : (
            /* Logged in Dashboard */
            <div className="space-y-8">
              {/* Header profile banner */}
              <div className="p-6 sm:p-8 rounded-2xl glass-panel-luxury flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#D99A43] text-[#17110E] flex items-center justify-center font-serif-luxury text-2xl font-black shadow-lg shadow-[#D99A43]/30">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#D99A43]">
                      Valued Pavilion Patron
                    </span>
                    <h1 className="font-serif-luxury text-2xl sm:text-3xl font-black text-[#FFF4E5]">
                      {user.name}
                    </h1>
                    <p className="text-xs text-[#D8C4A8]/70">
                      {user.phone} {user.email ? `• ${user.email}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/admin"
                    className="glass-card-luxury px-4 py-2 rounded-xl text-[#D99A43] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Restaurant Admin</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toast("Logged out successfully", "info");
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-[#D8C4A8] hover:text-red-400 hover:border-red-500/30 transition-all flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "orders"
                      ? "bg-[#D99A43] text-[#17110E]"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order History ({orders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "favorites"
                      ? "bg-[#D99A43] text-[#17110E]"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Saved Favorites ({favorites.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === "addresses"
                      ? "bg-[#D99A43] text-[#17110E]"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses ({user.savedAddresses.length})</span>
                </button>
              </div>

              {/* Tab 1: Orders */}
              {activeTab === "orders" && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="p-12 text-center bg-[#24201D] rounded-2xl border border-white/5 space-y-3">
                      <ShoppingBag className="w-12 h-12 text-[#9D8F82] mx-auto opacity-40" />
                      <h3 className="font-serif-luxury text-xl font-bold">No past orders found</h3>
                      <p className="text-xs text-[#9D8F82]">Place your first online dining order!</p>
                      <Link
                        href="/menu"
                        className="inline-block px-5 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
                      >
                        Explore Menu
                      </Link>
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="glass-card-luxury p-5 sm:p-6 rounded-2xl space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-[#D99A43]">
                              #{ord.id}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase glass-pill px-2.5 py-0.5 rounded-full ${
                                ord.status === "delivered"
                                  ? "text-[#6F8D57] border-[#6F8D57]/40"
                                  : ord.status === "cancelled"
                                  ? "text-red-400 border-red-500/40"
                                  : "text-[#D99A43] border-[#D99A43]/40 animate-pulse"
                              }`}
                            >
                              {ord.status.replace("_", " ")}
                            </span>
                          </div>

                          <span className="text-xs text-[#D8C4A8]/70">
                            {new Date(ord.createdAt).toLocaleDateString()} at{" "}
                            {new Date(ord.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Items summary */}
                        <div className="space-y-1">
                          {ord.items.map((i, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-[#D8C4A8]">
                              <span>
                                {i.quantity}x {i.name}
                              </span>
                              <span className="text-white font-medium">₹{i.totalPrice}</span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                          <div>
                            <span className="text-xs text-[#9D8F82]">Total Amount: </span>
                            <span className="font-bold text-base text-[#D99A43]">₹{ord.total}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleReorder(ord)}
                              className="px-3.5 py-1.5 rounded-lg bg-[#17110E] border border-white/10 text-xs font-semibold text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                            >
                              Re-order to Cart
                            </button>

                            <Link
                              href={`/orders/${ord.id}`}
                              className="px-4 py-1.5 rounded-lg bg-[#D99A43] text-[#17110E] text-xs font-bold flex items-center gap-1 hover:opacity-95 transition-opacity"
                            >
                              <span>Track Live</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab 2: Favorites */}
              {activeTab === "favorites" && (
                <div className="space-y-4">
                  {favoriteDishes.length === 0 ? (
                    <div className="p-12 text-center bg-[#24201D] rounded-2xl border border-white/5 space-y-3">
                      <Heart className="w-12 h-12 text-[#9D8F82] mx-auto opacity-40" />
                      <h3 className="font-serif-luxury text-xl font-bold">No saved dishes yet</h3>
                      <p className="text-xs text-[#9D8F82]">
                        Click the heart icon on any dish card in the menu to save it here!
                      </p>
                      <Link
                        href="/menu"
                        className="inline-block px-5 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
                      >
                        Browse Menu
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {favoriteDishes.map((dish) => (
                        <div
                          key={dish.id}
                          className="p-4 rounded-xl bg-[#24201D] border border-white/5 flex items-center justify-between gap-3"
                        >
                          <div>
                            <h4 className="font-serif-luxury text-base font-bold text-white">
                              {dish.name}
                            </h4>
                            <span className="text-xs text-[#D99A43] font-bold">₹{dish.price}</span>
                          </div>

                          <Link
                            href="/menu"
                            className="px-3 py-1.5 rounded-lg bg-[#D99A43] text-[#17110E] text-xs font-bold"
                          >
                            Order
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Saved Addresses */}
              {activeTab === "addresses" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5]">
                      Saved Addresses
                    </h3>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="px-4 py-2 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-5 rounded-2xl bg-[#24201D] border border-white/10 space-y-2 relative"
                      >
                        <span className="text-xs font-bold text-[#D99A43] uppercase tracking-wider block">
                          {addr.label}
                        </span>
                        <p className="text-xs text-[#D8C4A8] leading-relaxed">
                          {addr.street}
                          {addr.landmark ? `, Near ${addr.landmark}` : ""}, {addr.city} - {addr.pincode}
                        </p>
                      </div>
                    ))}
                  </div>

                  {showAddressModal && (
                    <form
                      onSubmit={handleAddAddressSubmit}
                      className="p-6 rounded-2xl bg-[#1C1815] border border-[#D99A43]/40 space-y-4 max-w-lg mt-6"
                    >
                      <h4 className="font-serif-luxury text-lg font-bold text-white">
                        Save New Delivery Address
                      </h4>
                      <div>
                        <label className="block text-xs text-[#D8C4A8] mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={newStreet}
                          onChange={(e) => setNewStreet(e.target.value)}
                          placeholder="e.g. Villa 14, Rose Gardens"
                          className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[#D8C4A8] mb-1">Landmark</label>
                          <input
                            type="text"
                            value={newLandmark}
                            onChange={(e) => setNewLandmark(e.target.value)}
                            placeholder="Near Metro Pillar 42"
                            className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#D8C4A8] mb-1">Pincode</label>
                          <input
                            type="text"
                            value={newPincode}
                            onChange={(e) => setNewPincode(e.target.value)}
                            className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#D8C4A8]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold"
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
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
