"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

export default function ClimaPHPage() {
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
        name: "ClimaPH",
        item: "https://www.iansebastian.dev/projects/climaph",
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
        title="ClimaPH"
        subtitle="Weather for Everyday Decisions"
        description="ClimaPH is a weather dashboard built around Philippine locations, combining current conditions, short-range forecasts, air-quality information, location search, and interactive weather maps in one responsive interface. It was one of my earlier projects for learning how to turn external data into a practical product instead of simply displaying raw responses."
        technologies={["Next.js", "TypeScript", "Zustand", "MapLibre"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/climaph/climaph-demo.mp4"
            poster="/projects/climaph/climaph-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the weather dashboard or inspect how location, forecast, air-quality, and map data are handled in the codebase."
        links={[
          { label: "Live Site", href: "https://climaph.iansebastian.dev/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/ClimaPH", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Weather data is easy to fetch. Making it useful is the actual interface problem.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              ClimaPH started with a simple goal: search for a place and understand
              its weather quickly. It brings current conditions, temperature,
              humidity and wind, a short-range forecast, air quality, and map context
              into one responsive view. The forecast comes from an external provider;
              the work here was shaping that data into an interface people can scan.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Location became the first part of the weather experience</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">Search Philippine locations</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Location search uses the OpenCage geocoding route, which limits
                  results to the Philippines before returning places to the dashboard.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">Use the current location</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Browser geolocation can load weather for the device&apos;s
                  coordinates. A reverse-geocoding lookup supplies a readable place
                  name when one is available.
                </p>
              </div>
            </div>
            <p className="text-base leading-7 text-muted-foreground">
              Zustand persists the selected location, temperature unit, favorite
              places, map settings, and onboarding state in the browser, so the
              dashboard remembers local preferences between visits.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Raw forecast intervals needed a clearer shape</h2>
            <p className="text-base leading-7 text-muted-foreground">
              OpenWeatherMap&apos;s forecast arrives as points across multiple
              intervals. ClimaPH groups available points into Morning, Afternoon,
              Evening, and Night for its temperature view, then summarizes the first
              three daily groups in a separate forecast. That adapts provider data
              to the way someone scans weather across a day without generating a
              forecast of its own.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A forecast becomes more useful when the surrounding conditions are visible too</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">Air quality</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The app retrieves air-pollution data and calculates an AQI-style
                  value from PM2.5 with its own helper. Wind direction appears
                  alongside the air-quality reading.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">Weather map</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  MapLibre displays weather layers as raster tiles requested through
                  an application route, with the selected location marked on the map.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">External data needs a clear application boundary</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Weather, location search, air-quality, and map-tile requests use
              Next.js route handlers, with their route keys read from server
              environment variables. The onboarding current-location lookup still
              calls OpenWeatherMap directly from the browser using a public
              environment key, so the boundary is not used by every provider request.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">An early project that taught me to design around data, not just display it</h2>
            <p className="text-base leading-7 text-muted-foreground">
              ClimaPH was one of the projects where I moved beyond calling an API
              and rendering its response. Location search, forecast grouping,
              persistent preferences, maps, and responsive data views pushed me to
              think about how external data becomes a product experience. The
              project is smaller than my later systems, but those lessons carried
              forward.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
