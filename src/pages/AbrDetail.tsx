import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getAbrItem, formatDate } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/reveal";
import NotFound from "./NotFound";

export default function AbrDetail() {
  const { slug } = useParams();
  const item = slug ? getAbrItem(slug) : undefined;

  if (!item) return <NotFound />;

  return (
    <article>
      <header className="border-b border-border bg-secondary/50">
        <div className="container-abc py-16 md:py-20">
          <Reveal y={16}>
            <Link
              to="/abr"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-fast"
            >
              <ArrowLeft className="h-4 w-4" /> Ashoka Business Review
            </Link>
            <p className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="border border-accent px-2 py-0.5 text-accent-foreground transition-fast">
                {item.data.type ?? "Publication"}
              </span>
              <span>{formatDate(item.data.date)}</span>
              {item.data.author && <span>· {item.data.author}</span>}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">
              {item.data.title}
            </h1>
          </Reveal>
        </div>
      </header>

      {item.data.cover && (
        <div className="container-abc pt-12">
          <Reveal y={28}>
            <div className="bezel-outer aspect-video max-h-[480px]">
              <img
                src={item.data.cover}
                alt={item.data.title}
                className="bezel-inner aspect-video w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      )}

      <div className="container-abc max-w-3xl py-16">
        <Reveal y={20}>
          <Markdown>{item.body}</Markdown>
        </Reveal>

        {item.data.tags?.length ? (
          <Reveal y={20} delay={0.1}>
            <div className="mt-12">
              <div className="flex flex-wrap gap-2 border-t border-border pt-8">
                {item.data.tags.map((t) => (
                  <span key={t} className="bg-secondary px-3 py-1 text-xs transition-fast">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </article>
  );
}