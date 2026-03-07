from datetime import date

from rest_framework.test import APITestCase

from tests.helpers import create_venue, create_tour_date


class TourDateViewSetTests(APITestCase):
    def test_list_ordered_by_date_desc(self):
        v = create_venue()
        create_tour_date(venue=v, date=date(2024, 1, 1))
        create_tour_date(venue=v, date=date(2024, 6, 1))
        response = self.client.get("/api/tour/?per_page=10")
        dates = [r["date"] for r in response.data["results"]]
        self.assertEqual(dates, ["2024-06-01", "2024-01-01"])

    def test_upcoming_returns_future_dates(self):
        v = create_venue()
        create_tour_date(venue=v, date=date(2099, 1, 1))
        create_tour_date(venue=v, date=date(2000, 1, 1))
        response = self.client.get("/api/tour/upcoming/?per_page=100")
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(
            response.data["results"][0]["date"], "2099-01-01"
        )

    def test_past_returns_old_dates(self):
        v = create_venue()
        create_tour_date(venue=v, date=date(2099, 1, 1))
        create_tour_date(venue=v, date=date(2000, 1, 1))
        response = self.client.get("/api/tour/past/?per_page=100")
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(
            response.data["results"][0]["date"], "2000-01-01"
        )

    def test_pagination_with_per_page(self):
        v = create_venue()
        for i in range(5):
            create_tour_date(venue=v, date=date(2024, 1, i + 1))
        response = self.client.get("/api/tour/?per_page=2")
        self.assertEqual(len(response.data["results"]), 2)
        self.assertEqual(response.data["count"], 5)

    def test_nested_venue_in_response(self):
        venue = create_venue(name="Paradiso", city="Amsterdam")
        create_tour_date(venue=venue)
        response = self.client.get("/api/tour/?per_page=10")
        venue_data = response.data["results"][0]["venue"]
        self.assertEqual(venue_data["name"], "Paradiso")
        self.assertEqual(venue_data["city"], "Amsterdam")
