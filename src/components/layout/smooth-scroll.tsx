"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Lenis from "lenis";

const SCROLL_LERP = 0.1;

export function SmoothScroll() {
  // Pagination only changes the query, so it needs the same reset as a route change.
  const url = `${usePathname()}?${useSearchParams()}`;
  const lenisRef = useRef<Lenis | null>(null);
  const previousUrl = useRef(url);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: SCROLL_LERP,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 1,
      anchors: true,
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
      overscroll: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (url === previousUrl.current) return;
    previousUrl.current = url;
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.stop();
    lenis.start();
  }, [url]);

  return null;
}
