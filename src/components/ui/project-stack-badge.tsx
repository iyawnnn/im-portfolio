import {
  SiAngular,
  SiCss3,
  SiExpo,
  SiExpress,
  SiFastapi,
  SiLaravel,
  SiLivewire,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

import { Badge } from "@/components/ui/badge";

const TECHNOLOGY_ICONS = {
  Angular: SiAngular,
  CSS3: SiCss3,
  Expo: SiExpo,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Laravel: SiLaravel,
  Livewire: SiLivewire,
  MongoDB: SiMongodb,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  React: SiReact,
  "React Native": SiReact,
  TypeScript: SiTypescript,
  Vue: SiVuedotjs,
};

export type ProjectTechnology = keyof typeof TECHNOLOGY_ICONS;

export function ProjectStackBadge({ technology }: { technology: ProjectTechnology }) {
  const Icon = TECHNOLOGY_ICONS[technology];

  return (
    <Badge variant="secondary" className="gap-1.5 rounded-md group-hover:bg-background transition-colors">
      <Icon className="shrink-0" aria-hidden="true" />
      {technology}
    </Badge>
  );
}
