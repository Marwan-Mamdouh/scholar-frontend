import type { GetResearchersParams, GetResearchersResponse } from "./Research.type";

/**
 * Fetches researchers for the Researchers tab.
 *
 * NOT IMPLEMENTED YET — this is a typed stub so the frontend can be built
 * against a stable contract before the real endpoint exists.
 *
 * Expected real endpoint (placeholder, confirm with backend):
 *   GET /api/researchers?search=&universities=&researchFields=&sort=&page=&pageSize=
 *
 * Expected JSON response shape:
 * {
 *   "data": [ { "id": "...", "name": "Dr. Dina Abdel-Rahman", ... } ],
 *   "total": 879,
 *   "page": 1,
 *   "pageSize": 9
 * }
 *
 * TODO(api-owner): replace this stub with a real call, e.g. via
 * `lib/api-client.ts` (create it if it doesn't exist yet, following
 * app.architecture.md §3) once the backend route is live.
 *
 * Recommended wiring pattern:
 * This repo already drives tab state through URL search params and
 * re-renders the (server) `app/research/page.tsx` accordingly (see
 * `ResearchTabsClient.tsx`). The natural extension for search/filters/
 * pagination is the same pattern — push `search`, `universities`,
 * `researchFields`, `sort`, and `page` into the URL and let
 * `app/research/page.tsx` (already an async server component) call
 * `getResearchers()` server-side and pass the result down through
 * `ResearchContainer` → `ResearchContent` → `ResearcherGrid`, instead
 * of fetching client-side.
 */
export async function getResearchers(
  params: GetResearchersParams = {},
): Promise<GetResearchersResponse> {
  // Intentionally not calling a real endpoint yet.
  console.warn("getResearchers() is a stub — no backend endpoint wired yet.", params);
  return {
    data: [],
    total: 0,
    page: params.page ?? 1,
    pageSize: params.pageSize ?? 9,
  };
}
