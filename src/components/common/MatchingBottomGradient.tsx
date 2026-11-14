"use client";

import React from "react";

interface MatchingBottomGradientProps {
  /** Optional custom starting color (defaults to transparent) */
  fromColor?: string;
  /** Optional custom ending color (defaults to #17110E) */
  toColor?: string;
  /** Height in pixels or tailwind classes (default h-24 sm:h-32) */
  className?: string;
  /** Whether to render a delicate glowing golden horizon hairline */
  showHorizon?: boolean;
}

/**
 * MatchingBottomGradient
 * Provides a seamless, luxurious gradient transition at the bottom of each section/page
 * that flows naturally into the next section or page when scrolling down.
 */
export function MatchingBottomGradient({
  fromColor = "transparent",
  toColor = "#17110E",
  className = "h-24 sm:h-32",
  showHorizon = true,
}: MatchingBottomGradientProps) {
  return (
    <div
      className={`relative w-full overflow-hidden pointer-events-none select-none z-10 ${className}`}
      style={{
        background: `linear-gradient(180deg, ${fromColor} 0%, rgba(23, 17, 14, 0.4) 35%, rgba(217, 154, 67, 0.05) 70%, ${toColor} 100%)`,
      }}
    >
      {/* Central atmospheric ambient light beacon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 sm:w-1/2 h-full bg-gradient-to-t from-[#D99A43]/12 via-[#D99A43]/3 to-transparent blur-2xl" />

      {/* Matching Horizon Hairline */}
      {showHorizon && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D99A43]/35 to-transparent shadow-[0_0_12px_rgba(217,154,67,0.3)]" />
      )}
    </div>
  );
}
