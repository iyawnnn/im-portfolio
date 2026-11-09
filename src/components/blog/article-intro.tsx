"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ArticleIntroProps = {
  children?: ReactNode;
  className: string;
};

export function ArticleIntro({ children, className }: ArticleIntroProps) {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current;
    if (!intro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (intro.getBoundingClientRect().top < window.innerHeight) return;

    intro.dataset.waiting = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      intro.dataset.articleIntroReady = "true";
      delete intro.dataset.waiting;
      observer.disconnect();
    });

    observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={introRef} data-article-intro="true" className={className}>
      {children}
    </div>
  );
}
