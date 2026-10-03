"use client";

import ResearchToolbar from "../shared/ResearchToolbar";
import FilterPill from "../shared/FilterPill";
import type { ResearchSort } from "../shared/ResearchTable";

const SORT_OPTIONS = [
  { value: "id:asc", label: "Default order" },
  { value: "title:asc", label: "Title: A–Z" },
  { value: "title:desc", label: "Title: Z–A" },
  { value: "yearLunched:desc", label: "Launch year: newest" },
  { value: "yearLunched:asc", label: "Launch year: oldest" },
  { value: "createdAt:desc", label: "Recently added" },
] as const;

export default function PublicationFilterBar({
  search,
  onSearch,
  sort,
  onSort,
}: {
  search: string;
  onSearch: (value: string) => void;
  sort: ResearchSort;
  onSort: (sort: ResearchSort) => void;
}) {
  return (
    <ResearchToolbar
      search={search}
      onSearch={onSearch}
      placeholder="Search by title, acronym or ISSN"
    >
      <FilterPill label="Sort by">
        <div className="flex flex-col gap-2">
          {SORT_OPTIONS.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm text-neutral-100"
            >
              <input
                type="radio"
                name="publication-sort"
                value={value}
                checked={`${sort.key}:${sort.direction}` === value}
                onChange={() => {
                  const [key, direction] = value.split(":");
                  onSort({
                    key,
                    direction: direction === "desc" ? "desc" : "asc",
                  });
                }}
                className="accent-accent-400"
              />
              {label}
            </label>
          ))}
        </div>
      </FilterPill>
    </ResearchToolbar>
  );
}
