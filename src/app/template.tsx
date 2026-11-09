"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const hasOrderedEntrance = /^\/(projects|blog|about|experience|contact|stack)(\/|$)/.test(pathname);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.removeAttribute("data-pagination");

    const onPopState = () => {
      if (window.location.pathname === pathname) root.dataset.pagination = "true";
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className={`${hasOrderedEntrance ? "" : "page-enter "}h-full w-full`}
      onClickCapture={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!link) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin && url.pathname === pathname && url.search !== window.location.search) {
          // Pagination keeps the current results visible until the next page is ready.
          rootRef.current?.setAttribute("data-pagination", "true");
        }
      }}
    >
      {children}
    </div>
  );
}
