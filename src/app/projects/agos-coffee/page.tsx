"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Coffee, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgosCoffeePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center bg-background text-foreground">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* ICON & BADGE */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="relative h-20 w-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm">
              <Coffee className="w-10 h-10 text-primary" />
            </div>
          </div>
          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1">
            Coming Soon
          </Badge>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Brewing Something Special
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The project for <strong>Agos Coffee</strong> is currently being documented. 
            Check back soon to see how we built a minimalist brand showcase.
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="pt-4">
          <Button asChild variant="default" size="lg" className="font-bold rounded-full">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* TECH STACK PREVIEW (Optional: Keeps it informative) */}
        <div className="pt-8 border-t border-border/40">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Built With
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["HTML5", "CSS3", "JavaScript"].map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </main>
  );
}