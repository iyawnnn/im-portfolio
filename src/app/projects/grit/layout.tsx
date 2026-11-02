import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "grit",
  "Grit — AI-Powered Job Tracker",
  "Grit brings job applications, resumes, match reports, and interview preparation into one career-search workflow. A saved role becomes the context for both application tracking and AI-assisted preparation.",
);

export default function GritLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="grit" />
      {children}
    </>
  );
}
