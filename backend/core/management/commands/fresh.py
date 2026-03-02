from django.core.management.base import BaseCommand
from django.core.management import call_command
from django.conf import settings
from django.db import connection


class Command(BaseCommand):
    help = 'Reset database and seed with development data'

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(
                self.style.ERROR('This command only runs in DEBUG mode')
            )
            return

        self.stdout.write('Dropping all tables...')
        with connection.cursor() as cursor:
            cursor.execute("DROP SCHEMA public CASCADE;")
            cursor.execute("CREATE SCHEMA public;")

        self.stdout.write('Running migrations...')
        call_command('migrate')

        self.stdout.write('Seeding database...')
        call_command('seed')

        self.stdout.write(self.style.SUCCESS('Database reset and seeded!'))
