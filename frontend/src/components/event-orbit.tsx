import { useId, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ContentEntry, EventItem, formatDate } from "@/lib/content";
import { MaskRise, Reveal } from "@/components/reveal";

const BRASS = "#C9A05E";
const CRIMSON = "#C0485C";
const CREAM = "#F2E9D6";

/* ============================================
   EVENT ART — bespoke circular compositions.
   Drawn inside a 400×400 viewBox centred on
   (200,200) so the disc can spin forever
   without any element leaving the circle.
   Symmetric guides are rotation-invariant;
   asymmetric marks make the motion legible.
   ============================================ */

function ArtFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="orbit-bg" cx="0.38" cy="0.32" r="1">
          <stop offset="0" stopColor="#241D13" />
          <stop offset="1" stopColor="#110D08" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#orbit-bg)" />
      {/* rotation-invariant instrument guides */}
      <circle cx="200" cy="200" r="150" fill="none" stroke={CREAM} strokeOpacity="0.07" />
      <circle cx="200" cy="200" r="104" fill="none" stroke={CREAM} strokeOpacity="0.05" />
      <g stroke={CREAM} strokeOpacity="0.16">
        <line x1="200" y1="42" x2="200" y2="58" />
        <line x1="200" y1="342" x2="200" y2="358" />
        <line x1="42" y1="200" x2="58" y2="200" />
        <line x1="342" y1="200" x2="358" y2="200" />
      </g>
      {children}
    </svg>
  );
}

/* ABR Launch — editorial spread orbiting the centre */
function LaunchArt() {
  const bars = [96, 128, 112, 140, 84];
  return (
    <g>
      <text
        x="132"
        y="236"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="210"
        fill={CREAM}
        opacity="0.06"
      >
        A
      </text>
      <rect x="228" y="118" width="92" height="64" rx="7" fill={CRIMSON} opacity="0.92" />
      <rect x="228" y="118" width="92" height="64" rx="7" fill="none" stroke={CREAM} strokeOpacity="0.25" />
      {bars.map((w, i) => (
        <rect key={i} x="228" y={198 + i * 22} width={w * 0.9} height="7" rx="3.5" fill={CREAM} opacity={0.16 + i * 0.03} />
      ))}
      <line x1="120" y1="120" x2="204" y2="120" stroke={BRASS} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="136" x2="180" y2="136" stroke={CREAM} strokeOpacity="0.3" strokeLinecap="round" />
      <line x1="120" y1="152" x2="192" y2="152" stroke={CREAM} strokeOpacity="0.18" strokeLinecap="round" />
      <circle cx="122" cy="292" r="10" fill={BRASS} opacity="0.85" />
    </g>
  );
}

