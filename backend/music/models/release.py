from django.db import models

from core.image_utils import (
    OptimizedImageMixin,
    hashed_upload_path,
    validate_image_file_size,
    validate_image_dimensions,
    validate_image_format,
)


class Release(OptimizedImageMixin):
    image_field_name = "cover_image"

    title = models.CharField(max_length=255)
    release_date = models.DateField()
    cover_image = models.ImageField(
        upload_to=hashed_upload_path,
        validators=[validate_image_file_size, validate_image_dimensions, validate_image_format],
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title