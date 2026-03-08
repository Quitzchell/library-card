from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings


class Command(BaseCommand):
    help = 'Seeds the database with all development data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--production',
            action='store_true',
            help='Allow seeding in production (non-DEBUG) mode',
        )

    def handle(self, *args, **options):
        if not settings.DEBUG and not options['production']:
            self.stdout.write(
                self.style.ERROR('This command only runs in DEBUG mode. Use --production to override.')
            )
            return

        prod_flag = ['--production'] if options['production'] else []

        self.stdout.write('Seeding releases...')
        call_command('seed_releases', *prod_flag)

        self.stdout.write('Seeding tour dates...')
        call_command('seed_tour', *prod_flag)

        self.stdout.write('Seeding videos...')
        call_command('seed_videos', *prod_flag)

        self.stdout.write('Seeding team and team members...')
        call_command('seed_team', *prod_flag)

        self.stdout.write(self.style.SUCCESS('Successfully seeded all development data'))
