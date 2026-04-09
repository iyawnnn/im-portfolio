import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AC-CORE - Municipal Reporting System | Ian Macabulos",
  description:
    "A proactive GovTech platform for Angeles City featuring Geospatial Signal Routing (GSR) to predict flooding risks and a Paved Paradox algorithm to prioritize infrastructure repairs.",
  openGraph: {
    title: "AC-CORE - Municipal Reporting System | Ian Macabulos",
    description:
      "A proactive GovTech platform for Angeles City featuring Geospatial Signal Routing (GSR) to predict flooding risks and a Paved Paradox algorithm to prioritize infrastructure repairs.",
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