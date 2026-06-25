import React from "react";
import Timeline from "./Timeline";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Pillars() {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center ">
      <DotLottieReact
        src="https://lottie.host/3918952e-85a9-4a07-9846-0f8fea09beba/8cyikSTHfa.lottie"
        loop
        autoplay
        className="w-220 h-90 lg:w-[50%] md:h-full relative md:translate-x-0"
      />
      <div className="space-y-4 lg:w-[50%]">
        <div className="tracking-wide">
          <h2 className=" text-4xl lg:text-5xl capitalize font-semibold  leading-10 text-neutral-50 mb-2">
            What We're <span className="text-accent-400">Building</span>
          </h2>
          <p className="text-neutral-100 text-lg ">
            The core pillars shaping a smarter connection between academia and
            industry.
          </p>
        </div>
        <Timeline />
      </div>
    </div>
  );
}
