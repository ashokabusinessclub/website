import { useCallback, useEffect, useRef, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "abc-theme";
const THEME_COLORS: Record<Theme, string> = {
  light: "#f7f3ec",
  dark: "#0d0d0d",
};

type ViewTransitionDocument = {
  startViewTransition?: (update: () => void) => unknown;
};

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage unavailable */
  }
  return "dark";
}

function applyTheme(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const dark = theme === "dark";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const api = document as unknown as ViewTransitionDocument;

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
    api.startViewTransition(update);
  } else if (animate && !reduced) {
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
    applyTheme(theme, mounted.current);
    mounted.current = true;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  return { theme, toggle };
}
