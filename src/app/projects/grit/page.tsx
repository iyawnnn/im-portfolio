"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

export default function GritPage() {
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
        name: "Grit",
        item: "https://www.iansebastian.dev/projects/grit",
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
        title="Grit"
        subtitle={"Job Applications, Resume Matching & Interview Preparation"}
        description={"Grit brings job applications, resumes, match reports, and interview preparation into one career-search workflow. A saved role becomes the context for both application tracking and AI-assisted preparation."}
        technologies={["Laravel", "Livewire", "PHP", "PostgreSQL"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/grit/grit-demo.mp4"
            poster="/projects/grit/grit-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the application or inspect the career workflow behind it."
        links={[
          { label: "Live Site", href: "https://grit.iansebastian.dev/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/Grit", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Keep the application and its preparation together</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Tracking a role is only part of a job search. The resume, job
              description, application status, and interview preparation also need
              to stay connected. I built Grit around that shared context so each
              step starts from the work already saved for the application.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">From a saved role to interview practice</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["Application board", "Track job postings through defined stages, with search and status changes scoped to the current user’s records."],
                ["Resume library", "Store PDF resumes and choose which version to use when comparing a particular role."],
                ["Match reports", "Compare the resume text with a job description, keeping a score, missing keywords, and written reasoning together."],
                ["Interview preparation", "Generate practice questions from the same resume and job description, rather than starting again in a separate tool."],
              ].map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">AI work has a visible lifecycle</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              <div className="min-w-0 py-5 space-y-2">
                <h3 className="font-medium">Queued analysis</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  A Laravel job moves a match report from processing to completed
                  or failed. The report remains a saved record, and repeated
                  comparisons can reuse cached analysis.
                </p>
              </div>
              <div className="min-w-0 py-5 space-y-2">
                <h3 className="font-medium">An explicit fallback</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  If the Groq request fails, the service returns a word-overlap
                  estimate and identifies that fallback in its reasoning. A match
                  score is guidance about the supplied text, not a hiring prediction.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">One workflow instead of disconnected forms</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Laravel and Livewire keep the board and forms close to the same
              application records. The finished product connects organization,
              comparison, and preparation; its useful unit is the job application,
              with AI assistance attached to that context.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
