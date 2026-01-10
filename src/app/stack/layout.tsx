import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Stack",
  description: "Explore my development arsenal. A comprehensive list of languages, frameworks, and tools I use, including Next.js, React, Node.js, and PostgreSQL.",
  openGraph: {
    title: "Tech Stack | Ian Macabulos",
    description: "Explore my development arsenal. A comprehensive list of languages, frameworks, and tools I use, including Next.js, React, Node.js, and PostgreSQL.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}