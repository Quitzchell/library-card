from django.core.management.base import BaseCommand
from django.conf import settings
from datetime import date

from music.models import Release, StreamingService, StreamingServiceName, Store


class Command(BaseCommand):
    help = "Seeds the database with releases, streaming services, and stores"

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(self.style.ERROR("This command only runs in DEBUG mode"))
            return

        releases = [
            {
                "title": "Days of Clay (ft. Axender)",
                "release_date": date(2025, 10, 16),
                "cover_image": "release-covers/days-of-clay-artwork.jpg",
                "services": [],
                "stores": [],
            },
            {
                "title": "Art School",
                "release_date": date(2025, 6, 9),
                "cover_image": "release-covers/art-school-artwork.jpg",
                "services": [
                    {"name": StreamingServiceName.SPOTIFY, "url": "https://open.spotify.com/track/2pjSXlkwwlqEhoGtUpXeqr?si=27494075ad234820"},
                    {"name": StreamingServiceName.BANDCAMP, "url": "https://thisislibrarycard.bandcamp.com/track/art-school"},
                    {"name": StreamingServiceName.APPLE_MUSIC, "url": "https://music.apple.com/us/song/art-school/1823574040"},
                ],
                "stores": [],
            },
            {
                "title": "Nothing, Interesting",
                "release_date": date(2024, 3, 15),
                "cover_image": "release-covers/nothing-interesting-artwork.jpg",
                "services": [
                    {"name": StreamingServiceName.SPOTIFY, "url": "https://open.spotify.com/album/4wzy3foMTOWeACd3J2FXoC?si=e3fn2cSqQ0CvfQ6wv-MIag"},
                    {"name": StreamingServiceName.BANDCAMP, "url": "https://thisislibrarycard.bandcamp.com/album/nothing-interesting"},
                    {"name": StreamingServiceName.APPLE_MUSIC, "url": "https://music.apple.com/us/album/nothing-interesting-ep/1722176456"},
                ],
                "stores": [
                    {"name": "At Ease Records", "url": "https://shop.atease.ltd/products/library-card-nothing-interesting", "postfix": "Buy now!"},
                ],
            },
            {
                "title": "For the World is Hollow",
                "release_date": date(2024, 3, 5),
                "cover_image": "release-covers/for-the-world-is-hollow-artwork.jpg",
                "services": [],
                "stores": [],
            },
            {
                "title": "Well, Actually",
                "release_date": date(2024, 1, 10),
                "cover_image": "release-covers/well-actually-artwork.jpg",
                "services": [],
                "stores": [],
            },
            {
                "title": "Cognitive Dissonance",
                "release_date": date(2023, 10, 26),
                "cover_image": "release-covers/cognitive-dissonance-artwork.jpg",
                "services": [],
                "stores": [],
            },
            {
                "title": "Sunflowers",
                "release_date": date(2023, 3, 9),
                "cover_image": "release-covers/sunflowers-artwork.jpg",
                "services": [
                    {"name": StreamingServiceName.SPOTIFY, "url": "https://open.spotify.com/album/5PY6ZHSv3OwcLNwi6qSm8P?si=s7X1JY32RgmKPfTdqA3ecg"},
                    {"name": StreamingServiceName.BANDCAMP, "url": "https://thisislibrarycard.bandcamp.com/track/sunflowers"},
                    {"name": StreamingServiceName.APPLE_MUSIC, "url": "https://music.apple.com/us/album/sunflowers-single/1672448083"},
                ],
                "stores": [],
            },
            {
                "title": "Mirror Factory",
                "release_date": date(2022, 6, 15),
                "cover_image": "release-covers/mirror-factory-artwork.jpg",
                "services": [
                    {"name": StreamingServiceName.SPOTIFY, "url": "https://open.spotify.com/track/0D5W10M58DccbwOOxrdkxM?si=a27b56e81f6a4c2c"},
                    {"name": StreamingServiceName.BANDCAMP, "url": "https://thisislibrarycard.bandcamp.com/album/mirror-factory"},
                    {"name": StreamingServiceName.APPLE_MUSIC, "url": "https://music.apple.com/us/song/mirror-factory/1625081184"},
                ],
                "stores": [],
            },
        ]

        created_count = 0
        for release_data in releases:
            release, created = Release.objects.get_or_create(
                title=release_data["title"],
                defaults={
                    "release_date": release_data["release_date"],
                    "cover_image": release_data["cover_image"],
                },
            )

            if created:
                created_count += 1
                # Create streaming services for this release
                for service_data in release_data["services"]:
                    StreamingService.objects.create(
                        release=release,
                        name=service_data["name"],
                        url=service_data["url"],
                    )
                # Create stores for this release
                for store_data in release_data["stores"]:
                    Store.objects.create(
                        release=release,
                        name=store_data["name"],
                        url=store_data["url"],
                        postfix=store_data.get("postfix"),
                    )
                self.stdout.write(f"  Created release: {release.title}")
            else:
                self.stdout.write(f"  Release already exists: {release.title}")

        self.stdout.write(self.style.SUCCESS(f"Seeded {created_count} releases"))