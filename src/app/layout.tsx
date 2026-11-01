import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { ChatWidget } from "@/components/layout/chat-widget";
import { CommandMenuLoader } from "@/components/layout/command-menu-loader";
import { BrandIntro } from "@/components/layout/brand-intro";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/layout/custom-cursor";

// Decide before paint; the timeout releases the page even if hydration fails.
const brandIntroScript = `(() => {
  try {
    const key = 'ian-brand-intro-seen';
    const replay = ${process.env.NODE_ENV === "development"} && new URLSearchParams(location.search).get('intro') === '1';
    if (sessionStorage.getItem(key) && !replay) return;
    if (location.pathname === '/' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.setAttribute('data-brand-intro', '');
      const timeout = setTimeout(() => {
        document.documentElement.removeAttribute('data-brand-intro');
        try { sessionStorage.setItem(key, '1'); } catch {}
        document.dispatchEvent(new Event('brand-intro-complete'));
      }, 2300);
      document.addEventListener('brand-intro-complete', () => clearTimeout(timeout), { once: true });
    } else {
      sessionStorage.setItem(key, '1');
    }
  } catch {}
})();`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev",
  ),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Ian Macabulos",
    template: "%s | Ian Macabulos",
  },
  description:
    "A Full-Stack Developer based in the Philippines, crafting accessible and high-performance web applications with Next.js, TypeScript, and Node.js.",
  keywords: [
    "Ian Macabulos",
    "Ian Sebastian Macabulos",
    "Full-Stack Developer",
    "Web Developer Philippines",
    "Next.js Developer",
    "React",
    "TypeScript",
  ],
  openGraph: {
    title: "Ian Macabulos",
    description:
      "Building scalable, high-performance web applications with the modern tech stack.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev",
    siteName: "Ian Macabulos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian Macabulos",
    description: "Full-Stack Developer based in the Philippines.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Ian Macabulos",
        url: "https://www.iansebastian.dev",
        alternateName: ["Ian Sebastian Macabulos", "Ian Macabulos Portfolio"],
      },
      {
        "@type": "Person",
        name: "Ian Macabulos",
        url: "https://www.iansebastian.dev",
        jobTitle: "Full-Stack Developer",
        image: "https://www.iansebastian.dev/about/ian-macabulos-2026.webp",
        sameAs: [
          "https://www.linkedin.com/in/ianmacabulos/",
          "https://github.com/iyawnnn",
          "https://peerlist.io/iannmacabulos",
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: brandIntroScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BrandIntro />
          <SidebarProvider>
            <SmoothScroll />
            <CustomCursor />
            <LayoutWrapper>{children}</LayoutWrapper>
          </SidebarProvider>
        </ThemeProvider>
        <CommandMenuLoader />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
