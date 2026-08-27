import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "./Navbar";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

const EMAIL = "businessclub@ashoka.edu.in";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* ── Directory ── */}
      <div className="container-abc grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <Reveal>
          <div>
            <Link
              to="/"
              className="inline-flex items-baseline gap-3"
              aria-label="Ashoka Business Club Home"
            >
              <span className="flex h-10 w-10 items-center justify-center bg-primary font-display text-sm font-bold tracking-tight text-primary-foreground">
                ABC
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-foreground/60">
                Ashoka Business Club
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-foreground/45">
              A student-run community at Ashoka University building business
              fluency through research, dialogue and flagship events.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight transition-fast hover:text-primary md:text-xl"
            >
              {EMAIL}
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Navigate
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l, i) => (
                <li key={l.to}>
                  {l.children ? (
                    <div>
                      <span className="group inline-flex items-center gap-2 text-sm text-foreground/55">
                        <span className="index-num text-[0.6rem] text-primary/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </span>
                      <ul className="ml-6 mt-1 space-y-1.5">
                        {l.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              className="group inline-flex items-center gap-2 text-sm text-foreground/40 transition-fast hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-2 text-sm text-foreground/55 transition-fast hover:text-primary"
                    >
                      <span className="index-num text-[0.6rem] text-primary/50 transition-fast group-hover:text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Media
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/ashokabusinessclub/",
                  icon: InstagramIcon,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/ashoka-business-club/",
                  icon: LinkedInIcon,
                },
              ].map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2.5 text-sm text-foreground/55 transition-fast hover:text-primary"
                  >
                    <m.icon className="h-3.5 w-3.5 text-foreground/35 transition-fast group-hover:text-primary" />
                    {m.label}
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 text-sm text-foreground/55 transition-fast hover:text-primary"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-foreground/35 transition-fast group-hover:border-primary" />
                  Press & partnerships
                </Link>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Address
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-foreground/55">
              <p>Ashoka University</p>
              <p>Plot No. 2, Rajiv Gandhi Education City,</p>
              <p>Rai, Sonipat, Haryana 131029</p>
            </address>
            <p className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Recruitment
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              Applications open at the start of each semester.
            </p>
            <Link
              to="/what-awaits-you"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary link-underline"
            >
              Join the club
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ── Oversized wordmark strip ── */}
      <div aria-hidden="true" className="select-none overflow-hidden border-t border-border">
        <Reveal y={40}>
          <p className="whitespace-nowrap text-center font-display font-bold leading-[0.82] tracking-[-0.04em] text-foreground/[0.07] [font-size:11.5vw]">
            ASHOKA BUSINESS CLUB
          </p>
        </Reveal>
      </div>

      {/* ── Legal bar ── */}
      <div className="border-t border-border/60">
        <div className="container-abc flex flex-col gap-2 py-5 text-[0.7rem] uppercase tracking-[0.14em] text-foreground/30 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ashoka Business Club</span>
          <span>Built by students, for students</span>
          <span>Sonipat, IN</span>
        </div>
      </div>
    </footer>
  );
}
