import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClimaPH | Weather for Everyday Decisions",
  description:
    "An early weather dashboard for Philippine locations, bringing current conditions, short-range forecasts, air quality, search, and interactive weather maps into one responsive interface.",
  alternates: {
    canonical: "/projects/climaph",
  },
  openGraph: {
    title: "ClimaPH | Weather for Everyday Decisions",
    description:
      "An early weather dashboard for Philippine locations, bringing current conditions, short-range forecasts, air quality, search, and interactive weather maps into one responsive interface.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
    url: "https://www.iansebastian.dev/projects/climaph",
  },
};

export default function ClimaPHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
