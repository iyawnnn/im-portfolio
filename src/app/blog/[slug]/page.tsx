import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta } = getPostBySlug(resolvedParams.slug);
  
  // FIXED: Removed the "| Ian Macabulos" from the tab name
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const { meta, content } = getPostBySlug(resolvedParams.slug);

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col px-8 lg:px-12 pt-8 md:pt-20 pb-24">
      
      {/* 1. Navigation aligned perfectly to the left edge */}
      <div className="mb-10 md:mb-12">
        <Link 
          href="/blog" 
          className="group inline-flex items-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Articles
        </Link>
      </div>

      {/* 2. Reading Container - Full width, stripped of restrictive wrappers */}
      <article className="w-full flex flex-col">
        
        {/* FIXED: Clean Post Metadata without icons or clunky borders */}
        <div className="flex flex-col gap-4 mb-10">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-sans leading-tight">
            {meta.title}
          </h1>
          
          <time dateTime={meta.date} className="text-sm font-medium text-muted-foreground">
            {meta.date}
          </time>
        </div>

        {/* 3. Immersive Cover Image */}
        {meta.coverImage && (
          <div className="relative w-full aspect-[21/9] mb-12 overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
            <Image
              src={meta.coverImage}
              alt={`Cover image for ${meta.title}`}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        )}
        
        {/* 4. Strict Geist Font Overrides spanning full width */}
        <div className="prose prose-neutral dark:prose-invert max-w-none w-full
          font-sans prose-headings:font-sans prose-p:font-sans prose-a:font-sans prose-strong:font-sans prose-li:font-sans
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[1.05rem]
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground transition-all
          prose-img:rounded-2xl prose-img:border prose-img:border-border/50 prose-img:shadow-sm prose-img:w-full prose-img:my-12
          prose-hr:border-border/50 prose-hr:my-12
          prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:bg-muted/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground prose-blockquote:font-medium prose-blockquote:my-10
          prose-code:text-foreground prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#111111] dark:prose-pre:bg-muted/20 prose-pre:border prose-pre:border-border/50 prose-pre:text-sm prose-pre:rounded-xl prose-pre:my-10">
          <MDXRemote source={content} />
        </div>

      </article>
    </div>
  );
}