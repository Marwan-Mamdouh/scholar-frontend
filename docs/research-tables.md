# Research tables

All implementation changes are in the frontend `graduation-projects` branch.
The backend stays on its existing `backend_refactoring` branch without source changes.

Graduation Projects (`/research?tab=projects`) and Publications share the table,
search toolbar, panel shell, pagination, loading, empty, and retry components in
`src/features/research/shared/`. Project filters and publication sorting use the shared filter popover.
Shared components retain the original rounded teal tabs, pill controls, search
Input, accent panel border, and table styling.

Clicking a project or publication row opens its full available metadata in a
shared detail dialog. The title is also a keyboard-accessible button; external
resource links remain independent. The native modal dialog contains keyboard
focus, closes with Escape, its close button, or a backdrop click, and restores
focus to the title. Its content scrolls within the viewport on smaller screens.
Details use the loaded list record, so opening a row requires no additional
request. Missing fields are labeled "Not provided".

## Existing backend contracts

- `GET /api/projects` supports search, university, exact project field, year posted,
  sponsorship, sorting, and pagination. **Year posted** refers to `postedAt`.
- `GET /api/publications` supports `search`, `sortBy`, `sortOrder`, `page`, and `limit`.
  It returns publication metadata and its subcategory, with a `pagination` object.
  The UI shows these supported fields and provides search, sorting, and pagination.

The current backend does not expose publication metric, fee, review-speed, or
advanced-filter endpoints. The frontend does not call the disabled singular
`/api/publication/*` routes or present filters that this backend cannot apply.

## Run locally

In `scholar-backend`, keep `backend_refactoring` checked out and run
`PORT=4000 npm run dev`. In this frontend repository, set
`NEXT_PUBLIC_API_URL=http://localhost:4000/api` and run `npm run dev`.

No database migration or backend patch is required. Live data was available for
verification; database-unavailable and empty responses use the shared error/retry
and empty states.

Frontend verification: `npm run build`, `npx tsc --noEmit`, and
`npx eslint src/features/research`. Browser checks cover both tabs, pagination,
search, sorting, filter resets, and responsive table scrolling.
