export function searchShortcut(platform: string) {
  return /Mac|iPhone|iPad|iPod/i.test(platform) ? "⌘ K" : "Ctrl K";
}

export function ignoreSingleKey(event: KeyboardEvent) {
  return event.defaultPrevented || event.repeat || event.isComposing ||
    event.ctrlKey || event.metaKey || event.altKey ||
    (event.target instanceof Element && Boolean(event.target.closest(
      "input, textarea, select, [contenteditable]",
    )));
}
