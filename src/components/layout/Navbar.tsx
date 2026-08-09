import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide transition-colors ${
      isActive
        ? "text-primary font-semibold"
        : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-abc flex h-20 items-center justify-between">
        <Link to="/" className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-black tracking-tight text-ink">
            ABC
          </span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground sm:block">
            Ashoka Business Club
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="container-abc flex flex-col py-4">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `border-b border-border/60 py-3 text-sm ${
                    isActive ? "text-primary font-semibold" : "text-foreground/80"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
