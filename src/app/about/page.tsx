import { Member, TeamsData } from "@/src/features/about/about.type";
import AboutTitle from "@/src/features/about/AboutTitle";
import Contact from "@/src/features/about/Contact";
import MeetOurTeam from "@/src/features/about/MeetOurTeam";
import Pillars from "@/src/features/about/Pillars";
import WhyNexus from "@/src/features/about/WhyNexus";

const teams: TeamsData ={
  meta:{
    teamCount:3,
    memberCount:17
  },
  data:[
    {
      title:"web app team",
      count:7,
      members: [
        {
          id: "1",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "2",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "3",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "4",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "5",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "6",
          name: "heba",
          role: "web",
          linkedIn: "",
        },
        {
          id: "7",
          name: "heba",
          role: "",
        },
      ]
    },
    {
      title:"Academia team",
      count: 7,
      members: [
        {
          id: "1",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "2",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "3",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "4",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "5",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "6",
          name: "heba",
          role: "web",
          linkedIn: "",
        },
        {
          id: "7",
          name: "heba",
          role: "",
        },
      ]
    },
    {
      title:"Industry Team",
      count: 7,
      members: [
        {
          id: "1",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "2",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "3",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "4",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "5",
          name: "heba",
          role: "web",
          linkedIn: "linkedIn.com",
        },
        {
          id: "6",
          name: "heba",
          role: "web",
          linkedIn: "",
        },
        {
          id: "7",
          name: "heba",
          role: "",
        },
      ]
    },
  ]
}

export default function AboutPage() {
  return (
    <main className="w-[90%] mx-auto font-main tracking-[5%] space-y-6 lg:space-y-20 py-21.5">
      <AboutTitle />
      <Pillars />
      <WhyNexus />
      <MeetOurTeam teams={teams}/>
      <Contact />
    </main>
  );
}
