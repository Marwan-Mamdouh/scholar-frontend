import React from "react";

export interface StatItem {
  label: string;
  value: string | number;
}

export interface ResearchInfoCardProps {
  title: string;
  description: string;
  stats: StatItem[];
}

const ResearchInfoCard: React.FC<ResearchInfoCardProps> = ({
  title,
  description,
  stats,
}) => {
  return (
    <div className="w-full rounded-2xl bg-brand-gradient p-8 border border-[#34515e] flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          {/* Icon will be added by the user here */}
          {title}
        </h2>
        <p className="text-neutral-200 text-lg">{description}</p>
      </div>

      <div className="flex items-center gap-6 rounded-lg bg-neutral-800/50 p-4 border border-[#34515e]">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-300">
              {stat.value}
            </span>
            <span className="text-neutral-200 font-medium text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchInfoCard;
