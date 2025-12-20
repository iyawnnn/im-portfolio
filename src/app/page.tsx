"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  LayoutTemplate,
  Mail,
  User,
  CodeXml,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/ui/counter";
import { MovingDots, Radar } from "@/components/ui/animated-backgrounds";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"; 

export default function ExplorePage() {

  // --- SCROLL FIX ---
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // --- DATA DEFINITIONS ---
  
  const wordsLine1 = [
    { text: "Hey," },
    { text: "I’m" },
    { text: "Ian,", className: "text-foreground" }, 
  ];

  // Desktop Line 2 (Combined)
  const wordsLine2Desktop = [
    { text: "A", className: "text-muted-foreground" }, 
    { text: "Full-Stack", className: "text-muted-foreground" },
    { text: "Developer.", className: "text-muted-foreground" },
  ];

  // Mobile Line 2 (Split Part A)
  const wordsLine2Mobile = [
    { text: "A", className: "text-muted-foreground" }, 
    { text: "Full-Stack", className: "text-muted-foreground" },
  ];

  // Mobile Line 3 (Split Part B)
  const wordsLine3Mobile = [
    { text: "Developer.", className: "text-muted-foreground" },
  ];

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-8 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      {/* --- HERO SECTION --- */}
      <section className="flex max-w-2xl flex-col gap-2 md:gap-4">
        
        {/* HEADER CONTAINER */}
        {/* text-5xl: Base size (Mobile) -> HUGE.
            lg:text-6xl: Desktop size -> STANDARD (Not increased to 7xl).
            leading-[1.15]: Adds breathing room between lines.
        */}
        <div className="flex flex-col items-start justify-center min-h-[4em] sm:min-h-[2em] text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.15]">
           
           {/* --- LINE 1 (SHARED) --- */}
           <TypewriterEffectSmooth 
              words={wordsLine1} 
              className="p-0 m-0"
              cursorClassName="bg-primary"
              duration={1.5} 
              hideCursorOnComplete={true} 
           />
           
           {/* --- DESKTOP VIEW (MD and larger) --- */}
           {/* Negative margin pulls desktop text tight since it is only 2 lines */}
           <div className="hidden md:block mt-1 lg:mt-2">
             <TypewriterEffectSmooth 
                words={wordsLine2Desktop} 
                className="p-0"
                cursorClassName="bg-muted-foreground"
                delay={1.5} 
                duration={1.5}
             />
           </div>

           {/* --- MOBILE VIEW (Smaller than MD) --- */}
           {/* No negative margin on wrapper so it breathes. */}
           <div className="block md:hidden flex flex-col items-start mt-0">
             {/* Mobile Line 2 */}
             <TypewriterEffectSmooth 
                words={wordsLine2Mobile} 
                className="p-0"
                cursorClassName="bg-muted-foreground"
                delay={1.5} 
                duration={1.2} 
                hideCursorOnComplete={true} 
             />
             {/* Mobile Line 3 */}
             <TypewriterEffectSmooth 
                words={wordsLine3Mobile} 
                className="p-0 mt-1" // Small margin between split lines
                cursorClassName="bg-muted-foreground"
                delay={2.7} 
                duration={1.2}
             />
           </div>

        </div>
        
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          I build web apps, learn new tech, and occasionally argue with my
          laptop — basically, I spend most of my time debugging my own
          decisions.
        </p>

        <div className="flex flex-wrap gap-3 mt-2">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="rounded-md border border-input bg-secondary/50 shadow-sm transition-all hover:bg-secondary hover:border-foreground/10 active:scale-95"
          >
            <Link href="/about">
              <User className="mr-2 h-4 w-4" /> About
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" /> Get in Touch
            </Link>
          </Button>
        </div>
      </section>

      {/* --- PROJECTS OVERVIEW --- */}
      <section className="flex flex-col gap-4 md:gap-6 mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Projects Overview
          </h2>
          <Link
            href="/projects"
            className="flex items-center text-xs font-medium text-muted-foreground transition-colors hover:text-primary sm:text-sm"
          >
            <span className="hidden sm:inline">View all projects</span>
            <span className="sm:hidden">View all</span>
            <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <Card className="overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md border border-border/50 bg-card">
            <div className="aspect-video w-full bg-secondary/30 flex items-center justify-center border-b border-border/50">
              <LayoutTemplate className="h-16 w-16 text-muted-foreground/20 sm:h-20 sm:w-20" />
            </div>
            <CardHeader>
              <CardTitle>Project 1</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Badge variant="secondary" className="rounded-md">
                Next.js
              </Badge>
              <Badge variant="secondary" className="rounded-md">
                Tailwind
              </Badge>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden rounded-xl shadow-sm transition-all hover:shadow-md border border-border/50 bg-card">
            <div className="aspect-video w-full bg-secondary/30 flex items-center justify-center border-b border-border/50">
              <Layers className="h-16 w-16 text-muted-foreground/20 sm:h-20 sm:w-20" />
            </div>
            <CardHeader>
              <CardTitle>Project 2</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
            </CardHeader>
            <CardFooter className="gap-2">
              <Badge variant="secondary" className="rounded-md">
                React
              </Badge>
              <Badge variant="secondary" className="rounded-md">
                Node.js
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="grid grid-cols-3 divide-x divide-border/50 rounded-xl bg-card shadow-sm border border-border/50 overflow-hidden">
        <div className="flex flex-col items-center justify-center p-4 text-center sm:p-8">
          <span className="text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl lg:text-6xl">
            <Counter value={10} />+
          </span>
          <span className="text-[10px] font-medium text-muted-foreground mt-1 leading-tight sm:text-sm lg:text-base">
            Projects <br className="sm:hidden" /> Completed
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 text-center sm:p-8">
          <span className="text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl lg:text-6xl">
            <Counter value={8} />+
          </span>
          <span className="text-[10px] font-medium text-muted-foreground mt-1 leading-tight sm:text-sm lg:text-base">
            Projects Live <br className="sm:hidden" /> & Deployed
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 text-center sm:p-8">
          <span className="text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl lg:text-6xl">
            <Counter value={8} />+
          </span>
          <span className="text-[10px] font-medium text-muted-foreground mt-1 leading-tight sm:text-sm lg:text-base">
            Languages <br className="sm:hidden" /> Mastered
          </span>
        </div>
      </section>

      {/* --- NAVIGATION CARDS --- */}
      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <Card className="relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <MovingDots />
          <CardHeader className="relative z-10">
            <CodeXml className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Stack</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              The tech behind my projects.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full rounded-md border-input bg-background/50 backdrop-blur-sm shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/stack">View Stack</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative overflow-hidden flex flex-col justify-between rounded-xl bg-card shadow-sm border border-border/50 transition-all hover:shadow-md">
          <Radar />
          <CardHeader className="relative z-10">
            <LayoutTemplate className="h-8 w-8 text-primary mb-2 sm:h-10 sm:w-10" />
            <CardTitle className="text-lg sm:text-xl">Projects</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              A showcase of my recent work.
            </CardDescription>
          </CardHeader>
          <CardFooter className="relative z-10">
            <Button
              asChild
              variant="default"
              size="sm"
              className="w-full rounded-md shadow-sm transition-all hover:opacity-90 active:scale-95 md:w-auto md:h-10 md:px-4 md:py-2"
            >
              <Link href="/projects">View Projects</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}