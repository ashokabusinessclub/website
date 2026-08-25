import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-t border-border pt-4">
      <dd className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {value > 999 ? `${(count / 1000).toFixed(count >= value ? 0 : 1)}k` : count}
        {suffix}
      </dd>
      <dt className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-foreground/35">
        {label}
      </dt>
    </div>
  );
}
