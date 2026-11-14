"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ShieldAlert,
  FileText,
  RefreshCw,
  X,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <footer className="relative bg-[#17110E]/85 backdrop-blur-[2px] text-[#FFF4E5] border-t border-[#D99A43]/20 pt-16 pb-12 overflow-hidden">
      {/* Decorative top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#D99A43]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Intro */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D99A43] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#17110E] rounded-[10px] flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-[#D99A43]" />
                </div>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl font-black tracking-widest text-[#FFF4E5]">
                  ZAFFRAN
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#D8C4A8]">
                  The Grand Pavilion
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#9D8F82] leading-relaxed">
              An epicurean sanctuary celebrating the rich culinary heritage of slow-smoked
              Yemeni Mandi, charcoal Arabic grills, storied Malabar spices, sizzling Asian woks,
              and artisanal handcrafted beverage lounges.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#D8C4A8] hover:text-[#D99A43] hover:border-[#D99A43] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links & Cuisine Categories */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-[#D99A43] mb-4">
              Cuisine Explorations
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C4A8]">
              <li>
                <Link href="/menu?category=mandi" className="hover:text-[#D99A43] transition-colors">
                  Authentic Smoked Mandi
                </Link>
              </li>
              <li>
                <Link href="/menu?category=arabic" className="hover:text-[#D99A43] transition-colors">
                  Charcoal Arabic Grills & Mezze
                </Link>
              </li>
              <li>
                <Link href="/menu?category=kerala" className="hover:text-[#D99A43] transition-colors">
                  Malabar Thalassery Dum Biryani
                </Link>
              </li>
              <li>
                <Link href="/menu?category=chinese" className="hover:text-[#D99A43] transition-colors">
                  Sizzling Asian Wok & Noodles
                </Link>
              </li>
              <li>
                <Link href="/menu?category=falooda" className="hover:text-[#D99A43] transition-colors">
                  Royal Zaffran Falooda Lounge
                </Link>
              </li>
              <li>
                <Link href="/menu?category=mojitos" className="hover:text-[#D99A43] transition-colors">
                  Signature Mojitos & Mocktails
                </Link>
              </li>
              <li>
                <Link href="/menu?category=shakes" className="hover:text-[#D99A43] transition-colors">
                  Belgian Chocolate Freakshakes
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Concierge */}
          <div>
            <h4 className="font-serif-luxury text-lg font-bold text-[#D99A43] mb-4">
              Concierge & Location
            </h4>
            <ul className="space-y-3 text-xs text-[#D8C4A8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D99A43] shrink-0 mt-0.5" />
                <span>ZAFFRAN The Grand Pavilion, Main Road, Mundur, Thrissur, Kerala — 680541</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D99A43] shrink-0" />
                <a href="tel:+919072104475" className="hover:text-[#D99A43] transition-colors font-medium">
                  +91 90721 04475
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#6F8D57] shrink-0" />
                <a
                  href="https://wa.me/919072104475?text=Hello%20ZAFFRAN%20Restaurant,%20I%20would%20like%20to%20inquire%20about%20ordering/dining"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#6F8D57] transition-colors font-medium"
                >
                  WhatsApp Instant Concierge
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D99A43] shrink-0" />
                <a href="mailto:dining@zaffranpavilion.com" className="hover:text-[#D99A43] transition-colors">
                  dining@zaffranpavilion.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D99A43] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">Dining Hours:</span>
                  <span>Mon – Sun: 11:00 AM – 12:30 AM</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Google Maps & Fast Actions */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-lg font-bold text-[#D99A43]">
              Find Our Pavilion
            </h4>
            <div className="rounded-xl overflow-hidden border border-white/10 h-32 w-full relative">
              <iframe
                title="Restaurant Location Map - Mundur, Thrissur"
                src="https://maps.google.com/maps?q=Mundur,+Thrissur,+Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <Link
              href="/menu"
              className="block w-full text-center py-2.5 px-4 rounded-xl bg-[#24201D] border border-[#D99A43]/40 text-[#D99A43] font-bold text-xs uppercase tracking-wider hover:bg-[#D99A43] hover:text-[#17110E] transition-all"
            >
              Order Online for Delivery
            </Link>
          </div>
        </div>

        {/* Designer Signature Pill */}
        <div className="py-6 my-2 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#24201D] via-[#1A1412] to-[#24201D] border border-[#D99A43]/40 shadow-xl group hover:border-[#D99A43] transition-all">
            <Sparkles className="w-4 h-4 text-[#D99A43] shrink-0 animate-pulse" />
            <span className="text-xs sm:text-sm text-[#D8C4A8]">
              Crafted by{" "}
              <strong className="font-serif-luxury font-black text-sm sm:text-base text-gold-gradient tracking-wide">
                Jenit Jenson
              </strong>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D99A43]/60 hidden sm:inline-block" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D99A43]">
              UI/UX Architect
            </span>
          </div>

          <div className="text-xs text-[#9D8F82] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6F8D57] animate-ping" />
            <span>Thrissur Mundur Pavilion Active</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9D8F82]">
          <p>© {new Date().getFullYear()} ZAFFRAN Pavilion Dining. All rights reserved. • Handcrafted by Jenit Jenson</p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveModal("privacy")}
              className="hover:text-[#FFF4E5] transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal("terms")}
              className="hover:text-[#FFF4E5] transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal("refund")}
              className="hover:text-[#FFF4E5] transition-colors"
            >
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#24201D] border border-[#D99A43]/30 max-w-lg w-full rounded-2xl p-6 relative max-h-[80vh] overflow-y-auto text-[#FFF4E5]">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-[#9D8F82] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === "privacy" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#D99A43]">
                  <ShieldAlert className="w-5 h-5" />
                  <h3 className="font-serif-luxury text-xl font-bold">Privacy Policy</h3>
                </div>
                <p className="text-xs text-[#D8C4A8] leading-relaxed">
                  ZAFFRAN adheres strictly to data privacy best practices. Customer names, contact
                  numbers, delivery addresses, and payment references are collected solely for the
                  purpose of order fulfillment, delivery tracking, and critical customer support.
                  We never store CVV, credit/debit card numbers, or banking credentials. Your
                  information is never sold or shared with third-party advertisers.
                </p>
              </div>
            )}

            {activeModal === "terms" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#D99A43]">
                  <FileText className="w-5 h-5" />
                  <h3 className="font-serif-luxury text-xl font-bold">Terms & Conditions</h3>
                </div>
                <p className="text-xs text-[#D8C4A8] leading-relaxed">
                  All menu items, portion sizes, ingredients, and prices are subject to seasonal
                  market availability. Food preparation commences immediately once an order is
                  confirmed. Customers are requested to ensure phone reachability during the
                  delivery window. In the case of severe weather or unforeseen traffic delays, our
                  kitchen dispatch team will proactively notify you.
                </p>
              </div>
            )}

            {activeModal === "refund" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#D99A43]">
                  <RefreshCw className="w-5 h-5" />
                  <h3 className="font-serif-luxury text-xl font-bold">Refund & Cancellation Policy</h3>
                </div>
                <p className="text-xs text-[#D8C4A8] leading-relaxed">
                  Orders may be cancelled within 3 minutes of placement before kitchen preparation
                  starts. In the unlikely event of an incorrect dish delivery, missing add-on, or
                  spill damage, our manager will issue an instant replacement or refund to the
                  original payment method within 3 to 5 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
