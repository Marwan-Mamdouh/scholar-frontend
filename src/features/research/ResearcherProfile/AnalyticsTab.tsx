import { Icon } from "@iconify/react";
import type { ResearcherStats } from "../Research.type";
import type { FieldOfStudy } from "./researcherProfile.type";

interface AnalyticsTabProps {
  fieldsOfStudy: FieldOfStudy[];
  stats?: ResearcherStats;
}

/** SVG donut chart with hollow center and stroke-dasharray segments */
function DonutChart({
  fields,
  totalPapers,
}: {
  fields: FieldOfStudy[];
  totalPapers?: number;
}) {
  const size = 240;
  const strokeWidth = 36;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  const centerNumber = totalPapers != null ? totalPapers : fields.length;
  const centerLabel = totalPapers != null ? "PAPERS" : "FIELDS";

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-label="Fields of study distribution"
      >
        {fields.map((field) => {
          const segmentLength = (field.share / 100) * circumference;
          const dashArray = `${segmentLength} ${circumference - segmentLength}`;
          const dashOffset = -cumulativeOffset;
          cumulativeOffset += segmentLength;

          return (
            <circle
              key={field.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={field.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          );
        })}
        {/* Dark center circle for donut hole */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2 - 2}
          fill="#0a2539"
        />
      </svg>

      {/* Center Label Overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-neutral-50 leading-none">
          {centerNumber}
        </span>
        <span className="mt-1 text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
          {centerLabel}
        </span>
      </div>
    </div>
  );
}

export default function AnalyticsTab({ fieldsOfStudy, stats }: AnalyticsTabProps) {
  const hasFields = fieldsOfStudy.length > 0;
  const hasStats = stats && (stats.hIndex != null || stats.publications != null || stats.citations != null);

  if (!hasFields && !hasStats) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800/60 p-8">
        <p className="text-sm text-neutral-400">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
      {/* Left: Fields of Study */}
      {hasFields && (
        <div className="flex flex-col rounded-2xl border border-neutral-700 bg-neutral-800/60 p-5 md:p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-50 md:mb-6">
            <Icon icon="lucide:info" className="h-5 w-5 text-accent-400" aria-hidden="true" />
            Fields of Study
          </h3>
          <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4 sm:flex-row sm:gap-10">
            <DonutChart fields={fieldsOfStudy} totalPapers={stats?.publications} />
            <div className="flex flex-col gap-3">
              {fieldsOfStudy.map((field) => (
                <div key={field.name} className="flex items-center gap-2.5 text-sm">
                  <span
                    className="h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: field.color }}
                  />
                  <span className="text-neutral-200 font-medium">
                    {field.name}{" "}
                    <span className="font-normal text-neutral-400">— {field.share}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Right: Stat Recap */}
      {hasStats && (
        <div className="rounded-2xl border border-neutral-700 bg-neutral-800/60 p-5 md:p-6">
          <div className="flex h-full flex-col justify-center divide-y divide-neutral-700/50">
            {stats!.hIndex != null && (
              <div className="flex flex-col items-center py-5">
                <span className="text-3xl font-bold text-accent-400">{stats!.hIndex}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  H-INDEX
                </span>
              </div>
            )}
            {stats!.citations != null && stats!.citations !== "" && (
              <div className="flex flex-col items-center py-5">
                <span className="text-3xl font-bold text-primary-300">{stats!.citations}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  CITATIONS
                </span>
              </div>
            )}
            {stats!.publications != null && (
              <div className="flex flex-col items-center py-5">
                <span className="text-3xl font-bold text-accent-400">{stats!.publications}</span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  PAPERS
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
