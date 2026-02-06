from rest_framework import serializers

from ..models import TourDate

class TourDateSerializer(serializers.ModelSerializer):
  """
  Serializer for TourDate model.
  Includes nested Venue data.
  """

  # venue = VenueSerializer()

  class Meta:
    model = TourDate
    fields = [
      'id',
      'date',
      'venue',
      'ticket_url',
      'sold_out',
      'description',
    ]