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
  // 1. Base URL: Helps Google understand domain structure
  metadataBase: new URL("https://iansebastian.dev"),

  // 2. Title Template: 
  // "default" is for the Home page.
  // "template" is for other pages (e.g., "Projects | Ian Macabulos")
  title: {
    default: "Ian Macabulos - Full-Stack Developer",
    template: "%s | Ian Macabulos",
  },

  // 3. Description:
  // Simplified, natural language loaded with keywords (Next.js, Philippines, Scalable).
  description:
    "A Full-Stack Developer based in the Philippines, crafting accessible and high-performance web applications with Next.js, TypeScript, and Node.js.",

  // 4. Keywords: Helps search engines categorize your site
  keywords: [
    "Ian Macabulos",
    "Ian Sebastian Macabulos",
    "Full-Stack Developer",
    "Web Developer Philippines",
    "Next.js Developer",
    "React",
    "TypeScript",
  ],

  // 5. Open Graph: Controls how links look when shared on Facebook/LinkedIn/Discord
  openGraph: {
    title: "Ian Macabulos - Full-Stack Developer",
    description:
      "Building scalable, high-performance web applications with the modern tech stack.",
    url: "https://iansebastian.dev",
    siteName: "Ian Macabulos",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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