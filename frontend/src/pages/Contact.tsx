import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const EMAIL = "businessclub@ashoka.edu.in";
const ASHOKA_COORDS = {
  lat: 28.9470078,
  lon: 77.1012554,
};
const ADDRESS = [
  "Plot No. 2, Rajiv Gandhi Education City,",
  "Rai, Sonipat, Haryana 131029, India",
];

const INSTAGRAM_URL = "https://www.instagram.com/ashokabusinessclub/";
const LINKEDIN_URL = "https://www.linkedin.com/company/ashoka-business-club/";
const APPLE_MAPS_URL = "https://maps.apple.com/?q=Ashoka+University+Sonipat";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${ASHOKA_COORDS.lat},${ASHOKA_COORDS.lon}`;
const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${ASHOKA_COORDS.lat},${ASHOKA_COORDS.lon}&t=m&z=15&output=embed&hl=en`;
const OPENSTREETMAP_URL = `https://www.openstreetmap.org/?mlat=${ASHOKA_COORDS.lat}&mlon=${ASHOKA_COORDS.lon}#map=15/${ASHOKA_COORDS.lat}/${ASHOKA_COORDS.lon}`;
const OPENSTREETMAP_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=77.0812554%2C28.9270078%2C77.1212554%2C28.9670078&layer=mapnik&marker=${ASHOKA_COORDS.lat}%2C${ASHOKA_COORDS.lon}`;

const channels = [
  {
    id: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    external: false,
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@ashokabusinessclub",
    href: INSTAGRAM_URL,
    icon: InstagramIcon,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Ashoka Business Club",
    href: LINKEDIN_URL,
    icon: LinkedInIcon,
    external: true,
  },
];

function CampusMap() {
  const [mapSource, setMapSource] = useState<"google" | "openstreetmap">("google");
  const [mapReady, setMapReady] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (mapSource !== "google" || mapReady) return undefined;

    const timeout = window.setTimeout(() => {
      setMapSource("openstreetmap");
      setMapReady(false);
      setShowFallback(true);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [mapSource, mapReady]);

  const iframeSrc = mapSource === "google" ? GOOGLE_MAPS_EMBED_URL : OPENSTREETMAP_EMBED_URL;
  const providerName = mapSource === "google" ? "Google Maps" : "OpenStreetMap";

  return (
    <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
      <iframe
        key={mapSource}
        src={iframeSrc}
        title={`${providerName} map showing Ashoka University, Sonipat`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => {
          setMapReady(true);
          setShowFallback(false);
        }}
        onError={() => {
          if (mapSource === "google") {
            setMapSource("openstreetmap");
            setMapReady(false);
          } else {
            setShowFallback(true);
          }
        }}
        className="absolute inset-0 h-[118%] w-[118%] -translate-x-[9%] -translate-y-[9%] border-0 [filter:sepia(.22)_saturate(.55)_brightness(1.06)_contrast(.88)_hue-rotate(4deg)] dark:[filter:invert(.9)_hue-rotate(180deg)_saturate(.78)_contrast(.92)]"
      />
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-[var(--shadow-ambient)] backdrop-blur-sm">
        <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Ashoka University
      </div>
      {showFallback && (
        <div className="absolute inset-0 flex items-end bg-background/80 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-elevated)]">
            <p className="text-sm font-semibold">Map preview is taking a moment.</p>
            <p className="mt-1 text-xs leading-relaxed text-foreground/45">
              Open the campus location directly in your preferred maps app.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={OPENSTREETMAP_URL} target="_blank" rel="noreferrer noopener">
                  OpenStreetMap
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer noopener">
                  Google Maps
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Talk to Ashoka Business Club."
        intro="Membership, partnerships, sponsorship, events, speakers, or the Ashoka Business Review — write to us and we'll point you to the right team."
      />

      <section className="container-abc py-14 md:py-20" aria-label="Contact details">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div
              id="contact-methods"
              className="h-full overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-ambient)]"
            >
              <div className="border-b border-border px-6 py-5">
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
                  Direct lines
                </p>
                <p className="mt-1 text-[0.8rem] text-foreground/40">
                  Drop us a message and we'll point you to the right team.
                </p>
              </div>
              <ul className="divide-y divide-border">
                {channels.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.href}
                      target={c.external ? "_blank" : undefined}
                      rel={c.external ? "noreferrer noopener" : undefined}
                      aria-label={`${c.label}: ${c.value}`}
                      className="group flex items-center gap-4 px-6 py-4 transition-fast hover:bg-secondary/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-foreground/30">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block whitespace-nowrap text-sm font-medium">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <section
              aria-labelledby="visit-us"
              className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-ambient)]"
            >
              <CampusMap />
              <div className="flex flex-col gap-5 border-t border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
                    Where to find us
                  </p>
                  <h2
                    id="visit-us"
                    className="mt-2 font-display text-xl font-bold sm:text-2xl"
                  >
                    Ashoka University
                  </h2>
                  <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-foreground/45">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      {ADDRESS[0]}
                      <br />
                      {ADDRESS[1]}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconRight={<ArrowUpRight className="h-4 w-4" />}
                  >
                    <a href={APPLE_MAPS_URL} target="_blank" rel="noreferrer noopener">
                      Apple Maps
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconRight={<ArrowUpRight className="h-4 w-4" />}
                  >
                    <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer noopener">
                      Google Maps
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconRight={<ArrowUpRight className="h-4 w-4" />}
                  >
                    <a href={OPENSTREETMAP_URL} target="_blank" rel="noreferrer noopener">
                      OpenStreetMap
                    </a>
                  </Button>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </section>
    </>
  );
}
