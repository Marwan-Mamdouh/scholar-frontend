"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Badge from "@/src/components/ui/Badge/Badge";
import Button from "@/src/components/ui/Button/Button";
import getButtonClasses from "@/src/components/ui/Button/button.style";
import Card from "@/src/components/ui/Card/Card";
import { ApiError } from "@/src/lib/api-client";
import { fetchJob } from "../jobs.api";
import { JOB_TYPES, SENIORITY_LEVELS } from "../jobs.constants";
import type { Job } from "../jobs.type";
import {
  applicationUrl,
  jobDomains,
  jobLocation,
  postedDate,
} from "../jobs.utils";

export default function JobDetails({ id }: { id: string }) {
  const [retry, setRetry] = useState(0);
  const key = `${id}:${retry}`;
  const [result, setResult] = useState<{
    key: string;
    job?: Job;
    error?: string;
    notFound?: boolean;
  }>();
  const invalidId =
    !/^[1-9]\d*$/.test(id) ||
    !Number.isSafeInteger(Number(id)) ||
    Number(id) > 2_147_483_647;

  useEffect(() => {
    if (invalidId) return;
    const controller = new AbortController();
    fetchJob(id, controller.signal)
      .then((job) => {
        if (!controller.signal.aborted) setResult({ key, job });
      })
      .catch((cause: unknown) => {
        if (!controller.signal.aborted)
          setResult({
            key,
            error:
              cause instanceof Error
                ? cause.message
                : "Couldn't load this job.",
            notFound: cause instanceof ApiError && cause.status === 404,
          });
      });
    return () => controller.abort();
  }, [id, key, invalidId]);

  const loading = !invalidId && result?.key !== key;
  const job = result?.job;
  const applyLink = applicationUrl(job?.applyLink ?? null);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 break-words px-4 pt-36 pb-24 font-main md:px-8">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-2 text-accent-300 hover:text-accent-200 focus-visible:outline-2 focus-visible:outline-accent-200"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to jobs
      </Link>
      {loading ? (
        <div
          role="status"
          className="flex items-center justify-center gap-3 py-32 text-accent-200"
        >
          <Loader2
            aria-hidden="true"
            className="size-6 motion-safe:animate-spin"
          />
          Loading job details…
        </div>
      ) : invalidId || result?.error ? (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 py-24 text-center"
        >
          <h1 className="text-3xl font-semibold text-primary-200">
            {invalidId || result?.notFound
              ? "Job not found"
              : "Couldn't load this job"}
          </h1>
          <p className="text-neutral-100">
            {invalidId || result?.notFound
              ? "This opportunity may no longer be available. Browse the latest jobs to find another role."
              : result?.error}
          </p>
          {!invalidId && !result?.notFound && (
            <Button
              variant="outlined"
              intent="accent"
              onClick={() => setRetry((value) => value + 1)}
            >
              Try again
            </Button>
          )}
        </div>
      ) : job ? (
        <article className="flex flex-col gap-8">
          <header className="rounded-3xl border border-primary-300 bg-brand-gradient p-6 md:p-8">
            <p className="mb-3 text-lg text-accent-300">{job.company.name}</p>
            <h1 className="text-3xl font-semibold text-primary-200 md:text-4xl">
              {job.title}
            </h1>
            <p className="mt-3 text-neutral-100">
              {jobLocation(job)} · Posted {postedDate(job.postedAt)}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {job.type && (
                <Badge variant="solid" intent="accent">
                  {JOB_TYPES[job.type]}
                </Badge>
              )}
              {job.seniority && (
                <Badge variant="outlined" intent="accent">
                  {SENIORITY_LEVELS[job.seniority]}
                </Badge>
              )}
              {[...new Set([job.industry, ...jobDomains(job.domains)])]
                .filter((tag): tag is string => !!tag)
                .map((tag) => (
                  <Badge key={tag} variant="outlined" intent="primary">
                    {tag}
                  </Badge>
                ))}
            </div>
            <p className="mt-5 text-neutral-100">
              Salary: {job.salary || "Not disclosed"}
            </p>
            {applyLink ? (
              <a
                href={applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${getButtonClasses({ intent: "accent", variant: "outlined", size: "lg" })} mt-6 w-fit gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-200`}
              >
                Apply on company website
                <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <p className="mt-6 text-sm text-neutral-200">
                An application link has not been provided for this role.
              </p>
            )}
          </header>
          <Card
            variant="outlined"
            intent="primary"
            title="About the role"
            className="border-primary-300/50"
          >
            <p className="whitespace-pre-wrap leading-relaxed text-neutral-100">
              {job.description ||
                "No description has been provided for this role."}
            </p>
          </Card>
          <Card
            variant="outlined"
            intent="primary"
            title="Requirements"
            className="border-primary-300/50"
          >
            <p className="whitespace-pre-wrap leading-relaxed text-neutral-100">
              {job.requirements ||
                "No specific requirements have been provided."}
            </p>
          </Card>
        </article>
      ) : null}
    </main>
  );
}
