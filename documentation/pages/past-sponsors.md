# Sponsors Page Documentation

## Overview

The **Past Sponsors** page (`/sponsors`) displays organizations that have supported the Ashoka Business Club. The page has been simplified to show only sponsor names and logos in a clean, responsive grid.

## Page Structure

**Route:** `/sponsors`  
**Component:** `src/pages/Sponsors.tsx`  
**Card Component:** `src/components/cards.tsx` → `SponsorCard`  
**Content Source:** `content/sponsors/*.md` files parsed via `src/lib/content.ts`

## Sponsor Card Design

Each sponsor card displays:
- **Logo** (if provided): Centered in a 128px (`h-32`) container, constrained to `max-h-20 max-w-full` with `object-contain` — handles both tall and wide logos cleanly
- **Name fallback**: If no logo, displays sponsor name in display font (`font-display text-lg text-muted-foreground`)
- **Website link**: If `website` field exists in frontmatter, the entire card becomes a link opening in a new tab with `rel="noreferrer noopener"`
- **Hover effect**: Border color transitions to primary (brass/crimson)

## Grid Layout

Responsive grid (defined in `Sponsors.tsx`):
- Mobile: 1 column
- Tablet (`sm`): 2 columns
- Desktop (`lg`): 3 columns

## Adding a New Sponsor

### 1. Add Logo File (Recommended: SVG)

Place logo in `public/logos/`:
```
public/logos/
├── atlas-ventures.svg
├── example-capital.svg
├── northline-consulting.svg
└── quill-press.svg
```

**SVG recommended** for crisp scaling at any size. PNG/WebP also work.

### 2. Create Markdown File

Create a new `.md` file in `content/sponsors/`:

```markdown
---
name: "Sponsor Name"
logo: "/logos/sponsor-name.svg"
website: "https://sponsor-website.com"
order: 1
---
```

**Frontmatter fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Display name of the sponsor |
| `logo` | No | Path to logo file in `public/logos/` (e.g., `/logos/brand.svg`) |
| `website` | No | URL — makes entire card a link opening in new tab |
| `order` | No | Sort order (lower = first). Default: 99 |
| `year` | No | **Ignored** — kept for historical records only |
| `description` | No | **Ignored** — kept for historical records only |

### 3. Example

**File:** `content/sponsors/new-partner.md`

```markdown
---
name: "New Partner Co."
logo: "/logos/new-partner.svg"
website: "https://newpartner.com"
order: 2
---
```

### 4. Verify

Run dev server and check `/sponsors`:
```bash
npm run dev
```

The new sponsor appears in the grid, sorted by `order` then alphabetically by `name`.

## Content File Reference

Existing sponsors in `content/sponsors/`:
- `atlas-ventures.md`
- `example-capital.md`
- `northline-consulting.md`
- `quill-press.md`

## Technical Details

### Content Parsing (`src/lib/content.ts`)

```typescript
export interface Sponsor extends Frontmatter {
  name: string;
  logo?: string;
  description?: string;  // ignored in display
  website?: string;
  year?: string;         // ignored in display
  order?: number;
}
```

Sponsors are loaded via `import.meta.glob` and sorted by `order` then `name`.

### Card Component (`src/components/cards.tsx`)

```tsx
export function SponsorCard({ item }: { item: ContentEntry<Sponsor> }) {
  const content = (
    <div className="flex h-32 items-center justify-center bg-background px-6">
      {item.data.logo ? (
        <img src={item.data.logo} alt={`${item.data.name} logo`} loading="lazy" className="max-h-20 max-w-full object-contain" />
      ) : (
        <span className="font-display text-lg text-muted-foreground">{item.data.name}</span>
      )}
    </div>
  );

  return item.data.website ? (
    <a href={item.data.website} target="_blank" rel="noreferrer noopener" className="block border border-border bg-card transition-colors hover:border-primary">
      {content}
    </a>
  ) : (
    <div className="block border border-border bg-card transition-colors hover:border-primary">{content}</div>
  );
}
```

## Best Practices

1. **Use SVG logos** — scale perfectly, small file size
2. **Keep logos square-ish** — the `max-h-20 max-w-full` constraint handles rectangles well, but near-square works best
3. **Set `order`** — controls display sequence (1, 2, 3...)
4. **Include `website`** — enables click-through to partner site
5. **Transparent backgrounds** — logos with transparent backgrounds look best on the card's background color

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Logo not showing | Check path in frontmatter matches file in `public/logos/` exactly (case-sensitive) |
| Logo too small/large | Adjust logo file dimensions; container is fixed at 128px height with `max-h-20` (80px) max for image |
| Sponsor not appearing | Verify `.md` file is in `content/sponsors/` and frontmatter has `name` field |
| Wrong order | Check `order` values; lower numbers appear first |