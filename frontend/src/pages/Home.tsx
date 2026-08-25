import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useCmsContent } from "@/lib/cms";
import { DepartmentCard, AbrCard } from "@/components/cards";
import { AnimatedCounter } from "@/components/animated-counter";
import { EventOrbit } from "@/components/event-orbit";
import { ScrubText } from "@/components/scrub-text";
import { ChapterBar } from "@/components/scrollytelling";
import { Button } from "@/components/ui/button";
import { EASE_SNAP, MaskRise, Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

const CHAPTERS = [
  { id: "departments", label: "Departments" },
  { id: "events", label: "Events" },
  { id: "publications", label: "Publications" },
  { id: "join", label: "Join us" },
];

function HeroLine({
  children,
  delay,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE_SNAP, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const { departments, events, abrItems, sponsors } = useCmsContent();
  const stats = [
    { k: departments.length, v: "Departments" },
    { k: events.length, v: "Events hosted" },
    { k: abrItems.length * 12, v: "Articles published" },
    { k: sponsors.length, v: "Partners" },
  ].filter((s) => s.k > 0);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <>
      {/* Hero — Cinematic dark */}
      <section ref={heroRef} className="relative min-h-[90dvh] overflow-hidden bg-background">
        {/* Background layers — scale up on scroll for depth */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={reduceMotion ? undefined : { scale: bgScale }}
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(40 15% 92% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(40 15% 92% / 0.4) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="pointer-events-none absolute top-1/4 left-1/3 h-[600px] w-[600px] rounded-full bg-primary/[0.06] blur-[160px]" />
          <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />
        </motion.div>

        {/* Large watermark */}
        <motion.div
          aria-hidden="true"
          style={reduceMotion ? undefined : { y: watermarkY }}
          className="pointer-events-none absolute -top-12 right-0 select-none font-display text-[32vw] font-bold leading-none tracking-tighter text-foreground/[0.04] lg:text-[24rem]"
        >
          ABC
        </motion.div>

        <div className="container-abc relative flex min-h-[90dvh] flex-col justify-center py-32">
          <motion.div
            className="grid items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12"
            style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
          >
            {/* Left: Copy */}
            <Reveal y={32}>
              <div className="section-number animate-entry">
                S.01 — Home
              </div>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] md:text-6xl lg:text-7xl xl:text-[5.2rem]">
                <HeroLine delay={0.05}>Where business is</HeroLine>
                <HeroLine delay={0.16} className="text-primary">
                  studied, debated and built.
                </HeroLine>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/45">
                The Ashoka Business Club is a student-run community bringing together
                research, industry dialogue and hands-on experience.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                  <Link to="/what-awaits-you">Join the club</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/about">Inside the club</Link>
                </Button>
              </div>
            </Reveal>

            {/* Right: Stats panel */}
            <Reveal y={32} delay={0.12}>
              <div className="rounded-lg border border-border bg-card p-8 backdrop-blur-sm md:p-10">
                <div className="flex items-center gap-3">
                  <span className="rule-brass w-8" aria-hidden="true" />
                  <p className="eyebrow">At a glance</p>
                </div>
                <dl className="mt-8 grid grid-cols-2 gap-6">
                  {stats.map((s) => (
                    <AnimatedCounter key={s.v} value={s.k} label={s.v} />
                  ))}
                </dl>
              </div>
            </Reveal>
          </motion.div>

          {/* Scroll indicator */}
          {!reduceMotion && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5 text-foreground/20" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Scrollytelling chapter bar */}
      <ChapterBar chapters={CHAPTERS} />

      {/* Departments — sticky narrative rail + scrolling cards */}
      <section id="departments" className="relative scroll-mt-28 border-t border-border bg-background">
        <div className="container-abc grid gap-12 py-16 md:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-32">
            <Reveal>
              <div className="section-number">S.02 — Departments</div>
              <MaskRise>
                <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
                  Six teams,
                  <br />
                  one club.
                </h2>
              </MaskRise>
            </Reveal>
            <ScrubText
              className="mt-7 max-w-md text-lg leading-relaxed text-foreground/50"
              text="Six student-led verticals run everything we do — research, writing, partnerships, industry outreach and operations. Scroll through and find where you fit."
            />
            <Reveal delay={0.15}>
              <Link
                to="/what-awaits-you"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
              >
                All departments <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <StaggerGroup className="grid gap-5">
            {departments.slice(0, 3).map((d) => (
              <StaggerItem key={d.slug}>
                <DepartmentCard item={d} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Events — orbiting discs with hover reveals */}
      <EventOrbit events={events} />

      {/* Divider */}
      <div className="section-divider" />

      {/* ABR — scrolling cards + sticky rail */}
      <section id="publications" className="relative scroll-mt-28 bg-background">
        <div className="container-abc grid gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <StaggerGroup className="order-2 grid gap-5 lg:order-1">
            {abrItems.slice(0, 2).map((a) => (
              <StaggerItem key={a.slug}>
                <AbrCard item={a} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="order-1 self-start lg:order-2 lg:sticky lg:top-32">
            <Reveal>
              <div className="section-number">S.04 — Publications</div>
              <MaskRise>
                <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">
                  The writing desk.
                </h2>
              </MaskRise>
            </Reveal>
            <ScrubText
              className="mt-7 max-w-md text-lg leading-relaxed text-foreground/50"
              text="The Ashoka Business Review is our print-backed research vertical — long-form arguments, interviews and data stories written entirely by students."
            />
            <Reveal delay={0.15}>
              <Link
                to="/abr"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* CTA */}
      <section id="join" className="relative scroll-mt-28 bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal y={32}>
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-10 backdrop-blur-sm md:p-16">
              {/* Ambient glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-primary/[0.08] blur-[100px]"
              />
              <div className="relative text-center">
                <MaskRise>
                  <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold md:text-4xl">
                    Thinking of joining ABC this year?
                  </h2>
                </MaskRise>
                <p className="mt-5 mx-auto max-w-xl text-foreground/45">
                  Applications open each semester. Explore what membership looks like —
                  the work, the exposure and the people.
                </p>
                <Button
                  asChild
                  iconRight={<ArrowRight className="h-4 w-4" />}
                  size="lg"
                  className="mt-8"
                >
                  <Link to="/what-awaits-you">What awaits you</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
