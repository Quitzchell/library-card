from rest_framework import serializers
from ..models import StreamingService


class StreamingServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for StreamService model.
    Maps to the frontend Service type.
    """

    class Meta:
        model = StreamingService
        fields = ["id", "name", "url"]
