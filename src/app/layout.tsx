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
  title: "Ian Macabulos",
  description:
    "I am Ian Macabulos, a Full-Stack Developer based in the Philippines dedicated to building scalable, high-performance web applications. I specialize in the modern JavaScript ecosystem, leveraging Next.js, TypeScript, and Node.js to craft seamless digital experiences.",
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