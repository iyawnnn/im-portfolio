import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thryve - Unified Health & Fitness Ecosystem | Ian Macabulos",
  description: "A full-stack health application built on the MEVN stack (MongoDB, Vue.js, Node.js). Features workout logging, nutrition tracking, and gamified achievements.",
  openGraph: {
    title: "Thryve - Unified Health & Fitness Ecosystem | Ian Macabulos",
    description: "A full-stack health application built on the MEVN stack (MongoDB, Vue.js, Node.js). Features workout logging, nutrition tracking, and gamified achievements.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function ThryveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}