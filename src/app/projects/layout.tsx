import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my collection of web development projects. A showcase of full-stack applications, frontend interfaces, and technical experiments built with modern tools.",
  openGraph: {
    title: "Projects | Ian Macabulos",
    description: "Explore my collection of web development projects. A showcase of full-stack applications, frontend interfaces, and technical experiments built with modern tools.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}