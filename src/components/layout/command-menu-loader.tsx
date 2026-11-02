"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { CommandEntries } from "./command-menu";

const CommandMenu = dynamic(
  () => import("./command-menu").then((module) => module.CommandMenu),
  { ssr: false },
);

export function CommandMenuLoader({ entries }: { entries: CommandEntries }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loadFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShouldLoad(true);
      }
    };
    const loadFromEvent = () => setShouldLoad(true);

    document.addEventListener("keydown", loadFromKeyboard);
    window.addEventListener("open-command-palette", loadFromEvent);

    return () => {
      document.removeEventListener("keydown", loadFromKeyboard);
      window.removeEventListener("open-command-palette", loadFromEvent);
    };
  }, []);

  return shouldLoad ? <CommandMenu initialOpen entries={entries} /> : null;
}