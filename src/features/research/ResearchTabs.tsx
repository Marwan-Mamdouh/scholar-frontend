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
    <div className="flex w-full items-end gap-2 mt-8 z-10 relative">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-8 py-3 rounded-t-xl transition-all font-semibold ${
              isActive
                ? "bg-neutral-800 text-white border-t border-l border-r border-[#4d6e7c] border-b-0"
                : "bg-[#113145] text-neutral-300 hover:text-white hover:bg-neutral-700 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default ResearchTabs;
