from rest_framework import pagination, viewsets
from rest_framework.response import Response

from .models import Release
from .serializers import ReleaseSerializer


class CustomPagination(pagination.PageNumberPagination):
    page_size_query_param = 'per_page'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link(),
            },
            'count': self.page.paginator.count,
            'results': data
        })


class ReleaseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Release.objects.all().order_by('-release_date')
    pagination_class = CustomPagination
    serializer_class = ReleaseSerializer

