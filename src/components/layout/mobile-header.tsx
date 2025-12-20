"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function MobileHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // CHANGED: bg-background/80 -> bg-sidebar/80
    // CHANGED: border-border/40 -> border-sidebar-border/60
    <header className="flex h-16 w-full items-center justify-between border-b border-sidebar-border/60 bg-sidebar/80 px-6 backdrop-blur-md">
      {/* Left: Profile (Avatar + Name) */}
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9 border border-primary/10 shadow-sm">
          {/* UPDATED: Correct path and object-cover */}
          <AvatarImage 
            src="/about/profile.jpg" 
            alt="Ian Macabulos" 
            className="object-cover" 
          />
          <AvatarFallback className="bg-primary text-xs font-bold text-primary-foreground">
            IM
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-0.5">
          <h1 className="text-sm font-bold leading-none tracking-tight">
            Ian Macabulos
          </h1>
          <p className="text-[11px] font-medium text-muted-foreground">
            Full-Stack Developer
          </p>
        </div>
      </div>

      {/* Right: Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}