"use client";

import React from "react";

export type TabType = "researchers" | "papers" | "projects";

interface ResearchTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ResearchTabs: React.FC<ResearchTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: "researchers", label: "Researchers" },
    { id: "papers", label: "Papers" },
    { id: "projects", label: "Projects" },
  ];

  return (
    <div className="flex w-full items-end gap-0.5 mt-7 z-10 relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <span
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-14.5 py-1.5 rounded-t-xl transition-all font-normal text-lg ${
              isActive
                ? "bg-transparent text-accent-200 border-t-4 border-x border-accent-200 font-semibold"
                : "bg-accent-700 text-neutral-50 hover:text-accent-200 cursor-pointer"
            }`}
          >
            {tab.label}
          </span>
        );
      })}
    </div>
  );
};

export default ResearchTabs;
