"use client";

import { FC } from "react";
import ResearcherCard from "./ResearcherCard/ResearcherCard";
import type { Researcher } from "./Research.type";

export interface ResearcherGridProps {
  /** Researcher records to render — pass an empty array for the empty state */
  researchers: Researcher[];
  /** Total matching researchers (drives the "X of Y" counter in the parent) */
  total?: number;
  /** Called when a card's bookmark button is toggled */
  onBookmarkToggle?: (id: string) => void;
}

/**
 * Renders a responsive grid of ResearcherCards.
 *
 * Pure presentational component — does not import or fetch data itself.
 * The parent (`ResearchContent`) is responsible for providing the data.
 */
const ResearcherGrid: FC<ResearcherGridProps> = ({
  researchers,
  onBookmarkToggle,
}) => {
  if (researchers.length === 0) {
    // When there are no results, return null — the parent component
    // handles the shared empty state UI (Lottie animation + messaging).
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {researchers.map((researcher) => (
        <ResearcherCard
          key={researcher.id}
          researcher={researcher}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  );
};

export default ResearcherGrid;
