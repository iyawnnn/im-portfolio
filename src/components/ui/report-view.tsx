"use client";

import { useEffect } from "react";

export function ReportView({ slug }: { slug: string }) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch(`/api/views/${slug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Failed to track view:", error);
      }
    };

    trackView();
  }, [slug]);

  return null; // This component is completely invisible
}