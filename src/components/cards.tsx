import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentEntry, EventItem, AbrItem, Department, Sponsor, formatDate } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";
import { DepartmentArt } from "@/components/department-art";

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
  const { departments } = useCmsContent();
  const index = departments.findIndex((d) => d.slug === item.slug);

  return (
    <Link
      to={`/departments/${item.slug}`}
      style={style}
      className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-ambient)] transition-base hover:-translate-y-1 hover:border-brass/60 hover:shadow-[var(--shadow-elevated)]"
      aria-label={`${item.data.name} — ${item.data.description}`}
    >
      <div className="relative aspect-square">
        <DepartmentArt
          slug={item.slug}
          className="absolute inset-0 transition-transform duration-[var(--dur-slower)] ease-[var(--ease-out)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/5" />

        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-background/20 bg-background/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-background backdrop-blur-sm">
          No. {String(index + 1).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl text-background transition-fast group-hover:text-brass">
            {item.data.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-background/75">
            {item.data.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brass">
            What we do
            <ArrowRight className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-1" />
          </span>
        </div>
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
    <div className="flex h-full w-full items-center justify-center px-4">
      {item.data.logo ? (
        <img
          src={item.data.logo}
          alt={`${item.data.name} logo`}
          loading="lazy"
          className="max-h-14 max-w-[85%] object-contain opacity-80 grayscale-[35%] transition-fast group-hover:scale-[1.06] group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="font-display text-lg text-foreground/70 transition-fast group-hover:text-foreground">
          {item.data.name}
        </span>
      )}
    </div>
  );

  const className = "group h-24 w-full";

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