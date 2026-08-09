import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { departments, events, abrItems, sponsors } from "@/lib/content";
import { DepartmentCard, EventCard, AbrCard } from "@/components/cards";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-ink text-background">
        <div className="absolute inset-0 opacity-[0.07] paper-grid" aria-hidden />
        <div className="container-abc relative py-24 md:py-36">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">
            Ashoka University · Student Body
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-background md:text-7xl">
            Where business is
            <span className="block text-brass">studied, debated and built.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-background/70">
            The Ashoka Business Club is a student-run community bringing together
            research, industry dialogue and hands-on experience — through our
            departments, the Ashoka Business Review, and flagship campus events.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/what-awaits-you"
              className="inline-flex items-center gap-2 bg-brass px-7 py-3.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
            >
              What awaits you <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/abr"
              className="inline-flex items-center gap-2 border border-background/30 px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:border-brass hover:text-brass"
            >
              Read the Business Review
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container-abc grid grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            { k: departments.length, v: "Departments" },
            { k: events.length, v: "Flagship events" },
            { k: abrItems.length, v: "ABR pieces" },
            { k: sponsors.length, v: "Partner organisations" },
          ].map((s) => (
            <div key={s.v} className="px-6 py-10 text-center">
              <p className="font-display text-4xl text-primary">{s.k}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments */}
      <Section
        eyebrow="Departments"
        title="Six teams, one club"
        href="/departments"
        cta="All departments"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.slice(0, 3).map((d) => (
            <DepartmentCard key={d.slug} item={d} />
          ))}
        </div>
      </Section>

      {/* Events */}
      <Section
        eyebrow="Notable events"
        title="What we put on campus"
        href="/events"
        cta="All events"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => (
            <EventCard key={e.slug} item={e} />
          ))}
        </div>
      </Section>

      {/* ABR */}
      <Section
        eyebrow="Ashoka Business Review"
        title="Publications & Monocles"
        href="/abr"
        cta="Read more"
      >
        <div className="grid gap-6">
          {abrItems.slice(0, 2).map((a) => (
            <AbrCard key={a.slug} item={a} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="container-abc pb-8">
        <div className="border border-border bg-secondary/60 p-10 md:p-16">
          <h2 className="max-w-2xl font-display text-3xl md:text-4xl">
            Thinking of joining ABC this year?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Applications open each semester. Explore what membership looks like —
            the work, the exposure and the people.
          </p>
          <Link
            to="/what-awaits-you"
            className="mt-8 inline-flex items-center gap-2 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            What awaits you <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Section({
  eyebrow,
  title,
  href,
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  children: React.ReactNode;
}) {
  return (
    <section className="container-abc py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl">{title}</h2>
        </div>
        <Link
          to={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}
