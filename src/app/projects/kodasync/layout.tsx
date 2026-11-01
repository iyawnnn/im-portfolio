import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KodaSync - Developer Knowledge Workspace | Ian Macabulos",
  description:
    "A developer knowledge workspace for code, technical notes, and imported documentation, with semantic retrieval, project-scoped RAG chat, and a Monaco-powered Studio.",
  alternates: {
    canonical: "/projects/kodasync",
  },
  openGraph: {
    title: "KodaSync - Developer Knowledge Workspace | Ian Macabulos",
    description:
      "A developer knowledge workspace for code, technical notes, and imported documentation, with semantic retrieval, project-scoped RAG chat, and a Monaco-powered Studio.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function KodaSyncLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
