import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";

import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";
import { type ProjectTechnology } from "@/components/ui/project-stack-badge";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";

const repository = "https://github.com/bettersanfernando/bettersanfernando";
const technologies: ProjectTechnology[] = ["Next.js", "TypeScript", "Tailwind CSS", "Zod", "MapLibre"];

const publicationSteps = [
  ["Official / public sources", "Attributable pages and records."],
  ["Research & verification", "Check evidence and retain uncertainty."],
  ["Publication review", "Approve what is safe to publish."],
  ["Frontend-safe export", "Reviewed, generated civic data."],
  ["Typed civic-data access", "Validate before application use."],
  ["Resident-facing interface", "Present facts with sources and limits."],
];

const capabilities = [
  ["Civic search", "Search published civic information using familiar terms and aliases."],
  ["Services", "Find requirements, responsible offices, and resident-facing guidance."],
  ["Projects & map", "Browse project records and supporting evidence alongside city and barangay geography."],
  ["Government & transparency", "Explore offices, contacts, legislation, public records, and statistics."],
];

const engineeringDecisions = [
  {
    title: "Source-aware civic data",
    description: "Reviewed public data passes through a typed access layer with Zod validation. Pages consume that layer instead of importing arbitrary research or generated files directly.",
  },
  {
    title: "Search in the words residents use",
    description: "MiniSearch and curated aliases connect office acronyms and government terminology to familiar English and Filipino phrases, so residents can search without knowing the official vocabulary.",
  },
  {
    title: "English + Filipino, with source fidelity",
    description: "i18next translates the interface while official names, source references, and source-derived records stay faithful to their evidence.",
  },
];

export default function BetterSanFernandoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.iansebastian.dev" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.iansebastian.dev/projects" },
      { "@type": "ListItem", position: 3, name: "Better San Fernando", item: "https://www.iansebastian.dev/projects/better-san-fernando" },
    ],
  };

  return (
    <>
      <ScrollRestoration />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailLayout
        title="Better San Fernando"
        subtitle="Independent Civic Information & Transparency for San Fernando"
        description={
          <>
            Better San Fernando is an independent, open-source civic-information
            and transparency portal for San Fernando, Pampanga. It organizes public
            services, projects, government information, legislation, transparency
            records, and statistics into an interface designed to make public
            information easier to find, understand, and trace back to its sources.
            It is not an official City Government website or affiliated with it.
          </>
        }
        technologies={technologies}
        media={
          <>
            <Image
              src="/projects/better-san-fernando/cover.webp"
              alt="Better San Fernando homepage with civic search, services, projects, and public information"
              fill
              preload
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1407px) calc(100vw - 22rem), 66rem"
              className="object-contain"
            />
            <video
              aria-hidden="true"
              tabIndex={-1}
              src="/projects/better-san-fernando/bettersanfernando-demo.mp4"
              poster="/projects/better-san-fernando/cover.webp"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            />
          </>
        }
        linksDescription="Explore the live civic portal or inspect the open-source implementation and publication workflow."
        links={[
          { label: "Live Site", href: "https://bettersanfernando.org", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: repository, icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Building a BetterLGU for my own city</h2>
            <p className="text-muted-foreground leading-relaxed">
              I discovered the BetterGov / BetterLGU initiative, where developers
              and communities maintain independent information portals for
              Philippine LGUs. I chose to build and maintain one for my own city,
              San Fernando, Pampanga.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Starting from the <Link href="https://github.com/iyanski/betterlocalgov" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">iyanski/betterlocalgov starter/reference</Link>,
              I evolved Better San Fernando around the city’s actual civic
              information, publication constraints, search, localization, mapping,
              and maintenance needs.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Public information existed. Finding it was the difficult part.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Useful information is spread across services, offices, project and
              procurement records, legislation, disclosures, and statistics.
              Residents should not need to know which office, report, or document
              contains an answer before they can find it.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">What I built</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {capabilities.map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="font-medium text-foreground">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Publishing only what the evidence supports</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="font-medium text-foreground">Unknown data stays unknown.</strong> Coverage
              can be partial: missing facts are not inferred, and sourced fact
              stays distinct from interpretation. An absent record does not prove
              that an activity does not exist.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Research is reviewed before it becomes public application data. The
              frontend consumes reviewed, frontend-safe exports through validated,
              typed access; it never reads private or raw research directly.
            </p>
            <ol className="grid gap-3 sm:grid-cols-3">
              {publicationSteps.map(([title, description], index) => (
                <li key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-4">
                  <h3 className="flex gap-2 text-base font-medium text-foreground">
                    <span aria-hidden="true" className="shrink-0 text-muted-foreground">{index + 1}.</span>
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Key engineering decisions</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              {engineeringDecisions.map(({ title, description }) => (
                <div key={title} className="py-4 space-y-2">
                  <h3 className="font-medium text-foreground">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Open source by design</h2>
            <p className="text-muted-foreground leading-relaxed">
              The public frontend is open source, with <Link href={`${repository}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">contribution guidance</Link> for
              interface, accessibility, search, documentation, and other
              improvements. <Link href={`${repository}/issues`} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">Civic-data corrections</Link> are
              submitted as leads and reviewed against supporting sources before
              publication.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
