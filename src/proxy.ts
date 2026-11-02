import { NextResponse, type NextRequest } from "next/server";
import { PROJECTS, PROJECTS_PER_PAGE } from "@/data/projects";
import { POSTS_PER_PAGE, getAllPostsMeta } from "@/lib/mdx";
import { pageRedirectTarget } from "@/lib/seo";

// Pagination redirects live here because streamed pages can't send a real HTTP status after the loader has started.
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const items = pathname === "/projects" ? PROJECTS.length : getAllPostsMeta().length;
  const perPage = pathname === "/projects" ? PROJECTS_PER_PAGE : POSTS_PER_PAGE;
  const target = pageRedirectTarget(pathname, searchParams.get("page") ?? undefined, Math.max(1, Math.ceil(items / perPage)));
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  const [path, query] = target.split("?");
  url.pathname = path;
  url.search = query ? `?${query}` : "";
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ["/projects", "/blog"] };
