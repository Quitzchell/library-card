from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import AboutView, CarouselImageViewSet, GeneralContentView

router = DefaultRouter()
router.register(r'carousel-image', CarouselImageViewSet, basename='carousel-image')

urlpatterns = [
    path('', include(router.urls)),
    path('general-content/', GeneralContentView.as_view(), name='general-content'),
    path('about/', AboutView.as_view(), name='about'),
]
