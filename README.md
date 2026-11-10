# onnenai.cc

Personal portfolio of Haruki USAMI (Onnenai) — https://onnenai.cc

## Stack

- React 19 + Vite + TanStack Router (file-based, SPA)
- [Meta Astryx](https://www.npmjs.com/package/@astryxdesign/core) for theme, components, and layout; Tailwind CSS v4 (via the Astryx bridge) for small adjustments
- Gen Interface JP (self-hosted)
- Cloudflare Workers Static Assets

## Getting started

Requires Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Scripts

| Command            | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `pnpm dev`         | Start the dev server                                                 |
| `pnpm check`       | Type check, lint, token guard, and `astryx doctor`                   |
| `pnpm build`       | Build to `dist/`                                                     |
| `pnpm preview`     | Preview the build                                                    |
| `pnpm format`      | Format with Prettier and fix lint                                    |
| `pnpm theme:build` | Rebuild the theme after editing `src/themes/onnenai/onnenaiTheme.ts` |
| `pnpm deploy`      | Build, run `astryx doctor --built .`, and deploy with Wrangler       |

## Project structure

```
src/
├── routes/      # Pages: /, /works, /personal (+ 404)
├── components/  # Header, Footer, WorkCard, etc.
├── content/     # Site text, profile, and works (typed arrays)
├── assets/      # Images (imported from content)
├── themes/      # Astryx theme (onnenai)
└── styles/      # globals.css (the only CSS entry)
docs/
├── SPEC.md      # Specification
└── TOKENS.md    # Allowed Tailwind classes
```

## Editing content

All text and works live in `src/content/*.ts`:

- `profile.ts` — hero, positions, awards, skills, links
- `works.ts` / `personal.ts` — cards on `/works` and `/personal` (`featured: true` also shows them on the top page)
- `site.ts` — site name, page titles, section headings

Put images in `src/assets/` and import them.

## Design

Design source: Figma "onnenai.cc-systems". Theme values live only in the Astryx theme; see `docs/SPEC.md` and `CLAUDE.md` for the rules.
