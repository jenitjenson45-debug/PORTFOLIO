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
        bg: {
          primary: "#11120F", // Deep charcoal near-black
          secondary: "#191B16", // Secondary charcoal
          surface: "#20231D", // Surface container
          surfaceHover: "#292E24",
          card: "rgba(32, 35, 29, 0.65)",
        },
        ivory: {
          DEFAULT: "#E9E3D5", // Warm Ivory
          warm: "#E9E3D5",
          soft: "#F5F3EC", // Soft White
          muted: "#A9A99D", // Muted Text
        },
        olive: {
          DEFAULT: "#858D70", // Muted Olive
          muted: "#858D70",
          sage: "#A0AA87", // Sage Green
          dark: "#2A2E23",
          deep: "#1A1D16",
          glow: "rgba(133, 141, 112, 0.22)",
        },
        subtle: {
          border: "rgba(233, 227, 213, 0.16)",
          borderLight: "rgba(233, 227, 213, 0.08)",
          oliveBorder: "rgba(133, 141, 112, 0.35)",
        },
      },
      fontFamily: {
        condensed: [
          "'Bebas Neue'",
          "'Big Shoulders Display'",
          "'Oswald'",
          "sans-serif",
        ],
        serif: [
          "'Playfair Display'",
          "'Cormorant Garamond'",
          "Georgia",
          "serif",
        ],
        sans: [
          "'Manrope'",
          "'Inter'",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest: ".25em",
        luxury: ".35em",
        monogram: ".5em",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.45" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "float-gentle": "float-gentle 5s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
