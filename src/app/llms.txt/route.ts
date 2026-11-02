import { PROJECTS } from "@/data/projects";
import { getAllPostsMeta } from "@/lib/mdx";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const PAGES = [
  ["About", "/about", "Background, approach to software, and what Ian is working toward."],
  ["Projects", "/projects", "Full-stack web applications, internal tools, civic platforms, and AI-powered products."],
  ["Experience", "/experience", "Professional experience, education, and certifications."],
  ["Tech Stack", "/stack", "Languages, frameworks, databases, and tools used to build and ship applications."],
  ["Blog", "/blog", "Writing on full-stack development, system design, and lessons from real projects."],
  ["Contact", "/contact", "Get in touch about development work, internships, or opportunities."],
] as const;

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPostsMeta().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const body = `# ${SITE_NAME}

> Portfolio of Ian Macabulos, a full-stack developer in the Philippines building reliable web applications, internal tools, and AI-powered products with polished interfaces.

Site: ${absoluteUrl()}

## Pages

${PAGES.map(([name, path, summary]) => `- [${name}](${absoluteUrl(path)}): ${summary}`).join("\n")}

## Projects

${PROJECTS.map((project) => `- [${project.commandTitle ?? project.title}](${absoluteUrl(project.link)}): ${project.description}`).join("\n")}

## Articles

${posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.description}`).join("\n")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
