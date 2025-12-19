import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// Import the new provider and wrapper
import { SidebarProvider } from "@/hooks/use-sidebar";
import { LayoutWrapper } from "@/components/layout-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ian Macabulos | Full-Stack Developer",
  description: "Portfolio of Ian Macabulos, a Full-Stack Developer based in the Philippines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistSans.className} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          {/* Wrap everything in the SidebarProvider */}
          <SidebarProvider>
            {/* Use the new client-side wrapper */}
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}