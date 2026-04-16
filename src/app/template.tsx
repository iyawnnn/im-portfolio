"use client";

import { motion, useAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const controls = useAnimation();

  useEffect(() => {
    // 1. Instantly reset the DOM to the hidden state when the route changes
    controls.set({ opacity: 0, y: 20 });
    
    // 2. Manually trigger the fade-in animation
    controls.start({
      opacity: 1,
      y: 0,
      transition: { ease: "easeInOut", duration: 0.5 },
    });
  }, [pathname, controls]);

  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, y: 20 }} // Preserves the animation for the very first SSR load
      animate={controls}
    >
      {children}
    </motion.div>
  );
}