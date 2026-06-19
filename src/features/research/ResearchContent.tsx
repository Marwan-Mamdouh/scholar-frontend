import React from "react";
import { Input } from "@/src/components/ui/InputField/Input";
import dynamic from "next/dynamic";
import notFoundAnimation from "@/src/components/assets/NotFound.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export interface ResearchContentProps {
  activeTab: string;
}

const ResearchContent: React.FC<ResearchContentProps> = ({ activeTab }) => {
  return (
    <div className="w-full bg-transparent border border-[#4d6e7c] rounded-b-2xl rounded-tr-2xl p-6 min-h-[400px] flex flex-col gap-12 relative -mt-px">
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
      <div className="flex-1 flex flex-col items-center justify-center pt-10.5 pb-16 gap-2.5">
        <div className="relative flex items-center justify-center">
          <Lottie
            animationData={notFoundAnimation}
            loop={true}
            className="w-64 mx-auto"
          />
        </div>
        <h3 className="text-2xl font-semibold text-accent-300">
          Find What You're Looking For
        </h3>
        <p className="text-neutral-100">
          Choose Topics, Keywords, Or Universities To Begin Your Search.
        </p>
      </div>
    </div>
  );
};

export default ResearchContent;
