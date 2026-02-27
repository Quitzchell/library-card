from django.db import models


class TeamMember(models.Model):
    region = models.CharField(max_length=5)
    name = models.CharField(max_length=20)
    surname = models.CharField(max_length=20)
    organization = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField()

    @property
    def full_name(self):
        return f"{self.name} {self.surname}"

    def __str__(self):
        return self.full_name
