"use client";

import { useEffect, useRef } from "react";
import styles from "./animated-backgrounds.module.css";

export const MeteorField = () => {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const observer = new IntersectionObserver(([entry]) => {
      field.classList.toggle(styles.paused, !entry.isIntersecting);
    }, { rootMargin: "100px" });

    observer.observe(field);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={fieldRef} aria-hidden="true" className={`${styles.meteors} ${styles.paused}`}>
      {Array.from({ length: 5 }, (_, index) => <span key={index} className={styles.meteor} />)}
    </div>
  );
};

// EFFECT 2: Sonar Radar (rings are clipped by the card, anchored on the right)
export const Radar = () => (
  <div aria-hidden="true" className={`${styles.radar} absolute inset-0 overflow-hidden pointer-events-none select-none opacity-70 md:opacity-100`}>
    <div className={styles.origin}>
      {Array.from({ length: 3 }, (_, index) => <span key={index} className={styles.ring} />)}
    </div>
  </div>
);
