const WEB_PROTOCOLS = new Set(["http:", "https:"]);

export function safeExternalUrl(value: unknown): string | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  try {
    const url = new URL(value);
    return WEB_PROTOCOLS.has(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function safeMediaUrl(value: unknown, base?: string): string | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;

  if (value.startsWith("/")) {
    if (!base) return value;
    try {
      const url = new URL(value, base);
      return WEB_PROTOCOLS.has(url.protocol) ? url.href : undefined;
    } catch {
      return undefined;
    }
  }

  return safeExternalUrl(value);
}
