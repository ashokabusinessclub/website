import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const MONOCLE_URL = "https://themonoclebyabr.substack.com/";
const MONOCLE_EMBED_URL = "https://themonoclebyabr.substack.com/embed";

export default function Abr() {
  return (
    <>
      <PageHeader
        title="The Monocle by ABR."
        intro="Read the Ashoka Business Review's latest essays, commentary and student-led business writing on Substack."
      >
        <div className="mt-8 animate-entry stagger-2">
          <Button asChild iconRight={<ExternalLink className="h-4 w-4" />} size="lg">
            <a href={MONOCLE_URL} target="_blank" rel="noreferrer">
              Open The Monocle
            </a>
          </Button>
        </div>
      </PageHeader>

      <section className="container-abc py-10 md:py-14">
        <Reveal y={16}>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <iframe
              src={MONOCLE_EMBED_URL}
              title="The Monocle by ABR on Substack"
              className="h-[360px] w-full bg-background"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
