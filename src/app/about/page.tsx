import { fetchTeams } from "@/src/features/about/about.api";
import AboutTitle from "@/src/features/about/AboutTitle";
import Contact from "@/src/features/about/Contact";
import MeetOurTeam from "@/src/features/about/MeetOurTeam";
import Pillars from "@/src/features/about/Pillars";
import WhyNexus from "@/src/features/about/WhyNexus";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | NEXUS",
  description:
    "Meet the researchers, developers, and industry experts building a connected academic ecosystem.",
};

export default async function AboutPage() {
  const teams = await fetchTeams();
  return (
    <main className="max-w-7xl mx-auto px-5 font-main tracking-display space-y-14 md:space-y-16 lg:space-y-20 pt-26 pb-14 lg:py-21.5">
      <AboutTitle />
      <Pillars />
      <WhyNexus />
      {teams ? (
        <MeetOurTeam teams={teams} />
      ) : (
        <p role="status" className="text-neutral-200">
          Team information is temporarily unavailable.
        </p>
      )}
      <Contact />
    </main>
  );
}
