from django.contrib import admin

from .models.release import Release
from .models.streaming_service import StreamingService

# Register your models here.
admin.site.register(Release)
admin.site.register(StreamingService)