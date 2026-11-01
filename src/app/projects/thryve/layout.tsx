import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thryve | Full-Stack Health Tracking Application",
  description:
    "A third-year academic full-stack health tracker that brings workouts, meals, water intake, sleep, personal targets, progress views, and achievements into one authenticated application.",
  alternates: {
    canonical: "/projects/thryve",
  },
  openGraph: {
    title: "Thryve | Full-Stack Health Tracking Application",
    description:
      "A third-year academic full-stack health tracker that brings workouts, meals, water intake, sleep, personal targets, progress views, and achievements into one authenticated application.",
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
