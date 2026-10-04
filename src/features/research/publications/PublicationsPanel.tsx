import ResearchPanel from "../shared/ResearchPanel";
import ResearchPanelError from "../shared/ResearchPanelError";
import PublicationsExplorer from "./PublicationsExplorer";
import { fetchPublications } from "./publication.api";

export default async function PublicationsPanel() {
  const result = await fetchPublications()
    .then((data) => ({ data, error: null }))
    .catch((cause: unknown) => ({
      data: null,
      error:
        cause instanceof Error
          ? cause.message
          : "The publications service is unavailable.",
    }));
  if (!result.data)
    return (
      <ResearchPanel>
        <ResearchPanelError noun="publications" message={result.error!} />
      </ResearchPanel>
    );
  return (
    <ResearchPanel>
      <PublicationsExplorer initialResponse={result.data} />
    </ResearchPanel>
  );
}
