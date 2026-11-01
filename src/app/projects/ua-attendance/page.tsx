"use client";

import { useEffect } from "react";
import { Github } from "lucide-react";
import { ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

const liveSite = "https://labsign.ua-cit.com/";
const webRepository = "https://github.com/iyawnnn/UA-LabSign";
const mobileRepository = "https://github.com/iyawnnn/UA-LabSign-Mobile";

export default function UAAttendancePage() {
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
        name: "UA LabSign — Laboratory Attendance System",
        item: "https://www.iansebastian.dev/projects/ua-attendance",
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
        title="UA LabSign — Laboratory Attendance System"
        subtitle="Device-Bound Laboratory Attendance Across Web & Android"
        description="UA LabSign replaces manual laboratory attendance with a coordinated web and Android workflow. Institutional sign-in, device-bound ECDSA P-256 signatures, client-side geofence checks, and short-lived room PINs connect each student check-in with faculty oversight and administrative records."
        technologies={["Next.js", "TypeScript", "PostgreSQL", "React Native", "Expo"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/ua-attendance/ua-attendance-demo.mp4"
            poster="/projects/ua-attendance/ua-attendance-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Open the live platform or inspect the coordinated web/backend and mobile applications."
        links={[
          { label: "Live Site", href: liveSite, icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Web Source", href: webRepository, icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
          { label: "Mobile Source", href: mobileRepository, icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">From manual laboratory logs to a verifiable digital workflow</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Paper logs and spreadsheets made laboratory attendance difficult to
              audit: another student could sign for someone else, entries could
              be inaccurate, and staff still had to consolidate the records.
              I built UA LabSign to connect student check-in, faculty review,
              and administration in one digital workflow with clearer attribution.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">An account alone cannot establish attendance</h2>
            <p className="text-base leading-7 text-muted-foreground">
              A university Google account establishes who signed in. It does not
              establish which device submitted a check-in, whether that device
              signed it, or whether a class PIN is still valid. UA LabSign combines
              those server-side checks with a client-side location readiness gate
              rather than treating a successful login as sufficient attendance evidence.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">One attendance workflow, two clients</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="text-lg font-medium">Web portal</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The Next.js portal connects student check-in with faculty and
                  administrator dashboards, class sessions, attendance records,
                  and reporting. Prisma and PostgreSQL hold the shared records.
                </p>
              </div>
              <div className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                <h3 className="text-lg font-medium">Android companion</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  The React Native and Expo app handles student sign-in, device
                  key generation, and signed check-ins against the same backend.
                  Private keys stay in SecureStore; readiness checks, history,
                  and device recovery complete the student workflow.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">The device becomes part of the attendance credential</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Knowing an account’s credentials does not reproduce the device’s
              private signing key. ECDSA P-256 lets the server check a request
              against a registered public key while the private key remains on
              the student’s device.
            </p>
            <dl className="divide-y divide-border/50 border-y border-border/50">
              <div className="space-y-2 py-4">
                <dt className="font-medium">At registration</dt>
                <dd className="text-base leading-7 text-muted-foreground">
                  The device generates a key pair and registers its public key
                  with the student’s account. The web client keeps the private
                  CryptoKey in IndexedDB; Android stores its private key locally
                  using Expo SecureStore.
                </dd>
              </div>
              <div className="space-y-2 py-4">
                <dt className="font-medium">At check-in</dt>
                <dd className="text-base leading-7 text-muted-foreground">
                  The device signs a payload containing the student ID, room,
                  and timestamp. The server verifies that signature against the
                  stored public key before accepting the attendance record.
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A check-in combines distinct signals</h2>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {[
                ["Institutional identity", "The student signs in through the approved university Google account flow."],
                ["Registered device", "The student must have an active public-key binding; revoking or replacing it changes which key can verify a check-in."],
                ["Signed attendance request", "The device signs the payload with its ECDSA P-256 private key. The backend verifies the signature against the stored public key and checks timestamp drift."],
                ["Location readiness", "The client checks the configured campus geofence before enabling submission. Coordinates are not sent to the attendance endpoint for independent server-side GPS verification."],
                ["Active class session", "The backend matches the room and unexpired PIN to a schedule, checks for duplicate attendance, and classifies the record as late or on time."],
              ].map(([title, description], index) => (
                <li key={title} className="flex min-w-0 gap-4 py-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">{index + 1}</span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-base leading-7 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Security includes recovery and day-to-day operations</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["Device-bound signing", "The client keeps its private key; the server uses the registered public key to verify attendance submissions."],
                ["Short-lived class access", "Faculty-generated room PINs expire, narrowing the window in which a class check-in can be accepted."],
                ["Recovery and revocation", "A recovery PIN lets students re-bind a replacement device. Administrators can revoke outdated or compromised bindings."],
                ["Auditable records", "Timestamps, history, filtering, manual exceptions, and reports make attendance and administrative activity reviewable."],
              ].map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">The check-in is only half of the workflow</h2>
            <div className="divide-y divide-border/50 border-y border-border/50">
              <div className="space-y-2 py-4">
                <h3 className="font-medium">Faculty</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Start sessions for scheduled laboratory classes, generate
                  short-lived PINs, watch attendance activity, review class
                  records, handle legitimate exceptions, and export reports.
                </p>
              </div>
              <div className="space-y-2 py-4">
                <h3 className="font-medium">Administration</h3>
                <p className="text-base leading-7 text-muted-foreground">
                  Manage schedules, staff assignments, and registered devices,
                  then review attendance records and audit history. The record
                  stays useful after the student has checked in.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">From check-in to a usable class record</h2>
            <p className="text-base leading-7 text-muted-foreground">
              UA LabSign turns a manual process into a connected record that
              starts with the student’s device and continues through faculty
              review, reporting, device management, and administrative auditing.
              The web and Android clients share a workflow built around stronger
              attribution and clearer records.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
