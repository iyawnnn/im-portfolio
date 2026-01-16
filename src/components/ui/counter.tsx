"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export function Counter({
  value,
  direction = "up",
}: {
  value: number;
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // 1. Set the starting value
  const motionValue = useMotionValue(direction === "down" ? value : 0);

  // 2. SMOOTH SETTINGS:
  // - stiffness: 50 (Lower = Slower, more relaxed pull)
  // - damping: 15 (Lower = Less friction, allows it to glide to a stop)
  const springValue = useSpring(motionValue, {
    damping: 15,
    stiffness: 50,
  });

  // 3. Trigger when user scrolls 100px into view
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        // Format with commas (e.g., 1,000) and no decimals
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Number(latest.toFixed(0)),
        );
      }
    });
  }, [springValue]);

  return <span ref={ref} />;
}
