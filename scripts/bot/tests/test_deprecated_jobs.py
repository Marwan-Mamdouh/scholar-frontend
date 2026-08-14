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

    def test_two_week_purge(self):
        now = datetime.now(UTC)
        recent_date = now.isoformat()
        old_date = (now - timedelta(days=16)).isoformat() # 16 days old (>= 14 days)

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
                "title": "Ancient Deprecated Job",
                "url": "https://example.com/2",
                "content_hash": "hash2",
                "first_seen_at": old_date,
                "last_seen_at": old_date,
                "is_taken": True,
            }
        ]

        with open(self.test_file, "w", encoding="utf-8") as f:
            json.dump(test_data, f)

        purged_count = purge_jobs_older_than_two_weeks(None, max_age_days=14)
        self.assertEqual(purged_count, 1)

        with open(self.test_file, "r", encoding="utf-8") as f:
            remaining = json.load(f)
            self.assertEqual(len(remaining), 1)
            self.assertEqual(remaining[0]["id"], 1)

if __name__ == "__main__":
    unittest.main()
