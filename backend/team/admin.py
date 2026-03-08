from django.contrib import admin

from config.revalidation import trigger_revalidation

from .models.team import Team
from .models.member import Member


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ["category"]
    list_filter = ["category"]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/about"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/about"])


@admin.register(Member)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ["full_name", "organization", "region", "email"]
    list_filter = ["region"]
    search_fields = ["name", "surname", "email"]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/about"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/about"])
