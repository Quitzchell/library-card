from io import StringIO

from django.core.management import call_command
from django.test import TestCase, override_settings

from video.models import Video


class SeedVideosCommandTests(TestCase):
    @override_settings(DEBUG=True)
    def test_creates_videos(self):
        call_command("seed_videos", stdout=StringIO())
        self.assertGreater(Video.objects.count(), 0)
