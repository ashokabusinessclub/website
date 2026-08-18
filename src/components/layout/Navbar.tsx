import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Moon, Sun } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { departments } from "@/lib/content";
import { DepartmentArt } from "@/components/department-art";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

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
  const [departmentsOpen, setDepartmentsOpen] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const { pathname } = useLocation();
  const onDepartments = pathname.startsWith("/departments");

  const openDepartments = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setDepartmentsOpen(true);
  };

  const closeDepartments = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setDepartmentsOpen(false);
      closeTimerRef.current = null;
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-tab relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-fast ${
      isActive
        ? "is-active text-foreground"
        : "text-foreground/65 hover:text-foreground"
    }`;

  const menuVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.12 },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
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
            <div className="hidden items-center gap-1 xl:flex">
              {navLinks.map((l) =>
                l.to === "/departments" ? (
                  <div
                    key={l.to}
                    className="relative"
                    onMouseEnter={openDepartments}
                    onMouseLeave={closeDepartments}
                  >
                    <DropdownMenu
                      open={departmentsOpen}
                      onOpenChange={(o) => (o ? openDepartments() : closeDepartments())}
                    >
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className={`group nav-tab relative inline-flex items-center gap-1 whitespace-nowrap px-4 py-2 text-sm font-medium transition-fast ${
                            onDepartments
                              ? "is-active text-foreground"
                              : "text-foreground/65 hover:text-foreground"
                          }`}
                        >
                          {l.label}
                          <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-data-[state=open]:rotate-180" />
                          {onDepartments && (
                            <motion.span
                              layoutId="nav-underline"
                              className="pointer-events-none absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-primary"
                              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            />
                          )}
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        onMouseEnter={openDepartments}
                        onMouseLeave={closeDepartments}
                        align="start"
                        sideOffset={10}
                        className="w-80 max-h-[min(70vh,30rem)] overflow-y-auto rounded-2xl border-border bg-popover p-2.5 shadow-[var(--shadow-elevated)]"
                      >
                        <DropdownMenuLabel className="flex items-center gap-3 px-3 pb-3 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                          <span className="rule-brass w-6" aria-hidden="true" />
                          The Departments
                        </DropdownMenuLabel>
                        {departments.map((d, i) => (
                          <DropdownMenuItem
                            key={d.slug}
                            asChild
                            className="group/dept mb-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 data-[highlighted]:bg-secondary data-[highlighted]:text-foreground"
                          >
                            <Link to={`/departments/${d.slug}`}>
                              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/dept:scale-[1.06]">
                                <DepartmentArt slug={d.slug} className="absolute inset-0" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-display text-[0.95rem] leading-tight">
                                  {d.data.name}
                                </span>
                                <span className="mt-1 flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                  <span className="inline-block h-1 w-1 rounded-full bg-brass" aria-hidden="true" />
                                  Vertical {String(i + 1).padStart(2, "0")}
                                </span>
                              </span>
                              <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/dept:translate-x-0 group-hover/dept:opacity-100" />
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="my-2 bg-border" />
                        <DropdownMenuItem asChild className="group/dept cursor-pointer rounded-xl px-3 py-2.5 data-[highlighted]:bg-secondary data-[highlighted]:text-foreground">
                          <Link to="/departments" className="flex items-center justify-between gap-3">
                            <span className="font-display text-sm">All departments</span>
                            <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover/dept:translate-x-1" />
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
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
                            className="pointer-events-none absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-primary"
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ),
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className={`xl:hidden flex flex-col items-center justify-center gap-[5px] w-10 h-10 p-2 ${open ? "hamburger-open" : ""}`}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
              <span className="hamburger-line" aria-hidden="true" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-fast hover:bg-foreground/[0.06] hover:text-foreground"
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
                  className="mobile-menu-link flex flex-col items-center"
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-display text-2xl font-medium md:text-3xl ${
                        isActive ? "text-brass" : "text-background hover:text-brass"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                  {l.to === "/departments" && (
                    <div className="mt-4 flex flex-col items-center gap-1.5">
                      {departments.map((d) => (
                        <NavLink
                          key={d.slug}
                          to={`/departments/${d.slug}`}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `text-base transition-fast ${
                              isActive
                                ? "text-brass"
                                : "text-background/70 hover:text-brass"
                            }`
                          }
                        >
                          {d.data.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}