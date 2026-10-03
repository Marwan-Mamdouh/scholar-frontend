export function projectFields(domains: unknown): string[] {
  if (Array.isArray(domains)) {
    return domains.filter(
      (value): value is string => typeof value === "string" && !!value.trim(),
    );
  }
  return typeof domains === "string" && domains.trim() ? [domains] : [];
}
