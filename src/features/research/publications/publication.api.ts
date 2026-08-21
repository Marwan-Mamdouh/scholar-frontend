import { apiGet, apiPost } from "@/src/lib/api-client";
import type {
  NumericRange,
  Publication,
  PublicationDomain,
  PublicationFilterRanges,
  PublicationFilterResponse,
  PublicationFilterState,
  RangeValue,
} from "./publication.type";

interface PublicationFilterPayload {
  categories?: { categoryIds: number[] };
  publishingModel?: string[];
  licensing?: string[];
  pricing?: { currency?: string; maxCost?: number };
  metrics?: {
    quartiles?: string[];
    impactFactor?: RangeValue;
    sjr?: RangeValue;
    citeScore?: RangeValue;
  };
  editorialSpeed?: {
    firstDecisionWeeks?: RangeValue;
    submissionToAcceptanceWeeks?: RangeValue;
  };
}

export function isRangeActive(
  value: RangeValue,
  bound?: NumericRange,
): boolean {
  if (value.min === undefined && value.max === undefined) return false;
  if (!bound) return true;

  const narrowsMin = value.min !== undefined && value.min > bound.min;
  const narrowsMax = value.max !== undefined && value.max < bound.max;
  return narrowsMin || narrowsMax;
}

function activeRange(
  value: RangeValue,
  bound?: NumericRange,
): RangeValue | undefined {
  return isRangeActive(value, bound) ? value : undefined;
}

export function buildFilterPayload(
  filters: PublicationFilterState,
  ranges?: PublicationFilterRanges,
): PublicationFilterPayload {
  const payload: PublicationFilterPayload = {};

  if (filters.categoryIds.length) {
    payload.categories = { categoryIds: filters.categoryIds };
  }

  if (filters.publishingModel.length) {
    payload.publishingModel = filters.publishingModel;
  }

  if (filters.licensing.length) {
    payload.licensing = filters.licensing;
  }

  if (filters.maxCost !== undefined) {
    payload.pricing = {
      currency: filters.currency || undefined,
      maxCost: filters.maxCost,
    };
  }

  const impactFactor = activeRange(filters.impactFactor, ranges?.impactFactor);
  const sjr = activeRange(filters.sjr, ranges?.sjr);
  const citeScore = activeRange(filters.citeScore, ranges?.citeScore);

  if (filters.quartiles.length || impactFactor || sjr || citeScore) {
    payload.metrics = {
      ...(filters.quartiles.length && { quartiles: filters.quartiles }),
      ...(impactFactor && { impactFactor }),
      ...(sjr && { sjr }),
      ...(citeScore && { citeScore }),
    };
  }

  const firstDecisionWeeks = activeRange(
    filters.firstDecisionWeeks,
    ranges?.firstDecisionWeeks,
  );
  const submissionToAcceptanceWeeks = activeRange(
    filters.submissionToAcceptanceWeeks,
    ranges?.submissionToAcceptanceWeeks,
  );

  if (firstDecisionWeeks || submissionToAcceptanceWeeks) {
    payload.editorialSpeed = {
      ...(firstDecisionWeeks && { firstDecisionWeeks }),
      ...(submissionToAcceptanceWeeks && { submissionToAcceptanceWeeks }),
    };
  }

  return payload;
}

export async function fetchPublications(
  filters: PublicationFilterState,
  ranges?: PublicationFilterRanges,
  init?: RequestInit,
): Promise<Publication[]> {
  const data = await apiPost<PublicationFilterResponse>(
    "/publication/filter",
    buildFilterPayload(filters, ranges),
    init,
  );
  return data.publications ?? [];
}

export function fetchFilterRanges(): Promise<PublicationFilterRanges> {
  return apiGet<PublicationFilterRanges>("/publication/filter", {
    next: { revalidate: 300 },
  });
}

export function fetchDomains(): Promise<PublicationDomain[]> {
  return apiGet<PublicationDomain[]>("/publication/domain", {
    next: { revalidate: 300 },
  });
}
