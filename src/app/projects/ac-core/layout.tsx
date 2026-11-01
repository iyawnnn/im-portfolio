import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AC-CORE - Municipal Reporting System | Ian Macabulos",
  description:
    "AC-CORE is a civic-tech team project designed around Angeles City?s municipal maintenance workflow, connecting geotagged resident reports with map-based review, evidence, and status history.",
  alternates: {
    canonical: "/projects/ac-core",
  },
  openGraph: {
    title: "AC-CORE - Municipal Reporting System | Ian Macabulos",
    description:
      "AC-CORE is a civic-tech team project designed around Angeles City?s municipal maintenance workflow, connecting geotagged resident reports with map-based review, evidence, and status history.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function AcCoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}