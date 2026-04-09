import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grit - AI-Powered Job Tracker | Ian Macabulos",
  description:
    "A comprehensive career management platform built with the TALL stack and Groq AI. Features include secure resume parsing, automated cover letter generation, and interactive mock interviews.",
  openGraph: {
    title: "Grit - AI-Powered Job Tracker | Ian Macabulos",
    description:
      "A comprehensive career management platform built with the TALL stack and Groq AI. Features include secure resume parsing, automated cover letter generation, and interactive mock interviews.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function GritLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}