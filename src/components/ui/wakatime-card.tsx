import React from "react";
import { Terminal, CodeXml, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

async function fetchWakaTimeData() {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
      },
      // ISR: Cache the result and revalidate silently every 60 seconds
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    const json = await response.json();
    
    return {
      total: json.data.human_readable_total,
      language: json.data.languages?.[0]?.name || "Unknown",
    };
  } catch (error) {
    return null;
  }
}

export async function WakaTimeCard() {
  const data = await fetchWakaTimeData();

  return (
    <Link href="https://wakatime.com/@iyawn" target="_blank" rel="noopener noreferrer" className="block group outline-none">
      <Card className="relative flex flex-col h-[160px] w-full p-6 bg-[#0a0a0a] dark:bg-[#0a0a0a] border border-[#262626] hover:border-[#404040] transition-colors overflow-hidden shadow-sm transform-gpu">
        
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ededed]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none will-change-[opacity] transform-gpu" />

        <div className="flex justify-between items-start z-10">
          <div className="flex items-center gap-2">
            <CodeXml className="w-4 h-4 text-[#ededed]" />
            <span className="text-[10px] font-mono text-[#a3a3a3] tracking-widest uppercase">Dev Metrics</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#a3a3a3] uppercase">Last 7 Days</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ededed] opacity-75 will-change-transform transform-gpu"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ededed]"></span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 z-10 mt-auto w-full">
          <div className="relative flex items-center justify-center h-16 w-16 shrink-0 rounded-md overflow-hidden border border-[#262626] shadow-md bg-[#121212] group-hover:bg-[#1a1a1a] transition-colors transform-gpu">
            <Terminal className="h-6 w-6 text-[#ededed]" />
          </div>
          
          <div className="flex flex-col min-w-0 flex-1">
            <h3 className="text-base font-bold text-[#ededed] truncate leading-tight">
              {data?.total || "0 hrs"}
            </h3>
            <p className="text-sm font-medium text-[#a3a3a3] truncate mt-0.5">Logged</p>
            <p className="text-[10px] text-[#737373] truncate mt-1">
              Top: {data?.language || "Unknown"}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full border border-[#262626] bg-[#171717] group-hover:bg-[#ededed] group-hover:text-[#0a0a0a] text-[#ededed] transition-colors transform-gpu">
             <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </Link>
  );
}