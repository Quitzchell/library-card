from django.contrib import admin

from config.revalidation import trigger_revalidation

from .models.venue import Venue
from .models.tour_date import TourDate


@admin.register(TourDate)
class TourDateAdmin(admin.ModelAdmin):
    list_display = ["date", "venue", "sold_out", "ticket_url"]
    list_filter = ["sold_out", "date"]
    search_fields = ["venue__name", "venue__city"]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        trigger_revalidation(["/", "/tour"])

    def delete_model(self, request, obj):
        super().delete_model(request, obj)
        trigger_revalidation(["/", "/tour"])


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "country"]
    search_fields = ["name", "city", "country"]
