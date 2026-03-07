from unittest.mock import PropertyMock, patch

from django.test import TestCase, override_settings

from music.models import Release, StreamingServiceName
from music.serializers import ReleaseSerializer
from tests.helpers import create_release, create_streaming_service


class ReleaseSerializerTests(TestCase):
    def test_nested_services(self):
        release = create_release()
        create_streaming_service(
            release=release, name=StreamingServiceName.SPOTIFY
        )
        data = ReleaseSerializer(release).data
        self.assertEqual(len(data["services"]), 1)
        self.assertEqual(data["services"][0]["name"], "spotify")

    @override_settings(PUBLIC_URL="http://localhost:8000")
    def test_cover_image_local_url(self):
        release = create_release(cover_image="release-covers/test.jpg")
        data = ReleaseSerializer(release).data
        self.assertTrue(
            data["cover_image"].startswith("http://localhost:8000")
        )

    def test_cover_image_http_url_not_prefixed(self):
        release = create_release()
        serializer = ReleaseSerializer(release)
        with patch.object(
            type(release.cover_image), "url",
            new_callable=PropertyMock,
            return_value="https://cdn.example.com/cover.jpg",
        ):
            data = serializer.data
        self.assertEqual(
            data["cover_image"], "https://cdn.example.com/cover.jpg"
        )
