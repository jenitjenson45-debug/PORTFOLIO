import React from "react";

interface MonogramProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Monogram: React.FC<MonogramProps> = ({ size = "md", className = "" }) => {
  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-serif font-semibold text-[#E9E3D5] tracking-tighter ${sizeMap[size]} ${className}`}
    >
      {/* Outer Subtle Glass Ring */}
      <div className="absolute inset-0 rounded-full border border-[rgba(233,227,213,0.2)] bg-[#191B16]/80 backdrop-blur-md transition-all duration-300 hover:border-[#858D70] hover:shadow-[0_0_15px_rgba(133,141,112,0.3)]" />
      {/* Inner Accent Ring */}
      <div className="absolute inset-[2.5px] rounded-full border border-[rgba(233,227,213,0.08)]" />
      {/* Monogram Letters */}
      <span className="relative z-10 text-[#E9E3D5] font-serif text-sm font-medium tracking-tight select-none">
        JJ
      </span>
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
      className={`text-[#858D70] transition-transform duration-700 hover:rotate-90 ${className}`}
    >
      <path
        d="M12 0L13.8 8.2L22 10L13.8 11.8L12 20L10.2 11.8L2 10L10.2 8.2L12 0Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="12" cy="10" r="1.5" fill="#E9E3D5" />
    </svg>
  );
};

export const CircularSeal: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-28 h-28 flex items-center justify-center ${className}`}>
      {/* Rotating Circular Text SVG */}
      <svg
        className="w-full h-full animate-[spin_24s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <path
          id="sealCirclePath"
          d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          fill="none"
        />
        <text className="text-[7.2px] uppercase tracking-[0.22em] fill-[#A0AA87] opacity-85 font-sans font-medium">
          <textPath href="#sealCirclePath" startOffset="0%">
            · DESIGNING DIGITAL EXPERIENCES · JENIT JENSON ·
          </textPath>
        </text>
      </svg>
      {/* Center Olive Starburst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Starburst size={20} className="text-[#858D70]" />
      </div>
    </div>
  );
};
