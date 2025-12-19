"use client";

import * as React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileHeader } from "@/components/mobile-header";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Use the hook to get the current state
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* --- DESKTOP: Sidebar --- 
          We dynamically change the width based on isCollapsed state.
          w-72 (288px) vs w-[70px]
      */}
      <aside
        className={cn(
          "hidden fixed h-full bg-background z-50 transition-all duration-300 ease-in-out lg:flex",
          isCollapsed ? "w-[70px]" : "w-72"
        )}
      >
        <AppSidebar />
      </aside>

      {/* --- MOBILE: Top Header --- */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <MobileHeader />
      </div>

      {/* --- MAIN CONTENT --- 
          We dynamically adjust the left margin (lg:ml-...) to match the sidebar width.
      */}
      <main
        className={cn(
          "flex-1 pt-16 lg:pt-0 pb-24 lg:pb-0 transition-all duration-300 ease-in-out",
          // Adjust margin based on collapsed state
          isCollapsed ? "lg:ml-[70px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>

      {/* --- MOBILE: Bottom Nav --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 border-t border-sidebar-border/60 bg-sidebar/85 backdrop-blur-xl z-50">
        <MobileBottomNav />
      </nav>
    </div>
  );
}