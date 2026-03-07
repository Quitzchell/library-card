from django.test import TestCase

from tour.serializers import TourDateSerializer
from tests.helpers import create_venue, create_tour_date


class TourDateSerializerTests(TestCase):
    def test_nested_venue(self):
        venue = create_venue(name="Paradiso", city="Amsterdam")
        td = create_tour_date(venue=venue)
        data = TourDateSerializer(td).data
        self.assertEqual(data["venue"]["name"], "Paradiso")
        self.assertEqual(data["venue"]["city"], "Amsterdam")

    def test_null_venue(self):
        td = create_tour_date()
        td.venue = None
        td.save()
        data = TourDateSerializer(td).data
        self.assertIsNone(data["venue"])
