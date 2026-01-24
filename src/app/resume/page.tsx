"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Mail,
  User,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

// --- CERTIFICATIONS DATA ---
const CERTIFICATIONS = [
  {
    name: "Back End Development and APIs",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/back-end-development-and-apis",
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+)",
    org: "CompTIA",
    icon: "/icons/comptia-white.webp",
    imageClass: "",
    date: "Nov 2023",
    link: "https://www.credly.com/badges/82755364-a4a7-4272-a446-2d7d07662f48/linked_in_profile",
  },
  {
    name: "Legacy JavaScript Algorithms and Data Structures",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Mar 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/javascript-algorithms-and-data-structures",
  },
  {
    name: "Responsive Web Design",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2024",
    link: "https://www.freecodecamp.org/certification/iyawn/responsive-web-design",
  },
];

export default function ResumePage() {
  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row justify-between gap-8 md:items-center border-b border-border/40 pb-8"
      >
        <div className="space-y-4">
            <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl">
                Ian Macabulos
                </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/80">
                <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Pampanga, Philippines</span>
                </div>
                <div className="hidden sm:block text-border">|</div>
                <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>iannmacabulos@gmail.com</span>
                </div>
            </div>
        </div>

        {/* STYLISH VIEW RESUME BUTTON */}
        <div className="flex shrink-0">
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-background text-foreground flex items-center space-x-2 px-6 py-3 font-semibold transition-all hover:scale-105 active:scale-95"
            >
                <Eye className="h-4 w-4" />
                <span>View Resume</span>
            </HoverBorderGradient>
          </Link>
        </div>
      </motion.div>

      {/* --- CAREER OBJECTIVE (FIXED CONSISTENCY) --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-border/40 mb-2">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight ">Career Objective</h2>
        </div>
        
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
          Information Technology student and Full-Stack Developer with practical
          experience building web applications using Next.js, React, Node.js, and
          MongoDB. I am seeking an internship or entry-level role to contribute
          to high-quality software solutions while continuing to grow within a
          professional development team.
        </p>
      </motion.section>

      {/* --- EXPERIENCE SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Experience</h2>
        </div>

        <div className="relative border-l-2 border-border/50 ml-3 md:ml-4 space-y-12 pl-8 md:pl-10 py-2">
          {/* MAMA R'S ENTRY */}
          <div className="relative">
            <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Freelance Full-Stack Developer
              </h3>
              <span className="text-sm font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded w-fit">
                2025 — Present
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="text-primary font-semibold">
                Mama R&apos;s — Inventory & Sales Management System
                </span>
                <Badge variant="outline" className="text-[10px] py-0 h-5">Project</Badge>
            </div>

            <ul className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Digital Transformation:</strong> Replaced manual paper logs with a fully digital custom MERN-stack solution, digitizing 100% of inventory records and reducing data retrieval time from minutes to seconds.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Analytics Dashboard:</strong> Automated daily revenue and stock reporting through a dynamic dashboard, eliminating manual calculation errors and providing real-time performance insights.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Security Implementation:</strong> Secured sensitive business transactions by implementing an administrative panel with JWT-based authentication and role-based access control.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* --- EDUCATION SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Education</h2>
        </div>

        <div className="space-y-6">
          <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground">
                  Holy Angel University
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  Bachelor of Science in Information Technology
                </p>
              </div>
              <Badge variant="secondary" className="w-fit h-fit py-1">
                2023 — 2027
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Major in Web Development
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4 text-primary" />
                <span>
                  Consistent Dean&apos;s and President&apos;s Lister (A.Y.
                  2023-2026)
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6 w-full"
      >
        <div className="flex items-center gap-3 pb-2 border-b border-border/40">
          <div className="p-2 bg-primary/10 rounded-md text-primary">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <a
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md flex items-center gap-4"
            >
              <div className="h-12 w-12 shrink-0 relative bg-neutral-950 rounded-lg border border-border/50 overflow-hidden flex items-center justify-center shadow-inner">
                <Image
                  src={cert.icon}
                  alt={cert.org}
                  fill
                  className={`object-contain transition-transform duration-300 group-hover:scale-110 ${cert.imageClass}`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                  <span>{cert.org}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{cert.date}</span>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}