"use client";

import { LoaderHexagon } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex flex-1 w-full items-center justify-center min-h-[calc(100dvh-10rem)] lg:min-h-[100dvh]">
      <LoaderHexagon />
    </div>
  );
}