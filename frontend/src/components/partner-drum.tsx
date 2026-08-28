import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { ContentEntry, Sponsor } from "@/lib/content";

const SECTION_HEIGHT = "380vh";

function DrumItem({
  sponsor,
  angle,
  radius,
  index,
  total,
  progress,
}: {
  sponsor: ContentEntry<Sponsor>;
  angle: number;
  radius: number;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const rad = (angle * Math.PI) / 180;

  /* Depth + focus falloff computed straight from scroll progress — no re-renders */
  const opacity = useTransform(progress, (v) => {
    const front = v * total;
    let dist = Math.abs(index - front);
    dist = Math.min(dist, total - dist);
    if (dist > total / 4) return 0;
    if (dist < 0.5) return 1;
    if (dist < 1.5) return 0.55;
    return Math.max(0.12, 0.45 - dist * 0.05);
  });
  const scale = useTransform(progress, (v) => {
    const front = v * total;
    let dist = Math.abs(index - front);
    dist = Math.min(dist, total - dist);
    return Math.max(0.82, 1 - dist * 0.035);
  });

  return (
    <motion.div
      style={{
        opacity,
        scale,
        transform: `translate(-50%, -50%) translateY(${(Math.sin(rad) * radius).toFixed(
          1
        )}px) translateZ(${(Math.cos(rad) * radius).toFixed(1)}px) rotateX(${-angle}deg)`,
        backfaceVisibility: "hidden",
      }}
      className="absolute left-1/2 top-1/2 whitespace-nowrap font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl lg:text-6xl"
    >
      {sponsor.data.name}
    </motion.div>
  );
}

function Tick({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const scaleX = useTransform(progress, (v) => {
    const p = v * (count - 1);
    const d = Math.abs(index - p);
    if (d < 0.5) return 3;
    if (d < 1.5) return 1.9;
    if (d < 2.5) return 1.25;
    return 0.8;
  });
  const opacity = useTransform(progress, (v) => {
    const p = v * (count - 1);
    const d = Math.abs(index - p);
    if (d < 0.5) return 1;
    if (d < 2.5) return 0.5;
    return 0.22;
  });

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX, opacity }}
      className="block h-px w-full origin-right bg-foreground"
    />
  );
}

/**
 * Pinned 3D cylinder of partner names — CSS sticky does the pinning while
 * scroll progress rotates the drum; a measuring-tape ruler tracks position.
 */
export function PartnerDrum({
  sponsors,
}: {
  sponsors: ContentEntry<Sponsor>[];
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLElement>(null);
  const drumRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(150);
  const [front, setFront] = useState(0);

  const n = sponsors.length;
  const step = n > 0 ? 360 / n : 360;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  /* Positive rotation keeps "front item = progress × n" in sync with the
     highlight + odometer counter (item a_i faces the viewer when θ = a_i). */
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setFront(Math.round(v * (n - 1)));
  });

  useEffect(() => {
    const el = drumRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { height, width } = entry.contentRect;
      setRadius(Math.max(120, Math.min((height / 2) * 0.92, width * 0.34)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (n === 0) return null;

  /* Reduced motion → static name grid instead of the drum */
  if (reduce) {
    return (
      <section className="relative border-y border-border bg-background">
        <div className="container-abc py-14 md:py-20">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Organisations that trust us
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            {sponsors.map((s) => (
              <li key={s.slug} className="border-t border-border pt-3 text-sm font-medium uppercase tracking-wide text-foreground/55">
                {s.data.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapRef} className="relative" style={{ height: SECTION_HEIGHT }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Header */}
        <div className="container-abc flex items-end justify-between pt-28">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Organisations that trust us
              </h2>
            </div>
          </Reveal>
          {/* Odometer counter */}
          <div
            className="hidden items-baseline gap-1 pb-1 font-display tabular-nums sm:flex"
            aria-hidden="true"
          >
            <span className="text-2xl font-bold text-primary md:text-3xl">
              {String(front + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-foreground/30">
              / {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Drum stage */}
        <div
          ref={drumRef}
          className="relative flex-1"
          style={{ perspective: "min(70vw, 1100px)" }}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d", rotateX }}
          >
            {sponsors.map((s, i) => (
              <DrumItem
                key={s.slug}
                sponsor={s}
                angle={i * step}
                radius={radius}
                index={i}
                total={n}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
          <ul className="sr-only">
            {sponsors.map((s) => (
              <li key={s.slug}>{s.data.name}</li>
            ))}
          </ul>

          {/* Depth fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[18%] bg-gradient-to-b from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[18%] bg-gradient-to-t from-background to-transparent"
          />

          {/* Measuring-tape ruler */}
          <div
            aria-hidden="true"
            className="absolute right-6 top-1/2 hidden h-[38vh] -translate-y-1/2 md:block lg:right-12"
          >
            <div className="relative h-full w-8 pr-2">
              <div className="absolute right-0 top-0 h-full w-px bg-border" />
              <div className="absolute inset-y-0 right-0 flex w-full flex-col justify-between py-1">
                {Array.from({ length: 21 }).map((_, i) => (
                  <Tick key={i} index={i} count={21} progress={scrollYProgress} />
                ))}
              </div>
              <div className="absolute -right-3 top-1/2 h-px w-6 bg-primary" />
            </div>
          </div>
        </div>

        {/* Footer link */}
        <div className="container-abc pb-10">
          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
          >
            Meet all partners <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
