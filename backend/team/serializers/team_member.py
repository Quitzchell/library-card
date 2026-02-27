from rest_framework import serializers

from ..models.team_member import TeamMember

class TeamMemberSerializer(serializers.ModelSerializer):
    """
    Serializer for TeamMember model.
    """

    class Meta:
        model = TeamMember
        fields = [
            "id",
            "name",
            "surname",
            "organization",
            "email",
        ]
