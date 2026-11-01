"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

const SCROLL_LERP = 0.1;

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPathname = useRef(pathname);

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
    if (pathname === previousPathname.current) return;
    previousPathname.current = pathname;
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.stop();
    lenis.start();
  }, [pathname]);

  return null;
}
