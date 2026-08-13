import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <section className={`border-b border-border bg-secondary/50 ${className}`}>
      <div className="container-abc py-20 md:py-28">
        {eyebrow && (
          <div className="flex items-center gap-4 animate-entry">
            <span className="rule-brass w-10" aria-hidden="true" />
            <p className="eyebrow">{eyebrow}</p>
          </div>
        )}
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] md:text-6xl md:text-7xl animate-entry stagger-1">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-entry stagger-2">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}