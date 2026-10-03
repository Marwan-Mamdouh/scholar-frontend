"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ResearchTabs from "./ResearchTabs";
import { TabType } from "./Research.type";

interface ResearchTabsClientProps {
  activeTab: TabType;
}

export default function ResearchTabsClient({
  activeTab,
}: Readonly<ResearchTabsClientProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return <ResearchTabs activeTab={activeTab} onTabChange={handleTabChange} />;
}
