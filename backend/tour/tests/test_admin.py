from django.test import SimpleTestCase

from tour.admin import TourDateAdmin


class TourDateAdminTests(SimpleTestCase):
    def test_search_fields(self):
        self.assertEqual(
            TourDateAdmin.search_fields, ["venue__name", "venue__city"]
        )

    def test_list_filter(self):
        self.assertIn("sold_out", TourDateAdmin.list_filter)
        self.assertIn("date", TourDateAdmin.list_filter)
