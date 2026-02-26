from rest_framework import viewsets

from .models import Video
from .serializers import VideoSerializer

class VideoListView(viewsets.ReadOnlyModelViewSet):
    serializer_class = VideoSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Video.objects.all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        take = self.request.query_params.get("take")
        if take:
            queryset = queryset[:int(take)]
        return queryset
