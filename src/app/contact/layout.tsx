import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for freelance projects, internships, or full-time opportunities. Let's build something awesome together.",
  openGraph: {
    title: "Contact | Ian Macabulos",
    description:
      "Get in touch for freelance projects, internships, or full-time opportunities. Let's build something awesome together.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
