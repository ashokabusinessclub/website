import { Link } from "react-router-dom";
import { navLinks } from "./Navbar";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";
import { InstagramIcon, LinkedInIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-background">
      <div className="container-abc py-16">
        <StaggerGroup className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          <StaggerItem>
            <p className="font-display text-3xl font-black tracking-tight">ABC</p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-background/60">
              Ashoka Business Club
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/70">
              A student-run community at Ashoka University building business
              fluency through research, dialogue and flagship events.
            </p>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">
              Explore
            </p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-background/75 transition-fast hover:text-brass"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">
              Reach us
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-background/75">
              <li>Ashoka University, Rajiv Gandhi Education City, Sonipat</li>
              <li>
                <a
                  href="mailto:businessclub@ashoka.edu.in"
                  className="transition-fast hover:text-brass"
                >
                  businessclub@ashoka.edu.in
                </a>
              </li>
              <li className="flex items-center gap-5 pt-1">
                <a
                  href="https://www.instagram.com/ashokabusinessclub/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="text-background/75 transition-fast hover:text-brass"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ashoka-business-club/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="text-background/75 transition-fast hover:text-brass"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </StaggerItem>
        </StaggerGroup>
      </div>

      <div className="border-t border-background/10 py-6">
        <Reveal y={12}>
          <div className="container-abc flex flex-col gap-2 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ashoka Business Club</span>
            <span>Built by students, for students.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}