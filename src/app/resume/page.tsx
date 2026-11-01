"use client";

import reveal from "@/components/layout/page-reveal.module.css";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Medal as Award,
  MapPin,
  Envelope as Mail,
  User,
  Eye,
  ArrowUpRight,
} from "@phosphor-icons/react/ssr";
import { Badge } from "@/components/ui/badge";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { WorkExperience } from "@/components/work-experience";

const CERTIFICATIONS = [
  {
    name: "CompTIA IT Fundamentals (ITF+)",
    org: "CompTIA",
    icon: "/icons/comptia-white.webp",
    imageClass: "",
    date: "Nov 2023",
    link: "https://www.credly.com/badges/82755364-a4a7-4272-a446-2d7d07662f48/linked_in_profile",
  },
  {
    name: "AWS Cloud Foundations",
    org: "AWS Academy",
    icon: "/icons/aws.webp",
    imageClass: "p-2",
    date: "Apr 2026",
    link: "https://www.credly.com/badges/96846437-3bb4-48cd-95f2-a9b4540fb83e/public_url",
  },
  {
    name: "Responsive Web Design",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2024",
    link: "https://www.freecodecamp.org/certification/iyawn/responsive-web-design",
  },
  {
    name: "JavaScript Algorithms",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Mar 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/javascript-algorithms-and-data-structures",
  },
  {
    name: "Back End Development",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.webp",
    imageClass: "p-2",
    date: "Sep 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/back-end-development-and-apis",
  },
];

export default function ResumePage() {
  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      <div
        className="flex flex-col md:flex-row items-center md:justify-between gap-6 md:gap-8 border-b border-border/40 pb-8 text-center md:text-left w-full"
      >
        <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-auto">
          <div>
            <h1 className={`text-4xl md:text-5xl font-medium tracking-tight leading-[1.08] text-foreground lg:text-6xl ${reveal.primary}`}>
              Ian Macabulos
            </h1>
          </div>

          <div className={`flex flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 text-sm text-muted-foreground ${reveal.secondary}`}>
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

        <div className={`flex justify-center w-full md:w-auto shrink-0 mt-2 md:mt-0 ${reveal.secondary} ${reveal.controls}`}>
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-background text-foreground flex items-center space-x-2 px-6 py-3 font-medium transition-all hover:scale-105 active:scale-95"
            >
              <Eye className="h-4 w-4" />
              <span>View Resume</span>
            </HoverBorderGradient>
          </Link>
        </div>
      </div>

      <div className={`flex w-full flex-col gap-12 ${reveal.secondary} ${reveal.media}`}>
        <section
          className="space-y-6 w-full"
        >
          <div className="flex items-center gap-3 pb-2 border-border/40 mb-2">
            <div className="p-2 bg-primary/10 rounded-md text-primary">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium tracking-tight">Professional Summary</h2>
          </div>
        
          <p className="text-muted-foreground leading-6 md:leading-7 text-base md:text-lg font-normal tracking-normal">
            Full-Stack Developer and Information Technology student with hands-on experience building web applications, backend services, and production-ready systems using modern technologies. Experienced across frontend and backend development, database design, API development, testing, deployment, and AI-assisted workflows. Open to entry-level software development roles and freelance opportunities where I can contribute to practical, reliable, and user-focused digital products.
          </p>
        </section>

        <section
          className="space-y-6 w-full"
        >
          <div className="flex items-center gap-3 pb-2 border-b border-border/40">
            <div className="p-2 bg-primary/10 rounded-md text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium tracking-tight">Work Experience</h2>
          </div>

          <WorkExperience />
        </section>

        <section
          className="space-y-6 w-full"
        >
          <div className="flex items-center gap-3 pb-2 border-b border-border/40">
            <div className="p-2 bg-primary/10 rounded-md text-primary">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium tracking-tight">Education</h2>
          </div>

          <div className="space-y-6">
            <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground">
                    Holy Angel University
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base font-normal tracking-normal leading-5 md:leading-6">
                    Bachelor of Science in Information Technology, Major in Web Development
                  </p>
                </div>
                <Badge variant="secondary" className="w-fit h-fit py-1">
                  2023 – Expected Graduation: 2027
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary" />
                  <span>
                    Academic Honors: Consistent Dean’s and President’s Lister, A.Y. 2023-2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="space-y-6 w-full"
        >
          <div className="flex items-center gap-3 pb-2 border-b border-border/40">
            <div className="p-2 bg-primary/10 rounded-md text-primary">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-medium tracking-tight">Certifications &amp; Training</h2>
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
                  <h4 className="font-medium tracking-tight text-sm md:text-base leading-tight group-hover:text-primary transition-colors line-clamp-2">
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
        </section>
      </div>
    </div>
  );
}
