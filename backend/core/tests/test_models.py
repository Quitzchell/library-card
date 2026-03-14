from django.test import TestCase

from core.models import GeneralContent, CarouselImage, SocialMediaLink
from core.models.social_media_link import Platform
from tests.helpers import create_test_image, create_social_media_link


class GeneralContentTests(TestCase):
    def test_singleton_always_pk_1(self):
        obj = GeneralContent.objects.create(about_us_title="Hello")
        self.assertEqual(obj.pk, 1)

    def test_second_save_overwrites_pk_1(self):
        GeneralContent.objects.create(about_us_title="First")
        obj = GeneralContent(about_us_title="Second")
        obj.save()
        self.assertEqual(obj.pk, 1)
        self.assertEqual(GeneralContent.objects.count(), 1)
        self.assertEqual(GeneralContent.objects.first().about_us_title, "Second")

    def test_load_creates_if_not_exists(self):
        self.assertEqual(GeneralContent.objects.count(), 0)
        obj = GeneralContent.load()
        self.assertEqual(obj.pk, 1)
        self.assertEqual(GeneralContent.objects.count(), 1)

    def test_load_returns_existing(self):
        GeneralContent.objects.create(about_us_title="Existing")
        obj = GeneralContent.load()
        self.assertEqual(obj.about_us_title, "Existing")

    def test_str(self):
        obj = GeneralContent.load()
        self.assertEqual(str(obj), "General Content")


class CarouselImageTests(TestCase):
    def test_ordering_by_order_field(self):
        img1 = CarouselImage.objects.create(
            name="B", order=2, image=create_test_image(name="b.png")
        )
        img2 = CarouselImage.objects.create(
            name="A", order=1, image=create_test_image(name="a.png")
        )
        images = list(CarouselImage.objects.all())
        self.assertEqual(images[0].pk, img2.pk)
        self.assertEqual(images[1].pk, img1.pk)

    def test_is_active_default_true(self):
        img = CarouselImage.objects.create(
            name="Test", image=create_test_image()
        )
        self.assertTrue(img.is_active)

    def test_image_optimized_to_webp(self):
        img = CarouselImage.objects.create(
            name="Test", image=create_test_image(name="photo.png", fmt="PNG")
        )
        self.assertTrue(img.image.name.endswith(".webp"))

    def test_delete_cleans_up_image(self):
        img = CarouselImage.objects.create(
            name="Test", image=create_test_image()
        )
        storage = img.image.storage
        image_name = img.image.name
        self.assertTrue(storage.exists(image_name))
        img.delete()
        self.assertFalse(storage.exists(image_name))


class SocialMediaLinkTests(TestCase):
    def test_ordering_by_order_field(self):
        content = GeneralContent.load()
        link1 = create_social_media_link(
            content=content, platform=Platform.FACEBOOK, order=2
        )
        link2 = create_social_media_link(
            content=content, platform=Platform.INSTAGRAM, order=1
        )
        links = list(SocialMediaLink.objects.all())
        self.assertEqual(links[0].pk, link2.pk)
        self.assertEqual(links[1].pk, link1.pk)

    def test_str(self):
        link = create_social_media_link(
            platform=Platform.INSTAGRAM, url="https://instagram.com/test"
        )
        self.assertEqual(str(link), "Instagram (https://instagram.com/test)")

    def test_fk_to_general_content(self):
        content = GeneralContent.load()
        link = create_social_media_link(content=content)
        self.assertEqual(link.content, content)
        self.assertIn(link, content.social_media_links.all())

    def test_cascade_delete(self):
        content = GeneralContent.load()
        create_social_media_link(content=content)
        self.assertEqual(SocialMediaLink.objects.count(), 1)
        content.delete()
        self.assertEqual(SocialMediaLink.objects.count(), 0)
