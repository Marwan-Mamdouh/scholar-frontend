import { apiGet } from "@/src/lib/api-client";
import { PAGE_SIZE } from "./jobs.constants";
import type { Job, JobFilters, JobsResponse } from "./jobs.type";

export function buildJobsQuery(filters: JobFilters): string {
  const params = new URLSearchParams({
    page: String(filters.page),
    limit: String(PAGE_SIZE),
    sortBy: filters.sort === "title" ? "title" : "postedAt",
    sortOrder: filters.sort === "newest" ? "desc" : "asc",
  });
  for (const key of [
    "search",
    "country",
    "discipline",
    "company",
    "type",
    "seniority",
  ] as const) {
    const value = filters[key].trim();
    if (value) params.set(key, value);
  }
  return params.toString();
}

export function fetchJobs(
  query: string,
  signal: AbortSignal,
): Promise<JobsResponse> {
  return apiGet<JobsResponse>(`/jobs?${query}`, { signal });
}

export async function fetchJob(id: string, signal: AbortSignal): Promise<Job> {
  const response = await apiGet<{ success: boolean; data: Job }>(
    `/jobs/${encodeURIComponent(id)}`,
    { signal },
  );
  return response.data;
}
