"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
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
    // Completely disable custom cursor on touch/mobile devices to eliminate touch lag
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 1024
    ) {
      return;
    }

    setIsSupported(true);
    let visible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) {
        visible = true;
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visible = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      visible = true;
      setIsVisible(true);
    };

    let hoverTimer: number | null = null;
    const handleMouseOver = (e: MouseEvent) => {
      if (hoverTimer) return;
      hoverTimer = window.requestAnimationFrame(() => {
        hoverTimer = null;
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
        setIsPointer(!!interactive);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      if (hoverTimer) cancelAnimationFrame(hoverTimer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isSupported || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Outer Spring Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isProjectCard ? 64 : isPointer ? 38 : 24,
          height: isProjectCard ? 64 : isPointer ? 38 : 24,
          borderColor: isProjectCard
            ? "rgba(240, 213, 165, 0.9)"
            : isPointer
            ? "rgba(214, 180, 119, 0.85)"
            : "rgba(214, 180, 119, 0.45)",
          backgroundColor: isProjectCard
            ? "rgba(18, 16, 12, 0.85)"
            : isPointer
            ? "rgba(214, 180, 119, 0.12)"
            : "rgba(214, 180, 119, 0.04)",
          backdropFilter: isProjectCard ? "blur(4px)" : "none",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.3 }}
      >
        {isProjectCard && (
          <span className="text-[9px] font-sans font-semibold uppercase tracking-[0.2em] text-[#F0D5A5]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Tiny Precision Center Gold Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#F0D5A5] pointer-events-none shadow-[0_0_6px_#D6B477]"
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
