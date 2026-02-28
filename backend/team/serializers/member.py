from rest_framework import serializers

from ..models.member import Member

class MemberSerializer(serializers.ModelSerializer):
    """
    Serializer for Member model.
    """

    class Meta:
        model = Member
        fields = [
            "id",
            "name",
            "surname",
            "region",
            "organization",
            "email",
        ]
