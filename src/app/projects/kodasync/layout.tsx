import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KodaSync - Neural Code & Knowledge Engine | Ian Macabulos",
  description:
    "A professional intelligence hub for developers. Features a neural chat interface, Monaco Editor, and semantic search powered by Next.js, FastAPI, and Groq SDK.",
  openGraph: {
    title: "KodaSync - Neural Code & Knowledge Engine | Ian Macabulos",
    description:
      "A professional intelligence hub for developers. Features a neural chat interface, Monaco Editor, and semantic search powered by Next.js, FastAPI, and Groq SDK.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function KodaSyncLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
