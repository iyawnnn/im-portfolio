"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

export function ViewCounter({ slug, trackView = false }: { slug: string, trackView?: boolean }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const method = trackView ? "POST" : "GET";
        const res = await fetch(`/api/views/${slug}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to fetch views:", error);
      }
    };

    fetchViews();
  }, [slug, trackView]);

  if (views === null) {
    return <div className="h-4 w-12 animate-pulse bg-muted/50 rounded" />;
  }

  return (
    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
      <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      <span>{views} {views === 1 ? 'view' : 'views'}</span>
    </div>
  );
}