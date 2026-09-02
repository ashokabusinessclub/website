import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

export const INTRO_SESSION_KEY = "abc-home-cinematic-intro-v2-seen";
export const INTRO_COMPLETE_EVENT = "abc:intro-complete";

const INTRO_IMAGES = [
  "/uploads/abc-images/event-abr-launch.jpg",
  "/uploads/abc-images/event-house-of-cards.jpg",
  "/uploads/abc-images/event-speaker-sessions.jpg",
  "/uploads/abc-images/department-industry.jpg",
  "/uploads/abc-images/department-learning.jpg",
  "/uploads/abc-images/department-finance.jpg",
  "/uploads/abc-images/department-marketing.jpg",
  "/uploads/abc-images/department-abr.jpg",
];

const SHUTTER_COUNT = 8;

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
  const shutterRefs = useRef<(HTMLDivElement | null)[]>([]);
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
        const shutters = shutterRefs.current.filter(Boolean) as HTMLDivElement[];
        const fullBleedScale = () =>
          Math.max(window.innerWidth / stage.offsetWidth, window.innerHeight / stage.offsetHeight) * 1.04;

        gsap.set(images, { autoAlpha: 0, scale: 1.02 });
        gsap.set(images[0], { autoAlpha: 1, scale: 1 });
        gsap.set(slices, { autoAlpha: 0 });
        gsap.set(cleanWordmark, { autoAlpha: 0 });
        gsap.set(shutters, { scaleY: 0, transformOrigin: "bottom" });

        if (reduceMotion) {
          gsap.timeline({ onComplete: finish })
            .to(cleanWordmark, { autoAlpha: 1, duration: 0.22, ease: "power3.out" }, 0.12)
            .to(root, { autoAlpha: 0, duration: 0.28, ease: "power3.out" }, 0.52);
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          onComplete: finish,
        });

        timeline
          .to(".intro-detail", { autoAlpha: 1, duration: 0.35, stagger: 0.035 }, 0.18)
          .fromTo(stage, { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power3.out" }, 0.42);

        images.slice(1, 7).forEach((image, index) => {
          const time = 0.64 + index * 0.23;
          timeline
            .set(images, { autoAlpha: 0 }, time)
            .set(image, { autoAlpha: 1, scale: index % 2 ? 1.03 : 0.98 }, time)
            .to(image, { scale: 1, duration: 0.18, ease: "power3.out" }, time);
        });

        timeline
          .to(".intro-scratch", { autoAlpha: 0.14, duration: 0.22 }, 1.15)
          .to(".intro-scratch", { autoAlpha: 0.06, duration: 0.28 }, 1.62)
          .to(slices, { autoAlpha: 1, duration: 0.08, stagger: 0.045 }, 2.04)
          .fromTo(slices[0], { xPercent: -16 }, { xPercent: 7, duration: 0.34 }, 2.08)
          .fromTo(slices[1], { xPercent: 15 }, { xPercent: -5, duration: 0.38 }, 2.1)
          .fromTo(slices[2], { xPercent: -10 }, { xPercent: 4, duration: 0.32 }, 2.16)
          .fromTo(slices[3], { xPercent: 12 }, { xPercent: -3, duration: 0.36 }, 2.12)
          .to(stage, { scale: 5.6, rotation: 0.01, duration: 0.72, ease: "expo.inOut" }, 2.38)
          .to(slices, { xPercent: 0, duration: 0.42, ease: "expo.inOut" }, 2.62)
          .to(stage, { scale: fullBleedScale, duration: 0.62, ease: "expo.inOut" }, 2.92)
          .to(slices, { autoAlpha: 0, duration: 0.12, stagger: 0.018 }, 3.34)
          .to(cleanWordmark, { autoAlpha: 1, duration: 0.16, ease: "power3.out" }, 3.38);

        images.slice(0, 5).forEach((image, index) => {
          const time = 3.62 + index * 0.2;
          timeline
            .set(images, { autoAlpha: 0 }, time)
            .set(image, { autoAlpha: 1, scale: 1.015 }, time)
            .to(image, { scale: 1, duration: 0.19, ease: "power3.out" }, time);
        });

        timeline
          .to(stage, {
            scale: () => fullBleedScale() * 1.035,
            duration: 0.58,
            ease: "power3.inOut",
          }, 4.28)
          .to(cleanWordmark, {
            autoAlpha: 0.72,
            yPercent: -5,
            duration: 0.44,
            ease: "power3.inOut",
          }, 4.32)
          .to(shutters, { scaleY: 1, duration: 0.34, ease: "power3.inOut", stagger: 0.04 }, 4.38)
          .call(revealHomepage, [], 4.88)
          .set(root, { backgroundColor: "transparent" }, 4.95)
          .to(shutters, { scaleY: 0, transformOrigin: "top", duration: 0.42, ease: "power3.inOut", stagger: 0.035 }, 4.96)
          .set(root, { pointerEvents: "none" }, 5.38);
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
      <div className="intro-grid intro-detail" />
      <div className="intro-grain intro-detail" />
      <div className="intro-scratch" />
      <i className="intro-dot intro-dot-one intro-detail" />
      <i className="intro-dot intro-dot-two intro-detail" />

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

      <div className="intro-wordmark intro-wordmark-fragmented">
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

      <div ref={cleanWordmarkRef} className="intro-wordmark intro-wordmark-clean">
        <span>ASHOKA</span>
        <span>BUSINESS CLUB</span>
      </div>

      <div className="intro-shutters">
        {Array.from({ length: SHUTTER_COUNT }, (_, index) => (
          <div
            key={index}
            ref={(node) => { shutterRefs.current[index] = node; }}
            className="intro-shutter"
          />
        ))}
      </div>
    </div>
  );
}
