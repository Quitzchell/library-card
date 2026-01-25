from decouple import config
from rest_framework import serializers

from ..models import Release
from .streaming_service import StreamingServiceSerializer

PUBLIC_URL = str(config("PUBLIC_URL", default="http://localhost:8000")).rstrip("/")


class ReleaseSerializer(serializers.ModelSerializer):
    """
    Serializer for Release model.
    Includes nested StreamingService data.
    """

    services = StreamingServiceSerializer(many=True)
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = Release
        fields = [
            "id",
            "title",
            "release_date",
            "cover_image",
            "services",
        ]

    def get_cover_image(self, obj):
        if obj.cover_image:
            return f"{PUBLIC_URL}{obj.cover_image.url}"
        return None
