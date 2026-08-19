import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCmsContent } from "@/lib/cms";
import { DepartmentCard } from "@/components/cards";
import { DepartmentArt } from "@/components/department-art";
import { Markdown } from "@/components/Markdown";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import NotFound from "./NotFound";

export default function DepartmentDetail() {
  const { departments } = useCmsContent();
  const { slug } = useParams();
  const dept = slug ? departments.find((d) => d.slug === slug) : undefined;

  if (!dept) return <NotFound />;

  const index = departments.findIndex((d) => d.slug === dept.slug);
  const prev = departments[(index - 1 + departments.length) % departments.length];
  const next = departments[(index + 1) % departments.length];

  return (
    <article>
      {/* Header */}
      <header className="border-b border-border bg-secondary/50">
        <div className="container-abc py-12 md:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-fast hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> All verticals
            </Link>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal y={20}>
              <p className="eyebrow">
                No. {String(index + 1).padStart(2, "0")} · The Departments
              </p>
              <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.02] md:text-7xl">
                {dept.data.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {dept.data.description}
              </p>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <div className="bezel-outer">
                <div className="bezel-inner aspect-[4/3] overflow-hidden">
                  <DepartmentArt slug={dept.slug} className="h-full w-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="container-abc py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal y={20}>
            <div className="prose-dropcap">
              {dept.body ? (
                <Markdown>{dept.body}</Markdown>
              ) : (
                <p className="text-muted-foreground">
                  A fuller description of this department is coming soon.
                </p>
              )}
            </div>
          </Reveal>

          {dept.data.responsibilities?.length ? (
            <Reveal y={20} delay={0.05}>
              <div className="card-lift mt-12 p-7">
                <p className="eyebrow">Responsibilities</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {dept.data.responsibilities.map((r) => (
                    <li key={r} className="border-l border-accent/70 pl-3">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </div>

        {/* Prev / Next */}
        <div className="mx-auto mt-16 grid max-w-3xl gap-4 sm:grid-cols-2">
          <Link
            to={`/departments/${prev.slug}`}
            className="card-lift group flex items-center gap-4 p-5"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
              <DepartmentArt slug={prev.slug} className="absolute inset-0" />
            </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                Previous
              </p>
              <p className="mt-1 truncate font-display text-lg transition-fast group-hover:text-primary">
                {prev.data.name}
              </p>
            </div>
            <ArrowLeft className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:-translate-x-1 group-hover:text-primary" />
          </Link>

          <Link
            to={`/departments/${next.slug}`}
            className="card-lift group flex items-center justify-end gap-4 p-5 text-right"
          >
            <ArrowRight className="mr-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-primary" />
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground">
                Next
              </p>
              <p className="mt-1 truncate font-display text-lg transition-fast group-hover:text-primary">
                {next.data.name}
              </p>
            </div>
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-border">
              <DepartmentArt slug={next.slug} className="absolute inset-0" />
            </div>
          </Link>
        </div>
      </section>

      {/* All verticals */}
      <section className="border-t border-border bg-secondary/40">
        <div className="container-abc py-16 md:py-24">
          <Reveal>
            <div className="mb-10">
              <div className="flex items-center gap-4">
                <span className="rule-brass w-10" aria-hidden="true" />
                <p className="eyebrow">The Departments</p>
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl">Every vertical.</h2>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.slug}>
                <DepartmentCard item={d} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </article>
  );
}
