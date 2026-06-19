import React from "react";
import ResearchContainer from "@/src/features/research/ResearchContainer";

export default function ResearchPage() {
  return (
    <main className="flex-1 w-full flex flex-col relative overflow-hidden">
      {/* Background gradients if needed */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a2539] to-transparent pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="w-full pt-16 pb-8 px-4 flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          Research & Discovery Hub
        </h1>
        <p className="text-neutral-200 text-lg max-w-2xl">
          Explore researchers, academic papers, and real-world projects from
          institutions worldwide.
        </p>
      </section>

      {/* Main Interactive Section */}
      <ResearchContainer />
    </main>
  );
}
