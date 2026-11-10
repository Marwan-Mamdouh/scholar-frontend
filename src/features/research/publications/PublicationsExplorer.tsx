"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import notFoundAnimation from "@/src/components/assets/NotFound.json";
import { apiGet } from "@/src/lib/api-client";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import CatalogLayout from "@/src/components/catalog/CatalogLayout";
import { Input } from "@/src/components/ui/InputField/Input";
import PublicationFilterBar from "./PublicationFilterBar";
import PublicationCard from "./PublicationCard";
import { CATALOG_GRID } from "@/src/components/catalog/CatalogCard";
import {
  buildSearchParams,
  countActivePublicationFilters,
} from "./publication.api";
import { EMPTY_FILTERS } from "./publication.constants";
import type {
  Publication,
  PublicationDomain,
  PublicationFilterRanges,
  PublicationFilterResponse,
  PublicationFilterState,
} from "./publication.type";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface PublicationsExplorerProps {
  domains: PublicationDomain[];
  ranges: PublicationFilterRanges;
  initialPublications: Publication[];
}

const PublicationsExplorer = ({
  domains,
  ranges,
  initialPublications,
}: PublicationsExplorerProps) => {
  const [filters, setFilters] = useState<PublicationFilterState>(EMPTY_FILTERS);
  const [result, setResult] = useState<{
    key: string;
    data?: Publication[];
    error?: string;
  }>();
  const [reloadToken, setReloadToken] = useState(0);

  const debouncedSearch = useDebouncedValue(filters.search, 300);

  const queryKey = buildSearchParams(
    { ...filters, search: debouncedSearch },
    ranges,
  ).toString();

  const requestKey = `${queryKey}:${reloadToken}`;
  const initialKey = `${buildSearchParams(EMPTY_FILTERS, ranges)}:0`;
  const current =
    requestKey === initialKey
      ? { key: initialKey, data: initialPublications, error: undefined }
      : result;
  const loading =
    current?.key !== requestKey || filters.search !== debouncedSearch;
  const error = current?.key === requestKey ? current.error : undefined;
  const visible = current?.key === requestKey ? current.data ?? [] : [];

  useEffect(() => {
    if (requestKey === initialKey) return;

    const controller = new AbortController();

    apiGet<PublicationFilterResponse>(`/publication/search?${queryKey}`, {
      signal: controller.signal,
    })
      .then((data) => {
        if (controller.signal.aborted) return;
        setResult({ key: requestKey, data: data.data ?? [] });
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setResult({
          key: requestKey,
          error:
            cause instanceof Error
              ? cause.message
              : "Something went wrong loading publications.",
        });
      });

    return () => controller.abort();
  }, [queryKey, requestKey, initialKey]);

  return (
    <CatalogLayout
      search={
        <Input
          aria-label="Search publications"
          placeholder="Search by title, acronym or publisher"
          value={filters.search}
          onChange={(event) =>
            setFilters({ ...filters, search: event.target.value })
          }
        />
      }
      filters={
        <PublicationFilterBar
          filters={filters}
          onChange={setFilters}
          domains={domains}
          ranges={ranges}
        />
      }
      activeFilterCount={countActivePublicationFilters(filters, ranges)}
      resultsLabel="Publication results"
    >
      <div className="flex items-center justify-between gap-4 min-h-6">
        <span role="status" className="text-sm text-neutral-300">
          {loading
            ? "Loading publications…"
            : error
              ? "Publications unavailable"
              : `${visible.length} publication${visible.length === 1 ? "" : "s"}`}
        </span>
        {loading && (
          <Loader2
            className="size-4 animate-spin text-accent-300"
            aria-hidden="true"
          />
        )}
      </div>

      {loading ? (
        <div role="status" className="py-16 text-center text-neutral-200">
          Updating publications…
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <h3 className="text-xl font-semibold text-danger-300">
            Couldn&apos;t load publications
          </h3>
          <p className="text-neutral-100 max-w-md">{error}</p>
          <button
            type="button"
            onClick={() => setReloadToken((token) => token + 1)}
            className="mt-1 rounded-full border border-accent-400 px-5 py-2 text-sm text-accent-200 hover:bg-accent-400/10 cursor-pointer transition-colors"
          >
            Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2.5 pt-10.5 pb-16">
          <Lottie
            animationData={notFoundAnimation}
            loop
            className="w-64 mx-auto"
          />
          <h3 className="text-2xl font-semibold text-accent-300">
            No Publications Match Your Filters
          </h3>
          <p className="text-neutral-100">
            Try widening a range or clearing a filter to see more results.
          </p>
        </div>
      ) : (
        <div className={CATALOG_GRID}>
          {visible.map((publication) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              currency={filters.currency}
            />
          ))}
        </div>
      )}
    </CatalogLayout>
  );
};

export default PublicationsExplorer;
