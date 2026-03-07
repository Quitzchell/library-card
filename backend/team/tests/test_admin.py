from django.test import SimpleTestCase

from team.admin import TeamMemberAdmin


class TeamMemberAdminTests(SimpleTestCase):
    def test_search_fields(self):
        self.assertEqual(
            TeamMemberAdmin.search_fields, ["name", "surname", "email"]
        )

    def test_list_display(self):
        self.assertIn("full_name", TeamMemberAdmin.list_display)
        self.assertIn("organization", TeamMemberAdmin.list_display)
