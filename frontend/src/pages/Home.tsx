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
import {
  ArrowRight,
  ArrowUpRight,
  Cake,
  ExternalLink,
  Flame,
  PieChart,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import { useCmsContent } from "@/lib/cms";
import { DepartmentArt } from "@/components/department-art";
import {
  INTRO_COMPLETE_EVENT,
  INTRO_SESSION_KEY,
} from "@/components/preloader";
import { Button } from "@/components/ui/button";
import {
  EASE_SNAP,
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/reveal";

function HeroLine({
  children,
  delay,
  ready,
  className = "",
}: {
  children: ReactNode;
  delay: number;
  ready: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: reduce || ready ? 0 : "112%" }}
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

const nibblStats = [
  { value: "3", label: "Campus Stalls", icon: ShoppingBag },
  { value: "₹40K+", label: "Revenue Crossed", icon: TrendingUp },
  { value: "100%", label: "Profit-Generating", icon: PieChart },
  { value: "Sold Out", label: "Every Run", icon: Flame },
];

export default function Home() {
  const { departments, events, abrItems, sponsors } = useCmsContent();
  const stats = [
    { k: departments.length, v: "Departments" },
    { k: events.length, v: "Events hosted" },
    { k: abrItems.length, v: "Articles published" },
    { k: sponsors.length, v: "Partners" },
  ].filter((s) => s.k > 0);
  const reduceMotion = useReducedMotion();
  const [introReady, setIntroReady] = useState(() => {
    try {
      return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const revealHero = () => setIntroReady(true);
    document.addEventListener(INTRO_COMPLETE_EVENT, revealHero);
    if (["revealing", "complete"].includes(document.documentElement.dataset.intro ?? "")) {
      revealHero();
    }
    return () => document.removeEventListener(INTRO_COMPLETE_EVENT, revealHero);
  }, []);
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
            <HeroLine ready={introReady} delay={introReady ? 0.08 : 0}>Where business is</HeroLine>
            <HeroLine ready={introReady} delay={introReady ? 0.2 : 0}>studied, debated</HeroLine>
            <HeroLine ready={introReady} delay={introReady ? 0.32 : 0}>
              <span className="text-primary">&amp; built.</span>
            </HeroLine>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={introReady || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, ease: EASE_SNAP, delay: introReady ? 0.46 : 0 }}
              className="max-w-xl text-base leading-relaxed text-foreground/60 md:text-lg"
            >
              The Ashoka Business Club brings research, industry dialogue and hands-on experience together — one club, six verticals, a full calendar of work that ships.
            </motion.p>
            <HeroLine ready={introReady} delay={introReady ? 0.62 : 0}>
              <span className="flex flex-wrap gap-3">
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                  <Link to="/what-awaits-you">Join the club</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/#about">Inside the club</Link>
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

      {/* ═══ ABOUT — compact merged overview ═══ */}
      <section id="about" className="scroll-mt-28 bg-background">
        <div className="container-abc grid gap-10 py-16 md:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-32">
            <Reveal>
              <h2 className="display-lg">
                Six teams,
                <br />
                one club.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-foreground/60">
                ABC is a student-run business community at Ashoka, connecting research, industry dialogue, partnerships and venture work.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="mt-8">
                <Link to="/what-awaits-you#departments">Explore departments</Link>
              </Button>
            </Reveal>
          </div>

          <StaggerGroup className="grid gap-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug} y={22}>
                <Link
                  to={`/departments/${d.slug}`}
                  className="index-row group min-h-[92px] outline-none"
                  aria-label={`${d.data.name} - explore department`}
                >
                  <div className="index-row-art">
                    <DepartmentArt slug={d.slug} className="h-full w-full" />
                    <div className="absolute inset-0 bg-[#141009]/78" />
                  </div>

                  <div className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-5 px-5 py-5 transition-colors duration-500 ease-[var(--ease-out)] group-hover:text-[#F2E9D6] sm:px-7 md:py-6">
                    <span className="min-w-0">
                      <span className="block truncate font-display text-2xl font-bold tracking-tight md:text-3xl">
                        {d.data.name}
                      </span>
                      <span className="mt-1 hidden max-w-xl truncate text-[0.82rem] text-foreground/45 transition-colors duration-500 group-hover:text-[#F2E9D6]/65 sm:block">
                        {d.data.description}
                      </span>
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary">
                      <ArrowUpRight className="h-4 w-4 transition-colors duration-500 group-hover:text-primary-foreground" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══ NIBBL — compact venture preview ═══ */}
      <section id="nibbl" className="scroll-mt-28 border-y border-border bg-card/60">
        <div className="container-abc grid gap-10 py-16 md:py-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <Reveal>
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-[#7f1069]/30 bg-[#7f1069] text-[#fccef6]">
                <Cake className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                  nibbl.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/65">
                  ABC's student-run dessert venture turns business theory into campus operations: recipe testing, costing, packaging, sales, brand drops and live customer feedback.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                    <Link to="/nibbl">Explore nibbl.</Link>
                  </Button>
                  <a
                    href="https://forms.gle/ArExSJ6APP6by79AA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold text-foreground transition-fast hover:bg-secondary"
                  >
                    Apply to join <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {nibblStats.map((s) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.label}>
                  <div className="border border-border bg-background p-5">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    <p className="mt-5 font-display text-3xl font-black tracking-tight text-foreground">
                      {s.value}
                    </p>
                    <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-foreground/45">
                      {s.label}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

    </>
  );
}
