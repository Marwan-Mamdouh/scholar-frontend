import type { ResearcherStats } from "../Research.type";

interface ProfileStatsProps {
  stats?: ResearcherStats;
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  if (!stats) return null;

  const items = [
    { label: "H-INDEX", value: stats.hIndex, colorClass: "text-accent-400" },
    { label: "PAPERS", value: stats.publications, colorClass: "text-accent-400" },
    { label: "CITATIONS", value: stats.citations, colorClass: "text-primary-300" },
  ];

  // Only render items that have values
  const visibleItems = items.filter((item) => item.value != null && item.value !== "");
  if (visibleItems.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {visibleItems.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800/60 py-6"
        >
          <span className={`text-4xl font-bold ${item.colorClass}`}>
            {item.value}
          </span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
