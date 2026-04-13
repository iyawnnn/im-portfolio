import Link from "next/link";
import Image from "next/image";
import { getAllPostsMeta } from "@/lib/mdx";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata = {
  title: "Blog | Ian Macabulos",
  description: "Thoughts on web development, technical architecture, and design.",
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-10 px-8 lg:px-12 pt-8 md:pt-20 pb-24 font-['Instrument_Sans',sans-serif]">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl">Writing</h1>
        <p className="text-base text-muted-foreground sm:text-lg max-w-2xl">
          Thoughts on web development, minimalist design, and building scalable applications.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
            <Card className="h-full overflow-hidden rounded-2xl border-transparent bg-transparent shadow-none transition-all duration-300 hover:bg-muted/10 flex flex-col p-2">
              {post.coverImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-border/50 bg-muted/20 mb-4">
                  <Image
                    src={post.coverImage}
                    alt={`Thumbnail for ${post.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader className="p-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <CardTitle className="text-xl sm:text-2xl tracking-tight transition-colors group-hover:text-[#e26a35]">
                  {post.title}
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-2 text-sm sm:text-base text-muted-foreground">
                  {post.description}
                </CardDescription>
              </CardHeader>
              <div className="p-2 mt-auto flex items-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-[#e26a35]">
                Read Article <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}