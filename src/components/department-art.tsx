import { useId } from "react";
import { cn } from "@/lib/utils";

const BRASS = "#C9A05E";
const CRIMSON = "#C0485C";
const CREAM = "#F2E9D6";

/* ============================================
   DEPARTMENT ART
   Bespoke, abstract SVG compositions for each
   vertical. Rendered on a deep-ink "poster"
   panel so they read in both light and dark
   themes. Cropped via `slice` to any frame —
   key elements are kept inside the safe band
   (x≈100–700) so square cards, 4:3 panels and
   wide hero bands all stay legible.
   ============================================ */

export function DepartmentArt({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");

  const art =
    slug === "finance" ? <FinanceArt /> :
    slug === "externals-collaborations" ? <ExternalsArt /> :
    slug === "industry-collaborations" ? <IndustryArt /> :
    slug === "learning-development" ? <LearningArt /> :
    slug === "marketing" ? <MarketingArt /> :
    slug === "ashoka-business-review" ? <ReviewArt /> :
    <FinanceArt />;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1C160F" />
          <stop offset="1" stopColor="#110D08" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke={CREAM} strokeOpacity="0.05" />
        </pattern>
        <filter id={`${id}-noise`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 0.91  0 0 0 0 0.84  0 0 0 0.05 0"
          />
        </filter>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-grid)`} />

      {art}

      <rect
        width="800"
        height="600"
        filter={`url(#${id}-noise)`}
        opacity="0.55"
        style={{ mixBlendMode: "soft-light" }}
      />
    </svg>
  );
}

/* ---------------- Finance: ledger & rising chart ---------------- */

function FinanceArt() {
  const bars = [
    { x: 96, h: 110, o: 0.55 },
    { x: 155, h: 150, o: 0.65 },
    { x: 214, h: 205, o: 0.75 },
    { x: 273, h: 270, o: 0.85 },
    { x: 332, h: 350, o: 0.95 },
    { x: 391, h: 440, o: 1 },
  ];
  const base = 520;

  return (
    <g>
      <g stroke={CREAM} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 9">
        <line x1="80" y1="420" x2="470" y2="420" />
        <line x1="80" y1="300" x2="470" y2="300" />
      </g>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={base - b.h}
          width="50"
          height={b.h}
          rx="7"
          fill={i === bars.length - 1 ? CRIMSON : BRASS}
          opacity={b.o}
        />
      ))}
      <polyline
        points={bars.map((b) => `${b.x + 25},${base - b.h}`).join(" ")}
        fill="none"
        stroke={CREAM}
        strokeOpacity="0.7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {bars.map((b, i) => (
        <circle key={i} cx={b.x + 25} cy={base - b.h} r="5" fill={CREAM} />
      ))}
      <circle cx="620" cy="185" r="76" fill={CRIMSON} opacity="0.16" />
      <circle cx="620" cy="185" r="66" fill={CRIMSON} opacity="0.95" />
      <circle cx="620" cy="185" r="50" fill="none" stroke={BRASS} strokeWidth="2.5" />
      <circle cx="620" cy="185" r="58" fill="none" stroke={CREAM} strokeOpacity="0.25" strokeWidth="1" />
      <text
        x="620"
        y="218"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontWeight="700"
        fontSize="70"
        fill={CREAM}
      >
        ₹
      </text>
    </g>
  );
}

/* ------- Externals & Collaborations: networked nodes ------- */

function ExternalsArt() {
  const center = { cx: 486, cy: 248 };
  const nodes = [
    { cx: 292, cy: 158, r: 22, c: CRIMSON, o: 1 },
    { cx: 188, cy: 318, r: 18, c: BRASS, o: 1 },
    { cx: 372, cy: 436, r: 22, c: BRASS, o: 0.7 },
    { cx: 566, cy: 116, r: 18, c: CRIMSON, o: 0.8 },
    { cx: 622, cy: 398, r: 24, c: BRASS, o: 0.85 },
    { cx: 470, cy: 478, r: 16, c: CREAM, o: 0.55 },
  ];

  return (
    <g>
      <circle cx="210" cy="220" r="110" fill="none" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1.5" />
      <circle cx="330" cy="300" r="110" fill="none" stroke={CRIMSON} strokeOpacity="0.45" strokeWidth="1.5" />
      {nodes.map((n, i) => (
        <line
          key={i}
          x1={center.cx}
          y1={center.cy}
          x2={n.cx}
          y2={n.cy}
          stroke={CREAM}
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
      ))}
      <circle cx={center.cx} cy={center.cy} r="72" fill="none" stroke={BRASS} strokeWidth="3" />
      <circle cx={center.cx} cy={center.cy} r="13" fill={CRIMSON} />
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.c} opacity={n.o} />
      ))}
    </g>
  );
}

/* ------- Industry Collaborations: bridge & towers ------- */

