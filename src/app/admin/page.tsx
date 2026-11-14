"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Eye,
  FileDown,
  Lock,
  ChevronDown,
  X,
  Tag,
  Settings,
  ArrowLeft,
  UtensilsCrossed,
} from "lucide-react";
import { FoodItem, FoodCategory, Order, Coupon, RestaurantSettings, OrderStatus } from "@/lib/types";
import { useToast } from "@/context/ToastContext";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export default function AdminDashboardPage() {
  const { toast } = useToast();

  // Security gate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPin, setAdminPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Data State
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "menu" | "coupons" | "settings"
  >("overview");

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [selectedOrderForView, setSelectedOrderForView] = useState<Order | null>(null);

  // Dish Management Modal
  const [showDishModal, setShowDishModal] = useState(false);
  const [editingDish, setEditingDish] = useState<FoodItem | null>(null);

  // Dish Form State
  const [dishName, setDishName] = useState("");
  const [dishDesc, setDishDesc] = useState("");
  const [dishCategory, setDishCategory] = useState("mandi");
  const [dishPrice, setDishPrice] = useState("350");
  const [dishImage, setDishImage] = useState("");
  const [dishVeg, setDishVeg] = useState(false);
  const [dishSpicy, setDishSpicy] = useState<0 | 1 | 2 | 3>(1);
  const [dishPrepTime, setDishPrepTime] = useState("20 mins");

  // Coupon Form Modal
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDisc, setNewCouponDisc] = useState("20");
  const [newCouponMin, setNewCouponMin] = useState("499");
  const [newCouponDesc, setNewCouponDesc] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordRes, menuRes, coupRes, setRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/menu"),
        fetch("/api/coupons"),
        fetch("/api/settings"),
      ]);

      const ordData = await ordRes.json();
      const menuData = await menuRes.json();
      const coupData = await coupRes.json();
      const setData = await setRes.json();

      if (ordData.success) setOrders(ordData.orders);
      if (menuData.success) {
        setItems(menuData.items);
        setCategories(menuData.categories);
      }
      if (coupData.success) setCoupons(coupData.coupons);
      if (setData.success) setSettings(setData.settings);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if session pin already verified in localStorage
    const savedPin = sessionStorage.getItem("zaffran_admin_auth");
    if (savedPin === "valid") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === "admin123" || adminPin === "1234") {
      setIsAuthenticated(true);
      sessionStorage.setItem("zaffran_admin_auth", "valid");
      setPinError("");
      fetchData();
      toast("Admin access granted", "success");
    } else {
      setPinError("Invalid Admin PIN. (Default test PIN is: admin123)");
    }
  };

  // Status Change for Orders
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        toast(`Order #${orderId} marked as ${newStatus}`, "success");
      }
    } catch (e) {
      toast("Failed to update status", "error");
    }
  };

  // Toggle Item Availability
  const handleToggleAvailability = async (item: FoodItem) => {
    try {
      const updatedAvail = !item.isAvailable;
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: updatedAvail }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isAvailable: updatedAvail } : i))
        );
        toast(
          `"${item.name}" marked as ${updatedAvail ? "In Stock" : "Sold Out"}`,
          updatedAvail ? "success" : "info"
        );
      }
    } catch (e) {
      toast("Error toggling dish availability", "error");
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (item: FoodItem) => {
    try {
      const updatedFeatured = !item.isFeatured;
      const res = await fetch(`/api/menu/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: updatedFeatured }),
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isFeatured: updatedFeatured } : i))
        );
        toast(`"${item.name}" featured status updated`, "success");
      }
    } catch (e) {
      toast("Error updating featured status", "error");
    }
  };

  // Delete Dish
  const handleDeleteDish = async (dishId: string, dishName: string) => {
    if (!confirm(`Are you sure you want to delete "${dishName}" from the menu?`)) return;
    try {
      const res = await fetch(`/api/menu/${dishId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((i) => i.id !== dishId));
        toast(`"${dishName}" deleted from menu`, "info");
      }
    } catch (e) {
      toast("Failed to delete dish", "error");
    }
  };

  // Save / Edit Dish Form Submit
  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName || !dishPrice) return;

    try {
      const selectedCatObj = categories.find((c) => c.id === dishCategory);
      const payload = {
        name: dishName,
        description: dishDesc,
        categoryId: dishCategory,
        categoryName: selectedCatObj?.name || dishCategory,
        price: Number(dishPrice),
        image:
          dishImage ||
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
        isVeg: dishVeg,
        spicyLevel: dishSpicy,
        prepTime: dishPrepTime,
        isAvailable: true,
        isPopular: false,
        isFeatured: false,
      };

      if (editingDish) {
        const res = await fetch(`/api/menu/${editingDish.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setItems((prev) => prev.map((i) => (i.id === editingDish.id ? data.item : i)));
          toast(`Updated dish details for "${dishName}"`, "success");
        }
      } else {
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setItems((prev) => [data.item, ...prev]);
          toast(`New dish "${dishName}" added to live menu!`, "success");
        }
      }

      setShowDishModal(false);
      setEditingDish(null);
    } catch (e) {
      toast("Failed to save dish", "error");
    }
  };

  // Add Coupon Form Submit
  const handleSaveCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newCouponCode,
          discountPercent: Number(newCouponDisc),
          minOrder: Number(newCouponMin),
          description: newCouponDesc || `${newCouponDisc}% OFF on orders above ₹${newCouponMin}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCoupons((prev) => [data.coupon, ...prev]);
        toast(`Promo code "${newCouponCode.toUpperCase()}" is now live!`, "success");
        setShowCouponModal(false);
        setNewCouponCode("");
      }
    } catch (e) {
      toast("Failed to create coupon", "error");
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        toast("Restaurant operational settings saved!", "success");
      }
    } catch (e) {
      toast("Failed to save settings", "error");
    }
  };

  // Export Orders as CSV
  const exportOrdersCSV = () => {
    if (orders.length === 0) return;
    const headers = ["Order ID", "Date", "Customer", "Phone", "Type", "Status", "Total", "Payment Method"];
    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleString(),
      `"${o.customerName}"`,
      o.customerPhone,
      o.orderType,
      o.status,
      o.total,
      o.paymentMethod,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zaffran_orders_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Orders exported to CSV", "success");
  };

  // Metrics Calculations
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed" || o.status === "preparing" || o.status === "out_for_delivery"
  ).length;
  const completedOrdersCount = orders.filter((o) => o.status === "delivered").length;
  const cancelledOrdersCount = orders.filter((o) => o.status === "cancelled").length;

  // Filtered Orders
  const filteredOrders =
    orderStatusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === orderStatusFilter);

  // Authentication Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#17110E] text-[#FFF4E5] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl glass-panel-luxury shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl glass-box-inset text-[#D99A43] flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D99A43]">
              Restricted Area
            </span>
            <h1 className="font-serif-luxury text-2xl font-black text-[#FFF4E5] mt-1">
              ZAFFRAN Management Portal
            </h1>
            <p className="text-xs text-[#9D8F82] mt-1">
              Enter Administrator Security PIN to access restaurant dispatch & menu management.
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                autoFocus
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter PIN (Default: admin123)"
                className="w-full text-center bg-[#17110E] border border-white/10 rounded-xl p-3.5 text-base font-mono tracking-widest text-[#FFF4E5] focus:outline-none focus:border-[#D99A43]"
              />
              {pinError && <p className="text-xs text-red-400 mt-2">{pinError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D99A43]/20 hover:opacity-95 transition-all"
            >
              Verify & Enter Dashboard
            </button>

            <div className="pt-2 text-xs text-[#9D8F82]">
              <Link href="/" className="hover:text-[#D99A43] flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Guest Dining Website</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5] pb-24">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-[#1C1815]/95 backdrop-blur-xl border-b border-[#D99A43]/20 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-xs text-[#D8C4A8] hover:text-[#D99A43] mr-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Guest Site</span>
            </Link>

            <div className="w-8 h-8 rounded-lg bg-[#D99A43] text-[#17110E] flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>

            <div>
              <h2 className="font-serif-luxury text-lg font-bold text-[#FFF4E5] leading-none">
                ZAFFRAN Admin
              </h2>
              <span className="text-[10px] text-[#6F8D57] font-semibold tracking-wider uppercase">
                Live Kitchen Dispatch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#D8C4A8] hover:text-white"
              title="Refresh all data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#D99A43]" : ""}`} />
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem("zaffran_admin_auth");
                setIsAuthenticated(false);
              }}
              className="text-xs text-red-400 hover:text-red-300 py-1.5 px-3 rounded-lg bg-red-950/30 border border-red-500/20"
            >
              Lock
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 mb-8 scrollbar-none">
          {[
            { id: "overview", label: "Dashboard Overview", icon: TrendingUp },
            { id: "orders", label: `Live Orders (${orders.length})`, icon: ShoppingBag },
            { id: "menu", label: `Menu Dishes (${items.length})`, icon: UtensilsCrossed },
            { id: "coupons", label: `Coupons & Offers (${coupons.length})`, icon: Tag },
            { id: "settings", label: "Pavilion Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isSelected
                    ? "bg-[#D99A43] text-[#17110E] shadow-lg shadow-[#D99A43]/20"
                    : "bg-[#24201D] text-[#D8C4A8] hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* LOADING SKELETON PLACEHOLDER FOR DASHBOARD */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#24201D] border border-white/5 space-y-3">
                  <div className="h-4 w-24 rounded bg-white/10 placeholder-shimmer" />
                  <div className="h-8 w-32 rounded-lg bg-white/15 placeholder-shimmer" />
                  <div className="h-3 w-40 rounded bg-white/5" />
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#24201D] border border-white/5 space-y-4">
              <div className="h-5 w-48 rounded bg-white/10 placeholder-shimmer" />
              <div className="space-y-3 pt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-10 w-full rounded-xl bg-[#17110E] placeholder-shimmer" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {!loading && activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-card-luxury p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#D99A43]">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Sales</span>
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#FFF4E5]">
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-[#6F8D57] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Calculated from verified orders
                </span>
              </div>

              <div className="glass-card-luxury p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#D99A43]">
                  <span className="text-xs font-bold uppercase tracking-wider">Active in Kitchen</span>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#FFF4E5]">{activeOrdersCount}</div>
                <span className="text-[11px] text-[#D8C4A8]">Pending or in dispatch</span>
              </div>

              <div className="glass-card-luxury p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6F8D57]">
                  <span className="text-xs font-bold uppercase tracking-wider">Completed Feasts</span>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#FFF4E5]">{completedOrdersCount}</div>
                <span className="text-[11px] text-[#D8C4A8]/70">Delivered to guests</span>
              </div>

              <div className="glass-card-luxury p-6 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-red-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Cancelled</span>
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-3xl font-black text-[#FFF4E5]">{cancelledOrdersCount}</div>
                <span className="text-[11px] text-[#D8C4A8]/70">Total cancellations</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="glass-panel-luxury p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5]">
                  Recent Guest Orders
                </h3>
                <button
                  onClick={exportOrdersCSV}
                  className="px-3.5 py-1.5 rounded-lg bg-[#17110E] border border-white/10 text-xs font-semibold text-[#D99A43] hover:border-[#D99A43] flex items-center gap-1.5 transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-white/10 text-[#9D8F82] uppercase">
                    <tr>
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 6).map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 font-mono font-bold text-[#D99A43]">#{ord.id}</td>
                        <td className="py-3 font-medium text-white">{ord.customerName}</td>
                        <td className="py-3 capitalize text-[#D8C4A8]">{ord.orderType}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              ord.status === "delivered"
                                ? "bg-[#6F8D57]/20 text-[#6F8D57]"
                                : ord.status === "cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-[#D99A43]/20 text-[#D99A43]"
                            }`}
                          >
                            {ord.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-white">₹{ord.total}</td>
                        <td className="py-3">
                          <button
                            onClick={() => setSelectedOrderForView(ord)}
                            className="p-1.5 rounded bg-[#17110E] text-[#D8C4A8] hover:text-[#D99A43]"
                            title="View details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ORDERS MANAGEMENT */}
        {!loading && activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {["all", "pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                        orderStatusFilter === status
                          ? "bg-[#D99A43] text-[#17110E]"
                          : "bg-[#24201D] text-[#D8C4A8] hover:text-white border border-white/5"
                      }`}
                    >
                      {status.replace("_", " ")}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={exportOrdersCSV}
                className="px-4 py-2 rounded-xl bg-[#24201D] border border-white/10 text-xs font-semibold text-[#D99A43] hover:border-[#D99A43] flex items-center gap-1.5 self-start sm:self-auto"
              >
                <FileDown className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>

            {/* Orders Cards List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center bg-[#24201D] rounded-2xl border border-white/5">
                  <p className="text-xs text-[#9D8F82]">No orders matching selected status filter.</p>
                </div>
              ) : (
                filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-2xl bg-[#24201D] border border-white/10 hover:border-[#D99A43]/30 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-base font-bold text-[#D99A43]">
                            #{ord.id}
                          </span>
                          <span className="text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#17110E] text-[#D8C4A8] border border-white/10">
                            {ord.orderType}
                          </span>
                          <span className="text-xs text-[#9D8F82]">
                            {new Date(ord.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white mt-1">
                          {ord.customerName} • {ord.customerPhone}
                        </p>
                      </div>

                      {/* Status Change Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#9D8F82]">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-[#17110E] border border-[#D99A43]/40 text-[#D99A43] font-bold text-xs rounded-xl px-3 py-1.5 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">In Kitchen (Preparing)</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered (Complete)</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Ordered items breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="text-xs text-[#D8C4A8] flex justify-between">
                            <span>
                              {item.quantity}x {item.name}{" "}
                              {item.sizeName ? `(${item.sizeName})` : ""}
                            </span>
                            <span className="text-white font-medium">₹{item.totalPrice}</span>
                          </div>
                        ))}
                        {ord.instructions && (
                          <p className="text-[11px] text-[#D99A43] italic pt-1">
                            Chef Note: &ldquo;{ord.instructions}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="text-xs text-[#D8C4A8] space-y-1 border-t md:border-t-0 md:border-l border-white/5 md:pl-4 pt-2 md:pt-0">
                        {ord.deliveryAddress && (
                          <p>
                            <strong className="text-white">Address:</strong>{" "}
                            {ord.deliveryAddress.street}, {ord.deliveryAddress.city}
                          </p>
                        )}
                        {ord.tableNumber && (
                          <p>
                            <strong className="text-white">Table:</strong> {ord.tableNumber}
                          </p>
                        )}
                        <p>
                          <strong className="text-white">Payment:</strong> {ord.paymentMethod} (
                          <span
                            className={
                              ord.paymentStatus === "paid" ? "text-[#6F8D57]" : "text-yellow-400"
                            }
                          >
                            {ord.paymentStatus}
                          </span>
                          )
                        </p>
                        <p className="text-base font-bold text-[#D99A43] pt-1">
                          Total: ₹{ord.total}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                      <button
                        onClick={() => setSelectedOrderForView(ord)}
                        className="px-3 py-1.5 rounded-lg bg-[#17110E] border border-white/10 text-xs font-semibold text-[#D8C4A8] hover:text-white flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Invoice</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MENU ITEMS MANAGEMENT */}
        {!loading && activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                Menu Delicacies ({items.length} dishes)
              </h3>
              <button
                onClick={() => {
                  setEditingDish(null);
                  setDishName("");
                  setDishDesc("");
                  setDishCategory("mandi");
                  setDishPrice("350");
                  setDishImage("");
                  setDishVeg(false);
                  setDishSpicy(1);
                  setShowDishModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#D99A43]/20 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Food Item</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="rounded-2xl bg-[#24201D] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#17110E] border-b border-white/10 text-[#9D8F82] uppercase">
                    <tr>
                      <th className="py-3 px-4">Dish</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Availability</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((dish) => (
                      <tr key={dish.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#17110E]">
                              <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-white block">{dish.name}</span>
                              <span className="text-[11px] text-[#9D8F82]">{dish.prepTime}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#D8C4A8]">{dish.categoryName}</td>
                        <td className="py-3 px-4 font-bold text-[#D99A43]">₹{dish.price}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleAvailability(dish)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                              dish.isAvailable
                                ? "bg-[#6F8D57]/20 text-[#6F8D57] border border-[#6F8D57]/40"
                                : "bg-red-500/20 text-red-400 border border-red-500/40"
                            }`}
                          >
                            {dish.isAvailable ? "In Stock" : "Sold Out"}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleFeatured(dish)}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              dish.isFeatured
                                ? "bg-[#D99A43]/20 text-[#D99A43] border border-[#D99A43]/40"
                                : "text-[#9D8F82] border border-white/5"
                            }`}
                          >
                            {dish.isFeatured ? "Featured ★" : "Normal"}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingDish(dish);
                                setDishName(dish.name);
                                setDishDesc(dish.description);
                                setDishCategory(dish.categoryId);
                                setDishPrice(dish.price.toString());
                                setDishImage(dish.image);
                                setDishVeg(dish.isVeg);
                                setDishSpicy(dish.spicyLevel);
                                setDishPrepTime(dish.prepTime);
                                setShowDishModal(true);
                              }}
                              className="p-1.5 rounded bg-[#17110E] text-[#D8C4A8] hover:text-[#D99A43]"
                              title="Edit details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDish(dish.id, dish.name)}
                              className="p-1.5 rounded bg-[#17110E] text-red-400 hover:text-red-300"
                              title="Delete dish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COUPONS & OFFERS */}
        {!loading && activeTab === "coupons" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                Promotions & Coupon Codes
              </h3>
              <button
                onClick={() => setShowCouponModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="p-6 rounded-2xl bg-[#24201D] border border-[#D99A43]/30 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-[#D99A43]">
                      {coupon.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        coupon.isActive
                          ? "bg-[#6F8D57]/20 text-[#6F8D57]"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {coupon.isActive ? "Active" : "Disabled"}
                    </span>
                  </div>

                  <p className="text-xs text-[#D8C4A8] leading-relaxed">{coupon.description}</p>
                  <div className="text-[11px] text-[#9D8F82] space-y-0.5 pt-2 border-t border-white/5">
                    <p>Discount: {coupon.discountPercent}%</p>
                    <p>Minimum Order: ₹{coupon.minOrder}</p>
                    {coupon.maxDiscount && <p>Max Discount: ₹{coupon.maxDiscount}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: RESTAURANT PROFILE SETTINGS */}
        {!loading && activeTab === "settings" && settings && (
          <form
            onSubmit={handleSaveSettings}
            className="p-8 rounded-2xl bg-[#24201D] border border-[#D99A43]/30 max-w-2xl space-y-5"
          >
            <h3 className="font-serif-luxury text-2xl font-bold text-white border-b border-white/10 pb-3">
              Restaurant Brand & Operational Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Physical Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) =>
                    setSettings({ ...settings, deliveryFee: Number(e.target.value) })
                  }
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  value={settings.freeDeliveryThreshold}
                  onChange={(e) =>
                    setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })
                  }
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  GST Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.taxPercent}
                  onChange={(e) =>
                    setSettings({ ...settings, taxPercent: Number(e.target.value) })
                  }
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D8C4A8] uppercase mb-1">
                  Weekday Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours.weekdays}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      openingHours: { ...settings.openingHours, weekdays: e.target.value },
                    })
                  }
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D99A43]/20"
            >
              Save Restaurant Settings
            </button>
          </form>
        )}
      </main>

      {/* MODAL: ADD / EDIT DISH */}
      {showDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleSaveDish}
            className="w-full max-w-lg bg-[#24201D] border border-[#D99A43]/40 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {editingDish ? "Edit Dish Details" : "Add New Dish to Menu"}
              </h3>
              <button
                type="button"
                onClick={() => setShowDishModal(false)}
                className="text-[#9D8F82] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-[#D8C4A8] mb-1">Dish Name *</label>
              <input
                type="text"
                required
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="e.g. Royal Chicken Mandi"
                className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Category *</label>
                <select
                  value={dishCategory}
                  onChange={(e) => setDishCategory(e.target.value)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Base Price (₹) *</label>
                <input
                  type="number"
                  required
                  value={dishPrice}
                  onChange={(e) => setDishPrice(e.target.value)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#D8C4A8] mb-1">Description</label>
              <textarea
                rows={2}
                value={dishDesc}
                onChange={(e) => setDishDesc(e.target.value)}
                placeholder="Authentic slow-smoked preparation..."
                className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#D8C4A8] mb-1">Image URL (Unsplash or direct CDN)</label>
              <input
                type="url"
                value={dishImage}
                onChange={(e) => setDishImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Dietary</label>
                <select
                  value={dishVeg ? "veg" : "non-veg"}
                  onChange={(e) => setDishVeg(e.target.value === "veg")}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value="non-veg">Non-Veg</option>
                  <option value="veg">Pure Veg</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Spicy Level</label>
                <select
                  value={dishSpicy}
                  onChange={(e) => setDishSpicy(Number(e.target.value) as any)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                >
                  <option value={0}>0 - Mild</option>
                  <option value={1}>1 - Medium</option>
                  <option value={2}>2 - Spicy</option>
                  <option value={3}>3 - Extra Hot</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Prep Time</label>
                <input
                  type="text"
                  value={dishPrepTime}
                  onChange={(e) => setDishPrepTime(e.target.value)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowDishModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#D8C4A8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
              >
                Save to Menu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: CREATE COUPON */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleSaveCoupon}
            className="w-full max-w-md bg-[#24201D] border border-[#D99A43]/40 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Create Promotion Coupon
              </h3>
              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="text-[#9D8F82] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-[#D8C4A8] mb-1">Coupon Code *</label>
              <input
                type="text"
                required
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. FESTIVE30"
                className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white font-mono uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Discount % *</label>
                <input
                  type="number"
                  required
                  value={newCouponDisc}
                  onChange={(e) => setNewCouponDisc(e.target.value)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-[#D8C4A8] mb-1">Min Order (₹) *</label>
                <input
                  type="number"
                  required
                  value={newCouponMin}
                  onChange={(e) => setNewCouponMin(e.target.value)}
                  className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#D8C4A8] mb-1">Description</label>
              <input
                type="text"
                value={newCouponDesc}
                onChange={(e) => setNewCouponDesc(e.target.value)}
                placeholder="20% OFF on all weekend orders"
                className="w-full bg-[#17110E] border border-white/10 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCouponModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#D8C4A8]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider"
              >
                Activate Coupon
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: VIEW INVOICE */}
      {selectedOrderForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#24201D] border border-[#D99A43]/40 rounded-2xl p-6 shadow-2xl relative text-xs text-[#FFF4E5] space-y-4 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrderForView(null)}
              className="absolute top-4 right-4 text-[#9D8F82] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-white/10 pb-3">
              <span className="text-[10px] text-[#D99A43] font-bold uppercase">
                Official Order Receipt
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white">
                Order #{selectedOrderForView.id}
              </h3>
              <p className="text-[11px] text-[#9D8F82]">
                Placed {new Date(selectedOrderForView.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Guest:</strong> {selectedOrderForView.customerName} (
                {selectedOrderForView.customerPhone})
              </p>
              <p>
                <strong>Type:</strong> {selectedOrderForView.orderType}
              </p>
              {selectedOrderForView.deliveryAddress && (
                <p>
                  <strong>Address:</strong> {selectedOrderForView.deliveryAddress.street},{" "}
                  {selectedOrderForView.deliveryAddress.city}
                </p>
              )}
              {selectedOrderForView.instructions && (
                <p>
                  <strong>Notes:</strong> {selectedOrderForView.instructions}
                </p>
              )}
            </div>

            <div className="border-t border-b border-white/10 py-3 space-y-2">
              <strong className="block text-white">Dishes:</strong>
              {selectedOrderForView.items.map((i, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>
                    {i.quantity}x {i.name} {i.sizeName ? `(${i.sizeName})` : ""}
                  </span>
                  <span className="font-bold text-white">₹{i.totalPrice}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-right">
              <p>Subtotal: ₹{selectedOrderForView.subtotal}</p>
              {selectedOrderForView.discount > 0 && (
                <p className="text-[#6F8D57]">Discount: -₹{selectedOrderForView.discount}</p>
              )}
              <p>Delivery Fee: ₹{selectedOrderForView.deliveryFee}</p>
              <p>GST (5%): ₹{selectedOrderForView.tax}</p>
              <p className="text-base font-black text-[#D99A43] pt-1 border-t border-white/5">
                Total: ₹{selectedOrderForView.total}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Matching bottom gradient to flow smoothly into Footer */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#17110E"
        className="mt-16 h-28"
      />
    </div>
  );
}
