from django.db import models
from .music_service import MusicService

class MusicItem(models.Model):
    title = models.CharField(max_length=255)
    release_date = models.DateField()
    cover_image = models.ImageField(upload_to='covers/')
    services = models.ManyToManyField(MusicService)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
