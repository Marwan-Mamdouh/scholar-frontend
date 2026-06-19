import React from "react";
import { Input } from "@/src/components/ui/InputField/Input";
import { FileSearch } from "lucide-react";

export interface ResearchContentProps {
  activeTab: string;
}

const ResearchContent: React.FC<ResearchContentProps> = ({ activeTab }) => {
  return (
    <div className="w-full bg-neutral-800 border border-[#4d6e7c] rounded-b-2xl rounded-tr-2xl p-6 min-h-[400px] flex flex-col gap-12 relative -mt-px">
      {/* Top action bar */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="w-[300px]">
          <Input
            label="TEST"
            placeholder={`Search by ${activeTab === "researchers" ? "Researcher" : activeTab === "papers" ? "Paper" : "Project"} Name`}
          />
        </div>

        {/* Placeholder for Dropdowns as requested */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full border border-[#4d6e7c] text-neutral-300 text-sm flex items-center gap-2">
            Topics <span className="text-[10px]">▼</span>
          </button>
          <button className="px-4 py-2 rounded-full border border-[#4d6e7c] text-neutral-300 text-sm flex items-center gap-2">
            Research Fields <span className="text-[10px]">▼</span>
          </button>
          <button className="px-4 py-2 rounded-full border border-[#4d6e7c] text-neutral-300 text-sm flex items-center gap-2">
            Universities <span className="text-[10px]">▼</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center pt-8 pb-16">
        <div className="text-white mb-6 bg-neutral-700/30 p-6 rounded-full border border-[#4d6e7c]">
          <FileSearch
            size={64}
            className="text-primary-300"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="text-2xl font-semibold text-primary-100 mb-2">
          Find What You're Looking For
        </h3>
        <p className="text-neutral-400">
          Choose Topics, Keywords, Or Universities To Begin Your Search.
        </p>
      </div>
    </div>
  );
};

export default ResearchContent;
