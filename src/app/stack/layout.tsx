import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tech Stack",
  description: "Explore the languages, frameworks, databases, tools, and platforms Ian Macabulos uses to build and ship full-stack web applications.",
  path: "/stack",
});

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
