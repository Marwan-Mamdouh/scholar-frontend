"use client";

import { useState } from "react";
import ResearchTable, {
  type ResearchSort,
  type ResearchColumn,
} from "../shared/ResearchTable";
import ResearchResourceLink from "../shared/ResearchResourceLink";
import {
  ACCESS_TYPE_LABELS,
  LICENSE_LABELS,
  PUBLISHER_LABELS,
} from "./publication.constants";
import type { Publication } from "./publication.type";
import PublicationDetailsDialog from "./PublicationDetailsDialog";
interface PublicationsTableProps {
  publications: Publication[];
  sort: ResearchSort;
  onSort: (sort: ResearchSort) => void;
}

const PublicationsTable = ({
  publications,
  sort,
  onSort,
}: PublicationsTableProps) => {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const columns: ResearchColumn<Publication>[] = [
    {
      key: "publication",
      label: "Journal name",
      sortKey: "title",
      className: "min-w-72 max-w-96",
      render: (publication) => (
        <div className="flex flex-col gap-0.5">
          <button
            type="button"
            aria-haspopup="dialog"
            aria-label={`View details for ${publication.title}`}
            onClick={() => setSelectedPublication(publication)}
            className="cursor-pointer rounded text-left font-medium leading-5 text-neutral-50 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
          >
            <span className="line-clamp-3">{publication.title}</span>
          </button>
          <span className="text-xs text-neutral-300">
            {[
              publication.acronym,
              PUBLISHER_LABELS[publication.publisher] ?? publication.publisher,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
          {publication.URL && (
            <span className="text-xs">
              <ResearchResourceLink href={publication.URL}>Website<span className="sr-only"> for {publication.title}</span></ResearchResourceLink>
            </span>
          )}
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      className: "min-w-44",
      render: (publication) => (
        <div className="flex flex-col gap-0.5">
          <span>{publication.subCategory?.name ?? "—"}</span>
          <span className="text-xs text-neutral-300">
            {publication.subCategory?.domain?.name}
          </span>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (publication) => publication.publicationType,
    },
    {
      key: "access",
      label: "Access",
      className: "min-w-36",
      render: (publication) =>
        ACCESS_TYPE_LABELS[publication.openAccessType] ??
        publication.openAccessType,
    },
    {
      key: "license",
      label: "License",
      className: "whitespace-nowrap",
      render: (publication) =>
        publication.licenseType
          ? (LICENSE_LABELS[publication.licenseType] ?? publication.licenseType)
          : "—",
    },
    {
      key: "issn",
      label: "ISSN",
      className: "whitespace-nowrap tabular-nums",
      render: (publication) => publication.issn ?? publication.eissn ?? "—",
    },
    {
      key: "year",
      label: "Launch year",
      sortKey: "yearLunched",
      align: "right",
      className: "tabular-nums",
      render: (publication) => publication.yearLunched ?? "—",
    },
  ];
  return (
    <>
      <ResearchTable
        label="Publications"
        columns={columns}
        rows={publications}
        sort={sort}
        onSort={onSort}
        onRowClick={setSelectedPublication}
      />
      {selectedPublication && (
        <PublicationDetailsDialog publication={selectedPublication} onClose={() => setSelectedPublication(null)} />
      )}
    </>
  );
};

export default PublicationsTable;
