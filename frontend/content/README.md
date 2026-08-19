# Content collections

All editable site content lives here as markdown files. The site reads these at
build time via `src/lib/content.ts` (Vite `import.meta.glob` + `gray-matter`),
so a CMS such as Decap that writes markdown directly will work without code
changes. The filename (minus `.md`) becomes the URL slug.

These files are **also the backup data source for the CMS**: the Payload CMS in
`../cms/` mirrors this content. If the CMS is unreachable at runtime, this
bundled markdown is what ships.

- `npm run cms:seed`   — import these files into the CMS (upsert by slug)
- `npm run cms:export` — export CMS state back into these files
- `npm run cms:dev`    — run the CMS locally (admin at http://localhost:3000/admin)
- See `../cms/README.md` for the full workflow.

## `content/departments/`
```yaml
name: string           # required
description: string    # required, shown on the overview grid
order: number          # optional, controls ordering
responsibilities:      # optional list, shown in the detail sidebar
  - string
```
Body: markdown describing the department's work.

## `content/events/`
```yaml
title: string          # required
date: YYYY-MM-DD       # required, newest first
category: string       # optional, becomes a filter chip
cover: /path/img.jpg   # optional cover image
location: string       # optional
description: string    # optional summary
featured: boolean      # optional
applyUrl: https://...  # optional, renders an "Apply Here" button
```
Body: markdown detail for the event page.

## `content/abr/`
```yaml
title: string          # required
date: YYYY-MM-DD       # required
author: string         # optional
type: Publication | Monocle   # optional, becomes a filter chip (new types allowed)
cover: /path/img.jpg   # optional
tags: [string]         # optional
excerpt: string        # optional
```
Body: the article itself in markdown.

## `content/sponsors/`
```yaml
name: string           # required
logo: /path/logo.png   # optional, falls back to the name
description: string    # optional
website: https://...   # optional, makes the card a link
year: string           # optional
order: number          # optional
```

Images referenced in frontmatter should live in `public/` and be referenced with
a root-relative path (e.g. `/uploads/house-of-cards.jpg`).
