"use client";

import React, { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, end, duration]);

  return { count, ref };
}

export default function StatsShowcase() {
  const companies = useCountUp(233, 2200);
  const projects = useCountUp(31, 1800);

  return (
    <section className="w-full bg-neutral-900 py-10 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-4xl mx-auto">
        <div className="w-full rounded-2xl backdrop-blur-md px-8 py-7 sm:px-10 sm:py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-8" style={{ background: "linear-gradient(to right, #2574A912 7%, #3EB4B121 13%)" }}>

          {/* Left Block: Brand Accent & Title */}
          <div className="flex flex-col space-y-1 shrink-0">
            <span className="text-accent-300 font-sans text-sm font-semibold tracking-wider">
              Powered By Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-50 tracking-tight">
              Growth Insights
            </h2>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px self-stretch bg-primary-600/50" />

          {/* Right Block: Stats Columns */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 items-center">
            {/* Researches — no count, static dash */}
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-neutral-50 tracking-tight">-</span>
              <span className="text-xs sm:text-sm font-light text-neutral-300 mt-1 tracking-wide">Researches</span>
            </div>

            {/* Company — animated count */}
            <div className="flex flex-col items-center text-center">
              <span ref={companies.ref} className="text-3xl sm:text-4xl font-extrabold text-neutral-50 tracking-tight">
                {companies.count}+
              </span>
              <span className="text-xs sm:text-sm font-light text-neutral-300 mt-1 tracking-wide">Company</span>
            </div>

            {/* Project — animated count */}
            <div className="flex flex-col items-center text-center">
              <span ref={projects.ref} className="text-3xl sm:text-4xl font-extrabold text-neutral-50 tracking-tight">
                {projects.count}+
              </span>
              <span className="text-xs sm:text-sm font-light text-neutral-300 mt-1 tracking-wide">Project</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
