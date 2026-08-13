import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DepartmentCard } from "@/components/cards";
import { departments } from "@/lib/content";

export default function Departments() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHeader
        title="The teams that run the club."
        intro="Each department owns a distinct mandate — from research and editorial to partnerships, events and design. Open one to see its responsibilities and the work it delivers each semester."
      />

      <section
        id="departments-grid"
        className={`container-abc py-24 md:py-32 ${visibleSections.has("departments-grid") ? "animate-entry" : ""}`}
        ref={(el) => { if (el) sectionRefs.current["departments-grid"] = el; }}
      >
        {departments.length === 0 ? (
          <p className="reveal-up text-muted-foreground text-center">
            No departments have been published yet.
          </p>
        ) : (
          <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => (
              <DepartmentCard key={d.slug} item={d} style={{ transitionDelay: `${i * 60}ms` }} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}