"use client";

import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasOrderedEntrance = /^\/(projects|blog|about|resume|contact|stack)(\/|$)/.test(pathname);

  return <div className={`${hasOrderedEntrance ? "" : "page-enter "}h-full w-full`}>{children}</div>;
}
