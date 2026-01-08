import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";

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
  // 1. Base URL
  metadataBase: new URL("https://iansebastian.dev"),

  // 2. Title
  title: "Ian Macabulos",

  // 3. Description
  description:
    "A Full-Stack Developer based in the Philippines, crafting accessible and high-performance web applications with Next.js, TypeScript, and Node.js.",

  // 4. Keywords
  keywords: [
    "Ian Macabulos",
    "Ian Sebastian Macabulos",
    "Full-Stack Developer",
    "Web Developer Philippines",
    "Next.js Developer",
    "React",
    "TypeScript",
  ],

  // 5. Open Graph
  openGraph: {
    title: "Ian Macabulos",
    description:
      "Building scalable, high-performance web applications with the modern tech stack.",
    url: "https://iansebastian.dev",
    siteName: "Ian Macabulos",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/about/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Ian Macabulos Profile",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- JSON-LD DATA FOR GOOGLE SITE NAME ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ian Macabulos",
    alternateName: ["Ian Sebastian Macabulos", "Ian Macabulos Portfolio"],
    url: "https://iansebastian.dev",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Injecting the JSON-LD script for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistSans.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}