import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "mamars",
  "Mama R's — Bakery Operations System",
  "Mama R's is an internal bakery operations system connecting orders, payments, inventory movement, expenses, reporting, and end-of-day cash reconciliation.",
);

export default function MamaRsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="mamars" />
      {children}
    </>
  );
}
