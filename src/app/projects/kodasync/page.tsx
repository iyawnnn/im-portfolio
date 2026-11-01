"use client";

import { useEffect } from "react";

import { Github } from "lucide-react";
import { ArrowRight, ArrowSquareOut as ExternalLink } from "@phosphor-icons/react/ssr";
import { ProjectDetailLayout } from "@/components/layout/project-detail-layout";

const ingestionSteps = [
  ["Create a note", "Capture code or technical knowledge."],
  ["Store content", "Save text, language, and project association."],
  ["Generate tags", "Enrich a new note in the background."],
  ["Create an embedding", "Represent the content in 384 dimensions."],
  ["Persist the vector", "Store it with the note using pgvector."],
  ["Retrieve by meaning", "Compare it with an embedded query."],
];

const chatSteps = [
  ["Embed and scope", "Embed the question, restrict notes to the authenticated user, and apply the selected project filter when present."],
  ["Retrieve context", "Rank by cosine distance and take up to three relevant notes, rather than sending the whole library."],
  ["Build and stream", "Combine note text, project context, the question, and conversation history, then stream the model’s response."],
  ["Keep the conversation", "Persist messages and cache the completed response for repeated user/project/question combinations."],
];

const workspaces = [
  ["Library", "Store, pin, filter, and organize notes by project. Keep saved code and documentation editable and easy to revisit."],
  ["Studio", "Work in Monaco and request focused AI-assisted fixes, explanations, security review, documentation, optimization, or test drafts for the editor’s content."],
  ["Chat", "Ask questions with retrieved notes as context, optionally limiting retrieval to the project you are working on."],
];

const decisions = [
  ["Save first, enrich afterward", "Ordinary note creation saves the record and dispatches tag generation and embedding creation through FastAPI BackgroundTasks. The creation response does not wait for that enrichment; URL imports use their own fetch-and-embed path."],
  ["Stream the answer as it arrives", "FastAPI streams response chunks and the chat interface renders them incrementally. The interaction does not wait for the entire generated answer before showing text."],
  ["Cache repeated work, bound expensive requests", "Redis caches semantic-search results, AI actions, and repeated chat responses. API rate limits bound expensive creation, import, and AI endpoints."],
];

