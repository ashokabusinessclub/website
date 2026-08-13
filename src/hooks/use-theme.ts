import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "abc-theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#f8f6f1",
  dark: "#171310",
};

interface TransitionableDocument extends Document {
  startViewTransition?: (update: () => void) => unknown;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return "light";
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const dark = theme === "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const api = document as TransitionableDocument;

  const update = () => {
    root.classList.toggle("dark", dark);
    root.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", THEME_COLORS[theme]);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  };

  if (animate && !reduced && typeof api.startViewTransition === "function") {
    // Chromium: capture a full-page crossfade around the theme flip.
    api.startViewTransition(update);
  } else if (animate && !reduced) {
    // Other engines: briefly enable color transitions so tokens crossfade.
    root.classList.add("theme-anim");
    update();
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
  } else {
    update();
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const mounted = useRef(false);

  useEffect(() => {
    // Animate only on toggles; the inline <head> script already painted once.
    applyTheme(theme, mounted.current);
    mounted.current = true;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggle };
}