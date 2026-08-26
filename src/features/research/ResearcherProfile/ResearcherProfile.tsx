"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import type { ResearcherProfile as ResearcherProfileType, ProfileTabType } from "./researcherProfile.type";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import PapersTab from "./PapersTab";
import CoAuthorsTab from "./CoAuthorsTab";
import AnalyticsTab from "./AnalyticsTab";

interface ResearcherProfileProps {
  researcher: ResearcherProfileType;
}

const TABS: { key: ProfileTabType; label: string; icon: string }[] = [
  { key: "papers", label: "Papers", icon: "lucide:file-text" },
  { key: "coAuthors", label: "Co-Authors", icon: "lucide:users" },
  { key: "analytics", label: "Analytics", icon: "lucide:bar-chart-3" },
];

export default function ResearcherProfile({ researcher }: ResearcherProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProfileTabType>("papers");

  return (
    <div className="animate-[fadeIn_250ms_ease-out] font-main">
      {/* Back to list */}
      <button
        type="button"
        onClick={() => router.push("/research?tab=researchers")}
        className="mb-5 inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800/60 px-3.5 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-50"
      >
        <Icon icon="lucide:arrow-left" className="h-4 w-4" />
        Back to list
      </button>

      {/* Header */}
      <ProfileHeader researcher={researcher} />

      {/* Stats Row */}
      <div className="mt-4">
        <ProfileStats stats={researcher.stats} />
      </div>

      {/* Tab Bar */}
      <div className="mt-8">
        <div className="flex gap-6 border-b border-neutral-700">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors duration-150 ${
                activeTab === tab.key
                  ? "text-accent-400"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Icon icon={tab.icon} className="h-4 w-4" />
              {tab.label}
              {/* Active underline indicator */}
              {activeTab === tab.key && (
                <span className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-accent-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "papers" && (
          <PapersTab papers={researcher.papers ?? []} />
        )}
        {activeTab === "coAuthors" && (
          <CoAuthorsTab coAuthors={researcher.coAuthors ?? []} />
        )}
        {activeTab === "analytics" && (
          <AnalyticsTab
            fieldsOfStudy={researcher.fieldsOfStudy ?? []}
            stats={researcher.stats}
          />
        )}
      </div>
    </div>
  );
}
