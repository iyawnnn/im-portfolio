"use client";

import * as React from "react";

export function SiteFooter() {
  const credentialId = process.env.NEXT_PUBLIC_FLYRANK_CREDENTIAL_ID;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
      <footer className="flex flex-col items-center gap-4 w-full rounded-t-xl border border-border/50 bg-card p-6 text-center text-sm text-muted-foreground shadow-sm">
        <p>
          &copy; {new Date().getFullYear()} Ian Macabulos. All rights reserved.
        </p>
        {credentialId && (
          /* Official FlyRank generator: Chip, dark, with credential ID. */
          <a
            href={`https://internship.flyrank.ai/verify?id=${encodeURIComponent(credentialId)}&first_name=Ian`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify Ian Macabulos's FlyRank AI Internship credential ${credentialId}`}
            className="max-w-full rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            style={{
              boxSizing: "border-box",
              margin: 0,
              background: "#051F21",
              textDecoration: "none",
              fontFamily:
                "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
              fontStyle: "normal",
              lineHeight: 1.25,
              textTransform: "none",
              float: "none",
              WebkitFontSmoothing: "antialiased",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px 6px 11px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 9999,
              verticalAlign: "middle",
              whiteSpace: "nowrap",
              flexWrap: "wrap",
            }}
          >
            <svg
              width="11"
              height="15"
              viewBox="26 18 44 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              style={{
                display: "block",
                flex: "none",
                opacity: 1,
                transform: "none",
                maxWidth: "none",
              }}
            >
              <path
                d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5933 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
                fill="#54E399"
              />
            </svg>
            <span
              style={{
                margin: 0,
                padding: 0,
                border: 0,
                background: "none",
                color: "#FFFFFF",
                fontWeight: 600,
                fontStyle: "normal",
                letterSpacing: "normal",
                textTransform: "none",
                textDecoration: "none",
                whiteSpace: "normal",
                float: "none",
                fontSize: 13,
              }}
            >
              FlyRank verified
            </span>
            <span
              aria-hidden="true"
              style={{
                margin: 0,
                padding: 0,
                border: 0,
                background: "rgba(255,255,255,0.1)",
                color: "inherit",
                fontWeight: 400,
                fontStyle: "normal",
                letterSpacing: "normal",
                textTransform: "none",
                textDecoration: "none",
                whiteSpace: "normal",
                float: "none",
                width: 1,
                height: 14,
                flex: "none",
              }}
            />
            <span
              style={{
                margin: 0,
                padding: 0,
                border: 0,
                background: "none",
                color: "rgba(255,255,255,0.55)",
                fontWeight: 400,
                fontStyle: "normal",
                letterSpacing: "normal",
                textTransform: "none",
                textDecoration: "none",
                whiteSpace: "normal",
                float: "none",
                fontFamily: "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace",
                fontSize: 11,
              }}
            >
              {credentialId}
            </span>
          </a>
        )}
      </footer>
    </div>
  );
}
