import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "thryve",
  "Thryve — Health Tracking Application",
  "An academic full-stack health tracker that brings workouts, meals, water intake, sleep, personal targets, progress views, and achievements into one authenticated application.",
);

export default function ThryveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="thryve" />
      {children}
    </>
  );
}
