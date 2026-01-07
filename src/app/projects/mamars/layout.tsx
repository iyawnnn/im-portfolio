import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mama R's - Inventory & Sales Management System - Ian Macabulos",
  description: "A custom MERN stack application built for business digitization. Features secure inventory tracking, real-time sales dashboards, and role-based authentication.",
  openGraph: {
    title: "Mama R's - Inventory & Sales Management System - Ian Macabulos",
    description: "A custom MERN stack application built for business digitization. Features secure inventory tracking, real-time sales dashboards, and role-based authentication.",
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