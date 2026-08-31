import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { formatDate, safeMediaUrl } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";
import { Markdown } from "@/components/Markdown";
import { Reveal } from "@/components/reveal";
import NotFound from "./NotFound";

export default function AbrDetail() {
  const { abrItems } = useCmsContent();
  const { slug } = useParams();
  const item = slug ? abrItems.find((i) => i.slug === slug) : undefined;

  if (!item) return <NotFound />;
  const cover = safeMediaUrl(item.data.cover);
  const images = item.data.images?.flatMap((image) => {
    const url = safeMediaUrl(image.url);
    return url ? [{ ...image, url }] : [];
  });

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-1/4 h-[300px] w-[400px] rounded-full bg-primary/[0.04] blur-[120px]"
        />
        <div className="container-abc relative py-16 md:py-20">
          <Reveal y={16}>
            <Link
              to="/abr"
              className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-primary transition-fast"
            >
              <ArrowLeft className="h-4 w-4" /> Ashoka Business Review
            </Link>
            <p className="mt-6 flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.22em] text-foreground/35">
              <span className="border border-primary/30 px-2 py-0.5 text-primary transition-fast">
                {item.data.type ?? "Publication"}
              </span>
              <span>{formatDate(item.data.date)}</span>
              {item.data.author && <span>· {item.data.author}</span>}
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl">
              {item.data.title}
            </h1>
          </Reveal>
        </div>
      </header>

      {cover && (
        <div className="container-abc pt-10">
          <Reveal y={28}>
            <div className="aspect-video max-h-[480px] overflow-hidden rounded-lg border border-border">
              <img
                src={cover}
                alt={item.data.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      )}

      <div className="container-abc max-w-3xl py-16">
        <Reveal y={20}>
          <Markdown>{item.body}</Markdown>
        </Reveal>

        {images && images.length > 0 && (
          <Reveal y={20} delay={0.08}>
            <div className="mt-12 space-y-6 border-t border-border pt-10">
              <h3 className="font-display text-xl font-bold tracking-tight">Article Media</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {images.map((img, i) => (
                  <figure key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                    <img
                      src={img.url}
                      alt={img.alt || img.caption || item.data.title}
                      className="aspect-[4/3] w-full object-cover"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-3 text-xs text-foreground/60">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {item.data.tags?.length ? (
          <Reveal y={20} delay={0.1}>
            <div className="mt-12">
              <div className="flex flex-wrap gap-2 border-t border-border pt-8">
                {item.data.tags.map((t) => (
                  <span key={t} className="bg-secondary px-2.5 py-1 text-[0.7rem] text-foreground/50 transition-fast">
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
