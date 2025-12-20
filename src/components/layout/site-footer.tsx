"use client";

import * as React from "react";

export function SiteFooter() {
  return (
    <div className="hidden lg:block w-full max-w-6xl mx-auto px-8 lg:px-12">
      <footer className="w-full rounded-t-xl border border-border/50 bg-card p-6 text-center text-sm text-muted-foreground shadow-sm">
        <p>
          &copy; {new Date().getFullYear()} Ian Macabulos. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
