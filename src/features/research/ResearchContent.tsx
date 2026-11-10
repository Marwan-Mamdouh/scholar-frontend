"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import CatalogLayout from "@/src/components/catalog/CatalogLayout";
import { Input } from "@/src/components/ui/InputField/Input";
import Button from "@/src/components/ui/Button/Button";
import Card from "@/src/components/ui/Card/Card";
import FilterAccordion from "@/src/components/ui/FilterAccordion/FilterAccordion";
import { OptionList } from "@/src/components/ui/OptionList/OptionList";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import {
  fetchResearchCatalog,
  researchCatalogQuery,
} from "./researchCatalog.api";
import {
  EMPTY_RESEARCH_FILTERS,
  type ResearchCatalogFilters,
  type ResearchCatalogResponse,
  type ResearchCatalogTab,
} from "./researchCatalog.type";
import ResearchResultCard from "./ResearchResultCard";

type FilterKey = "topic" | "field" | "university" | "year" | "sponsorship";
const CATALOGS: Record<
  ResearchCatalogTab,
  {
    placeholder: string;
    filters: { key: FilterKey; label: string; placeholder?: string }[];
  }
> = {
  researchers: {
    placeholder: "Search by Researcher Name",
    filters: [
      { key: "topic", label: "Topics", placeholder: "e.g. Digital IC Design" },
      {
        key: "field",
        label: "Research Fields",
        placeholder: "e.g. Embedded Systems",
      },
      {
        key: "university",
        label: "Universities",
        placeholder: "e.g. Nexus Cairo",
      },
    ],
  },
  papers: {
    placeholder: "Search Paper",
    filters: [{ key: "year", label: "Year", placeholder: "e.g. 2026" }],
  },
  projects: {
    placeholder: "Search by title or supervisor",
    filters: [
      {
        key: "university",
        label: "Universities",
        placeholder: "e.g. Delta Technical",
      },
      { key: "field", label: "Project Field", placeholder: "e.g. Photonics" },
      { key: "year", label: "Year", placeholder: "e.g. 2026" },
      { key: "sponsorship", label: "Sponsorship" },
    ],
  },
};

