import fs from 'fs';
import path from 'path';
import { sql } from '@vercel/postgres';

export interface JobItem {
  id: number | string;
  source?: string;
  source_job_id?: string;
  title: string;
  company?: string;
  location?: string;
  url: string;
  canonical_url?: string;
  salary?: string;
  job_type?: string;
  tags_json?: string;
  is_remote?: number | boolean;
  original_source?: string;
  content_hash?: string;
  send_status?: string;
  first_seen_at?: string;
  last_seen_at?: string;
  is_taken?: boolean;
}

const getJsonDbPath = () => path.join(process.cwd(), 'jobs_export.json');

export async function getJobs(): Promise<JobItem[]> {
  const isLocalJsonMode = process.env.USE_LOCAL_JSON_DB === 'true';

  if (isLocalJsonMode) {
    try {
      const dbPath = getJsonDbPath();
      if (!fs.existsSync(dbPath)) {
        return [];
      }
      const rawData = await fs.promises.readFile(dbPath, 'utf-8');
      const jobs: JobItem[] = JSON.parse(rawData);

      const availableJobs = jobs.filter((job) => !job.is_taken);

      availableJobs.sort((a, b) => {
        const timeA = a.first_seen_at ? new Date(a.first_seen_at).getTime() : 0;
        const timeB = b.first_seen_at ? new Date(b.first_seen_at).getTime() : 0;
        return timeB - timeA;
      });

      return availableJobs;
    } catch (err) {
      console.error('Error reading local JSON database:', err);
      throw err;
    }
  }

  const { rows } = await sql`SELECT * FROM jobs WHERE is_taken = false OR is_taken IS NULL ORDER BY first_seen_at DESC`;
  return rows as JobItem[];
}

export async function markJobAsTaken(id: number | string): Promise<{ success: boolean; message: string }> {
  const isLocalJsonMode = process.env.USE_LOCAL_JSON_DB === 'true';

  if (isLocalJsonMode) {
    const dbPath = getJsonDbPath();
    if (!fs.existsSync(dbPath)) {
      throw new Error('Local JSON database file not found');
    }

    const rawData = await fs.promises.readFile(dbPath, 'utf-8');
    const jobs: JobItem[] = JSON.parse(rawData);

    const targetJob = jobs.find((job) => String(job.id) === String(id));
    if (targetJob) {
      targetJob.is_taken = true;
      await fs.promises.writeFile(dbPath, JSON.stringify(jobs, null, 4), 'utf-8');
    }

    return { success: true, message: 'Job marked as taken locally' };
  }

  await sql`UPDATE jobs SET is_taken = true WHERE id = ${id}`;
  return { success: true, message: 'Job marked as taken in database' };
}
