from io import StringIO

from django.core.management import call_command
from django.test import TestCase, override_settings

from team.models import Team


class SeedTeamCommandTests(TestCase):
    @override_settings(DEBUG=True)
    def test_creates_teams(self):
        call_command("seed_team", stdout=StringIO())
        self.assertGreater(Team.objects.count(), 0)
