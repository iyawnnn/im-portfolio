import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Vercel's ISR regeneration renders the home page with usePathname() === "/index".
export function linkCurrent(pathname: string, href: string): "page" | "true" | undefined {
  const path = pathname === "/index" ? "/" : pathname;
  if (path === href) return "page";
  return href !== "/" && path.startsWith(`${href}/`) ? "true" : undefined;
}
