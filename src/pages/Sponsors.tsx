import { PageHeader } from "@/components/PageHeader";
import { SponsorCard } from "@/components/cards";
import { sponsors } from "@/lib/content";

export default function Sponsors() {
  return (
    <>
      <PageHeader
        eyebrow="Past sponsors"
        title="Organisations that have backed our work."
        intro="Sponsors and partners who have supported ABC events, publications and competitions over the years."
      />

      <section className="container-abc py-20">
        {sponsors.length === 0 ? (
          <p className="text-muted-foreground">No sponsors listed yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <SponsorCard key={s.slug} item={s} />
            ))}
          </div>
        )}

        <div className="mt-16 border border-border bg-secondary/50 p-10">
          <h2 className="font-display text-2xl">Partner with ABC</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We work with firms, funds and founders who want direct access to a
            sharp, cross-disciplinary student body. Write to us to discuss
            sponsorship of an event, competition or ABR issue.
          </p>
        </div>
      </section>
    </>
  );
}
