import { Mail, MapPin, Instagram, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "businessclub@ashoka.edu.in",
    href: "mailto:businessclub@ashoka.edu.in",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@ashokabusinessclub",
    href: "https://instagram.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Ashoka Business Club",
    href: "https://linkedin.com",
  },
];

export default function Contact() {
  return (
    <>
      <PageHeader
        title="Talk to the club."
        intro="Questions about membership, sponsorship, speaking or the Business Review — here's where to reach us."
      />

      <section className="container-abc grid gap-14 py-24 md:py-32 md:grid-cols-2">
        <Reveal y={28}>
          <StaggerGroup className="space-y-4">
            {channels.map((c) => (
              <StaggerItem key={c.label}>
                <div className="bezel-outer">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="bezel-inner flex items-center gap-4 p-6 transition-base hover:border-accent"
                  >
                    <c.icon className="h-5 w-5 text-accent shrink-0" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {c.label}
                      </span>
                      <span className="mt-1 block font-medium">{c.value}</span>
                    </span>
                  </a>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>

        <Reveal y={28} delay={0.1}>
          <div className="bezel-outer h-full p-8">
            <div className="bezel-inner h-full p-8">
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
          </div>
        </Reveal>
      </section>
    </>
  );
}