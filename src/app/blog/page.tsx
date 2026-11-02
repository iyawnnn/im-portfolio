import reveal from "@/components/layout/page-reveal.module.css";
export const revalidate = 60;

import Link from "next/link";
import Image from "next/image";
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight } from "@phosphor-icons/react/ssr";
import { getAllPostsMeta, POSTS_PER_PAGE, PostMeta } from "@/lib/mdx";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata, paginatedPath } from "@/lib/seo";

type SearchParams = Promise<{ page?: string }>;

function clampPage(requested: number) {
  const totalPages = Math.max(1, Math.ceil(getAllPostsMeta().length / POSTS_PER_PAGE));
  return Math.min(Math.max(requested, 1), totalPages);
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }) {
  const page = clampPage(Number((await searchParams).page) || 1);
  return pageMetadata({
    title: "Blog",
    description:
      "Read Ian Macabulos' writing on full-stack development, system design, product decisions, project lessons, and building reliable software.",
    path: paginatedPath("/blog", page),
  });
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const rawPage = (await searchParams).page;
  const posts = getAllPostsMeta().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(Number(rawPage) || 1, 1), totalPages);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 p-4 pt-8 font-sans md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      <header className="flex w-full max-w-4xl flex-col gap-4">
        <h1 className={`text-4xl font-medium leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl ${reveal.primary}`}>
          Localhost Tales
        </h1>
        <p className={`w-full text-lg md:text-xl font-normal tracking-normal leading-7 text-muted-foreground ${reveal.secondary}`}>
          Thoughts on code, design, and why I spent three hours fixing a single
          semicolon.
        </p>
      </header>

      <section key={currentPage} aria-label="Blog articles" className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 ${reveal.grid}`}>
        {pagePosts.map((post: PostMeta) => (
          <article key={post.slug} className="min-w-0">
            <Link
              href={`/blog/${post.slug}`}
              aria-labelledby={`article-${post.slug}`}
              className="group block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Card className="h-full gap-0 overflow-hidden p-0 border-border/50 shadow-sm transition-[border-color,box-shadow] duration-300 group-hover:border-border group-hover:shadow-md motion-reduce:transition-none">
                <div className="relative aspect-video overflow-hidden border-b border-border/50 bg-muted">
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc((100vw - 5.5rem) / 2), (max-width: 1151px) calc((100vw - 8rem) / 2), 32rem"
                      className="object-cover"
                    />
                  )}
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <h2 id={`article-${post.slug}`} className="line-clamp-2 text-xl font-medium leading-snug tracking-tight text-foreground">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-sm font-normal leading-6 tracking-normal text-muted-foreground sm:text-base">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-1 text-xs text-muted-foreground sm:text-sm">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </article>
        ))}

        {posts.length === 0 && (
          <div className="py-12 text-center text-muted-foreground md:col-span-2">
            No system logs available yet. Check back later.
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 pt-2"
        >
          <div className="min-w-0">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                aria-label={`Go to page ${currentPage - 1}`}
                className="group inline-flex items-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                scroll={false}
                prefetch
              >
                <ChevronLeft className="mr-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
                Previous
              </Link>
            )}
          </div>

          <span className="whitespace-nowrap rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground sm:px-4 sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <div className="min-w-0 text-right">
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                aria-label={`Go to page ${currentPage + 1}`}
                className="group inline-flex items-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                scroll={false}
                prefetch
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
