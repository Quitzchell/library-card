from django.contrib import admin
from django.shortcuts import redirect
from django_summernote.admin import SummernoteModelAdmin

from .models import GeneralContent, CarouselImage


@admin.register(GeneralContent)
class GeneralContentAdmin(SummernoteModelAdmin):
    summernote_fields = ("about_us_content",)

    def changelist_view(self, request, extra_context=None):
        obj = GeneralContent.load()
        return redirect(f'/admin/core/generalcontent/{obj.pk}/change/')

    def has_add_permission(self, request):
        return not GeneralContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(CarouselImage)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ["name", "alt", "order", "is_active"]
    search_fields = ["name", "alt"]
    list_editable = ["order", "is_active"]
