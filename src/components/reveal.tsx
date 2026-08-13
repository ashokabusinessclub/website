import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

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
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
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
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const item: Variants = {
    hidden: { opacity: 0, y },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}