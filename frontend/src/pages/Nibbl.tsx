import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cake,
  ExternalLink,
  Flame,
  HeartHandshake,
  Layers,
  PieChart,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
  Cookie,
  Coffee,
} from "lucide-react";
import { useCmsContent } from "@/lib/cms";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const NIBBL_METRICS = [
  {
    value: "3",
    label: "Campus Stalls",
    description: "High-traffic student pop-ups staged on campus",
    icon: ShoppingBag,
    iconBg: "bg-[#a46632]/15 text-[#a46632] dark:bg-[#a46632]/20 dark:text-[#deab73]",
  },
  {
    value: "₹40K+",
    label: "Revenue Crossed",
    description: "Organic student demand with zero external ad spend",
    icon: TrendingUp,
    iconBg: "bg-[#7f1069]/15 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#fccef6]",
  },
  {
    value: "100%",
    label: "Profit-Generating",
    description: "Unit economics positive from the very first drop",
    icon: PieChart,
    iconBg: "bg-[#deab73]/20 text-[#a46632] dark:bg-[#deab73]/15 dark:text-[#deab73]",
  },
  {
    value: "Sold Out",
    label: "Every Single Run",
    description: "100% sell-through rate across every batch baked",
    icon: Flame,
    iconBg: "bg-[#b7199a]/15 text-[#b7199a] dark:bg-[#b7199a]/20 dark:text-[#fccef6]",
  },
  {
    value: "10",
    label: "Student Builders",
    description: "Cross-functional team handling production to sales",
    icon: Users,
    iconBg: "bg-[#683512]/15 text-[#683512] dark:bg-[#683512]/40 dark:text-[#deab73]",
  },
  {
    value: "14",
    label: "SKUs in 2025 Menu",
    description: "Expanded menu spanning chilled & baked confectionery",
    icon: Utensils,
    iconBg: "bg-[#7f1069]/15 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#deab73]",
  },
];

const NIBBL_MENU_CATEGORIES = [
  {
    title: "Nostalgic Classics",
    tag: "Campus Favourites",
    borderColor: "border-[#a46632]/30 hover:border-[#a46632]",
    tagStyle: "border border-[#a46632]/40 bg-[#a46632]/10 text-[#683512] dark:bg-[#a46632]/20 dark:text-[#deab73]",
    items: [
      { name: "Fudge & Cocoa Brownies", note: "Triple-dark chocolate with a crackly crust" },
      { name: "Chunky Sea-Salt Cookies", note: "Warm buttery dough with Belgian chocolate pools" },
      { name: "Classic Tea Cakes", note: "Light vanilla and spiced cinnamon slices" },
    ],
  },
  {
    title: "Signature Pop-Up Specials",
    tag: "Small-Batch Drops",
    borderColor: "border-[#7f1069]/40 hover:border-[#7f1069]",
    tagStyle: "border border-[#7f1069]/40 bg-[#7f1069]/10 text-[#7f1069] dark:bg-[#7f1069]/30 dark:text-[#fccef6]",
    items: [
      { name: "Glaze Berry Tartlets", note: "Crisp butter pastry with seasonal raspberry compote" },
      { name: "Salted Caramel Cups", note: "Slow-cooked golden caramel with biscuit crunch" },
      { name: "Dark Ganache Pots", note: "Silky 70% chocolate ganache in dessert pots" },
    ],
  },
  {
    title: "2025 Upcoming Menu",
    tag: "14 New SKUs",
    borderColor: "border-[#b7199a]/40 hover:border-[#b7199a]",
    tagStyle: "border border-[#b7199a]/40 bg-[#b7199a]/10 text-[#b7199a] dark:bg-[#b7199a]/20 dark:text-[#fccef6]",
    items: [
      { name: "Chilled Cheesecake Jars", note: "Layered graham crust & Philadelphia cream" },
      { name: "Mini Choux Buns", note: "Piped with fresh vanilla bean diplomat cream" },
      { name: "Artisanal Loaf Slices", note: "Matcha, Earl Grey, and spiced chocolate bakes" },
    ],
  },
];

