from io import StringIO

from django.core.management import call_command
from django.test import TestCase, override_settings

from tour.models import TourDate


class SeedTourCommandTests(TestCase):
    @override_settings(DEBUG=True)
    def test_creates_tour_dates(self):
        call_command("seed_tour", stdout=StringIO())
        self.assertGreater(TourDate.objects.count(), 0)
