import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { useCmsContent } from "@/lib/cms";
import { AbrCard } from "@/components/cards";
import { FilterTabs } from "@/components/filter-tabs";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Abr() {
  const { abrItems, abrTypes } = useCmsContent();
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(() => ["All", ...abrTypes], [abrTypes]);
  const visible = useMemo(
    () => (filter === "All"
      ? abrItems
      : abrItems.filter((i) => (i.data.type ?? "Publication") === filter)),
    [filter, abrItems]
  );

  return (
    <>
      <PageHeader
        title="ABR — the club's writing desk."
        intro="Long-form publications, short-form Monocles and everything in between. Written, edited and illustrated entirely by students."
      />

      <section className="container-abc pt-10">
        <Reveal y={16}>
          <FilterTabs
            options={filters}
            value={filter}
            onChange={setFilter}
            ariaLabel="ABR types"
          />
        </Reveal>
      </section>

      <section className="container-abc py-20 md:py-28">
        {visible.length === 0 ? (
          <Reveal>
            <p className="text-center text-muted-foreground">No ABR content published in this category yet.</p>
          </Reveal>
        ) : (
          <StaggerGroup
            key={filter}
            className="grid gap-6"
            delayChildren={0.05}
          >
            {visible.map((i) => (
              <StaggerItem key={i.slug}>
                <AbrCard item={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </>
  );
}