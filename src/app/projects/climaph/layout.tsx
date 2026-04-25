import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClimaPH | Comprehensive Weather Forecasting System for the Philippines",
  description:
    "A specialized weather system built with Next.js 16 and MapLibre. View 3-day forecasts with precise temperature data for morning, afternoon, evening, and night across the Philippines.",
  openGraph: {
    title: "ClimaPH | Comprehensive Weather Forecasting System for the Philippines",
    description:
      "A specialized weather system built with Next.js 16 and MapLibre. View 3-day forecasts with precise temperature data for morning, afternoon, evening, and night across the Philippines.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
    url: "https://iansebastian.dev/projects/climaph",
  },
};

export default function ClimaPHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}