"use client";

import React from "react";
import Button from "@/src/components/Button";

export default function Hero() {
  return (
    <section className="relative z-10 flex w-full items-center overflow-hidden bg-transparent lg:h-[715px]">
      <style>{`
        @keyframes wave-draw {
          from { stroke-dashoffset: 1800; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes wave-draw-fast {
          from { stroke-dashoffset: 1400; }
          to { stroke-dashoffset: 0; }
        }
        .wave-1 {
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
          animation: wave-draw 2.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }
        .wave-2 {
          stroke-dasharray: 1800;
          stroke-dashoffset: 1800;
          animation: wave-draw 2.8s cubic-bezier(0.4, 0, 0.2, 1) 0.55s forwards;
        }
        .wave-3 {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: wave-draw-fast 2.6s cubic-bezier(0.4, 0, 0.2, 1) 0.9s forwards;
        }
        .hero-text > * {
          opacity: 0;
          transform: translateY(18px);
          animation: fade-up 0.7s ease forwards;
        }
        .hero-text > *:nth-child(1) { animation-delay: 0.15s; }
        .hero-text > *:nth-child(2) { animation-delay: 0.3s; }
        .hero-text > *:nth-child(3) { animation-delay: 0.45s; }
        .hero-text > *:nth-child(4) { animation-delay: 0.6s; }
        @keyframes fade-up {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="relative z-10 flex w-full flex-col items-center lg:h-[715px] lg:flex-row lg:items-stretch">
        <div className="hero-text relative z-10 flex w-full flex-col justify-center px-8 py-20 text-left sm:px-14 md:px-20 md:py-24 lg:w-[50%] lg:px-28 lg:py-0 xl:w-[46%]">
          <p className="mb-4 font-kadwa font-normal text-[24px] leading-[50px] tracking-[0.2em] capitalize text-accent-300">
            Scholar Nexus
          </p>

          <h1 className="max-w-md font-kanit font-bold text-[48px] leading-[50px] tracking-[0.05em] align-middle capitalize text-neutral-50 md:max-w-md lg:max-w-lg">
            Join To Connect And Advance Research
          </h1>

          <p className="mt-5 max-w-sm font-kadwa font-normal text-[20px] leading-[30px] tracking-[0.05em] capitalize text-neutral-100 md:max-w-md lg:w-[765px] lg:max-w-none">
            Bringing Academia And Industry Together. Connect, Explore Projects,
            And Unlock Opportunities.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button
              href="/research"
              variant="primary"
              className="px-7 py-3.5 shadow-lg shadow-primary-700/30 hover:-translate-y-0.5 hover:shadow-primary-500/40"
            >
              Get Started
            </Button>

            <Button
              href="/jobs"
              variant="primary"
              className="border-2 border-primary-500 bg-transparent px-7 py-3.5  text-primary-500 hover:-translate-y-0.5 hover:!bg-none hover:border-primary-300 hover:text-primary-300 hover:shadow-sm hover:shadow-primary-200"
            >
              Join Us
            </Button>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 780 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              className="wave-1"
              d="M 780 30 C 650 80, 680 200, 550 250 C 450 280, 440 370, 390 398 L 0 398"
              stroke="#1d5c87"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            <path
              className="wave-2"
              d="M 780 110 C 680 90, 620 180, 520 220 C 430 250, 450 380, 390 398 L 0 398"
              stroke="#2574a9"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
            <path
              className="wave-3"
              d="M 780 210 C 650 280, 600 180, 480 250 C 420 300, 430 380, 390 398 L 0 398"
              stroke="#37b5aa"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
              opacity="1"
            />
          </svg>
        </div>
      </div>

    </section>
  );
}
