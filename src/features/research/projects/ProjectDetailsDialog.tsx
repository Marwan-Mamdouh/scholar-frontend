import ResearchDetailsDialog from "../shared/ResearchDetailsDialog";
import ResearchDetailList, { formatResearchDate } from "../shared/ResearchDetailList";
import ResearchResourceLink from "../shared/ResearchResourceLink";
import type { GraduationProject } from "./project.type";
import { projectFields } from "./project.utils";

export default function ProjectDetailsDialog({
  project,
  onClose,
}: {
  project: GraduationProject;
  onClose: () => void;
}) {
  const sponsor = project.sponsorCompany;

  return (
    <ResearchDetailsDialog title={project.projectTitle} category="Graduation project details" onClose={onClose}>
      <ResearchDetailList fields={[
        { label: "University", value: project.university },
        { label: "Faculty", value: project.faculty },
        { label: "Industry", value: project.industry },
        { label: "Project fields", value: projectFields(project.domains).join(", ") },
        { label: "Supervisor", value: project.supervisor },
        { label: "Co-supervisor", value: project.coSupervisor },
        { label: "Number of students", value: project.noOfStudents },
        { label: "Date posted", value: formatResearchDate(project.postedAt) },
        { label: "Sponsorship", value: project.isSponsored ? "Sponsored" : "Not sponsored" },
        ...(project.isSponsored || sponsor ? [{ label: "Sponsor company", value: sponsor?.name }] : []),
        { label: "Documentation", fullWidth: true, value: project.documentationLink && (
          <ResearchResourceLink href={project.documentationLink}>{project.documentationLink}</ResearchResourceLink>
        ) },
      ]} />
      {sponsor && (
        <section className="mt-6 border-t border-neutral-500/60 pt-6" aria-label="Sponsor details">
          <h3 className="mb-5 text-base font-semibold text-accent-200">About the sponsor</h3>
          <ResearchDetailList fields={[
            { label: "Industry", value: sponsor.industry },
            { label: "Company size", value: sponsor.size },
            { label: "Headquarters", value: sponsor.headquartersCountry },
            { label: "Website", value: sponsor.website && <ResearchResourceLink href={sponsor.website}>{sponsor.website}</ResearchResourceLink> },
            { label: "LinkedIn", value: sponsor.linkedin && <ResearchResourceLink href={sponsor.linkedin}>{sponsor.linkedin}</ResearchResourceLink> },
            { label: "Glassdoor", value: sponsor.glassdoor && <ResearchResourceLink href={sponsor.glassdoor}>{sponsor.glassdoor}</ResearchResourceLink> },
          ]} />
        </section>
      )}
    </ResearchDetailsDialog>
  );
}
