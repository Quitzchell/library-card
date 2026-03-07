from datetime import date

from rest_framework.test import APITestCase

from music.models import StreamingServiceName
from tests.helpers import create_release, create_streaming_service


class ReleaseViewSetTests(APITestCase):
    def test_list_ordered_by_release_date_desc(self):
        create_release(title="Old", release_date=date(2020, 1, 1))
        create_release(title="New", release_date=date(2024, 6, 1))
        response = self.client.get("/api/music/?per_page=10")
        self.assertEqual(response.status_code, 200)
        titles = [r["title"] for r in response.data["results"]]
        self.assertEqual(titles, ["New", "Old"])

    def test_pagination_with_per_page(self):
        for i in range(5):
            create_release(
                title=f"Release {i}",
                release_date=date(2024, 1, i + 1),
            )
        response = self.client.get("/api/music/?per_page=2")
        self.assertEqual(len(response.data["results"]), 2)
        self.assertEqual(response.data["count"], 5)

    def test_nested_services_in_response(self):
        release = create_release()
        create_streaming_service(
            release=release, name=StreamingServiceName.SPOTIFY
        )
        response = self.client.get("/api/music/?per_page=10")
        first = response.data["results"][0]
        self.assertEqual(len(first["services"]), 1)
        self.assertEqual(first["services"][0]["name"], "spotify")

    def test_response_has_pagination_links(self):
        create_release()
        response = self.client.get("/api/music/?per_page=10")
        self.assertIn("links", response.data)
        self.assertIn("count", response.data)
