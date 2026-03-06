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
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        old_image_name = None
        image_changed = True

        if self.pk:
            try:
                old_instance = self.__class__.objects.get(pk=self.pk)
                old_image_name = old_instance.image.name
                if old_image_name == self.image.name:
                    image_changed = False
            except self.__class__.DoesNotExist:
                pass

        if image_changed and self.image:
            self._optimize_image()

        super().save(*args, **kwargs)

        if old_image_name and old_image_name != self.image.name:
            self.image.storage.delete(old_image_name)

    def delete(self, *args, **kwargs):
        image_name = self.image.name if self.image else None
        super().delete(*args, **kwargs)
        if image_name:
            self.image.storage.delete(image_name)

    def _optimize_image(self):
        img = Image.open(self.image)
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

        stem = PurePosixPath(self.image.name).stem
        self.image = ContentFile(buffer.getvalue(), name=f"{stem}.webp")
