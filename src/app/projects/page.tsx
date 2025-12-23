"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- PROJECT DATA ---
const PROJECTS = [
  {
    title: "Mama R's System",
    description:
      "A bespoke Inventory and Sales Management System featuring real-time analytics, stock tracking, and automated reporting for a local business.",
    tags: ["MERN Stack", "Tailwind", "Recharts"],
    link: "/projects/mamars",
    image: "/projects/mamars/mamars-cover.png",
  },
  {
    title: "ClimaPH",
    description:
      "A high-performance weather platform tailored for the Philippines, integrating real-time forecasts with lifestyle metrics like laundry and umbrella guides.",
    tags: ["Next.js 15", "TypeScript", "API"],
    link: "/projects/climaph",
    image: "/projects/climaph/climaph-cover.png",
  },
  {
    title: "Thryve",
    description:
      "A unified health and fitness application tracking workouts, meals, and sleep with personalized analytics and achievement goals.",
    tags: ["MongoDB", "Express", "Vue.js", "Node.js"],
    link: "/projects/thryve",
    image: "/projects/thryve/thryve-cover.png",
  },
  {
    title: "MovieLoom",
    description:
      "A cinematic discovery interface allowing users to explore detailed movie metadata, cast profiles, and filmographies via the TMDb API.",
    tags: ["React", "Vite", "API", "CSS3"],
    link: "/projects/movieloom",
    image: "/projects/movieloom/movieloom-cover.png",
  },
  {
    title: "KusinaGo",
    description:
      "A dedicated food ordering system enabling seamless customer ordering and robust admin management for sales and inventory.",
    tags: ["PHP", "MongoDB", "E-commerce"],
    link: "/projects/kusinago",
    image: "/projects/kusinago/kusinago-cover.png",
  },
  {
    title: "Agos Coffee",
    description:
      "A minimalist brand showcase for a local coffee shop, featuring a clean layout for menus and store information.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    link: "/projects/agos-coffee",
    image: "/projects/agoscoffee/agoscoffee-cover.png",
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-10 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 w-full max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl text-foreground leading-[1.15]">
          Crafted Projects
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          A collection of applications, experiments, and tools I've built. From
          frontend interfaces to full-stack systems, these projects represent my
          journey in code.
        </p>
      </motion.div>

      {/* --- GRID --- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 items-start"
      >
        {PROJECTS.map((project, idx) => (
          <Link key={idx} href={project.link} className="group block h-full">
            <Card className="h-full p-0 gap-2 overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 border border-border/50 bg-card flex flex-col">
              {/* IMAGE THUMBNAIL AREA */}
              <div className="relative w-full overflow-hidden border-b border-border/50">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
              </div>

              {/* CARD CONTENT */}
              <CardHeader className="px-6 pt-3 pb-1">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm sm:text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>

              {/* FOOTER */}
              <CardFooter className="gap-2 mt-auto flex-wrap px-6 pb-4 pt-0">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-md group-hover:bg-background transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </motion.section>
    </div>
  );
}