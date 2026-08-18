import { Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "businessclub@ashoka.edu.in",
    href: "mailto:businessclub@ashoka.edu.in",
  },
  {
    icon: InstagramIcon,
    label: null,
    value: "@ashokabusinessclub",
    href: "https://www.instagram.com/ashokabusinessclub/",
  },
  {
    icon: LinkedInIcon,
    label: null,
    value: "Ashoka Business Club",
    href: "https://www.linkedin.com/company/ashoka-business-club/",
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Talk to the club."
        intro="Questions about membership, sponsorship, speaking or the Business Review — here's where to reach us."
      />

      <section className="container-abc grid gap-14 py-20 md:py-28 md:grid-cols-2">
        <Reveal y={28}>
          <StaggerGroup className="space-y-4">
            {channels.map((c) => (
              <StaggerItem key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="card-lift group flex items-center gap-4 p-6 transition-fast"
                >
                  <c.icon className="h-6 w-6 text-accent shrink-0 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:translate-x-0.5" />
                  <span>
                    {c.label && (
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {c.label}
                      </span>
                    )}
                    <span className="mt-1 block font-medium">{c.value}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>

        <Reveal y={28} delay={0.1}>
          <div className="card-lift h-full p-8">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="mt-4 font-display text-2xl">Ashoka University</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Plot No. 2, Rajiv Gandhi Education City,
              <br />
              Rai, Sonipat, Haryana 131029, India
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Our departments meet weekly during term. Drop us an email and we'll
              point you to the right team.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}