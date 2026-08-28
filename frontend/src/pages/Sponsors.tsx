import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useCmsContent } from "@/lib/cms";
import { SponsorCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { ArrowRight } from "lucide-react";

export default function Sponsors() {
  const { sponsors } = useCmsContent();
  return (
    <>
      <PageHeader
        title="Past Partners."
        intro="Organisations that have backed our work — sponsors and partners who have supported ABC events, publications and competitions over the years."
      />

      <section className="container-abc py-14 md:py-20">
        {sponsors.length === 0 ? (
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="text-foreground/40">
                Partner logos and branding will appear here as partnerships are
                confirmed. If your organisation would like to work with us, we'd
                love to talk.
              </p>
            </div>
          </Reveal>
        ) : (
          <StaggerGroup className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sponsors.map((s) => (
              <StaggerItem key={s.slug}>
                <div className="h-full">
                  <SponsorCard item={s} expanded />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <div className="section-divider" />

      <section className="bg-background">
        <div className="container-abc py-16 md:py-24">
          <Reveal y={32}>
            <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 backdrop-blur-sm md:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[250px] w-[300px] rounded-full bg-primary/[0.06] blur-[100px]"
              />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">Partner with ABC</h2>
                  <p className="mt-3 max-w-xl text-[0.9rem] text-foreground/45">
                    We work with firms, funds and founders who want direct access to a
                    sharp, cross-disciplinary student body. Write to us to discuss
                    sponsorship of an event, competition or ABR issue.
                  </p>
                </div>
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="mt-4 md:mt-0 shrink-0">
                  <Link to="/contact">Get in touch</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
