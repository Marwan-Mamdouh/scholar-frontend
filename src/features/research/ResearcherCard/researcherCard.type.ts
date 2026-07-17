/**
 * Re-export domain types from the central Research.type.ts — these are the
 * canonical definitions. Only card-specific props are defined here.
 */
export type { AvatarColor, Researcher, ResearcherStats } from "../Research.type";

import type { Researcher } from "../Research.type";

/** Props accepted by the ResearcherCard component */
export interface ResearcherCardProps {
  researcher: Researcher;
  /** Called when the bookmark button is toggled */
  onBookmarkToggle?: (id: string) => void;
  className?: string;
}
