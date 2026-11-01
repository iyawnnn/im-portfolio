import type { ElementType } from "react";
import {
  SiAngular,
  SiCss3,
  SiCloudinary,
  SiDocker,
  SiDrizzle,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiLaravel,
  SiLeaflet,
  SiLivewire,
  SiMaplibre,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPrimevue,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedis,
  SiTailwindcss,
  SiThemoviedatabase,
  SiTypescript,
  SiVuedotjs,
  SiVite,
  SiZod,
} from "react-icons/si";
import { Database } from "@phosphor-icons/react/ssr";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TECHNOLOGY_ICONS = {
  Angular: SiAngular,
  "Better Auth": undefined,
  CSS3: SiCss3,
  Cloudinary: SiCloudinary,
  Docker: SiDocker,
  Drizzle: SiDrizzle,
  Expo: SiExpo,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Laravel: SiLaravel,
  "Leaflet.js": SiLeaflet,
  Livewire: SiLivewire,
  MapLibre: SiMaplibre,
  MongoDB: SiMongodb,
  "Next.js": SiNextdotjs,
  NextAuth: undefined,
  "Node.js": SiNodedotjs,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  PrimeVue: SiPrimevue,
  Prisma: SiPrisma,
  Python: SiPython,
  React: SiReact,
  Redis: SiRedis,
  pgvector: undefined,
  "React Native": SiReact,
  "React Router": SiReactrouter,
  "Tailwind CSS": SiTailwindcss,
  "TMDB API": SiThemoviedatabase,
  TypeScript: SiTypescript,
  Vue: SiVuedotjs,
  Vite: SiVite,
  Zod: SiZod,
  Zustand: Database,
} satisfies Record<string, ElementType | undefined>;

export type ProjectTechnology = keyof typeof TECHNOLOGY_ICONS;

export function ProjectStackBadge({
  technology,
  className,
}: {
  technology: ProjectTechnology;
  className?: string;
}) {
  const Icon = TECHNOLOGY_ICONS[technology];

  return (
    <Badge variant="secondary" className={cn("gap-1.5 rounded-md group-hover:bg-background transition-colors", className)}>
      {Icon ? <Icon className="shrink-0" aria-hidden="true" /> : null}
      {technology}
    </Badge>
  );
}
