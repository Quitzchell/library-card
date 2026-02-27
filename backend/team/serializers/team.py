from rest_framework import serializers

from .team_member import TeamMemberSerializer
from ..models.team import Team

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model.
    """

    members = TeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = [
            "id",
            "category",
            "members",
        ]