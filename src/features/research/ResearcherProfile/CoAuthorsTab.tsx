import { Icon } from "@iconify/react";
import type { CoAuthor } from "./researcherProfile.type";

interface CoAuthorsTabProps {
  coAuthors: CoAuthor[];
}

export default function CoAuthorsTab({ coAuthors }: CoAuthorsTabProps) {
  if (coAuthors.length === 0) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-800/60 p-8">
        <p className="text-sm text-neutral-400">No co-author data available.</p>
      </div>
    );
  }

  // Sort by collaboration count descending
  const sorted = [...coAuthors].sort(
    (a, b) => b.collaborations - a.collaborations,
  );

  return (
    <div className="rounded-2xl border border-neutral-700 bg-neutral-800/60 p-5 md:p-6">
      <div className="flex flex-wrap gap-2.5">
        {sorted.map((author) => (
          <button
            key={author.name}
            type="button"
            onClick={() => console.log(`View co-author: ${author.name}`)}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-600 bg-transparent px-3.5 py-1.5 text-sm text-neutral-200 transition-colors duration-150 hover:border-accent-400/50 hover:text-neutral-50"
          >
            <Icon icon="lucide:external-link" className="h-3 w-3 shrink-0" aria-hidden="true" />
            {author.name}
            <span className="text-neutral-400">({author.collaborations})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
