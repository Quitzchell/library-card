import bleach
from django.db import models

ALLOWED_TAGS = [
    "p", "br", "strong", "em", "u", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6", "hr", "span",
]
ALLOWED_ATTRIBUTES = {"a": ["href", "target", "rel"], "span": ["style"]}


class GeneralContent(models.Model):
    about_us_title = models.CharField(max_length=55, blank=True, null=True)
    about_us_content = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        if self.about_us_content:
            self.about_us_content = bleach.clean(
                self.about_us_content,
                tags=ALLOWED_TAGS,
                attributes=ALLOWED_ATTRIBUTES,
                strip=True,
            )
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "General Content"
