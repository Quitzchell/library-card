#!/bin/sh
set -e

# Install Python dependencies
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
echo "Dependencies installed"

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
