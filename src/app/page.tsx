import React from "react";
import { db } from "@/lib/store";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { CinematicScrollIntro } from "@/components/home/CinematicScrollIntro";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { PopularDishesSection } from "@/components/home/PopularDishesSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { SpecialOffersSection } from "@/components/home/SpecialOffersSection";
import { StorySection } from "@/components/home/StorySection";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { Scroll3DZoomSection } from "@/components/common/Scroll3DZoomSection";

// Ensure fresh dynamic data from store
export const revalidate = 0;

export default function HomePage() {
  const items = db.getItems();
  const categories = db.getCategories();
  const coupons = db.getCoupons();

  return (
    <main className="relative z-10 min-h-screen bg-transparent text-[#FFF4E5] selection:bg-[#D99A43] selection:text-[#17110E]">
      <Navbar />

      {/* Seamless 3D Zoom Portal: First Page into Hero with ZERO Separation */}
      <CinematicScrollIntro />

      {/* Subsequent Sections with Enhanced 3D Perspective Zoom Effect */}
      <Scroll3DZoomSection>
        <HighlightsSection />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection>
        <PopularDishesSection items={items} />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection>
        <CategoryShowcase categories={categories} />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection className="section-auto-render">
        <SpecialOffersSection coupons={coupons} />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection className="section-auto-render">
        <StorySection />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection className="section-auto-render">
        <GallerySection />
      </Scroll3DZoomSection>

      <Scroll3DZoomSection className="section-auto-render">
        <TestimonialsSection />
      </Scroll3DZoomSection>

      <Footer />
    </main>
  );
}
