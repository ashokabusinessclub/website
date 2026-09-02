import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

export const INTRO_SESSION_KEY = "abc-home-cinematic-intro-v2-seen";
export const INTRO_COMPLETE_EVENT = "abc:intro-complete";
export const INTRO_HERO_IMAGE = "/uploads/abc-images/event-house-of-cards.jpg";

const INTRO_IMAGES = [
  "/uploads/abc-images/event-abr-launch.jpg",
  "/uploads/abc-images/event-speaker-sessions.jpg",
  "/uploads/abc-images/department-industry.jpg",
  "/uploads/abc-images/department-finance.jpg",
  "/uploads/abc-images/department-marketing.jpg",
  INTRO_HERO_IMAGE,
];

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function preloadImages(sources: string[]) {
  const loading = Promise.allSettled(
    sources.map(
      (source) =>
        new Promise<void>((resolve) => {
          const image = new Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = source;
        }),
    ),
  );

  return Promise.race([
    loading,
    new Promise<void>((resolve) => window.setTimeout(resolve, 2000)),
  ]);
}

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cleanWordmarkRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const sliceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const cleanWordmark = cleanWordmarkRef.current;
    if (!root || !stage || !cleanWordmark) return;

    if (hasSeenIntro()) {
      setGone(true);
      document.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
      return;
    }

    let cancelled = false;
    let completed = false;
    let homepageRevealed = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.intro = "running";

    const revealHomepage = () => {
      if (cancelled || homepageRevealed) return;
      homepageRevealed = true;
      document.documentElement.dataset.intro = "revealing";
      document.dispatchEvent(new CustomEvent(INTRO_COMPLETE_EVENT));
    };

    const finish = () => {
      if (cancelled || completed) return;
      completed = true;
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {
        /* Storage can be unavailable in privacy-restricted contexts. */
      }
      revealHomepage();
      document.body.style.overflow = previousOverflow;
      document.documentElement.dataset.intro = "complete";
      setGone(true);
    };

    let context: gsap.Context | undefined;

    void preloadImages(INTRO_IMAGES).then(() => {
      if (cancelled) return;

      context = gsap.context(() => {
        const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
        const slices = sliceRefs.current.filter(Boolean) as HTMLDivElement[];
        const targetMetrics = () => {
          const target = document
            .querySelector<HTMLElement>("[data-intro-hero-media]")
            ?.getBoundingClientRect();
          if (!target) return { x: 0, y: 0, scale: 7 };
          return {
            x: target.left + target.width / 2 - window.innerWidth / 2,
            y: target.top + target.height / 2 - window.innerHeight / 2,
            scale: target.width / stage.offsetWidth,
          };
        };

        gsap.set(images, { autoAlpha: 0, scale: 0.98 });
        gsap.set(images[0], { autoAlpha: 1, scale: 1 });
        gsap.set(slices, { autoAlpha: 0 });
        gsap.set(cleanWordmark, { autoAlpha: 0 });

        if (reduceMotion) {
          gsap.timeline({ onComplete: finish })
            .to(cleanWordmark, { autoAlpha: 1, duration: 0.22, ease: "power3.out" }, 0.12)
            .call(revealHomepage, [], 0.46)
            .to(root, { autoAlpha: 0, duration: 0.28, ease: "power3.out" }, 0.5);
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: finish,
        });

        timeline
          .to(".intro-detail", { autoAlpha: 1, duration: 0.35, stagger: 0.035 }, 0.18)
          .fromTo(stage, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.32, ease: "power3.out" }, 0.48);

        images.slice(1).forEach((image, index) => {
          const previous = images[index];
          const time = 0.88 + index * 0.36;
          timeline
            .to(previous, { autoAlpha: 0, duration: 0.12, ease: "power3.out" }, time)
            .fromTo(
              image,
              { autoAlpha: 0, scale: 0.98 },
              { autoAlpha: 1, scale: 1, duration: 0.36, ease: "power3.out" },
              time,
            );
        });

        timeline
          .to(".intro-scratch", { autoAlpha: 0.11, duration: 0.35 }, 1.3)
          .to(".intro-scratch", { autoAlpha: 0.05, duration: 0.5 }, 1.78)
          .to(slices, { autoAlpha: 1, duration: 0.18, stagger: 0.04 }, 2.38)
          .fromTo(slices[0], { xPercent: -6 }, { xPercent: 0, duration: 0.72 }, 2.42)
          .fromTo(slices[1], { xPercent: 5 }, { xPercent: 0, duration: 0.78 }, 2.42)
          .fromTo(slices[2], { xPercent: -4 }, { xPercent: 0, duration: 0.68 }, 2.48)
          .fromTo(slices[3], { xPercent: 4 }, { xPercent: 0, duration: 0.74 }, 2.44)
          .to(stage, { scale: 4.2, rotation: 0.01, duration: 1, ease: "power3.inOut" }, 2.55)
          .to(slices, { autoAlpha: 0, duration: 0.3, stagger: 0.025 }, 3.35)
          .to(cleanWordmark, { autoAlpha: 1, duration: 0.4, ease: "power3.out" }, 3.42)
          .to(stage, {
            x: () => targetMetrics().x,
            y: () => targetMetrics().y,
            scale: () => targetMetrics().scale,
            duration: 1,
            ease: "power3.inOut",
          }, 4.12)
          .to(cleanWordmark, {
            autoAlpha: 0,
            yPercent: -4,
            duration: 0.7,
            ease: "power3.out",
          }, 4.2)
          .to(".intro-atmosphere", { autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 4.58)
          .to(".intro-backdrop", { autoAlpha: 0, duration: 0.8, ease: "power3.out" }, 4.62)
          .call(revealHomepage, [], 4.9)
          .to(stage, { autoAlpha: 0, duration: 0.25, ease: "power3.out" }, 5.08)
          .set(root, { pointerEvents: "none" }, 5.34);
      }, root);
    });

    return () => {
      cancelled = true;
      context?.revert();
      if (!completed) {
        document.body.style.overflow = previousOverflow;
        delete document.documentElement.dataset.intro;
      }
    };
  }, [reduceMotion]);

  if (gone) return null;

  return (
    <div ref={rootRef} className="intro-loader" aria-hidden="true">
      <div className="intro-backdrop" />
      <div className="intro-grid intro-detail intro-atmosphere" />
      <div className="intro-grain intro-detail intro-atmosphere" />
      <div className="intro-scratch intro-atmosphere" />
      <i className="intro-dot intro-dot-one intro-detail intro-atmosphere" />
      <i className="intro-dot intro-dot-two intro-detail intro-atmosphere" />

      <div ref={stageRef} className="intro-image-stage">
        {INTRO_IMAGES.map((source, index) => (
          <img
            key={source}
            ref={(node) => { imageRefs.current[index] = node; }}
            className="intro-image"
            src={source}
            alt=""
            decoding="async"
          />
        ))}
      </div>

      <div className="intro-wordmark intro-wordmark-fragmented intro-atmosphere">
        {["inset(0 0 76% 0)", "inset(24% 0 49% 0)", "inset(51% 0 23% 0)", "inset(77% 0 0 0)"].map((clip, index) => (
          <div
            key={clip}
            ref={(node) => { sliceRefs.current[index] = node; }}
            className="intro-wordmark-slice"
            style={{ clipPath: clip }}
          >
            <span>ASHOKA BUSINESS CLUB</span>
          </div>
        ))}
      </div>

      <div ref={cleanWordmarkRef} className="intro-wordmark intro-wordmark-clean intro-atmosphere">
        <span>ASHOKA</span>
        <span>BUSINESS CLUB</span>
      </div>
    </div>
  );
}
