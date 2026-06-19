"use client";

import { useState } from "react";
import ResearchTabs, { TabType } from "./ResearchTabs";
import ResearchInfoCard, { ResearchInfoCardProps } from "./ResearchInfoCard";
import ResearchContent from "./ResearchContent";
import LightingGlow from "@/src/components/ui/LightingGlow/LightingGlow";

const RESEARCH_DATA: Record<TabType, ResearchInfoCardProps> = {
  researchers: {
    title: "Explore Researchers",
    description:
      "Browse academic profiles, research areas, and publications to find experts in your field",
    stats: [
      { label: "Researchers", value: 879 },
      { label: "Universities", value: 481 },
      { label: "Topics", value: 17 },
    ],
  },
  papers: {
    title: "Explore Papers",
    description:
      "Discover ground-breaking academic papers and research across various disciplines",
    stats: [
      { label: "Papers", value: "12k+" },
      { label: "Citations", value: "45k+" },
      { label: "Journals", value: 120 },
    ],
  },
  projects: {
    title: "Explore Projects",
    description:
      "Find real-world research projects and collaborative initiatives worldwide",
    stats: [
      { label: "Projects", value: 342 },
      { label: "Institutions", value: 156 },
      { label: "Funding", value: "$12M+" },
    ],
  },
};

const ResearchContainer = () => {
  const [activeTab, setActiveTab] = useState<TabType>("researchers");

  const currentInfo = RESEARCH_DATA[activeTab];

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col pt-8 pb-24 px-4 md:px-8">
      {/* Info Card */}
      <ResearchInfoCard
        title={currentInfo.title}
        description={currentInfo.description}
        stats={currentInfo.stats}
      />

      {/* Tabs */}
      <ResearchTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <ResearchContent activeTab={activeTab} />
    </div>
  );
};

export default ResearchContainer;
