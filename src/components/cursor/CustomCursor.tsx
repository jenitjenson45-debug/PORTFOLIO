"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);
  const [isProjectCard, setIsProjectCard] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 260, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectCard = target.closest("[data-cursor-project]");
      if (projectCard) {
        setIsProjectCard(true);
        setCursorText("VIEW");
        setIsPointer(true);
        return;
      } else {
        setIsProjectCard(false);
        setCursorText("");
      }

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor-pointer]"
      );
      if (interactive) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isProjectCard ? 68 : isPointer ? 42 : 26,
          height: isProjectCard ? 68 : isPointer ? 42 : 26,
          borderColor: isProjectCard
            ? "rgba(133, 141, 112, 0.9)"
            : isPointer
            ? "rgba(160, 170, 135, 0.75)"
            : "rgba(133, 141, 112, 0.45)",
          backgroundColor: isProjectCard
            ? "rgba(32, 35, 29, 0.85)"
            : isPointer
            ? "rgba(133, 141, 112, 0.14)"
            : "rgba(133, 141, 112, 0.04)",
          backdropFilter: isProjectCard ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.3 }}
      >
        {isProjectCard && (
          <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#E9E3D5]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#E9E3D5] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isProjectCard ? 0 : 1,
          scale: isPointer ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
