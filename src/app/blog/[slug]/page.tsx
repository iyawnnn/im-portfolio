import reveal from "@/components/layout/page-reveal.module.css";
export const revalidate = 60;

import { getPostBySlug, getAllPostsMeta } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { CustomLink } from "@/components/mdx/preview-link";
import { ViewCounter } from "@/components/ui/view-counter";
import { ShareButtons } from "@/components/ui/share-buttons";
import { GiscusComments } from "@/components/ui/giscus-comments";
import { ReportView } from "@/components/ui/report-view";
import { Suspense } from "react";

export async function generateStaticParams() {
  const posts = getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic OpenGraph Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta } = getPostBySlug(resolvedParams.slug);
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.iansebastian.dev";
  const ogImageUrl = meta.coverImage ? `${baseUrl}${meta.coverImage}` : `${baseUrl}/opengraph-image.png`;
  
  return {
    title: `${meta.title} | Blog | Ian Macabulos`,
    description: meta.description,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}/blog/${resolvedParams.slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta, content } = getPostBySlug(resolvedParams.slug);

  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(meta.date));

  return (
    <div className={`mx-auto flex w-full max-w-6xl flex-col px-6 pt-8 pb-16 font-sans sm:px-8 md:pt-12 lg:px-12 ${reveal.articleDetail}`}>
      
      <ReportView slug={resolvedParams.slug} />

      <div className={`mb-6 md:mb-10 ${reveal.secondary} ${reveal.label}`}>
        <Link href="/blog" className="group inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform motion-safe:group-hover:-translate-x-1 motion-reduce:transition-none" aria-hidden="true" /> Back to Articles
        </Link>
      </div>

      <article className="flex w-full flex-col gap-8 md:gap-10">
        <header className="flex w-full flex-col gap-5">
          <h1 className={`text-3xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl ${reveal.primary}`}>
            {meta.title}
          </h1>

          <div className={`flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground sm:text-sm ${reveal.secondary}`}>
            <span className="inline-flex w-full items-center gap-2 font-medium text-foreground sm:w-auto">
              <span className="relative size-8 shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted">
                <Image src="/about/ian-macabulos-2026.webp" alt="" fill sizes="32px" className="object-cover" />
              </span>
              Ian Macabulos
            </span>
            <span aria-hidden="true" className="hidden text-muted-foreground/50 sm:inline">|</span>
            <time dateTime={meta.date}>{date}</time>
            <span aria-hidden="true" className="text-muted-foreground/50">|</span>
            <span>{meta.readingTime} min read</span>
            <span aria-hidden="true" className="text-muted-foreground/50">|</span>
            <Suspense fallback={<span className="h-4 w-14 animate-pulse rounded bg-muted" />}>
              <ViewCounter slug={resolvedParams.slug} />
            </Suspense>
          </div>
        </header>

        {meta.coverImage && (
          <div className={`relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted shadow-sm ${reveal.secondary} ${reveal.media}`}>
            <Image src={meta.coverImage} alt={`Cover visual for the article: ${meta.title}`} fill sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) calc(100vw - 4rem), (max-width: 1407px) calc(100vw - 22rem), 1056px" className="object-cover" priority />
          </div>
        )}

        <div className="w-full min-w-0">
          <div className="prose prose-neutral dark:prose-invert max-w-none w-full
            prose-headings:font-sans prose-p:font-sans prose-a:font-sans
            prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-[1.05rem]
            prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
            prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:border prose-img:border-border/50
            prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:bg-muted/80 dark:prose-blockquote:bg-muted/20 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:text-sm sm:prose-blockquote:text-base
            prose-code:text-foreground prose-code:bg-muted/80 dark:prose-code:bg-muted/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm sm:prose-code:text-base prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#111111] dark:prose-pre:bg-muted/20 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:text-sm">
          
            <MDXRemote source={content} components={{ a: CustomLink }} />
          </div>

          <div className="mt-12 flex justify-between items-center border-t border-border/50 pt-8">
            <ShareButtons slug={resolvedParams.slug} title={meta.title} />
          </div>

          <GiscusComments />
        </div>
      </article>
    </div>
  );
}
