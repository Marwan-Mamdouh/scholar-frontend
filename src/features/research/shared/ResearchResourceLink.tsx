import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

export default function ResearchResourceLink({
  href,
  children,
}: {
  href: string | null;
  children: ReactNode;
}) {
  // Database-supplied links must be ordinary web URLs.
  if (!href || !/^https?:\/\//i.test(href)) return <span>{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-start gap-1.5 rounded text-neutral-50 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-accent-300"
    >
      {children}
      <ExternalLink
        className="mt-1 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
