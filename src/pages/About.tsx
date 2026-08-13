import { useEffect, useRef, useState } from "react";
import { PageHeader } from "@/components/PageHeader";

const pillars = [
  {
    title: "Rigour",
    body: "Every argument we publish or present is researched, sourced and stress-tested by peers before it leaves the room.",
  },
  {
    title: "Access",
    body: "We open doors — to founders, analysts, policymakers and alumni — for students who would not otherwise have them.",
  },
  {
    title: "Ownership",
    body: "Members run departments, edit the review and produce events end to end. Responsibility is real, not ceremonial.",
  },
  {
    title: "Breadth",
    body: "Business is not a single discipline. We read it through economics, policy, technology, design and the liberal arts.",
  },
];

export default function About() {
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
        eyebrow="About us"
        title="A business club built on a liberal arts campus."
        intro="The Ashoka Business Club (ABC) is a student-run body at Ashoka University. We exist to make commercial thinking accessible, rigorous and genuinely interesting to students from every discipline."
      />

      <section
        id="vision"
        className={`container-abc py-24 md:py-32 grid gap-14 md:grid-cols-2 ${visibleSections.has("vision") ? "animate-entry" : ""}`}
        ref={(el) => { if (el) sectionRefs.current.vision = el; }}
      >
        <div className="reveal-up">
          <h2 className="font-display text-3xl md:text-4xl">
            A campus where every student can read the business world fluently.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            We want ABC to be the place where a philosophy major can argue about
            capital allocation, a CS student can pitch a venture thesis, and an
            economics student can learn to write for a general audience. Business
            literacy should not be gate-kept by a major.
          </p>
        </div>
        <div className="reveal-up" style={{ transitionDelay: "80ms" }}>
          <h2 className="font-display text-3xl md:text-4xl">
            Research, dialogue and experience — every semester.
          </h2>
          <ul className="mt-5 space-y-4 text-muted-foreground">
            <li className="border-l-2 border-accent pl-4">
              Publish student research and commentary through the Ashoka Business
              Review.
            </li>
            <li className="border-l-2 border-accent pl-4">
              Bring practitioners to campus through speaker sessions and panels.
            </li>
            <li className="border-l-2 border-accent pl-4">
              Run competitions and flagship events that put theory under pressure.
            </li>
            <li className="border-l-2 border-accent pl-4">
              Build a network between students, alumni and partner organisations.
            </li>
          </ul>
        </div>
      </section>

      <section
        id="pillars"
        className={`border-y border-border bg-secondary/40 ${visibleSections.has("pillars") ? "animate-entry" : ""}`}
        ref={(el) => { if (el) sectionRefs.current.pillars = el; }}
      >
        <div className="container-abc py-24 md:py-32">
          <div className="reveal-stagger grid gap-px bg-border sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="bezel-outer p-8"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="bezel-inner p-8">
                  <h3 className="font-display text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-we-work"
        className={`container-abc py-24 md:py-32 ${visibleSections.has("how-we-work") ? "animate-entry" : ""}`}
        ref={(el) => { if (el) sectionRefs.current["how-we-work"] = el; }}
      >
        <div className="max-w-3xl reveal-up">
          <h2 className="font-display text-3xl md:text-4xl">
            Departments do the work; the club sets the standard.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            ABC is organised into specialised departments — each with its own
            mandate, leadership and calendar. Members join a department, take
            ownership of projects within it, and collaborate across teams on
            flagship initiatives such as the ABR launch and House of Cards.
          </p>
        </div>
      </section>
    </>
  );
}