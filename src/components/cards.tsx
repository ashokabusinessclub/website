import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentEntry, EventItem, AbrItem, Department, Sponsor, formatDate } from "@/lib/content";

function Cover({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="aspect-[16/10] w-full bg-secondary paper-grid" aria-hidden />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="aspect-[16/10] w-full object-cover"
    />
  );
}

export function DepartmentCard({ item }: { item: ContentEntry<Department> }) {
  return (
    <Link
      to={`/departments/${item.slug}`}
      className="group flex flex-col justify-between border border-border bg-card p-7 transition-colors hover:border-primary"
    >
      <div>
        <h3 className="font-display text-2xl">{item.data.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.data.description}
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
        What we do
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function EventCard({ item }: { item: ContentEntry<EventItem> }) {
  return (
    <Link
      to={`/events/${item.slug}`}
      className="group block border border-border bg-card transition-colors hover:border-primary"
    >
      <div className="overflow-hidden">
        <Cover src={item.data.cover} alt={item.data.title} />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {item.data.category && (
            <span className="text-primary">{item.data.category}</span>
          )}
          <span>{formatDate(item.data.date)}</span>
        </div>
        <h3 className="mt-3 font-display text-xl">{item.data.title}</h3>
        {item.data.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {item.data.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export function AbrCard({ item }: { item: ContentEntry<AbrItem> }) {
  return (
    <Link
      to={`/abr/${item.slug}`}
      className="group flex gap-6 border border-border bg-card p-6 transition-colors hover:border-primary"
    >
      <div className="hidden w-40 shrink-0 sm:block">
        <Cover src={item.data.cover} alt={item.data.title} />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="border border-accent px-2 py-0.5 text-accent-foreground">
            {item.data.type ?? "Publication"}
          </span>
          <span>{formatDate(item.data.date)}</span>
          {item.data.author && <span>· {item.data.author}</span>}
        </div>
        <h3 className="mt-3 font-display text-xl group-hover:text-primary">
          {item.data.title}
        </h3>
        {item.data.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {item.data.excerpt}
          </p>
        )}
        {item.data.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.data.tags.map((t) => (
              <span
                key={t}
                className="bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export function SponsorCard({ item }: { item: ContentEntry<Sponsor> }) {
  const content = (
    <div className="flex h-32 items-center justify-center bg-background px-6">
      {item.data.logo ? (
        <img
          src={item.data.logo}
          alt={`${item.data.name} logo`}
          loading="lazy"
          className="max-h-20 max-w-full object-contain"
        />
      ) : (
        <span className="font-display text-lg text-muted-foreground">
          {item.data.name}
        </span>
      )}
    </div>
  );

  const className =
    "block border border-border bg-card transition-colors hover:border-primary";

  return item.data.website ? (
    <a
      href={item.data.website}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
