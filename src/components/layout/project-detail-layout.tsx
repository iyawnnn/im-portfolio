import reveal from "@/components/layout/page-reveal.module.css";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import { ProjectStackBadge, type ProjectTechnology } from "@/components/ui/project-stack-badge";
import { cn } from "@/lib/utils";

type ProjectLink = {
  label: string;
  icon?: ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
} & (
  | { href: string; disabled?: false }
  | { href?: never; disabled: true }
);

type ProjectDetailLayoutProps = {
  title: string;
  subtitle: string;
  description: ReactNode;
  technologies: readonly ProjectTechnology[];
  media: ReactNode;
  linksDescription: string;
  links: ProjectLink[];
  children: ReactNode;
};

export function ProjectDetailLayout({
  title,
  subtitle,
  description,
  technologies,
  media,
  linksDescription,
  links,
  children,
}: ProjectDetailLayoutProps) {
  const hasPairedSources = links.length === 3 &&
    ["Live Site", "Web Source", "Mobile Source"].every((label) =>
      links.some((link) => link.label === label),
    );

  return (
    <div className={`flex w-full min-w-0 max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24 [overflow-wrap:anywhere] [&_section]:scroll-mt-24 lg:[&_section]:scroll-mt-4 ${reveal.projectDetail}`}>
      <div className={`${reveal.secondary} ${reveal.label}`}>
        <Link
          href="/projects"
          className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            aria-hidden="true"
            className="mr-2 h-4 w-4 transition-transform motion-safe:group-hover:-translate-x-1"
          />
          All Projects
        </Link>
      </div>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="space-y-4">
          <h1 className={`text-4xl md:text-6xl font-medium tracking-tight leading-[1.08] text-foreground ${reveal.primary}`}>
            {title}
          </h1>
          <h2 className={`text-xl md:text-2xl font-medium text-muted-foreground ${reveal.secondary} ${reveal.softText} ${reveal.subtitle}`}>
            {subtitle}
          </h2>
        </div>

        <p className={`text-lg leading-relaxed text-muted-foreground w-full ${reveal.secondary} ${reveal.softText} ${reveal.overview}`}>
          {description}
        </p>

        <div className={`flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80 ${reveal.secondary} ${reveal.technologies}`}>
          {technologies.map((technology) => (
            <ProjectStackBadge key={technology} technology={technology} className="rounded-full" />
          ))}
        </div>
      </div>

      <div className={`relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm ${reveal.secondary} ${reveal.media}`}>
        {media}
      </div>

      {links.length > 0 && (
        <div className={cn(
          reveal.secondary,
          reveal.links,
          "rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col items-start justify-between gap-6 shadow-sm",
          links.length === 3 ? "xl:flex-row xl:items-center" : "md:flex-row md:items-center",
        )}>
          <div className="min-w-0 space-y-1">
            <h3 className="text-lg font-medium">Project Links</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              {linksDescription}
            </p>
          </div>
          <div className={links.length === 3
            ? "grid grid-cols-2 gap-3 w-full xl:w-auto xl:shrink-0 xl:grid-cols-3"
            : "flex gap-3 w-full md:w-auto flex-wrap"}>
            {links.map(({ label, href, icon, variant = "default", disabled }, index) => (
              <Button
                key={label}
                asChild={!disabled}
                disabled={disabled}
                variant={variant}
                className={cn(
                  "font-medium",
                  links.length === 3
                    ? hasPairedSources
                      ? label === "Live Site" && "order-last col-span-2 xl:order-none xl:col-span-1"
                      : index === 2 && "col-span-2 xl:col-span-1"
                    : "flex-1 md:flex-none",
                )}
              >
                {disabled ? (
                  <>{icon}{label}</>
                ) : (
                  <Link href={href} target="_blank" rel="noopener noreferrer">
                    {icon}
                    {label}
                  </Link>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
