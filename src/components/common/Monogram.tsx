import React from "react";

interface MonogramProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Monogram: React.FC<MonogramProps> = ({ size = "md", className = "" }) => {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20",
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_2px_10px_rgba(214,180,119,0.35)] transition-transform duration-500 hover:scale-105"
      >
        <defs>
          <linearGradient id="jjGoldGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFF2DC" />
            <stop offset="35%" stopColor="#F0D5A5" />
            <stop offset="70%" stopColor="#D6B477" />
            <stop offset="100%" stopColor="#9E7E45" />
          </linearGradient>
          <linearGradient id="jjGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F0D5A5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9E7E45" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* First J - Left / Back */}
        <path
          d="M 38 22 C 45 22, 48 24, 48 31 L 48 64 C 48 74, 40 80, 29 80 C 20 80, 14 74, 14 66 C 14 62, 17 58, 22 58 C 26 58, 28 61, 28 65 C 28 70, 31 72, 36 72 C 41 72, 43 69, 43 62 L 43 32 C 43 27, 40 26, 32 26 L 28 26 L 28 22 Z"
          fill="url(#jjGoldGrad)"
          stroke="url(#jjGoldStroke)"
          strokeWidth="0.75"
        />

        {/* Second J - Right / Interlocking Front */}
        <path
          d="M 64 22 C 71 22, 74 24, 74 31 L 74 64 C 74 74, 66 80, 55 80 C 46 80, 40 74, 40 66 C 40 62, 43 58, 48 58 C 52 58, 54 61, 54 65 C 54 70, 57 72, 62 72 C 67 72, 69 69, 69 62 L 69 32 C 69 27, 66 26, 58 26 L 54 26 L 54 22 Z"
          fill="url(#jjGoldGrad)"
          stroke="url(#jjGoldStroke)"
          strokeWidth="0.75"
        />

        {/* Subtle royal serif accent dots */}
        <circle cx="50" cy="18" r="2" fill="#FFF2DC" opacity="0.9" />
      </svg>
    </div>
  );
};

export const Starburst: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-[#D6B477] transition-transform duration-700 hover:rotate-90 ${className}`}
    >
      <defs>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4E0" />
          <stop offset="60%" stopColor="#D6B477" />
          <stop offset="100%" stopColor="#9E7E45" />
        </radialGradient>
      </defs>
      <path
        d="M12 0 L13.6 8.4 L22 10 L13.6 11.6 L12 20 L10.4 11.6 L2 10 L10.4 8.4 Z"
        fill="url(#starGlow)"
        filter="drop-shadow(0 0 4px rgba(240,213,165,0.7))"
      />
      <circle cx="12" cy="10" r="1.2" fill="#FFFFFF" />
    </svg>
  );
};
