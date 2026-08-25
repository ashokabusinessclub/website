import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Cake, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MaskRise, Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { ScrubText } from "@/components/scrub-text";
import { ChapterBar } from "@/components/scrollytelling";
import { useCmsContent } from "@/lib/cms";
import { DepartmentArt } from "@/components/department-art";

const verticals = [
  {
    slug: "finance",
    title: "Finance",
    tagline: "The engine of the club",
  },
  {
    slug: "externals-collaborations",
    title: "Externals & Collaborations",
    tagline: "Flagships, inter-college events, logistics",
  },
  {
    slug: "industry-collaborations",
    title: "Industry Collaborations",
    tagline: "Internships, trips, live projects",
  },
  {
    slug: "learning-development",
    title: "Learning & Development",
    tagline: "Skill-building, networking, exposure",
  },
  {
    slug: "marketing",
    title: "Marketing",
    tagline: "Creative backbone, socials, branding",
  },
  {
    slug: "ashoka-business-review",
    title: "Ashoka Business Review",
    tagline: "Monocle newsletter, magazine, publishing",
  },
];

const chapters = [
  { id: "verticals", label: "Our Verticals" },
  { id: "nibbl", label: "nibbl." },
  { id: "leadership", label: "Past Leadership" },
];

const nibbleStats = [
  { value: "3", label: "Stalls" },
  { value: "40K+", label: "Revenue" },
  { value: "14", label: "SKUs planned" },
  { value: "10", label: "Team members" },
];

const leadership = [
  {
    batch: "2024–25",
    president: "Manav Agrawal",
    members: ["Anoushka Bajaj", "Himanshi Beri", "Kavya Grover", "Suhani Goel"],
  },
  {
    batch: "2023–24",
    president: "Kabir Kedia",
    members: ["Manav Agrawal", "Anoushka Bajaj", "Himanshi Beri"],
  },
  {
    batch: "2022–23",
    president: "Aarush Choudhary",
    members: ["Kabir Kedia", "Manav Agrawal"],
  },
];

