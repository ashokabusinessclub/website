import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Tag } from "lucide-react";
import { formatDate } from "@/lib/content";
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
      <header className="border-b border-border bg-secondary/50">
        <div className="container-abc py-16 md:py-20">
          <Reveal y={16}>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-fast"
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
          </Reveal>
        </div>
      </header>

      {event.data.cover && (
        <div className="container-abc pt-12">
          <Reveal y={28}>
            <div className="card-lift aspect-video max-h-[520px] overflow-hidden">
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
            <p className="mb-8 border-l border-accent/70 pl-5 text-lg leading-relaxed text-muted-foreground">
              {event.data.description}
            </p>
          )}
          <Markdown>{event.body}</Markdown>

          {event.data.applyUrl && (
            <Reveal y={24}>
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
            </Reveal>
          )}
        </Reveal>

        {related.length > 0 && (
          <section className="mt-16">
            <Reveal y={20}>
              <div className="border-t border-border py-12">
                <h2 className="font-display text-2xl">More events</h2>
              </div>
            </Reveal>
            <StaggerGroup className="grid gap-6 md:grid-cols-3">
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