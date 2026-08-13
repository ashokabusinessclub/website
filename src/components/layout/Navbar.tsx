import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";

export const navLinks = [
  { to: "/about", label: "About Us" },
  { to: "/departments", label: "Departments" },
  { to: "/abr", label: "ABR" },
  { to: "/events", label: "Notable Events" },
  { to: "/sponsors", label: "Past Sponsors" },
  { to: "/what-awaits-you", label: "What Awaits You" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [linkStates, setLinkStates] = useState<Record<string, boolean>>({});
  const reduceMotion = useReducedMotion();
  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-fast ${
      isActive
        ? "text-primary font-semibold"
        : "text-foreground/70 hover:text-foreground"
    }`;

  // Staggered entrance for mobile menu links
  useEffect(() => {
    if (!open || reduceMotion) {
      setLinkStates({});
      return;
    }

    const timers: NodeJS.Timeout[] = [];
    navLinks.forEach((_, index) => {
      const timer = setTimeout(() => {
        setLinkStates((prev) => ({ ...prev, [navLinks[index].to]: true }));
      }, index * 60);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [open, reduceMotion]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <header className="pointer-events-none">
        <nav
          className="navbar-pill pointer-events-auto"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="navbar-inner">
            <Link to="/" className="flex items-baseline gap-3 transition-fast hover:opacity-80" aria-label="Ashoka Business Club Home">
              <span className="font-display text-2xl font-black tracking-tight text-ink">
                ABC
              </span>
              <span className="hidden text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground sm:block">
                Ashoka Business Club
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex" role="menubar">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => linkClass({ isActive })}
                  role="menuitem"
                >
                  {l.label}
                </NavLink>
              ))}
            </div>

            {/* Hamburger Button */}
            <button
              className="lg:hidden flex flex-col items-center justify-center gap-5 w-10 h-10 p-2"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={handleToggle}
            >
              <span
                className={`hamburger-line ${open ? "hamburger-open" : ""}`}
                aria-hidden="true"
              />
              <span
                className={`hamburger-line ${open ? "hamburger-open" : ""}`}
                aria-hidden="true"
              />
              <span
                className={`hamburger-line ${open ? "hamburger-open" : ""}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          id="mobile-menu"
          className="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-menu-content">
            <nav className="flex flex-col items-center gap-6" role="menubar">
              {navLinks.map((l, index) => (
                <NavLink
                  key={l.to}
                  ref={(el) => (linkRefs.current[index] = el)}
                  to={l.to}
                  onClick={handleLinkClick}
                  className={`mobile-menu-link ${linkStates[l.to] ? "enter" : ""}`}
                  role="menuitem"
                  style={{
                    transitionDelay: reduceMotion ? "0ms" : `${index * 60}ms`,
                  }}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}