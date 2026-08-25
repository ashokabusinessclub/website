import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";

/** Tracks which section id currently crosses the viewport's reading zone */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A horizontal band around the upper-middle of the viewport decides
      // which chapter is "current" — no scroll listeners involved.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids.join("|")]);

  return active;
}

/**
 * Slim chapter bar that sticks under the navbar while a long-form page scrolls.
 * Crossfades the current chapter label, offers jump links, and draws a
 * scroll-progress hairline along its bottom edge.
 */
export function ChapterBar({
  chapters,
}: {
  chapters: { id: string; label: string }[];
}) {
  const reduce = useReducedMotion();
  const active = useActiveSection(chapters.map((c) => c.id));
  const activeIndex = Math.max(
    0,
    chapters.findIndex((c) => c.id === active)
  );
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div
      className="sticky top-[68px] z-30 border-b border-border bg-background/85 backdrop-blur-md"
      role="navigation"
      aria-label="Page chapters"
    >
      <div className="container-abc flex h-11 items-center justify-between gap-4">
        <div className="relative h-full min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full items-center truncate text-[0.65rem] font-semibold uppercase tracking-[0.24em]"
            >
              <span className="mr-3 text-primary">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-foreground/70">{chapters[activeIndex]?.label}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          {chapters.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              aria-current={c.id === active ? "true" : undefined}
              aria-label={`Jump to ${c.label}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                c.id === active
                  ? "w-7 bg-primary"
                  : "w-3 bg-border hover:bg-foreground/30"
              }`}
            >
              <span className="sr-only">{`Chapter ${i + 1}: ${c.label}`}</span>
            </a>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="h-px origin-left bg-gradient-to-r from-primary/70 to-primary/20"
        style={reduce ? undefined : { scaleX: progress }}
      />
    </div>
  );
}
