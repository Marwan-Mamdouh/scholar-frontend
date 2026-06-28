import { User } from "@/src/components/Icons/User";
import { Document } from "@/src/components/Icons/Document";
import { Browser } from "@/src/components/Icons/Browser";
import { FC } from "react";

export interface StatItem {
  label: string;
  value: string | number;
}

export interface ResearchInfoCardProps {
  title: string;
  description: string;
  stats?: StatItem[];
}

const ResearchInfoCard: FC<ResearchInfoCardProps> = ({
  title,
  description,
  stats,
}) => {
  const renderIcon = () => {
    if (title.includes("Researchers")) return <User />;
    if (title.includes("Papers")) return <Document />;
    if (title.includes("Projects")) return <Browser />;
  };
  return (
    <div className="relative z-0 w-full rounded-2xl bg-brand-gradient p-6 border border-[#34515e] flex flex-col md:flex-row gap-6 overflow-hidden">
      <div className="w-2 rounded-full bg-primary-200 shrink-0" />
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-200 flex items-center gap-2.5">
            {renderIcon()}
            {title}
          </h2>
          <p className="text-neutral-50 text-lg">{description}</p>
        </div>

        {stats && (
          <div className="flex items-start md:items-center flex-col md:flex-row gap-6 rounded-lg bg-white/10 p-3 border border-[#34515e]">
            {stats?.map((stat, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-2xl font-bold text-primary-300">
                  {stat.value}
                </span>
                <span className="text-white font-medium text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchInfoCard;
