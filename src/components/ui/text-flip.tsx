"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type TextFlipProps = {
  words: readonly string[];
  className?: string;
  startDelay?: number;
};

export function TextFlip({ words, className, startDelay = 3200 }: TextFlipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(!document.hidden);

    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isInView || !isDocumentVisible || words.length < 2) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    const advance = () => setIndex((currentIndex) => (currentIndex + 1) % words.length);
    const start = () => {
      timeout = setTimeout(() => {
        advance();
        interval = setInterval(advance, 3200);
      }, startDelay);
    };

    if (document.documentElement.hasAttribute("data-brand-intro")) {
      document.addEventListener("brand-intro-complete", start, { once: true });
    } else {
      start();
    }

    return () => {
      document.removeEventListener("brand-intro-complete", start);
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isDocumentVisible, isInView, shouldReduceMotion, words.length, startDelay]);

  return (
    <span
      ref={ref}
      className={cn("inline-grid max-w-full overflow-hidden text-left", className)}
    >
      {words.map((word) => (
        <span
          key={word}
          aria-hidden="true"
          className="col-start-1 row-start-1 invisible min-w-0"
        >
          {word}
        </span>
      ))}
      {shouldReduceMotion ? (
        <span className="col-start-1 row-start-1 min-w-0">{words[0]}</span>
      ) : (
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={words[index]}
            className="col-start-1 row-start-1 min-w-0"
            initial={{ y: "-20%", opacity: 0, filter: "blur(1px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "35%", opacity: 0, filter: "blur(1px)" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      )}
    </span>
  );
}
