export const INTRO_SESSION_KEY = "abc-home-cinematic-intro-v2-seen";

export function shouldPlayIntro() {
  try {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "reload") return true;
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}
