import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { getAllPostsMeta } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";

const CORE_PATHS = ["/", "/about", "/projects", "/stack", "/experience", "/contact", "/blog"];

// Only blog posts carry a trustworthy date; other pages omit lastModified rather than invent freshness.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
  }));

  return [
    ...CORE_PATHS.map((path) => ({ url: absoluteUrl(path) })),
    ...PROJECTS.map((project) => ({ url: absoluteUrl(project.link) })),
    ...posts,
  ];
}
