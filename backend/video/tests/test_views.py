from rest_framework.test import APITestCase

from video.models import VideoCategory
from tests.helpers import create_video


class VideoListViewTests(APITestCase):
    def test_list_all(self):
        create_video(title="V1", video_id="aaaaaaaaaaa")
        create_video(title="V2", video_id="bbbbbbbbbbb")
        response = self.client.get("/api/video/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

    def test_filter_by_category(self):
        create_video(category=VideoCategory.LIVE, video_id="aaaaaaaaaaa")
        create_video(category=VideoCategory.PRESS, video_id="bbbbbbbbbbb")
        response = self.client.get("/api/video/?category=live")
        self.assertEqual(len(response.data), 1)

    def test_take_limits_results(self):
        for i in range(5):
            create_video(title=f"V{i}", video_id=f"vid{i:07d}aaaa")
        response = self.client.get("/api/video/?take=2")
        self.assertEqual(len(response.data), 2)

    def test_no_pagination(self):
        create_video()
        response = self.client.get("/api/video/")
        self.assertIsInstance(response.data, list)
