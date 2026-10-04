import type { ProjectFilters } from "./project.type";
import type { ResearchSort } from "../shared/ResearchTable";

export function buildProjectParams(
  filters: ProjectFilters,
  sort: ResearchSort,
) {
  const params = new URLSearchParams({
    sortBy: sort.key,
    sortOrder: sort.direction,
    limit: "10",
  });
  for (const [key, value] of Object.entries(filters)) {
    if (value.trim()) params.set(key, value.trim());
  }
  return params;
}
