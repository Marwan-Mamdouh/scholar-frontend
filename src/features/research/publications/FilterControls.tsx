"use client";

import type { NumericRange, RangeValue } from "./publication.type";

interface OptionListProps<T extends string | number> {
  options: { value: T; label: string; hint?: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}

export function OptionList<T extends string | number>({
  options,
  selected,
  onToggle,
}: OptionListProps<T>) {
  return (
    <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label
            key={option.value}
            className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 cursor-pointer hover:bg-white/5"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(option.value)}
              aria-label={
                option.hint ? `${option.label} — ${option.hint}` : option.label
              }
              className="mt-0.5 size-4 shrink-0 accent-accent-400 cursor-pointer"
            />
            <span className="flex flex-col">
              <span
                className={`text-sm ${checked ? "text-accent-200" : "text-neutral-100"}`}
              >
                {option.label}
              </span>
              {option.hint && (
                <span className="text-xs text-neutral-300">{option.hint}</span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}

interface RangeFieldProps {
  label: string;
  bound: NumericRange;
  value: RangeValue;
  onChange: (value: RangeValue) => void;
  step?: number;
  unit?: string;
}

/**
 * Min/max pair for one numeric dimension. An empty box means "unbounded on that
 * side", so clearing an input has to send `undefined` rather than 0.
 */
export function RangeField({
  label,
  bound,
  value,
  onChange,
  step = 0.1,
  unit,
}: RangeFieldProps) {
  const parse = (raw: string) => (raw === "" ? undefined : Number(raw));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-sm text-neutral-100">{label}</span>
        <span className="text-xs text-neutral-300">
          {bound.min}–{bound.max}
          {unit ? ` ${unit}` : ""}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          step={step}
          min={bound.min}
          max={bound.max}
          value={value.min ?? ""}
          onChange={(event) =>
            onChange({ ...value, min: parse(event.target.value) })
          }
          placeholder={String(bound.min)}
          aria-label={`${label} minimum`}
          className="w-full rounded-lg border border-neutral-400 bg-transparent px-2.5 py-1.5 text-sm text-neutral-50 outline-none focus:border-accent-400"
        />
        <span className="text-neutral-300 text-sm">to</span>
        <input
          type="number"
          inputMode="decimal"
          step={step}
          min={bound.min}
          max={bound.max}
          value={value.max ?? ""}
          onChange={(event) =>
            onChange({ ...value, max: parse(event.target.value) })
          }
          placeholder={String(bound.max)}
          aria-label={`${label} maximum`}
          className="w-full rounded-lg border border-neutral-400 bg-transparent px-2.5 py-1.5 text-sm text-neutral-50 outline-none focus:border-accent-400"
        />
      </div>
    </div>
  );
}
