"use client";

import React, { useState } from "react";
import { FiSearch, FiUser, FiBookOpen, FiBriefcase, FiTrendingUp } from "react-icons/fi";
import Button from "@/src/components/Button";

type TabType = "researchers" | "projects" | "challenges";

export default function SearchWidget() {
  const [activeTab, setActiveTab] = useState<TabType>("researchers");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const tabConfig = {
    researchers: {
      placeholder: "Search by discipline, university, or research topic (e.g., 'Quantum Computing')...",
      icon: FiUser,
      accentColor: "text-primary-300",
      bgGlow: "after:bg-primary-500/20",
      tags: [
        { label: "AI & Neural Networks", query: "neural networks" },
        { label: "Bio-Materials", query: "bio-materials" },
        { label: "Decarbonization", query: "decarbonization" },
      ],
    },
    projects: {
      placeholder: "Search active publications, patent drafts, or lab experiments...",
      icon: FiBookOpen,
      accentColor: "text-accent-300",
      bgGlow: "after:bg-accent-400/20",
      tags: [
        { label: "Solid State Batteries", query: "solid state battery" },
        { label: "CRISPR Editing", query: "crispr" },
        { label: "Fusion Energy", query: "fusion energy" },
      ],
    },
    challenges: {
      placeholder: "Search corporate R&D briefs, tech transfer opportunities, or grants...",
      icon: FiBriefcase,
      accentColor: "text-accent-300",
      bgGlow: "after:bg-accent-300/20",
      tags: [
        { label: "Smart Grid Security", query: "smart grid" },
        { label: "Green Concrete Tech", query: "green concrete" },
        { label: "Neuromorphic Chips", query: "neuromorphic" },
      ],
    },
  };

  const handleTagClick = (tagQuery: string) => {
    setSearchQuery(tagQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    alert(`Searching for "${searchQuery}" in ${activeTab}...`);
  };

  const CurrentIcon = tabConfig[activeTab].icon;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 md:mt-14 px-4 sm:px-0">
      {/* Search Console Wrapper with Sleek Glassmorphism */}
      <div className="relative rounded-3xl border border-neutral-700/50 bg-neutral-900/60 p-5 md:p-6 backdrop-blur-xl shadow-2xl shadow-neutral-950/80">
        
        {/* Decorative subtle header line glow */}
        <div className="absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4 mb-5">
          {(["researchers", "projects", "challenges"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            const Config = tabConfig[tab];
            const Icon = Config.icon;
            
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-btn transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "bg-neutral-800 text-neutral-50 shadow-inner" 
                    : "text-neutral-300 hover:text-neutral-50 hover:bg-neutral-800/40"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? Config.accentColor : "text-neutral-400"}`} />
                <span className="capitalize text-caption font-semibold tracking-wide">
                  {tab === "researchers" ? "Find Researchers" : tab === "projects" ? "Explore Research" : "Industry Challenges"}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-5 -translate-x-1/2 rounded-t-full bg-gradient-to-r from-primary-400 to-accent-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Search Form */}
        <form onSubmit={handleSearchSubmit} className="relative flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            {/* Input Left Icon */}
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center justify-center">
              <CurrentIcon className={`h-5 w-5 transition-colors duration-300 ${isFocused ? tabConfig[activeTab].accentColor : "text-neutral-400"}`} />
            </div>

            {/* Main Input Element */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={tabConfig[activeTab].placeholder}
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950/80 py-4 pl-12 pr-4 text-subtext text-neutral-100 placeholder-neutral-400 outline-none transition-all duration-300 focus:border-primary-400/80 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>

          {/* Glowing Submit Button */}
          <Button
            type="submit"
            variant={activeTab === "researchers" ? "primary" : "accent"}
            className="md:w-36 py-4 rounded-2xl text-caption font-bold shadow-lg hover:shadow-primary-500/20"
          >
            <span>Search</span>
            <FiSearch className="h-4.5 w-4.5" />
          </Button>
        </form>

        {/* Instant Suggestions & Keywords */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-caption text-neutral-400">
          <div className="flex items-center gap-1.5 shrink-0 text-neutral-300 font-medium">
            <FiTrendingUp className="h-4 w-4 text-accent-300" />
            <span>Trending Topics:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabConfig[activeTab].tags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handleTagClick(tag.query)}
                className="rounded-lg border border-neutral-800 bg-neutral-950/40 px-2.5 py-1 text-caption text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-800 hover:text-neutral-100 cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