export default function About() {
  const { departments } = useCmsContent();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Which visual row is in the reading zone drives the pinned panel */
  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.getAttribute("data-index")));
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentVertical = verticals[active];
  const currentDept = departments.find((d) => d.slug === currentVertical.slug);

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A business club built on a liberal arts campus."
        intro="The Ashoka Business Club is a student-run body at Ashoka University. We exist to make commercial thinking accessible, rigorous and genuinely interesting — from every discipline."
        scrubIntro
      />

      <ChapterBar chapters={chapters} />

      {/* ── S.01 Verticals scrollytelling ── */}
      <section id="verticals" className="scroll-mt-[120px] bg-background">
        <div className="container-abc pt-14 md:pt-20">
          <Reveal>
            <div className="mb-12 max-w-xl">
              <div className="section-number">S.01 — Our Verticals</div>
              <MaskRise className="mt-4">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Six verticals, one club.
                </h2>
              </MaskRise>
              <ScrubText
                text="Every initiative at ABC is owned by a vertical — each with its own mandate, leadership and calendar."
                className="mt-4 text-[0.9rem] leading-relaxed text-foreground/45"
              />
            </div>
          </Reveal>
        </div>

        <div className="container-abc grid gap-10 pb-16 md:pb-24 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Pinned narrative panel (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[150px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentVertical.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    aria-hidden="true"
                    className="block font-display text-[7rem] font-bold leading-none tracking-tighter text-primary/15"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-3xl font-semibold xl:text-4xl">
                    {currentVertical.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-primary/80">
                    {currentVertical.tagline}
                  </p>
                  {currentDept && (
                    <p className="mt-5 max-w-md leading-relaxed text-foreground/45">
                      {currentDept.data.description}
                    </p>
                  )}
                  <Link
                    to={`/departments/${currentVertical.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-fast hover:gap-3"
                  >
                    Explore this vertical <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Chapter ticks */}
              <div className="mt-10 flex items-center gap-2" aria-hidden="true">
                {verticals.map((v, i) => (
                  <button
                    key={v.slug}
                    type="button"
                    tabIndex={-1}
                    onClick={() =>
                      rowRefs.current[i]?.scrollIntoView({
                        behavior: reduceMotion ? "auto" : "smooth",
                        block: "center",
                      })
                    }
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-primary" : "w-4 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling visual rows */}
          <div className="space-y-6 md:space-y-8">
            {verticals.map((v, i) => {
              const dept = departments.find((d) => d.slug === v.slug);
              return (
                <div
                  key={v.slug}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="group relative overflow-hidden rounded-lg border border-border"
                >
                  <div className="relative aspect-[4/3] min-h-[280px] w-full lg:h-[58vh] lg:min-h-[420px]">
                    <DepartmentArt
                      slug={v.slug}
                      className={`absolute inset-0 transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out)] ${
                        i === active ? "lg:scale-[1.02]" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

                    <span className="absolute left-4 top-4 inline-flex items-center rounded border border-background/20 bg-background/70 px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-foreground/80 backdrop-blur-sm">
                      No. {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Overlay caption — primary on mobile, secondary on desktop */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-5 transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100`}
                    >
                      <h3 className="font-display text-2xl font-semibold text-background lg:text-xl">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-[0.75rem] uppercase tracking-[0.18em] text-background/60">
                        {v.tagline}
                      </p>
                      {dept && (
                        <p className="mt-2 line-clamp-2 text-[0.8rem] leading-relaxed text-background/55 lg:hidden">
                          {dept.data.description}
                        </p>
                      )}
                      <Link
                        to={`/departments/${v.slug}`}
                        className="mt-3 inline-flex items-center gap-2 text-[0.8rem] font-medium text-primary lg:hidden"
                      >
                        Explore <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S.02 nibbl. ── */}
      <section id="nibbl" className="scroll-mt-[120px] bg-background">
        <div className="container-abc py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal y={28}>
              <div>
                <div className="section-number">S.02 — nibbl.</div>
                <MaskRise className="mt-4">
                  <h2 className="font-display text-3xl font-bold md:text-4xl">
                    Ashoka's homemade dessert brand.
                  </h2>
                </MaskRise>
                <ScrubText
                  text="Between classes, club meetings, submissions, and late-night study sessions, we wanted to make it easier for Ashokans to treat themselves to something comforting without having to look far. Every dessert is made with our in-house recipe — fresh, in small batches, with the warmth and familiarity of something homemade."
                  className="mt-6 leading-relaxed text-foreground/45"
                />
                <ScrubText
                  text="A club-run business gives students the chance to work on a real venture, where every decision has tangible consequences and every function — from product development and branding to finance, operations, and marketing — comes together to create something people actually use."
                  className="mt-4 leading-relaxed text-foreground/45"
                />
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Finance", "Production", "Sales", "Packaging", "Marketing & Branding", "Strategy"].map(
                    (fn) => (
                      <span
                        key={fn}
                        className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-[0.7rem] font-medium text-foreground/50"
                      >
                        {fn}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal y={28} delay={0.1}>
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-5">
                  {nibbleStats.map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-card p-5 text-center">
                      <span className="font-display text-3xl font-bold text-primary">{s.value}</span>
                      <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-foreground/40">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-border bg-card p-5">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground/60">
                    <Cake className="h-4 w-4 text-primary" />
                    Sold out every time
                  </div>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-foreground/40">
                    Profit-generating from day one. 14 SKUs planned for the upcoming year.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── S.03 Past Leadership — sticky stack ── */}
      <section id="leadership" className="scroll-mt-[120px] bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal>
            <div className="mb-12 max-w-xl">
              <div className="section-number">S.03 — Past Leadership</div>
              <MaskRise className="mt-4">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  The people who built this.
                </h2>
              </MaskRise>
              <ScrubText
                text="ABC has been shaped by student leaders who took ownership, built teams and set the standard for what a campus business club can be."
                className="mt-4 text-[0.9rem] leading-relaxed text-foreground/45"
              />
            </div>
          </Reveal>

          <StaggerGroup className="relative">
            {leadership.map((l, i) => (
              <div
                key={l.batch}
                className="sticky mb-6 last:mb-0"
                style={{ top: `${96 + i * 26}px`, zIndex: i + 1 }}
              >
                <StaggerItem>
                  <div className="card-lift rounded-lg bg-card p-6 shadow-[var(--shadow-elevated)] md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                          Batch {l.batch}
                        </span>
                        <h3 className="mt-2 font-display text-xl font-semibold">
                          {l.president}
                        </h3>
                        <p className="mt-1 text-[0.75rem] text-foreground/40">President</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-foreground/30" />
                        <span className="text-[0.8rem] text-foreground/40">
                          {l.members.length} core member{l.members.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    {l.members.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {l.members.map((m) => (
                          <span
                            key={m}
                            className="rounded-md border border-border bg-secondary/30 px-3 py-1 text-[0.75rem] text-foreground/50"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
