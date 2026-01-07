"use client";

import React, { useState } from "react";
import Image from "next/image"; 
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Briefcase,
  GraduationCap,
  Award,
  Loader2,
  MapPin,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- CERTIFICATIONS DATA ---
const CERTIFICATIONS = [
  {
    name: "Back End Development and APIs",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.png", 
    imageClass: "p-2", 
    date: "Sep 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/back-end-development-and-apis",
  },
  {
    name: "CompTIA IT Fundamentals+ (ITF+)",
    org: "CompTIA",
    icon: "/icons/comptia-white.png", 
    imageClass: "", 
    date: "Nov 2023",
    link: "https://www.credly.com/badges/82755364-a4a7-4272-a446-2d7d07662f48/linked_in_profile",
  },
  {
    name: "Legacy JavaScript Algorithms and Data Structures",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.png",
    imageClass: "p-2",
    date: "Mar 2025",
    link: "https://www.freecodecamp.org/certification/iyawn/javascript-algorithms-and-data-structures",
  },
  {
    name: "Responsive Web Design",
    org: "freeCodeCamp",
    icon: "/icons/freecodecamp.png",
    imageClass: "p-2",
    date: "Sep 2024",
    link: "https://www.freecodecamp.org/certification/iyawn/responsive-web-design",
  },
];

export default function ResumePage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ian_Macabulos_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(false);
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      {/* --- HEADER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground leading-[1.15]">
              Ian Macabulos
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Pampanga, Philippines
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> iannmacabulos@gmail.com
              </span>
            </div>
          </div>
          
          <Button
            onClick={handleDownload}
            size="lg"
            className={`rounded-md font-bold shadow-sm transition-all h-11 px-6
              ${isDownloading ? "bg-primary/80 cursor-not-allowed" : "hover:translate-y-[-2px] active:translate-y-[1px]"}
            `}
          >
            <AnimatePresence mode="wait">
              {isDownloading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing...
                </motion.div>
              ) : (
                <motion.div
                  key="static"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download Resume
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>

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
          
          {/* FREELANCE ENTRY */}
          <div className="relative">
            {/* FIXED COLOR CIRCLE */}
            <span className="absolute -left-[41px] md:-left-[49px] top-1.5 h-5 w-5 rounded-full border-4 border-background bg-primary shadow-sm" />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                Freelance Full Stack Developer
              </h3>
              {/* ADDED w-fit HERE */}
              <span className="text-sm font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded w-fit">
                2025 - Present
              </span>
            </div>
            
            <p className="text-primary font-semibold mb-4">
              Self-Employed / Remote
            </p>
            
            <ul className="space-y-3 text-muted-foreground text-sm md:text-base leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Digital Transformation:</strong> Architected and deployed a custom Inventory & Sales Management System for an SME client, successfully digitizing 100% of manual paper records.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Analytics & Optimization:</strong> Engineered a real-time analytics dashboard using React and Node.js, enabling data-driven decision-making that reduced inventory waste and optimized stock levels.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                <span>
                  <strong>Security & Infrastructure:</strong> Implemented secure role-based authentication (JWT) and scalable cloud architecture, ensuring data integrity for sensitive business transactions.
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
              <Badge variant="outline" className="w-fit h-fit py-1">2023 — 2027</Badge>
            </div>
            
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-foreground">
                Major in Web Development
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>Consistent Dean&apos;s and President&apos;s Lister (A.Y. 2023-2025)</span>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <a 
              key={idx}
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md flex items-center gap-4"
            >
              {/* ICON CONTAINER */}
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

              <ChevronRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}