"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import notFoundAnimation from "@/src/components/assets/NotFound.json";
import { ResearchTableSkeleton } from "./ResearchTable";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export interface ResearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const buttonStyle =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border border-accent-400 px-5 py-2 text-sm text-accent-200 transition-colors hover:bg-accent-400/10 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-accent-300";

export default function ResearchResults({
  noun,
  pagination,
  loading,
  error,
  onRetry,
  onPageChange,
  onClear,
  children,
}: {
  noun: string;
  pagination?: ResearchPagination;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onPageChange: (page: number) => void;
  onClear?: () => void;
  children: ReactNode;
}) {
  const { page = 1, limit = 10, total = 0, totalPages = 0 } = pagination ?? {};
  return (
    <div className="flex min-w-0 flex-col gap-6" aria-busy={loading}>
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-6 items-center justify-between gap-4 text-sm text-neutral-300"
      >
        <p>
          {loading ? (
            `Loading ${noun}…`
          ) : error ? (
            `Unable to load ${noun}`
          ) : (
            <>
              {total.toLocaleString("en-US")} {noun}
            </>
          )}
        </p>
      </div>
      {loading ? (
        <ResearchTableSkeleton />
      ) : error ? (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-3 py-16 text-center"
        >
          <h3 className="text-xl font-semibold text-danger-300">
            Couldn&apos;t load {noun}
          </h3>
          <p className="max-w-md text-neutral-100">{error}</p>
          <button type="button" onClick={onRetry} className={buttonStyle}>
            Try again
          </button>
        </div>
      ) : total === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2.5 pt-10.5 pb-16 text-center">
          <Lottie
            animationData={notFoundAnimation}
            loop
            className="mx-auto w-64"
          />
          <h3 className="text-2xl font-semibold text-accent-300">
            No {noun} found
          </h3>
          <p className="text-neutral-100">
            Try a different search or widen your filters.
          </p>
          {onClear && (
            <button type="button" onClick={onClear} className={buttonStyle}>
              Clear search and filters
            </button>
          )}
        </div>
      ) : (
        children
      )}
      {!error && total > 0 && (
        <nav
          aria-label={`${noun} pagination`}
          className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-500/60 pt-4 text-xs text-neutral-200"
        >
          <span>
            Showing {((page - 1) * limit + 1).toLocaleString("en-US")}–
            {Math.min(page * limit, total).toLocaleString("en-US")} of{" "}
            {total.toLocaleString("en-US")}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={`Previous ${noun} page`}
              disabled={loading || page <= 1}
              onClick={() => onPageChange(page - 1)}
              className={buttonStyle}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <span>
              Page {page} of {Math.max(1, totalPages)}
            </span>
            <button
              type="button"
              aria-label={`Next ${noun} page`}
              disabled={loading || page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              className={buttonStyle}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
