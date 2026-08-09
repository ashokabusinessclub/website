import { PageHeader } from "@/components/PageHeader";
import { DepartmentCard } from "@/components/cards";
import { departments } from "@/lib/content";

export default function Departments() {
  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="The teams that run the club."
        intro="Each department owns a distinct mandate — from research and editorial to partnerships, events and design. Open one to see its responsibilities and the work it delivers each semester."
      />

      <section className="container-abc py-20">
        {departments.length === 0 ? (
          <p className="text-muted-foreground">
            No departments have been published yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <DepartmentCard key={d.slug} item={d} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
