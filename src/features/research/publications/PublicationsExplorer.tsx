"use client";

import { useState } from "react";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import ResearchResults from "../shared/ResearchResults";
import { useResearchQuery } from "../shared/useResearchQuery";
import type { ResearchSort } from "../shared/ResearchTable";
import PublicationFilterBar from "./PublicationFilterBar";
import PublicationsTable from "./PublicationsTable";
import {
  buildPublicationParams,
  DEFAULT_PUBLICATION_SORT,
} from "./publication.api";
import type { PublicationsResponse } from "./publication.type";

export default function PublicationsExplorer({
  initialResponse,
}: {
  initialResponse: PublicationsResponse;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<ResearchSort>(DEFAULT_PUBLICATION_SORT);
  const debouncedSearch = useDebouncedValue(search, 300);
  const query = buildPublicationParams(debouncedSearch, sort).toString();
  const [selection, setSelection] = useState({ query, page: 1 });
  if (selection.query !== query) setSelection({ query, page: 1 });
  const page = selection.query === query ? selection.page : 1;
  const { data, error, loading, retry } =
    useResearchQuery<PublicationsResponse>(
      `/publications?${query}&page=${page}`,
      initialResponse,
    );

  return (
    <>
      <PublicationFilterBar
        search={search}
        onSearch={setSearch}
        sort={sort}
        onSort={setSort}
      />
      <ResearchResults
        noun="publications"
        pagination={data?.pagination}
        loading={loading}
        error={error}
        onRetry={retry}
        onPageChange={(page) => setSelection({ query, page })}
        onClear={() => setSearch("")}
      >
        <PublicationsTable
          publications={data?.data ?? []}
          sort={sort}
          onSort={setSort}
        />
      </ResearchResults>
    </>
  );
}
