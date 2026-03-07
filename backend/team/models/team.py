from django.db import models


class TeamCategory(models.TextChoices):
    BOOKING = "booking", "Booking"
    MANAGEMENT = "management", "Management"
    PROMOTION = "promotion", "Promotion"


class Team(models.Model):
    category = models.CharField(choices=TeamCategory.choices, max_length=20)
    members = models.ManyToManyField('Member', related_name="teams")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return str(self.category)