const NIBBL_DEPARTMENTS = [
  {
    name: "Finance",
    leadCount: "1–2 leads",
    responsibilities: "Ingredient costing, gross margin modeling, cash flows & revenue reconciliation.",
    accentBorder: "border-[#a46632]/30 hover:border-[#a46632]",
    pillStyle: "bg-[#a46632]/10 text-[#683512] dark:bg-[#a46632]/20 dark:text-[#deab73]",
  },
  {
    name: "Production",
    leadCount: "2 leads",
    responsibilities: "Batch recipe testing, hygiene protocols, baking schedules & portion consistency.",
    accentBorder: "border-[#7f1069]/30 hover:border-[#7f1069]",
    pillStyle: "bg-[#7f1069]/10 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#fccef6]",
  },
  {
    name: "Sales & Operations",
    leadCount: "2 leads",
    responsibilities: "Stall construction, inventory queues, live transactions & campus crowd logistics.",
    accentBorder: "border-[#deab73]/40 hover:border-[#deab73]",
    pillStyle: "bg-[#deab73]/15 text-[#683512] dark:bg-[#deab73]/15 dark:text-[#deab73]",
  },
  {
    name: "Packaging",
    leadCount: "1 lead",
    responsibilities: "Sustainable container sourcing, thermal packaging, branded seal stickers & box aesthetics.",
    accentBorder: "border-[#b7199a]/30 hover:border-[#b7199a]",
    pillStyle: "bg-[#b7199a]/10 text-[#b7199a] dark:bg-[#b7199a]/20 dark:text-[#fccef6]",
  },
  {
    name: "Marketing & Branding",
    leadCount: "2 leads",
    responsibilities: "Drop teaser videos, Instagram visual campaigns, menu posters & word-of-mouth buzz.",
    accentBorder: "border-[#b7199a]/30 hover:border-[#b7199a]",
    pillStyle: "bg-[#7f1069]/10 text-[#7f1069] dark:bg-[#7f1069]/20 dark:text-[#deab73]",
  },
  {
    name: "Strategy",
    leadCount: "1 lead",
    responsibilities: "Menu expansion roadmaps, pop-up cadence, supplier partnerships & long-term campus scaling.",
    accentBorder: "border-[#deab73]/40 hover:border-[#deab73]",
    pillStyle: "bg-[#a46632]/10 text-[#a46632] dark:bg-[#a46632]/20 dark:text-[#fccef6]",
  },
];

