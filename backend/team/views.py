from rest_framework import viewsets

from .models import Team
from .serializers import TeamSerializer


class TeamViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Team.objects.prefetch_related("members").all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset
