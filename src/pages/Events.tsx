import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/cards";
import { events, eventCategories } from "@/lib/content";

export default function Events() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...eventCategories];
  const visible =
    filter === "All" ? events : events.filter((e) => e.data.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Notable events"
        title="Flagships, sessions and the odd late-night build."
        intro="From House of Cards to speaker sessions and the ABR launch — a record of what the club has staged on campus."
      />

      <section className="container-abc py-16">
        {filters.length > 1 && (
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.length === 0 ? (
            <p className="text-muted-foreground">No events published yet.</p>
          ) : (
            visible.map((e) => <EventCard key={e.slug} item={e} />)
          )}
        </div>
      </section>
    </>
  );
}
