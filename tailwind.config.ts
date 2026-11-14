import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Master Project Palette
        restaurant: {
          bg: "#17110E",          // Primary background
          surface: "#24201D",     // Secondary background
          surfaceHover: "#2F2A26",
          card: "rgba(36, 32, 29, 0.75)",
          cardGlass: "rgba(23, 17, 14, 0.85)",
          border: "rgba(217, 154, 67, 0.2)",
          borderGlow: "rgba(217, 154, 67, 0.45)",
          light: "#FFF4E5",       // Primary light
          gold: "#D99A43",        // Golden accent
          goldLight: "#F0B96D",
          goldDark: "#A66E22",
          orange: "#C76B35",      // Burnt orange
          orangeHover: "#DF7A3D",
          green: "#6F8D57",       // Fresh green (veg indicator)
          beige: "#D8C4A8",       // Warm beige
          muted: "#9D8F82",
          darkMuted: "#5C534B",
        },
        gold: {
          DEFAULT: "#D99A43",
          light: "#F0B96D",
          dark: "#A66E22",
          glow: "rgba(217, 154, 67, 0.35)",
          subtle: "rgba(217, 154, 67, 0.12)",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "'Inter'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(217, 154, 67, 0.3)",
        "gold-glow-lg": "0 0 45px rgba(217, 154, 67, 0.4)",
        "orange-glow": "0 0 30px rgba(199, 107, 53, 0.35)",
        "card-glass": "0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 244, 229, 0.08)",
        "soft-inner": "inset 2px 2px 5px rgba(0,0,0,0.5), inset -2px -2px 5px rgba(255,255,255,0.04)",
        "clay": "8px 8px 16px rgba(10, 7, 6, 0.6), -4px -4px 12px rgba(45, 40, 36, 0.4), inset 1px 1px 1px rgba(255,255,255,0.1)",
      },
      animation: {
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",
        "spin-slow": "spin-slow 28s linear infinite",
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
