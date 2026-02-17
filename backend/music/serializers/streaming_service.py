from rest_framework import serializers
from ..models import StreamingService


class StreamingServiceSerializer(serializers.ModelSerializer):
    """
    Serializer for StreamService model.
    """

    class Meta:
        model = StreamingService
        fields = ["id", "name", "url"]
