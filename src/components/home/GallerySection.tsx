"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { MatchingBottomGradient } from "@/components/common/MatchingBottomGradient";

export function GallerySection() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1000&auto=format&fit=crop&q=80",
      title: "Royal Mutton Mandi Platter",
      category: "Arabian Kitchen",
    },
    {
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80",
      title: "Charcoal Grilled Shish Tawook",
      category: "Barbecue Grill",
    },
    {
      url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1000&auto=format&fit=crop&q=80",
      title: "Thalassery Dum Biryani",
      category: "Kerala Heritage",
    },
    {
      url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=1000&auto=format&fit=crop&q=80",
      title: "Layered Royal Falooda",
      category: "Dessert Lounge",
    },
    {
      url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1000&auto=format&fit=crop&q=80",
      title: "Spearmint Cuban Mojito",
      category: "Cold Mocktails",
    },
    {
      url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80",
      title: "The Grand Pavilion Ambience",
      category: "Dining Hall",
    },
  ];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#24201D]/75 backdrop-blur-[2px] relative border-t border-[#D99A43]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17110E] border border-[#D99A43]/30 mb-3">
            <Camera className="w-3.5 h-3.5 text-[#D99A43]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#D99A43]">
              Visual Atmosphere
            </span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-black text-[#FFF4E5]">
            Culinary & Ambience Gallery
          </h2>
          <p className="mt-3 text-sm text-[#D8C4A8]">
            Click on any frame to view high-resolution photographs of our dishes, hearth, and
            dining pavilions.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className="glass-card-luxury group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <div className="glass-panel-luxury p-3 rounded-xl w-full">
                  <span className="text-[10px] uppercase font-bold text-[#D99A43] tracking-wider block">
                    {img.category}
                  </span>
                  <div className="flex items-center justify-between mt-0.5">
                    <h4 className="font-serif-luxury text-sm sm:text-base font-bold text-[#FFF4E5] line-clamp-1">
                      {img.title}
                    </h4>
                    <div className="p-1 rounded-full glass-pill text-white shrink-0 ml-2">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matching bottom gradient to flow smoothly into TestimonialsSection (#17110E) */}
      <MatchingBottomGradient
        fromColor="transparent"
        toColor="#17110E"
        className="mt-16 h-28"
      />

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-black/50 text-white hover:bg-[#D99A43] hover:text-[#17110E] transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-black/50 text-white hover:bg-[#D99A43] hover:text-[#17110E] transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden border border-[#D99A43]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[activeImageIndex].url}
              alt={galleryImages[activeImageIndex].title}
              fill
              className="object-contain"
              sizes="90vw"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/70 p-4 text-center backdrop-blur-sm">
              <span className="text-xs text-[#D99A43] uppercase tracking-wider block">
                {galleryImages[activeImageIndex].category}
              </span>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {galleryImages[activeImageIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
