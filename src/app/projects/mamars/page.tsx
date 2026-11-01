"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

import { Github, Lock } from "lucide-react";

import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

export default function MamaRsPage() {
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
        name: "Mama R's",
        item: "https://www.iansebastian.dev/projects/mamars",
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
        title="Mama R's"
        subtitle="Internal Bakery Operations System"
        description="Mama R's is a custom internal operations system built for a local bakery to replace manual paper records with one browser-based workflow for orders, payments, inventory, expenses, reporting, and end-of-day cash reconciliation. It also supports printable receipts and stock-history tracking."
        technologies={["React", "TypeScript", "Node.js", "Express", "MongoDB"]}
        media={
          <Image
            src="/projects/mamars/mamars-branded-cover.webp"
            alt="Mama R's Bakery identity on a navy background, labeled Bakery Admin"
            fill
            preload
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1407px) calc(100vw - 22rem), 66rem"
            className="object-cover"
          />
        }
        linksDescription="The deployed application is restricted to internal business use. The implementation is available publicly for code review."
        links={[
          {
            label: "Internal System",
            disabled: true,
            icon: <Lock aria-hidden="true" className="mr-2 h-4 w-4" />,
          },
          {
            label: "Source Code",
            href: "https://github.com/iyawnnn/MamaR-s",
            icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />,
            variant: "outline",
          },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              The bakery did not need another dashboard. It needed one place to run the day.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The bakery previously relied on manual records for day-to-day operations. Mama R&apos;s brings customer orders, payment progress, stock levels, expenses, receipts, and end-of-day reconciliation into one working record.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              The goal was not simply to digitize separate forms, but to keep the operational pieces connected as an order moves through fulfillment.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">
              An order stays useful from booking to fulfillment
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Order and payment state</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Each order keeps the customer and order details, line items, quantities, prices at the time of order, target date, and amount paid. Payment status distinguishes unpaid, partial, and paid commitments.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Fulfillment and inventory</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Stock is not deducted when an order is created. When it enters fulfilled status, the backend checks the relevant product, verifies enough stock, reduces it, and records the movement in stock history. Updating an already fulfilled order does not deduct stock again.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              Knowing the stock count is useful. Knowing why it changed is better.
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The catalog supports products and variants, stock quantities, low-stock thresholds, and restocking. Relevant changes such as restocks, adjustments, and fulfillment create stock-history entries, so the current count is accompanied by an operational trail.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">
              The digital total still has to match the cash drawer
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              End-of-day reconciliation turns the day&apos;s operational records into a practical closing check.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Expected</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Recorded payment amounts from today&apos;s fulfilled orders, minus recorded expenses.
                </p>
              </div>
              <div className="min-w-0 space-y-2 rounded-lg border border-border/50 bg-card/50 p-5">
                <h3 className="font-medium">Actual</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The physical cash count entered at closing. The interface shows whether the register is balanced, over, or short, alongside a daily order-and-expense ledger that can be printed as a Z-report.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              The same records become the reporting layer
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Fulfilled-order records feed dashboard and report views for daily and monthly sales and sales over time, alongside low-stock counts from inventory. Sales data can also be exported as CSV when it needs to leave the interface.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              As the workflow grew, loose data contracts stopped being enough
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The project began with a looser JavaScript implementation, then grew to cover orders, expenses, stock history, and reconciliation. Moving to TypeScript made the contracts between the React frontend, Express API, and MongoDB models explicit. The detailed migration story is in{" "}
              <Link
                href="/blog/migrating-mamar-typescript"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
              >
                A Typo, a Timeout, and TypeScript
              </Link>
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              Built for the people running the bakery, not public traffic
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              The application routes unauthenticated visitors to login and exposes its operational screens only after authentication. Passwords are hashed, and JWT checks protect the operational API routes. The deployed system is intended for the people running the bakery.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">
              Turning daily bakery operations into one consistent record
            </h2>
            <p className="text-base leading-7 text-muted-foreground">
              Mama R&apos;s started with a practical goal: replace paper-based operational tracking with something the bakery could use from a browser. Connecting fulfillment to inventory, expenses to reconciliation, and daily records to reporting turned separate manual tasks into one working system.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
