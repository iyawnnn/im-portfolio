import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieLoom | A Connected Movie & TV Discovery Interface",
  description:
    "A personal React project for browsing TMDB movies, TV shows, people, genres, credits, trailers, and connected title pages in a responsive single-page interface.",
  alternates: {
    canonical: "/projects/movieloom",
  },
  openGraph: {
    title: "MovieLoom | A Connected Movie & TV Discovery Interface",
    description:
      "A personal React project for browsing TMDB movies, TV shows, people, genres, credits, trailers, and connected title pages in a responsive single-page interface.",
    siteName: "Ian Macabulos Portfolio",
    type: "website",
  },
};

export default function MovieLoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
