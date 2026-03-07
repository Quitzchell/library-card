from rest_framework import serializers

from .member import MemberSerializer
from ..models.team import Team

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model.
    """

    members = MemberSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = [
            "id",
            "category",
            "members",
        ]