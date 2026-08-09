import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-abc flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">
        This page isn't on the agenda.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you're looking for may have moved, or hasn't been published yet.
      </p>
      <Link
        to="/"
        className="mt-8 bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </section>
  );
}
