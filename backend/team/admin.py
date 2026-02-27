from django.contrib import admin

from .models.team import Team
from .models.team_member import TeamMember


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ["category"]
    list_filter = ["category"]


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["full_name", "organization", "region", "email"]
    list_filter = ["region"]
    search_fields = ["name", "surname", "email"]
