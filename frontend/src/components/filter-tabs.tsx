import { motion } from "motion/react";

export function FilterTabs({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`flex flex-wrap gap-x-7 gap-y-3 ${className}`}
    >
      {options.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`tab-underline relative whitespace-nowrap pb-1 text-xs font-semibold uppercase tracking-[0.16em] transition-fast ${
              active
                ? "is-active text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
            {active && (
              <motion.span
                layoutId="section-tab-underline"
                className="pointer-events-none absolute inset-x-[4px] bottom-0 h-[2px] rounded-full bg-primary"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
