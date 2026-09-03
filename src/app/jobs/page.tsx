import { getJobs, JobItem } from '@/src/lib/jobsDb';
import JobsClient from './JobsClient';

export const revalidate = 0; // Disable static caching so it always fetches fresh data

export default async function JobsPage() {
  let initialJobs: JobItem[] = [];
  let errorMsg: string | undefined = undefined;

  try {
    initialJobs = await getJobs();
  } catch (error: unknown) {
    console.error("Jobs Fetch Error:", error);
    errorMsg = (error as Error).message || "Failed to fetch jobs";
  }

  return <JobsClient initialJobs={initialJobs} serverError={errorMsg} />;
}

