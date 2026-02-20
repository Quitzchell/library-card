from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings


class Command(BaseCommand):
    help = 'Seeds the database with all development data'

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(
                self.style.ERROR('This command only runs in DEBUG mode')
            )
            return

        self.stdout.write('Seeding superuser...')
        call_command('seed_superuser')

        self.stdout.write('Seeding releases...')
        call_command('seed_releases')

        self.stdout.write('Seeding tour dates...')
        call_command('seed_tour')

        self.stdout.write(self.style.SUCCESS('Successfully seeded all development data'))
