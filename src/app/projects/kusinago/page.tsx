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
  Terminal, // Using Terminal icon for the System Info card
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function KusinaGoPage() {
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
            KusinaGo
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Full-Stack Food Ordering System
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          KusinaGo is a dedicated food ordering platform designed to bridge the
          gap between traditional Filipino dining and modern convenience. Built
          from the ground up using PHP and MongoDB, it features a seamless
          ordering experience for customers and a robust administrative
          dashboard for managing real-time inventory, sales reports, and order
          fulfillment.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">PHP 8</Badge>
          <Badge variant="secondary">MongoDB</Badge>
          <Badge variant="secondary">Composer</Badge>
          <Badge variant="secondary">DOMPDF</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          src="/projects/kusinago/kusinago-demo.mp4"
          poster="/projects/kusinago/kusinago-cover.webp"
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
            This project is currently running locally. You can explore the full
            source code and setup instructions on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          {/* Live Demo Disabled for Local Project */}
          <Button
            disabled
            variant="secondary"
            className="flex-1 md:flex-none font-bold opacity-50 cursor-not-allowed"
          >
            <ExternalLink className="mr-2 h-4 w-4" /> Local Only
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/KusinaGo" target="_blank">
              <Github className="mr-2 h-4 w-4" /> Source Code
            </Link>
          </Button>
        </div>
      </div>

      {/* --- DETAILED CONTENT --- */}
      {/* UPDATED: Changed lg:grid-cols-3 to xl:grid-cols-3 for better responsiveness */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* LEFT COLUMN (Main Content) */}
        {/* UPDATED: Changed lg:col-span-2 to xl:col-span-2 */}
        <div className="xl:col-span-2 space-y-12">
          {/* Core Features */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Layout className="w-6 h-6 text-primary" /> Core Features
            </h2>
            <div className="grid gap-4">
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Customer Experience
                </h3>
                <p className="text-muted-foreground text-sm">
                  Dynamic menu browsing, cart management with real-time updates,
                  and a secure checkout process. Includes user account
                  management and order history tracking.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Admin Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  A comprehensive admin panel featuring sales analytics,
                  low-stock alerts, user management, and PDF report generation
                  using DOMPDF.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Security & Auth
                </h3>
                <p className="text-muted-foreground text-sm">
                  Implemented secure session-based authentication with Bcrypt
                  (password_hash) for password protection and role-based access
                  control (Admin vs. User).
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
                One of the main technical challenges was efficiently handling
                complex data relationships in a NoSQL environment. specifically
                calculating the "Top Selling Items" dynamically from the orders
                collection without the joins found in traditional SQL databases.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>MongoDB Aggregation:</strong> I utilized MongoDB's
                  aggregation pipeline (`$unwind`, `$group`, `$sort`) to process
                  order data efficiently and identify best-selling products in
                  real-time.
                </li>
                <li>
                  <strong>Dependency Management:</strong> Integrated
                  **Composer** to manage third-party libraries like
                  `mongodb/mongodb` driver and `dompdf` for generating
                  professional sales reports.
                </li>
                <li>
                  <strong>Modular Architecture:</strong> Structured the
                  application with clear separation for authentication, database
                  configuration, and admin logic to maintain code scalability.
                </li>
              </ul>
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" /> Key Takeaways
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Building KusinaGo deepened my knowledge of server-side PHP
              programming and the flexibility of NoSQL databases. It taught me
              how to bridge raw data with meaningful user interfaces, from
              dynamic frontend menus to complex backend reporting systems.
            </p>
          </section>
        </div>

        {/* RIGHT COLUMN (Tech Stack & Meta) */}
        {/* UPDATED: Responsive grid container for Tablet/Laptop sizes */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-6 xl:flex xl:flex-col xl:gap-8">
          {/* Tech Stack Widget */}
          {/* UPDATED: md:col-span-2 to span full width on tablet */}
          <Card className="border-border/50 shadow-sm bg-card/50 md:col-span-2 xl:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="w-5 h-5 text-primary" /> Tech Stack
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Core
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PHP 8</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">HTML5</Badge>
                  <Badge variant="outline">CSS3</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Libraries
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Composer</Badge>
                  <Badge variant="outline">DOMPDF</Badge>
                  <Badge variant="outline">Iconify</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Security
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Bcrypt</Badge>
                  <Badge variant="outline">Sessions</Badge>
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
                <span className="font-medium text-foreground">Apr 2025</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Role</span>
                <span className="font-medium text-foreground">
                  Full-Stack Developer
                </span>
              </div>
            </div>
          </Card>

          {/* SYSTEM INFO WIDGET */}
          <Card className="border-border/50 shadow-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Terminal className="w-5 h-5 text-primary" /> System Info
              </CardTitle>
            </CardHeader>
            <div className="px-6 pb-6 space-y-4 text-sm text-muted-foreground">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Environment</span>
                <span className="font-medium text-foreground">Localhost</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Status</span>
                <span className="font-medium text-foreground">Prototype</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Access</span>
                <span className="font-medium text-foreground">Source Code</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
