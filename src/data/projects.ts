import type { ProjectData } from "@/components/ui/home-project-card";

export const PROJECTS_PER_PAGE = 6;

export const PROJECTS: ProjectData[] = [
  {
    title: "Neffi",
    description:
      "A physical-and-digital NFC card platform combining secure activation, customizable profiles, permanent card URLs, and the operational workflows behind the product.",
    link: "/projects/neffi",
    image: "/projects/neffi/cover.webp",
    video: "/projects/neffi/neffi-demo.mp4",
    tags: ["Next.js", "PostgreSQL", "Drizzle", "Better Auth"],
  },
  {
    title: "Better San Fernando",
    description:
      "An open-source civic-information and transparency portal making San Fernando’s public information easier to find, understand, and verify.",
    link: "/projects/better-san-fernando",
    image: "/projects/better-san-fernando/cover.webp",
    video: "/projects/better-san-fernando/bettersanfernando-demo.mp4",
    tags: ["Next.js", "TypeScript", "MapLibre", "Zod"],
  },
  {
    title: "UA LabSign — Laboratory Attendance System",
    commandTitle: "UA LabSign",
    description:
      "A zero-trust web and mobile laboratory attendance platform combining device-bound cryptographic signatures, instant geofencing, and role-based academic workflows.",
    link: "/projects/ua-attendance",
    image: "/projects/ua-attendance/ua-attendance-cover.webp",
    video: "/projects/ua-attendance/ua-attendance-demo.mp4",
    tags: ["Next.js", "PostgreSQL", "React Native", "Expo"],
  },
  {
    title:
      "AC-CORE (Angeles City Center for Operational Reporting and Engineering)",
    commandTitle: "AC-CORE",
    description:
      "A civic incident-reporting platform connecting geotagged resident reports with map-based review, status tracking, and municipal maintenance workflows.",
    image: "/projects/ac-core/accore-cover.webp",
    video: "/projects/ac-core/accore-demo.mp4",
    link: "/projects/ac-core",
    tags: ["Angular", "Node.js", "MongoDB", "Leaflet.js"],
  },
  {
    title: "Grit",
    description:
      "An intelligent career management platform utilizing Groq AI to score resumes against job descriptions, featuring dynamic Kanban application boards and mock interviews.",
    tags: ["Laravel", "Livewire", "PHP", "PostgreSQL"],
    link: "/projects/grit",
    image: "/projects/grit/grit-cover.webp",
    video: "/projects/grit/grit-demo.mp4",
  },
  {
    title: "KodaSync",
    description:
      "A developer knowledge workspace turning code, technical notes, and imported documentation into searchable context for semantic retrieval, RAG chat, and AI-assisted editing.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "pgvector"],
    link: "/projects/kodasync",
    image: "/projects/kodasync/kodasync-cover.webp",
    video: "/projects/kodasync/kodasync-demo.mp4",
  },
  {
    title: "SubVantage",
    description:
      "A subscription-management dashboard that normalizes recurring costs across currencies and billing cycles, with lifecycle tracking, renewal visibility, spending projections, and cancellation history.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "NextAuth"],
    link: "/projects/subvantage",
    image: "/projects/subvantage/subvantage-cover.webp",
    video: "/projects/subvantage/subvantage-demo.mp4",
  },
  {
    title: "Mama R's",
    description:
      "An internal bakery operations system that connects order fulfillment, inventory movement, expenses, reporting, and end-of-day cash reconciliation in one workflow.",
    tags: ["React", "TypeScript", "Express", "MongoDB"],
    link: "/projects/mamars",
    image: "/projects/mamars/mamars-branded-cover.webp",
  },
  {
    title: "ClimaPH",
    description:
      "A location-aware weather dashboard for Philippine cities, combining current conditions, short-range forecasts, air quality, and interactive weather maps.",
    tags: ["Next.js", "TypeScript", "Zustand", "MapLibre"],
    link: "/projects/climaph",
    image: "/projects/climaph/climaph-cover.webp",
    video: "/projects/climaph/climaph-demo.mp4",
  },
  {
    title: "Thryve",
    description:
      "A third-year academic full-stack health tracker combining workouts, meals, hydration, sleep, daily goals, progress analytics, and achievement milestones.",
    tags: ["Vue", "Node.js", "Express", "MongoDB"],
    link: "/projects/thryve",
    image: "/projects/thryve/thryve-cover.webp",
    video: "/projects/thryve/thryve-demo.mp4",
  },
  {
    title: "MovieLoom",
    description:
      "A React movie and TV discovery interface connecting TMDB search, genres, people, credits, trailers, and detailed title pages.",
    tags: ["React", "React Router", "Vite", "TMDB API"],
    link: "/projects/movieloom",
    image: "/projects/movieloom/movieloom-cover.webp",
    video: "/projects/movieloom/movieloom-demo.mp4",
  },
];
