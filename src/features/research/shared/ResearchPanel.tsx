import type { ReactNode } from "react";

export default function ResearchPanel({ children }: { children: ReactNode }) {
  return (
    <div className="relative -mt-px flex min-h-100 w-full min-w-0 flex-col gap-6 rounded-b-2xl rounded-tr-2xl border-2 border-accent-200 bg-transparent p-6">
      {children}
    </div>
  );
}
