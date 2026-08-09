import { ReactNode } from "react";

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-25 font-main sm:px-7">
      {children}
    </main>
  );
}
