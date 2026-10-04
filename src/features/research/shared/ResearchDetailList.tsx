import type { ReactNode } from "react";

export interface ResearchDetail {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}

export default function ResearchDetailList({ fields }: { fields: ResearchDetail[] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
      {fields.map(({ label, value, fullWidth }) => (
        <div key={label} className={`min-w-0 ${fullWidth ? "sm:col-span-2" : ""}`}>
          <dt className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-300">
            {label}
          </dt>
          <dd className="whitespace-pre-line wrap-anywhere text-sm leading-relaxed text-neutral-50">
            {value == null || (typeof value === "string" && !value.trim())
              ? <span className="text-neutral-200">Not provided</span>
              : value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function formatResearchDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
}