export default function ResearchContent({
  activeTab,
}: {
  activeTab: ResearchCatalogTab;
}) {
  const catalog = CATALOGS[activeTab];
  const [filters, setFilters] = useState<ResearchCatalogFilters>(
    EMPTY_RESEARCH_FILTERS,
  );
  const delayed = useDebouncedValue(filters, 300);
  const query = researchCatalogQuery(activeTab, delayed);
  const [retry, setRetry] = useState(0);
  const key = `${activeTab}:${query}:${retry}`;
  const [result, setResult] = useState<{
    key: string;
    data?: ResearchCatalogResponse;
    error?: string;
  }>();
  const loading =
    result?.key !== key || researchCatalogQuery(activeTab, filters) !== query;
  const activeCount = catalog.filters.filter(({ key }) =>
    filters[key].trim(),
  ).length;

  useEffect(() => {
    const controller = new AbortController();
    fetchResearchCatalog(activeTab, query, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setResult({ key, data });
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setResult({
            key,
            error:
              cause instanceof Error
                ? cause.message
                : "Couldn't load this catalog.",
          });
      });
    return () => controller.abort();
  }, [activeTab, query, key]);

  function update(field: keyof ResearchCatalogFilters, value: string) {
    setFilters({ ...filters, [field]: value, page: 1 });
  }
  const data = result?.data;
  const pagination = data?.pagination;
  const first = pagination?.total
    ? (pagination.page - 1) * pagination.limit + 1
    : 0;
  const last = pagination
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : 0;

  return (
    <CatalogLayout
      search={
        <Input
          aria-label={`Search ${activeTab}`}
          placeholder={catalog.placeholder}
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
      }
      filters={
        <div className="flex w-full flex-col gap-1">
          {catalog.filters.map(({ key, label, placeholder }) => (
            <FilterAccordion
              key={key}
              label={label}
              activeCount={filters[key].trim() ? 1 : 0}
              onClear={() => update(key, "")}
            >
              {key === "sponsorship" ? (
                <OptionList
                  inputType="radio"
                  options={[
                    { value: "", label: "All projects" },
                    { value: "sponsored", label: "Sponsored" },
                    { value: "unsponsored", label: "Unsponsored" },
                  ]}
                  selected={[filters.sponsorship]}
                  onToggle={(value) => update(key, value)}
                />
              ) : (
                <Input
                  aria-label={`Filter ${activeTab} by ${label.toLowerCase()}`}
                  placeholder={placeholder}
                  type={key === "year" ? "number" : "text"}
                  min={key === "year" ? 1900 : undefined}
                  max={key === "year" ? new Date().getFullYear() : undefined}
                  size="sm"
                  value={filters[key]}
                  onChange={(event) => update(key, event.target.value)}
                />
              )}
            </FilterAccordion>
          ))}
          {(activeCount > 0 || filters.search) && (
            <Button
              type="button"
              variant="link"
              intent="accent"
              size="md"
              onClick={() => setFilters(EMPTY_RESEARCH_FILTERS)}
            >
              Clear all
            </Button>
          )}
        </div>
      }
      activeFilterCount={activeCount}
      resultsLabel={`${activeTab} results`}
    >
      <p role="status" className="text-sm text-accent-200">
        {loading
          ? `Loading ${activeTab}…`
          : result?.error
            ? "Catalog unavailable"
            : `Showing ${first}–${last} of ${pagination?.total ?? 0} ${activeTab}`}
      </p>
      <div aria-busy={loading}>
        {loading ? (
          <div
            aria-hidden="true"
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {Array.from({ length: 8 }, (_, index) => (
              <Card
                key={index}
                title=""
                variant="outlined"
                intent="primary"
                className="min-h-72 motion-safe:animate-pulse"
              >
                <div className="h-8 w-3/4 rounded bg-overlay/5" />
                <div className="h-5 w-2/3 rounded bg-overlay/5" />
                <div className="mt-6 h-24 w-full rounded bg-overlay/5" />
              </Card>
            ))}
          </div>
        ) : result?.error ? (
          <div
            role="alert"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <h3 className="text-2xl text-danger-300">
              Couldn&apos;t load {activeTab}
            </h3>
            <p className="text-neutral-100">{result.error}</p>
            <Button
              intent="accent"
              variant="outlined"
              onClick={() => setRetry((value) => value + 1)}
            >
              Try again
            </Button>
          </div>
        ) : !data?.data.length ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-4 px-4 text-center">
            <SearchX aria-hidden="true" className="size-12 text-accent-300" />
            <h3 className="text-2xl text-primary-200">No {activeTab} found</h3>
            <p className="text-neutral-100">
              Try different keywords or clear your filters.
            </p>
            <Button
              intent="accent"
              variant="outlined"
              onClick={() => {
                setFilters(EMPTY_RESEARCH_FILTERS);
                setRetry((value) => value + 1);
              }}
            >
              {activeCount || filters.search
                ? "Clear filters"
                : "Refresh catalog"}
            </Button>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {data.data.map((record) => (
              <ResearchResultCard
                key={record.id}
                tab={activeTab}
                record={record}
              />
            ))}
          </div>
        )}
      </div>
      {!loading && pagination && pagination.totalPages > 1 && (
        <nav
          aria-label={`${activeTab} pagination`}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button
            variant="outlined"
            intent="accent"
            size="md"
            disabled={pagination.page <= 1}
            iconLeft={<ChevronLeft className="size-4" />}
            onClick={() =>
              setFilters({ ...filters, page: pagination.page - 1 })
            }
          >
            Previous
          </Button>
          <span className="text-sm text-neutral-100">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outlined"
            intent="accent"
            size="md"
            disabled={pagination.page >= pagination.totalPages}
            iconRight={<ChevronRight className="size-4" />}
            onClick={() =>
              setFilters({ ...filters, page: pagination.page + 1 })
            }
          >
            Next
          </Button>
        </nav>
      )}
    </CatalogLayout>
  );
}
