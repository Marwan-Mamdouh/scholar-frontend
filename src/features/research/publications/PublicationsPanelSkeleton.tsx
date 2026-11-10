import CatalogLayout from "@/src/components/catalog/CatalogLayout";
import { CatalogCardsSkeleton } from "@/src/components/catalog/CatalogCard";

const PublicationsPanelSkeleton = () => (
  <CatalogLayout
    search={
      <div
        aria-hidden="true"
        className="h-11 w-full rounded-2xl bg-overlay/5 motion-safe:animate-pulse"
      />
    }
    filters={
      <div aria-hidden="true" className="flex w-full flex-col gap-1">
        {[
          "Category",
          "Access",
          "License",
          "Quartile",
          "Metrics",
          "Speed",
          "Price",
        ].map((label) => (
          <div
            key={label}
            className="h-11 w-full rounded-lg bg-overlay/5 animate-pulse"
          />
        ))}
      </div>
    }
    resultsLabel="Loading publications"
  >
    <CatalogCardsSkeleton />
  </CatalogLayout>
);

export default PublicationsPanelSkeleton;
