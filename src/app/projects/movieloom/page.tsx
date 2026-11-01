"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

export default function MovieLoomPage() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.iansebastian.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://www.iansebastian.dev/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "MovieLoom",
        item: "https://www.iansebastian.dev/projects/movieloom",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailLayout
        title="MovieLoom"
        subtitle="A Connected Movie & TV Discovery Interface"
        description="MovieLoom is a React-based movie and TV discovery interface powered by TMDB. It connects popular, currently playing, top-rated, and upcoming titles with search, genre browsing, people, cast information, trailers, images, and dedicated detail pages in one responsive single-page application. Built as a personal project in June 2025, it was one of my earlier frontend projects for organizing content-heavy external data into a connected experience."
        technologies={["React", "React Router", "Vite", "TMDB API"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/movieloom/movieloom-demo.mp4"
            poster="/projects/movieloom/movieloom-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the movie and TV browser or inspect how TMDB data is organized across search, discovery, people, and detail routes."
        links={[
          { label: "Live Site", href: "https://movieloom.iansebastian.dev/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/MovieLoom", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The interesting part was connecting the catalog, not just displaying it.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              MovieLoom consumes TMDB data across several discovery contexts. The
              homepage brings together popular, currently playing, top-rated, and
              upcoming movies, while its featured title loads additional details
              and cast information. Each shelf provides a route into the movie page
              and the surrounding catalog.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A search result can be a movie, a show, or a person.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              TMDB multi-search returns different result types. MovieLoom filters
              for entries it can display, then routes each type to the matching
              detail experience.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Movie</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  A title opens its dedicated movie detail page.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">TV show</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  A series opens its TV detail page, with its own credits and media.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Person</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  A performer opens a page of their credits and known work.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A title becomes useful when the surrounding context arrives with it.</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Title information</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Movie detail requests append credits, images, and videos. The
                  page presents release year, runtime, rating, overview, directors,
                  writers, and cast together.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Trailers and images</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Backdrops and additional videos extend the title page. When a
                  trailer is unavailable, the page falls back to a teaser and then
                  another YouTube video when available. Videos are embedded from
                  YouTube rather than hosted by MovieLoom.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Movies lead to people, and people lead back to more movies.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The people pages bring together trending people, popular actors,
              and individual profiles. A person&apos;s combined credits are
              deduplicated and ordered before more titles are revealed, giving
              visitors another path from a cast member to their wider filmography.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Genres became another route into the same catalog.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              MovieLoom fetches TMDB movie and TV genres, then groups popular
              results from both catalogs for browsing. Opening a genre provides
              more results that can be loaded progressively, with movie and TV
              entries leading to their existing detail routes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The project where content started shaping the architecture</h2>
            <p className="text-base leading-7 text-muted-foreground">
              MovieLoom was one of my earlier React projects, built as a personal
              frontend project with custom CSS rather than a styling framework. As
              its frontend developer, I worked through responsive grids and flex
              layouts, horizontal shelves, hero and detail layouts, modals, and
              breakpoint behavior. Connecting search results, titles, people,
              genres, and credits taught me how the shape of an external API can
              guide routes and interface structure.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
