import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AbrCard } from "@/components/cards";
import { abrItems, abrTypes } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Abr() {
  const [filter, setFilter] = useState<string>("All");

  const filters = useMemo(() => ["All", ...abrTypes], []);
  const visible = useMemo(
    () => (filter === "All"
      ? abrItems
      : abrItems.filter((i) => (i.data.type ?? "Publication") === filter)),
    [filter]
  );

  return (
    <>
      <PageHeader
        title="ABR — the club's writing desk."
        intro="Long-form publications, short-form Monocles and everything in between. Written, edited and illustrated entirely by students."
      />

      <section className="container-abc pb-12">
        <Reveal y={16}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="ABR types">
            {filters.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-base ${
                  filter === t
                    ? "rounded-full bg-primary text-primary-foreground"
                    : "rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-abc py-24 md:py-32">
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