import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mama R's | Inventory and Sales Operations Dashboard | Ian Macabulos",
  description:
    "A custom TypeScript MERN stack application built for a local business. It features streamlined order processing, granular stock management, and financial reconciliation.",
  openGraph: {
    title: "Mama R's | Inventory and Sales Operations Dashboard | Ian Macabulos",
    description:
      "A custom TypeScript MERN stack application built for a local business. It features streamlined order processing, granular stock management, and financial reconciliation.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function MamaRsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}