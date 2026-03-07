from django.test import TestCase

from team.models import Team, Member
from tests.helpers import create_member, create_team


class MemberTests(TestCase):
    def test_full_name(self):
        member = create_member(name="John", surname="Doe")
        self.assertEqual(member.full_name, "John Doe")

    def test_str_is_full_name(self):
        member = create_member(name="Jane", surname="Smith")
        self.assertEqual(str(member), "Jane Smith")


class TeamTests(TestCase):
    def test_str_is_category(self):
        team = create_team(category="booking")
        self.assertEqual(str(team), "booking")

    def test_m2m_members(self):
        m1 = create_member(name="A", email="a@test.com")
        m2 = create_member(name="B", email="b@test.com")
        team = create_team(members=[m1, m2])
        self.assertEqual(team.members.count(), 2)

    def test_member_belongs_to_multiple_teams(self):
        member = create_member()
        t1 = create_team(category="booking", members=[member])
        t2 = create_team(category="management", members=[member])
        self.assertEqual(member.teams.count(), 2)
