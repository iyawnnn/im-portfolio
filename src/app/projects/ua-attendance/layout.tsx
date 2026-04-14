import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "University of Assumption Laboratory Attendance - Cryptographic Tracking Platform | Ian Macabulos",
  description:
    "A zero-trust educational platform for the University of Assumption featuring browser geolocation APIs and Elliptic Curve Digital Signature Algorithm (ECDSA) to eliminate proxy attendance fraud.",
  openGraph: {
    title: "UA Laboratory Attendance - Cryptographic Tracking Platform | Ian Macabulos",
    description:
      "A zero-trust educational platform for the University of Assumption featuring browser geolocation APIs and Elliptic Curve Digital Signature Algorithm (ECDSA) to eliminate proxy attendance fraud.",
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