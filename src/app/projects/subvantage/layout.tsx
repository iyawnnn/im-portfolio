import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SubVantage - Intelligent Subscription Manager | Ian Macabulos",
  description:
    "Regain control of recurring expenses. A financial dashboard built with Next.js 15 and Supabase featuring real-time burn forecasts, multi-currency support, and smart alerts via Resend.",
  openGraph: {
    title: "SubVantage - Intelligent Subscription Manager | Ian Macabulos",
    description:
      "Regain control of recurring expenses. A financial dashboard built with Next.js 15 and Supabase featuring real-time burn forecasts, multi-currency support, and smart alerts via Resend.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function SubVantageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
