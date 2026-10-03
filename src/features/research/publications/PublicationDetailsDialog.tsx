import ResearchDetailsDialog from "../shared/ResearchDetailsDialog";
import ResearchDetailList, { formatResearchDate } from "../shared/ResearchDetailList";
import ResearchResourceLink from "../shared/ResearchResourceLink";
import { ACCESS_TYPE_LABELS, LICENSE_LABELS, PUBLISHER_LABELS } from "./publication.constants";
import type { Publication } from "./publication.type";

export default function PublicationDetailsDialog({
  publication,
  onClose,
}: {
  publication: Publication;
  onClose: () => void;
}) {
  return (
    <ResearchDetailsDialog title={publication.title} category="Publication details" onClose={onClose}>
      <ResearchDetailList fields={[
        { label: "Acronym", value: publication.acronym },
        { label: "Publisher", value: PUBLISHER_LABELS[publication.publisher] ?? publication.publisher },
        { label: "Type", value: publication.publicationType },
        { label: "Category", value: publication.subCategory?.name },
        ...(publication.subCategory?.domain ? [{ label: "Domain", value: publication.subCategory.domain.name }] : []),
        { label: "Launch year", value: publication.yearLunched },
        { label: "Access", value: ACCESS_TYPE_LABELS[publication.openAccessType] ?? publication.openAccessType },
        { label: "License", value: publication.licenseType && (LICENSE_LABELS[publication.licenseType] ?? publication.licenseType) },
        { label: "Workflow", value: publication.workflow === "non_standard" ? "Non-standard" : "Standard" },
        { label: "ISSN", value: publication.issn },
        { label: "Electronic ISSN", value: publication.eissn },
        { label: "CD-ROM ISSN", value: publication.issnCdrom },
        { label: "Imprint", value: publication.imprint },
        {
          label: "Subcategory group",
          value: publication.subBucket?.replaceAll("_", " ").replace(/([a-z])([A-Z])/g, "$1 $2"),
        },
        { label: "Website", fullWidth: true, value: publication.URL && <ResearchResourceLink href={publication.URL}>{publication.URL}</ResearchResourceLink> },
        { label: "Specific focus", fullWidth: true, value: publication.specificFocusScope },
        { label: "Journal scope", fullWidth: true, value: publication.journalScope },
        { label: "Date added", value: formatResearchDate(publication.createdAt) },
        { label: "Last updated", value: formatResearchDate(publication.updatedAt) },
      ]} />
    </ResearchDetailsDialog>
  );
}
