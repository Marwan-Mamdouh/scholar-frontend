"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoIcon from "./Icons/Logo";
import CustomLink from "./CustomLink";
import ThemeIcon from "./Icons/Theme";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Jobs", href: "/jobs" },
  { label: "About", href: "/about" },
];

function HeaderActions({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-13.5 shrink-0 items-center justify-end gap-2.5 ${
        className || ""
      }`.trim()}
    >
      <CustomLink
        aria-label="Log in"
        className="h-13.5 min-w-24"
        variant="primary"
        outlined
        href="/login"
      >
        Login
      </CustomLink>
      <button
        aria-label="Toggle theme"
        className="flex h-13.5 w-13.5 items-center justify-center rounded-xl px-2 py-1 text-neutral-300 transition-colors duration-200 hover:text-neutral-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-100"
        type="button"
      >
        <ThemeIcon className="h-9.5 w-9.5" />
      </button>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex min-h-21.5 w-full flex-col gap-3 bg-neutral-900/50 px-6 py-3 backdrop-blur-[7.5px] sm:px-10 lg:h-21.5 lg:flex-row lg:items-center lg:justify-between lg:gap-2.5 lg:px-26 lg:py-3.5">
      <div className="flex w-full items-center justify-between gap-4 lg:w-max">
        <Link
          aria-label="NEXUS home"
          className="flex h-12.5 shrink-0 items-center gap-2.5 text-primary-300"
          href="/"
        >
          <LogoIcon className="h-8 w-8" />
          <span className="font-display text-h2-sm tracking-display text-primary-300">
            NEXUS
          </span>
        </Link>
        <HeaderActions className="lg:hidden" />
      </div>

      <nav
        aria-label="Primary navigation"
        className="flex items-center order-3 w-full lg:order-0 lg:w-max lg:h-full"
      >
        <ul className="z-10 flex gap-2 overflow-x-auto pb-1 sm:justify-center sm:gap-6.5 sm:px-4 lg:w-max lg:overflow-visible lg:p-0">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            const navLinkClassName =
              `relative isolate flex h-12.5 items-center justify-center overflow-visible rounded-xl px-2.5 font-ui tracking-display capitalize transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 ${
                isActive
                  ? "text-h3-sm text-neutral-50"
                  : "text-btn text-neutral-100 hover:text-neutral-50"
              }`.trim();

            return (
              <li key={item.href} className="shrink-0">
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={navLinkClassName}
                  href={item.href}
                >
                  {isActive ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-8 w-15.75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-400 blur-[60px] lg:block"
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <HeaderActions className="hidden w-45 lg:flex" />
    </header>
  );
}
