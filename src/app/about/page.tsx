import AboutTitle from "@/src/features/about/AboutTitle";
import Contact from "@/src/features/about/Contact";
import MeetOurTeam from "@/src/features/about/MeetOurTeam";
import Pillars from "@/src/features/about/Pillars";
import WhyNexus from "@/src/features/about/WhyNexus";

export default function AboutPage() {
  return (
    <main className="w-[90%] mx-auto font-main tracking-[5%] space-y-6 lg:space-y-20 py-21.5">
      <AboutTitle />
      <Pillars />
      <WhyNexus />
      <MeetOurTeam />
      <Contact />
    </main>
  );
}
