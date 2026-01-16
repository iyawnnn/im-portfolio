import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View my professional experience, education history from Holy Angel University, and certifications in Web Development.",
  openGraph: {
    title: "Resume | Ian Macabulos",
    description:
      "View my professional experience, education history from Holy Angel University, and certifications in Web Development.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
