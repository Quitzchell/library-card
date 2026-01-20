from .streaming_service import StreamingServiceSerializer
from rest_framework import serializers
from ..models import Release, StreamingService


class ReleaseSerializer(serializers.ModelSerializer):
    """
    Serializer for Release model.
    Includes nested StreamingService data.
    """

    services = StreamingServiceSerializer()

    class Meta:
        model = Release
        fields = [
            "id",
            "title",
            "release_date",
            "cover_image",
            "services",
        ]


class ReleaseWriteSerializer(serializers.Serializer):
    """
    Serializer for creating/updating Releases.
    Accepts service IDs instead of nested objects.
    """

    services = serializers.PrimaryKeyRelatedField(
        many=True, queryset=StreamingService.objects.all()
    )

    class Meta:
        model = Release
        fields = ["id", "title", "release_date", "cover_image", "services"]
