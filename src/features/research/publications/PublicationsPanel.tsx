import PublicationsExplorer from "./PublicationsExplorer";
import { EMPTY_FILTERS } from "./publication.constants";
import {
  fetchDomains,
  fetchFilterRanges,
  fetchPublications,
} from "./publication.api";
import CatalogLayout from "@/src/components/catalog/CatalogLayout";
import { Input } from "@/src/components/ui/InputField/Input";

const PublicationsPanel = async () => {
  const result = await Promise.all([
    fetchDomains(),
    fetchFilterRanges(),
    fetchPublications(EMPTY_FILTERS),
  ])
    .then((data) => ({ data, error: null }))
    .catch((cause: unknown) => ({
      data: null,
      error:
        cause instanceof Error
          ? cause.message
          : "The publications service is unavailable.",
    }));

  if (result.data) {
    const [domains, ranges, publications] = result.data;
    return (
      <PublicationsExplorer
        domains={domains}
        ranges={ranges}
        initialPublications={publications}
      />
    );
  }
  return (
    <CatalogLayout
      search={
        <Input
          aria-label="Search publications"
          placeholder="Search by title, acronym or publisher"
          disabled
        />
      }
      filters={
        <p className="text-sm text-neutral-200">
          Filters are temporarily unavailable.
        </p>
      }
      resultsLabel="Publication results"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-2.5 py-20 text-center">
        <h3 className="text-2xl font-semibold text-danger-300">
          Publications Are Unavailable
        </h3>
        <p className="text-neutral-100 max-w-md">{result.error}</p>
        <p className="text-sm text-neutral-300">
          Reload the page once the service is reachable again.
        </p>
      </div>
    </CatalogLayout>
  );
};

export default PublicationsPanel;
