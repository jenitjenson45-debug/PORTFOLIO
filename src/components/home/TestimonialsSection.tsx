"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export function TestimonialsSection() {
  const verifiedReviews = [
    {
      name: "Tariq Mansoor",
      role: "Visiting Food Critic & Executive",
      rating: 5,
      date: "Verified Dining Visit",
      comment:
        "The Royal Mutton Mandi here easily rivals the best restaurants in Dubai and Sana'a. The meat yields effortlessly to the fork and the aromatic basmati rice is deeply imbued with genuine cardamom and dried black lime.",
    },
    {
      name: "Dr. Ananya Varma",
      role: "Frequent Weekend Diner",
      rating: 5,
      date: "Verified Online Order",
      comment:
        "Thalassery biryani cooked with true Kaima rice and genuine pure ghee is rare to find done this faithfully. Delivery was under 30 minutes, piping hot in insulated packaging, and the Falooda was still frosty and fresh.",
    },
    {
      name: "Kevin Chen",
      role: "Gastronomy Enthusiast",
      rating: 5,
      date: "Verified Dining Visit",
      comment:
        "The Szechuan Firecracker Chicken and Dynamite Shrimps were spectacular. Flawless wok hei, fresh crisp scallions, and incredible sauce balance. ZAFFRAN has mastered multi-cuisine without diluting authenticity.",
    },
  ];

  return (
    <section className="py-20 bg-[#17110E]/75 backdrop-blur-[2px] relative border-t border-[#D99A43]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D99A43] block mb-2">
            Guest Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
            Loved by Connoisseurs of Fine Food
          </h2>
          <p className="mt-3 text-sm text-[#D8C4A8]">
            Genuine dining experiences shared by our valued guests and food lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verifiedReviews.map((rev, index) => (
            <div
              key={index}
              className="glass-card-luxury rounded-2xl p-7 flex flex-col justify-between relative group transition-all"
            >
              <Quote className="w-8 h-8 text-[#D99A43]/25 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-[#D99A43] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D99A43]" />
                  ))}
                </div>

                <p className="text-sm text-[#D8C4A8] leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-luxury text-base font-bold text-[#FFF4E5]">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-[#D8C4A8]/70">{rev.role}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[#6F8D57] font-semibold glass-pill px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3 text-[#6F8D57]" />
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into Footer (#17110E) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#17110E"
        className="mt-16 h-28"
      />
    </section>
  );
}
