import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "kodasync",
  "KodaSync — Developer Knowledge Workspace",
  "A developer knowledge workspace for code, technical notes, and imported documentation, with semantic retrieval, project-scoped RAG chat, and a Monaco-powered Studio.",
);

export default function KodaSyncLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="kodasync" />
      {children}
    </>
  );
}
