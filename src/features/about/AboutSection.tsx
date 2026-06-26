import React from "react";
import AboutTitle from "./AboutTitle";
import Pillars from "./Pillars";
import WhyNexus from "./WhyNexus";

export default function AboutSection() {
  return (
    <div className="w-[90%] mx-auto font-main space-y-10 lg:space-y-20">
      <AboutTitle />
      <Pillars />
      <WhyNexus/>
    </div>
  );
}
