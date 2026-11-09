"use client";

import { useLinkStatus } from "next/link";
import { cn } from "@/lib/utils";

// Must render inside a <Link>. The delay keeps prefetched, instant navigations from flashing it.
export function LinkPendingIndicator({ className }: { className?: string }) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute size-1.5 rounded-full bg-current opacity-0 transition-opacity duration-200",
        pending && "opacity-100 delay-100 motion-safe:animate-pulse",
        className,
      )}
    />
  );
}
