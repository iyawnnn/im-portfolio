import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "neffi",
  "Neffi — NFC Digital Business Card Platform",
  "A physical-and-digital NFC card platform connecting permanent card URLs, secure activation, customizable Profiles and Scenes, and a public tap or QR experience.",
);

export default function NeffiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="neffi" />
      {children}
    </>
  );
}
