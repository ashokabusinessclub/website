import { Cake, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { MaskRise, Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { ChapterBar } from "@/components/scrollytelling";

const chapters = [
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
  return (
    <>
      <PageHeader
        title="A business club built on a liberal arts campus."
        intro="The Ashoka Business Club is a student-run body at Ashoka University. We exist to make commercial thinking accessible, rigorous and genuinely interesting — from every discipline."
      />

      <ChapterBar chapters={chapters} />

      {/* ── S.01 nibbl. ── */}
      <section id="nibbl" className="scroll-mt-[120px] bg-background">
        <div className="container-abc py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal y={28}>
              <div>
                <MaskRise>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">
                    Ashoka's homemade dessert brand.
                  </h2>
                </MaskRise>
                <p className="mt-6 leading-relaxed text-foreground/60">
                  Between classes, club meetings, submissions, and late-night study sessions, we wanted to make it easier for Ashokans to treat themselves to something comforting without having to look far. Every dessert is made with our in-house recipe — fresh, in small batches, with the warmth and familiarity of something homemade.
                </p>
                <p className="mt-4 leading-relaxed text-foreground/60">
                  A club-run business gives students the chance to work on a real venture, where every decision has tangible consequences and every function — from product development and branding to finance, operations, and marketing — comes together to create something people actually use.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Finance", "Production", "Sales", "Packaging", "Marketing & Branding", "Strategy"].map(
                    (fn) => (
                      <span
                        key={fn}
                        className="rounded-md border border-border bg-secondary/50 px-3 py-1 text-[0.7rem] font-medium text-foreground/60"
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

      {/* ── S.02 Past Leadership — sticky stack ── */}
      <section id="leadership" className="scroll-mt-[120px] bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal>
            <div className="mb-12 max-w-xl">
              <MaskRise>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  The people who built this.
                </h2>
              </MaskRise>
              <p className="mt-4 text-[0.9rem] leading-relaxed text-foreground/60">
                ABC has been shaped by student leaders who took ownership, built teams and set the standard for what a campus business club can be.
              </p>
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
                            className="rounded-md border border-border bg-secondary/30 px-3 py-1 text-[0.75rem] text-foreground/60"
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
