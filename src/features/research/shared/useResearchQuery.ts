"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/src/lib/api-client";

/** Cancel obsolete requests and keep their results from replacing a newer query. */
export function useResearchQuery<T>(path: string, initialData?: T) {
  const [result, setResult] = useState<{
    key: string;
    data?: T;
    error: string | null;
  }>({ key: path, data: initialData, error: null });
  const [attempt, setAttempt] = useState(0);
  const [initialPath] = useState(path);
  const key = `${path}:${attempt}`;
  const hasInitialData =
    attempt === 0 &&
    path === initialPath &&
    result.key === path &&
    initialData !== undefined;

  useEffect(() => {
    if (hasInitialData) return;
    const controller = new AbortController();
    apiGet<T>(path, { signal: controller.signal })
      .then((data) => {
        if (!controller.signal.aborted) setResult({ key, data, error: null });
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setResult({
            key,
            error:
              cause instanceof Error
                ? cause.message
                : "The service is unavailable. Please try again.",
          });
      });
    return () => controller.abort();
  }, [path, key, hasInitialData]);

  return {
    data: result.data,
    error: result.key === key ? result.error : null,
    loading: !hasInitialData && result.key !== key,
    retry: () => setAttempt((value) => value + 1),
  };
}
