from django.db import models
import re


class VideoCategory(models.TextChoices):
    LIVE = "live", "Live"
    VIDEO_CLIP = "video_clip", "Video clip"
    PRESS = "press", "Press"
    OTHER = "other", "Other"


def extract_video_id(value):
    """Extract YouTube video ID from various URL formats, or return as-is."""
    patterns = [
        r'(?:youtu\.be/)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com/watch\?.*v=)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com/embed/)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com/shorts/)([a-zA-Z0-9_-]{11})',
    ]
    for pattern in patterns:
        match = re.search(pattern, value)
        if match:
            return match.group(1)
    return value.strip()


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
