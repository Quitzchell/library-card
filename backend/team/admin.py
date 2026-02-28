from django.contrib import admin

from .models.team import Team
from .models.member import Member


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ["category"]
    list_filter = ["category"]


@admin.register(Member)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["full_name", "organization", "region", "email"]
    list_filter = ["region"]
    search_fields = ["name", "surname", "email"]
