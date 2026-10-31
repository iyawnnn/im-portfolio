"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { IanMark } from "@/components/brand/ian-mark";
import styles from "./brand-intro.module.css";

export function BrandIntro() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [present, setPresent] = useState(true);

  useEffect(() => {
    if (!present) return;
    const root = document.documentElement;
    const overlay = overlayRef.current;
    const page = document.querySelector<HTMLElement>("[data-brand-intro-page]");
    const wasInert = page?.inert ?? false;
    const release = () => {
      root.removeAttribute("data-brand-intro");
      document.dispatchEvent(new Event("brand-intro-complete"));
      if (page) page.inert = wasInert;
      try {
        sessionStorage.setItem("ian-brand-intro-seen", "1");
      } catch {
        // Disabled storage should never block access to the page.
      }
    };
    let cancelled = false;
    let active = false;
    const finish = () => {
      if (cancelled) return;
      release();
      setPresent(false);
    };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    const preventScroll = (event: Event) => event.preventDefault();
    const preventScrollKey = (event: KeyboardEvent) => {
      if ([" ", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
        event.preventDefault();
      }
    };
    const frame = requestAnimationFrame(() => {
      if (!root.hasAttribute("data-brand-intro") || pathname !== "/" || !overlay) {
        root.removeAttribute("data-brand-intro");
        setPresent(false);
        return;
      }
      active = true;
      if (page) page.inert = true;
      overlay.addEventListener("wheel", preventScroll, { passive: false });
      overlay.addEventListener("touchmove", preventScroll, { passive: false });
      document.addEventListener("keydown", preventScrollKey);
      motion.addEventListener("change", onMotionChange);
      const animation = overlay.getAnimations()[0];
      if (animation) void animation.finished.then(finish, () => {});
      else finish();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", onMotionChange);
      overlay?.removeEventListener("wheel", preventScroll);
      overlay?.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("keydown", preventScrollKey);
      if (active) release();
    };
  }, [pathname, present]);

  if (!present) return null;

  return (
    <div
      ref={overlayRef}
      className={`${styles.overlay} fixed inset-0 z-[200] place-items-center bg-background text-foreground`}
      aria-hidden="true"
      data-brand-intro-overlay
    >
      <IanMark className={styles.mark} />
    </div>
  );
}
