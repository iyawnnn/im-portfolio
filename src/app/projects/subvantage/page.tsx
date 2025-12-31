"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Briefcase,
  Cpu,
  Globe,
  Layout,
  Rocket,
  TrendingUp,
  Wallet,
  Bell,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SubVantagePage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- BACK NAVIGATION --- */}
      <div>
        <Link
          href="/projects"
          className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All Projects
        </Link>
      </div>

      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            SubVantage
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Intelligent Subscription Manager & Tracker
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          SubVantage is a comprehensive financial tool built to help users
          regain control over their recurring expenses. It features a dynamic
          dashboard that calculates monthly burn and annual forecasts in
          real-time. The platform supports multi-currency conversion, visualizes
          spending velocity, and sends intelligent alerts to prevent unwanted
          renewals.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Resend</Badge>
          <Badge variant="secondary">Supabase</Badge>
          <Badge variant="secondary">Vitest</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        {/* NOTE: Ensure you rename the folder in public/projects/ from 'subtrack' to 'subvantage' */}
        <video
          src="/projects/subtrack/subtrack-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {/* --- DEMO & CODE CARD --- */}
      <div className="rounded-xl border border-border/50 bg-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Project Links</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Explore the live application or review the codebase on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button asChild className="flex-1 md:flex-none font-bold">
            <Link href="https://subvantage.iansebastian.dev/" target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            {/* Assuming GitHub repo is also renamed. If not, change this back. */}
            <Link href="https://github.com/iyawnnn/SubVantage" target="_blank">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Link>
          </Button>
        </div>
      </div>

      {/* --- DETAILED CONTENT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* LEFT COLUMN (Main Content) */}
        <div className="xl:col-span-2 space-y-12">
          {/* Core Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Financial
                  Pulse
                </h3>
                <p className="text-muted-foreground text-sm">
                  A real-time dashboard displaying Monthly Burn, Annual
                  Forecasts, and Total Saved amounts. It helps users understand
                  their immediate financial health at a glance.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-primary" /> Smart Alerts via
                  Resend
                </h3>
                <p className="text-muted-foreground text-sm">
                  Integrated <strong>Resend</strong> to automate email
                  notifications. Users receive timely alerts 3 days before a
                  subscription renews or a trial expires, helping prevent
                  accidental charges.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" /> Spending Velocity
                </h3>
                <p className="text-muted-foreground text-sm">
                  Interactive charts powered by Recharts that visualize spending
                  trends over time, helping users identify months with heavy
                  outgoing payments.
                </p>
              </div>
            </div>
          </section>

          {/* Development Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Cpu className="w-6 h-6 text-primary" /> Development Process
            </h2>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Challenge</h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary challenge was managing state for currency
                conversions across different subscription cards while ensuring
                data reliability. Additionally, implementing a notification
                system that reliably triggers based on server-side dates
                required careful backend logic.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>Global State:</strong> Utilized React Context to
                  handle user preferences for currency and theme, ensuring
                  settings persisted across pages.
                </li>
                <li>
                  <strong>Transactional Emails:</strong> Leveraged Resend's API
                  to handle transactional emails with high deliverability,
                  decoupled from the main application thread.
                </li>
                <li>
                  <strong>Component Architecture:</strong> Created reusable
                  "Subscription Card" components that accept props for renewal
                  dates, costs, and logos, ensuring code reusability.
                </li>
              </ul>
            </div>
          </section>

          {/* Testing & QA */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <TestTube className="w-6 h-6 text-primary" /> Quality Assurance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              To ensure the application handles financial data accurately, I
              moved beyond simple feature building and implemented a robust
              testing strategy:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Unit & Integration Testing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Using <strong>Vitest</strong>, I wrote tests for critical
                  utility functions, ensuring that currency conversion math and
                  date calculations (like "days until renewal") are 100%
                  accurate.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  End-to-End (E2E) Testing
                </h4>
                <p className="text-sm text-muted-foreground">
                  Implemented <strong>Playwright</strong> to simulate real user
                  flows, such as signing up, adding a new subscription, and
                  verifying that the dashboard updates correctly without manual
                  intervention.
                </p>
              </div>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Building SubVantage improved my skills in handling complex data
              arrays and financial calculations on the frontend. More
              importantly, integrating <strong>Resend</strong> {" "}
              and writing <strong>E2E tests</strong> taught me how to build
              production-ready applications that are not just functional, but
              reliable and user-centric.
            </p>
          </section>
        </div>

        {/* RIGHT COLUMN (Tech Stack & Meta) */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 xl:flex xl:flex-col xl:gap-8">
          {/* Tech Stack Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50 md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="w-5 h-5 text-primary" /> Tech Stack
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Next.js 15</Badge>
                  <Badge variant="outline">React 19</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn UI</Badge>
                  <Badge variant="outline">Recharts</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend & Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Supabase</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Resend</Badge>
                  <Badge variant="outline">Prisma</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Testing & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Vitest</Badge>
                  <Badge variant="outline">Playwright</Badge>
                  <Badge variant="outline">Git</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Context Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="w-5 h-5 text-primary" /> Context
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Type</span>
                <span className="font-medium text-foreground">
                  Personal Project
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Jan 2026</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground">
                  Full Stack Developer
                </span>
              </div>
            </div>
          </Card>

          {/* Deployment Widget */}
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Rocket className="w-5 h-5 text-primary" /> Deployment
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Platform</span>
                <span className="font-medium text-foreground">Vercel</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Version</span>
                <span className="font-medium text-foreground">v1.0.0</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">Supabase</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
