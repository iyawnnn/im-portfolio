import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grit - AI-Powered Job Tracker | Ian Macabulos",
  description:
    "Grit brings job applications, resumes, match reports, and interview preparation into one career-search workflow. A saved role becomes the context for both application tracking and AI-assisted preparation.",
  alternates: {
    canonical: "/projects/grit",
  },
  openGraph: {
    title: "Grit - AI-Powered Job Tracker | Ian Macabulos",
    description:
      "Grit brings job applications, resumes, match reports, and interview preparation into one career-search workflow. A saved role becomes the context for both application tracking and AI-assisted preparation.",
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