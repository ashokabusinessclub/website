import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;
/** Aggressive snap ease (cominvi-style "M0,0 C0.6,0 0,1 1,1") for mask reveals */
export const EASE_SNAP = [0.6, 0, 0.05, 1] as const;

/** Heading rise clipped by an overflow mask — text slides up into view */
export function MaskRise({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["112%", 0]);

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="block will-change-transform" ref={ref} style={{ y: 0 }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        ref={ref}
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.85, ease: EASE_SNAP, delay }}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yProgress = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: opacityProgress, y: yProgress }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/* ============================================
   SCROLLYTELLING PRIMITIVES
   ============================================ */

/** A section where the header sticks while content scrolls past */
export function StickySection({
  children,
  className = "",
  stickyClassName = "",
}: {
  children: ReactNode;
  className?: string;
  stickyClassName?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div className={`relative ${className}`}>
      <div className={`sticky top-0 ${stickyClassName}`}>
        {children}
      </div>
    </div>
  );
}

/** Parallax scroll effect — content moves at a different rate */
export function ParallaxLayer({
  children,
  className = "",
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/** Scroll-linked opacity fade — fades in/out based on scroll position */
export function ScrollFade({
  children,
  className = "",
  range = [0, 0.3, 0.7, 1],
}: {
  children: ReactNode;
  className?: string;
  range?: [number, number, number, number];
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, range, [0, 1, 1, 0]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
}
