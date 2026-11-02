import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { ChatWidget } from "@/components/layout/chat-widget";
import { PROJECTS } from "@/data/projects";
import { PERSON_ID, SITE_NAME, WEBSITE_ID, absoluteUrl } from "@/lib/seo";
import { getAllPostsMeta } from "@/lib/mdx";
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

const siteDescription =
  "I'm Ian Macabulos, a full-stack developer in the Philippines building reliable web applications, internal tools, and AI-powered products with polished interfaces.";
const siteTitle = "Ian Macabulos — Full-Stack Developer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev",
  ),
  title: {
    default: siteTitle,
    template: "%s | Ian Macabulos",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Ian Macabulos",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const commandEntries = {
    projects: PROJECTS.map(({ title, commandTitle, link }) => ({ title: commandTitle ?? title, href: link })),
    posts: getAllPostsMeta()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(({ title, slug }) => ({ title, href: `/blog/${slug}` })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: absoluteUrl(),
        alternateName: ["Ian Sebastian Macabulos", "Ian Macabulos Portfolio"],
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: absoluteUrl(),
        jobTitle: "Full-Stack Developer",
        image: absoluteUrl("/about/ian-macabulos-2026.webp"),
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
        <CommandMenuLoader entries={commandEntries} />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
