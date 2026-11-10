export type JobType = "fullTime" | "partTime" | "internship";
export type Seniority = "junior" | "mid" | "senior" | "lead";

export interface Job {
  id: number;
  title: string;
  industry: string | null;
  domains: unknown;
  type: JobType | null;
  seniority: Seniority | null;
  description: string | null;
  requirements: string | null;
  salary: string | null;
  applyLink: string | null;
  postedAt: string;
  company: {
    id: number;
    name: string;
    website: string | null;
    headquartersCountry: string | null;
  };
  branch: { id: number; city: string | null; country: string | null };
}

export interface JobFilters {
  search: string;
  country: string;
  discipline: string;
  company: string;
  type: JobType | "";
  seniority: Seniority | "";
  sort: "newest" | "oldest" | "title";
  page: number;
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
