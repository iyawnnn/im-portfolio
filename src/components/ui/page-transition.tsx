"use client";

import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({
  children,
  pageKey,
}: {
  children: React.ReactNode;
  pageKey: number | string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
