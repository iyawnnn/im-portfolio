import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UA LabSign — Laboratory Attendance System | Ian Macabulos",
  description:
    "UA LabSign replaces manual laboratory attendance with web and Android check-ins using device-bound ECDSA P-256 signatures, client-side geofence checks, and short-lived room PINs.",
  alternates: {
    canonical: "/projects/ua-attendance",
  },
  openGraph: {
    title: "UA LabSign — Laboratory Attendance System | Ian Macabulos",
    description:
      "UA LabSign replaces manual laboratory attendance with web and Android check-ins using device-bound ECDSA P-256 signatures, client-side geofence checks, and short-lived room PINs.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function UAAttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}