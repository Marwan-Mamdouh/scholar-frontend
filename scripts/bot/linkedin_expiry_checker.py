"""
LinkedIn Expiry Checker
=======================
Checks stored LinkedIn jobs to see if they are still accepting applications.

For each candidate job the script:
  1. GETs https://www.linkedin.com/jobs/view/<job_id>
  2. Considers the job EXPIRED when:
     - The final URL after redirects resolves to /jobs/search (deleted listing), OR
     - The response HTML contains a known "no longer accepting applications" marker.
  3. HTTP errors (429, 5xx, connection failures) are treated as UNKNOWN and leave
     is_active = true to avoid false-positive removals.

Jobs older than max_age_days are auto-expired without an HTTP check (too stale).
Brand-new jobs (younger than min_age_hours) are skipped — they are unlikely to be
closed already.

Usage:
    python linkedin_expiry_checker.py
    python linkedin_expiry_checker.py --dry-run
    python linkedin_expiry_checker.py --batch-size 30 --min-age-hours 12 --max-age-days 21

Environment variables (all optional):
    POSTGRES_URL               - connection string (required by db.connect())
    LINKEDIN_EXPIRY_DELAY      - seconds between requests (default: 5)
    LINKEDIN_EXPIRY_BATCH_SIZE - jobs to check per run   (default: 50)
    LINKEDIN_EXPIRY_MIN_AGE_H  - min age in hours         (default: 6)
    LINKEDIN_EXPIRY_MAX_AGE_D  - auto-expire after N days (default: 14)
"""


from __future__ import annotations

import argparse
import html
import logging
import os
import re
import time

import requests

from db import (
    connect,
    get_linkedin_jobs_to_check,
    mark_job_checked,
    mark_job_inactive,
    mark_stale_linkedin_jobs_inactive,
)

# --- Logging -----------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("expiry")

# --- Constants ----------------------------------------------------------------

LINKEDIN_JOB_URL = "https://www.linkedin.com/jobs/view/{job_id}"

# Markers already defined in sources/linkedin.py — duplicated here so this
# script can run standalone without importing from sources/.
CLOSED_MARKERS: tuple[str, ...] = (
    "no longer accepting applications",
    "this job is no longer accepting applications",
    "job is no longer available",
    "no longer available",
    "application deadline has passed",
    "expired",
    "no longer accepting",
)

# If the final URL path contains any of these the listing was removed / gated.
REDIRECT_PATHS: tuple[str, ...] = (
    "/jobs/search",
    "/authwall",
    "/uas/login",
    "/login",
    "/checkpoint",
)

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

# --- Result constants ---------------------------------------------------------
RESULT_ACTIVE = "active"
RESULT_EXPIRED = "expired"
RESULT_UNKNOWN = "unknown"   # HTTP error / bot-wall -- leave is_active unchanged


# --- Core check --------------------------------------------------------------

def check_linkedin_job(
    job_id: str,
    *,
    timeout: int = 15,
    session: requests.Session | None = None,
) -> str:
    """Return RESULT_ACTIVE, RESULT_EXPIRED, or RESULT_UNKNOWN.

    RESULT_UNKNOWN is returned whenever we cannot reliably determine the state
    (network errors, 429 rate-limits, login-wall redirects, etc.).
    """
    if not job_id:
        log.warning("check_linkedin_job called with empty job_id -- skipping.")
        return RESULT_UNKNOWN

    url = LINKEDIN_JOB_URL.format(job_id=job_id)
    sess = session or requests.Session()

    try:
        resp = sess.get(
            url,
            headers=_HEADERS,
            timeout=timeout,
            allow_redirects=True,
        )
    except requests.RequestException as exc:
        log.warning("  Network error checking %s: %s", url, exc)
        return RESULT_UNKNOWN

    # -- Redirect / URL check -------------------------------------------------
    final_path = resp.url.split("?")[0].lower()
    if any(p in final_path for p in REDIRECT_PATHS):
        log.debug("  redirected to %s -> EXPIRED", resp.url)
        return RESULT_EXPIRED

    # -- Rate-limit / bot-wall ------------------------------------------------
    if resp.status_code == 429:
        log.warning("  429 Too Many Requests for job %s -- treating as UNKNOWN", job_id)
        return RESULT_UNKNOWN

    if resp.status_code >= 500:
        log.warning("  Server error %s for job %s -- treating as UNKNOWN", resp.status_code, job_id)
        return RESULT_UNKNOWN

    if resp.status_code == 404:
        log.debug("  404 for job %s -> EXPIRED", job_id)
        return RESULT_EXPIRED

    if resp.status_code != 200:
        log.warning(
            "  Unexpected status %s for job %s -- treating as UNKNOWN", resp.status_code, job_id
        )
        return RESULT_UNKNOWN

    # -- HTML content check ---------------------------------------------------
    body = _clean_html(resp.text).lower()
    if any(marker in body for marker in CLOSED_MARKERS):
        log.debug("  closed marker found for job %s -> EXPIRED", job_id)
        return RESULT_EXPIRED

    return RESULT_ACTIVE


