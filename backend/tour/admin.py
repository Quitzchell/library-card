from django.contrib import admin
from .models.venue import Venue
from .models.tour_date import TourDate


@admin.register(TourDate)
class TourDateAdmin(admin.ModelAdmin):
    list_display = ["date", "venue", "sold_out", "ticket_url"]
    list_filter = ["sold_out", "date"]
    search_fields = ["venue__name", "venue__city"]


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ["name", "city", "country"]
    search_fields = ["name", "city", "country"]