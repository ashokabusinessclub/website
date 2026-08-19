import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ContentEntry,
  EventItem,
  AbrItem,
  Department,
  Sponsor,
  departments as mdDepartments,
  events as mdEvents,
  abrItems as mdAbrItems,
  sponsors as mdSponsors,
} from "./content";

/**
 * Runtime CMS layer.
 *
 * The site is a static build: markdown content is bundled at build time and
 * always available. When `VITE_CMS_URL` is set, this provider additionally
 * fetches the CMS REST API on load and swaps in live content. If the CMS is
 * down, times out, or returns nothing, the bundled markdown simply stays –
 * that is the fallback data source.
 */

const CMS_URL = (import.meta.env.VITE_CMS_URL as string | undefined)?.replace(
  /\/$/,
  "",
);

/** Accept both `https://cms.example.com` and `https://cms.example.com/api`. */
const API_BASE = CMS_URL && (CMS_URL.endsWith("/api") ? CMS_URL : `${CMS_URL}/api`);

const CMS_TIMEOUT_MS = 4000;

export type CmsSource = "cms" | "markdown";

export interface CmsContent {
  departments: ContentEntry<Department>[];
  events: ContentEntry<EventItem>[];
  abrItems: ContentEntry<AbrItem>[];
  sponsors: ContentEntry<Sponsor>[];
  eventCategories: string[];
  abrTypes: string[];
  source: CmsSource;
  loading: boolean;
}

const CmsContext = createContext<CmsContent | null>(null);

/* ---------------- Fetch + normalize ---------------- */

interface CmsDoc {
  slug?: string;
  id?: string | number;
  content?: string;
  [key: string]: unknown;
}

async function fetchCollection(name: string): Promise<CmsDoc[]> {
  const res = await fetch(`${API_BASE}/${name}?limit=0&depth=0`, {
    signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`CMS ${name}: HTTP ${res.status}`);
  const json = (await res.json()) as { docs?: CmsDoc[] };
  return json.docs ?? [];
}

function toEntry<T extends Record<string, unknown>>(
  doc: CmsDoc,
  skip: string[],
): ContentEntry<T> {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (skip.includes(key) || value === undefined || value === null) continue;
    data[key] = value;
  }
  return {
    slug: doc.slug ?? String(doc.id ?? "untitled"),
    data: data as T,
    body: (doc.content ?? "").trim(),
  };
}

function sortBy<T>(items: T[], key: (item: T) => number | string, dir: 1 | -1 = 1) {
  return [...items].sort((a, b) => {
    const av = key(a);
    const bv = key(b);
    return (av < bv ? -1 : av > bv ? 1 : 0) * dir;
  });
}

/* ---------------- Provider ---------------- */

export function CmsProvider({ children }: { children: ReactNode }) {
  const enabled = Boolean(API_BASE);

  const departmentsQuery = useQuery({
    queryKey: ["cms", "departments"],
    queryFn: () => fetchCollection("departments"),
    enabled,
    staleTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const eventsQuery = useQuery({
    queryKey: ["cms", "events"],
    queryFn: () => fetchCollection("events"),
    enabled,
    staleTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const abrQuery = useQuery({
    queryKey: ["cms", "abr-items"],
    queryFn: () => fetchCollection("abr-items"),
    enabled,
    staleTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const sponsorsQuery = useQuery({
    queryKey: ["cms", "sponsors"],
    queryFn: () => fetchCollection("sponsors"),
    enabled,
    staleTime: 5 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const value = useMemo<CmsContent>(() => {
    const deptDocs = departmentsQuery.data;
    const eventDocs = eventsQuery.data;
    const abrDocs = abrQuery.data;
    const sponsorDocs = sponsorsQuery.data;

    const departments = deptDocs
      ? sortBy(
          deptDocs.map((d) => toEntry<Department>(d, ["content"])),
          (d) => (d.data.order ?? 99) as number,
        )
      : mdDepartments;

    const events = eventDocs
      ? sortBy(
          eventDocs.map((e) => toEntry<EventItem>(e, ["content"])),
          (e) => e.data.date ?? "",
          -1,
        )
      : mdEvents;

    const abrItems = abrDocs
      ? sortBy(
          abrDocs.map((a) => toEntry<AbrItem>(a, ["content"])),
          (a) => a.data.date ?? "",
          -1,
        )
      : mdAbrItems;

    const sponsors = sponsorDocs
      ? sortBy(
          sponsorDocs.map((s) => toEntry<Sponsor>(s, ["content"])),
          (s) => (s.data.order ?? 99) as number,
        )
      : mdSponsors;

    const eventCategories = Array.from(
      new Set(events.map((e) => e.data.category).filter(Boolean) as string[]),
    );
    const abrTypes = Array.from(
      new Set(abrItems.map((i) => i.data.type ?? "Publication")),
    );

    const source: CmsSource =
      deptDocs || eventDocs || abrDocs || sponsorDocs ? "cms" : "markdown";

    return {
      departments,
      events,
      abrItems,
      sponsors,
      eventCategories,
      abrTypes,
      source,
      loading: enabled && (departmentsQuery.isFetching || eventsQuery.isFetching || abrQuery.isFetching || sponsorsQuery.isFetching),
    };
  }, [
    departmentsQuery.data,
    departmentsQuery.isFetching,
    eventsQuery.data,
    eventsQuery.isFetching,
    abrQuery.data,
    abrQuery.isFetching,
    sponsorsQuery.data,
    sponsorsQuery.isFetching,
    enabled,
  ]);

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCmsContent(): CmsContent {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error("useCmsContent must be used within a <CmsProvider>");
  }
  return ctx;
}