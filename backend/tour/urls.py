from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import TourDateViewSet

router = DefaultRouter()
router.register(r'', TourDateViewSet, basename='tour')

urlpatterns = [
  path('', include(router.urls))
]