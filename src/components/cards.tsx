import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentEntry, EventItem, AbrItem, Department, Sponsor, departments, formatDate } from "@/lib/content";

function Cover({ src, alt }: { src?: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden" aria-hidden="true">
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-fast duration-[var(--dur-slower)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/70 to-background" />
          <span className="absolute inset-4 border border-foreground/5" aria-hidden="true" />
          <span className="absolute right-5 top-5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-foreground/30">
            ABR Archives
          </span>
          <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black tracking-tight text-foreground/10">
            ABC
          </span>
        </>
      )}
    </div>
  );
}

export function DepartmentCard({
  item,
  style,
}: {
  item: ContentEntry<Department>;
  style?: CSSProperties;
}) {
  const index = departments.findIndex((d) => d.slug === item.slug);

  return (
    <Link
      to={`/departments/${item.slug}`}
      style={style}
      className="card-lift group block h-full p-7"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm italic text-brass">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-brass/60 to-transparent" />
        </div>

        <h3 className="mt-4 font-display text-2xl transition-fast group-hover:text-primary">
          {item.data.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground transition-fast">
          {item.data.description}
        </p>

        <span className="mt-6 inline-flex w-max items-center gap-2 text-sm font-medium text-primary">
          What we do
          <ArrowRight className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function EventCard({
  item,
  style,
}: {
  item: ContentEntry<EventItem>;
  style?: CSSProperties;
}) {
  return (
    <Link
      to={`/events/${item.slug}`}
      style={style}
      className="card-lift group block h-full overflow-hidden"
    >
      <div className="overflow-hidden">
        <Cover src={item.data.cover} alt={item.data.title} />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {item.data.category && (
            <span className="font-semibold text-primary">{item.data.category}</span>
          )}
          <span>{formatDate(item.data.date)}</span>
        </div>
        <h3 className="mt-3 font-display text-xl transition-fast group-hover:text-primary">
          {item.data.title}
        </h3>
        {item.data.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-fast">
            {item.data.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export function AbrCard({
  item,
  style,
}: {
  item: ContentEntry<AbrItem>;
  style?: CSSProperties;
}) {
  return (
    <Link
      to={`/abr/${item.slug}`}
      style={style}
      className="card-lift group block overflow-hidden"
    >
      <div className="flex items-stretch">
        <div className="flex-1 p-7 pr-5">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <span className="border border-accent px-2 py-0.5 text-accent-foreground transition-fast">
              {item.data.type ?? "Publication"}
            </span>
            <span>{formatDate(item.data.date)}</span>
            {item.data.author && <span>· {item.data.author}</span>}
          </div>
          <h3 className="mt-3 font-display text-xl transition-fast group-hover:text-primary">
            {item.data.title}
          </h3>
          {item.data.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground transition-fast">
              {item.data.excerpt}
            </p>
          )}
          {item.data.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.data.tags.map((t) => (
                <span
                  key={t}
                  className="bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-fast"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {item.data.cover && (
          <div className="hidden w-56 shrink-0 border-l border-border sm:block">
            <img
              src={item.data.cover}
              alt={item.data.title}
              loading="lazy"
              className="h-full w-full object-cover transition-fast duration-[var(--dur-slower)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            />
          </div>
        )}
      </div>
    </Link>
  );
}

export function SponsorCard({
  item,
  style,
}: {
  item: ContentEntry<Sponsor>;
  style?: CSSProperties;
}) {
  const content = (
    <div className="flex h-full w-full items-center justify-center px-6">
      {item.data.logo ? (
        <img
          src={item.data.logo}
          alt={`${item.data.name} logo`}
          loading="lazy"
          className="max-h-20 max-w-full object-contain transition-fast"
        />
      ) : (
        <span className="font-display text-xl text-foreground/70 transition-fast group-hover:text-foreground">
          {item.data.name}
        </span>
      )}
    </div>
  );

  const className = "card-lift group h-36 w-full";

  return item.data.website ? (
    <a
      href={item.data.website}
      target="_blank"
      rel="noreferrer noopener"
      style={style}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div style={style} className={className}>
      {content}
    </div>
  );
}

/* ============================================
   DOUBLE-BEZEL CARD WRAPPER
   Reserved for focal panels (hero stats, closing CTAs).
   ============================================ */
export function DoubleBezelCard({
  children,
  className = "",
  onClick,
}: {
  children: import("react").ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`bezel-outer relative border border-border ${className}`}
      onClick={onClick}
    >
      <div className="bezel-inner relative">{children}</div>
    </div>
  );
}