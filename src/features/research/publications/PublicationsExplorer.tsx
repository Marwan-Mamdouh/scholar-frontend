"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import notFoundAnimation from "@/src/components/assets/NotFound.json";
import { apiPost } from "@/src/lib/api-client";
import PublicationFilterBar from "./PublicationFilterBar";
import PublicationsTable from "./PublicationsTable";
import { buildFilterPayload } from "./publication.api";
import { EMPTY_FILTERS } from "./publication.constants";
import type {
  Publication,
  PublicationDomain,
  PublicationFilterRanges,
  PublicationFilterResponse,
  PublicationFilterState,
} from "./publication.type";
import { matchesSearch } from "./publication.utils";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface PublicationsExplorerProps {
  domains: PublicationDomain[];
  ranges: PublicationFilterRanges;
  initialPublications: Publication[];
}

type Status = "idle" | "loading" | "error";

const PublicationsExplorer = ({
  domains,
  ranges,
  initialPublications,
}: PublicationsExplorerProps) => {
  const [filters, setFilters] = useState<PublicationFilterState>(EMPTY_FILTERS);
  const [publications, setPublications] =
    useState<Publication[]>(initialPublications);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  // Only the server-side half of the filter state should trigger a request;
  // `search` is applied locally, so keying off the payload keeps typing cheap.
  const payload = buildFilterPayload(filters, ranges);
  const payloadKey = JSON.stringify(payload);

  // Key of the payload the rows in state were fetched with. Guards the initial
  // server-rendered data and React's double-invoked effects in development.
  const loadedKeyRef = useRef(payloadKey);

  useEffect(() => {
    if (loadedKeyRef.current === payloadKey && reloadToken === 0) return;

    const controller = new AbortController();
    setStatus("loading");
    setError(null);

    apiPost<PublicationFilterResponse>(
      "/publication/filter",
      JSON.parse(payloadKey),
      { signal: controller.signal },
    )
      .then((data) => {
        loadedKeyRef.current = payloadKey;
        setPublications(data.publications ?? []);
        setStatus("idle");
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "Something went wrong loading publications.",
        );
        setStatus("error");
      });

    return () => controller.abort();
  }, [payloadKey, reloadToken]);

  const visible = publications.filter((publication) =>
    matchesSearch(publication, filters.search),
  );

  return (
    <div className="flex flex-col gap-6">
      <PublicationFilterBar
        filters={filters}
        onChange={setFilters}
        domains={domains}
        ranges={ranges}
      />

      <div className="flex items-center justify-between gap-4 min-h-6">
        <span className="text-sm text-neutral-300">
          {status === "loading"
            ? "Loading publications…"
            : `${visible.length} publication${visible.length === 1 ? "" : "s"}`}
        </span>
        {status === "loading" && (
          <Loader2
            className="size-4 animate-spin text-accent-300"
            aria-hidden="true"
          />
        )}
      </div>

      {status === "error" ? (
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
        <div
          className={`transition-opacity duration-300 ${status === "loading" ? "opacity-60" : "opacity-100"}`}
        >
          <PublicationsTable publications={visible} currency={filters.currency} />
        </div>
      )}
    </div>
  );
};

export default PublicationsExplorer;
