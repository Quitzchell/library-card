from django.db import models


class TeamMember(models.Model):
    region = models.CharField(max_length=5)
    name = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return str(self.name)
