import { createClient } from '@vercel/postgres';
import JobsClient from './JobsClient';

export const revalidate = 0; // Disable static caching so it always fetches from Postgres

export default async function JobsPage() {
  let initialJobs: any[] = [];
  let errorMsg: string | undefined = undefined;

  try {
    const client = createClient({ connectionString: process.env.POSTGRES_URL });
    await client.connect();
    
    try {
      const { rows } = await client.sql`SELECT * FROM jobs ORDER BY first_seen_at DESC LIMIT 500`;
      initialJobs = rows;
    } finally {
      await client.end();
    }
  } catch (error: any) {
    console.error("Vercel Postgres Error:", error);
    
    // DEBUG: check if POSTGRES_URL is actually in process.env
    const envKeys = Object.keys(process.env).filter(k => k.includes('POSTGRES') || k.includes('DATABASE')).join(', ');
    errorMsg = `Error: ${error.message}. Debug Env Keys: [${envKeys}]`;
  }

  return <JobsClient initialJobs={initialJobs} serverError={errorMsg} />;
}
