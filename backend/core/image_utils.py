import io
import uuid

from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from django.db import models
from PIL import Image


MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
MAX_DIMENSION = 6000
OPTIMIZE_MAX_DIMENSION = 1920
ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}


def validate_image_file_size(image):
    if image.size > MAX_FILE_SIZE:
        raise ValidationError(
            f"Image file size must be under 5MB. Got {image.size / (1024 * 1024):.1f}MB."
        )


def validate_image_dimensions(image):
    img = Image.open(image)
    width, height = img.size
    image.seek(0)
    if width > MAX_DIMENSION or height > MAX_DIMENSION:
        raise ValidationError(
            f"Image dimensions must be at most {MAX_DIMENSION}x{MAX_DIMENSION}. "
            f"Got {width}x{height}."
        )


def validate_image_format(image):
    img = Image.open(image)
    image.seek(0)
    if img.format not in ALLOWED_FORMATS:
        raise ValidationError(
            f"Unsupported image format '{img.format}'. "
            f"Allowed formats: {', '.join(sorted(ALLOWED_FORMATS))}."
        )


def hashed_upload_path(instance, filename):
    from pathlib import PurePosixPath

    model_name = instance.__class__.__name__.lower()
    stem = PurePosixPath(filename).stem
    short_uuid = uuid.uuid4().hex[:12]
    return f"{model_name}/{short_uuid}_{stem}.webp"


class OptimizedImageMixin(models.Model):
    image_field_name = "image"

    class Meta:
        abstract = True

    def _get_image_field(self):
        return getattr(self, self.image_field_name)

    def _set_image_field(self, value):
        setattr(self, self.image_field_name, value)

    def save(self, *args, **kwargs):
        old_image_name = None
        image_changed = True
        image = self._get_image_field()

        if self.pk:
            try:
                old_instance = self.__class__.objects.get(pk=self.pk)
                old_image_name = getattr(old_instance, self.image_field_name).name
                if old_image_name == image.name:
                    image_changed = False
            except self.__class__.DoesNotExist:
                pass

        if image_changed and image and getattr(image, '_committed', True) is False:
            self._optimize_image()

        super().save(*args, **kwargs)

        if old_image_name and old_image_name != self._get_image_field().name:
            image.storage.delete(old_image_name)

    def delete(self, *args, **kwargs):
        image = self._get_image_field()
        image_name = image.name if image else None
        super().delete(*args, **kwargs)
        if image_name:
            image.storage.delete(image_name)

    def _optimize_image(self):
        image = self._get_image_field()
        img = Image.open(image)
        icc_profile = img.info.get("icc_profile")
        img.thumbnail((OPTIMIZE_MAX_DIMENSION, OPTIMIZE_MAX_DIMENSION), Image.LANCZOS)

        if img.mode == "RGBA":
            background = Image.new("RGB", img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode != "RGB":
            img = img.convert("RGB")

        buffer = io.BytesIO()
        save_kwargs = {"format": "WEBP", "quality": 85}
        if icc_profile:
            save_kwargs["icc_profile"] = icc_profile
        img.save(buffer, **save_kwargs)

        from pathlib import PurePosixPath

        stem = PurePosixPath(image.name).stem
        self._set_image_field(ContentFile(buffer.getvalue(), name=f"{stem}.webp"))
