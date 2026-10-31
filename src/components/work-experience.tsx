"use client";

import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react/ssr";
import { Collapsible } from "radix-ui";

import { Badge } from "@/components/ui/badge";
import styles from "./work-experience.module.css";

const WORK_EXPERIENCE = [
  {
    company: "FlyRank AI",
    companyName: "FlyRank AI",
    logo: "/companies/flyrank-ai.jpg",
    title: "Backend AI Engineer Intern",
    employmentType: "Internship",
    period: "Jul 2026 – Oct 2026",
    responsibilities: [
      "Engineered a TypeScript/Fastify usage metering and billing service for LLM applications, implementing tenant quotas, token tracking, idempotent requests, and micro-cent usage pricing with PostgreSQL.",
      "Integrated Stripe test-mode billing and webhook processing, with automated tests covering quota enforcement, usage accounting, checkout flows, and billing events.",
    ],
    skills: ["TypeScript", "Fastify", "PostgreSQL", "Stripe", "Testing"],
  },
  {
    company: "Sortr",
    companyName: "Sort Outsourcing Solutions Inc. (Sortr)",
    logo: "/companies/sortr.png",
    title: "Full-Stack Web Developer Intern",
    employmentType: "Internship",
    period: "Jun 2026 – Sep 2026",
    responsibilities: [
      "Built an internal IT service desk ticketing system for 50+ employees within the company domain, centralizing hardware and software issue reporting, automating ticket routing and status tracking, and providing the IT team with a structured support workflow from submission to resolution.",
      "Redesigned and optimized WordPress production pages, improving responsive layouts, content structure, technical SEO, image delivery, and overall frontend performance.",
    ],
    skills: ["Full-Stack", "WordPress", "Technical SEO", "Responsive Design", "Performance"],
  },
  {
    company: "Freelance",
    companyName: "Self-Employed / Project-Based",
    title: "Freelance Full-Stack Developer",
    employmentType: "Freelance",
    period: "Dec 2025 – Present",
    responsibilities: [
      "Built and deployed custom full-stack systems for local businesses and academic clients, replacing manual workflows with web applications for attendance, operations, reporting, and data management.",
      "Managed projects end to end—from requirements gathering and system architecture to database design, authentication, testing, deployment, and client handoff—delivering solutions used by dozens to hundreds of users across different academic and business workflows.",
    ],
    skills: ["Full-Stack", "Database Design", "Authentication", "Testing", "Deployment", "System Architecture"],
  },
] as const;

export function WorkExperience() {
  return (
    <div className="space-y-8">
      {WORK_EXPERIENCE.map((experience, index) => {
        return (
          <div key={experience.company}>
            <div className="flex items-center gap-3">
              {"logo" in experience ? (
                <span
                  className={`flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md p-0.5 ${experience.company === "Sortr" ? "bg-[#061029]" : "bg-black"}`}
                >
                  <Image
                    src={experience.logo}
                    alt=""
                    width={28}
                    height={28}
                    unoptimized
                    className="size-full object-contain"
                  />
                </span>
              ) : (
                <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-black p-0.5 dark:bg-white">
                  <Image
                    src="/logo/personal-logo-black.png"
                    alt="Ian mark"
                    width={28}
                    height={28}
                    unoptimized
                    className="size-full object-contain dark:invert"
                  />
                </span>
              )}
              <h3 title={experience.companyName} className="text-lg font-medium tracking-tight text-foreground">
                {experience.company}
              </h3>
            </div>

            <div className="ml-3.5 mt-3 border-l border-border pl-4">
              <Collapsible.Root defaultOpen={index === 0}>
                <h4>
                  <Collapsible.Trigger className="flex min-h-11 w-full flex-col gap-1 rounded-md p-2 text-left outline-none transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-muted/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none">
                    <span className="flex w-full min-w-0 items-center justify-between gap-4">
                      <span className="min-w-0 text-base font-medium text-foreground">{experience.title}</span>
                      <CaretDown
                        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none [[data-state=open]_&]:rotate-180"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex w-full flex-col gap-1 text-sm font-normal text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
                      <span>{experience.employmentType}</span>
                      <span aria-hidden="true" className="hidden sm:inline">
                        ·
                      </span>
                      <span className="tabular-nums">{experience.period}</span>
                    </span>
                  </Collapsible.Trigger>
                </h4>

                <Collapsible.Content className={styles.content}>
                  <ul className="ml-2 mr-2 mt-3 list-disc space-y-2 pl-4 text-sm font-normal tracking-normal leading-6 text-muted-foreground marker:text-[0.65em] marker:text-muted-foreground">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </Collapsible.Content>

                <div className="ml-2 mr-2 mt-3 flex flex-wrap gap-1.5">
                  {experience.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="rounded-md border-border bg-muted/40 px-2 py-0.5 text-xs font-normal text-muted-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Collapsible.Root>
            </div>
          </div>
        );
      })}
    </div>
  );
}
