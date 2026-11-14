import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { GlobalProgressBar } from "@/components/common/GlobalProgressBar";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { CulinaryParticles3D } from "@/components/effects/CulinaryParticles3D";
import { PWAInstallPrompt } from "@/components/common/PWAInstallPrompt";

export const metadata: Metadata = {
  title: "ZAFFRAN — The Grand Pavilion | Luxury Multi-Cuisine Dining & Online Ordering",
  description:
    "Experience royal slow-smoked Yemeni Mandi, charcoal Arabic grills, traditional Malabar dum biryani, sizzling Asian woks, and handcrafted artisan beverages. Order online with live kitchen tracking.",
  keywords: [
    "ZAFFRAN",
    "Grand Pavilion",
    "Multi-cuisine Restaurant",
    "Mandi",
    "Arabic Grills",
    "Thalassery Biryani",
    "Kerala Cuisine",
    "Falooda",
    "Mojitos",
    "Online Food Ordering",
    "Thrissur Dining",
    "Mundur Restaurant",
    "Jenit Jenson UI UX Design",
  ],
  authors: [{ name: "Jenit Jenson (UI/UX Designer & Architect)" }, { name: "ZAFFRAN Pavilion" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "ZAFFRAN — The Grand Pavilion | Luxury Multi-Cuisine Dining",
    description:
      "Royal Yemeni Mandi, charcoal Arabic skewers, authentic Malabar feasts, and artisan dessert lounges.",
    siteName: "ZAFFRAN Restaurant",
    images: [
      {
        url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 800,
        alt: "ZAFFRAN Grand Multi-Cuisine Pavilion Feast",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ZAFFRAN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#17110E" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,400;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ZAFFRAN" />
        <meta name="application-name" content="ZAFFRAN" />
      </head>
      <body className="bg-[#17110E] text-[#FFF4E5] font-sans antialiased overflow-x-hidden selection:bg-[#D99A43] selection:text-[#17110E]">
        <Suspense fallback={null}>
          <GlobalProgressBar />
        </Suspense>
        {/* 3D Culinary Particles & Restaurant Motion across entire website */}
        <CulinaryParticles3D />
        {/* PWA Install Prompt (Native App Experience for Mobile & Desktop) */}
        <PWAInstallPrompt />
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <SmoothScroll>
                <CustomCursor />
                {children}
              </SmoothScroll>
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
