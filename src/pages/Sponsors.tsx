import { PageHeader } from "@/components/PageHeader";
import { SponsorCard } from "@/components/cards";
import { sponsors } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { ArrowRight } from "lucide-react";

export default function Sponsors() {
  return (
    <>
      <PageHeader
        title="Organisations that have backed our work."
        intro="Sponsors and partners who have supported ABC events, publications and competitions over the years."
      />

      <section className="container-abc py-24 md:py-32">
        {sponsors.length === 0 ? (
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <p className="text-muted-foreground">
                Sponsor logos and branding will appear here as partnerships are
                confirmed. If your organisation would like to work with us, we'd
                love to talk.
              </p>
            </div>
          </Reveal>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sponsors.map((s) => (
              <StaggerItem key={s.slug}>
                <div className="h-full">
                  <SponsorCard item={s} />
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>

      <section className="container-abc pb-24">
        <Reveal y={32}>
          <div className="bezel-outer p-10 md:p-16">
            <div className="bezel-inner p-10 md:p-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl">Partner with ABC</h2>
                  <p className="mt-3 max-w-xl text-muted-foreground">
                    We work with firms, funds and founders who want direct access to a
                    sharp, cross-disciplinary student body. Write to us to discuss
                    sponsorship of an event, competition or ABR issue.
                  </p>
                </div>
                <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="mt-4 md:mt-0">
                  <a href="mailto:businessclub@ashoka.edu.in">Get in touch</a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}