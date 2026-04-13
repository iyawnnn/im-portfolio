import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta } = getPostBySlug(resolvedParams.slug);
  
  return {
    title: `${meta.title} | Ian Macabulos`,
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
    <div className="flex w-full max-w-6xl mx-auto flex-col px-8 lg:px-12 pt-8 md:pt-20 pb-24 font-['Instrument_Sans',sans-serif]">
      <div className="mb-8 md:mb-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-[#e26a35]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
        </Link>
      </div>

      <article className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl text-foreground">
            {meta.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={meta.date}>{meta.date}</time>
          </div>
        </div>

        {meta.coverImage && (
          <div className="relative w-full aspect-[2/1] mb-12 overflow-hidden rounded-2xl border border-border/50 bg-muted/20">
            <Image
              src={meta.coverImage}
              alt={`Cover image for ${meta.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
        )}
        
        {/* Complex Tailwind Typography overrides to ensure font and color consistency */}
        <div className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:font-['Instrument_Sans',sans-serif] prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-[#e26a35] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:border prose-img:border-border/50
          prose-hr:border-border/50
          prose-blockquote:border-l-[#e26a35] prose-blockquote:bg-muted/30 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
          prose-code:text-[#e26a35] prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}