export default function KodaSyncPage() {
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
        name: "KodaSync",
        item: "https://www.iansebastian.dev/projects/kodasync",
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
        title="KodaSync"
        subtitle="A Searchable Technical Memory for Developers"
        description="KodaSync is a developer knowledge workspace for code, technical notes, and imported documentation. Saved material can be grouped by project, embedded for semantic retrieval, and reused as chat context. A Monaco-powered Studio brings editing and focused AI code actions into the same workspace."
        technologies={["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis"]}
        media={
          <video
            aria-hidden="true"
            tabIndex={-1}
            src="/projects/kodasync/kodasync-demo.mp4"
            poster="/projects/kodasync/kodasync-cover.webp"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        }
        linksDescription="Explore the developer knowledge workspace or inspect the semantic retrieval and AI pipeline behind it."
        links={[
          { label: "Live Site", href: "https://kodasync.iansebastian.dev/", icon: <ExternalLink aria-hidden="true" className="mr-2 h-4 w-4" /> },
          { label: "Source Code", href: "https://github.com/iyawnnn/KodaSync", icon: <Github aria-hidden="true" className="mr-2 h-4 w-4" />, variant: "outline" },
        ]}
      >
        <div className="w-full min-w-0 space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Saving knowledge is easy. Finding it again is the problem.</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Code snippets, debugging notes, architecture decisions, and useful
              documentation accumulate across projects. Exact-word search helps
              when you remember what you saved, but a new problem often starts
              with an idea rather than a filename or phrase. I built KodaSync to
              give that knowledge a retrieval path and the context to make it useful again.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">A note becomes more than stored text</h2>
            <p className="text-base leading-7 text-muted-foreground">
              FastEmbed turns a note’s title and content into a 384-dimensional
              vector. Stored alongside the note in PostgreSQL through pgvector,
              that representation makes similarity-based retrieval possible.
              Tags help organize the library; embeddings support a different way to find it.
            </p>
            <ol className="grid grid-cols-1 gap-x-6 sm:grid-cols-3">
              {ingestionSteps.map(([title, description], index) => (
                <li key={title} className="min-w-0 border-t border-border/50 py-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="text-muted-foreground">{index + 1}.</span>
                    <h3 className="min-w-0 flex-1 font-medium">{title}</h3>
                    {index < ingestionSteps.length - 1 && <ArrowRight aria-hidden="true" className="mt-1 size-4 shrink-0 rotate-90 text-muted-foreground sm:rotate-0" />}
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Searching for the idea, not the exact phrase</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The semantic-search endpoint embeds a question and compares it with
              the authenticated user’s note vectors using cosine distance. The
              closest notes are returned as candidate context. This complements
              the Library’s keyword and tag filters when the wording of a question
              differs from the wording of a saved note.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">The same question can mean something different in another project</h2>
            <p className="text-base leading-7 text-muted-foreground">
              An authentication question needs the context of the codebase you
              are working in. Selecting a project for chat restricts the candidate
              notes before semantic ranking, keeping unrelated project notes out
              of that retrieval step.
            </p>
            <ol className="flex flex-col gap-3 border-y border-border/50 py-4 sm:flex-row sm:flex-wrap sm:items-center">
              {["Question", "Selected project", "Project notes", "Semantic ranking", "Relevant context"].map((step, index) => (
                <li key={step} className="flex items-center gap-3 text-sm font-medium">
                  {index > 0 && <ArrowRight aria-hidden="true" className="size-4 shrink-0 rotate-90 text-muted-foreground sm:rotate-0" />}
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Chat starts with retrieval, not an empty prompt</h2>
            <p className="text-base leading-7 text-muted-foreground">
              Retrieval-augmented generation supplies relevant note text to an
              existing language model. KodaSync does not train a model on the
              library; it chooses context for each uncached question.
            </p>
            <ol className="divide-y divide-border/50 border-y border-border/50">
              {chatSteps.map(([title, description], index) => (
                <li key={title} className="flex min-w-0 gap-4 py-4">
                  <span className="text-muted-foreground tabular-nums">{index + 1}.</span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-base leading-7 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">One workspace, three ways to use the knowledge</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {workspaces.map(([title, description]) => (
                <div key={title} className="min-w-0 rounded-lg border border-border/50 bg-card/50 p-5 space-y-2">
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Documentation can enter the same knowledge system</h2>
            <p className="text-base leading-7 text-muted-foreground">
              URL import fetches a supplied page, removes common noise such as
              scripts, navigation, and styles, and extracts readable text. GitHub
              file links are converted to raw-file URLs, with language detection
              for common code extensions. Saving the import creates a note and
              embedding, so existing documentation can join the retrieval pipeline
              without being rewritten by hand.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-medium tracking-tight">Keeping the workspace responsive</h2>
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
            <h2 className="text-2xl font-medium tracking-tight">Testing the system around the model</h2>
            <p className="text-base leading-7 text-muted-foreground">
              GitHub Actions starts PostgreSQL with pgvector and Redis, then runs
              backend Pytest integration tests. The suite mocks AI and Redis calls
              while exercising note creation, retrieval, deletion, AI-action
              routes, and chat persistence. Generated answers can vary; the
              surrounding application behavior can still be checked independently.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-medium tracking-tight">Building memory around the model</h2>
            <p className="text-base leading-7 text-muted-foreground">
              The useful part of KodaSync is the pipeline around generation:
              deciding what to save, how to retrieve it, and which project’s
              context belongs in a conversation. Building that pipeline alongside
              an editable library, streamed chat, and testable API flows made
              saved technical knowledge reusable across the workspace.
            </p>
          </section>
        </div>
      </ProjectDetailLayout>
    </>
  );
}
