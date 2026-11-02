import type { Metadata } from "next";
import { PROJECTS, PROJECTS_PER_PAGE } from "@/data/projects";
import { pageMetadata, paginatedPath } from "@/lib/seo";
import { ProjectsPage } from "./projects-page";

type SearchParams = Promise<{ page?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const totalPages = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);
  const page = Math.min(Math.max(Number((await searchParams).page) || 1, 1), totalPages);

  return pageMetadata({
    title: "Projects",
    description:
      "Explore projects by Ian Macabulos, including full-stack web applications, internal tools, civic platforms, and AI-powered products built across frontend and backend systems.",
    path: paginatedPath("/projects", page),
  });
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return <ProjectsPage searchParams={searchParams} />;
}
