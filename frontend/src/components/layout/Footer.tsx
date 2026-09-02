import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "./Navbar";
import { Reveal } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

const EMAIL = "businessclub@ashoka.edu.in";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-cream/15 bg-brand-green text-brand-cream">
      {/* ── Directory ── */}
      <div className="container-abc grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <Reveal>
          <div>
            <Link to="/" className="inline-flex" aria-label="Ashoka Business Club Home">
              <img
                src="/brand-logo.png"
                alt="Ashoka Business Club"
                className="h-12 w-52 border border-brand-cream/55 bg-brand-cream object-contain px-2 py-1"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-brand-cream/65">
              A student-run community at Ashoka University building business
              fluency through research, dialogue and flagship events.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-flex items-center gap-1.5 font-display text-lg font-semibold tracking-tight transition-fast hover:text-white md:text-xl"
            >
              {EMAIL}
              <ArrowUpRight className="h-4 w-4 text-brand-cream" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-brand-cream/45">
              Navigate
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l, i) => (
                <li key={l.to}>
                  {l.children ? (
                    <div>
                      <span className="group inline-flex items-center gap-2 text-sm text-brand-cream/70">
                        <span className="index-num text-[0.6rem] text-brand-cream/55">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </span>
                      <ul className="ml-6 mt-1 space-y-1.5">
                        {l.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              className="group inline-flex items-center gap-2 text-sm text-brand-cream/55 transition-fast hover:text-white"
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
                      className="group inline-flex items-center gap-2 text-sm text-brand-cream/70 transition-fast hover:text-white"
                    >
                      <span className="index-num text-[0.6rem] text-brand-cream/55 transition-fast group-hover:text-white">
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
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-brand-cream/45">
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
                    className="group inline-flex items-center gap-2.5 text-sm text-brand-cream/70 transition-fast hover:text-white"
                  >
                    <m.icon className="h-3.5 w-3.5 text-brand-cream/50 transition-fast group-hover:text-white" />
                    {m.label}
                    <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-[transform,opacity,color] duration-300 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:text-white group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 text-sm text-brand-cream/70 transition-fast hover:text-white"
                >
                  <span className="h-3.5 w-3.5 rounded-full border border-brand-cream/45 transition-fast group-hover:border-white" />
                  Press & partnerships
                </Link>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-brand-cream/45">
              Address
            </p>
            <address className="mt-5 space-y-1 text-sm not-italic leading-relaxed text-brand-cream/70">
              <p>Ashoka University</p>
              <p>Plot No. 2, Rajiv Gandhi Education City,</p>
              <p>Rai, Sonipat, Haryana 131029</p>
            </address>
            <p className="mt-6 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-brand-cream/45">
              Recruitment
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-cream/70">
              Applications open at the start of each semester.
            </p>
            <Link
              to="/what-awaits-you"
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white link-underline"
            >
              Join the club
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ── Oversized wordmark strip ── */}
      <div aria-hidden="true" className="select-none overflow-hidden border-t border-brand-cream/15">
        <Reveal y={40}>
          <div className="footer-wordmark-track">
            <span className="whitespace-nowrap pr-[0.18em] font-display font-bold leading-[0.82] tracking-[-0.04em] text-brand-cream/[0.08] [font-size:11.5vw]">
              ASHOKA BUSINESS CLUB
            </span>
            <span className="whitespace-nowrap pr-[0.18em] font-display font-bold leading-[0.82] tracking-[-0.04em] text-brand-cream/[0.08] [font-size:11.5vw]">
              ASHOKA BUSINESS CLUB
            </span>
          </div>
        </Reveal>
      </div>

      {/* ── Legal bar ── */}
      <div className="border-t border-brand-cream/15">
        <div className="container-abc flex flex-col gap-2 py-5 text-[0.7rem] uppercase tracking-[0.14em] text-brand-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ashoka Business Club</span>
          <span>Built by students, for students</span>
          <span>Sonipat, IN</span>
        </div>
      </div>
    </footer>
  );
}
