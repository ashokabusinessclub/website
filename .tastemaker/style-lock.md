# Style lock — Ashoka Business Club

Established: 2026-09-02. Source: user-specified palette and hierarchy.

## Palette

- Background: `#F8EDDD` — default warm page ground.
- Surface: `#FFFFFF` — cards, forms, popovers, and content panels.
- Primary: `#0C2521` — structural brand color for headings, navigation, footer, and dark feature surfaces.
- Accent: `#B7410E` — scarce action color for primary CTAs, active emphasis, focus, and selection.
- Alternate section: `#F7E7CE` — section separation.
- Highlight: `#F8E0D8` — restrained callouts and testimonial surfaces.
- Border: `#E4D0B6` — decorative hairlines and muted boundaries only.
- Text primary: `#0C2521` — contrast against Background: 13.94:1 (WCAG AA pass).
- Button label: `#FFFFFF` — contrast against Accent: 5.56:1 (WCAG AA pass).
- Dark mode: runtime toggle. Verified companion roles: Background `#0A1F1B`, Surface `#102823`, Text `#F8F1E7`, Accent `#B7410E`, Border `#304B45`; the fixed brand anchors do not invert.

## Color contract

- Text-safe (>=4.5): deep green/white, deep green/cream, deep green/beige, cream/deep green, white/deep green, white/rust, cream/rust.
- UI-safe (>=3.0 and <4.5): rust/beige.
- Decorative (<3.0): rust/deep green, white/beige, cream/beige, cream/white. These combinations cannot carry text or be the sole state indicator.
- Rust stays near 10% of the composition and is used as a filled action with a white label on light grounds. On deep green, use cream or white for text and state indicators.
- Beige borders are decorative; focus and active states use the verified rust ring on light surfaces or cream on fixed deep-green surfaces.
- Dark companion text-safe pairings: cream/dark background 15.29:1, cream/dark surface 13.87:1, cream/rust 4.96:1. Rust/dark background is UI-safe at 3.08:1; rust/dark surface is decorative at 2.80:1.

## Typography

- Display/heading: League Spartan — direct, contemporary, and strong enough for the institutional editorial frame.
- Body: Montserrat.
- Scale: fluid marketing scale, 16px body base, tight display leading.

## Shape language

- Corner radius: 6px base; 12px for feature media and elevated cards; pills only for compact controls.
- Shadow depth: shallow green-tinted elevation.
- Border usage: warm beige hairlines provide most separation; no gradient borders.

## Density & spacing

- Base unit: 4px.
- Section padding: connective 64px; standard 80–96px; pivotal/hero up to 160px.
- Content-card padding: 24–32px.
- Overall density: generous editorial marketing layout with compact navigation and data rows.
- Section separation: alternating cream, white, and pale warm surfaces plus crisp hairlines.

## Structure

- Existing multi-page editorial architecture is preserved.
- Shared chrome: fixed deep-green navigation and deep-green directory footer.
- Homepage: asymmetrical split hero, editorial department index, compact venture showcase.

## Reference intelligence

- Reference board: not required; this pass changes the color system rather than the structural direction.
- Design read: institutional student-club marketing site for prospective members and partners, mode Persuade, with a warm editorial lane.
- Dials: variance 5/10, motion 5/10, density 5/10, art direction 6/10.
- Foundation: existing React component stack and semantic CSS tokens.
- Direction contract: Thesis — credible institution with entrepreneurial energy; First viewport — cream editorial field with rust action; System — green structure, warm neutral layers, scarce rust; Risk — allowing rust or beige to become visually dominant.
- Anti-references: generic SaaS gradients, glowing blobs, multicolor cards, and unrelated accent palettes outside an intentional sub-brand.

## Taste memory

- Profile priors used: none.
- Decision log: `.tastemaker/decisions.log`.
- Last resolved decision: 2026-09-02 user requested integration of the supplied palette with Tastemaker.
- Pending review: final palette application after browser review.
- Profile promotion: none; this is a project-specific brand decision.
- Memory precedence: the current user-specified palette replaces earlier approximate ABC color tokens.

## Mood descriptors

Institutional, warm, energetic, editorial.

## Assets

- Existing photography, department artwork, and sponsor marks are preserved.
- NIBBL retains its distinct purple/brown dessert sub-brand inside clearly bounded NIBBL surfaces.

## Motion

- Feel: restrained and editorial.
- Curves: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- Entrance: existing reveal system, typically 350–600ms and 16–24px travel.
- Reduced motion: global reduced-motion fallbacks remain mandatory.
- Verified by: Tastemaker motion and anti-slop scans pending completion of this pass.

## Do not

- No gradients or decorative glow blobs.
- No eyebrow labels, decorative category pills, or badges above headings.
- Do not use rust as broad section fill or ordinary body text.
- Do not use beige as the default card fill.
- Do not merge NIBBL's sub-brand colors into the parent ABC palette.
