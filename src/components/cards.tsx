import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ContentEntry, EventItem, AbrItem, Department, Sponsor, formatDate } from "@/lib/content";

function Cover({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div
        className="bezel-outer aspect-[16/10] w-full bg-background/50 border border-border"
        aria-hidden="true"
      >
        <div className="bezel-inner aspect-[16/10] bg-card" />
      </div>
    );
  }
  return (
    <div className="bezel-outer aspect-[16/10] w-full border border-border overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="bezel-inner aspect-[16/10] w-full object-cover"
      />
    </div>
  );
}

export function DepartmentCard({ item }: { item: ContentEntry<Department> }) {
  return (
    <Link
      to={`/departments/${item.slug}`}
      className="group bezel-card flex flex-col justify-between p-7 transition-base"
    >
      <div className="bezel-inner">
        <h3 className="font-display text-2xl transition-fast">{item.data.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-fast">
          {item.data.description}
        </p>
      </div>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-fast btn-magnetic">
        What we do
        <span className="icon-wrapper">
          <ArrowRight className="h-4 w-4 transition-fast" />
        </span>
      </span>
    </Link>
  );
}

export function EventCard({ item }: { item: ContentEntry<EventItem> }) {
  return (
    <Link
      to={`/events/${item.slug}`}
      className="group bezel-card overflow-hidden transition-base"
    >
      <div className="bezel-outer aspect-[16/10] w-full overflow-hidden">
        <Cover src={item.data.cover} alt={item.data.title} />
      </div>

      <div className="bezel-inner p-6">
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
    </Link>
  );
}

export function AbrCard({ item }: { item: ContentEntry<AbrItem> }) {
  return (
    <Link
      to={`/abr/${item.slug}`}
      className="group bezel-card flex gap-6 transition-base"
    >
      <div className="bezel-outer hidden w-40 shrink-0 sm:block">
        <Cover src={item.data.cover} alt={item.data.title} />
      </div>

      <div className="bezel-inner">
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
          className="max-h-20 max-w-full object-contain transition-fast"
        />
      ) : (
        <span className="font-display text-lg text-muted-foreground transition-fast">
          {item.data.name}
        </span>
      )}
    </div>
  );

  const cardClassName = "bezel-card transition-base";

  return item.data.website ? (
    <a
      href={item.data.website}
      target="_blank"
      rel="noreferrer noopener"
      className={cardClassName}
    >
      {content}
    </a>
  ) : (
    <div className={cardClassName}>{content}</div>
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
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`bezel-outer relative border border-border ${className}`}
      onClick={onClick}
    >
      <div className="bezel-inner relative">
        {children}
      </div>
    </div>
  );
}