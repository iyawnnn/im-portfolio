"use client";

import { useEffect, useRef } from "react";
import styles from "./custom-cursor.module.css";

const INTERACTIVE = 'a, button, select, summary, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="option"], [role="checkbox"], [role="switch"], [role="radio"], [data-cursor="interactive"]';
const TEXT_INPUT = 'input, textarea, [contenteditable="true"], [data-cursor="text"]';
const SELECTABLE_TEXT = 'article, p, h1, h2, h3, h4, h5, h6, blockquote, li, pre, code';
const HOTSPOT = {
  arrow: { x: 1.5, y: 1.5 },
  hand: { x: 9, y: 1.5 },
  text: { x: 9.5, y: 10.5 },
};

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const burst = burstRef.current;
    if (!cursor || !burst) return;

    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let lastTarget: Element | null = null;

    const hide = () => {
      cursor.dataset.visible = "false";
      cursor.dataset.pressed = "false";
    };

    const updateTarget = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      if (element === lastTarget) return;
      lastTarget = element;
      const hasText = Array.from(element?.childNodes ?? []).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      cursor.dataset.mode = element?.closest('[data-cursor="default"]')
        ? "default"
        : element?.closest(TEXT_INPUT)
          ? "text"
        : element?.closest(INTERACTIVE)
          ? "interactive"
          : element?.closest(SELECTABLE_TEXT) || hasText
            ? "text"
            : "default";
    };

    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      updateTarget(event.target);

      if (!document.documentElement.hasAttribute("data-custom-cursor-active")) {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        document.documentElement.setAttribute("data-custom-cursor-active", "");
      }
      cursor.dataset.visible = "true";

      if (!frame) {
        frame = requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          frame = 0;
        });
      }
    };

    const press = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType === "touch" || event.button !== 0) return;
      move(event);
      if (cursor.dataset.mode === "text") return;

      cursor.dataset.pressed = "true";
      burst.style.transform = `translate3d(${event.clientX - 24}px, ${event.clientY - 24}px, 0)`;
      burst.classList.remove(styles.firing);
      void burst.getBoundingClientRect();
      burst.classList.add(styles.firing);
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const over = (event: PointerEvent) => {
      if (finePointer.matches && event.pointerType !== "touch") updateTarget(event.target);
    };

    const visibility = () => {
      if (document.hidden) hide();
    };

    const pointerChange = () => {
      if (!finePointer.matches) {
        hide();
        document.documentElement.removeAttribute("data-custom-cursor-active");
      }
    };

    const hidePress = () => {
      cursor.dataset.pressed = "false";
    };

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", hidePress);
    document.addEventListener("pointercancel", hidePress);
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", hide);
    finePointer.addEventListener("change", pointerChange);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-custom-cursor-active");
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", hidePress);
      document.removeEventListener("pointercancel", hidePress);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("blur", hide);
      finePointer.removeEventListener("change", pointerChange);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={styles.cursor} data-visible="false" data-mode="default" data-pressed="false" aria-hidden="true">
        <svg className={styles.arrow} style={{ left: -HOTSPOT.arrow.x, top: -HOTSPOT.arrow.y }} width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
          <path d="M1.5 1.5 1.7 18.2l3.9-5 9.4-.2L1.5 1.5Z" />
        </svg>
        <svg className={styles.hand} style={{ left: -HOTSPOT.hand.x, top: -HOTSPOT.hand.y }} width="22" height="23" viewBox="0 0 22 23" fill="none" aria-hidden="true">
          <path d="M7.5 14.5V3a1.5 1.5 0 0 1 3 0v6c0-1.8 3-1.8 3 0 0-1.8 3-1.8 3 0 0-1.8 3-1.8 3 0v5.8c0 3.1-2.2 5.4-5.3 5.4h-3.3c-1.3 0-2.5-.6-3.3-1.6l-4-4.9a1.6 1.6 0 0 1 2.5-2l2.4 2.8Z" />
          <path d="M10.5 9v2.4m3-2.4v2.4m3-2.4v2.4" />
        </svg>
        <svg className={styles.ibeam} style={{ left: -HOTSPOT.text.x, top: -HOTSPOT.text.y }} width="19" height="21" viewBox="0 0 19 21" fill="none" aria-hidden="true">
          <path d="M5.5 2.5h8M9.5 2.5v16M5.5 18.5h8" />
        </svg>
      </div>
      <svg ref={burstRef} className={styles.burst} width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <g>
          <path d="M17.5 24h-6M19.4 19.4l-4.2-4.2M24 17.5v-6M28.6 19.4l4.2-4.2M19.4 28.6l-4.2 4.2" />
        </g>
      </svg>
    </>
  );
}
