"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import ResearchResults from "./ResearchResults";

export default function ResearchPanelError({
  noun,
  message,
}: {
  noun: string;
  message: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <ResearchResults
      noun={noun}
      error={message}
      loading={pending}
      onRetry={() => startTransition(() => router.refresh())}
      onPageChange={() => {}}
    >
      {null}
    </ResearchResults>
  );
}
