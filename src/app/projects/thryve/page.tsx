"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

export default function ThryvePage() {
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
        name: "Thryve",
        item: "https://www.iansebastian.dev/projects/thryve",
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
        title="Thryve"
        subtitle="Full-Stack Health Tracking Application"
        description="Thryve is a full-stack health-tracking application I led and implemented during my third year as an academic project. As Lead Full-Stack Developer and primary implementer, I was responsible for the frontend, backend, database integration, authentication, dashboard logic, and deployment. Built with Vue, Express, Node.js, and MongoDB, it brings workouts, meals, water intake, sleep, personal targets, progress views, and achievements into one authenticated application."
        technologies={["Vue", "Node.js", "Express", "MongoDB"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/thryve/thryve-demo.mp4"
            poster="/projects/thryve/thryve-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the application or inspect the full Vue, Express, and MongoDB implementation."
        links={[
          { label: "Live Site", href: "https://thryvefitness.vercel.app/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/Thryve", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The challenge was not logging one habit. It was keeping several of them connected.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Built as a third-year academic health and fitness project, Thryve
              grew beyond a single tracker. Each user can keep separate workout,
              meal, water, and sleep records, then see those everyday entries
              brought together in dashboard and progress views.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Four tracking areas, one account</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Workouts</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Record activity, duration, and calories burned. Workout logs
                  contribute to daily activity minutes and calories burned.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Meals</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Track food with its calories and protein so meal entries feed
                  the daily intake summary.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Water</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Add water intake entries and review them alongside the other
                  daily tracking areas.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Sleep</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Keep sleep-duration records and view them as part of the
                  dashboard&apos;s daily progress.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A useful dashboard has to calculate from the records behind it</h2>
            <p className="text-base leading-7 text-muted-foreground">
              For the current day, the backend aggregates the signed-in user&apos;s
              workout and meal records into calories burned, workout minutes,
              calories and protein consumed, and net calories. It compares those
              totals with user-set daily calorie, protein, and workout-minute
              targets to return progress for the dashboard. These targets are
              personal tracking preferences, not health recommendations.
            </p>
            <div className="divide-y divide-border/50 border-y border-border/50">
              <div className="space-y-1 py-4">
                <h3 className="font-medium">Workout and meal logs</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Entries provide the calories, protein, and activity minutes for
                  the daily view.
                </p>
              </div>
              <div className="space-y-1 py-4">
                <h3 className="font-medium">Daily aggregation</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The API totals the current day&apos;s workout and meal records for
                  the authenticated user.
                </p>
              </div>
              <div className="space-y-1 py-4">
                <h3 className="font-medium">Compare with personal targets</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The dashboard displays each calculated total alongside its
                  saved target and progress percentage.
                </p>
              </div>
            </div>
            <p className="text-base leading-7 text-muted-foreground">
              A separate weekly summary groups meal and workout calories by day,
              then shows average and peak days for intake and calories burned.
              Water and sleep have their own tracking records and dashboard views.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Tracking became more useful when progress had milestones</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The backend checks deterministic milestones and creates a user&apos;s
              achievement record when a rule is reached, avoiding another award
              for a milestone they already earned.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Activity milestones</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Examples include a first or tenth workout, five meals, logging
                  activity across seven consecutive days, and cumulative workout
                  calorie milestones.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Daily-habit milestones</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Water-intake totals and sleep-duration records also contribute
                  to hydration and sleep achievements.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Every tracker belongs to an authenticated user</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The Express backend supports registration, login, bcrypt password
              hashing, JWT authentication, and password recovery by email using
              reset tokens. Authenticated API requests connect each person to
              their own stored records.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              Vue and Pinia manage the interface and application state, while
              Express and MongoDB handle persistent records. Separate views cover
              the dashboard, trackers, profile, achievements, and account recovery.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The project where I learned to own the full stack</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Thryve was a third-year academic project, and one of the first
              applications I owned from end to end. Building the Vue interface was
              only part of the work: I also modeled the data, designed the Express
              API, connected authentication, implemented dashboard calculations,
              managed frontend state, and deployed the application. That
              full-stack responsibility became a foundation for the larger systems
              I built afterward.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
