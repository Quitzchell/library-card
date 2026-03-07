from django.db import models


class GeneralContent(models.Model):
    about_us_title = models.CharField(max_length=55, blank=True, null=True)
    about_us_content = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "General Content"
