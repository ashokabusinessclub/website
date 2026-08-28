import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskRise } from "@/components/reveal";

interface NextPageProps {
  to: string;
  title: string;
}

/**
 * Cominvi-style end-of-page signpost — a full-width bordered block that
 * points to the next logical page, sized like a section heading.
 */
export function NextPage({ to, title }: NextPageProps) {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden border-t border-border bg-background outline-none"
      aria-label={`${title} — continue to next page`}
    >
      {/* hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/[0.04] opacity-0 transition-opacity duration-700 ease-[var(--ease-out)] group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <div className="container-abc relative flex items-center justify-between gap-6 py-16 md:py-24">
        <div className="min-w-0">
          <MaskRise>
            <span className="display-xl block transition-colors duration-500 ease-[var(--ease-out)] group-hover:text-primary">
              {title}
            </span>
          </MaskRise>
        </div>

        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-500 ease-[var(--ease-out)] group-hover:border-primary group-hover:bg-primary sm:h-20 sm:w-20 md:h-24 md:w-24">
          <ArrowUpRight className="h-6 w-6 transition-all duration-500 ease-[var(--ease-out)] group-hover:rotate-45 group-hover:text-primary-foreground sm:h-8 sm:w-8" />
        </span>
      </div>
    </Link>
  );
}
