import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const EMAIL = "businessclub@ashoka.edu.in";
const ADDRESS = [
  "Plot No. 2, Rajiv Gandhi Education City,",
  "Rai, Sonipat, Haryana 131029, India",
];

const INSTAGRAM_URL = "https://www.instagram.com/ashokabusinessclub/";
const LINKEDIN_URL = "https://www.linkedin.com/company/ashoka-business-club/";
const APPLE_MAPS_URL = "https://maps.apple.com/?q=Ashoka+University+Sonipat";

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

const presidents = [
  {
    name: "Avinash Rai",
    initials: "AR",
    phone: "+91 93302 97893",
    phoneHref: "tel:+919330297893",
    email: "avinash.rai_ug2024@ashoka.edu.in",
  },
  {
    name: "Swastika Arora",
    initials: "SA",
    phone: "+91 98362 81297",
    phoneHref: "tel:+919836281297",
    email: "swastika.arora_ug2024@ashoka.edu.in",
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Reach Us"
        title="Talk to Ashoka Business Club."
        intro="Membership, partnerships, sponsorship, events, speakers, or the Ashoka Business Review — write to us and we'll point you to the right team."
      />

      {/* Contact methods + address */}
      <section className="container-abc py-16 md:py-24" aria-label="Contact details">
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div
              id="contact-methods"
              className="h-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-ambient)]"
            >
              <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between lg:flex-col lg:items-start lg:gap-2 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Direct lines
                </p>
                <p className="text-xs text-muted-foreground">
                  Drop us an email and we'll point you to the right team.
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
                      className="group flex items-center gap-4 px-5 py-4 transition-fast hover:bg-secondary/40 sm:px-6"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-accent">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {c.label}
                        </span>
                        <span className="mt-0.5 block whitespace-nowrap font-medium">
                          {c.value}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
                {presidents.map((p) => (
                  <li key={p.name}>
                    <div className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-semibold text-brass"
                          aria-hidden="true"
                        >
                          {p.initials}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {p.name}
                          </span>
                          <span className="mt-0.5 block font-medium">
                            President
                          </span>
                        </span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <a
                          href={p.phoneHref}
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-fast hover:text-primary"
                        >
                          <Phone className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                          {p.phone}
                        </a>
                        <a
                          href={`mailto:${p.email}`}
                          className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-muted-foreground transition-fast hover:text-primary"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                          <span className="whitespace-nowrap">{p.email}</span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <section
              aria-labelledby="visit-us"
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-ambient)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
                <iframe
                  src="https://maps.google.com/maps?q=28.9470078,77.1012554&t=m&z=15&output=embed&hl=en"
                  title="Map showing Ashoka University, Sonipat"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-[118%] w-[118%] -translate-x-[9%] -translate-y-[9%] border-0 [filter:sepia(.22)_saturate(.55)_brightness(1.06)_contrast(.88)_hue-rotate(4deg)] dark:[filter:invert(.9)_hue-rotate(180deg)_saturate(.78)_contrast(.92)]"
                />
                <div
                  className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border"
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-[var(--shadow-ambient)] backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  Ashoka University
                </div>
              </div>
              <div className="flex flex-col gap-5 border-t border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Where to find us
                  </p>
                  <h2
                    id="visit-us"
                    className="mt-2 font-display text-2xl tracking-tight sm:text-[1.75rem]"
                  >
                    Ashoka University
                  </h2>
                  <p className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>
                      {ADDRESS[0]}
                      <br />
                      {ADDRESS[1]}
                    </span>
                  </p>
                </div>
                <div className="shrink-0">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconRight={<ArrowUpRight className="h-4 w-4" />}
                  >
                    <a href={APPLE_MAPS_URL} target="_blank" rel="noreferrer noopener">
                      Get directions
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
