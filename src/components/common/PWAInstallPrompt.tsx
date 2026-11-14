"use client";

import React, { useEffect, useState } from "react";
import { Download, X, Sparkles, Share, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.debug("ServiceWorker registration skipped:", err);
        });
      });
    }

    // 2. Check if already running in standalone mode (already installed)
    const checkStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    if (checkStandalone) return;

    // Check if dismissed recently
    const isDismissed = sessionStorage.getItem("zaffran_pwa_dismissed");
    if (isDismissed) return;

    // 3. Detect iOS Safari
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPhone|iPad|iPod/.test(ua) && !("MSStream" in window);
    setIsIOS(isIosDevice);

    // 4. Capture Android/Desktop beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Wait 3.5 seconds after page load before gracefully showing the prompt
      setTimeout(() => setShowPrompt(true), 3500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // For iOS, show after delay if not dismissed
    if (isIosDevice && !checkStandalone) {
      setTimeout(() => setShowPrompt(true), 4500);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("zaffran_pwa_dismissed", "true");
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="glass-card-luxury p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(217,154,67,0.25)] border-2 border-[#D99A43]/45 bg-[#17110E]/95 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          {/* App Icon */}
          <div className="relative shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-[#D99A43] via-[#F2C94C] to-[#C76B35] p-[1.5px] shadow-lg">
            <div className="w-full h-full bg-[#120D0A] rounded-[10px] flex items-center justify-center">
              <span className="font-serif-luxury font-black text-lg text-[#F2C94C]">Z</span>
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2C94C] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D99A43]" />
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F2C94C]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D99A43]">
                Install App
              </span>
            </div>
            <h4 className="font-serif-luxury font-bold text-sm text-[#FFF4E5] leading-snug">
              Install ZAFFRAN on Your Phone
            </h4>
            <p className="text-[11px] text-[#D8C4A8] mt-0.5 leading-relaxed">
              {isIOS
                ? "Tap Share ⎋ below then 'Add to Home Screen' ➕ for full-screen offline dining."
                : "Instant 1-tap ordering, live kitchen tracking, and offline full-screen dining."}
            </p>
          </div>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-lg text-[#D8C4A8]/70 hover:text-[#FFF4E5] hover:bg-white/10 transition-colors"
            aria-label="Dismiss app install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action button */}
        <div className="mt-3 pt-3 border-t border-[#D99A43]/20 flex items-center justify-end gap-2.5">
          <button
            onClick={handleDismiss}
            className="px-3 py-1.5 text-xs text-[#D8C4A8] hover:text-[#FFF4E5] transition-colors"
          >
            Not Now
          </button>

          {isIOS ? (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#24201D] border border-[#D99A43]/40 text-xs font-bold text-[#FFF4E5]">
              <Share className="w-3.5 h-3.5 text-[#D99A43]" />
              <span>Share ➔ Add to Home</span>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="btn-skeuomorphic-gold inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#17110E] shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
