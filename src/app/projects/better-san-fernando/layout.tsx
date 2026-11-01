import type { Metadata } from "next";

const title = "Better San Fernando | Ian Macabulos";
const description =
  "An independent, open-source civic-information and transparency portal for San Fernando, Pampanga, built around reviewed public sources and resident-oriented search.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects/better-san-fernando" },
  openGraph: {
    title,
    description,
    url: "/projects/better-san-fernando",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
    images: [{
      url: "/projects/better-san-fernando/cover.webp",
      width: 1920,
      height: 1080,
      alt: "Better San Fernando civic portal homepage",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/projects/better-san-fernando/cover.webp"],
  },
};

export default function BetterSanFernandoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
