from django.db import models


class CarouselImage(models.Model):
    name = models.TextField(max_length=55)
    image = models.ImageField(upload_to='carousel_images/')
    alt = models.TextField(max_length=55, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.alt
