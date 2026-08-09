import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import { getEvent, formatDate, events } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { EventCard } from "@/components/cards";
import NotFound from "./NotFound";

export default function EventDetail() {
  const { slug } = useParams();
  const event = slug ? getEvent(slug) : undefined;

  if (!event) return <NotFound />;

  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <article>
      <header className="border-b border-border bg-secondary/50">
        <div className="container-abc py-16 md:py-20">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {event.data.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              {formatDate(event.data.date)}
            </span>
            {event.data.category && (
              <span className="inline-flex items-center gap-2">
                <Tag className="h-4 w-4 text-accent" />
                {event.data.category}
              </span>
            )}
            {event.data.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                {event.data.location}
              </span>
            )}
          </div>
        </div>
      </header>

      {event.data.cover && (
        <div className="container-abc pt-12">
          <img
            src={event.data.cover}
            alt={event.data.title}
            className="max-h-[520px] w-full object-cover"
          />
        </div>
      )}

      <div className="container-abc max-w-3xl py-16">
        {event.data.description && (
          <p className="mb-8 border-l-2 border-accent pl-5 text-lg leading-relaxed text-muted-foreground">
            {event.data.description}
          </p>
        )}
        <Markdown>{event.body}</Markdown>
      </div>

      {related.length > 0 && (
        <section className="container-abc border-t border-border py-16">
          <p className="eyebrow">More events</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.slug} item={e} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
