from django.db import models

from video.utils import extract_video_id


class VideoCategory(models.TextChoices):
    LIVE = "live", "Live"
    VIDEO_CLIP = "video_clip", "Video clip"
    PRESS = "press", "Press"
    OTHER = "other", "Other"


class Video(models.Model):
    title = models.CharField(max_length=200)
    video_id = models.CharField(max_length=200,
                                help_text="Only YouTube videos will work. The video id will be extracted from given YouTube links.")
    category = models.CharField(
        max_length=20,
        choices=VideoCategory.choices,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.video_id = extract_video_id(self.video_id)
        super().save(*args, **kwargs)
