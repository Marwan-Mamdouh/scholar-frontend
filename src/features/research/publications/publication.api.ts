import { apiGet } from "@/src/lib/api-client";
import type { ResearchSort } from "../shared/ResearchTable";
import type { PublicationsResponse } from "./publication.type";

export const DEFAULT_PUBLICATION_SORT: ResearchSort = {
  key: "id",
  direction: "asc",
};

export function buildPublicationParams(search: string, sort: ResearchSort) {
  const params = new URLSearchParams({
    sortBy: sort.key,
    sortOrder: sort.direction,
    limit: "10",
  });
  if (search.trim()) params.set("search", search.trim());
  return params;
}

export function fetchPublications(): Promise<PublicationsResponse> {
  const params = buildPublicationParams("", DEFAULT_PUBLICATION_SORT);
  params.set("page", "1");
  return apiGet<PublicationsResponse>(`/publications?${params}`, {
    cache: "no-store",
  });
}
