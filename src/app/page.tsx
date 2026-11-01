import { Suspense } from "react";
import Link from "next/link";
import {
  Code as CodeXml,
  ArrowRight,
  FileText,
  Envelope as Mail,
  User,
  BookOpen,
} from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MovingDots, Radar } from "@/components/ui/animated-backgrounds";
import { GitHubContributionGraph } from "@/components/ui/github-contribution-graph";
import { SpotifyCard } from "@/components/ui/spotify-card";
import { WakaTimeCard } from "@/components/ui/wakatime-card";
import { TextFlip } from "@/components/ui/text-flip";
import heroStyles from "./hero.module.css";
import { Skeleton } from "@/components/ui/skeleton";

import { ScrollRestoration } from "@/components/ui/scroll-restoration";
import { HomeProjectCard, type ProjectData } from "@/components/ui/home-project-card";

import { getAllPostsMeta } from "@/lib/mdx";

const HOME_PROJECTS: ProjectData[] = [
  {
    title: "Neffi",
    description:
      "A physical-and-digital NFC card platform combining secure activation, customizable profiles, permanent card URLs, and the operational workflows behind the product.",
    link: "/projects/neffi",
    image: "/projects/neffi/cover.webp",
    video: "/projects/neffi/neffi-demo.mp4",
    tags: ["Next.js", "PostgreSQL", "Drizzle", "Better Auth"],
  },
  {
    title: "Better San Fernando",
    description:
      "An open-source civic-information and transparency portal making San Fernando’s public information easier to find, understand, and verify.",
    link: "/projects/better-san-fernando",
    image: "/projects/better-san-fernando/cover.webp",
    video: "/projects/better-san-fernando/bettersanfernando-demo.mp4",
    tags: ["Next.js", "TypeScript", "MapLibre", "Zod"],
  },
];

const ROLES = [
  "Backend AI Engineer",
  "Open-Source Maintainer",
  "Full-Stack Developer",
];

export default function ExplorePage() {
  const latestPosts = getAllPostsMeta()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-8 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      <ScrollRestoration />

      <section className="flex max-w-2xl flex-col gap-2 md:gap-4">
        <h1 className="sr-only">
          Ian Macabulos - Full-Stack Developer Philippines
        </h1>

        <div className="flex max-w-full min-w-0 flex-col items-start justify-center gap-1 text-4xl sm:text-[2.75rem] lg:gap-2 lg:text-[3.25rem] font-medium tracking-tight leading-none">
          <div className={heroStyles.reveal}>Hey, I’m Ian.</div>
          <TextFlip
            words={ROLES}
            startDelay={1600}
            className={`max-w-full min-w-0 text-foreground ${heroStyles.reveal} ${heroStyles.role}`}
          />
        </div>

        <p className={`text-base sm:text-lg font-normal tracking-normal leading-6 sm:leading-7 text-muted-foreground ${heroStyles.reveal} ${heroStyles.copy}`}>
          I build reliable systems and polished interfaces, from backend
          architecture to the details that make products feel finished.
        </p>

        <div className={`flex flex-wrap gap-3 mt-2 ${heroStyles.reveal} ${heroStyles.actions}`}>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-md border border-input bg-secondary/50 shadow-sm transition-all hover:bg-secondary hover:border-foreground/10 active:scale-95"
          >
            <Link href="/about" prefetch={false}>
              <User className="mr-2 h-4 w-4" /> About
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Link href="/contact" prefetch={false}>
              <Mail className="mr-2 h-4 w-4" /> Get in Touch
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4 md:gap-6 mt-4">
        <div className={`flex items-center justify-between ${heroStyles.projectsHeading}`}>
          <h2 className="text-xl font-medium tracking-tight sm:text-2xl">
            Projects Overview
          </h2>
          <Link
            href="/projects"
            prefetch={false}
            className="group/forward flex items-center text-xs font-medium text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary sm:text-sm"
          >
            <span className="hidden sm:inline">View all projects</span>
            <span className="sm:hidden">View all</span>
            <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/forward:-rotate-45 motion-safe:group-focus-visible/forward:-rotate-45 motion-safe:group-hover/forward:translate-x-px motion-safe:group-hover/forward:-translate-y-px motion-safe:group-focus-visible/forward:translate-x-px motion-safe:group-focus-visible/forward:-translate-y-px motion-reduce:transition-none sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 items-start ${heroStyles.projects}`}>
          {HOME_PROJECTS.map((project, index) => (
            <HomeProjectCard
              key={project.title}
              project={project}
              preloadImage={index === 0}
            />
          ))}
        </div>
      </section>

      <GitHubContributionGraph />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Suspense fallback={<Skeleton className="h-[160px] w-full rounded-xl bg-card border border-border/50 shadow-sm" />}>
          <SpotifyCard />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-[160px] w-full rounded-xl bg-card border border-border/50 shadow-sm" />}>
          <WakaTimeCard />
        </Suspense>
      </section>

      <section className="w-full">
        <div className="flex flex-col lg:flex-row overflow-hidden rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md min-h-[300px]">
          
          <div className="relative flex flex-col justify-center p-8 lg:p-10 lg:w-2/5 overflow-hidden">
            <div className="relative z-10 flex flex-col max-w-sm">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mb-3">
                Localhost Tales
              </h3>
              <p className="text-sm font-normal tracking-normal text-muted-foreground leading-5 mb-8">
                Deep dives into modern full-stack architecture, system optimization, and the realities of production-grade software.
              </p>
              <Button
                asChild
                variant="default"
                className="w-fit rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95"
              >
                <Link href="/blog" prefetch={false}>View All Articles</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:w-3/5 border-t lg:border-t-0 lg:border-l border-border/50 divide-y divide-border/50 bg-secondary/10">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch={false}
                className="group group/forward flex flex-1 items-center justify-between p-6 lg:px-8 lg:py-0 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted/40 active:bg-muted/60 min-h-[80px]"
              >
                <div className="flex flex-col gap-1.5 pr-4 py-4 lg:py-6">
                  <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                    {formatDate(post.date)}
                  </span>
                  <h4 className="text-base sm:text-lg font-medium tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] line-clamp-1">
                    {post.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover/forward:-rotate-45 motion-safe:group-focus-visible/forward:-rotate-45 motion-safe:group-hover/forward:translate-x-px motion-safe:group-hover/forward:-translate-y-px motion-safe:group-focus-visible/forward:translate-x-px motion-safe:group-focus-visible/forward:-translate-y-px motion-reduce:transition-none" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <div className="absolute inset-0 z-0">
            <MovingDots />
          </div>
          <CardHeader className="relative z-10">
            <CodeXml className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Stack</CardTitle>
            <CardDescription>
              The tech behind my projects.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10 mt-8 md:mt-0">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full rounded-md border-input bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/stack" prefetch={false}>View Stack</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="group relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <div className="absolute inset-0 z-0">
            <Radar />
          </div>
          <CardHeader className="relative z-10">
            <FileText className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Resume</CardTitle>
            <CardDescription>
              My professional journey and qualifications.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10 mt-8 md:mt-0">
            <Button
              asChild
              variant="default"
              size="sm"
              className="w-full rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/resume" prefetch={false}>View Resume</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

