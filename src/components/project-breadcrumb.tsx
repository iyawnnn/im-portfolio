import { PROJECTS } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./json-ld";

export function ProjectBreadcrumb({ slug }: { slug: string }) {
  const path = `/projects/${slug}`;
  const project = PROJECTS.find((entry) => entry.link === path);
  if (!project) return null;

  return (
    <JsonLd
      data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: project.commandTitle ?? project.title, path },
      ])}
    />
  );
}
