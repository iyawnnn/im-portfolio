"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, User, Briefcase, CodeXml, FileText, 
  Mail, Linkedin, Github, Instagram 
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_LINKS = [
  { href: "/", label: "Explore", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/stack", label: "Stack", icon: CodeXml },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "https://www.linkedin.com/in/ian-sebastian-macabulos/", label: "LinkedIn", icon: Linkedin, isExternal: true },
  { href: "https://github.com/iyawnnn", label: "Github", icon: Github, isExternal: true },
  { href: "https://www.instagram.com/iann.mac/", label: "Instagram", icon: Instagram, isExternal: true },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full items-center overflow-x-auto overflow-y-hidden px-6 pb-2
        snap-x snap-mandatory 
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        
        <div className="flex min-w-full w-fit mx-auto items-center justify-start gap-2 sm:gap-6 md:gap-8">
          
          {MOBILE_LINKS.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                className={cn(
                  // CHANGE: rounded-2xl -> rounded-lg for a squarer look
                  "snap-center group flex min-w-[5rem] flex-col items-center justify-center gap-1 rounded-lg py-2 px-2 transition-all duration-300",
                  isActive 
                    ? "bg-secondary text-primary shadow-sm" 
                    : "bg-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="relative flex items-center justify-center">
                  <link.icon className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? "stroke-[2px] scale-105" : "stroke-[1.5px]"
                  )} />
                </div>
                
                <span className={cn(
                  "text-[10px] font-medium leading-none tracking-tight transition-colors",
                  isActive ? "font-semibold" : ""
                )}>
                  {link.label}
                </span>
              </Link>
            );
          })}
          
          <div className="w-4 shrink-0 sm:hidden" />
        </div>
      </div>
    </div>
  );
}