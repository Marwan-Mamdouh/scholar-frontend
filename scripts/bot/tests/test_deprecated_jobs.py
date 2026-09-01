import unittest
import os
import sys
import json
from datetime import UTC, datetime, timedelta

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from models import Job
from db import (
    is_json_db_mode,
    get_json_db_filepath,
    upsert_job,
    purge_jobs_older_than_two_weeks,
    get_jobs_due_for_weekly_check,
    mark_job_taken,
)

class TestDeprecatedJobs(unittest.TestCase):
    def setUp(self):
        os.environ["USE_LOCAL_JSON_DB"] = "true"
        self.test_file = get_json_db_filepath()
        # Backup existing jobs_export.json if it exists
        self.original_data = None
        if os.path.exists(self.test_file):
            with open(self.test_file, "r", encoding="utf-8") as f:
                self.original_data = f.read()

        # Initialize empty test JSON array
        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump([], f)

    def tearDown(self):
        # Restore original jobs_export.json
        if self.original_data is not None:
            with open(self.test_file, "w", encoding="utf-8") as f:
                f.write(self.original_data)

    def test_closed_card_behaviour(self):
        # 1. Scraping a closed job that is NOT in DB -> should NOT be inserted
        closed_new_job = Job(
            title="Closed Frontend Developer",
            company="Acme Corp",
            location="Cairo",
            url="https://linkedin.com/jobs/view/99901",
            source="linkedin",
            is_taken=True,
        )
        job_id, is_new = upsert_job(None, closed_new_job)
        self.assertEqual(job_id, 0)
        self.assertFalse(is_new)

        # 2. Insert an active job first
        active_job = Job(
            title="Active Backend Developer",
            company="Tech Corp",
            location="Remote",
            url="https://linkedin.com/jobs/view/99902",
            source="linkedin",
            is_taken=False,
        )
        inserted_id, is_new = upsert_job(None, active_job)
        self.assertGreater(inserted_id, 0)
        self.assertTrue(is_new)

        # Verify it is in JSON DB with is_taken=False
        with open(self.test_file, "r", encoding="utf-8") as f:
            jobs = json.load(f)
            self.assertEqual(len(jobs), 1)
            self.assertFalse(jobs[0].get("is_taken"))

        # 3. Scrape the same job again, but now it is closed -> should update is_taken=True
        closed_existing_job = Job(
            title="Active Backend Developer",
            company="Tech Corp",
            location="Remote",
            url="https://linkedin.com/jobs/view/99902",
            source="linkedin",
            is_taken=True,
        )
        updated_id, is_new = upsert_job(None, closed_existing_job)
        self.assertEqual(updated_id, inserted_id)
        self.assertFalse(is_new)

        with open(self.test_file, "r", encoding="utf-8") as f:
            jobs = json.load(f)
            self.assertEqual(len(jobs), 1)
            self.assertTrue(jobs[0].get("is_taken"))

    def test_single_check_guarantee(self):
        now = datetime.now(UTC)
        eight_days_ago = (now - timedelta(days=8)).replace(microsecond=0).isoformat().replace("+00:00", "Z")

        test_data = [
            {
                "id": 10,
                "title": "Unchecked 8-day Job",
                "url": "https://example.com/10",
                "content_hash": "hash10",
                "first_seen_at": eight_days_ago,
                "last_seen_at": eight_days_ago,
                "last_checked_at": "",
                "is_taken": False,
            },
            {
                "id": 20,
                "title": "Already Checked 8-day Job",
                "url": "https://example.com/20",
                "content_hash": "hash20",
                "first_seen_at": eight_days_ago,
                "last_seen_at": eight_days_ago,
                "last_checked_at": (now - timedelta(days=1)).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
                "is_taken": False,
            }
        ]

        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f)

        due_jobs = get_jobs_due_for_weekly_check(None, min_age_days=7, max_age_days=14)
        self.assertEqual(len(due_jobs), 1)
        self.assertEqual(due_jobs[0].id, 10)

    def test_two_week_and_checked_purge(self):
        now = datetime.now(UTC)
        recent_date = now.replace(microsecond=0).isoformat().replace("+00:00", "Z")
        old_16d = (now - timedelta(days=16)).replace(microsecond=0).isoformat().replace("+00:00", "Z")
        checked_8d_ago = (now - timedelta(days=8)).replace(microsecond=0).isoformat().replace("+00:00", "Z")
        seen_10d_ago = (now - timedelta(days=10)).replace(microsecond=0).isoformat().replace("+00:00", "Z")

        test_data = [
            {
                "id": 1,
                "title": "Fresh Job",
                "url": "https://example.com/1",
                "content_hash": "hash1",
                "first_seen_at": recent_date,
                "last_seen_at": recent_date,
                "is_taken": False,
            },
            {
                "id": 2,
                "title": "Job older than 14 days",
                "url": "https://example.com/2",
                "content_hash": "hash2",
                "first_seen_at": old_16d,
                "last_seen_at": old_16d,
                "is_taken": True,
            },
            {
                "id": 3,
                "title": "Job checked 8 days ago (reached week 2)",
                "url": "https://example.com/3",
                "content_hash": "hash3",
                "first_seen_at": seen_10d_ago,
                "last_seen_at": seen_10d_ago,
                "last_checked_at": checked_8d_ago,
                "is_taken": False,
            }
        ]

        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f)

        purged_count = purge_jobs_older_than_two_weeks(None, max_age_days=14)
        self.assertEqual(purged_count, 2)

        with open(self.test_file, "r", encoding="utf-8") as f:
            remaining = json.load(f)
            self.assertEqual(len(remaining), 1)
            self.assertEqual(remaining[0]["id"], 1)

    def test_get_linkedin_jobs_to_check_filters_by_age_and_source(self):
        now = datetime.now(UTC)
        eligible_first_seen = (now - timedelta(hours=8)).isoformat()
        too_new_seen = (now - timedelta(hours=1)).isoformat()
        stale_seen = (now - timedelta(days=20)).isoformat()

        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump(
                [
                    {
                        "id": 1,
                        "source": "linkedin",
                        "source_job_id": "111",
                        "title": "Eligible Job",
                        "company": "Acme",
                        "location": "Cairo",
                        "url": "https://linkedin.com/jobs/view/111",
                        "canonical_url": "https://linkedin.com/jobs/view/111",
                        "content_hash": "h1",
                        "send_status": "pending",
                        "first_seen_at": eligible_first_seen,
                        "last_seen_at": eligible_first_seen,
                        "is_taken": False,
                    },
                    {
                        "id": 2,
                        "source": "linkedin",
                        "source_job_id": "222",
                        "title": "Too New",
                        "company": "Acme",
                        "location": "Cairo",
                        "url": "https://linkedin.com/jobs/view/222",
                        "canonical_url": "https://linkedin.com/jobs/view/222",
                        "content_hash": "h2",
                        "send_status": "pending",
                        "first_seen_at": too_new_seen,
                        "last_seen_at": too_new_seen,
                        "is_taken": False,
                    },
                    {
                        "id": 3,
                        "source": "wuzzuf",
                        "source_job_id": "333",
                        "title": "Other Source",
                        "company": "Acme",
                        "location": "Cairo",
                        "url": "https://wuzzuf.net/jobs/333",
                        "canonical_url": "https://wuzzuf.net/jobs/333",
                        "content_hash": "h3",
                        "send_status": "pending",
                        "first_seen_at": eligible_first_seen,
                        "last_seen_at": eligible_first_seen,
                        "is_taken": False,
                    },
                    {
                        "id": 4,
                        "source": "linkedin",
                        "source_job_id": "444",
                        "title": "Stale",
                        "company": "Acme",
                        "location": "Cairo",
                        "url": "https://linkedin.com/jobs/view/444",
                        "canonical_url": "https://linkedin.com/jobs/view/444",
                        "content_hash": "h4",
                        "send_status": "pending",
                        "first_seen_at": stale_seen,
                        "last_seen_at": stale_seen,
                        "is_taken": False,
                    },
                ],
                f,
            )

        jobs = get_linkedin_jobs_to_check(None, limit=10, min_age_hours=6, max_age_days=14)
        self.assertEqual([job.id for job in jobs], [1])

    def test_mark_stale_linkedin_jobs_inactive_and_alias(self):
        now = datetime.now(UTC)
        old_seen = (now - timedelta(days=16)).isoformat()
        recent_seen = (now - timedelta(days=1)).isoformat()

        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump(
                [
                    {
                        "id": 1,
                        "source": "linkedin",
                        "title": "Old LinkedIn Job",
                        "url": "https://linkedin.com/jobs/view/1",
                        "content_hash": "old-linkedin",
                        "first_seen_at": old_seen,
                        "last_seen_at": old_seen,
                        "is_taken": False,
                    },
                    {
                        "id": 2,
                        "source": "wuzzuf",
                        "title": "Old Non LinkedIn Job",
                        "url": "https://wuzzuf.net/jobs/2",
                        "content_hash": "old-wuzzuf",
                        "first_seen_at": old_seen,
                        "last_seen_at": old_seen,
                        "is_taken": False,
                    },
                    {
                        "id": 3,
                        "source": "linkedin",
                        "title": "Recent LinkedIn Job",
                        "url": "https://linkedin.com/jobs/view/3",
                        "content_hash": "recent-linkedin",
                        "first_seen_at": recent_seen,
                        "last_seen_at": recent_seen,
                        "is_taken": False,
                    },
                ],
                f,
            )

        marked = mark_stale_linkedin_jobs_inactive(None, max_age_days=14)
        self.assertEqual(marked, 1)

        mark_job_inactive(None, 3)
        with open(self.test_file, "r", encoding="utf-8") as f:
            rows = {row["id"]: row for row in json.load(f)}

        self.assertTrue(rows[1]["is_taken"])
        self.assertFalse(rows[2]["is_taken"])
        self.assertTrue(rows[3]["is_taken"])

if __name__ == "__main__":
    unittest.main()
