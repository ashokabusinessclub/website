import { PageHeader } from "@/components/PageHeader";
import { DepartmentCard } from "@/components/cards";
import { departments } from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export default function Departments() {
  return (
    <>
      <PageHeader
        eyebrow="The Departments"
        title="Six verticals, one club."
        intro="Every initiative at ABC is owned by a vertical — pick one from the departments menu above, or jump straight to any team below."
      />

      <section className="container-abc py-20 md:py-28">
        {departments.length === 0 ? (
          <Reveal>
            <p className="text-center text-muted-foreground">
              No departments have been published yet.
            </p>
          </Reveal>
        ) : (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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