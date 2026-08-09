import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import {
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

export default function WhatAwaitsYou() {
  return (
    <>
      <PageHeader
        eyebrow="What awaits you"
        title="Join a club that hands you the work, not a certificate."
        intro="Membership in ABC is an apprenticeship in how business actually gets discussed, written about and executed — alongside people who take it seriously."
      />

      <section className="container-abc py-20">
        <p className="eyebrow">Opportunities</p>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <div key={o.title} className="bg-background p-8">
              <o.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-5 font-display text-xl">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {o.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-abc grid gap-14 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">What you'll learn</p>
            <h2 className="mt-3 font-display text-3xl">
              Skills you'll actually use after graduation.
            </h2>
            <ul className="mt-6 space-y-3">
              {outcomes.map((o) => (
                <li
                  key={o}
                  className="border-l-2 border-accent pl-4 text-muted-foreground"
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Exposure & networks</p>
            <h2 className="mt-3 font-display text-3xl">
              Rooms you would not otherwise be in.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Members interact directly with speakers, sponsors and alumni working
              across consulting, finance, product, venture and policy. Leadership
              roles open each year, and department heads carry genuine
              decision-making authority over budgets, calendars and editorial
              direction.
            </p>
          </div>
        </div>
      </section>

      <section className="container-abc py-20">
        <p className="eyebrow">How to join</p>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {[
            ["01", "Watch for recruitment", "Applications open at the start of each semester across departments."],
            ["02", "Apply to a department", "Tell us where you want to work and why — no prior business background required."],
            ["03", "Interview & onboard", "A short conversation, then straight into live projects with your team."],
          ].map(([n, t, b]) => (
            <div key={n} className="bg-background p-8">
              <span className="font-display text-4xl text-accent">{n}</span>
              <h3 className="mt-4 font-display text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {b}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/departments"
            className="bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore departments
          </Link>
          <Link
            to="/contact"
            className="border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
