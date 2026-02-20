from django.db import models


class Store(models.Model):
    release = models.ForeignKey('Release', on_delete=models.CASCADE, related_name='stores')
    name = models.CharField(max_length=50)
    url = models.URLField()
    postfix = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self) -> str:
        return self.name
