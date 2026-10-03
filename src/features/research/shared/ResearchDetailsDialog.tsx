"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function ResearchDetailsDialog({
  title,
  category,
  onClose,
  children,
}: {
  title: string;
  category: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const pointerStartedOutside = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current!;
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onPointerDown={(event) => {
        pointerStartedOutside.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pointerStartedOutside.current && event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="fixed m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border-2 border-accent-200 bg-background p-0 text-neutral-100 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <header className="flex shrink-0 items-start gap-4 border-b border-neutral-500/60 p-5 sm:p-6">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-300">
            {category}
          </p>
          <h2 id={titleId} className="wrap-anywhere text-xl font-semibold leading-snug text-accent-200 sm:text-2xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-400 text-neutral-200 hover:border-accent-300 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>
      <div className="min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6">
        {children}
      </div>
    </dialog>
  );
}
