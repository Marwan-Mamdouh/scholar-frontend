import { Hero, StatsShowcase } from "@/src/features/home";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <StatsShowcase />
    </main>
  );
}

