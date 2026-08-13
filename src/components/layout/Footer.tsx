import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "./Navbar";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="mt-24 border-t border-border bg-ink text-background"
    >
      <div className="container-abc grid gap-12 py-16 md:grid-cols-3">
        <div
          className={`reveal-up transition-base ${isVisible ? "is-visible" : ""}`}
        >
          <p className="font-display text-3xl font-black tracking-tight">ABC</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-background/60">
            Ashoka Business Club
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/70">
            A student-run community at Ashoka University building business
            fluency through research, dialogue and flagship events.
          </p>
        </div>

        <div
          className={`reveal-up transition-base ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "80ms" }}
        >
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
        </div>

        <div
          className={`reveal-up transition-base ${isVisible ? "is-visible" : ""}`}
          style={{ transitionDelay: "160ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">
            Reach us
          </p>
          <ul className="mt-5 space-y-2.5 text-sm text-background/75">
            <li>Ashoka University, Rajiv Gandhi Education City, Sonipat</li>
            <li>businessclub@ashoka.edu.in</li>
            <li>Instagram · LinkedIn</li>
          </ul>
        </div>
      </div>

      <div
        className={`border-t border-background/10 py-6 ${isVisible ? "animate-entry-fast" : ""}`}
      >
        <div className="container-abc flex flex-col gap-2 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Ashoka Business Club</span>
          <span>Built by students, for students.</span>
        </div>
      </div>
    </footer>
  );
}