import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/cards";
import { events, eventCategories } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Events() {
  const [filter, setFilter] = useState("All");

  const filters = useMemo(() => ["All", ...eventCategories], []);
  const visible = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.data.category === filter)),
    [filter]
  );

  return (
    <>
      <PageHeader
        title="Flagships, sessions and the odd late-night build."
        intro="From House of Cards to speaker sessions and the ABR launch — a record of what the club has staged on campus."
      />

      {/* Filter Pills */}
      {filters.length > 1 && (
        <section className="container-abc pb-12">
          <Reveal y={16}>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Event categories"
            >
              {filters.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-base ${
                    filter === c
                      ? "rounded-full bg-primary text-primary-foreground"
                      : "rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* Events Grid */}
      <section className="container-abc py-24 md:py-32">
        {visible.length === 0 ? (
          <Reveal>
            <p className="text-center text-muted-foreground">No events published yet.</p>
          </Reveal>
        ) : (
          <StaggerGroup
            key={filter}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            delayChildren={0.05}
          >
            {visible.map((e) => (
              <StaggerItem key={e.slug}>
                <EventCard item={e} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </>
  );
}