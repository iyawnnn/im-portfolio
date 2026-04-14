"use client";

import { LoaderThree } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex w-full flex-1 items-center justify-center min-h-[calc(100dvh-12rem)]">
      <LoaderThree />
    </div>
  );
}
