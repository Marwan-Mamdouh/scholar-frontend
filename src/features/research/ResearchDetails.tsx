"use client";

import { ExternalLink } from "lucide-react";
import {
  CatalogDetailsLayout,
  CatalogDetailState,
  DetailFields,
  DetailSection,
  safeExternalUrl,
} from "@/src/components/catalog/CatalogDetails";
import Badge from "@/src/components/ui/Badge/Badge";
import getButtonClasses from "@/src/components/ui/Button/button.style";
import { useCatalogDetail } from "@/src/hooks/useCatalogDetail";
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

function ResourceLink({
  url,
  label,
}: {
  url: string | null | undefined;
  label: string;
}) {
  const href = safeExternalUrl(url);
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${getButtonClasses({ variant: "outlined", intent: "accent", size: "md" })} min-h-11 w-fit gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-200`}
    >
      {label}
      <ExternalLink aria-hidden="true" className="size-4" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : null;
}

export default function ResearchDetails({
  catalog,
  id,
}: {
  catalog: ResearchCatalogTab;
  id: string;
}) {
  const label = {
    researchers: "Researcher",
    papers: "Paper",
    projects: "Project",
  }[catalog];
  const state = useCatalogDetail<ResearchRecord>(id, `/${catalog}`);
  const record = state.data;
  const researcher =
    catalog === "researchers" ? (record as Researcher | undefined) : undefined;
  const paper =
    catalog === "papers" ? (record as ResearchPaper | undefined) : undefined;
  const project =
    catalog === "projects"
      ? (record as GraduationProject | undefined)
      : undefined;
  const title = researcher
    ? `${researcher.firstName} ${researcher.lastName}`
    : (paper?.title ?? project?.projectTitle);
  const subtitle =
    researcher?.institutionName ?? paper?.journalTitle ?? project?.university;

  return (
    <CatalogDetailsLayout
      backHref={`/research?tab=${catalog}`}
      backLabel={`Back to ${catalog}`}
    >
      <CatalogDetailState
        label={label}
        loading={state.loading}
        notFound={state.notFound}
        error={state.error}
        onRetry={state.reload}
      />
      {record && (
        <article className="flex flex-col gap-6">
          <header className="rounded-3xl border border-primary-300/60 bg-brand-gradient p-5 md:p-7">
            {subtitle && (
              <p className="mb-3 text-sm text-accent-300">{subtitle}</p>
            )}
            <h1 className="text-2xl font-semibold text-primary-200 md:text-3xl">
              {title}
            </h1>
            {paper?.publicationYear && (
              <p className="mt-3 text-neutral-200">
                Published {paper.publicationYear}
              </p>
            )}
            {project && (
              <p className="mt-3 text-neutral-200">
                Posted{" "}
                {new Date(project.postedAt).toLocaleDateString("en", {
                  timeZone: "UTC",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </header>
          {researcher && (
            <>
              <DetailSection title="Research profile">
                <DetailFields
                  fields={[
                    { label: "First name", value: researcher.firstName },
                    { label: "Last name", value: researcher.lastName },
                    { label: "Institution", value: researcher.institutionName },
                    { label: "Department", value: researcher.department },
                    { label: "Main topic", value: researcher.mainTopic },
                    {
                      label: "Scholar identifier",
                      value: researcher.scholarId,
                    },
                  ]}
                />
              </DetailSection>
              <DetailSection title="Affiliation">
                <p className="whitespace-pre-wrap text-neutral-100">
                  {researcher.affiliation ||
                    "Affiliation information has not been provided."}
                </p>
              </DetailSection>
              <DetailSection title="Research interests">
                <div className="flex flex-wrap gap-2">
                  {[
                    ...new Set([
                      researcher.mainTopic,
                      ...tags(researcher.subtopics),
                    ]),
                  ]
                    .filter((tag): tag is string => !!tag)
                    .map((tag) => (
                      <Badge key={tag} variant="outlined" intent="accent">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </DetailSection>
              {safeExternalUrl(researcher.linkedinUrl) && (
                <ResourceLink
                  url={researcher.linkedinUrl}
                  label="View LinkedIn profile"
                />
              )}
            </>
          )}
          {paper && (
            <>
              <DetailSection title="Summary">
                <p className="whitespace-pre-wrap text-neutral-100">
                  {paper.subtitle || "A summary has not been provided."}
                </p>
              </DetailSection>
              <DetailSection title="Paper information">
                <DetailFields
                  fields={[
                    { label: "Author", value: paper.staff?.name },
                    { label: "Journal", value: paper.journalTitle },
                    { label: "Source", value: paper.sourceName },
                    { label: "Publication year", value: paper.publicationYear },
                    {
                      label: "Publication month",
                      value: paper.publicationMonth,
                    },
                    { label: "Publication day", value: paper.publicationDay },
                    { label: "Type", value: paper.type },
                    { label: "DOI", value: paper.doi },
                    { label: "ORCID path", value: paper.orcidPath },
                    { label: "ORCID work identifier", value: paper.putCode },
                  ]}
                />
              </DetailSection>
              {safeExternalUrl(paper.url) ? (
                <ResourceLink
                  url={paper.url}
                  label="Read paper on source website"
                />
              ) : (
                <p className="text-neutral-200">
                  A source link has not been provided for this paper.
                </p>
              )}
            </>
          )}
          {project && (
            <>
              <DetailSection title="Project information">
                <DetailFields
                  fields={[
                    { label: "University", value: project.university },
                    { label: "Faculty", value: project.faculty },
                    { label: "Industry", value: project.industry },
                    { label: "Students", value: project.noOfStudents },
                    {
                      label: "Sponsorship",
                      value: project.isSponsored
                        ? "Sponsored"
                        : "Independent student project",
                    },
                  ]}
                />
              </DetailSection>
              <DetailSection title="Project fields">
                <div className="flex flex-wrap gap-2">
                  {tags(project.domains).length ? (
                    tags(project.domains).map((tag) => (
                      <Badge key={tag} variant="outlined" intent="accent">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-neutral-200">
                      Project fields have not been provided.
                    </p>
                  )}
                </div>
              </DetailSection>
              <DetailSection title="Supervision">
                <DetailFields
                  fields={[
                    { label: "Supervisor", value: project.supervisor },
                    { label: "Co-supervisor", value: project.coSupervisor },
                  ]}
                />
              </DetailSection>
              {project.isSponsored && (
                <DetailSection title="Sponsor">
                  <DetailFields
                    fields={[
                      { label: "Company", value: project.sponsorCompany?.name },
                      {
                        label: "Industry",
                        value: project.sponsorCompany?.industry,
                      },
                      {
                        label: "Headquarters",
                        value: project.sponsorCompany?.headquartersCountry,
                      },
                    ]}
                  />
                  {safeExternalUrl(project.sponsorCompany?.website) && (
                    <div className="mt-4">
                      <ResourceLink
                        url={project.sponsorCompany?.website}
                        label="Visit sponsor website"
                      />
                    </div>
                  )}
                </DetailSection>
              )}
              <DetailSection title="Documentation">
                {safeExternalUrl(project.documentationLink) ? (
                  <ResourceLink
                    url={project.documentationLink}
                    label="Open project documentation"
                  />
                ) : (
                  <p className="text-neutral-200">
                    Project documentation has not been provided.
                  </p>
                )}
              </DetailSection>
            </>
          )}
        </article>
      )}
    </CatalogDetailsLayout>
  );
}
