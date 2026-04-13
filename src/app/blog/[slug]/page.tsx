import { getPostBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { CustomLink } from "@/components/mdx/preview-link";
import { PageTransition } from "@/components/ui/page-transition";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { meta } = getPostBySlug(resolvedParams.slug);
  
  return {
    title: `${meta.title} | Blog | Ian Macabulos`,
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

  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PageTransition pageKey={resolvedParams.slug}>
      <div className="flex w-full max-w-6xl mx-auto flex-col px-8 lg:px-12 pt-6 md:pt-12 pb-16 font-sans">
        
        <div className="mb-8 md:mb-10">
          <Link 
            href="/blog" 
            className="group inline-flex items-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Articles
          </Link>
        </div>

        <article className="w-full flex flex-col">
          
          <div className="flex flex-col mb-8 max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-sans leading-tight">
              {meta.title}
            </h1>
            
            <div className="flex items-center gap-3 mt-8">
              <div className="relative h-11 w-11 rounded-full overflow-hidden bg-muted border border-border/50 shadow-sm">
                <Image 
                  src="/about/ian-macabulos-2026.webp" 
                  alt="Ian Macabulos" 
                  fill 
                  sizes="44px"
                  className="object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground text-base leading-none mb-1.5">
                  Ian Macabulos
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                  <time dateTime={meta.date}>{meta.date}</time>
                  <span className="text-[10px] opacity-50">●</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {meta.coverImage && (
            <div className="relative w-full aspect-[21/9] mb-12 overflow-hidden rounded-2xl border border-border/50 bg-muted/20 shadow-sm">
              <Image
                src={meta.coverImage}
                alt={`Cover image for ${meta.title}`}
                fill
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
                priority
              />
            </div>
          )}
          
          <div className="prose prose-neutral dark:prose-invert max-w-none w-full
            prose-headings:font-sans prose-p:font-sans prose-a:font-sans
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-[1.05rem]
            prose-a:text-foreground prose-a:underline prose-a:underline-offset-4
            prose-img:rounded-2xl prose-img:border prose-img:border-border/50
            prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:bg-muted/80 dark:prose-blockquote:bg-muted/20 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-foreground
            prose-code:text-foreground prose-code:bg-muted/80 dark:prose-code:bg-muted/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#111111] dark:prose-pre:bg-muted/20 prose-pre:border prose-pre:border-border/50 prose-pre:rounded-xl">
            
            <MDXRemote 
              source={content} 
              components={{
                a: CustomLink,
              }}
            />
          </div>

        </article>
      </div>
    </PageTransition>
  );
}