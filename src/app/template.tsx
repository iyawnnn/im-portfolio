"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      // 1. Initial State: Invisible and slightly shifted down
      initial={{ opacity: 0, y: 20 }}
      // 2. Animate To: Fully visible and in natural position
      animate={{ opacity: 1, y: 0 }}
      // 3. Transition: Smooth ease-in-out curve over 0.5 seconds
      transition={{ ease: "easeInOut", duration: 0.5 }}
      // Ensure it takes up full space
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
