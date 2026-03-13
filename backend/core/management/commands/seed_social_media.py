from django.core.management.base import BaseCommand
from django.conf import settings

from core.models import GeneralContent, SocialMediaLink
from core.models.social_media_link import Platform


class Command(BaseCommand):
    help = "Seeds the database with social media links"

    def add_arguments(self, parser):
        parser.add_argument("--production", action="store_true")

    def handle(self, *args, **options):
        if not settings.DEBUG and not options.get("production"):
            self.stdout.write(
                self.style.ERROR("This command only runs in DEBUG mode")
            )
            return

        content = GeneralContent.load()

        links = [
            {
                "platform": Platform.INSTAGRAM,
                "url": "https://www.instagram.com/librarycard",
                "order": 0,
            },
        ]

        created_count = 0
        for link_data in links:
            _, created = SocialMediaLink.objects.get_or_create(
                content=content,
                platform=link_data["platform"],
                defaults={
                    "url": link_data["url"],
                    "order": link_data["order"],
                },
            )
            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(f"Seeded {created_count} social media links")
        )
