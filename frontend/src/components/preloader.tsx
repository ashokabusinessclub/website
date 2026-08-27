import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const SESSION_KEY = "abc-preloaded";
const COUNT_DURATION = 1100;
const HOLD_DURATION = 260;

/**
 * Cipher-style intro curtain — a percentage counter runs 0→100 with the
 * wordmark, then the whole panel wipes upward. Shows once per browser
 * session; skipped entirely under reduced motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(true);
  const rafRef = useRef(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage unavailable */
    }

    if (reduce || seen) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* noop */
      }
      return;
    }

    setGone(false);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_DURATION);
      /* ease-out so the last numbers decelerate like cipher's */
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setLeaving(true), HOLD_DURATION);
        window.setTimeout(() => {
          setGone(true);
          document.body.style.overflow = "";
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* noop */
          }
        }, HOLD_DURATION + 820);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (gone) return null;

  return (
    <div className={`preloader ${leaving ? "is-leaving" : ""}`} aria-hidden="true">
      {/* fine blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(40 20% 90% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(40 20% 90% / 0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* wordmark */}
      <div className="relative text-center">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Ashoka University
        </p>
        <p className="display-hero mt-3 text-primary">ABC</p>
        <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
          Business Club
        </p>
      </div>

      {/* percentage — bottom right, cipher placement */}
      <div className="preloader-count absolute bottom-8 right-6 text-foreground/85 sm:bottom-10 sm:right-12">
        {count}
        <span className="text-primary">%</span>
      </div>

      {/* progress hairline */}
      <div
        className="absolute bottom-0 left-0 h-px bg-primary transition-[width] duration-100 ease-linear"
        style={{ width: `${count}%` }}
      />
    </div>
  );
}
