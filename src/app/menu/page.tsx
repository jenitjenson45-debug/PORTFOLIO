"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { FoodCard } from "@/components/menu/FoodCard";
import { FoodCustomizeModal } from "@/components/menu/FoodCustomizeModal";
import { FoodCardSkeletonGrid } from "@/components/common/FoodCardSkeleton";
import { Scroll3DZoomSection } from "@/components/common/Scroll3DZoomSection";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import { FoodItem, FoodCategory } from "@/lib/types";
import {
  Search,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  UtensilsCrossed,
  Sparkles,
  X,
  Radar,
  CheckCircle2,
} from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategoryParam = searchParams.get("category") || "all";
  const initialSearchParam = searchParams.get("search") || "";

  const [items, setItems] = useState<FoodItem[]>([]);
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryParam);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchParam);
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Modal State
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        if (data.success) {
          setItems(data.items);
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Sync category param from URL
  useEffect(() => {
    if (initialCategoryParam) {
      setSelectedCategory(initialCategoryParam);
    }
  }, [initialCategoryParam]);

  // Sync search param from URL
  useEffect(() => {
    if (initialSearchParam) {
      setSearchQuery(initialSearchParam);
    }
  }, [initialSearchParam]);

  // Handle Search Input with pulsing progress feedback
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearching(true);
    const timeout = setTimeout(() => {
      setIsSearching(false);
    }, 280);
    return () => clearTimeout(timeout);
  };

  const handleCategoryChange = (catId: string) => {
    if (selectedCategory === catId) return;
    setIsSearching(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsSearching(false);
    }, 200);
  };

  // Filtered & Sorted Items
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((i) => i.categoryId === selectedCategory);
    }

    // Dietary filter
    if (dietaryFilter === "veg") {
      result = result.filter((i) => i.isVeg);
    } else if (dietaryFilter === "non-veg") {
      result = result.filter((i) => !i.isVeg);
    }

    // Availability
    if (onlyAvailable) {
      result = result.filter((i) => i.isAvailable);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.categoryName.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === "popular") {
      result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating);
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [items, selectedCategory, dietaryFilter, onlyAvailable, searchQuery, sortBy]);

  const handleOpenModal = (item: FoodItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-[#24201D] to-[#17110E] border-b border-[#D99A43]/15 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#D99A43]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
            The Digital Grand Menu
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-black text-[#FFF4E5]">
            Culinary Repertoire
          </h1>
          <p className="mt-2 text-sm text-[#D8C4A8] max-w-xl mx-auto font-light">
            Discover 13 specialized cuisine realms. Choose portion sizes, customize your add-ons,
            and order with immediate kitchen dispatch.
          </p>

          {/* Search Bar Container */}
          <div className="mt-8 max-w-2xl mx-auto relative group">
            <div className="glass-box-inset relative rounded-2xl overflow-hidden transition-all focus-within:border-[#D99A43] focus-within:shadow-[0_0_30px_rgba(217,154,67,0.3)]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search dishes by name (e.g. Mutton Mandi, Thalassery Biryani, Falooda)..."
                className="w-full bg-transparent py-4 pl-12 pr-12 text-sm text-[#FFF4E5] placeholder-[#D8C4A8]/60 focus:outline-none"
              />
              <Search className={`w-5 h-5 absolute left-4 top-4 transition-colors ${isSearching ? "text-[#D99A43] animate-pulse" : "text-[#D99A43]/70"}`} />

              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                  }}
                  className="absolute right-4 top-4 text-[#D8C4A8] hover:text-white p-0.5 rounded-full hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Scanning Beam Progress Animation under input */}
              {isSearching && (
                <div className="search-scan-line w-full absolute bottom-0 left-0" />
              )}
            </div>

            {/* Live Search Status Pill */}
            {isSearching && (
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] text-[#D99A43] glass-pill px-3 py-0.5 rounded-full shadow-lg animate-in fade-in duration-150">
                <span className="w-2 h-2 rounded-full bg-[#D99A43] animate-ping" />
                <span>Scanning 40+ delicacies across 13 cuisines...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Category Tabs Bar */}
      <div className="sticky top-[69px] z-30 glass-panel-luxury py-3 shadow-md border-b border-[#D99A43]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "btn-skeuomorphic-gold"
                  : "glass-card-luxury text-[#D8C4A8] hover:text-white"
              }`}
            >
              All Items ({items.length})
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = items.filter((i) => i.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "btn-skeuomorphic-gold"
                      : "glass-card-luxury text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <section className="py-6 border-b border-white/10 glass-panel-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Left: Dietary Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[#D8C4A8]/80 font-semibold uppercase tracking-wider hidden sm:inline">
                Dietary:
              </span>
              <div className="flex items-center p-1 rounded-xl glass-box-inset">
                <button
                  onClick={() => {
                    setIsSearching(true);
                    setDietaryFilter("all");
                    setTimeout(() => setIsSearching(false), 150);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    dietaryFilter === "all"
                      ? "bg-[#D99A43] text-[#17110E] font-bold"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  All Food
                </button>
                <button
                  onClick={() => {
                    setIsSearching(true);
                    setDietaryFilter("veg");
                    setTimeout(() => setIsSearching(false), 150);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    dietaryFilter === "veg"
                      ? "bg-[#6F8D57] text-white font-bold"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#6F8D57]" />
                  Pure Veg
                </button>
                <button
                  onClick={() => {
                    setIsSearching(true);
                    setDietaryFilter("non-veg");
                    setTimeout(() => setIsSearching(false), 150);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                    dietaryFilter === "non-veg"
                      ? "bg-[#C76B35] text-white font-bold"
                      : "text-[#D8C4A8] hover:text-white"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#C76B35]" />
                  Non-Veg
                </button>
              </div>
            </div>

            {/* Right: Sorting & Live Result Counter */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#D99A43]" />
                <span className="text-[#9D8F82] font-semibold uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setIsSearching(true);
                    setSortBy(e.target.value as any);
                    setTimeout(() => setIsSearching(false), 150);
                  }}
                  className="bg-[#24201D] border border-white/10 text-[#FFF4E5] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#D99A43]"
                >
                  <option value="popular">Popularity & Rating</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated (★)</option>
                </select>
              </div>

              <span className="text-xs text-[#9D8F82]">
                Showing <strong className="text-[#FFF4E5]">{filteredItems.length}</strong> delicacies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Grid & Pulsing Skeletons */}
      <Scroll3DZoomSection>
        <section className="py-12 min-h-[500px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* If initially loading OR currently actively searching/transitioning */}
            {loading || isSearching ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-[#9D8F82] pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2 text-[#D99A43]">
                    <Sparkles className="w-4 h-4 animate-spin text-[#D99A43]" />
                    <span className="font-semibold uppercase tracking-wider">
                      {loading ? "Preparing Menu Showcase..." : "Filtering Culinary Creations..."}
                    </span>
                  </div>
                  <span>Curating dishes</span>
                </div>
                <FoodCardSkeletonGrid count={8} />
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-24 text-center max-w-md mx-auto space-y-4">
                <UtensilsCrossed className="w-12 h-12 text-[#9D8F82] mx-auto opacity-40" />
                <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">
                  No dishes found
                </h3>
                <p className="text-xs text-[#9D8F82]">
                  We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try resetting filters or search
                  for another delicacy.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setDietaryFilter("all");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#D99A43] text-[#17110E] text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
                {filteredItems.map((dish) => (
                  <FoodCard key={dish.id} item={dish} onOpenModal={handleOpenModal} />
                ))}
              </div>
            )}
          </div>

          {/* Matching bottom gradient to flow smoothly into Footer */}
          <MatchingBottomGradient
            fromColor="transparent"
            toColor="#17110E"
            className="mt-16 h-28"
          />
        </section>
      </Scroll3DZoomSection>

      {/* Customization Modal */}
      <FoodCustomizeModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#17110E] pt-36 px-8">
          <FoodCardSkeletonGrid count={8} />
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
