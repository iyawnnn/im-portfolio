"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

const normalizationSteps = [
  ["Personal cost", "Read the record’s cost, currency, billing cycle, and trial state. Use the recorded split cost when greater than zero; otherwise use the full cost."],
  ["Currency normalization", "Express that amount in the user’s preferred currency."],
  ["Billing normalization", "Divide yearly plans by 12 for monthly comparison. Keep trials visible, outside paid monthly burn. Sum the normalized active, paid commitments."],
];

const financialViews = [
  ["Monthly burn", "The normalized monthly cost of active, paid subscriptions, using the user’s share where recorded."],
  ["Annual projection", "Monthly liability multiplied by 12: a simple annualized estimate from the current records."],
  ["Upcoming commitments", "The next four scheduled bills are ordered by due date. Future start dates and billing cycles determine the next payment, shown in the subscription’s original currency."],
  ["Cancelled-cost history", "Cancelled plans are summarized as estimated monthly recurring cost no longer active, separate from current spending. This is a comparison of recorded costs, not guaranteed savings."],
];

export default function SubVantagePage() {
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
        name: "SubVantage",
        item: "https://www.iansebastian.dev/projects/subvantage",
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
        title="SubVantage"
        subtitle="A Clearer View of Recurring Spending"
        description="SubVantage is a subscription-management dashboard that turns recurring expenses with different currencies, billing cycles, trials, and shared costs into one comparable financial view. It tracks active commitments, upcoming renewals, cancellation history, and spending patterns so recurring costs are easier to understand before the next charge."
        technologies={["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/subvantage/subvantage-demo.mp4"
            poster="/projects/subvantage/subvantage-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the recurring-spend dashboard or inspect the calculations and subscription lifecycle behind it."
        links={[
          { label: "Live Site", href: "https://subvantage.iansebastian.dev/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/SubVantage", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The problem is not one subscription. It is the total.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              One monthly plan is easy to understand. Add annual bills, different
              currencies, free trials, shared costs, staggered renewal dates,
              and paused or cancelled plans, and a list of individual prices
              stops answering the useful question:
              how much am I actually committed to each month? I built SubVantage
              around making those unlike costs comparable.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Different billing models need one financial baseline</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Normalization starts with what belongs to the user: a positive
              personal split cost takes precedence over the full bill. That
              amount is converted to the preferred currency, then yearly plans
              are spread across 12 months. Only active, non-trial subscriptions
              contribute to paid monthly burn.
            </p>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {normalizationSteps.map(([title, description], index) => (
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

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">A dollar plan and a peso plan still belong in the same total</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Each subscription keeps its original currency. Aggregate values
              use exchange-rate normalization to express unlike costs in the
              user’s chosen base currency. External rates are fetched with hourly
              revalidation, with fallback rates when the request fails.
            </p>
            <h3 className="font-medium">Preferences are part of the financial model</h3>
            <p className="text-base leading-7 text-muted-foreground">
              Onboarding and settings store the preferred currency and email
              notification preference. Changing currency affects the aggregated
              dashboard totals. Individual upcoming bills retain
              their original currency so the charge remains recognizable.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">What a common baseline makes visible</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {financialViews.map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A cancelled subscription should not disappear from the story</h2>
            <p className="text-base leading-7 text-muted-foreground">
              A plan can be paused, cancelled into the archive, or restored when
              needed. Keeping those choices separate from permanent deletion
              preserves the record and makes cancellation’s effect on recurring
              commitments visible.
            </p>
            <dl className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <dt className="font-medium">Pause / resume</dt>
                <dd className="text-base leading-7 text-muted-foreground">Pausing keeps the record while leaving it out of active spending.</dd>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <dt className="font-medium">Cancel / archive / restore</dt>
                <dd className="text-base leading-7 text-muted-foreground">Restore an archived plan to Active without creating a new record. Stopping a recurring cost is part of its financial story too.</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Renewal dates matter more before the charge happens</h2>
            <p className="text-base leading-7 text-muted-foreground">
              SubVantage can surface upcoming trials and renewals before they
              become another charge. Scheduled email checks look two days ahead
              for trial dates and through the next three days for active-plan
              renewals. Resend handles delivery requests; the renewal check records
              successful sends to reduce repeat notifications on the same day.
              The goal is to put the decision before the next charge.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Sometimes the useful insight is a duplicate hiding in plain sight</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">Duplicate vendor subscriptions</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The dashboard groups active records by vendor and surfaces
                  repeated services as a redundancy signal. A trial can still be
                  part of a duplicate group while remaining outside its paid total.
                  Two active subscriptions for the same service are worth a second look.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="font-medium">A review signal, not a cancellation decision</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  These are deterministic grouping rules. A repeated vendor name
                  suggests possible redundancy, but separate plans may serve
                  different needs. The dashboard flags the pattern; the user
                  decides whether either commitment is unnecessary.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Subscription records stay scoped to the account that owns them</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Subscription Server Actions require an authenticated session, scope
              vendor records to that user, and check ownership before editing.
              Updates and deletes use both the subscription ID and user ID.
              Those checks live on the server, beyond what the interface chooses to show.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Financial totals are only useful if the rules stay predictable</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Vitest tests cover currency conversion, yearly-to-monthly
              normalization, personal split costs, and trial exclusion. Reminder
              tests mock the database and email service to check trial reminder
              sends and the no-trials case. Playwright scenarios
              cover sign-up/sign-in and subscription creation, archiving, and
              deletion. GitHub Actions builds the application and runs those
              browser scenarios. The calculation tests keep the core normalization
              rules explicit as the interface evolves.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Making recurring spending visible before it becomes background noise</h2>
            <p className="text-base leading-7 text-muted-foreground">
              SubVantage’s more interesting problem was making unlike costs
              comparable. Currency, yearly billing, trials, personal shares,
              renewal dates, and cancellation all change what a subscription
              means financially. Bringing those rules together turned a list of
              services into a clearer view of ongoing commitments.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
