import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { departments, events, abrItems, sponsors } from "@/lib/content";
import { DepartmentCard, EventCard, AbrCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Home() {
  const stats = [
    { k: departments.length, v: "Departments" },
    { k: events.length, v: "Flagship events" },
    { k: abrItems.length, v: "ABR pieces" },
    { k: sponsors.length, v: "Partner organisations" },
  ].filter((s) => s.k > 0);
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Hero — Editorial */}
      <section className="relative overflow-hidden border-b border-border bg-background pt-24 pb-28 md:pt-28 md:pb-36">
        <div className="absolute inset-0 paper-grid" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 select-none font-display text-[38vw] font-black leading-none tracking-tight text-ink/[0.04] lg:text-[26rem]"
        >
          ABC
        </div>

        <div className="container-abc relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Left: Copy */}
            <Reveal y={28}>
              <h1 className="text-balance font-display text-5xl leading-[1.02] md:text-6xl xl:text-7xl">
                Where business is{" "}
                <em className="text-primary not-italic">studied, debated and built.</em>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                The Ashoka Business Club is a student-run community bringing together
                research, industry dialogue and hands-on experience — through our
                departments, the Ashoka Business Review, and flagship campus events.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg">
                  <Link to="/what-awaits-you">What awaits you</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/departments">Explore departments</Link>
                </Button>
              </div>
            </Reveal>

            {/* Right: At a glance */}
            <Reveal y={28} delay={0.1}>
              <div className="bezel-outer">
                <div className="bezel-inner px-8 py-10 md:p-12">
                  <div className="flex items-center gap-4">
                    <span className="rule-brass w-10" aria-hidden="true" />
                    <p className="eyebrow">The club in numbers</p>
                  </div>
                  <dl className="mt-10 grid grid-cols-3 gap-8">
                    {stats.map((s) => (
                      <div key={s.v} className="border-t border-border pt-5">
                        <dd className="font-display text-5xl font-black tracking-tight text-ink">
                          {s.k}
                        </dd>
                        <dt className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {s.v}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scroll indicator */}
          {!reduceMotion && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-foreground/30" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Departments */}
      <Section
        id="departments"
        eyebrow="The teams"
        title="Six teams, one club"
        href="/departments"
        cta="All departments"
      >
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.slice(0, 3).map((d) => (
            <StaggerItem key={d.slug}>
              <DepartmentCard item={d} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* Events */}
      <Section
        id="events"
        eyebrow="Flagships & sessions"
        title="What we put on campus"
        href="/events"
        cta="All events"
      >
        <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => (
            <StaggerItem key={e.slug}>
              <EventCard item={e} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* ABR */}
      <Section
        id="abr"
        eyebrow="The writing desk"
        title="Publications & Monocles"
        href="/abr"
        cta="Read more"
      >
        <StaggerGroup className="grid gap-6">
          {abrItems.slice(0, 2).map((a) => (
            <StaggerItem key={a.slug}>
              <AbrCard item={a} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* CTA */}
      <section className="container-abc pb-24">
        <Reveal y={32}>
          <div className="bezel-outer p-10 md:p-16">
            <div className="bezel-inner p-10 md:p-16 text-center">
              <h2 className="max-w-2xl mx-auto font-display text-3xl md:text-4xl">
                Thinking of joining ABC this year?
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                Applications open each semester. Explore what membership looks like —
                the work, the exposure and the people.
              </p>
              <Button
                asChild
                iconRight={<ArrowRight className="h-4 w-4" />}
                size="lg"
                className="mt-8"
              >
                <Link to="/what-awaits-you">
                  What awaits you
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  href,
  cta,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="container-abc py-20 md:py-28">
      <Reveal>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <div className="flex items-center gap-4">
                <span className="rule-brass w-10" aria-hidden="true" />
                <p className="eyebrow">{eyebrow}</p>
              </div>
            )}
            <h2 className={`${eyebrow ? "mt-4" : ""} font-display text-3xl md:text-4xl`}>
              {title}
            </h2>
          </div>
          <Link
            to={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
          >
            {cta} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      {children}
    </section>
  );
}