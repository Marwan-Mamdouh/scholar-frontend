export interface GraduationProject {
  id: number;
  projectTitle: string;
  university: string | null;
  faculty: string | null;
  industry: string | null;
  domains: unknown;
  supervisor: string | null;
  coSupervisor: string | null;
  noOfStudents: number | null;
  isSponsored: boolean;
  sponsorCompany: {
    id: number;
    name: string;
    industry: string | null;
    size: string | null;
    website: string | null;
    linkedin: string | null;
    glassdoor: string | null;
    headquartersCountry: string | null;
  } | null;
  documentationLink: string | null;
  postedAt: string;
}

export interface ProjectFilters {
  search: string;
  university: string;
  projectField: string;
  year: string;
  sponsorship: "" | "sponsored" | "unsponsored";
}

export const EMPTY_PROJECT_FILTERS: ProjectFilters = {
  search: "",
  university: "",
  projectField: "",
  year: "",
  sponsorship: "",
};

export interface ProjectsResponse {
  success: boolean;
  data: GraduationProject[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
