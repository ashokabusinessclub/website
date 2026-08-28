import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveMediaUrl } from "@/lib/cms";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-foreground prose-p:text-foreground/80 prose-p:leading-relaxed prose-a:text-primary prose-strong:text-foreground prose-li:text-foreground/80 prose-li:marker:text-primary prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt, ...props }) => {
            const resolvedSrc = resolveMediaUrl(src);
            return (
              <figure className="my-8">
                <img
                  src={resolvedSrc}
                  alt={alt || ""}
                  loading="lazy"
                  className="w-full rounded-xl border border-border object-cover"
                  {...props}
                />
                {alt && (
                  <figcaption className="mt-2 text-center text-xs text-foreground/50">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
