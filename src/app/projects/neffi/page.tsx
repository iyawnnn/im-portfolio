import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { ArrowRight, ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";

import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";

const cardRoute = [
  ["Physical NFC card", "Written once during preparation."],
  ["Permanent /c/{token}", "The same address for the life of the card."],
  ["Current Card state", "Resolved fresh on the server."],
  ["Profile", "The connected identity and appearance."],
  ["Shown Scene", "The selected Scene, or the Default."],
  ["Blocks", "The content a visitor can act on."],
];

const lifecycle = [
  ["Sell & allocate", "A paid order takes Ready stock first, then unused Blank cards when available."],
  ["Prepare", "A newly allocated Blank card receives its permanent URL token and activation credential."],
  ["Write & verify NFC", "Write the URL, read it back, test the tap, and match the printed package code before release."],
  ["Release", "Hand over or ship the prepared card from its Order."],
  ["Activate", "The customer enters the package code, signs in, and claims ownership in one transaction."],
  ["Set up a Profile", "Guided setup creates the identity, content, and appearance before publishing."],
  ["Tap & share", "NFC and the card’s Sharing QR open the currently published experience without visitor sign-in."],
];

const identities = [
  ["Purchaser", "The commercial buyer on an Order. They may be buying for someone else or for a team."],
  ["Account", "The authenticated person who claims Cards and manages their digital content."],
  ["Card", "The physical item, with separate ownership and routing. Its public URL does not prove ownership."],
  ["Profile", "The content workspace a Card points to. Multiple Cards can connect to the same owned Profile."],
];

const decisions = [
  ["Business rules live below the UI", "PostgreSQL constraints, triggers, and foreign keys protect card states, ownership, and order rules alongside application services. A screen is not the only thing preventing an invalid transition."],
  ["Concurrent writes are part of the design", "Multi-record changes run in transactions with explicit lock ordering and re-checks under lock. Two-session PostgreSQL regression checks exercise competing claims and operational writes."],
  ["Credentials have a narrow path", "Activation codes and OTPs stay out of URLs, logs, analytics, and browser storage. Usable activation codes are encrypted at rest and revealed only through audited owner actions; claims verify against a separate keyed lookup."],
];

export default function NeffiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.iansebastian.dev" },
      { "@type": "ListItem", position: 2, name: "Projects", item: "https://www.iansebastian.dev/projects" },
      { "@type": "ListItem", position: 3, name: "Neffi", item: "https://www.iansebastian.dev/projects/neffi" },
    ],
  };

  return (
    <>
      <ScrollRestoration />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectDetailLayout
        title="Neffi"
        subtitle="NFC Cards Connected to a Living Digital Identity"
        description="Neffi connects a physical NFC card to an editable online identity. Each Digital Business Card carries one permanent URL, while customers securely activate it, set up their Profile, and choose what to share through Scenes. A tap or Sharing QR opens the published experience without visitor sign-in."
        technologies={["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Better Auth"]}
        media={
          <>
            <Image
              src="/projects/neffi/cover.webp"
              alt="Neffi product homepage introducing its editable NFC Digital Business Card"
              fill
              preload
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1407px) calc(100vw - 22rem), 66rem"
              className="object-contain"
            />
            <video
              aria-hidden="true"
              tabIndex={-1}
              src="/projects/neffi/neffi-demo.mp4"
              poster="/projects/neffi/cover.webp"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            />
          </>
        }
        linksDescription="Explore Neffi’s live site or inspect the product architecture and implementation."
        links={[
          { label: "Live Site", href: "https://getneffi.com", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/neffi", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">A physical card should not become outdated when someone’s information changes</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Rewriting an NFC tag after sale is impractical. Contact details,
              links, appearance, and the context someone wants to share can all
              change. I built Neffi around that mismatch: keep the physical card
              stable, and give customers control over the experience behind it.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">One permanent card, changeable software</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The tag is written once with a permanent public URL. On every tap,
              the server checks the Card’s current availability and resolves its
              connected Profile. Routing, ownership corrections, disabling, and
              retirement happen without rewriting the tag. The token is an
              address, not an ownership credential.
            </p>
            <ol className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
              {cardRoute.map(([title, description], index) => (
                <li key={title} className="min-w-0 border-t border-border/50 py-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-muted-foreground">{index + 1}.</span>
                    <h3 className="min-w-0 flex-1 font-medium">{title}</h3>
                    {index < cardRoute.length - 1 && <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground rotate-90 sm:rotate-0" />}
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">From stock to someone’s next introduction</h2>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {lifecycle.map(([title, description], index) => (
                <li key={title} className="flex min-w-0 gap-4 py-4">
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-medium">{index + 1}</span>
                  <div className="grid min-w-0 flex-1 gap-1 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-6">
                    <h3 className="font-medium leading-7">{title}</h3>
                    <p className="text-base leading-7 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Buying a card is not the same as owning it</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Gifts and bulk purchases make the distinction important. Payment
              records a sale; secure activation establishes digital ownership.
              Neffi keeps four concepts separate instead of treating a matching
              name or email as a reason to join them.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {identities.map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">One identity, different ways to show it</h2>
            <p className="text-base leading-7 text-muted-foreground">
              A professional introduction and a project conversation need different
              emphasis. Scenes let customers change what they show without
              re-entering their identity or changing the card’s destination.
              Visitors can save contact details, follow links, open booking
              links, or send a form message where configured.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="min-w-0 border-t border-border/50 pt-4 space-y-2">
                <h3 className="font-medium">Profile: the shared foundation</h3>
                <p className="text-base leading-7 text-muted-foreground">Identity and appearance belong to the Profile and stay consistent across its Scenes.</p>
              </div>
              <div className="min-w-0 border-t border-border/50 pt-4 space-y-2">
                <h3 className="font-medium">Scene: the content in focus</h3>
                <p className="text-base leading-7 text-muted-foreground">The shown Scene falls back to a protected Default. Its ordered Blocks hold About, Project, Link, Contact, Booking, and Form content.</p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">The product also needs an operational side</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Behind the customer experience are physical cards that need to be
              sold, prepared, verified, and delivered. Neffi connects orders and
              payments to card inventory, NFC preparation, and fulfilment. Support
              Cases provide guarded paths for corrections, recovery, and
              replacements after release. These workflows share the same domain
              services as the customer product within one Next.js modular monolith.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Keeping ownership and operations reliable</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              {decisions.map(([title, description]) => (
                <div key={title} className="py-4 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Building the product behind the tap</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The visible interaction is simple: tap a card and open the right
              experience. The work behind it connects physical preparation,
              ownership, activation, publishing, fulfilment, and support so the
              product can remain manageable long after the card leaves my hands.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              Neffi is deployed at <Link href="https://getneffi.com" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">getneffi.com</Link>,
              where the physical card and digital experience come together.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
