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
      {/* Hero — Asymmetric Split */}
      <section className="relative overflow-hidden border-b border-border bg-ink text-background pt-20 pb-28 md:pt-24 md:pb-36">
        <div className="absolute inset-0 opacity-[0.07] paper-grid" aria-hidden="true" />
        <div className="container-abc relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Left: Copy */}
            <Reveal y={32}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">
                Ashoka University · Student Body
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] text-background md:text-7xl">
                Where business is
                <span className="block text-brass">studied, debated and built.</span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-background/70">
                The Ashoka Business Club is a student-run community bringing together
                research, industry dialogue and hands-on experience — through our
                departments, the Ashoka Business Review, and flagship campus events.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  asChild
                  iconRight={<ArrowRight className="h-4 w-4" />}
                  size="lg"
                >
                  <Link to="/what-awaits-you">
                    What awaits you
                  </Link>
                </Button>
              </div>
            </Reveal>

            {/* Right: Visual / Stats Preview */}
            <div className="hidden lg:block">
              <StaggerGroup className="space-y-6">
                {stats.map((s) => (
                  <StaggerItem key={s.v}>
                    <div className="bezel-outer p-6">
                      <div className="bezel-inner p-6 text-center">
                        <p className="font-display text-4xl text-primary">{s.k}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {s.v}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>

          {/* Scroll indicator */}
          {!reduceMotion && (
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              aria-hidden="true"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-6 w-6 text-background/30" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Departments */}
      <Section
        id="departments"
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
  title,
  href,
  cta,
  children,
}: {
  id: string;
  title: string;
  href: string;
  cta: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="container-abc py-24 md:py-32">
      <Reveal>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
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