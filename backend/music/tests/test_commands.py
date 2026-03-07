from io import StringIO

from django.core.management import call_command
from django.test import TestCase, override_settings

from music.models import Release


class SeedReleasesCommandTests(TestCase):
    @override_settings(DEBUG=True)
    def test_creates_releases(self):
        call_command("seed_releases", stdout=StringIO())
        self.assertGreater(Release.objects.count(), 0)
