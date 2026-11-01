import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mama R's | Internal Bakery Operations System | Ian Macabulos",
  description:
    "Mama R's is an internal bakery operations system connecting orders, payments, inventory movement, expenses, reporting, and end-of-day cash reconciliation.",
  alternates: {
    canonical: "/projects/mamars",
  },
  openGraph: {
    title: "Mama R's | Internal Bakery Operations System | Ian Macabulos",
    description:
      "Mama R's is an internal bakery operations system connecting orders, payments, inventory movement, expenses, reporting, and end-of-day cash reconciliation.",
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