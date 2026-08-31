import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCmsContent } from "@/lib/cms";

const SITE_NAME = "Ashoka Business Club";
const SITE_ORIGIN = "https://ashokabusinessclub.com";
const DEFAULT_DESCRIPTION =
  "A student-run community at Ashoka University building business fluency through research, dialogue and flagship events.";

const pages: Record<string, { title: string; description: string }> = {
  "/": { title: SITE_NAME, description: DEFAULT_DESCRIPTION },
  "/about": { title: `About | ${SITE_NAME}`, description: "Learn about Ashoka Business Club's purpose, work and student-led departments." },
  "/team": { title: `Team archive | ${SITE_NAME}`, description: "An archive of Ashoka Business Club's verified student administrations through 2024–25." },
  "/nibbl": { title: `nibbl. | ${SITE_NAME}`, description: "Explore the archive of ABC's student-run dessert venture at Ashoka University." },
  "/abr": { title: `Ashoka Business Review | ${SITE_NAME}`, description: "Read research and commentary from the Ashoka Business Review." },
  "/events": { title: `Events archive | ${SITE_NAME}`, description: "Browse past and announced Ashoka Business Club events." },
  "/sponsors": { title: `Partners | ${SITE_NAME}`, description: "Organisations that have partnered with Ashoka Business Club." },
  "/what-awaits-you": { title: `Join us | ${SITE_NAME}`, description: "Learn about ABC departments and the student recruitment process." },
  "/contact": { title: `Contact | ${SITE_NAME}`, description: "Contact Ashoka Business Club at Ashoka University." },
};

function setMeta(selector: string, attribute: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    const [key, rawName] = selector.slice(5, -1).split('="');
    element.setAttribute(key, rawName);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function RouteMetadata(): null {
  const { pathname } = useLocation();
  const { events, abrItems, departments } = useCmsContent();

  useEffect(() => {
    let metadata = pages[pathname];
    if (pathname.startsWith("/events/")) {
      const item = events.find((entry) => `/events/${entry.slug}` === pathname);
      metadata = item ? { title: `${item.data.title} | ${SITE_NAME}`, description: item.data.description || DEFAULT_DESCRIPTION } : undefined;
    } else if (pathname.startsWith("/abr/")) {
      const item = abrItems.find((entry) => `/abr/${entry.slug}` === pathname);
      metadata = item ? { title: `${item.data.title} | ${SITE_NAME}`, description: item.data.excerpt || DEFAULT_DESCRIPTION } : undefined;
    } else if (pathname.startsWith("/departments/")) {
      const item = departments.find((entry) => `/departments/${entry.slug}` === pathname);
      metadata = item ? { title: `${item.data.name} | ${SITE_NAME}`, description: item.data.description } : undefined;
    }
    metadata ??= { title: `Page not found | ${SITE_NAME}`, description: DEFAULT_DESCRIPTION };

    document.title = metadata.title;
    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", `${SITE_ORIGIN}${pathname}`);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta('meta[name="twitter:description"]', "content", metadata.description);
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonical?.setAttribute("href", `${SITE_ORIGIN}${pathname}`);
  }, [abrItems, departments, events, pathname]);

  return null;
}
