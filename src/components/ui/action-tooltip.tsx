"use client";

import { useState, type ReactElement } from "react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip";
import styles from "./action-tooltip.module.css";

type ActionTooltipProps = {
  children: ReactElement;
  label: string;
  shortcut?: string;
  external?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  avoidCollisions?: boolean;
  enabled?: boolean;
  desktopOnly?: boolean;
};

export function ActionTooltip({ children, label, shortcut, external, side = "right", avoidCollisions = true, enabled = true, desktopOnly = true }: ActionTooltipProps) {
  const [open, setOpen] = useState(false);
  if (!enabled && open) setOpen(false);

  return (
    <Tooltip
      delayDuration={300}
      disableHoverableContent
      open={enabled && open}
      onOpenChange={(next) => setOpen(next && enabled && matchMedia(
        desktopOnly ? "(min-width: 1024px) and (hover: hover) and (pointer: fine)" : "(hover: hover) and (pointer: fine)",
      ).matches)}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align="center"
        sideOffset={6}
        arrowPadding={4}
        avoidCollisions={avoidCollisions}
        data-desktop-only={desktopOnly || undefined}
        className={`${styles.content} z-[100] flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-sm`}
      >
        <span>{label}</span>
        {shortcut && <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-background/15 bg-background/10 px-1 font-sans text-[10px] font-medium text-background/80">{shortcut}</kbd>}
        {external && <span aria-hidden="true" className="text-background/70">↗</span>}
        <TooltipArrow width={8} height={4} className="fill-foreground" aria-hidden="true" />
      </TooltipContent>
    </Tooltip>
  );
}
