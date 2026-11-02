import { ProjectBreadcrumb } from "@/components/project-breadcrumb";
import { projectMetadata } from "@/lib/seo";

export const metadata = projectMetadata(
  "movieloom",
  "MovieLoom — Movie & TV Discovery App",
  "A personal React project for browsing TMDB movies, TV shows, people, genres, credits, trailers, and connected title pages in a responsive single-page interface.",
);

export default function MovieLoomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProjectBreadcrumb slug="movieloom" />
      {children}
    </>
  );
}
