from django.db import models


class StreamingServiceName(models.TextChoices):
    SPOTIFY = 'spotify', 'Spotify'
    APPLE_MUSIC = 'apple_music', 'Apple Music'
    YOUTUBE_MUSIC = 'youtube_music', 'YouTube Music'
    AMAZON_MUSIC = 'amazon_music', 'Amazon Music'
    TIDAL = 'tidal', 'Tidal'
    DEEZER = 'deezer', 'Deezer'
    BANDCAMP = 'bandcamp', 'Bandcamp'


class StreamingService(models.Model):
    release = models.ForeignKey('Release', on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=50, choices=StreamingServiceName.choices)
    url = models.URLField()


    def __str__(self) -> str:
        return self.name


