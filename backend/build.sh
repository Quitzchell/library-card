#!/usr/bin/env bash
# Render build script
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Create superuser from env vars (skips if already exists)
if [ -n "$DJANGO_SUPERUSER_USERNAME" ]; then
  python manage.py createsuperuser --no-input 2>/dev/null || true
fi

# Seed database if empty
python manage.py shell -c "
from tour.models import TourDate
if not TourDate.objects.exists():
    print('Database is empty, seeding...')
    from django.core.management import call_command
    call_command('seed', '--production')
else:
    print('Database already has data, skipping seed.')
"
