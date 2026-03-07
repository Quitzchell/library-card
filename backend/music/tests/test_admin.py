from django.test import SimpleTestCase

from music.admin import ReleaseAdmin, StreamingServiceInline, StoreInline


class ReleaseAdminTests(SimpleTestCase):
    def test_has_streaming_service_inline(self):
        self.assertIn(StreamingServiceInline, ReleaseAdmin.inlines)

    def test_has_store_inline(self):
        self.assertIn(StoreInline, ReleaseAdmin.inlines)
