from django.test import TestCase

from team.serializers import TeamSerializer
from tests.helpers import create_member, create_team


class TeamSerializerTests(TestCase):
    def test_nested_members(self):
        m1 = create_member(name="A", email="a@test.com")
        m2 = create_member(name="B", email="b@test.com")
        team = create_team(members=[m1, m2])
        data = TeamSerializer(team).data
        self.assertEqual(len(data["members"]), 2)

    def test_member_fields(self):
        member = create_member()
        team = create_team(members=[member])
        data = TeamSerializer(team).data
        member_data = data["members"][0]
        self.assertIn("name", member_data)
        self.assertIn("surname", member_data)
        self.assertIn("region", member_data)
        self.assertIn("email", member_data)