export default function Nibbl() {
  const { nibblMenuItems } = useCmsContent();

  const categories = useMemo(() => {
    if (nibblMenuItems.length === 0) return NIBBL_MENU_CATEGORIES;

    const grouped: Record<
      string,
      {
        title: string;
        tag: string;
        borderColor: string;
        tagStyle: string;
        items: { name: string; note?: string }[];
      }
    > = {};

    const categoryStyles = [
      {
        borderColor: "border-[#a46632]/30 hover:border-[#a46632]",
        tagStyle: "border border-[#a46632]/40 bg-[#a46632]/10 text-[#683512] dark:bg-[#a46632]/20 dark:text-[#deab73]",
      },
      {
        borderColor: "border-[#7f1069]/40 hover:border-[#7f1069]",
        tagStyle: "border border-[#7f1069]/40 bg-[#7f1069]/10 text-[#7f1069] dark:bg-[#7f1069]/30 dark:text-[#fccef6]",
      },
      {
        borderColor: "border-[#b7199a]/40 hover:border-[#b7199a]",
        tagStyle: "border border-[#b7199a]/40 bg-[#b7199a]/10 text-[#b7199a] dark:bg-[#b7199a]/20 dark:text-[#fccef6]",
      },
    ];

    let styleIdx = 0;
    for (const item of nibblMenuItems) {
      if (item.data.available === false) continue;
      const cat = item.data.category || "Signature Bakes";
      if (!grouped[cat]) {
        const style = categoryStyles[styleIdx % categoryStyles.length];
        styleIdx++;
        grouped[cat] = {
          title: cat,
          tag: item.data.tag || "Fresh Drop",
          borderColor: style.borderColor,
          tagStyle: style.tagStyle,
          items: [],
        };
      }
      grouped[cat].items.push({
        name: item.data.name,
        note: item.data.note,
      });
    }

    return Object.values(grouped);
  }, [nibblMenuItems]);

  return (
    <div className="bg-background text-foreground transition-colors duration-200">
      {/* ═══ BRAND MASTHEAD HERO (Solid Cocoa / Parchment Header with Pastry & Berry Accents) ═══ */}
      <section className="border-b border-border bg-card/60 py-20 md:py-28">
        <div className="container-abc">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Brand Hero Typography */}
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7f1069] text-[#fccef6] shadow-md border border-[#b7199a]/40">
                    <Cake className="h-5 w-5" />
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-[#a46632] dark:text-[#deab73]">
                    Ashoka Business Club Venture
                  </span>
                </div>

                <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                  Ashoka's homemade dessert brand.
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
                  Founded by Swastika Arora (UG2024) and Arushi Mantri (UG2024) — a live, student-run confectionery bringing fresh small-batch baking and real venture operations to campus.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://forms.gle/ArExSJ6APP6by79AA"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full bg-[#683512] dark:bg-[#deab73] px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-[#fccef6] dark:text-[#683512] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    Apply for the team
                    <ExternalLink className="h-4 w-4" />
                  </a>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                  >
                    <a href="#menu">View menu &amp; stats</a>
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Confectionery Seal Emblem */}
            <div className="hidden lg:col-span-4 lg:block">
              <Reveal delay={0.1}>
                <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-3xl bg-card p-8 text-center shadow-md border-2 border-[#a46632]/40 dark:border-[#deab73]/40">
                  <div className="absolute top-4 left-4 text-[#a46632] dark:text-[#deab73]/70">
                    <Cookie className="h-4 w-4" />
                  </div>
                  <div className="absolute top-4 right-4 text-[#b7199a]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-4 left-4 text-[#a46632] dark:text-[#deab73]/70">
                    <Coffee className="h-4 w-4" />
                  </div>
                  <div className="absolute bottom-4 right-4 text-[#b7199a]">
                    <Cake className="h-4 w-4" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-display text-3xl font-black tracking-tight text-foreground">
                      nibbl.
                    </span>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#a46632] dark:text-[#deab73]">
                      Fresh • Small Batch
                    </p>
                    <div className="mx-auto my-2 h-0.5 w-10 bg-[#a46632]/50 dark:bg-[#deab73]/60" />
                    <p className="text-xs font-medium text-foreground/60">
                      Ashoka University
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STORY & PHILOSOPHY ═══ */}
      <section className="container-abc py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Story Card */}
          <Reveal y={24} className="lg:col-span-7">
            <div className="h-full rounded-3xl bg-card p-8 text-foreground shadow-[var(--shadow-ambient)] md:p-12 border-2 border-[#a46632]/30">
              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                Everyone deserves a little indulgence in the middle of the week.
              </h2>

              <p className="mt-6 text-base leading-relaxed text-foreground/75">
                Between classes, club meetings, submissions, and late-night study sessions, we wanted to make it easier for Ashokans to treat themselves to something comforting without having to look far.
              </p>

              <p className="mt-4 text-base leading-relaxed text-foreground/65">
                Every dessert is made with our in-house recipe — fresh, in small batches, with the warmth and familiarity of something homemade. From nostalgic classics to playful new favourites, nibbl. is about bringing people together over good dessert and making campus life just a little sweeter, one bite at a time.
              </p>
            </div>
          </Reveal>

          {/* Philosophy Card */}
          <Reveal y={24} delay={0.08} className="lg:col-span-5">
            <div className="h-full rounded-3xl bg-card p-8 text-foreground shadow-[var(--shadow-ambient)] md:p-12 border-2 border-[#7f1069]/30">
              <h2 className="font-display text-2xl font-bold leading-snug text-[#7f1069] dark:text-[#deab73] md:text-3xl">
                Building something students experience from the inside out.
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-foreground/75 md:text-base">
                Most student clubs focus on events and competitions. We wanted to build a live venture where students run real operations.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-foreground/65 md:text-base">
                A club-run business gives students the chance to work where every decision has tangible consequences — from recipe formulation and pricing to supply chains and customer feedback. Rather than simply talking about business, we practise it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ VENTURE IMPACT METRICS (Structured Theme-Aware Cards) ═══ */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <div className="container-abc">
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Proven traction on campus.
                </h2>
                <p className="mt-2 text-sm text-[#a46632] dark:text-[#deab73]">
                  Self-sustaining, profitable, and 100% student-run from day one.
                </p>
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {NIBBL_METRICS.map((metric) => (
              <StaggerItem key={metric.label}>
                <div className="group h-full rounded-3xl bg-card p-8 shadow-md border border-border transition-all duration-300 hover:border-primary hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.iconBg}`}>
                      <metric.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                      Live Metric
                    </span>
                  </div>
                  <p className="mt-6 font-display text-4xl font-black tracking-tight text-foreground">
                    {metric.value}
                  </p>
                  <h3 className="mt-1 font-display text-base font-bold uppercase tracking-wide text-[#a46632] dark:text-[#deab73]">
                    {metric.label}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/65">
                    {metric.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ═══ MENU & SKU CATEGORIES (Distinct Theme-Aware Cards) ═══ */}
      <section id="menu" className="container-abc py-16 md:py-24">
        <Reveal>
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Fresh bakes &amp; small-batch treats.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#a46632] dark:text-[#deab73]">
              Curated recipes baked fresh before every stall — classic comforts alongside inventive seasonal specials.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Reveal key={category.title} y={20}>
              <div
                className={`h-full rounded-3xl bg-card p-8 shadow-md border-2 ${category.borderColor}`}
              >
                <span className={`rounded-full px-3.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${category.tagStyle}`}>
                  {category.tag}
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-foreground">
                  {category.title}
                </h3>

                <ul className="mt-6 space-y-4 divide-y divide-border/60">
                  {category.items.map((item) => (
                    <li key={item.name} className="pt-4 first:pt-0">
                      <p className="text-base font-bold text-foreground">{item.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#a46632] dark:text-[#deab73]">{item.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ HOW THE VENTURE OPERATES (Functional Teams) ═══ */}
      <section className="border-t border-border bg-secondary/20 py-16 md:py-24">
        <div className="container-abc">
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                  Functional Teams
                </h2>
                <p className="mt-2 text-sm text-[#a46632] dark:text-[#deab73]">
                  1–2 students lead each front, operating like an autonomous startup unit.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Layers className="h-4 w-4 text-[#a46632] dark:text-[#deab73]" /> 6 Operational Fronts
              </span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NIBBL_DEPARTMENTS.map((dept) => (
              <Reveal key={dept.name} y={16}>
                <div className={`h-full rounded-3xl bg-card p-7 shadow-sm border-2 ${dept.accentBorder}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {dept.name}
                    </h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${dept.pillStyle}`}>
                      {dept.leadCount}
                    </span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-foreground/70">
                    {dept.responsibilities}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECRUITMENT & APPLICATION CTA ═══ */}
      <section className="container-abc py-20 md:py-28">
        <Reveal y={24}>
          <div className="relative overflow-hidden rounded-3xl bg-card p-10 text-center shadow-md md:p-16 border-2 border-[#a46632]/40 dark:border-[#deab73]/40">
            <h2 className="font-display text-3xl font-black text-foreground md:text-5xl">
              Want to get your hands dirty building nibbl.?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
              We’re always on the lookout for ambitious students to join the team, learn real business operations, and help bake, brand, and scale the venture.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://forms.gle/ArExSJ6APP6by79AA"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#683512] dark:bg-[#deab73] px-9 py-4 font-display text-sm font-black uppercase tracking-wider text-[#fccef6] dark:text-[#683512] shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Apply for the team
                <ExternalLink className="h-4 w-4" />
              </a>

              <Button
                asChild
                variant="outline"
                size="lg"
              >
                <Link to="/about">Back to About ABC</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
