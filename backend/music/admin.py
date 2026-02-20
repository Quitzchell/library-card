from django.contrib import admin

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