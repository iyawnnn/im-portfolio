"use client";

import reveal from "@/components/layout/page-reveal.module.css";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw, TestTube, ChevronLeft, ChevronRight, Bot, Workflow } from "lucide-react";
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
  SiAmazonwebservices,
  SiWordpress,
  SiNestjs,
  SiPostgresql,
  SiVitest,
  SiJest,
  SiGithubactions,
  SiPytest, 
  SiFastapi,
  SiLaravel,
  SiRender,
  SiExpo,
  SiShadcnui,
  SiSupabase,
  SiPrisma,
  SiUpstash,
  SiCloudflare,
  SiClaude,
  SiOpenai,
  SiN8N,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ToolIcon = React.ComponentType<{
  className?: string;
  "aria-label"?: string;
}>;

interface Tool {
  name: string;
  description: string;
  icon: ToolIcon;
  tags: string[];
}

interface ToolCategory {
  category: string;
  items: Tool[];
}

function ToolLogo({ tool }: { tool: Tool }) {
  const Icon = tool.icon;

  return (
    <Icon
      className="size-5 text-foreground transition-colors duration-200 ease-[cubic-bezier(.22,1,.36,1)] group-hover:text-primary motion-reduce:transition-none"
      aria-label={tool.name + " icon"}
    />
  );
}

