import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-abc flex min-h-[60vh] flex-col items-center justify-center py-24 text-center animate-entry">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl md:text-5xl">
        This page isn't on the agenda.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you're looking for may have moved, or hasn't been published yet.
      </p>
      <Button asChild iconRight={<ArrowRight className="h-4 w-4" />} size="lg" className="mt-8">
        <Link to="/">Back to home</Link>
      </Button>
    </section>
  );
}