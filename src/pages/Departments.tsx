import { PageHeader } from "@/components/PageHeader";
import { DepartmentCard } from "@/components/cards";
import { departments } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Departments() {
  return (
    <>
      <PageHeader
        title="The teams that run the club."
        intro="Each department owns a distinct mandate — from research and editorial to partnerships, events and design. Open one to see its responsibilities and the work it delivers each semester."
      />

      <section className="container-abc py-20 md:py-28">
        {departments.length === 0 ? (
          <Reveal>
            <p className="text-center text-muted-foreground">
              No departments have been published yet.
            </p>
          </Reveal>
        ) : (
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug}>
                <DepartmentCard item={d} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </section>
    </>
  );
}