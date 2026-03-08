from django.core.management.base import BaseCommand
from django.conf import settings

from video.models import Video, VideoCategory


class Command(BaseCommand):
    help = "Seeds the database with videos"

    def add_arguments(self, parser):
        parser.add_argument('--production', action='store_true')

    def handle(self, *args, **options):
        if not settings.DEBUG and not options.get('production'):
            self.stdout.write(self.style.ERROR("This command only runs in DEBUG mode"))
            return

        videos = [
            {"title": "Art School", "video_id": "Yne-u4IEUT4", "category": VideoCategory.VIDEO_CLIP},
            {"title": "For the World is Hollow", "video_id": "qewpFSU6Sd0", "category": VideoCategory.VIDEO_CLIP},
            {"title": "Rockpalast @ Eurosonic 2025", "video_id": "-Ro9Q1ABfdw", "category": VideoCategory.LIVE},
            {"title": "NTR @ Eurosonic 2024", "video_id": "4emK4fF-igU", "category": VideoCategory.LIVE},
            {"title": "Mirror Factory", "video_id": "CedA_EOk0gY", "category": VideoCategory.VIDEO_CLIP},
            {"title": "Sunflowers", "video_id": "OIRaQ6jPTXA", "category": VideoCategory.VIDEO_CLIP},
        ]

        created_count = 0
        for video_data in videos:
            video, created = Video.objects.get_or_create(
                video_id=video_data["video_id"],
                defaults={
                    "title": video_data["title"],
                    "category": video_data["category"],
                },
            )

            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f"Seeded {created_count} videos"))
