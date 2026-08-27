import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const BASE_OPACITY = 0.16;
/** How many chars are "wetting" at any moment — creates the left-to-right ink feel */
const WINDOW = 10;

function Char({
  ch,
  progress,
  index,
  total,
}: {
  ch: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = Math.min(1, (index + WINDOW) / total);
  const opacity = useTransform(progress, [start, end], [BASE_OPACITY, 1]);
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}

/**
 * Scroll-scrubbed "inking" paragraph — chars sit as faint ghosts and fill in
 * left-to-right as the block travels through the lower half of the viewport.
 * Linear scrub, no springs; collapses to plain text under reduced motion.
 */
export function ScrubText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.42"],
  });

  if (reduce) return <p className={className}>{text}</p>;

  const words = text.split(" ");
  const total = Math.max(1, text.replace(/ /g, "").length);
  let charIndex = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => {
        const start = charIndex;
        charIndex += word.length;
        return (
          <span
            key={wi}
            aria-hidden="true"
            className="inline whitespace-nowrap"
          >
            {[...word].map((ch, ci) => (
              <Char
                key={ci}
                ch={ch}
                progress={scrollYProgress}
                index={start + ci}
                total={total}
              />
            ))}
            {wi < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
