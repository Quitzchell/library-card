from rest_framework import serializers

from ..models import GeneralContent, CarouselImage
from .carousel_image import CarouselImageSerializer

class GeneralContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralContent
        fields = '__all__'

        def get_carousel_images(self, obj):
            images = CarouselImage.objects.filter(is_active=True)
            return CarouselImageSerializer(images, many=True).data