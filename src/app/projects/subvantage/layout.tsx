import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "subvantage",
  "SubVantage — Subscription Management Dashboard",
  "A subscription-management dashboard comparing recurring costs across currencies, billing cycles, trials, and personal shares, with renewals, reminders, and cancellation history.",
);

export default function SubVantageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="subvantage" />
      {children}
    </>
  );
}
