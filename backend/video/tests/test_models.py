from django.test import TestCase

from video.models import Video, VideoCategory
from tests.helpers import create_video


class VideoTests(TestCase):
    def test_save_extracts_id_from_watch_url(self):
        video = create_video(
            video_id="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        )
        self.assertEqual(video.video_id, "dQw4w9WgXcQ")

    def test_save_extracts_id_from_short_url(self):
        video = create_video(video_id="https://youtu.be/dQw4w9WgXcQ")
        self.assertEqual(video.video_id, "dQw4w9WgXcQ")

    def test_plain_id_unchanged(self):
        video = create_video(video_id="dQw4w9WgXcQ")
        self.assertEqual(video.video_id, "dQw4w9WgXcQ")
