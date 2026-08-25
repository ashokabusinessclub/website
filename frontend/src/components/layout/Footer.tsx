import { Link } from "react-router-dom";
import { navLinks } from "./Navbar";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-abc py-16 md:py-20">
        <StaggerGroup className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <StaggerItem className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Ashoka Business Club Home">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-sm font-bold tracking-tight">
                ABC
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-foreground/60">
                Ashoka Business Club
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/45">
              A student-run community at Ashoka University building business
              fluency through research, dialogue and flagship events.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/ashokabusinessclub/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/40 transition-fast hover:border-primary/40 hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/ashoka-business-club/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/40 transition-fast hover:border-primary/40 hover:text-primary"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/50 transition-fast hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-foreground/30">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-foreground/50">
              <li>Ashoka University, Rajiv Gandhi Education City, Sonipat</li>
              <li>
                <a
                  href="mailto:businessclub@ashoka.edu.in"
                  className="transition-fast hover:text-primary"
                >
                  businessclub@ashoka.edu.in
                </a>
              </li>
            </ul>
          </StaggerItem>
        </StaggerGroup>
      </div>

      <div className="border-t border-border/50 py-6">
        <Reveal y={8}>
          <div className="container-abc flex flex-col gap-2 text-xs text-foreground/25 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ashoka Business Club. All rights reserved.</span>
            <span>Built by students, for students.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
