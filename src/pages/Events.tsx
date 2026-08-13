import { useState, useEffect, useRef, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/cards";
import { events, eventCategories } from "@/lib/content";
import { Button } from "@/components/ui/button";

export default function Events() {
  const [filter, setFilter] = useState("All");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filters = useMemo(() => ["All", ...eventCategories], [eventCategories]);
  const visible = useMemo(
    () => filter === "All" ? events : events.filter((e) => e.data.category === filter),
    [filter, events]
  );

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
  }, [visibleSections]);

  return (
    <>
      <PageHeader
        title="Flagships, sessions and the odd late-night build."
        intro="From House of Cards to speaker sessions and the ABR launch — a record of what the club has staged on campus."
      />

      {/* Filter Pills */}
      {filters.length > 1 && (
        <section
          id="event-filters"
          className="container-abc pb-12"
          ref={(el) => { if (el) sectionRefs.current["event-filters"] = el; }}
        >
          <div
            className="flex flex-wrap gap-2 transition-base"
            role="group"
            aria-label="Event categories"
          >
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-base btn-magnetic ${
                  filter === c ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
                {c !== "All" && <Button asChild iconRight={<ArrowRight className="h-3 w-3" />} size="icon" className="ml-2" />}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section
        id="events-grid"
        className={`container-abc py-24 md:py-32 ${visibleSections.has("events-grid") ? "animate-entry" : ""}`}
        ref={(el) => { if (el) sectionRefs.current["events-grid"] = el; }}
      >
        {visible.length === 0 ? (
          <p className="reveal-up text-muted-foreground text-center">No events published yet.</p>
        ) : (
          <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((e, i) => (
              <EventCard key={e.slug} item={e} style={{ transitionDelay: `${i * 60}ms` }} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}