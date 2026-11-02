"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Github, Linkedin, CornerDownLeft } from "lucide-react";
import {
  User,
  House as Home,
  Briefcase,
  Code as CodeXml,
  BookOpen,
  Envelope as Mail,
  FileText,
  FolderSimple as FolderDot,
  PenNib as PenTool,
} from "@phosphor-icons/react/ssr";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type CommandLink = { title: string; href: string };
export type CommandEntries = { projects: CommandLink[]; posts: CommandLink[] };

export function CommandMenu({ initialOpen = false, entries }: { initialOpen?: boolean; entries: CommandEntries }) {
  const [open, setOpen] = React.useState(initialOpen);
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomEvent = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleCustomEvent);
    
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    setSearchQuery(""); // Reset search when closing
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Type a command or search..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <div className="mx-1 mb-1 overflow-hidden rounded-xl bg-background ring-1 ring-border">
        <CommandList className="no-scrollbar">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => runCommand(() => router.push("/experience"))}>
              <FileText />
              <span>View Experience</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Navigation">
            <CommandItem value="explore" onSelect={() => runCommand(() => router.push("/"))}>
              <Home />
              <span>Explore</span>
            </CommandItem>
            <CommandItem value="about" onSelect={() => runCommand(() => router.push("/about"))}>
              <User />
              <span>About</span>
            </CommandItem>
            <CommandItem value="stack" onSelect={() => runCommand(() => router.push("/stack"))}>
              <CodeXml />
              <span>Stack</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Projects">
            {entries.projects.map((project) => (
              <CommandItem key={project.href} value={`${project.title} ${project.href}`} onSelect={() => runCommand(() => router.push(project.href))}>
                <FolderDot className="text-muted-foreground" />
                <span>{project.title}</span>
              </CommandItem>
            ))}
            <CommandItem value="view all projects" onSelect={() => runCommand(() => router.push("/projects"))}>
              <Briefcase />
              <span>View All Projects...</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Writing">
            {entries.posts.map((blog) => (
              <CommandItem key={blog.href} value={`${blog.title} ${blog.href}`} onSelect={() => runCommand(() => router.push(blog.href))}>
                <PenTool className="text-muted-foreground" />
                <span>{blog.title}</span>
              </CommandItem>
            ))}
            <CommandItem value="view all articles" onSelect={() => runCommand(() => router.push("/blog"))}>
              <BookOpen />
              <span>View All Articles...</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Connect">
            <CommandItem onSelect={() => runCommand(() => router.push("/contact"))}>
              <Mail />
              <span>Contact Form</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/iyawnnn", "_blank"))}>
              <Github />
              <span>GitHub</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://www.linkedin.com/in/ianmacabulos/", "_blank"))}>
              <Linkedin />
              <span>LinkedIn</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </div>
      <div className="flex h-10 items-center justify-between px-3 text-xs font-medium text-muted-foreground">
        <span
          role="img"
          aria-label="Ian mark"
          className="size-6 bg-current [mask-image:url('/logo/personal-logo-black.png')] [mask-mode:luminance] [mask-repeat:no-repeat] [mask-size:contain]"
        />
        <span className="flex items-center gap-1.5">
          Open
          <kbd className="flex size-5 items-center justify-center rounded border border-border text-foreground">
            <CornerDownLeft aria-hidden="true" className="size-3" />
            <span className="sr-only">Enter</span>
          </kbd>
        </span>
      </div>
    </CommandDialog>
  );
}
