import type { Metadata } from "next";

const title = "Neffi | Ian Macabulos";
const description =
  "A physical-and-digital NFC card platform connecting permanent card URLs, secure activation, customizable Profiles and Scenes, and a public tap or QR experience.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/projects/neffi" },
  openGraph: {
    title,
    description,
    url: "/projects/neffi",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
    images: [{
      url: "/projects/neffi/cover.webp",
      width: 1920,
      height: 1080,
      alt: "Neffi NFC Digital Business Card product homepage",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/projects/neffi/cover.webp"],
  },
};

export default function NeffiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
