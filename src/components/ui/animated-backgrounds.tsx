"use client";

import { useEffect, useState } from "react";
import styles from "./animated-backgrounds.module.css";

// EFFECT 1: Moving Dots (Good visibility, calm float)
export const MovingDots = () => {
  const [dots, setDots] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    // Use requestIdleCallback or a small timeout to let the page finish loading first
    const timer = setTimeout(() => {
      const newDots = new Array(15).fill(null).map(() => ({
        left: `${Math.random() * 100}%`,
        "--dot-width": `${Math.random() * 8 + 4}px`,
        "--dot-height": `${Math.random() * 8 + 4}px`,
        "--dot-delay": `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
      }));
      setDots(newDots);
    }, 100); // 100ms delay gives the UI time to breath

    return () => clearTimeout(timer);
  }, []);

  return (
    <div aria-hidden="true" className={`${styles.dots} absolute inset-0 left-1/2 md:left-0 overflow-hidden pointer-events-none select-none transform-gpu`}>
      {dots.map((style, idx) => (
        <span
          key={idx}
          // ADDED: will-change-transform
          className={`${styles.dot} absolute bg-primary/30 rounded-full animate-float backdrop-blur-[1px] shadow-sm will-change-transform`}
          style={style}
        />
      ))}
    </div>
  );
};

// EFFECT 2: Minimalist Radar (3 Waves, Slower, Thinner)
export const Radar = () => {
  return (
    <div aria-hidden="true" className={`${styles.radar} absolute inset-0 overflow-hidden pointer-events-none select-none opacity-70 md:opacity-100`}>
      {/* Position: Bottom-Right Corner */}
      <div className="absolute -bottom-8 -right-8 h-40 w-40 md:-bottom-12 md:-right-12 md:h-64 md:w-64 flex items-center justify-center">
        {/* Wave 1 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDuration: "4s" }}
        />

        {/* Wave 2 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDelay: "1.2s", animationDuration: "4s" }}
        />

        {/* Wave 3 */}
        <div
          className="absolute h-full w-full rounded-full border border-primary/20 animate-ripple"
          style={{ animationDelay: "2.4s", animationDuration: "4s" }}
        />

        {/* Center Glow (Softer) */}
        <div className="absolute h-16 w-16 md:h-24 md:w-24 rounded-full bg-primary/10 blur-2xl" />
      </div>
    </div>
  );
};
