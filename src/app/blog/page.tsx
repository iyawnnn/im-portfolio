import Link from "next/link";
import { getAllPostsMeta } from "@/lib/mdx";
import { 
  ArrowRight, 
  Calendar, 
  BookText, 
  Code2, 
  LayoutTemplate, 
  Database, 
  Server, 
  Terminal, 
  Sparkles
} from "lucide-react";

// 1. Reverted tab title to Blog
export const metadata = {
  title: "Blog | Ian Macabulos",
  description: "Technical essays and architectural notes on full-stack web development, serverless scaling, and crafting borderless user interfaces.",
  keywords: ["Full-Stack Development", "Web Architecture", "UI/UX Design", "Next.js", "Minimalist Design", "Tech Blog"],
};

// 2. Icon Dictionary
const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  ui: LayoutTemplate,
  database: Database,
  backend: Server,
  terminal: Terminal,
  design: Sparkles,
  default: BookText,
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 px-8 lg:px-12 pt-8 md:pt-20 pb-24">
      
      {/* HEADER: Adjusted content width and sizing */}
      <section className="flex flex-col gap-3 md:gap-4">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl text-foreground">
          Engineering Logs
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg md:text-xl max-w-[800px] leading-relaxed">
          Technical deep-dives into full-stack web development, system architecture, and the pursuit of minimalist, high-performance UI design.
        </p>
      </section>

      {/* ROW LIST */}
      <section className="flex flex-col">
        {posts.map((post: any) => {
          // 3. Resolve the icon dynamically
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
    </div>
  );
}