"use client";

import { ActionTooltip } from "@/components/ui/action-tooltip";

export function AiChatLauncher({
  onClick,
  hidden,
  returning,
}: {
  onClick: () => void;
  hidden: boolean;
  returning: boolean;
}) {
  return (
    <ActionTooltip label="Ask Ian" shortcut="A" side="left" avoidCollisions={false} enabled={!hidden}>
      <button
        type="button"
        onClick={onClick}
        disabled={hidden}
        aria-hidden={hidden}
        aria-label="Ask me"
        aria-keyshortcuts="A"
        className={`fixed right-[max(1.5rem,env(safe-area-inset-right))] bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 hidden size-16 flex-col items-center justify-center rounded-full border border-border bg-background p-0 font-sans text-xs font-medium leading-[1.1] tracking-[0.08em] text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.24)] transition-[opacity,scale,rotate,background-color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:rotate-3 hover:border-foreground/25 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-100 active:rotate-0 motion-reduce:scale-100 motion-reduce:rotate-0 motion-reduce:transition-none lg:flex ${
          returning ? "pointer-events-none opacity-100 scale-100 delay-[125ms]" : hidden ? "pointer-events-none opacity-0 scale-[0.94]" : "opacity-100"
        }`}
      >
        <span aria-hidden="true">ASK</span>
        <span aria-hidden="true">ME</span>
      </button>
    </ActionTooltip>
  );
}

