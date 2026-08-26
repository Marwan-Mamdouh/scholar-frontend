import type { GetResearchersParams, GetResearchersResponse } from "./Research.type";
import { mockResearchers } from "./mockResearchers";

/**
 * Fetches researchers for the Researchers tab.
 *
 * STUB — returns static mock data so the UI can be developed and reviewed
 * before the real backend endpoint exists.
 *
 * Expected real endpoint (placeholder, confirm with backend):
 *   GET /api/researchers?search=&universities=&researchFields=&sort=&page=&pageSize=
 *
 * TODO(api-owner): replace this stub with a real call, e.g. via
 * `lib/api-client.ts` (create it if it doesn't exist yet, following
 * app.architecture.md §3) once the backend route is live.
 */
export async function getResearchers(
  params: GetResearchersParams = {},
): Promise<GetResearchersResponse> {
  // Return mock data until the real endpoint is wired.
  return {
    data: mockResearchers,
    total: mockResearchers.length,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 9,
  };
}
