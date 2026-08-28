import { ReactNode } from "react";
import { ScrubText } from "@/components/scrub-text";

interface PageHeaderProps {
  title: string;
  intro?: string;
  /** Render the intro with the scroll-scrubbed "ink-in" effect */
  scrubIntro?: boolean;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
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

      <div className="container-abc relative py-20 md:py-28 lg:py-32">
        <h1 className="max-w-4xl font-display text-4xl leading-[1.05] font-semibold md:text-5xl lg:text-6xl xl:text-7xl animate-entry">
          {title}
        </h1>
        {intro &&
          (scrubIntro ? (
            <ScrubText
              text={intro}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60"
            />
          ) : (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/60 animate-entry stagger-1">
              {intro}
            </p>
          ))}
        {children}
      </div>
    </section>
  );
}
