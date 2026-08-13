import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { departments, events, abrItems, sponsors } from "@/lib/content";
import { DepartmentCard, EventCard, AbrCard } from "@/components/cards";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // IntersectionObserver for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero — Asymmetric Split */}
      <section
        id="hero"
        className="relative overflow-hidden border-b border-border bg-ink text-background pt-20 pb-28 md:pt-24 md:pb-36"
      >
        <div className="absolute inset-0 opacity-[0.07] paper-grid" aria-hidden="true" />
        <div className="container-abc relative">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Left: Copy */}
            <div className="animate-entry">
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
            </div>

            {/* Right: Visual / Stats Preview */}
            <div
              className="hidden lg:block animate-entry stagger-2"
              style={{ animationDelay: "120ms" }}
            >
              <div className="space-y-6">
                {[
                  { k: departments.length, v: "Departments" },
                  { k: events.length, v: "Flagship events" },
                  { k: abrItems.length, v: "ABR pieces" },
                  { k: sponsors.length, v: "Partner organisations" },
                ].map((s, i) => (
                  <div
                    key={s.v}
                    className="reveal-up"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="bezel-outer p-6">
                      <div className="bezel-inner p-6 text-center">
                        <p className="font-display text-4xl text-primary">{s.k}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {s.v}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
            <ChevronDown className="h-6 w-6 text-background/30" />
          </div>
        </div>
      </section>

      {/* Departments */}
      <Section
        id="departments"
        title="Six teams, one club"
        href="/departments"
        cta="All departments"
        ref={sectionRefs}
        isVisible={visibleSections.has("departments")}
      >
        <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.slice(0, 3).map((d) => (
            <DepartmentCard key={d.slug} item={d} />
          ))}
        </div>
      </Section>

      {/* Events */}
      <Section
        id="events"
        title="What we put on campus"
        href="/events"
        cta="All events"
        ref={sectionRefs}
        isVisible={visibleSections.has("events")}
      >
        <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => (
            <EventCard key={e.slug} item={e} />
          ))}
        </div>
      </Section>

      {/* ABR */}
      <Section
        id="abr"
        title="Publications & Monocles"
        href="/abr"
        cta="Read more"
        ref={sectionRefs}
        isVisible={visibleSections.has("abr")}
      >
        <div className="reveal-stagger grid gap-6">
          {abrItems.slice(0, 2).map((a) => (
            <AbrCard key={a.slug} item={a} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section
        id="cta"
        className="container-abc pb-24"
        ref={sectionRefs}
      >
        <div
          className={`bezel-outer p-10 md:p-16 transition-base ${visibleSections.has("cta") ? "animate-entry" : ""}`}
        >
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
  ref,
  isVisible,
}: {
  id: string;
  title: string;
  href: string;
  cta: string;
  children: React.ReactNode;
  ref: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  isVisible: boolean;
}) {
  useEffect(() => {
    ref.current[id] = document.getElementById(id);
  }, [id, ref]);

  return (
    <section
      id={id}
      ref={(el) => { if (el) ref.current[id] = el; }}
      className={`container-abc py-24 md:py-32 ${isVisible ? "animate-entry" : ""}`}
    >
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        <Link
          to={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary link-underline transition-fast"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}