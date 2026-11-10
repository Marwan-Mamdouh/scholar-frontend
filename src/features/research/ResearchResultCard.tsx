import {
  BookOpen,
  GraduationCap,
  Handshake,
  UserRound,
  Users,
} from "lucide-react";
import CatalogCard from "@/src/components/catalog/CatalogCard";
import Badge from "@/src/components/ui/Badge/Badge";
import type {
  GraduationProject,
  Researcher,
  ResearchPaper,
  ResearchRecord,
  ResearchCatalogTab,
} from "./researchCatalog.type";

function tags(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

export default function ResearchResultCard({
  tab,
  record,
}: {
  tab: ResearchCatalogTab;
  record: ResearchRecord;
}) {
  const href = `/research/${tab}/${record.id}`;
  if (tab === "researchers") {
    const researcher = record as Researcher;
    return (
      <CatalogCard
        title={`${researcher.firstName} ${researcher.lastName}`}
        eyebrow={researcher.institutionName}
        href={href}
        icon={
          <UserRound aria-hidden="true" className="size-8 text-accent-300" />
        }
      >
        <div className="flex flex-wrap gap-2">
          {[...new Set([researcher.mainTopic, ...tags(researcher.subtopics)])]
            .filter((tag): tag is string => !!tag)
            .slice(0, 2)
            .map((tag) => (
              <Badge key={tag} size="md" variant="outlined" intent="accent">
                {tag}
              </Badge>
            ))}
        </div>
      </CatalogCard>
    );
  }
  if (tab === "papers") {
    const paper = record as ResearchPaper;
    return (
      <CatalogCard
        title={paper.title}
        eyebrow={paper.journalTitle || "Journal not specified"}
        href={href}
        icon={
          <BookOpen aria-hidden="true" className="size-8 text-accent-300" />
        }
        badge={
          paper.publicationYear ? (
            <Badge size="md" variant="solid" intent="accent">
              {paper.publicationYear}
            </Badge>
          ) : undefined
        }
      >
        <p className="line-clamp-2 text-accent-300">{paper.staff?.name}</p>
        {paper.subtitle && (
          <p className="line-clamp-2 text-neutral-200">{paper.subtitle}</p>
        )}
      </CatalogCard>
    );
  }
  const project = record as GraduationProject;
  return (
    <CatalogCard
      title={project.projectTitle}
      eyebrow={project.university || "University not specified"}
      href={href}
      icon={
        <GraduationCap aria-hidden="true" className="size-8 text-accent-300" />
      }
      badge={
        <Badge size="md" variant="solid" intent="accent">
          {new Date(project.postedAt).getUTCFullYear()}
        </Badge>
      }
    >
      <div className="flex flex-wrap gap-2">
        {tags(project.domains)
          .slice(0, 2)
          .map((tag) => (
            <Badge key={tag} size="md" variant="outlined" intent="accent">
              {tag}
            </Badge>
          ))}
      </div>
      <div>
        <p className="font-medium text-neutral-50">Supervisor</p>
        <p className="line-clamp-2">{project.supervisor || "Not specified"}</p>
      </div>
      {!!project.noOfStudents && (
        <p className="flex items-center gap-2 text-neutral-200">
          <Users aria-hidden="true" className="size-3.5 text-accent-300" />
          {project.noOfStudents} students
        </p>
      )}
      <p className="flex items-start gap-2 text-accent-300">
        <Handshake aria-hidden="true" className="size-3.5 shrink-0" />
        <span className="line-clamp-2">
          {project.isSponsored
            ? `Sponsored by ${project.sponsorCompany?.name || "an industry partner"}`
            : "Independent student project"}
        </span>
      </p>
    </CatalogCard>
  );
}
