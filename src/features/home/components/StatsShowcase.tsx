"use client";

import React, { useEffect, useState } from "react";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [element, setElement] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [element, hasStarted]);

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

  return [count, setElement] as const;
}

export default function StatsShowcase() {
  const [companiesCount, companiesRef] = useCountUp(233, 2200);
  const [projectsCount, projectsRef] = useCountUp(31, 1800);

  return (
    <section className="relative z-10 w-full bg-transparent px-6 py-10 sm:px-12 md:px-20 lg:px-28 lg:mb-0">
      <div className="mx-auto max-w-3xl">
        <div
          className="flex w-full flex-col gap-6 rounded-2xl px-8 py-7 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-8"
          style={{
            background:
              "linear-gradient(90deg, rgba(37, 116, 169, 0.07) 0%, rgba(62, 180, 177, 0.13) 100%)",
          }}
        >
          <div className="flex shrink-0 flex-col gap-1 items-center md:items-start">
            <span className="font-sans text-caption font-medium leading-[1.25] tracking-normal text-accent-300">
              Powered By Innovation
            </span>
            <h2 className="font-sans text-h3 font-bold leading-[1.15] tracking-normal text-neutral-50 sm:text-h2-sm">
              Growth Insights
            </h2>
          </div>

          <div className="hidden w-px self-stretch bg-primary-600/50 sm:block" />

          <div className="grid grid-cols-3 items-center gap-8 sm:gap-12">
            <div className="flex flex-col items-center text-center">
              <span className="font-sans text-stat font-bold leading-none tracking-normal text-neutral-50">
                -
              </span>
              <span className="mt-1 font-sans text-caption font-normal leading-[1.25] tracking-normal text-neutral-300">
                Researches
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span
                ref={companiesRef}
                className="font-sans text-stat font-bold leading-none tracking-normal text-neutral-50"
              >
                {companiesCount}+
              </span>
              <span className="mt-1 font-sans text-caption font-normal leading-[1.25] tracking-normal text-neutral-300">
                Company
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <span
                ref={projectsRef}
                className="font-sans text-stat font-bold leading-none tracking-normal text-neutral-50"
              >
                {projectsCount}+
              </span>
              <span className="mt-1 font-sans text-caption font-normal leading-[1.25] tracking-normal text-neutral-300">
                Project
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
