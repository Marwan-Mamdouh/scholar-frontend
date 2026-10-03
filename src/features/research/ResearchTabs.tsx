import type { TabType } from "./Research.type";

const tabs = [
  { id: "researchers", label: "Researchers" },
  { id: "papers", label: "Papers" },
  { id: "publications", label: "Publications" },
  { id: "projects", label: "Graduation Projects" },
] as const;

export default function ResearchTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}) {
  return (
    <nav
      aria-label="Research categories"
      className="relative z-10 mt-7 flex w-full items-end gap-0.5"
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          aria-current={activeTab === id ? "page" : undefined}
          onClick={() => onTabChange(id)}
          className={`min-w-0 flex-1 cursor-pointer rounded-t-[18px] px-0.5 py-1.5 text-center text-xs font-normal max-sm:tracking-normal min-[375px]:text-sm transition-all duration-500 ease-in-out sm:flex-none sm:px-4 sm:text-lg lg:px-14.5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-300 ${activeTab === id ? "border-x border-t-4 border-accent-200 bg-transparent py-2 font-semibold text-accent-200" : "bg-accent-700 text-neutral-50"}`}
        >
          {id === "projects" ? (
            <>
              <span className="sm:hidden">Projects</span>
              <span className="hidden sm:inline">{label}</span>
            </>
          ) : (
            label
          )}
        </button>
      ))}
    </nav>
  );
}
