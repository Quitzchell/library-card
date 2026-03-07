from rest_framework.test import APITestCase

from tests.helpers import create_member, create_team


class TeamViewSetTests(APITestCase):
    def test_list_all(self):
        create_team(category="booking")
        create_team(category="management")
        response = self.client.get("/api/team/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_category(self):
        create_team(category="booking")
        create_team(category="management")
        response = self.client.get("/api/team/?category=booking")
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["category"], "booking")

    def test_nested_members_in_response(self):
        member = create_member()
        create_team(category="booking", members=[member])
        response = self.client.get("/api/team/")
        self.assertEqual(len(response.data[0]["members"]), 1)
        self.assertEqual(
            response.data[0]["members"][0]["name"], member.name
        )
