"use client";

import { useCallback, useEffect, useEffectEvent, useMemo, useState } from "react";
import { Collapsible, Popover } from "radix-ui";
import { Smiley } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { BubbleReactions } from "@/components/ui/bubble";
import styles from "./chat-messages.module.css";

const REACTIONS = [
  { emoji: "❤️", label: "heart" },
  { emoji: "👍", label: "thumbs up" },
  { emoji: "👎", label: "thumbs down" },
  { emoji: "😂", label: "laugh" },
  { emoji: "‼️", label: "emphasis" },
  { emoji: "❓", label: "question" },
] as const;

export type Reaction = (typeof REACTIONS)[number]["emoji"];

export function readReactions(): Record<string, Reaction> {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem("portfolio-chat-reactions") ?? "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([, value]) =>
      REACTIONS.some(({ emoji }) => emoji === value),
    ));
  } catch {
    return {};
  }
}

export function ChatReactions({ value, onChange, open, touchMode, onOpenChange }: {
  value?: Reaction;
  onChange: (reaction: Reaction) => void;
  open: boolean;
  touchMode: boolean;
  onOpenChange: (open: boolean, touch?: boolean) => void;
}) {
  const [bubble, setBubble] = useState<HTMLElement | null>(null);
  const bubbleRef = useMemo(() => bubble ? { current: bubble } : undefined, [bubble]);
  const [boundary, setBoundary] = useState<HTMLElement | null>(null);
  const attachTrigger = useCallback((node: HTMLButtonElement | null) => {
    setBubble(node?.closest<HTMLElement>('[data-slot="bubble"]') ?? null);
    setBoundary(node?.closest<HTMLElement>("[data-chat-panel]") ?? null);
  }, []);
  // Retain the outgoing emoji until Radix finishes the chip's exit animation.
  const [displayedReaction, setDisplayedReaction] = useState(value);
  if (value && displayedReaction !== value) setDisplayedReaction(value);
  const label = REACTIONS.find(({ emoji }) => emoji === displayedReaction)?.label;
  const openFromHold = useEffectEvent(() => onOpenChange(true, true));

  useEffect(() => {
    if (!bubble) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let press: { id: number; x: number; y: number } | undefined;
    let held = false;
    const excluded = (target: EventTarget | null) => !(target instanceof Element) ||
      Boolean(target.closest('a, button, input, textarea, select, pre, code, [contenteditable], [role="button"]'));
    const cancel = () => {
      clearTimeout(timer);
      press = undefined;
    };
    const start = (event: PointerEvent) => {
      held = false;
      cancel();
      if (event.pointerType !== "touch" || !event.isPrimary || open || excluded(event.target)) return;
      if (window.getSelection()?.toString()) return;
      press = { id: event.pointerId, x: event.clientX, y: event.clientY };
      timer = setTimeout(() => {
        held = true;
        cancel();
        window.getSelection()?.removeAllRanges();
        openFromHold();
      }, 425);
    };
    const move = (event: PointerEvent) => {
      if (press && (event.pointerId !== press.id || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10)) cancel();
    };
    const suppressContext = (event: MouseEvent) => {
      if ((held || (open && touchMode)) && !excluded(event.target)) event.preventDefault();
    };
    bubble.addEventListener("pointerdown", start);
    bubble.addEventListener("contextmenu", suppressContext);
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerup", cancel);
    document.addEventListener("pointercancel", cancel);
    document.addEventListener("scroll", cancel, true);
    return () => {
      cancel();
      bubble.removeEventListener("pointerdown", start);
      bubble.removeEventListener("contextmenu", suppressContext);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", cancel);
      document.removeEventListener("pointercancel", cancel);
      document.removeEventListener("scroll", cancel, true);
    };
  }, [bubble, open, touchMode]);

  return (
    <>
      <Popover.Root open={open} onOpenChange={(next) => onOpenChange(next, touchMode)}>
        <Popover.Anchor virtualRef={bubbleRef} />
        <Popover.Trigger asChild>
          <Button
            ref={attachTrigger}
            variant="ghost"
            size="icon-sm"
            aria-label="Add reaction"
            className={`${styles.reactionTrigger} absolute -right-9 bottom-0 size-8 rounded-full text-muted-foreground`}
          >
            <Smiley className="size-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side="top"
            align="end"
            sideOffset={6}
            collisionPadding={12}
            collisionBoundary={boundary}
            sticky="always"
            aria-label="Message reactions"
            className={`${styles.tray} z-[100] flex w-fit gap-0.5 rounded-full border border-border bg-popover p-1 text-popover-foreground shadow-sm`}
          >
            {REACTIONS.map(({ emoji, label }) => (
              <button
                key={emoji}
                type="button"
                aria-label={`React with ${label}`}
                aria-pressed={value === emoji}
                className={`${styles.emoji} flex size-9 items-center justify-center rounded-full text-xl outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent`}
                onClick={() => { onChange(emoji); onOpenChange(false); }}
              >
                <span aria-hidden="true">{emoji}</span>
              </button>
            ))}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <Collapsible.Root open={Boolean(value)} className="contents">
        <Collapsible.Content asChild>
          <BubbleReactions
            side="bottom"
            align="end"
            className={`${styles.reactionChip} translate-y-1/2 border border-border bg-card shadow-sm ring-0`}
          >
            <button
              key={displayedReaction}
              type="button"
              aria-label={`Remove ${label} reaction`}
              className="flex h-6 min-w-8 items-center justify-center rounded-full px-1 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => { if (value) onChange(value); }}
            >
              <span aria-hidden="true">{displayedReaction}</span>
            </button>
          </BubbleReactions>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
}
