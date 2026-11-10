import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResearchDetails } from "@/src/features/research";
import { PublicationDetails } from "@/src/features/research/publications";

export const metadata: Metadata = { title: "Research details | NEXUS" };

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ catalog: string; id: string }>;
}) {
  const { catalog, id } = await params;
  if (catalog === "publications") return <PublicationDetails id={id} />;
  if (
    catalog === "researchers" ||
    catalog === "papers" ||
    catalog === "projects"
  )
    return <ResearchDetails catalog={catalog} id={id} />;
  notFound();
}
