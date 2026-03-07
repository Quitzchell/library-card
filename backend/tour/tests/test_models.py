from datetime import date

from django.test import TestCase

from tour.models import TourDate, Venue
from tests.helpers import create_venue, create_tour_date


class VenueTests(TestCase):
    def test_str(self):
        venue = create_venue(name="Paradiso", city="Amsterdam")
        self.assertEqual(str(venue), "Paradiso Amsterdam")


class TourDateTests(TestCase):
    def test_str_with_venue(self):
        venue = create_venue(name="EKKO", city="Utrecht")
        td = create_tour_date(venue=venue, date=date(2024, 5, 1))
        self.assertEqual(str(td), "2024-05-01 EKKO")

    def test_venue_set_null_on_delete(self):
        venue = create_venue()
        td = create_tour_date(venue=venue)
        venue.delete()
        td.refresh_from_db()
        self.assertIsNone(td.venue)

    def test_sold_out_default_false(self):
        td = create_tour_date()
        self.assertFalse(td.sold_out)

    def test_ticket_url_nullable(self):
        td = create_tour_date(ticket_url=None)
        self.assertIsNone(td.ticket_url)
