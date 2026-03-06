from django.conf import settings
from rest_framework import serializers

from ..models import CarouselImage


class CarouselImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarouselImage
        fields = ["id", "image", "alt", "order", "is_active"]

    def get_image(self, obj):
        if obj.image:
            return f"{settings.PUBLIC_URL}{obj.image.url}"
        return None
