"use client";

import { useState } from "react";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import ResearchPanel from "../shared/ResearchPanel";
import ResearchResults from "../shared/ResearchResults";
import { useResearchQuery } from "../shared/useResearchQuery";
import type { ResearchSort } from "../shared/ResearchTable";
import ProjectFilterBar from "./ProjectFilterBar";
import ProjectsTable from "./ProjectsTable";
import { buildProjectParams } from "./project.api";
import {
  EMPTY_PROJECT_FILTERS,
  type ProjectFilters,
  type ProjectsResponse,
} from "./project.type";

export default function ProjectsPanel() {
  const [filters, setFilters] = useState<ProjectFilters>(EMPTY_PROJECT_FILTERS);
  const [sort, setSort] = useState<ResearchSort>({
    key: "postedAt",
    direction: "desc",
  });
  const debounced = useDebouncedValue(filters, 300);
  // A partial year must never become an invalid date in the backend query.
  const query = buildProjectParams(
    {
      ...debounced,
      year: /^[1-9]\d{3}$/.test(debounced.year) ? debounced.year : "",
    },
    sort,
  ).toString();
  const [selection, setSelection] = useState({ query, page: 1 });
  if (selection.query !== query) {
    setSelection({ query, page: 1 });
  }
  const page = selection.query === query ? selection.page : 1;
  const { data, error, loading, retry } = useResearchQuery<ProjectsResponse>(
    `/projects?${query}&page=${page}`,
  );
  return (
    <ResearchPanel>
      <ProjectFilterBar filters={filters} onChange={setFilters} />
      <ResearchResults
        noun="graduation projects"
        pagination={data?.pagination}
        loading={loading}
        error={error}
        onRetry={retry}
        onPageChange={(page) => setSelection({ query, page })}
        onClear={() => setFilters(EMPTY_PROJECT_FILTERS)}
      >
        <ProjectsTable
          projects={data?.data ?? []}
          sort={sort}
          onSort={setSort}
        />
      </ResearchResults>
    </ResearchPanel>
  );
}
