from django.contrib import admin

from config.revalidation import trigger_revalidation

from .models import Video


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ["title", "category"]
    list_filter = ["category"]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/video"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/video"])
