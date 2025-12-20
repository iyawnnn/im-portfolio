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
    <header className="flex h-auto w-full items-center justify-between border-b border-sidebar-border/60 bg-sidebar/80 px-6 py-3 backdrop-blur-md">
      {/* Left: Profile (Avatar + Name) */}
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border border-primary/10 shadow-sm">
          <AvatarImage 
            src="/about/profile.jpg" 
            alt="Ian Macabulos" 
            className="object-cover" 
          />
          <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
            IM
          </AvatarFallback>
        </Avatar>
        
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