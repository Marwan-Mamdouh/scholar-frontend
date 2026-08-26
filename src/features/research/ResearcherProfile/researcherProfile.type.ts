import type { AvatarColor, ResearcherStats } from "../Research.type";

/** A single paper in the researcher's publication list */
export interface Paper {
  id: string;
  year: number;
  title: string;
  journal?: string;
  citations: number;
}

/** A co-author the researcher has collaborated with */
export interface CoAuthor {
  name: string;
  collaborations: number;
}

/** A field of study with its proportional share for the analytics donut */
export interface FieldOfStudy {
  name: string;
  /** Percentage share (0–100) */
  share: number;
  /** CSS-compatible color for the donut segment */
  color: string;
}

/**
 * Extended researcher profile data.
 *
 * Extends the card-level data with full profile information:
 * papers list, co-authors, fields of study, interests, and primary field.
 *
 * All extended fields are optional — the profile page must handle
 * missing data gracefully with clean empty states.
 */
export interface ResearcherProfile {
  id: string;
  name: string;
  initials: string;
  avatarColor: AvatarColor;
  institutionAbbr?: string;
  role?: string;
  institution?: string;
  description?: string;
  stats?: ResearcherStats;
  tags?: string[];
  bookmarked?: boolean;
  /** Primary research field shown as an accent label */
  primaryField?: string;
  /** Interest keywords displayed as "Interests: X / Y / Z" */
  interests?: string[];
  /** Full list of published papers */
  papers?: Paper[];
  /** List of co-authors sorted by collaboration count */
  coAuthors?: CoAuthor[];
  /** Fields of study breakdown for the analytics donut chart */
  fieldsOfStudy?: FieldOfStudy[];
}

export type ProfileTabType = "papers" | "coAuthors" | "analytics";
