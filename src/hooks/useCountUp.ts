"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_DURATION = 3500;

const parseValue = (value: string) => {
  const match = /^(\D*?)([\d.]+)(.*)$/.exec(value);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const target = Number.parseFloat(digits);

  return Number.isNaN(target) ? null : { prefix, target, suffix };
};

export default function useCountUp(
  value: string | null,
  duration = DEFAULT_DURATION,
): string {
  const parsed = value === null ? null : parseValue(value);
  const prefix = parsed?.prefix;
  const target = parsed?.target;
  const suffix = parsed?.suffix;

  const [animation, setAnimation] = useState(() => ({
    value,
    text: parsed ? `${parsed.prefix}0${parsed.suffix}` : (value ?? "-"),
  }));
  const frameRef = useRef<number>(null);

  useEffect(() => {
    if (target === undefined) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = duration <= 0 ? 1 : Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimation({ value, text: `${prefix}${Math.floor(eased * target)}${suffix}` });

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [prefix, target, suffix, value, duration]);

  if (target === undefined) return value ?? "-";
  return animation.value === value
    ? animation.text
    : `${prefix}0${suffix}`;
}
