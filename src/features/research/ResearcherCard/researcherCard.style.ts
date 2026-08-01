import type { AvatarColor } from "./researcherCard.type";

/**
 * Avatar background colors mapped to existing design-system tokens.
 *
 * Token substitutions (noted for designer review):
 * - purple  → accent-400 (#37b5aa — teal-ish; closest "cool" accent available)
 * - blue    → primary-500 (#2574a9)
 * - pink    → danger-300 (#ff8a81)
 * - green   → accent-600 (#0e9488)
 * - orange  → danger-400 (#ff6f65 — warm orange-red, closest warm hue)
 * - red     → danger-700 (#e6271a)
 *
 * The palette lacks true purple/pink/orange — these are the closest existing
 * tokens. If the design needs more distinct hues, new tokens should be added
 * to globals.css by whoever owns the design system.
 */
export const avatarColorMap: Record<AvatarColor, string> = {
  purple: "bg-accent-400",
  blue: "bg-primary-500",
  pink: "bg-danger-300",
  green: "bg-accent-600",
  orange: "bg-danger-400",
  red: "bg-danger-700",
};

/** Base card container classes */
export const getCardContainerClasses = (): string => {
  const base = [
    "flex flex-col gap-4",
    "rounded-2xl",
    "border border-neutral-700",
    "bg-neutral-800/60",
    "p-5",
    "font-main",
    "transition-all ease-in-out duration-200",
    "hover:border-primary-500/50",
    "hover:shadow-[0px_0px_20px_rgba(37,116,169,0.08)]",
  ].join(" ");

  return base;
};

/** Avatar circle classes for given color */
export const getAvatarClasses = (color: AvatarColor): string => {
  return [
    "w-10 h-10",
    "rounded-full",
    "flex items-center justify-center",
    "text-sm font-bold text-neutral-50",
    "shrink-0",
    avatarColorMap[color] ?? "bg-neutral-500",
  ].join(" ");
};

/** Stat chip classes */
export const getStatChipClasses = (): string => {
  return [
    "inline-flex items-center gap-1",
    "px-2.5 py-0.5",
    "rounded-full",
    "bg-neutral-700/80",
    "text-xs font-medium text-accent-200",
  ].join(" ");
};

/** Bookmark button base classes */
export const getBookmarkClasses = (isBookmarked: boolean): string => {
  return [
    "p-1 rounded-lg",
    "transition-colors duration-200",
    "hover:bg-neutral-600/50",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400",
    isBookmarked ? "text-accent-300" : "text-neutral-300",
  ].join(" ");
};
