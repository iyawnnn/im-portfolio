"use client";

import React, { useState } from "react";
import { Search, RotateCcw, TestTube } from "lucide-react";
import {
  SiReact,
  SiVuedotjs,
  SiAngular,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiBootstrap,
  SiPython,
  SiPhp,
  SiMongodb,
  SiMysql,
  SiVercel,
  SiPostman,
  SiFigma,
  SiGithub,
  SiGit,
  SiDart,
  SiFlutter,
  SiNetlify,
  SiAmazon,
  SiWordpress,
  SiSupabase,
  SiPrisma,
  SiPostgresql,
  SiVitest,
  SiGithubactions,
  SiPytest, // Added
  SiFastapi, // Added
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Tool {
  name: string;
  description: string;
  icon: React.ElementType;
  tags: string[];
}

interface ToolCategory {
  category: string;
  items: Tool[];
}

const toolsData: ToolCategory[] = [
  {
    category: "Frontend Development",
    items: [
      {
        name: "Next.js 15",
        description: "The React Framework for the Web.",
        icon: SiNextdotjs,
        tags: ["React", "SSR", "RSC"],
      },
      {
        name: "React",
        description: "Library for building user interfaces.",
        icon: SiReact,
        tags: ["UI", "Components"],
      },
      {
        name: "TypeScript",
        description: "Strongly typed superset of JavaScript.",
        icon: SiTypescript,
        tags: ["Language", "Type Safety"],
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework for rapid UI.",
        icon: SiTailwindcss,
        tags: ["CSS", "Styling"],
      },
      {
        name: "Vue.js",
        description: "The Progressive JavaScript Framework.",
        icon: SiVuedotjs,
        tags: ["Framework", "UI"],
      },
      {
        name: "Angular",
        description: "Platform for building scalable web apps.",
        icon: SiAngular,
        tags: ["Framework", "Google"],
      },
      {
        name: "Bootstrap",
        description: "Feature-packed frontend toolkit.",
        icon: SiBootstrap,
        tags: ["CSS", "Framework"],
      },
    ],
  },
  {
    category: "Backend Development",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime on Chrome's V8 engine.",
        icon: SiNodedotjs,
        tags: ["Runtime", "Backend"],
      },
      {
        name: "Express.js",
        description: "Fast, minimalist web framework.",
        icon: SiExpress,
        tags: ["Framework", "API"],
      },
      {
        name: "FastAPI",
        description: "High-performance Python API framework.",
        icon: SiFastapi,
        tags: ["Python", "API"],
      },
      {
        name: "Prisma",
        description: "Next-gen Node.js and TypeScript ORM.",
        icon: SiPrisma,
        tags: ["ORM", "Database"],
      },
      {
        name: "Python",
        description: "Versatile language for rapid development.",
        icon: SiPython,
        tags: ["Language", "Data"],
      },
      {
        name: "Java",
        description: "Robust, object-oriented language.",
        icon: FaJava,
        tags: ["Language", "OOP"],
      },
      {
        name: "PHP",
        description: "Popular server-side scripting language.",
        icon: SiPhp,
        tags: ["Language", "Server-side"],
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "PostgreSQL",
        description: "Advanced open source relational database.",
        icon: SiPostgresql,
        tags: ["Database", "SQL"],
      },
      {
        name: "Supabase",
        description: "Open Source Firebase alternative.",
        icon: SiSupabase,
        tags: ["BaaS", "Realtime"],
      },
      {
        name: "MongoDB",
        description: "Modern application data platform.",
        icon: SiMongodb,
        tags: ["Database", "NoSQL"],
      },
      {
        name: "MySQL",
        description: "World's most popular open source DB.",
        icon: SiMysql,
        tags: ["Database", "SQL"],
      },
    ],
  },
  {
    category: "Testing & QA",
    items: [
      {
        name: "Vitest",
        description: "Blazing fast Vite-native unit testing.",
        icon: SiVitest,
        tags: ["Testing", "Unit"],
      },
      {
        name: "Pytest",
        description: "Mature full-featured Python testing tool.",
        icon: SiPytest,
        tags: ["Testing", "Python"],
      },
      {
        name: "Playwright",
        description: "Reliable E2E testing for modern apps.",
        icon: TestTube,
        tags: ["Testing", "E2E"],
      },
      {
        name: "Postman",
        description: "Platform for building and using APIs.",
        icon: SiPostman,
        tags: ["API", "Testing"],
      },
    ],
  },
  {
    category: "DevOps & Deployment",
    items: [
      {
        name: "Vercel",
        description: "Develop, Preview, Ship frontends fast.",
        icon: SiVercel,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Amazon Web Services",
        description: "Comprehensive, evolving cloud computing platform.",
        icon: SiAmazon,
        tags: ["Cloud", "Infrastructure"],
      },
      {
        name: "Netlify",
        description: "The fastest way to build modern sites.",
        icon: SiNetlify,
        tags: ["Deployment", "CDN"],
      },
      {
        name: "GitHub Actions",
        description: "Automate software workflows with CI/CD.",
        icon: SiGithubactions,
        tags: ["CI/CD", "Automation"],
      },
    ],
  },
  {
    category: "Tools & Workflow",
    items: [
      {
        name: "Git",
        description: "Distributed version control system.",
        icon: SiGit,
        tags: ["Version Control"],
      },
      {
        name: "GitHub",
        description: "Platform for code hosting and collaboration.",
        icon: SiGithub,
        tags: ["Collaboration", "Git"],
      },
      {
        name: "Figma",
        description: "Collaborative interface design tool.",
        icon: SiFigma,
        tags: ["Design", "UI/UX"],
      },
      {
        name: "WordPress",
        description: "Open source CMS for beautiful websites.",
        icon: SiWordpress,
        tags: ["CMS", "PHP"],
      },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      {
        name: "Flutter",
        description: "UI toolkit for natively compiled apps.",
        icon: SiFlutter,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Dart",
        description: "Client-optimized language for fast apps.",
        icon: SiDart,
        tags: ["Language", "Mobile"],
      },
    ],
  },
];

