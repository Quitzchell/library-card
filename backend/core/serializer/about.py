from rest_framework import serializers

from ..models import GeneralContent


class AboutSerializer(serializers.ModelSerializer):
    title = serializers.CharField(source='about_us_title')
    content = serializers.CharField(source='about_us_content')

    class Meta:
        model = GeneralContent
        fields = ['title', 'content']
