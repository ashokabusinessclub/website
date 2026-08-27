import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { ScrubText } from "@/components/scrub-text";
import { useCmsContent } from "@/lib/cms";
import { DepartmentCard } from "@/components/cards";
import {
  ArrowRight,
  BookOpen,
  Users,
  Mic,
  Briefcase,
  PenTool,
  TrendingUp,
  FileText,
} from "lucide-react";

const opportunities = [
  {
    icon: BookOpen,
    title: "Publish real work",
    body: "Write, edit or illustrate for the Ashoka Business Review — with a byline, an editor and an actual readership.",
  },
  {
    icon: Mic,
    title: "Meet practitioners",
    body: "Sit in the room with founders, investors, consultants and policy voices we bring to campus each semester.",
  },
  {
    icon: Briefcase,
    title: "Run an event end to end",
    body: "Own budgets, sponsorships, logistics and production for flagships like House of Cards.",
  },
  {
    icon: TrendingUp,
    title: "Build commercial fluency",
    body: "Learn to read a balance sheet, size a market, build a deck and defend a thesis under questioning.",
  },
  {
    icon: PenTool,
    title: "Craft and design",
    body: "Work on brand, layout, illustration and social — the club's visual identity is student-made.",
  },
  {
    icon: Users,
    title: "Find your people",
    body: "A cross-batch, cross-major network that outlasts your time on campus, including an active alumni base.",
  },
];

const outcomes = [
  "Structured problem-solving and case analysis",
  "Research, sourcing and editorial judgement",
  "Public speaking, moderation and pitching",
  "Sponsorship outreach and partner management",
  "Event production under real deadlines",
  "Team leadership within a department",
];

const steps = [
  ["01", "Watch for recruitment", "Applications open at the start of each semester across departments."],
  ["02", "Apply to a department", "Tell us where you want to work and why — no prior business background required."],
  ["03", "Interview & onboard", "A short conversation, then straight into live projects with your team."],
];

export default function WhatAwaitsYou() {
  const { departments } = useCmsContent();

  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Join a club that hands you the work, not a certificate."
        intro="Membership in ABC is an apprenticeship in how business actually gets discussed, written about and executed — alongside people who take it seriously."
        scrubIntro
      />

      {/* ── Departments ── */}
      <section id="departments" className="container-abc scroll-mt-[120px] py-14 md:py-20">
        <Reveal>
          <div className="mb-10">
            <div className="section-number">S.01 — Departments</div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Six verticals, one club.
            </h2>
            <ScrubText
              text="This is where the departments live. Every initiative at ABC is owned by a vertical — pick the one that fits you best, or jump straight in and let the work choose."
              className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-foreground/45"
            />
          </div>
        </Reveal>

        {departments.length === 0 ? (
          <Reveal>
            <p className="text-center text-foreground/40">
              No departments have been published yet.
            </p>
          </Reveal>
        ) : (
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug}>
                <DepartmentCard item={d} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <div className="section-divider" />

      {/* ── Opportunities ── */}
      <section className="bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal>
            <div className="mb-10">
              <div className="section-number">S.02 — What you'll do</div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Not a certificate. An apprenticeship.
              </h2>
            </div>
          </Reveal>
          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((o) => (
              <StaggerItem key={o.title}>
                <div className="card-lift h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <o.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{o.title}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/45">
                    {o.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Skills & Access ── */}
      <section className="bg-background">
        <div className="container-abc grid gap-12 py-14 md:py-20 lg:grid-cols-2">
          <Reveal y={28}>
            <div>
              <div className="section-number">S.03 — Skills you'll use</div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Skills you'll actually use after graduation.
              </h2>
              <ul className="mt-6 space-y-3">
                {outcomes.map((o) => (
                  <li
                    key={o}
                    className="border-l-2 border-primary/30 pl-4 text-[0.9rem] text-foreground/45"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal y={28} delay={0.1}>
            <div>
              <div className="section-number">S.04 — Access</div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Rooms you would not otherwise be in.
              </h2>
              <p className="mt-5 text-[0.9rem] leading-relaxed text-foreground/45">
                Members interact directly with speakers, sponsors and alumni working
                across consulting, finance, product, venture and policy. Leadership
                roles open each year, and department heads carry genuine
                decision-making authority over budgets, calendars and editorial
                direction.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── How to join ── */}
      <section className="bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal>
            <div className="mb-12">
              <div className="section-number">S.05 — How to join</div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">The process</h2>
            </div>
          </Reveal>
          <StaggerGroup className="grid gap-5 md:grid-cols-3">
            {steps.map(([n, t, b]) => (
              <StaggerItem key={n}>
                <div className="card-lift h-full p-7">
                  <span className="font-display text-3xl font-bold text-primary">{n}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/45">
                    {b}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal y={20}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Button variant="outline" asChild size="lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Induction Forms ── */}
      <section id="induction" className="scroll-mt-[120px] bg-background">
        <div className="container-abc py-14 md:py-20">
          <Reveal>
            <div className="mb-10">
              <div className="section-number">S.06 — Induction Forms</div>
              <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Ready to join?
              </h2>
              <ScrubText
                text="Applications open at the start of each semester. Fill in the induction form for the department you're interested in — we'll get back to you shortly."
                className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-foreground/45"
              />
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug}>
                <div className="card-lift h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{d.data.name}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-foreground/45 line-clamp-2">
                    {d.data.description}
                  </p>
                  <Button variant="outline" asChild size="sm" className="mt-4">
                    <a href="#" target="_blank" rel="noreferrer noopener">
                      Apply now <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

    </>
  );
}