const toolsData: ToolCategory[] = [
  {
    category: "Frontend Development",
    items: [
      {
        name: "Next.js",
        description: "React framework for server-rendered web applications.",
        icon: SiNextdotjs,
        tags: ["React", "SSR", "RSC"],
      },
      {
        name: "React",
        description: "Library for building component-based user interfaces.",
        icon: SiReact,
        tags: ["UI", "Components"],
      },
      {
        name: "TypeScript",
        description: "Typed JavaScript for safer application development.",
        icon: SiTypescript,
        tags: ["Language", "Type Safety"],
      },
      {
        name: "Tailwind CSS",
        description: "Utility classes for building responsive interfaces quickly.",
        icon: SiTailwindcss,
        tags: ["CSS", "Styling"],
      },
      {
        name: "Vue.js",
        description: "JavaScript framework for building reactive web interfaces.",
        icon: SiVuedotjs,
        tags: ["Framework", "UI"],
      },
      {
        name: "Angular",
        description: "Framework for structured, scalable web applications.",
        icon: SiAngular,
        tags: ["Framework", "Google"],
      },
      {
        name: "Bootstrap",
        description: "Component toolkit for responsive frontend interfaces.",
        icon: SiBootstrap,
        tags: ["CSS", "Framework"],
      },
      {
        name: "shadcn/ui",
        description: "Accessible UI components for Tailwind CSS projects.",
        icon: SiShadcnui,
        tags: ["UI", "Components", "Tailwind"],
      },
    ],
  },
  {
    category: "Backend Development",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side application development.",
        icon: SiNodedotjs,
        tags: ["Runtime", "Backend"],
      },
      {
        name: "Laravel",
        description: "PHP framework for structured web application development.",
        icon: SiLaravel,
        tags: ["Framework", "PHP"],
      },
      {
        name: "Express.js",
        description: "Minimal framework for Node.js APIs and services.",
        icon: SiExpress,
        tags: ["Framework", "API"],
      },
      {
        name: "FastAPI",
        description: "Python framework for building typed API services.",
        icon: SiFastapi,
        tags: ["Python", "API"],
      },
      {
        name: "NestJS",
        description: "Node.js framework for modular backend applications.",
        icon: SiNestjs,
        tags: ["Framework", "Node.js"],
      },
      {
        name: "Python",
        description: "General-purpose language for applications and automation.",
        icon: SiPython,
        tags: ["Language", "Data"],
      },
      {
        name: "Java",
        description: "Object-oriented language for enterprise application development.",
        icon: FaJava,
        tags: ["Language", "OOP"],
      },
      {
        name: "PHP",
        description: "Server-side language for dynamic web applications.",
        icon: SiPhp,
        tags: ["Language", "Server-side"],
      },
    ],
  },
  {
    category: "Databases & Data",
    items: [
      {
        name: "PostgreSQL",
        description: "Relational database for structured application data.",
        icon: SiPostgresql,
        tags: ["Database", "SQL"],
      },
      {
        name: "MongoDB",
        description: "Document database for flexible application data models.",
        icon: SiMongodb,
        tags: ["Database", "NoSQL"],
      },
      {
        name: "MySQL",
        description: "Relational database for web application data.",
        icon: SiMysql,
        tags: ["Database", "SQL"],
      },
      {
        name: "Supabase",
        description: "Backend platform for data, authentication, and storage.",
        icon: SiSupabase,
        tags: ["PostgreSQL", "BaaS", "Backend"],
      },
      {
        name: "Prisma",
        description: "Type-safe ORM for application database access.",
        icon: SiPrisma,
        tags: ["ORM", "Database", "TypeScript"],
      },
      {
        name: "Upstash Redis",
        description: "Serverless Redis for rate limiting and view counts.",
        icon: SiUpstash,
        tags: ["Redis", "Rate Limiting", "Serverless"],
      },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      {
        name: "Claude Code",
        description: "Agentic coding tool for implementation, debugging, and repository-level development.",
        icon: SiClaude,
        tags: ["AI", "Coding", "Agents"],
      },
      {
        name: "Codex",
        description: "Coding agent for repository analysis, implementation, and focused development tasks.",
        icon: SiOpenai,
        tags: ["AI", "Coding", "Agents"],
      },
      {
        name: "Antigravity",
        description: "Agentic development environment for coding and multi-step software workflows.",
        icon: Bot,
        tags: ["AI", "Coding", "Agent", "Google"],
      },
      {
        name: "n8n",
        description: "Workflow automation for connecting APIs, services, and repeatable processes.",
        icon: SiN8N,
        tags: ["Automation", "Workflows", "Integrations"],
      },
      {
        name: "Power Automate",
        description: "Microsoft workflow automation for business processes and service integrations.",
        icon: Workflow,
        tags: ["Automation", "Microsoft", "Workflows"],
      },
    ],
  },
  {
    category: "Testing & QA",
    items: [
      {
        name: "Vitest",
        description: "Fast unit testing for modern JavaScript projects.",
        icon: SiVitest,
        tags: ["Testing", "Unit"],
      },
      {
        name: "Jest",
        description: "JavaScript testing framework for reliable application tests.",
        icon: SiJest,
        tags: ["Testing", "JavaScript"],
      },
      {
        name: "Pytest",
        description: "Python testing framework for concise automated tests.",
        icon: SiPytest,
        tags: ["Testing", "Python"],
      },
      {
        name: "Playwright",
        description: "End-to-end testing for modern web applications.",
        icon: TestTube,
        tags: ["Testing", "E2E"],
      },
      {
        name: "Postman",
        description: "API client for building and testing requests.",
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
        description: "Platform for deploying frontend web applications.",
        icon: SiVercel,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Render",
        description: "Cloud platform for hosting applications and databases.",
        icon: SiRender,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Amazon Web Services",
        description: "Cloud services for infrastructure and application hosting.",
        icon: SiAmazonwebservices,
        tags: ["Cloud", "Infrastructure"],
      },
      {
        name: "Netlify",
        description: "Platform for deploying modern web projects.",
        icon: SiNetlify,
        tags: ["Deployment", "CDN"],
      },
      {
        name: "GitHub Actions",
        description: "CI/CD automation for repository workflows and deployments.",
        icon: SiGithubactions,
        tags: ["CI/CD", "Automation"],
      },
      {
        name: "Cloudflare",
        description: "Edge platform for DNS, security, and delivery.",
        icon: SiCloudflare,
        tags: ["Infrastructure", "DNS", "Delivery"],
      },
    ],
  },
  {
    category: "Tools & Workflow",
    items: [
      {
        name: "Git",
        description: "Distributed version control for source code changes.",
        icon: SiGit,
        tags: ["Version Control"],
      },
      {
        name: "GitHub",
        description: "Code hosting and collaboration for Git repositories.",
        icon: SiGithub,
        tags: ["Collaboration", "Git"],
      },
      {
        name: "Figma",
        description: "Collaborative tool for interface design and prototyping.",
        icon: SiFigma,
        tags: ["Design", "UI/UX"],
      },
      {
        name: "WordPress",
        description: "Content management system for publishing websites.",
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
        description: "Toolkit for building cross-platform native applications.",
        icon: SiFlutter,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Dart",
        description: "Language for building fast client applications.",
        icon: SiDart,
        tags: ["Language", "Mobile"],
      },
      {
        name: "React Native",
        description: "Framework for building native apps with React.",
        icon: SiReact,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Expo",
        description: "Tooling for developing universal React applications.",
        icon: SiExpo,
        tags: ["Mobile", "Tooling"],
      },
    ],
  },
];

