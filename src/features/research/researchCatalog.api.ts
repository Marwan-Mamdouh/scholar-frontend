import { apiGet } from "@/src/lib/api-client";
import type {
  ResearchCatalogFilters,
  ResearchCatalogResponse,
  ResearchCatalogTab,
} from "./researchCatalog.type";

export function researchCatalogQuery(
  tab: ResearchCatalogTab,
  filters: ResearchCatalogFilters,
): string {
  const query = new URLSearchParams({
    page: String(filters.page),
    limit: "12",
  });
  const add = (key: string, value: string) => {
    if (value.trim()) query.set(key, value.trim());
  };
  add(tab === "researchers" ? "researcher" : "search", filters.search);
  if (tab === "researchers") {
    add("mainTopic", filters.topic);
    add("department", filters.field);
    add("institutionName", filters.university);
  } else {
    if (/^\d{4}$/.test(filters.year)) add("year", filters.year);
    if (tab === "projects") {
      add("university", filters.university);
      add("projectField", filters.field);
      add("sponsorship", filters.sponsorship);
    }
  }
  return query.toString();
}

export function fetchResearchCatalog(
  tab: ResearchCatalogTab,
  query: string,
  signal: AbortSignal,
): Promise<ResearchCatalogResponse> {
  return apiGet<ResearchCatalogResponse>(`/${tab}?${query}`, { signal });
}
