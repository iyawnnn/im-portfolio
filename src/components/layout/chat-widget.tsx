"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { CircleNotch as LoaderCircle } from "@phosphor-icons/react/ssr";
import { AiChatLauncher } from "@/components/ui/ai-chat-launcher";
import styles from "./chat-widget.module.css";

const ChatPanel = dynamic(
  () => import("./chat-panel").then((module) => module.ChatPanel),
  {
    ssr: false,
    loading: () => <ChatPanelLoading />,
  },
);

function ChatPanelLoading() {
  return (
    <div
      className="flex h-full items-center justify-center"
      role="status"
      aria-label="Loading AI chat"
    >
      <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none text-muted-foreground" />
    </div>
  );
}

export function ChatWidget() {
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">("closed");

  const openChat = useCallback(() => {
    setPhase((current) => current === "open" ? current : "opening");
  }, []);

  const closeChat = useCallback(() => {
    setPhase(matchMedia("(prefers-reduced-motion: reduce)").matches ? "closed" : "closing");
  }, []);

  useEffect(() => {
    if (phase !== "opening") return;
    let nextFrame = 0;
    const frame = requestAnimationFrame(() => {
      nextFrame = requestAnimationFrame(() => setPhase("open"));
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(nextFrame);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;
    const timeout = window.setTimeout(() => setPhase("closed"), 205);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, [openChat]);

  return (
    <>
      <AiChatLauncher onClick={openChat} hidden={phase !== "closed"} returning={phase === "closing"} />
      {phase !== "closed" && (
        <div
          className={styles.shell}
          data-state={phase}
          onTransitionEnd={(event) => {
            if (phase === "closing" && event.target === event.currentTarget && event.propertyName === "transform") {
              setPhase("closed");
            }
          }}
        >
          <ChatPanel onClose={closeChat} />
        </div>
      )}
    </>
  );
}
