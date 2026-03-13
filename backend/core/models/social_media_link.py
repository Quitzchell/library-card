from django.db import models


class Platform(models.TextChoices):
    INSTAGRAM = "instagram", "Instagram"
    FACEBOOK = "facebook", "Facebook"
    SPOTIFY = "spotify", "Spotify"
    APPLE_MUSIC = "apple_music", "Apple Music"
    SOUNDCLOUD = "soundcloud", "SoundCloud"
    DEEZER = "deezer", "Deezer"
    YOUTUBE = "youtube", "YouTube"
    BANDCAMP = "bandcamp", "Bandcamp"


class SocialMediaLink(models.Model):
    content = models.ForeignKey(
        "GeneralContent",
        on_delete=models.CASCADE,
        related_name="social_media_links",
    )
    platform = models.CharField(max_length=20, choices=Platform.choices)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.get_platform_display()} ({self.url})"
