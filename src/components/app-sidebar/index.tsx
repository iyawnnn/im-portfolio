"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  User,
  Briefcase,
  CodeXml,
  FileText,
  Mail,
  Linkedin,
  Github,
  Instagram,
  Sun,
  Moon,
  ArrowUpRight,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/hooks/use-sidebar";

const MAIN_LINKS = [
  { title: "Explore", href: "/", icon: Home, shortcut: "1" },
  { title: "About", href: "/about", icon: User, shortcut: "2" },
  { title: "Projects", href: "/projects", icon: Briefcase, shortcut: "3" },
  { title: "Stack", href: "/stack", icon: CodeXml, shortcut: "4" },
  { title: "Resume", href: "/resume", icon: FileText, shortcut: "5" },
] as const;

const CONNECT_LINKS = [
  { title: "Contact", href: "/contact", icon: Mail, shortcut: "C" },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ian-sebastian-macabulos/",
    icon: Linkedin,
    isExternal: true,
  },
  {
    title: "Github",
    href: "https://github.com/iyawnnn",
    icon: Github,
    isExternal: true,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/iann.mac/",
    icon: Instagram,
    isExternal: true,
  },
] as const;

function NavSection({
  title,
  links,
  isCollapsed,
  pathname,
}: {
  title: string;
  links: typeof MAIN_LINKS | typeof CONNECT_LINKS;
  isCollapsed: boolean;
  pathname: string;
}) {
  return (
    <section className="w-full">
      {!isCollapsed && (
        <h2 className="mb-3 px-3 text-[10px] font-bold uppercase text-muted-foreground/60 transition-opacity duration-300 tracking-widest">
          {title}
        </h2>
      )}
      <ul className="space-y-1 w-full">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const isExternal = "isExternal" in link && link.isExternal;

          return (
            <li key={link.title} className="w-full">
              <Link
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                className={cn(
                  "group flex items-center rounded-xl py-2.5 text-sm font-semibold transition-all",
                  isCollapsed ? "justify-center px-2" : "justify-between px-3",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <div
                  className={cn(
                    "flex items-center transition-all",
                    isCollapsed ? "gap-0" : "gap-3"
                  )}
                >
                  <link.icon
                    className={cn(
                      "h-5 w-5 transition-all",
                      isActive ? "stroke-[2.5px] text-foreground" : "stroke-2"
                    )}
                  />
                  <span
                    className={cn(
                      "transition-all duration-300 overflow-hidden whitespace-nowrap",
                      isCollapsed
                        ? "w-0 opacity-0 invisible"
                        : "w-auto opacity-100 visible"
                    )}
                  >
                    {link.title}
                  </span>
                </div>

                <div
                  className={cn(
                    "hidden md:flex transition-all duration-300 overflow-hidden",
                    isCollapsed
                      ? "w-0 opacity-0 invisible"
                      : "w-auto opacity-100 visible"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border text-[10px] font-bold transition-all shadow-sm",
                      isActive
                        ? "border-foreground/10 bg-background text-foreground"
                        : "border-sidebar-border bg-sidebar text-muted-foreground group-hover:border-foreground/10 group-hover:bg-background group-hover:text-foreground"
                    )}
                  >
                    {"shortcut" in link ? (
                      link.shortcut
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

  React.useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const allLinks = [...MAIN_LINKS, ...CONNECT_LINKS];
      const target = allLinks.find(
        (link) =>
          "shortcut" in link &&
          link.shortcut?.toLowerCase() === e.key.toLowerCase()
      );
      if (target) {
        e.preventDefault();
        router.push(target.href);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <aside
      className={cn(
        "relative flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300",
        isCollapsed ? "px-3 pb-3 pt-5 items-center" : "p-5" // Reduced padding from p-6 to p-5
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "absolute -right-3 top-8 z-50 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm hover:bg-sidebar-accent",
          isCollapsed ? "rotate-180" : ""
        )}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </Button>

      <header
        className={cn(
          "mb-10 flex items-center transition-all duration-300",
          isCollapsed ? "justify-center px-0 gap-0" : "gap-4 px-1"
        )}
      >
        <Avatar
          className={cn(
            "shrink-0 border border-sidebar-foreground/20 shadow-sm transition-all",
            isCollapsed ? "h-10 w-10" : "h-12 w-12"
          )}
        >
          <AvatarImage
            src="/about/profile.jpg"
            alt="Ian Macabulos"
            className="object-cover"
          />
          <AvatarFallback className="bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            IM
          </AvatarFallback>
        </Avatar>

        <div
          className={cn(
            "flex flex-1 flex-col min-w-0 space-y-0 transition-all duration-300 overflow-hidden",
            isCollapsed
              ? "w-0 opacity-0 invisible"
              : "w-auto opacity-100 visible"
          )}
        >
          <h1 className="truncate text-base font-bold leading-none tracking-tight">
            Ian Macabulos
          </h1>
          <p className="whitespace-nowrap text-[12px] font-medium text-muted-foreground mt-1">
            Full-Stack Developer
          </p>
        </div>
      </header>

      <nav className="flex flex-1 flex-col space-y-8 overflow-y-auto overflow-x-hidden w-full no-scrollbar">
        <NavSection
          title="Main"
          links={MAIN_LINKS}
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
        <NavSection
          title="Connect"
          links={CONNECT_LINKS}
          isCollapsed={isCollapsed}
          pathname={pathname}
        />
      </nav>

      <footer
        className={cn(
          "mt-auto border-t border-sidebar-border pt-6 w-full transition-all",
          isCollapsed ? "flex justify-center" : ""
        )}
      >
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "rounded-xl border-sidebar-border bg-background text-foreground shadow-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all h-10",
            isCollapsed
              ? "w-auto justify-center px-2.5"
              : "w-full justify-start gap-3 px-3"
          )}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted &&
            (theme === "dark" ? (
              <Sun className="h-4 w-4 stroke-2" />
            ) : (
              <Moon className="h-4 w-4 stroke-2" />
            ))}
          <span
            className={cn(
              "text-xs font-semibold transition-all duration-300 overflow-hidden whitespace-nowrap",
              isCollapsed
                ? "w-0 opacity-0 hidden"
                : "w-auto opacity-100 visible"
            )}
          >
            {mounted
              ? theme === "dark"
                ? "Light Mode"
                : "Dark Mode"
              : "Theme"}
          </span>
        </Button>
      </footer>
    </aside>
  );
}
