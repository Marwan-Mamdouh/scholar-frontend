import { Hero, IndustryExplore, StatsShowcase } from "@/src/features/home";

export default function Home() {
  return (
    <main className="relative isolate flex-1 w-full flex flex-col overflow-hidden bg-neutral-900">
      {/* Figma background glow: p-300 circle with 350px+ blur. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[250px] top-[150px] z-[100] h-[250px] w-[260px] rounded-full bg-[#70B5DF]/95 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[250px] top-[250px] z-[100] h-[200px] w-[260px] rounded-full bg-[#37B5AA]/95 blur-[160px]"
      />
      <Hero />
      <StatsShowcase />
      <IndustryExplore />
    </main>
  );
}
