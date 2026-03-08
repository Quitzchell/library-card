from io import StringIO

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase, override_settings

from music.models import Release
from video.models import Video
from team.models import Team
from tour.models import TourDate

User = get_user_model()


class SeedSuperuserCommandTests(TestCase):
    @override_settings(DEBUG=False)
    def test_refuses_in_production(self):
        out = StringIO()
        call_command("seed_superuser", stdout=out)
        self.assertIn("DEBUG", out.getvalue())
        self.assertEqual(User.objects.count(), 0)

    @override_settings(DEBUG=True)
    def test_creates_superuser(self):
        out = StringIO()
        call_command("seed_superuser", stdout=out)
        self.assertTrue(User.objects.filter(username="admin").exists())

    @override_settings(DEBUG=True)
    def test_idempotent(self):
        call_command("seed_superuser", stdout=StringIO())
        call_command("seed_superuser", stdout=StringIO())
        self.assertEqual(
            User.objects.filter(username="admin").count(), 1
        )


class SeedCommandTests(TestCase):
    @override_settings(DEBUG=False)
    def test_refuses_in_production(self):
        out = StringIO()
        call_command("seed", stdout=out)
        self.assertIn("DEBUG", out.getvalue())

    @override_settings(DEBUG=True)
    def test_seeds_all_data(self):
        out = StringIO()
        call_command("seed", stdout=out)
        self.assertGreater(Release.objects.count(), 0)
        self.assertGreater(Video.objects.count(), 0)
        self.assertGreater(Team.objects.count(), 0)
        self.assertGreater(TourDate.objects.count(), 0)
