from django.db import models


class TourDate(models.Model):
    date = models.DateField()
    # venue
    ticket_url = models.URLField()
    sold_out = models.BooleanField(default=False)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
