from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import VideoListView

router = DefaultRouter()
router.register(r'', VideoListView, basename='video')
urlpatterns = [
    path('', include(router.urls)),
]