"use client";

import { FC, useState } from "react";
import { Icon } from "@iconify/react";
import Badge from "@/src/components/ui/Badge/Badge";
import Button from "@/src/components/ui/Button/Button";
import type { ResearcherCardProps } from "./researcherCard.type";
import {
  getCardContainerClasses,
  getAvatarClasses,
  getStatChipClasses,
  getBookmarkClasses,
} from "./researcherCard.style";

/**
 * Presentational card for a single researcher.
 *
 * Defensive rendering: every optional field is guarded — if a value is
 * missing (undefined / empty string / empty array), the entire section is
 * omitted rather than rendering a label with no value or placeholder text.
 */
const ResearcherCard: FC<ResearcherCardProps> = ({
  researcher,
  onBookmarkToggle,
  onViewProfile,
  className = "",
}) => {
  const [bookmarked, setBookmarked] = useState(
    researcher.bookmarked ?? false,
  );

  const handleBookmarkToggle = () => {
    setBookmarked((prev) => !prev);
    onBookmarkToggle?.(researcher.id);
  };

  const { stats, tags } = researcher;

  // Build the list of stat chips to render — skip any that are missing.
  const statChips: { label: string; value: string | number }[] = [];
  if (stats?.publications != null) {
    statChips.push({ label: "Pubs", value: stats.publications });
  }
  if (stats?.citations != null && stats.citations !== "") {
    statChips.push({ label: "Citations", value: stats.citations });
  }
  if (stats?.hIndex != null) {
    statChips.push({ label: "h-index", value: stats.hIndex });
  }

  const hasInstitutionAbbr = !!researcher.institutionAbbr;
  const hasRole = !!researcher.role;
  const hasInstitution = !!researcher.institution;
  const hasDescription = !!researcher.description;
  const hasTags = Array.isArray(tags) && tags.length > 0;

  return (
    <article className={`${getCardContainerClasses()} ${className}`}>
      {/* Top row: avatar + institution badge + bookmark */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Avatar circle with initials */}
          <div className={getAvatarClasses(researcher.avatarColor)}>
            {researcher.initials}
          </div>

          {/* Institution abbreviation badge — only if present */}
          {hasInstitutionAbbr && (
            <Badge
              variant="outlined"
              intent="accent"
              size="sm"
              leftIcon={
                <Icon icon="lucide:graduation-cap" className="w-3 h-3" />
              }
            >
              {researcher.institutionAbbr}
            </Badge>
          )}
        </div>

        {/* Bookmark button */}
        <button
          type="button"
          onClick={handleBookmarkToggle}
          aria-label={bookmarked ? "Remove from saved" : "Save researcher"}
          aria-pressed={bookmarked}
          className={getBookmarkClasses(bookmarked)}
        >
          <Icon
            icon={bookmarked ? "lucide:bookmark-check" : "lucide:bookmark"}
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Name (always present — required field) */}
      <h3 className="text-lg font-semibold text-neutral-50 leading-tight">
        {researcher.name}
      </h3>

      {/* Role / title — only if present */}
      {hasRole && (
        <p className="text-sm font-medium text-neutral-200 -mt-2">
          {researcher.role}
        </p>
      )}

      {/* Institution line — only if present */}
      {hasInstitution && (
        <div className="flex items-center gap-1.5 -mt-2">
          <Icon
            icon="lucide:building-2"
            className="w-3.5 h-3.5 text-neutral-300 shrink-0"
          />
          <span className="text-xs text-neutral-300">
            {researcher.institution}
          </span>
        </div>
      )}

      {/* Description (2-line clamp) — only if present */}
      {hasDescription && (
        <p className="text-sm text-neutral-200 line-clamp-2 leading-relaxed">
          {researcher.description}
        </p>
      )}

      {/* Stats row — only chips with actual values */}
      {statChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {statChips.map((chip) => (
            <span key={chip.label} className={getStatChipClasses()}>
              {chip.label}: {chip.value}
            </span>
          ))}
        </div>
      )}

      {/* Tag chips — only if there are tags */}
      {hasTags && (
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, i) => (
            <Badge
              key={`${tag}-${i}`}
              variant="outlined"
              intent="accent"
              size="sm"
              textTransform="capitalize"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* View Profile button */}
      <Button
        variant="solid"
        intent="primary"
        size="lg"
        className="w-full mt-auto"
        onClick={() => onViewProfile?.(researcher.id)}
      >
        View Profile
      </Button>
    </article>
  );
};

export default ResearcherCard;
