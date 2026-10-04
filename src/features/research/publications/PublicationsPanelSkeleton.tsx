import ResearchPanel from "../shared/ResearchPanel";
import { ResearchTableSkeleton } from "../shared/ResearchTable";

export default function PublicationsPanelSkeleton() {
  return (
    <ResearchPanel>
      <div className="h-13 w-full rounded-2xl bg-white/5 motion-safe:animate-pulse" />
      <ResearchTableSkeleton />
    </ResearchPanel>
  );
}
