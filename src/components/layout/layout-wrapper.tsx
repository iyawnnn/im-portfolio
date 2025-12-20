"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar/index";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileHeader } from "@/components/layout/mobile-header";
// 1. Import the Footer
import { SiteFooter } from "@/components/layout/site-footer"; 
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* DESKTOP: Sidebar */}
      <aside
        className={cn(
          "hidden fixed h-full bg-background z-50 transition-all duration-300 ease-in-out lg:flex",
          isCollapsed ? "w-[70px]" : "w-72"
        )}
      >
        <AppSidebar />
      </aside>

      {/* MOBILE: Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <MobileHeader />
      </div>

      {/* MAIN CONTENT AREA */}
      <main
        className={cn(
          // Added 'flex flex-col min-h-screen' so footer can sit at the bottom
          "flex-1 flex flex-col min-h-screen pt-16 lg:pt-0 pb-24 lg:pb-0 transition-all duration-300 ease-in-out",
          isCollapsed ? "lg:ml-[70px]" : "lg:ml-72"
        )}
      >
        {/* Page Content: takes up all available space */}
        <div className="flex-1">
            {children}
        </div>

        {/* 2. FOOTER: Now shows on every page */}
        <SiteFooter />
      </main>

      {/* MOBILE: Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 border-t border-sidebar-border/60 bg-sidebar/85 backdrop-blur-xl z-50">
        <MobileBottomNav />
      </nav>
    </div>
  );
}