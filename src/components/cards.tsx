import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentEntry, EventItem, AbrItem, Department, Sponsor, formatDate } from "@/lib/content";

function Cover({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div
        className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-secondary/60"
        aria-hidden="true"
      >
        <span className="font-display text-5xl font-black tracking-tight text-foreground/10">
          ABC
        </span>
      </div>
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

export function DepartmentCard({
  item,
  style,
}: {
  item: ContentEntry<Department>;
  style?: CSSProperties;
}) {
  return (
    <Link
      to={`/departments/${item.slug}`}
      style={style}
      className="group bezel-outer block h-full transition-base"
    >
      <div className="bezel-inner flex h-full flex-col justify-between p-7">
        <div>
          <h3 className="font-display text-2xl transition-fast group-hover:text-primary">
            {item.data.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-fast">
            {item.data.description}
          </p>
        </div>

        <span className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-primary transition-fast group-hover:border-primary">
          What we do
          <span className="icon-wrapper">
            <ArrowRight className="h-4 w-4" />
          </span>
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
      className="group bezel-outer block h-full overflow-hidden transition-base"
    >
      <div className="bezel-inner overflow-hidden">
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
          <h3 className="mt-3 font-display text-xl transition-fast group-hover:text-primary">
            {item.data.title}
          </h3>
          {item.data.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground transition-fast">
              {item.data.description}
            </p>
          )}
        </div>
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
      className="group bezel-outer block transition-base"
    >
      <div className="bezel-inner flex items-stretch overflow-hidden">
        <div className="flex-1 p-7">
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
              className="h-full w-full object-cover"
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
    <div className="flex h-32 items-center justify-center bg-background px-6">
      {item.data.logo ? (
        <img
          src={item.data.logo}
          alt={`${item.data.name} logo`}
          loading="lazy"
          className="max-h-20 max-w-full object-contain transition-fast"
        />
      ) : (
        <span className="font-display text-lg text-muted-foreground transition-fast">
          {item.data.name}
        </span>
      )}
    </div>
  );

  const className = "bezel-outer block transition-base";

  return item.data.website ? (
    <a
      href={item.data.website}
      target="_blank"
      rel="noreferrer noopener"
      style={style}
      className={className}
    >
      <div className="bezel-inner">{content}</div>
    </a>
  ) : (
    <div style={style} className={className}>
      <div className="bezel-inner">{content}</div>
    </div>
  );
}

/* ============================================
   DOUBLE-BEZEL CARD WRAPPER
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