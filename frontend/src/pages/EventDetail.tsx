import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Tag, CalendarPlus } from "lucide-react";
import { formatDate, gcalUrl } from "@/lib/content";
import { useCmsContent } from "@/lib/cms";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/cards";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import NotFound from "./NotFound";

export default function EventDetail() {
  const { events } = useCmsContent();
  const { slug } = useParams();
  const event = slug ? events.find((e) => e.slug === slug) : undefined;

  if (!event) return <NotFound />;

  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-border bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/3 h-[300px] w-[400px] rounded-full bg-primary/[0.04] blur-[120px]"
        />
        <div className="container-abc relative py-16 md:py-20">
          <Reveal y={16}>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm text-foreground/40 hover:text-primary transition-fast"
            >
              <ArrowLeft className="h-4 w-4" /> All events
            </Link>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {event.data.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-foreground/40">
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                {formatDate(event.data.date)}
              </span>
              {event.data.category && (
                <span className="inline-flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  {event.data.category}
                </span>
              )}
              {event.data.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.data.location}
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </header>

      {event.data.cover && (
        <div className="container-abc pt-10">
          <Reveal y={28}>
            <div className="aspect-video max-h-[520px] overflow-hidden rounded-lg border border-border">
              <img
                src={event.data.cover}
                alt={event.data.title}
                className="aspect-video w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      )}

      <div className="container-abc max-w-3xl py-16">
        <Reveal y={20}>
          {event.data.description && (
            <p className="mb-8 border-l-2 border-primary/30 pl-5 text-lg leading-relaxed text-foreground/50">
              {event.data.description}
            </p>
          )}
          <Markdown>{event.body}</Markdown>

          {event.data.applyUrl && (
            <div className="mt-12 flex justify-center">
              <Button
                asChild
                size="lg"
                iconRight={<ArrowUpRight className="h-4 w-4" />}
              >
                <a
                  href={event.data.applyUrl as string}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Apply Here
                </a>
              </Button>
            </div>
          )}

          {gcalUrl({ title: event.data.title, date: event.data.date, description: event.data.description, location: event.data.location }) && (
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                asChild
                size="lg"
                iconRight={<CalendarPlus className="h-4 w-4" />}
              >
                <a
                  href={gcalUrl({ title: event.data.title, date: event.data.date, description: event.data.description, location: event.data.location })!}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Add to Google Calendar
                </a>
              </Button>
            </div>
          )}
        </Reveal>

        {related.length > 0 && (
          <section className="mt-16">
            <div className="section-divider mb-12" />
            <Reveal y={20}>
              <h2 className="font-display text-2xl font-bold">More events</h2>
            </Reveal>
            <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((e) => (
                <StaggerItem key={e.slug}>
                  <EventCard item={e} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        )}
      </div>
    </article>
  );
}
