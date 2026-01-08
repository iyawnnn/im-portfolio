"use client";

import * as React from "react";
import Image from "next/image"; // --- ADDED THIS IMPORT
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
// Removed Avatar imports as we are using Image directly now
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-auto w-full items-center justify-between border-b border-sidebar-border/60 bg-sidebar/80 px-6 py-3 backdrop-blur-md">
      {/* Left: Profile (Logo + Name) */}
      <div className="flex items-center gap-4">
        
        {/* --- CHANGED: LOGO SWITCHING LOGIC --- */}
        {/* Replaced Avatar with this Image container */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/10 bg-background shadow-sm">
          {/* 1. Light Mode Logo: Visible by default, HIDDEN in dark mode */}
          <Image 
            src="/logo/personal-logo-black.png" 
            alt="Ian Macabulos" 
            fill
            sizes="48px"
            priority
            className="block dark:hidden object-cover" 
          />

          {/* 2. Dark Mode Logo: Hidden by default, VISIBLE in dark mode */}
          <Image 
            src="/logo/personal-logo-white.png" 
            alt="Ian Macabulos" 
            fill
            sizes="48px"
            priority
            className="hidden dark:block object-cover" 
          />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-base font-bold leading-none tracking-tight">
            Ian Macabulos
          </h1>
          <p className="text-xs font-medium text-muted-foreground">
            Full-Stack Developer
          </p>
        </div>
      </div>

      {/* Right: Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}