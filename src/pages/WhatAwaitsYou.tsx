import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import {
  ArrowRight,
  BookOpen,
  Users,
  Mic,
  Briefcase,
  PenTool,
  TrendingUp,
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
  return (
    <>
      <PageHeader
        title="Join a club that hands you the work, not a certificate."
        intro="Membership in ABC is an apprenticeship in how business actually gets discussed, written about and executed — alongside people who take it seriously."
      />

      <section className="container-abc py-20 md:py-28">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <StaggerItem key={o.title}>
              <div className="card-lift h-full p-8">
                <o.icon className="h-6 w-6 text-accent" />
                <h3 className="mt-5 font-display text-xl">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {o.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-abc grid gap-14 py-20 md:py-28 md:grid-cols-2">
          <Reveal y={28}>
            <h2 className="font-display text-3xl md:text-4xl">
              Skills you'll actually use after graduation.
            </h2>
            <ul className="mt-6 space-y-3">
              {outcomes.map((o) => (
                <li
                  key={o}
                  className="border-l border-accent/70 pl-4 text-muted-foreground"
                >
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal y={28} delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl">
              Rooms you would not otherwise be in.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Members interact directly with speakers, sponsors and alumni working
              across consulting, finance, product, venture and policy. Leadership
              roles open each year, and department heads carry genuine
              decision-making authority over budgets, calendars and editorial
              direction.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-abc py-20 md:py-28">
        <StaggerGroup className="grid gap-6 md:grid-cols-3">
          {steps.map(([n, t, b]) => (
            <StaggerItem key={n}>
              <div className="card-lift h-full p-8">
                <span className="font-display text-4xl italic text-accent">{n}</span>
                <h3 className="mt-4 font-display text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal y={20}>
          <div className="mt-14 flex flex-wrap gap-4">
            <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
              <Link to="/departments">Explore departments</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}