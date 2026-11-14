"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Sparkles,
  UtensilsCrossed,
  PhoneCall,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FoodItem } from "@/lib/types";

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [allDishes, setAllDishes] = useState<FoodItem[]>([]);
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setIsScrolled(y > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch dishes for live instant search when modal opens
  useEffect(() => {
    if (searchModalOpen && allDishes.length === 0) {
      fetch("/api/menu")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.items) {
            setAllDishes(data.items);
          }
        })
        .catch(() => {});
    }
  }, [searchModalOpen, allDishes.length]);

  // Live filter with pulsing search progress
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearchingLive(false);
      return;
    }

    setIsSearchingLive(true);
    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      const matches = allDishes.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.categoryName.toLowerCase().includes(q)
      );
      setSearchResults(matches);
      setIsSearchingLive(false);
    }, 240);

    return () => clearTimeout(timer);
  }, [searchQuery, allDishes]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Offers", href: "/#offers" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const isHomePage = pathname === "/";
  // On home page, smoothly reveal navbar as user scrolls past the 3D zoom intro
  const showNavbar = !isHomePage || scrollY > 260;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          showNavbar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          isScrolled
            ? "bg-[#17110E]/90 backdrop-blur-xl border-b border-[#D99A43]/20 py-3 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D99A43] via-[#C76B35] to-[#A66E22] flex items-center justify-center p-0.5 shadow-lg shadow-[#D99A43]/25 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#17110E] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-[#D99A43]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-black tracking-widest text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors leading-none">
                  ZAFFRAN
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8C4A8] font-medium leading-tight mt-0.5">
                  The Grand Pavilion
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links — Claymorphic UI Design */}
            <nav className="hidden lg:flex items-center gap-2 p-1 rounded-full bg-[#17110E]/70 backdrop-blur-md border border-[#D99A43]/25 shadow-inner">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`clay-btn-nav ${
                      isActive ? "clay-btn-nav-active" : "clay-btn-nav-inactive"
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons & Buttons */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D99A43]/50 text-[#FFF4E5] hover:text-[#D99A43] transition-colors"
                aria-label="Search Menu"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Customer Account */}
              <Link
                href="/account"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D99A43]/50 text-[#FFF4E5] hover:text-[#D99A43] transition-colors"
                aria-label="Customer Profile & Orders"
              >
                <User className="w-4 h-4" />
              </Link>

              {/* Shopping Cart with Live Badge Counter */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D99A43]/50 text-[#FFF4E5] hover:text-[#D99A43] transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] text-[11px] font-extrabold flex items-center justify-center shadow-lg shadow-[#D99A43]/40 animate-pulse">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Admin Portal Shortcut */}
              <Link
                href="/admin"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#24201D] border border-[#D99A43]/30 text-xs font-semibold text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                title="Restaurant Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D99A43]" />
                <span>Admin</span>
              </Link>

              {/* Order Now CTA Button — Skeuomorphic Gold Ingot */}
              <Link
                href="/menu"
                className="btn-skeuomorphic-gold hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#17110E]" />
                <span>Order Now</span>
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#FFF4E5] hover:text-[#D99A43]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#1C1815] border-l border-[#D99A43]/30 p-6 flex flex-col justify-between shadow-2xl z-40 overflow-y-auto">
            <div className="space-y-6 pt-16">
              <div className="flex items-center gap-3 pb-6 border-b border-[#D99A43]/20">
                <div className="w-10 h-10 rounded-xl bg-[#D99A43] flex items-center justify-center text-[#17110E]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5]">ZAFFRAN</h3>
                  <p className="text-[10px] text-[#D8C4A8] tracking-widest uppercase">The Grand Pavilion</p>
                </div>
              </div>

              <nav className="flex flex-col space-y-2.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`clay-btn-nav w-full justify-start text-left text-sm py-3 px-4 ${
                        isActive ? "clay-btn-nav-active" : "clay-btn-nav-inactive"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <Link
                  href="/account"
                  className="clay-btn-nav clay-btn-nav-inactive w-full justify-start text-left text-sm py-3 px-4"
                >
                  My Account & Orders
                </Link>
                <Link
                  href="/admin"
                  className="clay-btn-nav clay-btn-nav-inactive w-full justify-start text-left text-xs py-2.5 px-4 text-[#D99A43] flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#D99A43]" /> Admin Dashboard
                </Link>
              </nav>

              <div className="pt-4">
                <Link
                  href="/menu"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#D99A43] to-[#C76B35] text-[#17110E] font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#D99A43]/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Online Order</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-[#9D8F82] space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D99A43]" />
                <span>Open: 11:00 AM – 12:30 AM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#D99A43]" />
                <a href="tel:+919072104475" className="hover:text-[#FFF4E5] font-medium">+91 90721 04475</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Modal with Pulsing Skeletons & Live Preview */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-[#24201D] border border-[#D99A43]/40 rounded-2xl p-6 shadow-2xl relative text-[#FFF4E5] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#9D8F82] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#D99A43]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#FFF4E5]">
                Search Pavilion Menu
              </h3>
            </div>

            {/* Input with Scanning Beam */}
            <div className="relative rounded-xl overflow-hidden bg-[#17110E] border border-[#D99A43]/30 focus-within:border-[#D99A43] shadow-inner">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a dish, cuisine, or ingredient (e.g. Mutton Mandi, Biryani, Falooda)..."
                className="w-full bg-transparent py-3.5 pl-11 pr-10 text-sm text-[#FFF4E5] placeholder-[#9D8F82] focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    setSearchModalOpen(false);
                    window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              />
              <Search className={`w-4 h-4 absolute left-3.5 top-4 transition-colors ${isSearchingLive ? "text-[#D99A43] animate-pulse" : "text-[#D99A43]/60"}`} />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-3.5 text-[#9D8F82] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Animated Gold Progress Scanning Line */}
              {isSearchingLive && <div className="search-scan-line w-full" />}
            </div>

            {/* LIVE RESULTS / PULSING PLACEHOLDER SKELETONS */}
            <div className="mt-4 max-h-72 overflow-y-auto space-y-2">
              {isSearchingLive ? (
                /* Pulsing Search Row Placeholders */
                <div className="space-y-2 py-2">
                  <div className="text-[11px] text-[#D99A43] flex items-center gap-1.5 pb-1 font-semibold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D99A43] animate-ping" />
                    <span>Searching across kitchen stations...</span>
                  </div>
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="p-3 rounded-xl bg-[#1D1916] border border-white/5 flex items-center gap-3.5 animate-pulse"
                    >
                      <div className="w-12 h-12 rounded-lg bg-white/10 placeholder-shimmer shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/5 rounded bg-white/10 placeholder-shimmer" />
                        <div className="h-3 w-2/5 rounded bg-white/5" />
                      </div>
                      <div className="h-6 w-14 rounded-lg bg-[#D99A43]/20 placeholder-shimmer" />
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() && searchResults.length > 0 ? (
                /* Instant Matched Delicacies */
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] text-[#9D8F82] pb-1 flex justify-between items-center">
                    <span>Found {searchResults.length} matches:</span>
                    <span className="text-[10px] text-[#D99A43]">Click to view on menu</span>
                  </div>
                  {searchResults.slice(0, 5).map((dish) => (
                    <Link
                      key={dish.id}
                      href={`/menu?search=${encodeURIComponent(dish.name)}`}
                      onClick={() => setSearchModalOpen(false)}
                      className="group p-2.5 rounded-xl bg-[#1D1916] border border-white/5 hover:border-[#D99A43]/50 hover:bg-[#2A2420] transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-[#17110E]">
                          <Image src={dish.image} alt={dish.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${dish.isVeg ? "bg-[#6F8D57]" : "bg-[#C76B35]"}`} />
                            <h4 className="font-serif-luxury text-sm font-bold text-[#FFF4E5] group-hover:text-[#D99A43] transition-colors">
                              {dish.name}
                            </h4>
                          </div>
                          <span className="text-[10px] text-[#9D8F82]">{dish.categoryName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#D99A43]">₹{dish.price}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#9D8F82] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchQuery.trim() && !isSearchingLive ? (
                <div className="py-6 text-center text-xs text-[#9D8F82]">
                  No matching dishes found. Try &ldquo;Mandi&rdquo;, &ldquo;Biryani&rdquo;, or &ldquo;Falooda&rdquo;.
                </div>
              ) : null}
            </div>

            {/* Quick Keyword Pills */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5 text-xs">
              <span className="text-[#9D8F82] py-1 text-[11px]">Popular:</span>
              {["Royal Mutton Mandi", "Thalassery Biryani", "Special Falooda", "Dynamite Shrimps", "Blue Lagoon"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:border-[#D99A43] hover:text-[#D99A43] transition-colors text-[11px]"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
