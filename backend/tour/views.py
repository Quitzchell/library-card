from rest_framework import pagination, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import TourDate, Venue
from .serializers import TourDateSerializer


class customPagination(pagination.PageNumberPagination):
    page_size_query_param = "per_page"
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response(
            {
                "links": {
                    "next": self.get_next_link(),
                    "previous": self.get_previous_link(),
                },
                "count": self.page.paginator.count,
                "results": data,
            }
        )


class TourDateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourDate.objects.all().order_by("-date")
    pagination_class = customPagination
    serializer_class = TourDateSerializer

    @action(detail=False, methods=["get"])
    def upcoming(self, request):
        today = timezone.now().date()
        upcoming_dates = TourDate.objects.filter(date__gte=today).order_by("date")
        page = self.paginate_queryset(upcoming_dates)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(upcoming_dates, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def past(self, request):
        today = timezone.now().date()
        past_dates = TourDate.objects.filter(date__lt=today).order_by("-date")
        page = self.paginate_queryset(past_dates)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(past_dates, many=True)
        return Response(serializer.data)
