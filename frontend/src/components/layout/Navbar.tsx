import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useTheme } from "@/hooks/use-theme";

export interface NavItem {
  to: string;
  label: string;
  children?: { to: string; label: string }[];
}

export const navLinks: NavItem[] = [
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/nibbl", label: "Nibbl" },
      { to: "/team", label: "Our Team" },
    ],
  },
  { to: "/abr", label: "ABR" },
  { to: "/events", label: "Calendar" },
  { to: "/sponsors", label: "Partners" },
  {
    to: "/what-awaits-you",
    label: "Join Us",
    children: [
      { to: "/what-awaits-you#departments", label: "Departments" },
      { to: "/what-awaits-you#induction", label: "Induction Forms" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

function NavDropdown({
  item,
  isActive,
  linkClass,
  onOpenChange,
}: {
  item: NavItem;
  isActive: boolean;
  linkClass: ({ isActive }: { isActive: boolean }) => string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
    onOpenChange?.(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      onOpenChange?.(false);
    }, 120);
  };

  useEffect(() => {
    setOpen(false);
    onOpenChange?.(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) handleLeave();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          (event.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
        }
      }}
    >
      <NavLink
        to={item.to}
        className={({ isActive: linkActive }) => `${linkClass({ isActive: linkActive })} flex items-center h-full`}
        onClick={() => setOpen(false)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {({ isActive: linkActive }) => (
          <>
            <span className="relative">
              {item.label}
              {(linkActive || isActive) && (
                <motion.span
                  layoutId="nav-underline"
                  className="pointer-events-none absolute -bottom-1.5 inset-x-0 h-[2px] rounded-full bg-primary"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </span>
            <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </>
        )}
      </NavLink>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
            role="menu"
          >
            {item.children.map((child) => (
              <Link
                key={child.to}
                to={child.to}
                className="block px-4 py-2.5 text-[0.75rem] font-medium text-foreground/70 transition-fast hover:bg-secondary hover:text-foreground"
                role="menuitem"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tab relative whitespace-nowrap px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-fast ${
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
    const menuButton = menuButtonRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
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
            {navLinks.map((l) =>
              l.children ? (
                <NavDropdown
                  key={l.to}
                  item={l}
                  isActive={false}
                  linkClass={linkClass}
                />
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => `${linkClass({ isActive })} flex items-center h-full`}
                >
                  {({ isActive }) => (
                    <span className="relative">
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="pointer-events-none absolute -bottom-1.5 inset-x-0 h-[2px] rounded-full bg-primary"
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              )
            )}
          </div>

          {/* Theme Toggle + Hamburger */}
          <div className="ml-auto flex items-center gap-1 xl:ml-0">
            <button
              ref={menuButtonRef}
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
            ref={menuRef}
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
              className="flex h-full flex-col justify-between px-6 pb-10 pt-28"
              variants={reduceMotion ? undefined : menuVariants}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "show"}
              aria-label="Mobile navigation"
            >
              <div>
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.to}
                    variants={reduceMotion ? undefined : linkVariants}
                    className="border-b border-border/60"
                  >
                    {l.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded((prev) =>
                              prev === l.to ? null : l.to
                            )
                          }
                          className={`group flex w-full items-center gap-4 py-4 ${
                            mobileExpanded === l.to ? "text-primary" : "text-foreground/80 hover:text-primary"
                          }`}
                        >
                          <span className="flex-1 text-left font-display text-3xl font-semibold tracking-tight">
                            {l.label}
                          </span>
                          <ChevronDown
                            className={`h-5 w-5 text-foreground/30 transition-transform duration-200 ${
                              mobileExpanded === l.to ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === l.to && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-3 pl-8">
                                {l.children.map((child) => (
                                  <Link
                                    key={child.to}
                                    to={child.to}
                                    onClick={() => setOpen(false)}
                                    className="block py-2 text-lg text-foreground/60 transition-fast hover:text-primary"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center gap-4 py-4 ${
                            isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                          }`
                        }
                      >
                        <span className="flex-1 text-left font-display text-3xl font-semibold tracking-tight">
                          {l.label}
                        </span>
                      </NavLink>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={reduceMotion ? undefined : linkVariants}
                className="flex items-end justify-between text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-foreground/35"
              >
                <span>Ashoka University</span>
                <a href="mailto:businessclub@ashoka.edu.in" className="text-primary/70">
                  businessclub@ashoka.edu.in
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
