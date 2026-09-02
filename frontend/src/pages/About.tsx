import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Cake,
  ExternalLink,
  Flame,
  HeartHandshake,
  PieChart,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { useCmsContent } from "@/lib/cms";
import { DepartmentArt } from "@/components/department-art";

const nibblStats = [
  { value: "3", label: "Campus Stalls", icon: ShoppingBag },
  { value: "₹40K+", label: "Revenue Crossed", icon: TrendingUp },
  { value: "100%", label: "Profit-Generating", icon: PieChart },
  { value: "Sold Out", label: "Every Single Run", icon: Flame },
  { value: "10", label: "Team Members", icon: Users },
  { value: "14", label: "SKUs in 2025 Menu", icon: Utensils },
];

const nibblFunctions = [
  { name: "Finance", desc: "Costing, margins, inventory budgets & sales accounting" },
  { name: "Production", desc: "Batch recipe testing, baking & quality consistency" },
  { name: "Sales", desc: "Stall setup, footfall management & live customer operations" },
  { name: "Packaging", desc: "Eco-friendly materials, branding stickers & unboxing feel" },
  { name: "Marketing & Branding", desc: "Teasers, drop campaigns, visual identity & socials" },
  { name: "Strategy", desc: "Menu roadmap, pop-up cadence & campus expansion" },
];

export default function About() {
  const { departments } = useCmsContent();

  return (
    <>
      <PageHeader
        title="A business club built on a liberal arts campus."
        intro="The Ashoka Business Club is a student-run body at Ashoka University. We exist to make commercial thinking accessible, rigorous and genuinely interesting — across every discipline."
      />

      {/* ═══ VERTICALS — editorial index rows ═══ */}
      <section id="verticals" className="scroll-mt-28 bg-background">
        <div className="container-abc pt-16 md:pt-24">
          <div className="flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between md:pb-14">
            <Reveal>
              <h2 className="display-lg">
                Six teams,
                <br />
                one club.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-[0.95rem] leading-relaxed text-foreground/60 md:pb-1">
                Six student-led verticals run everything we do — research, writing, partnerships, industry outreach and operations.
              </p>
            </Reveal>
          </div>
        </div>

        <StaggerGroup>
          {departments.map((d) => (
            <StaggerItem key={d.slug} y={26}>
              <Link
                to={`/departments/${d.slug}`}
                className="index-row group outline-none"
                aria-label={`${d.data.name} — explore department`}
              >
                {/* hover art fill */}
                <div className="index-row-art">
                  <DepartmentArt slug={d.slug} className="h-full w-full" />
                  <div className="absolute inset-0 bg-brand-green/85" />
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

                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-[transform,border-color,background-color] duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary sm:h-14 sm:w-14">
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

      <div className="section-divider" />

      {/* ═══ NIBBL. VENTURE SHOWCASE ═══ */}
      <section id="nibbl" className="scroll-mt-28 border-y border-border bg-card/60 py-16 text-foreground md:py-24">
        <div className="container-abc">
          {/* Brand Header */}
          <Reveal y={24}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-8">
              <div className="flex items-center gap-3.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7f1069] text-[#fccef6] shadow-md border border-[#b7199a]/40">
                  <Cake className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    nibbl.
                  </h2>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a46632] dark:text-[#deab73]">
                    Ashoka's Homemade Dessert Brand
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Story & Philosophy Grid */}
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Story Card */}
            <Reveal y={24} className="lg:col-span-7">
              <div className="h-full rounded-3xl bg-card p-8 text-foreground shadow-[var(--shadow-ambient)] md:p-10 border-2 border-[#a46632]/30">
                <h3 className="font-display text-2xl font-bold leading-snug text-foreground md:text-3xl">
                  Bringing people together over good dessert, one bite at a time.
                </h3>

                <p className="mt-5 text-sm leading-relaxed text-foreground/75 md:text-base">
                  Created with one simple idea: everyone deserves a little indulgence in the middle of the week. Between classes, club meetings, submissions, and late-night study sessions, we wanted to make it easier for Ashokans to treat themselves to something comforting without having to look far.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                  Every dessert is made with our in-house recipe — fresh, in small batches, with the warmth and familiarity of something homemade. From nostalgic classics to playful new favourites, nibbl. is about making campus life just a little sweeter.
                </p>
              </div>
            </Reveal>

            {/* Philosophy Card */}
            <Reveal y={24} delay={0.08} className="lg:col-span-5">
              <div className="h-full rounded-3xl bg-card p-8 text-foreground shadow-[var(--shadow-ambient)] md:p-10 border-2 border-[#7f1069]/30">
                <h3 className="font-display text-2xl font-bold text-[#7f1069] dark:text-[#deab73]">
                  A live venture built from the inside out.
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-foreground/75">
                  Most student clubs focus on events and competitions. We wanted to build something students could experience firsthand. A club-run business gives students the chance to work on a real venture, where every decision has tangible consequences.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-foreground/65">
                  It is a space to experiment, make mistakes, and learn what it truly takes to build and run a business within the support and safety of a student community. Rather than simply talking about business, we practise it.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Visual Stat Matrix */}
          <Reveal y={24} className="mt-12">
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Venture Metrics &amp; Impact
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: "Campus Stalls", value: "3", iconBg: "bg-[#a46632]/15 text-[#a46632] dark:bg-[#a46632]/20 dark:text-[#deab73]" },
                { label: "Revenue Crossed", value: "₹40K+", iconBg: "bg-[#7f1069]/15 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#fccef6]" },
                { label: "Profit-Generating", value: "100%", iconBg: "bg-[#deab73]/20 text-[#a46632] dark:bg-[#deab73]/15 dark:text-[#deab73]" },
                { label: "Sold Out Every Run", value: "100%", iconBg: "bg-[#b7199a]/15 text-[#b7199a] dark:bg-[#b7199a]/20 dark:text-[#fccef6]" },
                { label: "Team Members", value: "10", iconBg: "bg-[#683512]/15 text-[#683512] dark:bg-[#683512]/40 dark:text-[#deab73]" },
                { label: "SKUs in 2025 Menu", value: "14", iconBg: "bg-[#7f1069]/15 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#deab73]" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-card p-5 text-center shadow-sm border border-border transition-[transform,border-color] duration-300 hover:border-primary hover:-translate-y-1"
                >
                  <p className="font-display text-3xl font-black tracking-tight text-foreground">
                    {s.value}
                  </p>
                  <p className="mt-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#a46632] dark:text-[#deab73]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Application Call to Action & Explore Dedicated Page */}
          <Reveal y={24} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-card p-8 text-center text-foreground shadow-md md:p-12 border-2 border-[#a46632]/40 dark:border-[#deab73]/40">
              <h3 className="font-display text-2xl font-black text-foreground md:text-3xl">
                Want to run Ashoka's favourite dessert venture?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                We’re always on the lookout for people to join the team, get their hands dirty, and find out what running a business is all about!
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#683512] dark:bg-[#deab73] text-[#fccef6] dark:text-[#683512] font-display font-black uppercase tracking-wider hover:opacity-90"
                  iconRight={<ArrowRight className="h-4 w-4" />}
                >
                  <Link to="/nibbl">Explore full nibbl. venture</Link>
                </Button>

                <a
                  href="https://forms.gle/ArExSJ6APP6by79AA"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-bold text-foreground transition-[background-color,border-color,color] hover:bg-secondary"
                >
                  Apply to join team
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
