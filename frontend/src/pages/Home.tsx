import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCmsContent } from "@/lib/cms";
import { AbrCard } from "@/components/cards";
import { EventOrbit } from "@/components/event-orbit";
import { ChapterBar } from "@/components/scrollytelling";
import { Button } from "@/components/ui/button";
import {
  EASE_SNAP,
  MaskRise,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/reveal";
import { DepartmentArt } from "@/components/department-art";

const CHAPTERS = [
  { id: "departments", label: "Departments" },
  { id: "events", label: "Calendar" },
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
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE_SNAP, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Hero stat cell — counts up once visible.
   Border logic per grid position: 2 cols on mobile, 4 on desktop. */
const STAT_BORDERS = [
  "",
  "border-l border-border pl-5",
  "md:border-l md:border-border md:pl-8",
  "border-l border-border pl-5 md:border-l md:border-border md:pl-8",
];

function StatCell({
  value,
  label,
  variant = 0,
}: {
  value: number;
  label: string;
  variant?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setN(value);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1300);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduce]);

  return (
    <div
      ref={ref}
      className={`py-6 md:py-8 ${STAT_BORDERS[variant] ?? ""}`}
    >
      <p className="index-num font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
        {n}
      </p>
      <p className="mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-foreground/40">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const { departments, events, abrItems, sponsors } = useCmsContent();
  const stats = [
    { k: departments.length, v: "Departments" },
    { k: events.length, v: "Events hosted" },
    { k: abrItems.length, v: "Articles published" },
    { k: sponsors.length, v: "Partners" },
  ].filter((s) => s.k > 0);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -64]);

  return (
    <>
      {/* ═══ HERO — full-bleed dark stage (cominvi/cipher) ═══ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background"
      >
        {/* Background layers */}
        <div aria-hidden="true" className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(40 20% 90% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(40 20% 90% / 0.4) 1px, transparent 1px)",
              backgroundSize: "88px 88px",
            }}
          />
          <div className="pointer-events-none absolute -top-32 right-[10%] h-[560px] w-[560px] rounded-full bg-primary/[0.09] blur-[140px]" />
          <div className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-crimson/[0.05] blur-[120px]" />
          {/* bottom vignette melts the stage into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Parallax watermark */}
        <motion.div
          aria-hidden="true"
          style={
            reduceMotion
              ? undefined
              : { y: watermarkY, opacity: watermarkOpacity }
          }
          className="index-num pointer-events-none absolute -right-6 top-16 select-none font-display text-[34vw] font-bold leading-none tracking-tighter text-foreground/[0.04] lg:text-[22rem]"
        >
          ABC
        </motion.div>

        {/* Main content — anchored lower-left like cominvi's hero */}
        <motion.div
          className="container-abc relative flex flex-1 flex-col justify-end pb-14 pt-36 md:pb-20"
          style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <h1 className="display-hero mt-6 max-w-[13ch] text-foreground">
            <HeroLine delay={0.25}>Where business is</HeroLine>
            <HeroLine delay={0.37}>studied, debated</HeroLine>
            <HeroLine delay={0.49}>
              <span className="text-primary">&amp; built.</span>
            </HeroLine>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SNAP, delay: 0.65 }}
              className="max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg"
            >
              The Ashoka Business Club brings research, industry dialogue and hands-on experience together — one club, six verticals, a full calendar of work that ships.
            </motion.p>
            <HeroLine delay={0.85}>
              <span className="flex flex-wrap gap-3">
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                  <Link to="/what-awaits-you">Join the club</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/about">Inside the club</Link>
                </Button>
              </span>
            </HeroLine>
          </div>
        </motion.div>

        {/* Bottom stat strip — hairline instrument panel */}
        {stats.length > 0 && (
          <div className="relative border-t border-border bg-background/60 backdrop-blur-sm">
            <div className="container-abc">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {stats.slice(0, 4).map((s, i) => (
                  <StatCell key={s.v} value={s.k} label={s.v} variant={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Scrollytelling chapter bar */}
      <ChapterBar chapters={CHAPTERS} />

      {/* ═══ DEPARTMENTS — editorial index rows (kononenko work-list) ═══ */}
      <section id="departments" className="scroll-mt-28 bg-background">
        <div className="container-abc pt-16 md:pt-24">
          <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
            <Reveal>
              <div>
                <MaskRise>
                  <h2 className="display-lg">
                    Six teams,
                    <br />
                    one club.
                  </h2>
                </MaskRise>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-[0.95rem] leading-relaxed text-foreground/60 md:pb-1">
                Six student-led verticals run everything we do — research, writing, partnerships, industry outreach and operations.
              </p>
            </Reveal>
          </div>
        </div>

        <StaggerGroup>
          {departments.map((d, i) => (
            <StaggerItem key={d.slug} y={26}>
              <Link
                to={`/departments/${d.slug}`}
                className="index-row group outline-none"
                aria-label={`${d.data.name} — explore department`}
              >
                {/* hover art fill — the dark poster carries its own palette */}
                <div className="index-row-art">
                  <DepartmentArt slug={d.slug} className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#141009]/92 via-[#141009]/55 to-transparent" />
                </div>

                <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-5 px-5 py-8 transition-colors duration-500 ease-[var(--ease-out)] group-hover:text-[#F2E9D6] sm:gap-8 sm:px-8 md:py-11 lg:px-12">
                  <span className="min-w-0">
                    <span className="block truncate font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-[2.6rem] md:leading-tight">
                      {d.data.name}
                    </span>
                    <span className="mt-1 hidden max-w-xl truncate text-[0.82rem] text-foreground/45 transition-colors duration-500 group-hover:text-[#F2E9D6]/60 sm:block">
                      {d.data.description}
                    </span>
                  </span>

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary sm:h-14 sm:w-14">
                    <ArrowUpRight className="h-4 w-4 transition-colors duration-500 group-hover:text-primary-foreground sm:h-5 sm:w-5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="container-abc py-8 md:py-10">
          <Reveal>
            <Link
              to="/what-awaits-you"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
            >
              Find your department <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* ═══ EVENTS — orbiting discs ═══ */}
      <EventOrbit events={events} />

      {/* Divider */}
      <div className="section-divider" />

      {/* ═══ PUBLICATIONS — sticky rail + cards ═══ */}
      <section id="publications" className="scroll-mt-28 bg-background">
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
              <MaskRise>
                <h2 className="display-lg">The writing desk.</h2>
              </MaskRise>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-foreground/60">
                The Ashoka Business Review is our print-backed research vertical — long-form arguments, interviews and data stories written entirely by students.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="mt-8">
                <Link to="/abr">Read more</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* ═══ JOIN — kononenko-scale statement ═══ */}
      <section id="join" className="relative scroll-mt-28 overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[130px]"
        />
        <div className="container-abc relative py-28 text-center md:py-40">
          <Reveal>
          </Reveal>
          <h2 className="mx-auto mt-8 max-w-4xl">
            <MaskRise>
              <span className="display-xl block">The most ambitious</span>
            </MaskRise>
            <MaskRise delay={0.08}>
              <span className="display-xl block">
                students on campus <span className="text-primary">build here.</span>
              </span>
            </MaskRise>
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-foreground/60">
              Applications open each semester. Explore what membership looks
              like — the work, the exposure and the people.
            </p>
            <Button
              asChild
              iconRight={<ArrowRight className="h-4 w-4" />}
              size="lg"
              className="mt-10"
            >
              <Link to="/what-awaits-you">What awaits you</Link>
            </Button>
          </Reveal>
        </div>
      </section>

    </>
  );
}
