import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";

export const SITE_NAME = "Ian Macabulos";
export const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev").replace(/\/+$/, "");
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_IMAGE = "/opengraph-image.png";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
};

// The root template brands <title>; Open Graph and Twitter titles are not templated, so they get the suffix here.
export function pageMetadata({ title, description, path, image = DEFAULT_IMAGE, publishedTime }: PageSeo): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;
  const openGraphType = publishedTime
    ? { type: "article" as const, publishedTime, authors: [SITE_NAME] }
    : { type: "website" as const };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      ...openGraphType,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

export function projectMetadata(slug: string, title: string, description: string): Metadata {
  const path = `/projects/${slug}`;
  const image = PROJECTS.find((project) => project.link === path)?.image;
  return pageMetadata({ title, description, path, image });
}

export function paginatedPath(basePath: string, page: number) {
  return page > 1 ? `${basePath}?page=${page}` : basePath;
}

export function absoluteUrl(path = "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

// Canonical page for a ?page= value: null means the value is absent or already canonical (no redirect needed).
export function pageRedirectTarget(basePath: string, raw: string | undefined, totalPages: number) {
  if (raw === undefined) return null;
  const page = /^[1-9]\d*$/.test(raw) ? Math.min(Number(raw), totalPages) : 1;
  const target = paginatedPath(basePath, page);
  return page === Number(raw) && page > 1 ? null : target;
}
