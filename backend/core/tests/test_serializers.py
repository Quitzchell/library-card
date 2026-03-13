from unittest.mock import PropertyMock, patch

from django.test import TestCase, override_settings

from core.models import GeneralContent, CarouselImage
from core.models.social_media_link import Platform
from core.serializer.about import AboutSerializer
from core.serializer.carousel_image import CarouselImageSerializer
from core.serializer.social_media import SocialMediaLinkSerializer
from tests.helpers import create_test_image, create_social_media_link


class AboutSerializerTests(TestCase):
    def test_field_mapping(self):
        GeneralContent.objects.create(
            about_us_title="Our Story", about_us_content="<p>Hello</p>"
        )
        obj = GeneralContent.load()
        data = AboutSerializer(obj).data
        self.assertEqual(data["title"], "Our Story")
        self.assertEqual(data["content"], "<p>Hello</p>")

    def test_fields_limited(self):
        obj = GeneralContent.load()
        data = AboutSerializer(obj).data
        self.assertEqual(set(data.keys()), {"title", "content"})


class CarouselImageSerializerTests(TestCase):
    @override_settings(PUBLIC_URL="http://localhost:8000")
    def test_local_image_url_prefixed(self):
        img = CarouselImage.objects.create(
            name="Test", image=create_test_image()
        )
        data = CarouselImageSerializer(img).data
        self.assertTrue(data["image"].startswith("http://localhost:8000"))

    def test_http_url_not_prefixed(self):
        """When image.url already starts with http, it's returned as-is."""
        img = CarouselImage.objects.create(
            name="Test", image=create_test_image()
        )
        serializer = CarouselImageSerializer(img)
        with patch.object(
            type(img.image), "url",
            new_callable=PropertyMock,
            return_value="https://cdn.example.com/photo.webp",
        ):
            data = serializer.data
        self.assertEqual(data["image"], "https://cdn.example.com/photo.webp")


class SocialMediaLinkSerializerTests(TestCase):
    def test_fields(self):
        link = create_social_media_link(
            platform=Platform.INSTAGRAM,
            url="https://instagram.com/test",
        )
        data = SocialMediaLinkSerializer(link).data
        self.assertEqual(set(data.keys()), {"platform", "url"})
        self.assertEqual(data["platform"], "instagram")
        self.assertEqual(data["url"], "https://instagram.com/test")

    def test_many_serialization(self):
        content = GeneralContent.load()
        create_social_media_link(
            content=content, platform=Platform.INSTAGRAM, order=1
        )
        create_social_media_link(
            content=content, platform=Platform.FACEBOOK, order=2,
            url="https://facebook.com/test",
        )
        links = content.social_media_links.all()
        data = SocialMediaLinkSerializer(links, many=True).data
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]["platform"], "instagram")
        self.assertEqual(data[1]["platform"], "facebook")
