from django.contrib import admin

from .models.team import Team
from .models.team_member import TeamMember


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = "category"
    list_filter = "category"
    search_fields = "name"


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["team", "region"]
    list_filter = ["team", "region"]
    search_fields = ["team", "region"]
