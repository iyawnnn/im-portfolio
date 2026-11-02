import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "better-san-fernando",
  "Better San Fernando — Civic Information Platform",
  "An independent, open-source civic-information and transparency portal for San Fernando, Pampanga, built around reviewed public sources and resident-oriented search.",
);

export default function BetterSanFernandoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="better-san-fernando" />
      {children}
    </>
  );
}
