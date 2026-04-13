import Link from "next/link";
import { getAllPostsMeta, PostMeta } from "@/lib/mdx";
import { PageTransition } from "@/components/ui/page-transition";
import { 
  ArrowRight, 
  Calendar, 
  BookText, 
  Code2, 
  LayoutTemplate, 
  Database, 
  Server, 
  Terminal, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export const metadata = {
  title: "Blog | Ian Macabulos",
  description: "Thoughts on web development, minimalist design, and the occasional realization that I overcomplicated a simple function.",
};

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  ui: LayoutTemplate,
  database: Database,
  backend: Server,
  terminal: Terminal,
  design: Sparkles,
  default: BookText,
};

const POSTS_PER_PAGE = 3;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  
  // Fetch and sort posts by date (newest first)
  const posts = getAllPostsMeta().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Pagination Logic
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 px-8 lg:px-12 pt-8 md:pt-20 pb-16 font-sans">
      
      {/* Witty, Concise Header */}
      <section className="flex flex-col gap-3 md:gap-4">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl text-foreground">
          Localhost Tales
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg md:text-xl max-w-[800px] leading-relaxed">
          Thoughts on code, design, and why I spent three hours fixing a single semicolon.
        </p>
      </section>

      {/* Animated Blog Posts List */}
      <PageTransition pageKey={currentPage}>
        <section className="flex flex-col">
          {paginatedPosts.map((post: PostMeta) => {
            const postIconKey = post.icon?.toLowerCase() || "default";
            const PostIcon = iconMap[postIconKey] || iconMap.default;

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="flex flex-col gap-3 py-8 border-b border-border/50 transition-colors hover:bg-muted/30 px-4 -mx-4 rounded-xl">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:opacity-80 flex items-center gap-3">
                      <PostIcon className="h-5 w-5 text-muted-foreground" />
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 opacity-70" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl sm:pl-8">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-muted-foreground mt-2 sm:pl-8 transition-colors group-hover:text-foreground">
                    Read Article <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                </article>
              </Link>
            );
          })}
          
          {posts.length === 0 && (
            <div className="py-12 text-center text-muted-foreground border-t border-border/50 mt-4">
              No system logs available yet. Check back later.
            </div>
          )}
        </section>
      </PageTransition>

      {/* High-End Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between w-full pt-4">
          
          <div className="flex w-32">
            {currentPage > 1 && (
              <Link 
                href={`/blog?page=${currentPage - 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
              >
                <ChevronLeft className="mr-1.5 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
                Previous
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-1.5 rounded-full border border-border/50">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex w-32 justify-end">
            {currentPage < totalPages && (
              <Link 
                href={`/blog?page=${currentPage + 1}`}
                className="flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                scroll={false}
              >
                Next 
                <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

        </div>
      )}

    </div>
  );
}