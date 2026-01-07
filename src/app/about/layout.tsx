import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Ian Macabulos",
  description: "I am a 3rd-year IT student and Web Developer based in the Philippines. Learn more about my career goals, skills, and background.",
  openGraph: {
    title: "About Me | Ian Macabulos",
    description: "I am a 3rd-year IT student and Web Developer based in the Philippines. Learn more about my career goals, skills, and background.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}