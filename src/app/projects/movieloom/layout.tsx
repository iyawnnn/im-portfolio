import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MovieLoom - Cinematic Discovery Engine | Ian Macabulos",
  description: "A responsive React application for discovering movies and TV shows. Features real-time search, genre filtering, and deep dives into cast and crew data via the TMDB API.",
  openGraph: {
    title: "MovieLoom - Cinematic Discovery Engine | Ian Macabulos",
    description: "A responsive React application for discovering movies and TV shows. Features real-time search, genre filtering, and deep dives into cast and crew data via the TMDB API.",
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