/* House of Cards — fanned hand of cards */
function CardsArt() {
  const cards = [-44, -22, 0, 22, 44];
  return (
    <g>
      {cards.map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 200 268)`}>
          <rect
            x="168"
            y="86"
            width="64"
            height="182"
            rx="9"
            fill={i === 4 ? CRIMSON : i % 2 === 0 ? "#1C160F" : "#241D13"}
            stroke={i === 4 ? CRIMSON : BRASS}
            strokeOpacity={i === 4 ? 1 : 0.55}
            strokeWidth="2"
          />
          <circle cx="200" cy="126" r="9" fill={i === 4 ? CREAM : BRASS} opacity={i === 4 ? 0.9 : 0.75} />
          <line x1="184" y1="230" x2="216" y2="230" stroke={CREAM} strokeOpacity="0.28" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="200" cy="268" r="17" fill={BRASS} />
      <circle cx="200" cy="268" r="26" fill="none" stroke={CREAM} strokeOpacity="0.3" />
    </g>
  );
}

/* nibbl. — scoops of dessert on a dotted plate */
function NibblArt() {
  const sprinkles = [
    { x: 148, y: 130, c: CREAM }, { x: 262, y: 142, c: BRASS },
    { x: 118, y: 214, c: BRASS }, { x: 286, y: 222, c: CREAM },
    { x: 172, y: 300, c: CRIMSON }, { x: 240, y: 306, c: BRASS },
  ];
  return (
    <g>
      <circle cx="200" cy="212" r="118" fill="none" stroke={CREAM} strokeOpacity="0.16" strokeDasharray="3 12" />
      <circle cx="164" cy="188" r="52" fill={CRIMSON} opacity="0.94" />
      <circle cx="238" cy="196" r="46" fill={BRASS} opacity="0.95" />
      <circle cx="200" cy="256" r="56" fill="#241D13" stroke={CREAM} strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="200" cy="256" r="30" fill={CRIMSON} opacity="0.55" />
      <path d="M170 250 q30 -26 60 0" fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
      {sprinkles.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="5" fill={s.c} opacity="0.7" />
      ))}
    </g>
  );
}

/* Speaker Sessions — broadcast arcs off an origin */
function SessionsArt() {
  const arcs = [
    { r: 84, w: 3, c: BRASS, o: 0.45 },
    { r: 128, w: 4, c: BRASS, o: 0.65 },
    { r: 172, w: 5, c: CRIMSON, o: 0.9 },
  ];
  return (
    <g>
      {arcs.map((a, i) => (
        <path
          key={i}
          d={`M ${200 - a.r} 232 a ${a.r} ${a.r} 0 0 1 ${a.r * 2} 0`}
          fill="none"
          stroke={a.c}
          strokeOpacity={a.o}
          strokeWidth={a.w}
          strokeLinecap="round"
        />
      ))}
      <rect x="176" y="150" width="48" height="88" rx="24" fill={CRIMSON} />
      <rect x="176" y="150" width="48" height="88" rx="24" fill="none" stroke={CREAM} strokeOpacity="0.25" />
      <line x1="200" y1="238" x2="200" y2="264" stroke={BRASS} strokeWidth="4" strokeLinecap="round" />
      <line x1="176" y1="266" x2="224" y2="266" stroke={BRASS} strokeWidth="4" strokeLinecap="round" />
      <circle cx="304" cy="128" r="7" fill={BRASS} />
      <circle cx="98" cy="140" r="5" fill={CREAM} opacity="0.7" />
      <circle cx="290" cy="308" r="6" fill={CRIMSON} opacity="0.8" />
      <circle cx="116" cy="300" r="4.5" fill={BRASS} opacity="0.7" />
    </g>
  );
}

/* Fallback — planet on dashed orbits */
function OrbitArt() {
  return (
    <g>
      <ellipse cx="200" cy="200" rx="158" ry="60" fill="none" stroke={BRASS} strokeOpacity="0.4" strokeWidth="1.5" transform="rotate(-24 200 200)" />
      <ellipse cx="200" cy="200" rx="158" ry="60" fill="none" stroke={CREAM} strokeOpacity="0.14" strokeWidth="1.5" transform="rotate(38 200 200)" strokeDasharray="4 10" />
      <circle cx="200" cy="200" r="62" fill={BRASS} opacity="0.95" />
      <circle cx="200" cy="200" r="80" fill="none" stroke={CRIMSON} strokeWidth="2" strokeOpacity="0.7" />
      <circle cx="318" cy="146" r="11" fill={CRIMSON} />
      <circle cx="92" cy="252" r="8" fill={CREAM} opacity="0.85" />
    </g>
  );
}

function EventArt({ slug }: { slug: string }) {
  const art =
    slug === "abr-launch" ? <LaunchArt /> :
    slug === "house-of-cards" ? <CardsArt /> :
    slug === "nibbl" ? <NibblArt /> :
    slug === "speaker-sessions" ? <SessionsArt /> :
    <OrbitArt />;
  return <ArtFrame>{art}</ArtFrame>;
}

/* ============================================
   DIAL RING — cominvi-style tick instrument,
   counter-rotating around each disc
   ============================================ */

function DialRing({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`h-full w-full ${className}`} aria-hidden="true" focusable="false">
      <g stroke="currentColor">
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const long = i % 5 === 0;
          const r1 = long ? 91 : 95;
          const x1 = 100 + Math.cos(a) * r1;
          const y1 = 100 + Math.sin(a) * r1;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={100 + Math.cos(a) * 99}
              y2={100 + Math.sin(a) * 99}
              strokeWidth={long ? 1.6 : 0.8}
            />
          );
        })}
      </g>
    </svg>
  );
}

/* Circular textPath badge riding its own rotation */
function RingText({ text, id }: { text: string; id: string }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true" focusable="false">
      <defs>
        <path
          id={id}
          d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
          fill="none"
        />
      </defs>
      <text
        fontSize="8"
        letterSpacing="2.6"
        fill="currentColor"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
      >
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

/* ============================================
   EVENT ORBIT CARD
   A disc in continuous circular motion; hovering
   swaps the hub for an animated description.
   ============================================ */

function OrbitCard({
  item,
  index,
}: {
  item: ContentEntry<EventItem>;
  index: number;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const num = String(index + 1).padStart(2, "0");
  const ringLabel = `ASHOKA BUSINESS CLUB • EVENTS • ${item.data.category ?? "ARCHIVE"} • `.toUpperCase();

  return (
    <Link
      to={`/events/${item.slug}`}
      className="group block outline-none"
      aria-label={`${item.data.title} — view event`}
    >
      {/* Disc stage */}
      <div className="relative mx-auto aspect-square w-full max-w-[340px] rounded-full">
        {/* counter-rotating tick dial */}
        <div className="orbit-spin-reverse absolute -inset-[4.5%] text-border transition-colors duration-500 group-hover:text-primary/50 group-focus-within:text-primary/50">
          <DialRing />
        </div>

        {/* scale wrapper — hover zoom without touching the spin animations */}
        <div className="absolute inset-0 rounded-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] group-focus-within:scale-[1.04]">
          {/* spinning art disc */}
          <div className="absolute inset-[5%] overflow-hidden rounded-full border border-border bg-card shadow-[var(--shadow-elevated)]">
            <div className="orbit-spin h-full w-full" style={{ "--orbit-dur": "58s" } as CSSProperties}>
              <EventArt slug={item.slug} />
            </div>

            {/* hover scrim + description */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-end rounded-full bg-gradient-to-t from-ink via-ink/80 to-transparent px-9 pb-12 text-center opacity-0 transition-opacity duration-500 ease-[var(--ease-out)] group-hover:opacity-100 group-focus-within:opacity-100">
              <p className="max-w-[26ch] translate-y-4 text-[0.82rem] leading-relaxed text-background/85 opacity-0 transition-all delay-[70ms] duration-500 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {item.data.description}
              </p>
              <span className="mt-4 inline-flex translate-y-4 items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-brass opacity-0 transition-all delay-[150ms] duration-500 ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                View event
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>

            {/* radial vignette melting the disc edge, cominvi-style */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[5] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, transparent 58%, hsl(24 12% 12% / 0.22) 84%, hsl(24 12% 12% / 0.4) 100%)",
              }}
            />
          </div>

          {/* rotating ring text */}
          <div
            className="orbit-spin absolute inset-0 text-foreground/35 transition-colors duration-500 group-hover:text-primary/70"
            style={{ "--orbit-dur": "90s" } as CSSProperties}
          >
            <RingText text={ringLabel.repeat(2)} id={`${id}-ring`} />
          </div>

          {/* static hub — yields to the description on hover */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border border-primary/40 bg-background shadow-[var(--shadow-ambient)] transition-all duration-500 ease-[var(--ease-out)] group-hover:scale-75 group-hover:opacity-0 group-focus-within:scale-75 group-focus-within:opacity-0 md:h-24 md:w-24">
              <span className="font-display text-xl font-bold leading-none md:text-2xl">{num}</span>
              <span className="mt-1.5 text-[0.5rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Event
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Meta below the disc */}
      <div className="mt-7 text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {item.data.category && <span className="text-primary">{item.data.category}</span>}
          {item.data.category && <span className="mx-2 text-border">/</span>}
          {formatDate(item.data.date)}
        </p>
        <h3 className="mt-2.5 font-display text-xl font-semibold transition-fast group-hover:text-primary">
          {item.data.title}
        </h3>
        {item.data.location && (
          <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-[0.78rem] text-foreground/40">
            {item.data.location}
            <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100" />
          </p>
        )}
      </div>
    </Link>
  );
}

/* ============================================
   EVENT ORBIT — homepage section S.03
   ============================================ */

export function EventOrbit({ events }: { events: ContentEntry<EventItem>[] }) {
  return (
    <section id="events" className="relative scroll-mt-28 bg-background">
      <div className="container-abc py-14 md:py-20">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-16">
            <div>
              <MaskRise>
                <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                  What we put on campus
                </h2>
              </MaskRise>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
            >
              View calendar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e, i) => (
            <div key={e.slug} className={i === 1 ? "lg:translate-y-12" : ""}>
              <Reveal delay={i * 0.08}>
                <OrbitCard item={e} index={i} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
