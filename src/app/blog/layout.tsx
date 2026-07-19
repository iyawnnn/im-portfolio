import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on web development, minimalist design, and building scalable applications.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Ian Macabulos",
    description:
      "Thoughts on web development, minimalist design, and building scalable applications.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}