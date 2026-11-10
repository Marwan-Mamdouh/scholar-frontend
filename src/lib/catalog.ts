import { apiGet } from "./api-client";

export interface CatalogSummary {
  researchers: number;
  universities: number;
  papers: number;
  publications: number;
  projects: number;
  companies: number;
  jobs: number;
  profiles: number;
  topics: number;
}

export function fetchCatalogSummary(): Promise<CatalogSummary | null> {
  return apiGet<CatalogSummary>("/catalog/summary", {
    cache: "no-store",
  }).catch(() => null);
}
