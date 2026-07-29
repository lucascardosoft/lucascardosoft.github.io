export type FilterTag =
  | "healthcare"
  | "enterprise"
  | "ai"
  | "accessibility"
  | "dashboards"
  | "research"
  | "designSystems"
  | "finance";

/**
 * "public" — figmaUrl is set and links out directly.
 * "restricted" — case is finished, but the link is never shipped in the
 *   client bundle; visitors request access and get the link by email.
 * "comingSoon" — case isn't ready yet, nothing to link or request.
 */
export type CaseAccess = "public" | "restricted" | "comingSoon";

export interface Project {
  /** Matches a key under `project` in /locales/{locale}.json */
  id: string;
  company: string;
  /** Brand SVG, shown in its original colors. Used as-is in dark theme too, unless `logoLight` is set. */
  logo?: string;
  /** Alternate logo file shown only in light theme, for marks that don't hold contrast on a pale background. */
  logoLight?: string;
  /** Tailwind sizing classes for the logo — brand marks vary a lot in aspect ratio and detail. */
  logoClassName?: string;
  product: string;
  /** Job title on the engagement — not translated, kept identical across locales */
  role: string;
  technologies: string[];
  tags: FilterTag[];
  image: string;
  access: CaseAccess;
  /** Only set (and only ever committed) for `access: "public"` cases. */
  figmaUrl?: string;
}

/**
 * Copy (headline, context, responsibilities, highlights, impact) is
 * intentionally NOT here — it lives in /locales/en.json and
 * /locales/pt-BR.json under `project.<id>`, keyed by `id` below. Keep
 * this file to structural / non-translatable fields only.
 *
 * Add a new project by:
 *   1. Adding an entry here with a unique `id`
 *   2. Adding a matching `project.<id>` block to both locale files
 *   3. Dropping a hero image into /public/projects/
 */
export const projects: Project[] = [
  {
    id: "siga-emergencia",
    company: "Hapvida",
    logo: "/companies/hapvida.svg",
    logoClassName: "h-7 max-w-[150px]",
    product: "SIGA Emergência",
    role: "Lead Product Designer",
    technologies: ["Figma", "Miro", "Design System"],
    tags: ["healthcare", "enterprise", "ai"],
    image: "/projects/siga-emergencia.svg",
    access: "restricted",
  },
  {
    id: "carrefour",
    company: "Carrefour",
    logo: "/companies/carrefour.svg",
    logoClassName: "h-12 max-w-[90px]",
    product: "Customer Service Platform",
    role: "UX/UI Designer",
    technologies: ["Figma", "Salesforce Service Cloud", "Miro"],
    tags: ["enterprise"],
    image: "/projects/carrefour.svg",
    access: "restricted",
  },
  {
    id: "interage",
    company: "Interage",
    logo: "/companies/interage.svg",
    logoClassName: "h-7 max-w-[150px]",
    product: "Drug Interaction Platform",
    role: "UX/UI Designer",
    technologies: ["Figma", "Miro"],
    tags: ["healthcare", "research"],
    image: "/projects/interage.svg",
    access: "public",
    figmaUrl:
      "https://www.figma.com/deck/BdTPxmpXmnslg72H8A6V1a/Interage?node-id=4004-218&viewport=-133%2C-89%2C0.62&t=n172DLJChMawYHy2-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
  },
  {
    id: "reporting-hub",
    company: "Elsevier",
    logo: "/companies/elsevier.svg",
    logoLight: "/companies/elsevier-graphite.svg",
    logoClassName: "h-9 max-w-[150px]",
    product: "Reporting Hub",
    role: "Product Designer",
    technologies: [
      "Figma",
      "Tableau Cloud",
      "Highcharts",
      "Leyden Design System",
      "Confluence",
      "Jira",
    ],
    tags: ["healthcare", "enterprise", "dashboards", "accessibility", "ai", "research"],
    image: "/projects/reporting-hub.svg",
    access: "comingSoon",
  },
];
