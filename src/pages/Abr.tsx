import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AbrCard } from "@/components/cards";
import { abrItems, abrTypes } from "@/lib/content";

export default function Abr() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", ...abrTypes];
  const visible =
    filter === "All"
      ? abrItems
      : abrItems.filter((i) => (i.data.type ?? "Publication") === filter);

  return (
    <>
      <PageHeader
        eyebrow="Ashoka Business Review"
        title="ABR — the club's writing desk."
        intro="Long-form publications, short-form Monocles and everything in between. Written, edited and illustrated entirely by students."
      />

      <section className="container-abc py-16">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {filters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                filter === t
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6">
          {visible.length === 0 ? (
            <p className="text-muted-foreground">
              No ABR content published in this category yet.
            </p>
          ) : (
            visible.map((i) => <AbrCard key={i.slug} item={i} />)
          )}
        </div>
      </section>
    </>
  );
}
