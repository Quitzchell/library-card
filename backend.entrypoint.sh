#!/bin/sh
set -e

# Create Django project if it doesn't exist
if [ ! -d "config" ]; then
    echo "No Django project found. Creating with django-admin startproject..."
    django-admin startproject config .
    echo "Django project created successfully"
fi

# Run migrations
echo "Running migrations..."
python manage.py migrate --noinput
echo "Migrations complete"

exec "$@"
