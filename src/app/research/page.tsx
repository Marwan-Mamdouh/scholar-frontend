import React from "react";
import ResearchContainer from "@/src/features/research/ResearchContainer";

export default function ResearchPage() {
  return (
    <main className="flex-1 w-full flex flex-col items-end relative overflow-hidden pt-10">
      {/* Background gradients if needed */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-[#0a2539] to-transparent pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="w-full pt-26 pb-8 px-4 flex flex-col items-center text-center gap-2">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-50 tracking-tight">
          Research & Discovery Hub
        </h1>
        <p className="text-neutral-50 text-lg max-w-2xl">
          Explore researchers, academic papers, and real-world projects from
          institutions worldwide.
        </p>
      </section>

      {/* Main Interactive Section */}
      <ResearchContainer />
    </main>
  );
}
