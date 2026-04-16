"use client";

import { LoaderHexagon } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-950">
      <LoaderHexagon />
    </div>
  );
}