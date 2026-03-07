from django.test import TestCase

from music.models import Release, StreamingService, StreamingServiceName, Store
from tests.helpers import create_release, create_streaming_service, create_store


class ReleaseTests(TestCase):
    def test_str(self):
        release = create_release(title="My Album")
        self.assertEqual(str(release), "My Album")

    def test_str_store(self):
        release = create_release()
        store = create_store(release=release, name="Bandcamp")
        self.assertEqual(str(store), "Bandcamp")


class StreamingServiceTests(TestCase):
    def test_cascade_delete_with_release(self):
        release = create_release()
        create_streaming_service(release=release)
        self.assertEqual(StreamingService.objects.count(), 1)
        release.delete()
        self.assertEqual(StreamingService.objects.count(), 0)

    def test_choices_valid(self):
        release = create_release()
        svc = create_streaming_service(
            release=release, name=StreamingServiceName.APPLE_MUSIC
        )
        self.assertEqual(svc.name, "apple_music")


class StoreTests(TestCase):
    def test_cascade_delete_with_release(self):
        release = create_release()
        create_store(release=release)
        self.assertEqual(Store.objects.count(), 1)
        release.delete()
        self.assertEqual(Store.objects.count(), 0)
