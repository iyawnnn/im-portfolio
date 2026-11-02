import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "ua-attendance",
  "UA LabSign — Laboratory Attendance System",
  "UA LabSign replaces manual laboratory attendance with web and Android check-ins using device-bound ECDSA P-256 signatures, client-side geofence checks, and short-lived room PINs.",
);

export default function UaAttendanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="ua-attendance" />
      {children}
    </>
  );
}
