import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Allow all bots (Google, Bing, etc.)
      allow: "/", // Allow them to visit every page
    },
    sitemap: "https://iansebastian.dev/sitemap.xml",
  };
}
