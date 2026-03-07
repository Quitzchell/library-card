from rest_framework import serializers

from ..models.video import Video


class VideoSerializer(serializers.ModelSerializer):
    """
    Serializer for Video model.
    """

    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "video_id",
            "category",
        ]
