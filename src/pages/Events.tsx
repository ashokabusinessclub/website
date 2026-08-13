import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { EventCard } from "@/components/cards";
import { FilterTabs } from "@/components/filter-tabs";
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

      {/* Filter Tabs */}
      {filters.length > 1 && (
        <section className="container-abc pt-10">
          <Reveal y={16}>
            <FilterTabs
              options={filters}
              value={filter}
              onChange={setFilter}
              ariaLabel="Event categories"
            />
          </Reveal>
        </section>
      )}

      {/* Events Grid */}
      <section className="container-abc py-20 md:py-28">
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