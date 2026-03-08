from django.contrib import admin

from config.revalidation import trigger_revalidation

from .models.release import Release
from .models.streaming_service import StreamingService
from .models.store import Store


class StreamingServiceInline(admin.TabularInline):
    model = StreamingService
    extra = 1


class StoreInline(admin.TabularInline):
    model = Store
    extra = 1


@admin.register(Release)
class ReleaseAdmin(admin.ModelAdmin):
    inlines = [StreamingServiceInline, StoreInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/music"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/music"])