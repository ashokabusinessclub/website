import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useCmsContent } from "@/lib/cms";
import { AbrCard } from "@/components/cards";
import { FilterTabs } from "@/components/filter-tabs";
import { Button } from "@/components/ui/button";
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

  const latestMonocle = useMemo(
    () => abrItems.find((i) => (i.data.type ?? "Publication") === "Monocle"),
    [abrItems]
  );

  return (
    <>
      <PageHeader
        title="The club's writing desk."
        intro="Long-form publications, short-form Monocles and everything in between. Written, edited and illustrated entirely by students."
      />

      {/* Latest Monocle Edition */}
      {latestMonocle && (
        <section className="container-abc pb-8 pt-8">
          <Reveal y={16}>
            <div className="relative overflow-hidden rounded-lg border border-primary/20 bg-primary/[0.04] p-6 backdrop-blur-sm md:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-[200px] w-[200px] rounded-full bg-primary/[0.08] blur-[80px]"
              />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    Latest Monocle
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">
                    {latestMonocle.data.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-foreground/45">
                    {latestMonocle.data.excerpt}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {latestMonocle.data.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[0.65rem] text-foreground/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="shrink-0">
                  <Link to={`/abr/${latestMonocle.slug}`}>Read now</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="container-abc pt-4">
        <Reveal y={16}>
          <FilterTabs
            options={filters}
            value={filter}
            onChange={setFilter}
            ariaLabel="ABR types"
          />
        </Reveal>
      </section>

      <section className="container-abc py-14 md:py-20">
        {visible.length === 0 ? (
          <Reveal>
            <p className="text-center text-foreground/40">No ABR content published in this category yet.</p>
          </Reveal>
        ) : (
          <StaggerGroup
            key={filter}
            className="grid gap-5"
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
