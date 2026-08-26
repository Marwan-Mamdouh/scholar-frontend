export type TabType = "researchers" | "papers" | "projects";

// ---------------------------------------------------------------------------
// Researcher domain types
// ---------------------------------------------------------------------------

/** Avatar accent color rotation for researcher initials circles */
export type AvatarColor = "purple" | "blue" | "pink" | "green" | "orange" | "red";

/**
 * Stats displayed at the bottom of each researcher card.
 *
 * Every field is optional: the API may not always have a publication count,
 * citation count, or h-index for a given researcher. A missing field means
 * "don't render this stat" — the card must never show a label next to an
 * empty value (e.g. "Pubs: " with nothing after the colon).
 */
export interface ResearcherStats {
  publications?: number;
  /** Pre-formatted string, e.g. "12.4k" */
  citations?: string;
  hIndex?: number;
}

/**
 * Core data shape for a single researcher returned by the API.
 *
 * Only `id`, `name`, `initials`, and `avatarColor` are required — all other
 * fields are optional because the API may legitimately omit them. Absence
 * must be handled gracefully: never render a label next to an empty value,
 * and never fall back to placeholder text like "N/A" or "none".
 */
export interface Researcher {
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
}

// ---------------------------------------------------------------------------
// API request / response contracts for the Researchers tab
// ---------------------------------------------------------------------------

export type ResearcherSort = "mostCited" | "mostRecent" | "hIndex" | "az";

export interface GetResearchersParams {
  /** Free-text name search — matches the search box */
  search?: string;
  /** Matches the "All Universities" filter dropdown */
  universities?: string[];
  /** Matches the "All Fields" filter dropdown */
  researchFields?: string[];
  /** If topics ends up being a separate filter from fields */
  topics?: string[];
  /** Matches the "Most Cited" sort dropdown */
  sort?: ResearcherSort;
  /** 1-indexed page number */
  page?: number;
  /** Default suggestion: 9 (matches "9 of 879 researchers") */
  pageSize?: number;
}

export interface GetResearchersResponse {
  /** Array of researcher records for the current page */
  data: Researcher[];
  /** Total matching researchers, e.g. 879 — drives the "X of Y" counter */
  total: number;
  page: number;
  pageSize: number;
}
