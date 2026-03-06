from django.db import models

from core.image_utils import (
    OptimizedImageMixin,
    hashed_upload_path,
    validate_image_dimensions,
    validate_image_file_size,
    validate_image_format,
)


class CarouselImage(OptimizedImageMixin):
    name = models.TextField(max_length=55)
    image = models.ImageField(
        upload_to=hashed_upload_path,
        validators=[
            validate_image_file_size,
            validate_image_dimensions,
            validate_image_format,
        ],
    )
    alt = models.TextField(max_length=55, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.alt
