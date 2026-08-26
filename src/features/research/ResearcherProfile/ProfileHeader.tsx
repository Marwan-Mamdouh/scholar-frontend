"use client";

import { Icon } from "@iconify/react";
import Button from "@/src/components/ui/Button/Button";
import { avatarColorMap } from "../ResearcherCard/researcherCard.style";
import type { ResearcherProfile } from "./researcherProfile.type";

interface ProfileHeaderProps {
  researcher: ResearcherProfile;
}

export default function ProfileHeader({ researcher }: ProfileHeaderProps) {
  const avatarBg = avatarColorMap[researcher.avatarColor] ?? "bg-neutral-500";
  const hasInstitution = !!researcher.institution;
  const hasPrimaryField = !!researcher.primaryField;
  const hasInterests = researcher.interests && researcher.interests.length > 0;

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800/60 p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: Avatar + Info */}
        <div className="flex items-start gap-4">
          {/* Scaled-up avatar */}
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-neutral-50 ${avatarBg}`}
            aria-hidden="true"
          >
            {researcher.initials}
          </div>

          <div className="flex flex-col gap-1">
            {/* Name */}
            <h1 className="text-2xl font-bold text-neutral-50 md:text-3xl">
              {researcher.name}
            </h1>

            {/* Institution line */}
            <div className="flex items-center gap-1.5 text-sm text-neutral-300">
              <Icon icon="lucide:building-2" className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{hasInstitution ? researcher.institution : "Unknown Institution"}</span>
            </div>

            {/* Primary field tag */}
            {hasPrimaryField && (
              <span className="text-sm font-medium text-accent-400">
                {researcher.primaryField}
              </span>
            )}

            {/* Interests line */}
            {hasInterests && (
              <div className="flex items-center gap-1.5 text-sm text-neutral-200">
                <Icon icon="lucide:tag" className="h-3.5 w-3.5 shrink-0 text-neutral-400" aria-hidden="true" />
                <span>
                  <span className="text-neutral-400">Interests:</span>{" "}
                  {researcher.interests!.join(" / ")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Scholar buttons */}
        <div className="flex shrink-0 gap-2 sm:mt-1">
          <Button
            variant="solid"
            intent="danger"
            size="md"
            iconLeft={<Icon icon="lucide:graduation-cap" className="h-4 w-4" />}
            onClick={() => console.log("Open Google Scholar")}
          >
            Google Scholar
          </Button>
          <Button
            variant="outlined"
            intent="accent"
            size="md"
            iconLeft={<Icon icon="lucide:book-open" className="h-4 w-4" />}
            onClick={() => console.log("Open Semantic Scholar")}
          >
            Semantic Scholar
          </Button>
        </div>
      </div>
    </div>
  );
}
