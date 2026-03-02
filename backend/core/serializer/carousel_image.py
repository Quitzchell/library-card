from rest_framework import serializers

from ..models import CarouselImage


class CarouselImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = ["id", "image", "alt", "order", "is_active"]
