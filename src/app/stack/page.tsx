"use client";

import React, { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, SiVuedotjs, SiAngular, SiTypescript, 
  SiNextdotjs, SiNodedotjs, SiExpress, SiTailwindcss, SiBootstrap, 
  SiPython, SiPhp, SiMongodb, SiMysql, SiVercel, SiPostman, SiFigma, SiGithub, 
  SiGit, SiDart, SiFlutter, SiNetlify, SiAmazon, SiWordpress
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
        name: "Next.js",
        description: "The React Framework for the Web.",
        icon: SiNextdotjs,
        tags: ["React", "SSR", "Full Stack"],
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
        description: "Utility-first CSS framework for rapid UI development.",
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
        description: "Platform for building mobile and desktop web apps.",
        icon: SiAngular,
        tags: ["Framework", "Google"],
      },
      {
        name: "JavaScript",
        description: "The programming language of the Web.",
        icon: SiJavascript,
        tags: ["Language", "Web"],
      },
      {
        name: "HTML5",
        description: "The standard markup language for documents.",
        icon: SiHtml5,
        tags: ["Markup", "Structure"],
      },
      {
        name: "CSS3",
        description: "Style sheet language used for describing presentation.",
        icon: SiCss3,
        tags: ["Style", "Layout"],
      },
      {
        name: "Bootstrap",
        description: "Powerful, extensible, and feature-packed frontend toolkit.",
        icon: SiBootstrap,
        tags: ["CSS", "Framework"],
      },
    ],
  },
  {
    category: "Backend & Languages",
    items: [
      {
        name: "Node.js",
        description: "JavaScript runtime built on Chrome's V8 engine.",
        icon: SiNodedotjs,
        tags: ["Runtime", "Backend"],
      },
      {
        name: "Express.js",
        description: "Fast, unopinionated, minimalist web framework for Node.js.",
        icon: SiExpress,
        tags: ["Framework", "API"],
      },
      {
        name: "Python",
        description: "Programming language that lets you work quickly.",
        icon: SiPython,
        tags: ["Language", "Data"],
      },
      {
        name: "Java",
        description: "High-level, class-based, object-oriented programming language.",
        icon: FaJava,
        tags: ["Language", "OOP"],
      },
      {
        name: "PHP",
        description: "Popular general-purpose scripting language for web development.",
        icon: SiPhp,
        tags: ["Language", "Server-side"],
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "MongoDB",
        description: "The application data platform for modern apps.",
        icon: SiMongodb,
        tags: ["Database", "NoSQL"],
      },
      {
        name: "MySQL",
        description: "The world's most popular open source database.",
        icon: SiMysql,
        tags: ["Database", "SQL"],
      },
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
      {
        name: "Amazon AWS",
        description: "Comprehensive, evolving cloud computing platform.",
        icon: SiAmazon,
        tags: ["Cloud", "Infrastructure"],
      },
      {
        name: "Vercel",
        description: "Develop, Preview, Ship. For the best frontend experience.",
        icon: SiVercel,
        tags: ["Deployment", "Hosting"],
      },
      {
        name: "Git",
        description: "Distributed version control system.",
        icon: SiGit,
        tags: ["Version Control"],
      },
      {
        name: "GitHub",
        description: "Platform for hosting and collaborating on code.",
        icon: SiGithub,
        tags: ["Collaboration", "Git"],
      },
      {
        name: "Netlify",
        description: "The fastest way to build the fastest sites.",
        icon: SiNetlify,
        tags: ["Deployment", "CDN"],
      },
    ],
  },
  {
    category: "Mobile Development",
    items: [
      {
        name: "Flutter",
        description: "Google's UI toolkit for building natively compiled applications.",
        icon: SiFlutter,
        tags: ["Mobile", "Cross-platform"],
      },
      {
        name: "Dart",
        description: "Client-optimized language for fast apps on any platform.",
        icon: SiDart,
        tags: ["Language", "Mobile"],
      },
    ],
  },
  {
    category: "Design, CMS & Tools",
    items: [
      {
        name: "Figma",
        description: "The collaborative interface design tool.",
        icon: SiFigma,
        tags: ["Design", "UI/UX"],
      },
      {
        name: "WordPress",
        description: "Open source software you can use to create beautiful websites.",
        icon: SiWordpress,
        tags: ["CMS", "PHP"],
      },
      {
        name: "Postman",
        description: "API platform for building and using APIs.",
        icon: SiPostman,
        tags: ["API", "Testing"],
      },
    ],
  },
];

export default function StackPage() {
  const [query, setQuery] = useState("");

  const filteredTools = toolsData.map((category) => {
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
  }).filter((category) => category.items.length > 0);

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
              The languages, frameworks, databases, and tools that keep me coding, 
              caffeinated, and occasionally questioning my life choices. These are 
              the technologies I trust to make sure projects ship.
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
                            <tool.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" aria-label={`${tool.name} logo`} />
                          </div>
                          <div className="space-y-2 w-full">
                            <div className="space-y-1">
                              <h3 className="font-semibold text-foreground text-lg">{tool.name}</h3>
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
            /* Premium Empty State */
            <div className="flex-grow flex items-center justify-center py-12">
              <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-300">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full" />
                  <div className="relative bg-background border border-border w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                    <Search className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight">No results found</h3>
                  <p className="text-muted-foreground text-base px-6">
                    We couldn't find any tools matching <span className="text-foreground font-semibold italic">"{query}"</span>. 
                    Try adjusting your search or category.
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