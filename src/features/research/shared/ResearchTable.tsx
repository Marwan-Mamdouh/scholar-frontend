import type { ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export interface ResearchColumn<T> {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  className?: string;
  sortKey?: string;
  render: (row: T) => ReactNode;
}

export interface ResearchSort {
  key: string;
  direction: "asc" | "desc";
}

const alignment = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export default function ResearchTable<T extends { id: string | number }>({
  label,
  columns,
  rows,
  sort,
  onSort,
  onRowClick,
}: {
  label: string;
  columns: ResearchColumn<T>[];
  rows: T[];
  sort?: ResearchSort;
  onSort?: (sort: ResearchSort) => void;
  onRowClick?: (row: T) => void;
}) {
  return (
    <div
      role="region"
      aria-label={`${label} table — scroll for more columns`}
      tabIndex={0}
      className="w-full overflow-x-auto rounded-2xl border border-neutral-500 outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
    >
      <table className="w-full min-w-5xl border-collapse text-sm">
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="bg-white/5">
            {columns.map((column) => {
              const sorted = column.sortKey && sort?.key === column.sortKey;
              const SortIcon = sorted
                ? sort.direction === "asc"
                  ? ArrowUp
                  : ArrowDown
                : ArrowUpDown;
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    column.sortKey
                      ? sorted
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                      : undefined
                  }
                  className={`whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 ${alignment[column.align ?? "left"]}`}
                >
                  {column.sortKey && onSort ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSort({
                          key: column.sortKey!,
                          direction:
                            sorted && sort.direction === "asc" ? "desc" : "asc",
                        })
                      }
                      className="inline-flex cursor-pointer items-center gap-2 rounded hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-accent-300"
                    >
                      {column.label}
                      <SortIcon className="size-3.5" aria-hidden="true" />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-500/60">
          {rows.map((row) => (
            <tr
              key={row.id}
              onClick={onRowClick ? (event) => {
                // Keep links and the keyboard-accessible title button independent.
                if ((event.target as Element).closest("a, button, input, select, textarea")) return;
                event.currentTarget.querySelector<HTMLElement>('[aria-haspopup="dialog"]')?.focus({ preventScroll: true });
                onRowClick(row);
              } : undefined}
              className={`transition-colors duration-200 hover:bg-white/5 ${onRowClick ? "cursor-pointer focus-within:bg-white/5" : ""}`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-3 text-neutral-100 ${alignment[column.align ?? "left"]} ${column.className ?? ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ResearchTableSkeleton() {
  return (
    <div
      role="status"
      className="overflow-hidden rounded-2xl border border-neutral-500"
    >
      <span className="sr-only">Loading results…</span>
      <div className="h-11 bg-white/5" />
      {Array.from({ length: 6 }, (_, row) => (
        <div
          key={row}
          className="h-16 border-t border-neutral-500/60 bg-white/[0.02] motion-safe:animate-pulse"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
