import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Experience",
  description: "Explore Ian Macabulos' professional experience, education, and certifications as a full-stack developer building reliable systems and polished interfaces.",
  path: "/experience",
});

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
