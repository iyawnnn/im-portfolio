import Image from "next/image";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";

import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";
import { ScrollRestoration } from "@/components/ui/scroll-restoration";

export default function RcPremierPropertiesPage() {
  return (
    <>
      <ScrollRestoration />
      <ProjectDetailLayout
        title="RC Premier Properties"
        subtitle="Real Estate Discovery & Inquiry Platform"
        description="RC Premier Properties approached me to create a website that could present its real estate business with the same care it brings to its properties. I designed and developed the public experience and the backend operations behind it, turning its established brand into a practical website for both visitors and staff."
        technologies={["Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Auth0"]}
        media={
          <Image
            src="/projects/rc-premier-properties/cover.webp"
            alt="RC Premier Properties live homepage with its home discovery headline, property imagery, and viewing request navigation"
            fill
            preload
            sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1407px) calc(100vw - 22rem), 66rem"
            className="object-contain"
          />
        }
        linksDescription="Explore RC Premier's public website and property discovery experience."
        links={[
          { label: "Live Site", href: "https://rcpremierph.com/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Built for a real estate business</h2>
            <p className="text-base leading-7 text-muted-foreground">
              RC Premier Properties reached out because it needed a professional
              website that could do more than serve as a brochure. I worked
              across the frontend and backend to create a polished public
              presence alongside the tools the business needs to keep its
              property information and client conversations organized.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Making property discovery easier</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Visitors can browse available properties, narrow the search by
              details that matter to them, and open each listing for a closer
              look. Property pages bring together the images, key information,
              and clear ways to send an inquiry or request a viewing.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              The experience keeps the next step close to the property itself,
              so an interested visitor can move from exploring a home to
              starting a conversation without losing context.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">A simpler way to manage daily operations</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Behind the public site is a protected workspace for RC Premier
              staff. They can add and update property listings, review incoming
              inquiries, and manage viewing requests from the same application.
              Auth0 supports staff sign-in, while the backend keeps the public
              website and administrative work connected to the same property
              records.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Designing around the brand</h2>
            <p className="text-base leading-7 text-muted-foreground">
              I translated RC Premier&apos;s existing identity into a responsive,
              editorial website built around architectural imagery, generous
              space, and direct calls to action. The result gives the public a
              confident way to explore properties while giving the business a
              functional system behind the experience.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
