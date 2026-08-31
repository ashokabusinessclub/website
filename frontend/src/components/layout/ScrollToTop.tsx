import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ChevronUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        target?.scrollIntoView({ behavior: "auto", block: "start" });
        target?.focus({ preventScroll: true });
      });
    } else if (navigationType !== "POP") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hash, navigationType, pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top"
          className="fixed bottom-8 right-8 z-40"
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            variant="outline"
            size="icon"
            className="shadow-lg"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
            }
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
