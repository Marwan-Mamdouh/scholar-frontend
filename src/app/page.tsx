import HeroSection from "@/src/features/home/hero";
import GrowthInsights from "@/src/features/home/GrowthInsights";

export default function Home() {
	const stats = { researches: null, companies: "233", projects: "31" };
	return (
		<main>
			<HeroSection />
			<GrowthInsights
				stats={[
					{ value: stats.researches ?? null, label: "Researches" },
					{ value: stats.companies ?? null, label: "Company" },
					{ value: stats.projects ?? null, label: "Project" },
				]}
			/>
		</main>
	);
}
