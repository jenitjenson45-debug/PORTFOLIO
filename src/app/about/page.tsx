"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Scroll3DZoomSection } from "@/components/common/Scroll3DZoomSection";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";
import {
  Sparkles,
  Flame,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#17110E] text-[#FFF4E5]">
      <Navbar />

      {/* Editorial Header Hero */}
      <Scroll3DZoomSection>
        <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-[#24201D] to-[#17110E] border-b border-[#D99A43]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#17110E] border border-[#D99A43]/40 mb-4">
              <Sparkles className="w-4 h-4 text-[#D99A43]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#D99A43]">
                The ZAFFRAN Heritage
              </span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-black text-[#FFF4E5] max-w-4xl mx-auto leading-tight">
              A Legacy of Embers, Spices & Authentic Hospitality
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#D8C4A8] max-w-2xl mx-auto font-light">
              Founded with a passion to preserve traditional woodfire and subterranean clay hearth
              techniques, ZAFFRAN brings together royal recipes from Arabia, Malabar, and the Orient.
            </p>
          </div>
        </section>
      </Scroll3DZoomSection>

      {/* Section 1: Our Story & Philosophy */}
      <Scroll3DZoomSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block">
                  Chapter I: The Journey
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-[#FFF4E5]">
                  Born from the Historic Maritime Spice Routes
                </h2>
                <p className="text-sm text-[#D8C4A8] leading-relaxed">
                  Centuries ago, dhows laden with green cardamom, peppercorns, cloves, and cinnamon
                  navigated between the Malabar coast and Arabian ports. In every harbor, chefs
                  exchanged their greatest treasures — fragrant basmati rice, saffron threads, dried black
                  lemons, and techniques of slow-cooking meat sealed underground.
                </p>
                <p className="text-sm text-[#D8C4A8] leading-relaxed">
                  At ZAFFRAN Pavilion, we honor this cross-cultural gastronomy. We have refused modern
                  shortcuts: our mandi pit is heated strictly with dried hardwood embers, and our
                  biryani pot is sealed with dough to lock in the heavenly perfume of pure spices and ghee.
                </p>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="glass-card-luxury rounded-2xl overflow-hidden aspect-[4/3] relative shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80"
                    alt="Restaurant kitchen craftsmanship"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <MatchingBottomGradient
            fromColor="transparent"
            toColor="#24201D"
            className="mt-14 h-24"
          />
        </section>
      </Scroll3DZoomSection>

      {/* Section 2: Mission & Vision */}
      <Scroll3DZoomSection>
        <section className="py-20 bg-[#24201D] border-y border-[#D99A43]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card-luxury p-8 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-xl glass-box-inset flex items-center justify-center text-[#D99A43]">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">Our Mission</h3>
                <p className="text-sm text-[#D8C4A8]/85 leading-relaxed">
                  To serve uncompromised, authentic multi-cuisine dining where traditional heritage recipes
                  are prepared with artisanal integrity, uncompromising hygiene, and prompt warmth.
                </p>
              </div>

              <div className="glass-card-luxury p-8 rounded-2xl space-y-4">
                <div className="w-12 h-12 rounded-xl glass-box-inset flex items-center justify-center text-[#6F8D57]">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#FFF4E5]">Our Vision</h3>
                <p className="text-sm text-[#D8C4A8]/85 leading-relaxed">
                  To be the gold standard of luxury casual dining, beloved for uniting families and food
                  lovers around steaming platters of mandi, aromatic dum biryanis, and frosty faloodas.
                </p>
              </div>
            </div>
          </div>

          <MatchingBottomGradient
            fromColor="transparent"
            toColor="#17110E"
            className="mt-14 h-24"
          />
        </section>
      </Scroll3DZoomSection>

      {/* Section 3: Food Quality & Ingredients */}
      <Scroll3DZoomSection>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
                Uncompromising Standards
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-[#FFF4E5]">
                Pure Ingredients, No Artificial Compromises
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "100% Halal Fresh Cuts",
                  desc: "Certified tender mutton and farm-fresh country chicken inspected daily.",
                },
                {
                  title: "Hand-Crushed Whole Spices",
                  desc: "Wayanad black peppercorns, Idukki green cardamom, and Kashmiri saffron.",
                },
                {
                  title: "Cold-Pressed Seed Oils & Ghee",
                  desc: "Traditional desi cow ghee and extra virgin cold-pressed olive oils for Arabic mezze.",
                },
                {
                  title: "Zero Artificial Coloring",
                  desc: "Our golden hues come naturally from saffron, turmeric, and dried Kashmiri chillies.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="glass-card-luxury p-6 rounded-2xl space-y-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#6F8D57]" />
                  <h4 className="font-serif-luxury text-lg font-bold text-[#FFF4E5]">{card.title}</h4>
                  <p className="text-xs text-[#D8C4A8]/80 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <MatchingBottomGradient
            fromColor="transparent"
            toColor="#24201D"
            className="mt-14 h-24"
          />
        </section>
      </Scroll3DZoomSection>

      {/* Section 4: Kitchen & Ambience Gallery */}
      <Scroll3DZoomSection>
        <section className="py-20 bg-[#24201D] border-t border-[#D99A43]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
                Inside Our Pavilion
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-black text-[#FFF4E5]">
                Ambience Designed for Grand Gatherings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card-luxury rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80"
                  alt="Main Dining Hall"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-sm font-serif-luxury font-bold text-white">Grand Dining Hall</span>
                </div>
              </div>

              <div className="glass-card-luxury rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80"
                  alt="Open Live Barbecue Pit"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-sm font-serif-luxury font-bold text-white">Live Charcoal Hearth</span>
                </div>
              </div>

              <div className="glass-card-luxury rounded-2xl overflow-hidden aspect-[4/3] relative">
                <Image
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80"
                  alt="Private Majlis Lounge"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-sm font-serif-luxury font-bold text-white">Royal Family Majlis</span>
                </div>
              </div>
            </div>

            {/* Digital Experience & UI/UX Design Signature */}
            <div className="mt-16 p-6 sm:p-8 rounded-2xl glass-card-luxury border border-[#D99A43]/40 shadow-2xl max-w-2xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17110E] border border-[#D99A43]/40 text-xs font-bold text-[#D99A43]">
                <Sparkles className="w-3.5 h-3.5 text-[#D99A43] animate-pulse" />
                <span>Digital Craftsmanship</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-black text-[#FFF4E5]">
                Jenit Jenson
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#D99A43]">
                UI / UX Architect
              </p>
              <p className="text-xs sm:text-sm text-[#D8C4A8] max-w-lg mx-auto leading-relaxed pt-1 font-light">
                Sculpting sensory digital dining through bespoke skeuomorphic touch, 3D spatial depth, and fluid particle motion.
              </p>
              <div className="pt-2 flex items-center justify-center gap-4 text-xs text-[#9D8F82]">
                <span>📍 Mundur, Thrissur</span>
                <span>•</span>
                <span>📞 +91 90721 04475</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="btn-skeuomorphic-gold inline-flex items-center gap-3 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider"
              >
                <span>Taste the Heritage — Order Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bottom gradient matching into Footer */}
          <MatchingBottomGradient
            fromColor="transparent"
            toColor="#17110E"
            className="mt-14 h-28"
          />
        </section>
      </Scroll3DZoomSection>

      <Footer />
    </div>
  );
}
