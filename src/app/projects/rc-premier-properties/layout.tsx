import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "rc-premier-properties",
  "RC Premier Properties — Real Estate Discovery & Inquiry Platform",
  "A real estate website Ian designed and developed for RC Premier Properties, connecting property discovery, inquiries, viewing requests, and staff administration.",
);

export default function RcPremierPropertiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="rc-premier-properties" />
      {children}
    </>
  );
}
