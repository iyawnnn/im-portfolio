"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function GiscusComments() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <div className="mt-12 min-h-40 w-full pt-8">
      {mounted ? (
        <Giscus
          id="comments"
          repo={process.env.NEXT_PUBLIC_GISCUS_REPO as `${string}/${string}`}
          repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID!}
          category={process.env.NEXT_PUBLIC_GISCUS_CATEGORY!}
          categoryId={process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!}
          mapping="pathname"
          reactionsEnabled="0"
          emitMetadata="0"
          inputPosition="bottom"
          theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
          lang="en"
          loading="lazy"
        />
      ) : (
        <div className="h-24 w-full rounded-xl border border-border/50 bg-muted/20" role="status" aria-label="Loading comments" />
      )}
    </div>
  );
}
