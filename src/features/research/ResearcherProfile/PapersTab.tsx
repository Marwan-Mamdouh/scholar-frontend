"use client";

import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import type { Paper } from "./researcherProfile.type";

interface PapersTabProps {
  papers: Paper[];
}

const PAGE_SIZE = 5;

export default function PapersTab({ papers }: PapersTabProps) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let result = papers;

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Sort by year
    result = [...result].sort((a, b) =>
      sortOrder === "desc" ? b.year - a.year : a.year - b.year,
    );

    return result;
  }, [papers, search, sortOrder]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  if (papers.length === 0) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800/60 p-8">
        <p className="text-sm text-neutral-400">No papers available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800/60 p-5 md:p-6">
      {/* Search + Sort row */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            icon="lucide:search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Search title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            className="h-10 w-full rounded-xl border border-neutral-700 bg-neutral-900/50 pl-9 pr-4 text-sm text-neutral-50 placeholder-neutral-500 outline-none transition-colors focus:border-primary-500/60"
          />
        </div>
        <button
          type="button"
          onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
          className="flex h-10 items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/50 px-4 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-50"
        >
          Year
          <Icon
            icon={sortOrder === "desc" ? "lucide:arrow-down" : "lucide:arrow-up"}
            className="h-3.5 w-3.5"
          />
        </button>
      </div>

      {/* Paper list */}
      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-neutral-400">
          No papers match your search.
        </p>
      ) : (
        <div className="flex flex-col">
          {visible.map((paper, i) => (
            <div
              key={paper.id}
              className={`flex gap-4 py-4 transition-colors hover:bg-neutral-700/20 ${
                i < visible.length - 1 ? "border-b border-neutral-700/50" : ""
              }`}
            >
              {/* Year */}
              <span className="w-14 shrink-0 text-lg font-bold text-accent-400">
                {paper.year}
              </span>

              {/* Paper info */}
              <div className="flex flex-1 flex-col gap-1.5">
                <h4 className="text-sm font-semibold leading-snug text-neutral-50">
                  {paper.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {paper.journal && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-700/60 px-2.5 py-0.5 text-xs text-neutral-300">
                      <Icon icon="lucide:file-text" className="h-3 w-3" aria-hidden="true" />
                      {paper.journal}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-700/40 px-2.5 py-0.5 text-xs font-medium text-primary-300">
                    <Icon icon="lucide:quote" className="h-3 w-3" aria-hidden="true" />
                    {paper.citations}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-neutral-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
