"use client";

import type { ReactNode } from "react";
import { Input } from "@/src/components/ui/InputField/Input";

export default function ResearchToolbar({
  search,
  onSearch,
  placeholder,
  children,
  activeCount = 0,
  onClear,
}: {
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  children?: ReactNode;
  activeCount?: number;
  onClear?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="w-full shrink-0 lg:w-75">
          <Input
            type="search"
            aria-label={placeholder}
            placeholder={placeholder}
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">{children}</div>
      </div>
      {activeCount > 0 && onClear && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-300">
            {activeCount} filter{activeCount === 1 ? "" : "s"} applied
          </span>
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer text-sm text-accent-300 underline underline-offset-4 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-accent-300"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
