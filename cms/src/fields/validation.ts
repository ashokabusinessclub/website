const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SLUG_LENGTH = 100;

export function isSafeSlug(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= MAX_SLUG_LENGTH &&
    SLUG_PATTERN.test(value)
  );
}

export function validateSlug(value: unknown): true | string {
  return isSafeSlug(value)
    ? true
    : "Use 1–100 lowercase letters, numbers, and single hyphens (for example: annual-summit-2026).";
}

export function validateHttpsUrl(value: unknown): true | string {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string") return "Enter a valid HTTPS URL.";

  try {
    return new URL(value).protocol === "https:"
      ? true
      : "Only HTTPS URLs are allowed.";
  } catch {
    return "Enter a valid HTTPS URL.";
  }
}

export function validateImageReference(value: unknown): true | string {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string") return "Enter an HTTPS URL or root-relative path.";
  if (/^\/[a-zA-Z0-9][a-zA-Z0-9._~!$&'()*+,;=:@%/-]*$/.test(value)) {
    return true;
  }
  return validateHttpsUrl(value);
}
