from django.db import models


class TourDate(models.Model):
    date = models.DateField()
    venue = models.ForeignKey(
        "Venue", on_delete=models.SET_NULL, null=True, related_name="tour_dates"
    )
    ticket_url = models.URLField(null=True, blank=True)
    sold_out = models.BooleanField(default=False)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        venue_name = self.venue.name if self.venue else "No venue"
        return f"{self.date} {venue_name}"
