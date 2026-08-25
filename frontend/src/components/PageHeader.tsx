import { ReactNode } from "react";
import { ScrubText } from "@/components/scrub-text";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Render the intro with the scroll-scrubbed "ink-in" effect */
  scrubIntro?: boolean;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  scrubIntro = false,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <section className={`relative overflow-hidden border-b border-border bg-background ${className}`}>
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[120px]"
      />

      <div className="container-abc relative py-24 md:py-32 lg:py-36">
        {eyebrow && (
          <div className="flex items-center gap-4 animate-entry">
            <span className="rule-brass w-10" aria-hidden="true" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
        )}
        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-semibold md:text-5xl lg:text-6xl xl:text-7xl animate-entry stagger-1">
          {title}
        </h1>
        {intro &&
          (scrubIntro ? (
            <ScrubText
              text={intro}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/50"
            />
          ) : (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/50 animate-entry stagger-2">
              {intro}
            </p>
          ))}
        {children}
      </div>
    </section>
  );
}
