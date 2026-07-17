"use client";

import { FC } from "react";
import { Input } from "@/src/components/ui/InputField/Input";
import dynamic from "next/dynamic";
import notFoundAnimation from "@/src/components/assets/NotFound.json";
import ResearcherGrid from "./ResearcherGrid";
import type { Researcher } from "./Research.type";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export interface ResearchContentProps {
  activeTab: string;
}

const CONTENT_DATA: Record<
  string,
  {
    filters: string[];
    emptyTitle: string;
    emptyDesc: string;
    placeholder: string;
  }
> = {
  researchers: {
    filters: ["Topics", "Research Fields", "Universities"],
    emptyTitle: "Find What You're Looking For",
    emptyDesc: "Choose Topics, Keywords, Or Universities To Begin Your Search.",
    placeholder: "by Researcher Name",
  },
  papers: {
    filters: ["Year"],
    emptyTitle: "Start Your Paper Search",
    emptyDesc:
      "Search by keywords, paste an abstract, or filter by year to find the most relevant research",
    placeholder: "Paper",
  },
  projects: {
    filters: ["Universities", "Project Field", "Year", "Sponsorship"],
    emptyTitle: "Find What You're Looking For",
    emptyDesc: "Choose topics, keywords, or universities to begin your search.",
    placeholder: "by title, student or supervisor",
  },
};

const ResearchContent: FC<ResearchContentProps> = ({ activeTab }) => {
  const currentContent = CONTENT_DATA[activeTab] || CONTENT_DATA.researchers;

  // TODO(api-owner): Replace this empty array with a real call to
  // `getResearchers()` from `./api.ts` once the backend endpoint is live.
  // The recommended pattern is to call `getResearchers()` server-side in
  // `app/research/page.tsx` (already an async server component) and pass
  // the result down through ResearchContainer → ResearchContent → ResearcherGrid.
  // See the JSDoc in `./api.ts` for the full wiring recommendation.
  const researchers: Researcher[] = [];
  const totalResearchers = 0;

  const hasResults = researchers.length > 0;

  const handleBookmarkToggle = (id: string) => {
    // TODO: call the bookmark API once it exists
    console.log("toggle bookmark for", id);
  };

  const handleViewProfile = (id: string) => {
    // TODO: wire to routing once routing logic is determined
    console.log("view profile for", id);
  };

  return (
    <div className="w-full bg-transparent border-2 border-accent-200 rounded-b-2xl rounded-tr-2xl p-6 min-h-100 flex flex-col gap-8 relative -mt-px">
      {/* Top action bar */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="w-75">
          <Input placeholder={`Search ${currentContent.placeholder}`} />
        </div>

        {/* Dropdowns */}
        <div className="flex gap-2">
          {currentContent.filters.map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 rounded-full border border-[#4d6e7c] text-neutral-300 text-sm flex items-center gap-2"
            >
              {filter} <span className="text-[10px]">▼</span>
            </button>
          ))}
        </div>

        {/* Result counter — only when there are results to show */}
        {hasResults && totalResearchers > 0 && (
          <span className="ml-auto text-sm text-neutral-300">
            <span className="font-semibold text-accent-300">
              {researchers.length}
            </span>{" "}
            of {totalResearchers} researchers
          </span>
        )}
      </div>

      {/* Content area: researcher grid (returns null if empty) */}
      {activeTab === "researchers" && (
        <ResearcherGrid
          researchers={researchers}
          total={totalResearchers}
          onBookmarkToggle={handleBookmarkToggle}
          onViewProfile={handleViewProfile}
        />
      )}

      {/* Empty state — shared across all tabs when there are no results */}
      {(!hasResults || activeTab !== "researchers") && (
        <div className="flex-1 flex flex-col items-center justify-center pt-10.5 pb-16 gap-2.5">
          <div className="relative flex items-center justify-center">
            <Lottie
              animationData={notFoundAnimation}
              loop={true}
              className="w-64 mx-auto"
            />
          </div>
          <h3 className="text-2xl font-semibold text-accent-300">
            {currentContent.emptyTitle}
          </h3>
          <p className="text-neutral-100">{currentContent.emptyDesc}</p>
        </div>
      )}
    </div>
  );
};

export default ResearchContent;
