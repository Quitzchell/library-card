from django.contrib import admin
from django.shortcuts import redirect
from django_summernote.admin import SummernoteModelAdmin

from config.revalidation import trigger_revalidation

from .models import GeneralContent, CarouselImage, SocialMediaLink


class SocialMediaLinkInline(admin.TabularInline):
    model = SocialMediaLink
    extra = 1
    fields = ["platform", "url", "order"]


@admin.register(GeneralContent)
class GeneralContentAdmin(SummernoteModelAdmin):
    summernote_fields = ("about_us_content",)
    fieldsets = [
        ("Biography", {"fields": ["about_us_title", "about_us_content"]}),
    ]
    inlines = [SocialMediaLinkInline]

    def changelist_view(self, request, extra_context=None):
        obj = GeneralContent.load()
        return redirect(f'/admin/core/generalcontent/{obj.pk}/change/')

    def has_add_permission(self, request):
        return not GeneralContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/about"])

    def save_related(self, request, form, formsets, change):
        super().save_related(request, form, formsets, change)
        trigger_revalidation(["/", "/about"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/about"])


@admin.register(CarouselImage)
class ImagesAdmin(admin.ModelAdmin):
    list_display = ["name", "alt", "order", "is_active"]
    search_fields = ["name", "alt"]
    list_editable = ["order", "is_active"]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/"])
