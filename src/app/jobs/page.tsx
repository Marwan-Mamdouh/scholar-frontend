import { sql } from '@vercel/postgres';
import JobsClient from './JobsClient';

export const revalidate = 0; // Disable static caching so it always fetches from Postgres

export default async function JobsPage() {
  let initialJobs = [];
  let errorMsg = undefined;

  try {
    // Vercel Postgres query
    const { rows } = await sql`SELECT * FROM jobs ORDER BY first_seen_at DESC LIMIT 500`;
    initialJobs = rows;
  } catch (error: any) {
    console.error("Vercel Postgres Error:", error);
    errorMsg = error.message || "Failed to connect to database";
  }

  return <JobsClient initialJobs={initialJobs} serverError={errorMsg} />;
}
