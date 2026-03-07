from rest_framework import serializers

from ..models import Venue


class VenueSerializer(serializers.ModelSerializer):
    """
    Serializer for Venue model.
    """

    class Meta:
        model = Venue
        fields = [
            "id",
            "name",
            "city",
            "country"
        ]