function IndustryArt() {
  return (
    <g>
      <circle cx="400" cy="170" r="56" fill={BRASS} opacity="0.95" />
      <circle cx="400" cy="170" r="78" fill="none" stroke={BRASS} strokeOpacity="0.35" strokeWidth="1.5" />
      <line x1="200" y1="520" x2="600" y2="520" stroke={CREAM} strokeOpacity="0.22" strokeWidth="1.5" />
      <rect x="200" y="252" width="28" height="268" fill="#0D0A06" stroke={CREAM} strokeOpacity="0.3" />
      <rect x="572" y="252" width="28" height="268" fill="#0D0A06" stroke={CREAM} strokeOpacity="0.3" />
      <rect x="200" y="244" width="28" height="8" fill={BRASS} />
      <rect x="572" y="244" width="28" height="8" fill={BRASS} />
      <path
        d="M215 268 C 310 136, 490 136, 585 268"
        fill="none"
        stroke={BRASS}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M215 290 C 310 170, 490 170, 585 290"
        fill="none"
        stroke={CRIMSON}
        strokeWidth="2"
        strokeOpacity="0.85"
      />
      <line x1="215" y1="318" x2="585" y2="318" stroke={CREAM} strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 8" />
      <rect x="240" y="300" width="12" height="12" fill={BRASS} opacity="0.8" />
      <rect x="548" y="300" width="12" height="12" fill={BRASS} opacity="0.8" />
      <circle cx="300" cy="206" r="7" fill={CREAM} />
      <circle cx="350" cy="180" r="7" fill={CRIMSON} />
      <circle cx="450" cy="180" r="7" fill={BRASS} />
      <circle cx="500" cy="206" r="7" fill={CREAM} opacity="0.8" />
    </g>
  );
}

/* ------- Learning & Development: ascending steps & sun ------- */

function LearningArt() {
  const steps = [
    { x: 136, top: 440, c: BRASS, o: 0.5 },
    { x: 274, top: 356, c: BRASS, o: 0.68 },
    { x: 420, top: 272, c: BRASS, o: 0.86 },
    { x: 566, top: 188, c: CRIMSON, o: 0.95 },
  ];

  return (
    <g>
      <line x1="128" y1="520" x2="700" y2="520" stroke={CREAM} strokeOpacity="0.2" strokeWidth="1.5" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.top} width="132" height={520 - s.top} rx="6" fill={s.c} opacity={s.o} />
          <rect x={s.x} y={s.top} width="132" height="4" fill={CREAM} opacity="0.4" />
        </g>
      ))}
      <circle cx="600" cy="140" r="44" fill={CREAM} opacity="0.95" />
      <circle cx="600" cy="140" r="34" fill="none" stroke={CRIMSON} strokeWidth="2" />
      <g stroke={BRASS} strokeWidth="2" strokeLinecap="round">
        <line x1="600" y1="96" x2="600" y2="76" />
        <line x1="518" y1="120" x2="505" y2="105" />
        <line x1="682" y1="120" x2="695" y2="105" />
        <line x1="556" y1="140" x2="542" y2="140" />
        <line x1="644" y1="140" x2="658" y2="140" />
      </g>
      <g fill={BRASS}>
        <circle cx="150" cy="474" r="6" />
        <circle cx="206" cy="436" r="5" />
      </g>
    </g>
  );
}

/* ------- Marketing: radiating broadcast rings ------- */

function MarketingArt() {
  const origin = { x: 110, y: 560 };
  const arcs = [
    { r: 190, c: BRASS, o: 0.4, w: 3, dash: undefined as string | undefined },
    { r: 290, c: BRASS, o: 0.65, w: 4, dash: undefined },
    { r: 390, c: CRIMSON, o: 0.9, w: 5, dash: undefined },
    { r: 470, c: CREAM, o: 0.35, w: 2, dash: "2 9" },
  ];

  return (
    <g>
      {arcs.map((a, i) => (
        <path
          key={i}
          d={`M ${origin.x} ${origin.y} a ${a.r} ${a.r} 0 0 1 ${a.r} ${-a.r}`}
          fill="none"
          stroke={a.c}
          strokeOpacity={a.o}
          strokeWidth={a.w}
          strokeDasharray={a.dash}
          strokeLinecap="round"
        />
      ))}
      <circle cx={origin.x + 134} cy={origin.y - 134} r="5" fill={BRASS} />
      <circle cx={origin.x + 205} cy={origin.y - 205} r="6" fill={CRIMSON} />
      <circle cx={origin.x + 276} cy={origin.y - 276} r="5" fill={CREAM} />
      <circle cx="566" cy="190" r="102" fill="none" stroke={CRIMSON} strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="566" cy="190" r="80" fill="none" stroke={BRASS} strokeWidth="4" />
      <circle cx="566" cy="190" r="20" fill={CRIMSON} />
      <g fill={BRASS}>
        <circle cx="470" cy="100" r="6" />
        <circle cx="636" cy="124" r="7" />
        <circle cx="618" cy="300" r="6" />
      </g>
    </g>
  );
}

/* ------- Ashoka Business Review: editorial spread ------- */

function ReviewArt() {
  const lines = [200, 176, 214, 158, 196];

  return (
    <g>
      <text
        x="96"
        y="506"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="400"
        fill={CREAM}
        opacity="0.05"
      >
        A
      </text>
      <rect x="430" y="118" width="170" height="118" rx="8" fill={CRIMSON} opacity="0.9" />
      <rect x="430" y="118" width="170" height="118" rx="8" fill="none" stroke={CREAM} strokeOpacity="0.2" strokeWidth="1" />
      <rect x="430" y="250" width="110" height="6" rx="3" fill={CREAM} opacity="0.3" />
      {lines.map((w, i) => (
        <rect key={i} x="430" y={286 + i * 26} width={w} height="9" rx="4.5" fill={CREAM} opacity={0.16 + i * 0.02} />
      ))}
      <rect x="650" y="118" width="46" height="9" rx="4.5" fill={CREAM} opacity="0.14" />
      <rect x="650" y="286" width="48" height="9" rx="4.5" fill={CREAM} opacity="0.12" />
      <rect x="650" y="312" width="38" height="9" rx="4.5" fill={CREAM} opacity="0.1" />
      <line x1="624" y1="118" x2="624" y2="520" stroke={CREAM} strokeOpacity="0.1" strokeWidth="1" />
      <line x1="430" y1="520" x2="624" y2="520" stroke={BRASS} strokeOpacity="0.5" strokeWidth="1.5" />
    </g>
  );
}
