import LightingGlow from "@/src/components/ui/LightingGlow/LightingGlow";
import StatCounter from "./StatCounter";

interface StatItem {
  value: string | null;
  label: string;
}

interface GrowthInsightsProps {
  stats: StatItem[];
}

const GrowthInsights = ({ stats }: GrowthInsightsProps) => {
  return (
    <div className="relative w-full flex justify-center my-2.5">
      {/* Glow */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-71.75 h-50 pointer-events-none">
        <LightingGlow variant="primary" className="blur-[350px] opacity-50" />
      </div>

      {/* Card */}
      <div className="relative bg-brand-gradient z-10 backdrop-blur-[10px] rounded-3xl flex flex-col items-center py-6 w-95 lg:flex-row lg:items-center lg:gap-17.75 lg:px-9.5 lg:py-6.5 lg:w-215.25 lg:h-33.5">
        {/* Left block */}
        <div className="flex flex-col items-center lg:items-start shrink-0">
          <span className="font-[kadwa] font-bold tracking-[0.10em] capitalize text-accent-400 text-[16px] leading-12.5 lg:text-[20px]">
            Powered By Innovation
          </span>
          <span className="font-[kanit] font-semibold tracking-[0.05em] capitalize text-neutral-100 text-[36px] leading-12.5 lg:text-[40px]">
            Growth Insights
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center w-full px-2.5 justify-between lg:justify-start lg:w-auto lg:px-0">
          {stats.map((stat, index) => (
            <StatCounter
              key={`${index}-${stat.label}`}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowthInsights;
