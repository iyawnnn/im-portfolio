import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KusinaGo - Full-Stack Food Ordering System | Ian Macabulos",
  description: "A comprehensive food ordering system built with PHP and MongoDB. Features dynamic cart management, admin dashboards, and sales reporting.",
  openGraph: {
    title: "KusinaGo - Full-Stack Food Ordering System | Ian Macabulos",
    description: "A comprehensive food ordering system built with PHP and MongoDB. Features dynamic cart management, admin dashboards, and sales reporting.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function KusinaGoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}