import { Suspense } from "react";
import ResearchTabsClient from "./ResearchTabsClient";
import ResearchInfoCard, { ResearchInfoCardProps } from "./ResearchInfoCard";
import ResearchContent from "./ResearchContent";
import { PublicationsPanel, PublicationsPanelSkeleton } from "./publications";
import { TabType } from "./Research.type";
import { fetchCatalogSummary } from "@/src/lib/catalog";

const RESEARCH_DATA: Record<TabType, ResearchInfoCardProps> = {
  researchers: {
    title: "Explore Researchers",
    description:
      "Browse academic profiles, research areas, and publications to find experts in your field",
  },
  papers: {
    title: "Discover Academic Papers",
    description:
      " Explore academic papers and citation networks across top journals and research platforms.",
  },
  publications: {
    title: "Compare Publications",
    description:
      "Filter journals and transactions by category, access model, metrics, fees and review speed to find where to submit.",
  },
  projects: {
    title: "Explore Graduation Projects",
    description:
      "Discover real student projects, explore ideas, and get inspired for your own work",
  },
};

const ResearchContainer = async ({ activeTab }: { activeTab: TabType }) => {
  const currentInfo = RESEARCH_DATA[activeTab];
  const summary =
    activeTab === "researchers" ? await fetchCatalogSummary() : null;
  const stats = summary
    ? [
        { label: "Researchers", value: summary.researchers },
        { label: "Universities", value: summary.universities },
        { label: "Topics", value: summary.topics },
      ]
    : undefined;

  return (
    <div className="flex w-full min-w-0 flex-col gap-6">
      {/* Info Card */}
      <ResearchInfoCard
        title={currentInfo.title}
        description={currentInfo.description}
        stats={stats}
      />

      {/* Tabs */}
      <ResearchTabsClient activeTab={activeTab} />

      {/* Content */}
      {activeTab === "publications" ? (
        <Suspense fallback={<PublicationsPanelSkeleton />}>
          <PublicationsPanel />
        </Suspense>
      ) : (
        <ResearchContent key={activeTab} activeTab={activeTab} />
      )}
    </div>
  );
};

export default ResearchContainer;
