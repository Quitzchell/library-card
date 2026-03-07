from unittest.mock import MagicMock

from django.core.exceptions import ValidationError
from django.test import SimpleTestCase

from core.image_utils import (
    MAX_FILE_SIZE,
    validate_image_file_size,
    validate_image_dimensions,
    validate_image_format,
    hashed_upload_path,
)
from tests.helpers import create_test_image


class ValidateImageFileSizeTests(SimpleTestCase):
    def test_valid_size_passes(self):
        image = create_test_image()
        validate_image_file_size(image)

    def test_oversized_raises(self):
        image = create_test_image()
        image.size = MAX_FILE_SIZE + 1
        with self.assertRaises(ValidationError):
            validate_image_file_size(image)

    def test_exact_limit_passes(self):
        image = create_test_image()
        image.size = MAX_FILE_SIZE
        validate_image_file_size(image)


class ValidateImageDimensionsTests(SimpleTestCase):
    def test_valid_dimensions_pass(self):
        image = create_test_image(size=(100, 100))
        validate_image_dimensions(image)

    def test_oversized_dimensions_raise(self):
        image = create_test_image(size=(7000, 7000))
        with self.assertRaises(ValidationError):
            validate_image_dimensions(image)


class ValidateImageFormatTests(SimpleTestCase):
    def test_png_valid(self):
        image = create_test_image(fmt="PNG")
        validate_image_format(image)

    def test_bmp_invalid(self):
        image = create_test_image(fmt="BMP")
        with self.assertRaises(ValidationError):
            validate_image_format(image)


class HashedUploadPathTests(SimpleTestCase):
    def test_returns_webp_extension(self):
        instance = MagicMock()
        instance.__class__.__name__ = "CarouselImage"
        path = hashed_upload_path(instance, "photo.png")
        self.assertTrue(path.endswith(".webp"))

    def test_includes_model_name(self):
        instance = MagicMock()
        instance.__class__.__name__ = "CarouselImage"
        path = hashed_upload_path(instance, "photo.png")
        self.assertTrue(path.startswith("carouselimage/"))

    def test_includes_original_stem(self):
        instance = MagicMock()
        instance.__class__.__name__ = "CarouselImage"
        path = hashed_upload_path(instance, "my_photo.png")
        self.assertIn("my_photo", path)
