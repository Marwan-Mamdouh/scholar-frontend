import { notFound } from "next/navigation";
import { getResearcherProfileById } from "@/src/features/research/mockResearcherProfiles";
import ResearcherProfile from "@/src/features/research/ResearcherProfile/ResearcherProfile";

export default async function ResearcherProfilePage(
  props: Readonly<{
    params: Promise<{ id: string }>;
  }>,
) {
  const { id } = await props.params;
  const researcher = getResearcherProfileById(id);

  if (!researcher) {
    notFound();
  }

  return (
    <main className="flex-1 w-full flex flex-col relative pt-24 md:pt-28 font-main">
      <div className="w-full max-w-7xl mx-auto px-4 pb-8 md:px-8 md:pb-12">
        <ResearcherProfile researcher={researcher} />
      </div>
    </main>
  );
}
