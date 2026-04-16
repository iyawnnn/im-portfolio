"use client";

import React, { useEffect, useState } from "react";
import { Terminal, CodeXml, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WakaTimeData {
  total: string;
  language: string;
}

export function WakaTimeCard() {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchWakaTime = async () => {
      if (document.visibilityState === "hidden") return;

      try {
        const response = await fetch("/api/wakatime", {
          headers: { "Cache-Control": "no-cache" },
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching WakaTime data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWakaTime();
    interval = setInterval(fetchWakaTime, 60000); 
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Skeleton className="h-[160px] w-full rounded-xl" />;
  }

  return (
    <Link
      href="https://wakatime.com/@iyawn"
      target="_blank"
      rel="noopener noreferrer"
      className="block group outline-none"
    >
      <Card className="relative flex flex-col h-[160px] w-full p-6 bg-[#0a0a0a] dark:bg-[#0a0a0a] border border-[#262626] hover:border-[#404040] transition-colors overflow-hidden shadow-sm">
        
        {/* Subtle Background Glow */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none transform-gpu" />

        {/* Top Header: Icon + Status */}
        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <CodeXml className="w-4 h-4 text-[#ededed]" />
            <span className="text-[10px] font-mono text-[#a3a3a3] tracking-widest uppercase">
              Dev Metrics
            </span>
          </div>
          
          {/* Tracking Indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#a3a3a3] uppercase">
              Last 7 Days
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ededed] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ededed]"></span>
            </span>
          </div>
        </div>

        {/* Bottom: Track Data & Action Button */}
        <div className="flex items-center gap-4 z-10 mt-auto w-full">
          {/* Terminal Icon Box */}
          <div className="relative flex items-center justify-center h-16 w-16 shrink-0 rounded-md overflow-hidden border border-[#262626] shadow-md bg-[#121212] group-hover:bg-[#1a1a1a] transition-colors">
            <Terminal className="h-6 w-6 text-[#ededed]" />
          </div>
          
          {/* Text Container */}
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#ededed] truncate leading-tight">
              {data?.total || "0 hrs"}
            </h3>
            <p className="text-sm font-medium text-[#a3a3a3] truncate mt-0.5">
              Logged
            </p>
            <p className="text-[10px] text-[#737373] truncate mt-1">
              Top: {data?.language || "Unknown"}
            </p>
          </div>

          {/* Right Action Indicator */}
          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full border border-[#262626] bg-[#171717] group-hover:bg-[#ededed] group-hover:text-[#0a0a0a] text-[#ededed] transition-colors">
             <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}