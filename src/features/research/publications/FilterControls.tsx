"use client";

import { useState } from "react";
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

/** Digits on the way to being a number, including part-typed ones: "", "-", "1.", "1e". */
const NUMERIC_DRAFT = /^[-+]?\d*(?:\.\d*)?(?:[eE][-+]?\d*)?$/;

function toText(value: number | undefined): string {
  return value === undefined ? "" : String(value);
}

/**
 * `undefined` for an empty box (means unbounded), a number when the text is one,
 * and `null` while it is still being typed ("-", "1e") and has no numeric value.
 */
function parseDraft(raw: string): number | undefined | null {
  if (raw === "") return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

const FIELD_CLASS =
  "w-full rounded-lg border border-neutral-400 bg-transparent px-2.5 py-1.5 text-sm text-neutral-50 outline-none focus:border-accent-400";

interface NumericFieldProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  ariaLabel: string;
}

/**
 * One optional number, backed by its own text so what is typed is what is shown.
 *
 * This is deliberately `type="text"` with `inputMode="decimal"` rather than
 * `type="number"`. A number input runs the HTML value-sanitisation algorithm,
 * which reports every part-typed value ("1.", "-", "5e") as `""` — so a parent
 * holding the parsed number cannot tell "still typing" from "box cleared", and
 * ends up echoing an empty string back into a box that visibly reads "1.".
 * Rewriting a number input's value while it holds unparseable text makes WebKit
 * re-fire `input`; combined with a parent that built a fresh object on every
 * change (so React could never bail out of the re-render), the two fed each
 * other and hung the page in Safari.
 *
 * Owning the text fixes both halves: the value written back is always the value
 * typed, and a part-typed box reports nothing upward, so "12." no longer clears
 * the filter and refetches the whole list between keystrokes.
 */
export function NumericField({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: NumericFieldProps) {
  const [draft, setDraft] = useState(() => toText(value));
  const [synced, setSynced] = useState(value);

  // Re-sync when the value is changed from outside — "Clear" or "Clear all".
  // Text that already parses to the incoming number is left alone, so an
  // in-progress "12." is not rewritten to "12" between keystrokes.
  if (value !== synced) {
    setSynced(value);
    if (parseDraft(draft) !== value) setDraft(toText(value));
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={draft}
      onChange={(event) => {
        const raw = event.target.value;
        if (!NUMERIC_DRAFT.test(raw)) return;

        setDraft(raw);

        const parsed = parseDraft(raw);
        // Still mid-number, or the same value the parent already holds — either
        // way there is nothing new to report, and no re-render to provoke.
        if (parsed === null || parsed === value) return;
        onChange(parsed);
      }}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={FIELD_CLASS}
    />
  );
}

interface RangeFieldProps {
  label: string;
  bound: NumericRange;
  value: RangeValue;
  onChange: (value: RangeValue) => void;
  unit?: string;
}

/**
 * Min/max pair for one numeric dimension. An empty box means "unbounded on that
 * side", so clearing an input sends `undefined` rather than 0.
 */
export function RangeField({
  label,
  bound,
  value,
  onChange,
  unit,
}: RangeFieldProps) {
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
        <NumericField
          value={value.min}
          onChange={(min) => onChange({ ...value, min })}
          placeholder={String(bound.min)}
          ariaLabel={`${label} minimum`}
        />
        <span className="text-neutral-300 text-sm">to</span>
        <NumericField
          value={value.max}
          onChange={(max) => onChange({ ...value, max })}
          placeholder={String(bound.max)}
          ariaLabel={`${label} maximum`}
        />
      </div>
    </div>
  );
}
