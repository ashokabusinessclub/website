import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getDepartment, departments } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/reveal";
import NotFound from "./NotFound";

export default function DepartmentDetail() {
  const { slug } = useParams();
  const dept = slug ? getDepartment(slug) : undefined;

  if (!dept) return <NotFound />;

  const others = departments.filter((d) => d.slug !== dept.slug).slice(0, 4);

  return (
    <article>
      <header className="border-b border-border bg-secondary/50">
        <div className="container-abc py-16 md:py-24">
          <Reveal y={16}>
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-fast"
            >
              <ArrowLeft className="h-4 w-4" /> All departments
            </Link>
            <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-6xl">
              {dept.data.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {dept.data.description}
            </p>
          </Reveal>
        </div>
      </header>

      <div className="container-abc grid gap-14 py-20 lg:grid-cols-[2fr_1fr]">
        <Reveal y={20}>
          {dept.body ? (
            <Markdown>{dept.body}</Markdown>
          ) : (
            <p className="text-muted-foreground">
              A fuller description of this department is coming soon.
            </p>
          )}
        </Reveal>

        <aside className="space-y-10">
          <Reveal y={20} delay={0.1}>
            {dept.data.responsibilities?.length ? (
              <div className="card-lift p-7">
                <p className="eyebrow">Responsibilities</p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {dept.data.responsibilities.map((r) => (
                    <li key={r} className="border-l border-accent/70 pl-3">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>

          {others.length > 0 && (
            <Reveal y={20} delay={0.15}>
              <p className="eyebrow">Other departments</p>
              <ul className="mt-4 space-y-2">
                {others.map((d) => (
                  <li key={d.slug}>
                    <Link
                      to={`/departments/${d.slug}`}
                      className="text-sm text-foreground/80 hover:text-primary transition-fast"
                    >
                      {d.data.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </aside>
      </div>
    </article>
  );
}