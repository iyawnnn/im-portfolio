import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SubVantage - Recurring Spending Dashboard | Ian Macabulos",
  description:
    "A subscription-management dashboard comparing recurring costs across currencies, billing cycles, trials, and personal shares, with renewals, reminders, and cancellation history.",
  alternates: {
    canonical: "/projects/subvantage",
  },
  openGraph: {
    title: "SubVantage - Recurring Spending Dashboard | Ian Macabulos",
    description:
      "A subscription-management dashboard comparing recurring costs across currencies, billing cycles, trials, and personal shares, with renewals, reminders, and cancellation history.",
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
