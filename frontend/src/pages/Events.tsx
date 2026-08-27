import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  max,
  min,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin, CalendarDays, ExternalLink, CalendarPlus } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/reveal";
import { useCmsContent } from "@/lib/cms";
import { gcalUrl } from "@/lib/content";
import type { ContentEntry, EventItem } from "@/lib/content";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const CATEGORY_COLORS: Record<string, string> = {
  Flagship: "bg-primary",
  Publication: "bg-blue-500",
  "Speaker Series": "bg-emerald-500",
  Competition: "bg-amber-500",
  Workshop: "bg-purple-500",
};

const chipClass =
  "flex w-full items-center gap-1 overflow-hidden rounded-sm px-1 py-0.5 text-left text-[0.6rem] font-medium leading-tight text-background/90 transition-fast hover:bg-background/25";

function categoryDot(category?: string) {
  return CATEGORY_COLORS[category ?? ""] ?? "bg-foreground/50";
}

export default function Events() {
  const { events } = useCmsContent();
  const reduce = useReducedMotion();
  const [direction, setDirection] = useState(0);

  /* Events indexed by yyyy-MM-dd */
  const eventsByDay = useMemo(() => {
    const map = new Map<string, ContentEntry<EventItem>[]>();
    for (const e of events) {
      const d = parseISO(e.data.date);
      if (Number.isNaN(d.getTime())) continue;
      const key = format(d, "yyyy-MM-dd");
      map.set(key, [...(map.get(key) ?? []), e]);
    }
    return map;
  }, [events]);

  /* Navigable span: one month of padding around the first/last event */
  const { minMonth, maxMonth } = useMemo(() => {
    const valid = events
      .map((e) => parseISO(e.data.date))
      .filter((d) => !Number.isNaN(d.getTime()));
    if (valid.length === 0) {
      const now = startOfMonth(new Date());
      return { minMonth: subMonths(now, 6), maxMonth: addMonths(now, 6) };
    }
    return {
      minMonth: subMonths(startOfMonth(min(valid)), 1),
      maxMonth: addMonths(startOfMonth(max(valid)), 1),
    };
  }, [events]);

  /* Land on the next upcoming event's month, else the latest one */
  const anchorMonth = useMemo(() => {
    const all = events
      .map((e) => parseISO(e.data.date))
      .filter((d) => !Number.isNaN(d.getTime()));
    if (all.length === 0) return startOfMonth(new Date());
    const future = all.filter((d) => d >= new Date());
    return startOfMonth(future.length > 0 ? min(future) : max(all));
  }, [events]);
  const [viewDate, setViewDate] = useState(anchorMonth);

  const monthKey = format(viewDate, "yyyy-MM");

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 }),
      }),
    [viewDate]
  );

  const monthEvents = useMemo(() => {
    const items = days
      .flatMap((d) => eventsByDay.get(format(d, "yyyy-MM-dd")) ?? [])
      .filter((e, i, arr) => arr.findIndex((x) => x.slug === e.slug) === i);
    return items.sort(
      (a, b) =>
        parseISO(a.data.date).getTime() - parseISO(b.data.date).getTime()
    );
  }, [days, eventsByDay]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(events.map((e) => e.data.category).filter(Boolean) as string[])
      ),
    [events]
  );

  const navigate = (dir: 1 | -1) => {
    setDirection(dir);
    setViewDate((d) => {
      const next = addMonths(d, dir);
      return next.getTime() < minMonth.getTime()
        ? minMonth
        : next.getTime() > maxMonth.getTime()
          ? maxMonth
          : next;
    });
  };

  const canPrev = startOfMonth(viewDate).getTime() > minMonth.getTime();
  const canNext = startOfMonth(viewDate).getTime() < maxMonth.getTime();

  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Flagships, sessions and the odd late-night build."
        intro="The club's year on one calendar — flip through the months to see what we have staged and what is coming up."
        scrubIntro
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href="https://calendar.google.com/calendar/u/0/r?cid=abc-events@ashoka.edu.in"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary transition-fast hover:bg-primary/20"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Sync to Google Calendar
            <ExternalLink className="h-3 w-3" />
          </a>
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-foreground/45"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${categoryDot(c)}`} />
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </PageHeader>

      <section className="container-abc py-14 md:py-20">
        <Reveal>
          <div className="rounded-lg border border-border bg-card shadow-[var(--shadow-ambient)]">
            {/* Calendar toolbar */}
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
              <div className="relative h-8 min-w-0 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={monthKey}
                    initial={reduce ? false : { opacity: 0, x: direction * -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: direction * 24 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-xl font-bold sm:text-2xl"
                  >
                    {format(viewDate, "MMMM yyyy")}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={!canPrev}
                  aria-label="Previous month"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/60 transition-fast hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  disabled={!canNext}
                  aria-label="Next month"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/60 transition-fast hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Weekday header */}
            <div className="grid grid-cols-7 border-b border-border px-2 pt-3 sm:px-4">
              {WEEKDAYS.map((w) => (
                <div
                  key={w}
                  className="pb-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-foreground/35"
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Month grid */}
            <div className="p-2 sm:p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={monthKey}
                  initial={reduce ? false : { opacity: 0, x: direction * -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: direction * 32 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-7 gap-1 sm:gap-1.5"
                >
                  {days.map((day) => {
                    const key = format(day, "yyyy-MM-dd");
                    const dayEvents = eventsByDay.get(key) ?? [];
                    const inMonth = isSameMonth(day, viewDate);
                    const hidden = dayEvents.length - 2;

                    return (
                      <div
                        key={key}
                        className={`flex min-h-[64px] flex-col gap-1 rounded-md p-1.5 transition-fast sm:min-h-[96px] sm:p-2 ${
                          inMonth ? "" : "opacity-35"
                        } ${dayEvents.length > 0 ? "bg-secondary/40" : ""}`}
                      >
                        <span
                          className={`text-[0.65rem] font-medium sm:text-[0.75rem] ${
                            isToday(day)
                              ? "flex h-5 w-5 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
                              : inMonth
                                ? "text-foreground/60"
                                : "text-foreground/30"
                          }`}
                        >
                          {format(day, "d")}
                        </span>

                        <div className="flex flex-col gap-1">
                          {dayEvents.slice(0, 2).map((ev) => (
                            <Link
                              key={ev.slug}
                              to={`/events/${ev.slug}`}
                              title={`${ev.data.title}${ev.data.category ? ` — ${ev.data.category}` : ""}`}
                              className={`group/chip rounded-sm bg-secondary/70 px-1 py-0.5 transition-fast hover:bg-secondary ${chipClass}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 shrink-0 rounded-full ${categoryDot(ev.data.category)}`}
                              />
                              <span className="truncate text-foreground/80 group-hover/chip:text-foreground">
                                {ev.data.title}
                              </span>
                            </Link>
                          ))}
                          {hidden > 0 && (
                            <span className="px-1 text-[0.55rem] font-medium text-foreground/40">
                              +{hidden} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Month agenda */}
        <div className="mt-12 md:mt-16">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`agenda-${monthKey}`}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-lg font-semibold">
                What's on in {format(viewDate, "MMMM")}
              </h3>

              {monthEvents.length === 0 ? (
                <p className="mt-4 text-[0.85rem] text-foreground/40">
                  Nothing on the calendar this month — try flipping forward or back.
                </p>
              ) : (
                <ul className="mt-5 divide-y divide-border border-y border-border">
                  {monthEvents.map((e) => {
                    const d = parseISO(e.data.date);
                    return (
                      <li key={e.slug} className="relative">
                        <Link
                          to={`/events/${e.slug}`}
                          className="group flex items-center gap-5 py-4 transition-fast hover:bg-secondary/30 sm:px-3"
                        >
                          <div className="flex w-12 shrink-0 flex-col items-center border-r border-border pr-4 text-center">
                            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-foreground/40">
                              {format(d, "EEE")}
                            </span>
                            <span className="mt-0.5 font-display text-xl font-bold leading-none">
                              {format(d, "d")}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h4 className="font-display text-base font-semibold transition-fast group-hover:text-primary">
                                {e.data.title}
                              </h4>
                              {e.data.category && (
                                <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-foreground/45">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${categoryDot(e.data.category)}`}
                                  />
                                  {e.data.category}
                                </span>
                              )}
                            </div>
                            {e.data.location && (
                              <div className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-foreground/35">
                                <MapPin className="h-3 w-3" />
                                {e.data.location}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-foreground/25 transition-fast group-hover:translate-x-0.5 group-hover:text-primary" />
                        </Link>
                        {gcalUrl({ title: e.data.title, date: e.data.date, description: e.data.description, location: e.data.location }) && (
                          <a
                            href={gcalUrl({ title: e.data.title, date: e.data.date, description: e.data.description, location: e.data.location })!}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={(ev) => ev.stopPropagation()}
                            title="Add to Google Calendar"
                            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-md text-foreground/25 transition-fast hover:bg-secondary hover:text-primary sm:right-4"
                          >
                            <CalendarPlus className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

    </>
  );
}
