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
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MamaRsPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://iansebastian.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://iansebastian.dev/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Mama R's Bakery",
        item: "https://iansebastian.dev/projects/mamars",
      },
    ],
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- BACK NAVIGATION --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            Mama R's
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground">
            Inventory & Sales Management System
          </h2>
        </div>

        <p className="text-lg leading-relaxed text-muted-foreground w-full">
          Mama R's is a custom business tool built on the MERN stack (MongoDB,
          Express, React, Node.js). It was a freelance project created to help a
          local business move away from paper logs. The system helps the owner
          track inventory, record customer orders, and see daily sales totals in
          a secure digital environment.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground/80">
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">MongoDB</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
      </div>

      {/* --- HERO MEDIA (Video Autoplay) --- */}
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm">
        <video
          src="/projects/mamars/mamars-demo.mp4"
          poster="/projects/mamars/mamars-cover.webp"
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
            The live application is secured for internal business use only. You
            can review the source code on GitHub.
          </p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          {/* Internal App Button (Disabled) */}
          <Button
            disabled
            variant="secondary"
            className="flex-1 md:flex-none font-bold opacity-80 cursor-not-allowed"
          >
            <Lock className="mr-2 h-4 w-4" /> Client Portal
          </Button>

          <Button
            asChild
            variant="outline"
            className="flex-1 md:flex-none font-bold"
          >
            <Link href="https://github.com/iyawnnn/mamar-s" target="_blank">
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
                <h3 className="font-semibold text-foreground mb-1">
                  Sales Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  A clear view of daily performance. It shows total sales and
                  revenue numbers instantly so the owner knows how the business
                  is doing without calculating it manually.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Inventory Management
                </h3>
                <p className="text-muted-foreground text-sm">
                  Allows the user to add products and update stock levels. It
                  keeps a history of changes to ensure items are not lost and
                  stock counts remain accurate.
                </p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">
                  Sales-Only Reporting
                </h3>
                <p className="text-muted-foreground text-sm">
                  Generates simple reports focused strictly on income. It
                  calculates total revenue from orders without complicating the
                  view with expense tracking.
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
                The client needed to transition from manual pen-and-paper
                tracking to a digital system. The main challenge was creating an
                interface that was powerful enough to handle sales data but
                simple enough for non-technical staff to use easily.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">The Solution</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5 marker:text-primary">
                <li>
                  <strong>RESTful API Architecture:</strong> Designed a robust
                  backend with Express.js to handle separate routes for products
                  and orders. This keeps the data organized and secure.
                </li>
                <li>
                  <strong>Order Tracking:</strong> Built a system to record
                  every customer order. This data is saved instantly to the
                  database so revenue totals are always up to date.
                </li>
                <li>
                  <strong>Secure Authentication:</strong> Implemented JWT-based
                  authentication. This protects sensitive business data and
                  ensures only authorized staff can access the admin panel.
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
              This project honed my skills in translating specific business
              requirements into code. It taught me how to build intuitive forms
              for non-technical users and the importance of aggregating sales
              data on the backend to keep the frontend fast.
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
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Vite</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Axios</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Backend
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Express.js</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">Mongoose</Badge>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Services
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">JWT</Badge>
                  <Badge variant="outline">Bcrypt</Badge>
                  <Badge variant="outline">REST API</Badge>
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
                {/* UPDATED: Changed from 'Commission Work' to 'Freelance Project' */}
                <span className="font-medium text-foreground">
                  Freelance Project
                </span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Timeline</span>
                <span className="font-medium text-foreground">Aug 2025</span>
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
                <span>Frontend</span>
                <span className="font-medium text-foreground">Netlify</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Backend</span>
                <span className="font-medium text-foreground">Render</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span>Database</span>
                <span className="font-medium text-foreground">
                  MongoDB Atlas
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
