import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";
import { INTRO_SESSION_KEY, shouldPlayIntro } from "@/lib/intro";

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

function IntroWordmarkText() {
  return (
    <span className="intro-wordmark-lines">
      <span>ASHOKA</span>
      <span>BUSINESS CLUB</span>
    </span>
  );
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
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const cleanWordmark = cleanWordmarkRef.current;
    if (!root || !stage || !cleanWordmark) return;

    if (!shouldPlayIntro()) {
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
        const wordmarkLabels = cleanWordmark.querySelectorAll(".intro-wordmark-lines > span");
        const targetMetrics = () => {
          const target = document
            .querySelector<HTMLElement>("[data-intro-hero-media]")
            ?.getBoundingClientRect();
          if (!target) return { x: 0, y: 0, scaleX: 7, scaleY: 7 };
          return {
            x: target.left + target.width / 2 - window.innerWidth / 2,
            y: target.top + target.height / 2 - window.innerHeight / 2,
            // Match both dimensions independently. This preserves a seamless
            // handoff if the responsive hero aspect ratio changes.
            scaleX: target.width / stage.offsetWidth,
            scaleY: target.height / stage.offsetHeight,
          };
        };
        let landingMetrics = targetMetrics();

        gsap.set(images, { autoAlpha: 0, scale: 0.98 });
        gsap.set(images[0], { autoAlpha: 1, scale: 1 });
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
          .set(cleanWordmark, { autoAlpha: 1 }, 2.38)
          .fromTo(
            wordmarkLabels,
            { autoAlpha: 0, x: (index) => index === 0 ? -18 : 18 },
            { autoAlpha: 1, x: 0, duration: 0.58, stagger: 0.06, ease: "power3.out" },
            2.38,
          )
          .to(stage, { scale: 4.2, rotation: 0.01, duration: 1, ease: "power3.inOut" }, 2.55)
          .call(() => {
            // Capture the responsive hero bounds immediately before landing.
            landingMetrics = targetMetrics();
          }, [], 4.08)
          .to(stage, {
            x: () => landingMetrics.x,
            y: () => landingMetrics.y,
            scaleX: () => landingMetrics.scaleX,
            scaleY: () => landingMetrics.scaleY,
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
          .call(revealHomepage, [], 5.12)
          .to(stage, { autoAlpha: 0, duration: 0.25, ease: "power3.out" }, 5.12)
          .set(root, { pointerEvents: "none" }, 5.37);
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

      <div ref={cleanWordmarkRef} className="intro-wordmark intro-wordmark-clean intro-atmosphere">
        <IntroWordmarkText />
      </div>
    </div>
  );
}
