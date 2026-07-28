# Lucas Cardoso — Portfolio

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build && npm start
```

## What's here

- **Single page, four sections** (`Home`, `About`, `Work`, `Contact`) navigated
  by anchor links from a floating pill nav that turns translucent on scroll.
- **Dark mode by default**, light mode optional, persisted via `next-themes`
  (`localStorage`, key `lucas-portfolio:theme`).
- **EN / PT-BR**, persisted via a small custom context in `lib/i18n/context.tsx`
  (`localStorage`, key `lucas-portfolio:locale`). First visit falls back to the
  browser's language.
- **Work section**: each project renders as a full section (not a card grid),
  with a sticky filter bar above the list. Filtering only shows categories
  that at least one project actually uses.
- **Signature visual element**: a faint fixed coordinate grid across the whole
  page, plus small monospace axis-tick marks near key headlines — a quiet nod
  to the data-visualization specialty, without drawing a literal chart
  anywhere in the chrome.

## Content model

`data/projects.ts` holds the structural fields from the spec (`company`,
`logo`, `product`, `tags`, `image`, `figmaUrl`, `passwordProtected`).
Translatable copy (`headline`, `context`, `responsibilities`, `impact`, CTA
label) lives in `locales/en.json` and `locales/pt-BR.json` under
`project.<id>`, keyed by the project's `id`.

To add a project:
1. Add an entry to `data/projects.ts` with a new `id`.
2. Add a matching `project.<id>` block to **both** locale files.
3. Drop a real hero image into `public/projects/` and point `image` at it.

Two real case studies are seeded — **Reporting Hub** (Elsevier) and
**TOEFLync** — as concise, problem-first previews. Both currently link out to
a placeholder Figma URL (`figmaUrl: "https://www.figma.com/"`) — swap in the
real case-study links.

## Placeholders to replace before shipping

- `public/projects/*.svg` — abstract placeholder hero art. Swap for real
  project photography/screenshots (and switch the `<img>` in
  `ProjectSection.tsx` to `next/image` once they're raster images).
- `public/companies/*.svg` — placeholder monogram logos. Swap for real marks.
- `/public/resume.pdf` — referenced by the Hero and Contact CTAs but not
  included; add the actual file.
- Contact links in `components/Contact.tsx` (LinkedIn URL, email address).
- `data/projects.ts` → `figmaUrl` for each project.

## Design tokens

Defined in `app/globals.css`:
- Color: deep ink navy background (`#0b0e14`, not pure black) with a single
  restrained "signal blue" accent (`#5b7fff`); a muted teal (`#2dd4bf`) exists
  only for small data-viz accents (ticks, bullet dots), never for text or
  large surfaces. Light mode mirrors these as warm paper tones.
- Type: **Space Grotesk** for display headings, **Inter** for body text,
  **IBM Plex Mono** for eyebrows, tags, and axis ticks — self-hosted via
  `@fontsource/*` (no runtime Google Fonts fetch, so builds don't depend on
  outbound access to `fonts.googleapis.com`).

## Accessibility

Semantic landmarks (`header`, `nav`, `main`, `article`, `footer`), a
skip-to-content link, visible focus rings (`:focus-visible`), reduced-motion
handling (global `prefers-reduced-motion` override, plus the axis grid being
static art rather than animated), and `aria-label`/`aria-hidden` used
throughout for decorative vs. meaningful elements.

## Known trade-offs

- i18n is a small hand-rolled context rather than `next-intl`, since this is
  a single page with anchor navigation, not locale-based routing. If the site
  grows into multiple routes, `next-intl` would be the better fit.
- Company logos and hero images are placeholder SVGs (see above) — they're
  intentional and on-brand, but they're not real assets.
