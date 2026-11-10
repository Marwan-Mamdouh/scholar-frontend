import { BookOpen } from "lucide-react";
import CatalogCard from "@/src/components/catalog/CatalogCard";
import Badge from "@/src/components/ui/Badge/Badge";
import { ACCESS_TYPE_LABELS, PUBLISHER_LABELS } from "./publication.constants";
import type { Publication } from "./publication.type";
import {
  formatCost,
  formatNumber,
  latestMetric,
  primaryPricing,
  toNumber,
} from "./publication.utils";

export default function PublicationCard({
  publication,
  currency,
}: {
  publication: Publication;
  currency: string;
}) {
  const metric = latestMetric(publication);
  return (
    <CatalogCard
      title={publication.title}
      eyebrow={[
        publication.acronym,
        PUBLISHER_LABELS[publication.publisher] ?? publication.publisher,
      ]
        .filter(Boolean)
        .join(" · ")}
      href={`/research/publications/${publication.id}`}
      icon={<BookOpen aria-hidden="true" className="size-8 text-accent-300" />}
      badge={
        metric?.quartile ? (
          <Badge size="md" variant="solid" intent="accent">
            {metric.quartile}
          </Badge>
        ) : undefined
      }
    >
      <p className="line-clamp-2 text-neutral-200">
        {publication.subCategory?.name || "Category not specified"}
      </p>
      <div className="flex flex-wrap gap-2">
        <Badge size="md" variant="outlined" intent="accent">
          {publication.publicationType}
        </Badge>
        <Badge size="md" variant="outlined" intent="accent">
          {ACCESS_TYPE_LABELS[publication.openAccessType] ??
            publication.openAccessType}
        </Badge>
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-3 pt-1">
        <div>
          <dt className="text-neutral-200">Impact factor</dt>
          <dd className="font-medium text-neutral-50">
            {formatNumber(toNumber(metric?.impactFactor))}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-200">CiteScore</dt>
          <dd className="font-medium text-neutral-50">
            {formatNumber(toNumber(metric?.citescore))}
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-neutral-200">Article fee</dt>
          <dd className="font-medium text-neutral-50">
            {formatCost(primaryPricing(publication, currency))}
          </dd>
        </div>
      </dl>
    </CatalogCard>
  );
}
