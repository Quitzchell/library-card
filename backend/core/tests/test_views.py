from rest_framework.test import APITestCase

from core.models import CarouselImage, GeneralContent
from tests.helpers import create_test_image


class CarouselImageViewSetTests(APITestCase):
    def test_list_only_active(self):
        CarouselImage.objects.create(
            name="Active", order=1, is_active=True,
            image=create_test_image(name="a.png"),
        )
        CarouselImage.objects.create(
            name="Inactive", order=2, is_active=False,
            image=create_test_image(name="b.png"),
        )
        response = self.client.get("/api/carousel-image/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertTrue(response.data[0]["is_active"])

    def test_ordering_by_order_field(self):
        CarouselImage.objects.create(
            name="Second", order=2, image=create_test_image(name="2.png")
        )
        CarouselImage.objects.create(
            name="First", order=1, image=create_test_image(name="1.png")
        )
        response = self.client.get("/api/carousel-image/")
        self.assertEqual(response.data[0]["order"], 1)
        self.assertEqual(response.data[1]["order"], 2)

    def test_no_pagination(self):
        response = self.client.get("/api/carousel-image/")
        self.assertIsInstance(response.data, list)


class AboutViewTests(APITestCase):
    def test_auto_creates_content(self):
        self.assertEqual(GeneralContent.objects.count(), 0)
        response = self.client.get("/api/about/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(GeneralContent.objects.count(), 1)

    def test_returns_mapped_fields(self):
        GeneralContent.objects.create(
            about_us_title="Title", about_us_content="Content"
        )
        response = self.client.get("/api/about/")
        self.assertEqual(response.data["title"], "Title")
        self.assertEqual(response.data["content"], "Content")


class GeneralContentViewTests(APITestCase):
    def test_returns_all_fields(self):
        GeneralContent.objects.create(about_us_title="Hi")
        response = self.client.get("/api/general-content/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("about_us_title", response.data)