def _clean_html(raw: str) -> str:
    """Strip HTML tags, unescape entities, collapse whitespace."""
    text = html.unescape(raw)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# --- Runner ------------------------------------------------------------------

def run_expiry_check(
    *,
    batch_size: int = 50,
    min_age_hours: int = 6,
    max_age_days: int = 14,
    request_delay: float = 5.0,
    dry_run: bool = False,
) -> dict[str, int]:
    """Run a full expiry-check cycle and return a summary dict."""

    summary: dict[str, int] = {
        "stale_auto_expired": 0,
        "checked": 0,
        RESULT_ACTIVE: 0,
        RESULT_EXPIRED: 0,
        RESULT_UNKNOWN: 0,
    }

    with connect() as conn:
        # -- Step 1: auto-expire stale jobs (no HTTP needed) ------------------
        if dry_run:
            log.info("DRY RUN -- skipping stale auto-expiry DB writes")
        else:
            stale = mark_stale_linkedin_jobs_inactive(conn, max_age_days=max_age_days)
            conn.commit()
            summary["stale_auto_expired"] = stale
            if stale:
                log.info(
                    "Auto-expired %d stale LinkedIn jobs (>%d days old)", stale, max_age_days
                )

        # -- Step 2: fetch candidates for HTTP checking -----------------------
        candidates = get_linkedin_jobs_to_check(
            conn,
            limit=batch_size,
            min_age_hours=min_age_hours,
            max_age_days=max_age_days,
        )
        log.info("Checking %d LinkedIn jobs for availability...", len(candidates))

        sess = requests.Session()

        for job in candidates:
            job_id = job.source_job_id or _extract_job_id_from_url(job.url)
            display = "[%d] %s @ %s" % (job.id, job.title, job.company)

            if not job_id:
                log.warning("  No job ID for %s -- skipping", display)
                continue

            result = check_linkedin_job(job_id, session=sess)
            summary["checked"] += 1
            summary[result] += 1

            if result == RESULT_EXPIRED:
                log.info("  EXPIRED  -- %s", display)
                if not dry_run:
                    mark_job_inactive(conn, job.id)
                    conn.commit()
            elif result == RESULT_ACTIVE:
                log.info("  active   -- %s", display)
                if not dry_run:
                    mark_job_checked(conn, job.id)
                    conn.commit()
            else:  # UNKNOWN
                log.info("  unknown  -- %s (leaving is_active unchanged)", display)

            if request_delay > 0:
                time.sleep(request_delay)

    return summary


def _extract_job_id_from_url(url: str) -> str:
    """Fallback: extract numeric LinkedIn job ID from a URL string."""
    match = re.search(
        r"/jobs/view/(?:[^/?#]*-)?(\d+)(?:[/?#]|$)", url or "", re.IGNORECASE
    )
    return match.group(1) if match else ""


# --- CLI ---------------------------------------------------------------------

def _build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Check LinkedIn jobs for expiry.")
    p.add_argument(
        "--dry-run",
        action="store_true",
        help="Run checks without writing any DB changes.",
    )
    p.add_argument(
        "--batch-size",
        type=int,
        default=int(os.getenv("LINKEDIN_EXPIRY_BATCH_SIZE", "50")),
        help="Max jobs to HTTP-check per run (default: 50).",
    )
    p.add_argument(
        "--min-age-hours",
        type=int,
        default=int(os.getenv("LINKEDIN_EXPIRY_MIN_AGE_H", "6")),
        help="Skip jobs younger than N hours (default: 6).",
    )
    p.add_argument(
        "--max-age-days",
        type=int,
        default=int(os.getenv("LINKEDIN_EXPIRY_MAX_AGE_D", "30")),
        help="Auto-expire jobs older than N days (default: 30).",
    )
    p.add_argument(
        "--delay",
        type=float,
        default=float(os.getenv("LINKEDIN_EXPIRY_DELAY", "5")),
        help="Seconds to wait between LinkedIn requests (default: 5).",
    )
    return p


def main() -> None:
    args = _build_parser().parse_args()

    log.info("=" * 60)
    log.info(
        "LinkedIn Expiry Checker%s", " [DRY RUN]" if args.dry_run else ""
    )
    log.info(
        "  batch_size=%d  min_age_hours=%d  max_age_days=%d  delay=%.1fs",
        args.batch_size, args.min_age_hours, args.max_age_days, args.delay,
    )
    log.info("=" * 60)

    summary = run_expiry_check(
        batch_size=args.batch_size,
        min_age_hours=args.min_age_hours,
        max_age_days=args.max_age_days,
        request_delay=args.delay,
        dry_run=args.dry_run,
    )

    log.info("=" * 60)
    log.info(
        "Done. stale_auto_expired=%d  checked=%d  active=%d  expired=%d  unknown=%d",
        summary["stale_auto_expired"],
        summary["checked"],
        summary[RESULT_ACTIVE],
        summary[RESULT_EXPIRED],
        summary[RESULT_UNKNOWN],
    )
    log.info("=" * 60)


if __name__ == "__main__":
    main()
