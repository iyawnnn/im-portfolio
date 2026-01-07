import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClimaPH - Advanced Weather Forecasting Platform | Ian Macabulos",
  description: "A high-performance weather application for the Philippines built with Next.js 15. Features real-time forecasts, lifestyle metrics, and smart caching.",
  openGraph: {
    title: "ClimaPH - Advanced Weather Forecasting Platform | Ian Macabulos",
    description: "A high-performance weather application for the Philippines built with Next.js 15. Features real-time forecasts, lifestyle metrics, and smart caching.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function ClimaPHLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}