import {
  HeroSection,
  GrowthInsights,
  Industry,
  AcademicEcosystem,
} from "@/src/features/home";
import { fetchCatalogSummary } from "@/src/lib/catalog";

export default async function Home() {
  const stats = await fetchCatalogSummary();
  return (
    <main className="overflow-hidden flex flex-col gap-2.5 last:gap-0">
      <HeroSection />
      <GrowthInsights
        stats={[
          {
            value: stats?.researchers.toString() ?? null,
            label: "Researchers",
          },
          { value: stats?.companies.toString() ?? null, label: "Companies" },
          { value: stats?.projects.toString() ?? null, label: "Projects" },
        ]}
      />
      <Industry />
      <AcademicEcosystem />
    </main>
  );
}
