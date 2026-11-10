export type ResearchCatalogTab = "researchers" | "papers" | "projects";

export interface Researcher {
  id: number;
  firstName: string;
  lastName: string;
  institutionName: string;
  department: string | null;
  affiliation: string | null;
  mainTopic: string | null;
  subtopics: unknown;
  scholarId: string | null;
  linkedinUrl: string | null;
}

export interface ResearchPaper {
  id: number;
  title: string;
  subtitle: string | null;
  journalTitle: string | null;
  publicationYear: number | null;
  sourceName: string | null;
  type: string | null;
  doi: string | null;
  url: string | null;
  publicationMonth: number | null;
  publicationDay: number | null;
  orcidPath: string | null;
  putCode: string | null;
  staff: { id: number; name: string };
}

export interface GraduationProject {
  id: number;
  projectTitle: string;
  university: string | null;
  faculty: string | null;
  industry: string | null;
  documentationLink: string | null;
  domains: unknown;
  supervisor: string | null;
  coSupervisor: string | null;
  noOfStudents: number | null;
  isSponsored: boolean;
  sponsorCompany: {
    id: number;
    name: string;
    website?: string | null;
    industry?: string | null;
    headquartersCountry?: string | null;
  } | null;
  postedAt: string;
}

export type ResearchRecord = Researcher | ResearchPaper | GraduationProject;

export interface ResearchCatalogResponse {
  data: ResearchRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ResearchCatalogFilters {
  search: string;
  topic: string;
  field: string;
  university: string;
  year: string;
  sponsorship: string;
  page: number;
}

export const EMPTY_RESEARCH_FILTERS: ResearchCatalogFilters = {
  search: "",
  topic: "",
  field: "",
  university: "",
  year: "",
  sponsorship: "",
  page: 1,
};
