"use client";

import { useState } from "react";
import ResearchTable, {
  type ResearchColumn,
  type ResearchSort,
} from "../shared/ResearchTable";
import ResearchResourceLink from "../shared/ResearchResourceLink";
import type { GraduationProject } from "./project.type";
import ProjectDetailsDialog from "./ProjectDetailsDialog";
import { projectFields } from "./project.utils";

function projectColumns(
  onSelect: (project: GraduationProject) => void,
): ResearchColumn<GraduationProject>[] {
  return [
    {
      key: "project",
      label: "Project",
      sortKey: "projectTitle",
      className: "min-w-64 max-w-96",
      render: (project) => (
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`View details for ${project.projectTitle}`}
            onClick={() => onSelect(project)}
            className="cursor-pointer rounded text-left font-medium leading-5 text-neutral-50 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
          >
            <span className="line-clamp-3">{project.projectTitle}</span>
          </button>
          {project.industry && (
            <span className="text-xs text-neutral-200">{project.industry}</span>
          )}
          {project.documentationLink && (
            <span className="text-xs">
              <ResearchResourceLink href={project.documentationLink}>
                Documentation
                <span className="sr-only"> for {project.projectTitle}</span>
              </ResearchResourceLink>
            </span>
          )}
        </div>
      ),
    },
    {
      key: "university",
      label: "University",
      sortKey: "university",
      className: "min-w-44",
      render: (project) => (
        <div className="flex flex-col gap-1">
          <span>{project.university ?? "—"}</span>
          {project.faculty && (
            <span className="text-xs text-neutral-200">{project.faculty}</span>
          )}
        </div>
      ),
    },
    {
      key: "field",
      label: "Project field",
      className: "min-w-40",
      render: (project) => {
        const fields = projectFields(project.domains);
        return fields.length ? (
          <div className="flex flex-wrap gap-1.5">
            {fields.map((field, index) => (
              <span
                key={`${field}-${index}`}
                className="rounded-md border border-neutral-500 bg-white/5 px-2 py-0.5 text-xs text-neutral-100"
              >
                {field}
              </span>
            ))}
          </div>
        ) : (
          "—"
        );
      },
    },
    {
      key: "supervision",
      label: "Supervision",
      className: "min-w-40",
      render: (project) => (
        <div className="flex flex-col gap-1">
          <span>{project.supervisor ?? "—"}</span>
          {project.coSupervisor && (
            <span className="text-xs text-neutral-200">
              Co: {project.coSupervisor}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "team",
      label: "Students",
      align: "right",
      sortKey: "noOfStudents",
      className: "tabular-nums",
      render: (project) => project.noOfStudents ?? "—",
    },
    {
      key: "year",
      label: "Year posted",
      align: "right",
      sortKey: "postedAt",
      className: "tabular-nums",
      render: (project) => {
        const date = new Date(project.postedAt);
        return Number.isNaN(date.getTime()) ? "—" : date.getUTCFullYear();
      },
    },
    {
      key: "sponsor",
      label: "Sponsorship",
      sortKey: "isSponsored",
      className: "min-w-40",
      render: (project) => (
        <div className="flex flex-col items-start gap-1.5">
          <span
            className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${project.isSponsored ? "border-accent-400/30 bg-accent-400/10 text-accent-200" : "border-neutral-500 text-neutral-200"}`}
          >
            {project.isSponsored ? "Sponsored" : "Not sponsored"}
          </span>
          {project.isSponsored && project.sponsorCompany?.name && (
            <span className="text-xs text-neutral-200">
              {project.sponsorCompany.name}
            </span>
          )}
        </div>
      ),
    },
  ];
}

export default function ProjectsTable({
  projects,
  sort,
  onSort,
}: {
  projects: GraduationProject[];
  sort: ResearchSort;
  onSort: (sort: ResearchSort) => void;
}) {
  const [selectedProject, setSelectedProject] =
    useState<GraduationProject | null>(null);
  return (
    <>
      <ResearchTable
        label="Graduation projects"
        columns={projectColumns(setSelectedProject)}
        rows={projects}
        sort={sort}
        onSort={onSort}
        onRowClick={setSelectedProject}
      />
      {selectedProject && (
        <ProjectDetailsDialog
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
