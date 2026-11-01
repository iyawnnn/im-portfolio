"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

const reportWorkflow = [
  ["Report", "A resident describes a maintenance issue and attaches photo evidence."],
  ["Locate", "Coordinates and barangay context place the report on the map."],
  ["Add context", "The backend flags possible duplicates, fetches elevation when needed, and applies weather/commercial-zone priority rules."],
  ["Review", "Administrators inspect the report alongside its map location and supporting context."],
  ["Update", "Status moves through Reported, Under Review, In Progress, and Resolved as the case is handled."],
  ["Track", "The report’s status history makes its progression visible after submission."],
];

const prioritizationRules = [
  ["Weather-aware commercial-zone priority", "The backend polls and caches current Angeles City weather. When a report is in a configured priority commercial zone and the cached state indicates rain, it sets the high-priority flag and Critical severity. The rule is explicit and inspectable."],
  ["Possible duplicate detection", "A same-category report created within the previous 24 hours and roughly 50 meters flags the new submission as a possible duplicate. Both records remain available for review; they are not automatically merged."],
  ["Simplified elevation-based downstream context", "For active Flooding and Clogged Drain reports, the system compares locations within roughly 500 meters. A qualifying source is linked to the lowest nearby lower-elevation report. This adds distance/elevation context for review, not a prediction of floodwater flow."],
];

const engineeringDecisions = [
  ["Zoneless Angular", "The Angular 21 frontend uses provideZonelessChangeDetection() with reactive state for maps, photo uploads, and report updates. This keeps interface changes tied to the state that changed rather than relying on legacy global change detection."],
  ["Location belongs in the data model", "MongoDB and Mongoose store report locations as GeoJSON points with a geospatial index. Proximity checks work with the report’s coordinates instead of treating location as a text label attached afterward."],
  ["Different interfaces for different jobs", "A resident needs to report an issue quickly from a phone. An administrator needs to filter, compare, and manage many reports. Separate citizen and administrative experiences give each workflow the density and controls it needs."],
];

export default function AcCorePage() {
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
        name: "AC-CORE",
        item: "https://www.iansebastian.dev/projects/ac-core",
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
        title="AC-CORE"
        subtitle="Municipal Maintenance & Incident Reporting for Angeles City"
        description="AC-CORE is a civic-tech academic team project designed around Angeles City’s municipal maintenance workflow. Citizens submit geotagged reports with photo evidence, while an administrative command center brings maps, environmental context, status history, and exports into one review workflow."
        technologies={["Angular", "TypeScript", "Node.js", "MongoDB", "Leaflet.js"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/ac-core/accore-demo.mp4"
            poster="/projects/ac-core/accore-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the live reporting workflow or inspect the implementation behind the citizen and administrative experiences."
        links={[
          { label: "Live Site", href: "https://ac-core.vercel.app/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/MMPA-Works/AC-CORE", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">A report should not disappear into a black box</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Residents can notice a pothole, blocked drain, or damaged streetlight
              long before it becomes a larger problem. Reporting only helps if
              that observation reaches a maintenance review workflow and the
              resident can follow what happens next. AC-CORE connects citizen
              observations with administrative review so a submission becomes
              a traceable case.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Two sides of the same workflow</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="text-lg font-medium">Citizen reporting</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Account and guest reporting capture the issue’s category,
                  severity, GPS coordinates, barangay, and photo evidence.
                  Report details and status history let residents follow progress
                  after submission.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="text-lg font-medium">Administrative review</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  A clustered Leaflet map connects incoming reports with spatial
                  context. Search, filters, severity and status controls,
                  historical records, and CSV exports support review across
                  the reporting queue.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">From street report to traceable case</h2>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {reportWorkflow.map(([title, description], index) => (
                <li key={title} className="flex min-w-0 gap-4 py-4">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">{index + 1}</span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-base leading-7 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Prioritization rules that can be explained</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              {prioritizationRules.map(([title, description]) => (
                <div key={title} className="min-w-0 py-5 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Keeping location, evidence, and status together</h2>
            <p className="text-base leading-7 text-muted-foreground">
              A reviewer should not have to reconstruct an issue from separate
              messages and photos. The report keeps its description, category,
              coordinates, barangay, severity, and Cloudinary-hosted evidence
              alongside community verifications and status history. The report
              itself becomes the record that both sides can inspect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">My role in AC-CORE</h2>
            <p className="text-base leading-7 text-muted-foreground">
              AC-CORE was developed by MMPA Works as a team project. I worked as
              Lead Full-Stack Developer &amp; Project Manager, helping shape the
              product direction while leading implementation of the citizen-facing
              experience and coordinating the project across its frontend,
              backend, geospatial, and QA workstreams.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Engineering decisions</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              {engineeringDecisions.map(([title, description]) => (
                <div key={title} className="min-w-0 py-5 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">From report to something an operator can act on</h2>
            <p className="text-base leading-7 text-muted-foreground">
              AC-CORE turns a resident’s observation into a structured maintenance
              record that can be located, reviewed, prioritized, updated, and
              exported. The project taught me that civic reporting goes beyond
              the form: the harder part is designing what happens after someone
              presses submit.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
