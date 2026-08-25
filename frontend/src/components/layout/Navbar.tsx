import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useTheme } from "@/hooks/use-theme";

export const navLinks = [
  { to: "/about", label: "About" },
  { to: "/abr", label: "ABR" },
  { to: "/events", label: "Events" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/what-awaits-you", label: "Join Us" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tab relative whitespace-nowrap px-3 py-2 text-[0.8rem] font-medium tracking-wide transition-fast ${
      isActive
        ? "is-active text-foreground"
        : "text-foreground/50 hover:text-foreground"
    }`;

  const menuVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="navbar">
        <nav
          className="navbar-inner"
          role="navigation"
          aria-label="Main navigation"
        >
          <Link to="/" className="flex items-center gap-2.5 transition-fast hover:opacity-80" aria-label="Ashoka Business Club Home">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-sm font-bold tracking-tight">
              ABC
            </span>
            <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.22em] text-foreground/60 sm:block">
              Ashoka Business Club
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-0.5 xl:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => linkClass({ isActive })}
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="pointer-events-none absolute inset-x-3 bottom-1 h-[2px] rounded-full bg-primary"
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle + Hamburger */}
          <div className="ml-auto flex items-center gap-1 xl:ml-0">
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/50 transition-fast hover:bg-secondary hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={reduceMotion ? false : { opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                  aria-hidden="true"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Hamburger Button */}
            <button
              className={`xl:hidden flex flex-col items-center justify-center gap-[5px] w-9 h-9 p-2 ${open ? "hamburger-open" : ""}`}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.nav
              className="mobile-menu-content"
              variants={reduceMotion ? undefined : menuVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "show"}
              aria-label="Mobile navigation"
            >
              {navLinks.map((l) => (
                <motion.div
                  key={l.to}
                  variants={reduceMotion ? undefined : linkVariants}
                  className="mobile-menu-link"
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `text-2xl font-semibold md:text-3xl ${
                        isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
