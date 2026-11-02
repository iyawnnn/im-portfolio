import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "ac-core",
  "AC-CORE — Municipal Reporting System",
  "AC-CORE is a civic-tech team project designed around Angeles City’s municipal maintenance workflow, connecting geotagged resident reports with map-based review, evidence, and status history.",
);

export default function AcCoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="ac-core" />
      {children}
    </>
  );
}
