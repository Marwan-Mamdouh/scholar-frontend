"use client";

import ResearchToolbar from "../shared/ResearchToolbar";
import FilterPill from "../shared/FilterPill";
import { EMPTY_PROJECT_FILTERS, type ProjectFilters } from "./project.type";

const inputStyle =
  "w-full rounded-lg border border-neutral-400 bg-transparent px-2.5 py-1.5 text-sm text-neutral-50 outline-none focus:border-accent-400";

export default function ProjectFilterBar({
  filters,
  onChange,
}: {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
}) {
  const update = <K extends keyof ProjectFilters>(
    key: K,
    value: ProjectFilters[K],
  ) => onChange({ ...filters, [key]: value });
  const count = [
    filters.university,
    filters.projectField,
    filters.year,
    filters.sponsorship,
  ].filter(Boolean).length;
  return (
    <ResearchToolbar
      search={filters.search}
      onSearch={(search) => update("search", search)}
      placeholder="Search by project title or supervisor"
      activeCount={count}
      onClear={() =>
        onChange({ ...EMPTY_PROJECT_FILTERS, search: filters.search })
      }
    >
      <FilterPill
        label="University"
        activeCount={filters.university ? 1 : 0}
        onClear={() => update("university", "")}
      >
        <input
          aria-label="University name"
          placeholder="e.g. Cairo University"
          value={filters.university}
          onChange={(event) => update("university", event.target.value)}
          className={inputStyle}
        />
      </FilterPill>
      <FilterPill
        label="Project field"
        activeCount={filters.projectField ? 1 : 0}
        onClear={() => update("projectField", "")}
      >
        <input
          aria-label="Project field"
          placeholder="e.g. Embedded Systems"
          value={filters.projectField}
          onChange={(event) => update("projectField", event.target.value)}
          className={inputStyle}
        />
        <p className="mt-2 text-xs text-neutral-200">
          Enter a field as it appears in the table.
        </p>
      </FilterPill>
      <FilterPill
        label="Year posted"
        activeCount={filters.year ? 1 : 0}
        onClear={() => update("year", "")}
      >
        <input
          aria-label="Year posted"
          inputMode="numeric"
          placeholder="e.g. 2026"
          maxLength={4}
          value={filters.year}
          onChange={(event) =>
            update("year", event.target.value.replace(/\D/g, ""))
          }
          className={inputStyle}
        />
      </FilterPill>
      <FilterPill
        label="Sponsorship"
        activeCount={filters.sponsorship ? 1 : 0}
        onClear={() => update("sponsorship", "")}
      >
        <div className="flex flex-col gap-2">
          {(
            [
              ["", "All projects"],
              ["sponsored", "Sponsored"],
              ["unsponsored", "Not sponsored"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm text-neutral-100"
            >
              <input
                type="radio"
                name="project-sponsorship"
                value={value}
                checked={filters.sponsorship === value}
                onChange={() => update("sponsorship", value)}
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
