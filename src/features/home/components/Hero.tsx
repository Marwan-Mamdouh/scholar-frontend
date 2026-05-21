"use client";

import React from "react";
import CustomLink from "@/src/components/CustomLink";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center lg:h-[715px]"
      style={{
        background:
          "linear-gradient(135deg, #05182a 0%, #0a2539 45%, #0f3249 75%, #154669 100%)",
      }}
    >
      {/* ── Animated wave draw-on keyframes ───────────────────────────── */}
      <style>{`
        @keyframes wave-draw {
          from { stroke-dashoffset: 1800; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes wave-draw-fast {
          from { stroke-dashoffset: 1400; }
          to   { stroke-dashoffset: 0; }
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
        .wave-4 {
          stroke-dasharray: 1400;
          stroke-dashoffset: 1400;
          animation: wave-draw-fast 2.6s cubic-bezier(0.4, 0, 0.2, 1) 1.2s forwards;
        }
        .hero-text > * {
          opacity: 0;
          transform: translateY(18px);
          animation: fade-up 0.7s ease forwards;
        }
        .hero-text > *:nth-child(1) { animation-delay: 0.15s; }
        .hero-text > *:nth-child(2) { animation-delay: 0.3s;  }
        .hero-text > *:nth-child(3) { animation-delay: 0.45s; }
        .hero-text > *:nth-child(4) { animation-delay: 0.6s;  }
        @keyframes fade-up {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Left: text content ────────────────────────────────────────── */}
      {/*
          On mobile the section is single-column; the waves sit behind (z-0)
          and a dark-to-transparent overlay keeps text readable.
          On lg+ we switch to side-by-side.
      */}
      <div className="relative z-10 flex w-full flex-col lg:flex-row items-center lg:items-stretch lg:h-[715px]">

        {/* Text column */}
        <div className="hero-text relative z-10 flex flex-col justify-center px-8 py-20 sm:px-14 md:px-20 md:py-24 lg:px-28 lg:py-0 w-full lg:w-[50%] xl:w-[46%] text-left">
          {/* Brand label */}
          <p className="mb-5 font-sans font-normal text-accent-300 text-[24px]" style={{ letterSpacing: "0.16em" }}>
            Scholar Nexus
          </p>

          {/* Main heading */}
          <h1 className="font-sans text-h1-sm md:text-h1 font-extrabold leading-tight text-neutral-50 max-w-md md:max-w-md lg:max-w-lg">
            Join To Connect And Advance Research
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-sm md:max-w-md lg:w-[765px] lg:max-w-none text-[#BDC3C7]" style={{ fontFamily: "var(--font-kadwa-source), serif", fontWeight: 400, fontSize: "20px", lineHeight: "30px" }}>
            Bringing Academia And Industry Together. Connect, Explore Projects, And Unlock Opportunities.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <CustomLink href="/research" variant="primary" className="px-7 py-3.5 rounded-xl font-semibold text-btn bg-primary-500 !text-neutral-50 hover:!text-neutral-100 shadow-lg shadow-primary-700/30 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5">
              Get Started
            </CustomLink>

            <CustomLink href="/jobs" variant="primary" outlined className="px-7 py-3.5 rounded-xl font-semibold text-btn hover:-translate-y-0.5 transition-all duration-300">
              Join Us
            </CustomLink>
          </div>
        </div>

        {/* Wave column — spanning the entire hero section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

          <svg viewBox="0 0 780 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="h-full w-full">
            {/* Wave 1 — deepest navy-blue */}
            <path className="wave-1" d="M 780 30 C 650 80, 680 200, 550 250 C 450 280, 440 370, 390 398 L 0 398" stroke="#1d5c87" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />

            {/* Wave 2 */}
            <path className="wave-2" d="M 780 110 C 680 90, 620 180, 520 220 C 430 250, 450 380, 390 398 L 0 398" stroke="#2574a9" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85" />

            {/* Wave 3 — teal بارز */}
            <path className="wave-3" d="M 780 210 C 650 280, 600 180, 480 250 C 420 300, 430 380, 390 398 L 0 398" stroke="#37b5aa" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="1" />

            {/* Wave 4 — lightest */}
            <path className="wave-4" d="M 780 310 C 700 290, 650 370, 500 320 C 440 280, 420 390, 390 398 L 0 398" stroke="#7dd3cb" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.6" />
          </svg>
        </div>

      </div>


      {/* Bottom teal line accent */}
      <div
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 10%, #37b5aa55 50%, transparent 90%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
