from django.db import models

class StreamingService(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    prefix = models.CharField(max_length=20, blank=True, null=True)
    postfix = models.CharField(max_length=20, blank=True, null=True)
