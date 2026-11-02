import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "climaph",
  "ClimaPH — Philippine Weather Dashboard",
  "An early weather dashboard for Philippine locations, bringing current conditions, short-range forecasts, air quality, search, and interactive weather maps into one responsive interface.",
);

export default function ClimaPHLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="climaph" />
      {children}
    </>
  );
}