export default function StackPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = ["All", ...toolsData.map((data) => data.category)];

  const filteredTools = toolsData
    .filter((category) => activeCategory === "All" || category.category === activeCategory)
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

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10); 
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24 min-w-0">
      
      <div className="flex flex-col gap-6 w-full min-w-0">
        <div className="space-y-4">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-foreground ${reveal.primary}`}>
            My Development Arsenal
          </h1>
          <p className={`text-lg md:text-xl font-normal tracking-normal leading-7 text-muted-foreground w-full break-words ${reveal.secondary}`}>
            The languages, frameworks, databases, and tools that keep me
            coding, caffeinated, and occasionally questioning my life choices.
            These are the technologies I trust to make sure projects ship.
          </p>
        </div>

        <div className={`space-y-5 pt-4 min-w-0 ${reveal.secondary} ${reveal.details}`}>
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              type="text"
              aria-label="Search tools"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-12 lg:h-14 w-full bg-secondary/30 border-border hover:border-primary/50 focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl text-base transition-all duration-300 placeholder:text-muted-foreground/70"
            />
          </div>
          
          <div className="relative w-full flex items-center h-12 rounded-full min-w-0">
            
            <div 
              className={`absolute left-0 z-20 flex items-center justify-start h-full w-24 pl-1 bg-gradient-to-r from-background via-background/90 to-transparent transition-opacity duration-300 ${
                canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } hidden md:flex`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                aria-label="Scroll categories left"
                className="h-8 w-8 rounded-full shadow-sm bg-background border-border text-foreground hover:bg-secondary hover:text-primary transition-all shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div 
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex items-center w-full overflow-x-auto gap-2 scroll-smooth snap-x snap-mandatory px-1 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`relative px-5 h-9 text-sm font-medium rounded-full whitespace-nowrap transition-colors outline-none shrink-0 snap-start flex items-center justify-center ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border border-transparent hover:border-border/50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-filter-pill"
                        className="absolute inset-0 bg-primary shadow-sm rounded-full"
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>

            <div 
              className={`absolute right-0 z-20 flex items-center justify-end h-full w-24 pr-1 bg-gradient-to-l from-background via-background/90 to-transparent transition-opacity duration-300 ${
                canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } hidden md:flex`}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                aria-label="Scroll categories right"
                className="h-8 w-8 rounded-full shadow-sm bg-background border-border text-foreground hover:bg-secondary hover:text-primary transition-all shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col relative w-full min-w-0">
        {filteredTools.length > 0 ? (
          <div className={`space-y-8 lg:space-y-10 ${reveal.stackGroups}`}>
            {filteredTools.map((category, idx) => (
              <section key={idx} className="space-y-3 min-w-0">
                <h2 className="text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-wider pl-1">
                  {category.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 min-[87.5rem]:grid-cols-3 gap-3">
                  {category.items.map((tool, toolIdx) => (
                    <Card
                      key={toolIdx}
                      className="group h-full gap-0 border-border bg-card py-0 shadow-none hover:border-foreground/20 hover:bg-muted/20 transition-[background-color,border-color] duration-200 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none min-w-0"
                    >
                      <CardContent className="flex items-center gap-3 p-4 min-w-0">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted/50">
                          <ToolLogo tool={tool} />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <h3 className="truncate text-[15px] font-medium leading-5 text-foreground">
                            {tool.name}
                          </h3>
                          <p
                            title={tool.description}
                            className="line-clamp-2 text-[13px] leading-5 text-muted-foreground md:line-clamp-1"
                          >
                            {tool.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center py-12">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                <div className="relative bg-background border border-border w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <Search className="w-10 h-10 text-muted-foreground/40" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-medium tracking-tight">
                  No results found
                </h3>
                <p className="text-muted-foreground text-base px-6">
                  We couldn&apos;t find any tools matching{" "}
                  <span className="text-foreground font-semibold italic">
                    &quot;{query}&quot;
                  </span>
                  . Try adjusting your search or category.
                </p>
              </div>

              <Button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("All");
                }}
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
  );
}
