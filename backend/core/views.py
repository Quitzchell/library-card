from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CarouselImage, GeneralContent
from .serializer.carousel_image import CarouselImageSerializer
from .serializer.general_content import GeneralContentSerializer


class GeneralContentView(APIView):
    def get(self, request):
        content = GeneralContent.load()
        serializer = GeneralContentSerializer(content)
        return Response(serializer.data)


class CarouselImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CarouselImage.objects.filter(is_active=True)
    serializer_class = CarouselImageSerializer
    pagination_class = None
