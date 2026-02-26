from rest_framework import serializers

from .team_member import TeamMemberSerializer
from ..models.team import Team

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializer for Team model.
    """

    team_members = TeamMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = [
            "id",
            "category",
            "team_members",
        ]