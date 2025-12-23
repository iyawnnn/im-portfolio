"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  MapPin,
  ArrowRight,
  Target,
  Lightbulb,
  Sparkles,
  Clock,
  SearchCheck,
  Code2,
  Rocket,
  Music,
  Plane,
  Monitor,
  Palette,
  Zap,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function AboutPage() {
  const paragraph1 = `I am a 3rd-year Information Technology student at Holy Angel University, majoring on Web Development. I love turning ideas into clean, functional websites that look good and work smoothly.`;

  const paragraph2 = `I believe the best way to learn is by doing. Instead of just sticking to what is taught in class, I spend my time building real projects and learning modern tools. I am focused on becoming a developer who is ready to deliver quality work from day one.`;

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- HERO SECTION --- */}
      <section className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Based in Philippines</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            About Me
          </h1>

          {/* Hero Section Intro */}
          <div className="space-y-4">
            <div className="text-base leading-relaxed text-muted-foreground">
              <TextGenerateEffect
                words={paragraph1}
                className="text-muted-foreground font-normal"
              />
            </div>
            <div className="text-base leading-relaxed text-muted-foreground">
              <TextGenerateEffect
                words={paragraph2}
                className="text-muted-foreground font-normal"
                delay={3.6} 
              />
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-border shadow-md sm:h-56 sm:w-56 md:h-64 md:w-64">
            <Image
              src="/about/profile.jpg"
              alt="Ian Macabulos"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* --- GRID SECTIONS --- */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Target className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Career Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <Rocket className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Role:</strong> Actively seeking internships, freelance projects, or
                entry-level positions in Full-Stack Development.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Code2 className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Growth:</strong> Eager to join a team where I can
                contribute to meaningful codebases and learn from seniors.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Monitor className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Impact:</strong> I want to build software that works
                smoothly and solves real user problems.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Soft Skills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <SearchCheck className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Attention to Detail:</strong> I double-check my work to
                ensure everything looks and works exactly as intended.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Time Management:</strong> I plan my tasks carefully to
                make sure I finish projects on or before the deadline.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Adaptability:</strong> I pick up new tools quickly and
                can adjust easily when project requirements change.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lightbulb className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <Zap className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Tech Stack:</strong> I am passionate about Full-Stack
                Web Development and currently diving deeper into Next.js.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Palette className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>UI/UX:</strong> I focus on clean design and user
                experience, ensuring the websites I build look modern and feel
                intuitive.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Monitor className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Performance:</strong> Constantly learning how to
                optimize my code to make web apps run faster.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border/50">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">Hobbies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed text-sm lg:text-base">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Reading:</strong> I enjoy reading self-help books (like
                Atomic Habits) to build better habits and improve my mindset.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Music className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Music:</strong> I listen to music to help me focus while
                coding, relax on weekends, or enjoy road trips.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Plane className="mt-1 h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Travel:</strong> I love exploring new places (and
                finding coffee shops with good WiFi).
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="rounded-3xl border border-primary/20 bg-card p-8 text-center md:p-12 shadow-sm">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>

        <h2 className="text-2xl font-bold sm:text-3xl tracking-tight text-foreground">
          Let’s build something awesome
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-muted-foreground leading-relaxed text-sm lg:text-base">
          I am ready to bring my skills, dedication, and attention to detail to
          your team. Whether you have an <strong>internship</strong> opening, a <strong>freelance project</strong>, or a <strong>full-time opportunity</strong>, I’d love to connect.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/contact">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 px-8 py-4 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Work with me</span>
              <ArrowRight className="h-5 w-5" />
            </HoverBorderGradient>
          </Link>
        </div>
      </section>
    </div>
  );
}