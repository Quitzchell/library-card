from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Creates a superuser for development'

    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write(
                self.style.ERROR('This command only runs in DEBUG mode')
            )
            return

        User = get_user_model()

        username = 'admin'
        email = 'admin@example.com'
        password = 'Wachtwoord'

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'  Superuser "{username}" already exists')
        else:
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
            )
            self.stdout.write(
                self.style.SUCCESS(f'Created superuser "{username}" with password "{password}"')
            )