export default function StackPage() {
  const [query, setQuery] = useState("");

  const filteredTools = toolsData
    .map((category) => {
      const filteredItems = category.items.filter((item) => {
        const searchLower = query.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      });

      return {
        ...category,
        items: filteredItems,
      };
    })
    .filter((category) => category.items.length > 0);

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground py-10 lg:py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto w-full flex flex-col flex-grow">
        {/* Header Section */}
        <div className="space-y-6 lg:space-y-8 w-full shrink-0 mb-10 lg:mb-16">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              My Development Arsenal
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The languages, frameworks, databases, and tools that keep me
              coding, caffeinated, and occasionally questioning my life choices.
              These are the technologies I trust to make sure projects ship.
            </p>
          </div>

          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-10 lg:h-12 w-full bg-secondary/50 border-transparent hover:border-border/50 focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/5 rounded-2xl text-sm lg:text-base transition-all duration-300 placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col relative">
          {filteredTools.length > 0 ? (
            <div className="space-y-10 lg:space-y-16">
              {filteredTools.map((category, idx) => (
                <section key={idx} className="space-y-4 lg:space-y-6">
                  <h2 className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                    {category.category}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                    {category.items.map((tool, toolIdx) => (
                      <Card
                        key={toolIdx}
                        className="group border-border bg-card py-1 lg:py-2 hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                      >
                        <CardContent className="p-4 lg:p-5 flex items-start gap-4">
                          <div className="p-2 bg-secondary rounded-lg border border-border group-hover:border-primary/20 transition-colors shrink-0">
                            <tool.icon
                              className="w-6 h-6 text-foreground group-hover:text-primary transition-colors"
                              aria-label={`${tool.name} logo`}
                            />
                          </div>
                          <div className="space-y-2 w-full">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg">
                                {tool.name}
                              </h3>
                              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                                {tool.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              {tool.tags.map((tag, tagIdx) => (
                                <Badge
                                  key={tagIdx}
                                  variant="secondary"
                                  className="font-normal text-[10px] lg:text-xs px-2 py-0.5 border-border"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex-grow flex items-center justify-center py-12">
              <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                  <div className="relative bg-background border border-border w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                    <Search className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight">
                    No results found
                  </h3>
                  <p className="text-muted-foreground text-base px-6">
                    We couldn't find any tools matching{" "}
                    <span className="text-foreground font-semibold italic">
                      "{query}"
                    </span>
                    . Try adjusting your search or category.
                  </p>
                </div>

                <Button
                  onClick={() => setQuery("")}
                  variant="outline"
                  className="rounded-md px-8 h-11 border-border bg-background hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}