# Django Backend

Backend API for Library Card using Django + Django REST Framework.

## Quick Start

### Prerequisites
- Docker Desktop installed and running

### First Time Setup

1. **Build and start containers:**
   ```bash
   docker-compose up --build
   ```

2. **Create Django project (in another terminal):**
   ```bash
   docker-compose exec web django-admin startproject config .
   ```

3. **Run migrations:**
   ```bash
   docker-compose exec web python manage.py migrate
   ```

4. **Create superuser:**
   ```bash
   docker-compose exec web python manage.py createsuperuser
   ```

5. **Access Django:**
   - API: http://localhost:8000
   - Admin: http://localhost:8000/admin

### Daily Development

```bash
# Start containers
docker-compose up

# Stop containers
docker-compose down
```

## Common Commands

### Django Management

```bash
# Run any manage.py command
docker-compose exec web python manage.py <command>

# Examples:
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py shell
docker-compose exec web python manage.py startapp music
```

### Container Management

```bash
# View logs
docker-compose logs -f web

# Rebuild after changing requirements.txt
docker-compose build web

# Restart containers
docker-compose restart
```

### Database

```bash
# Access PostgreSQL
docker-compose exec db psql -U postgres -d library_card

# Backup database
docker-compose exec db pg_dump -U postgres library_card > backup.sql
```

## Project Structure

```
backend/
├── config/              # Django settings
├── music/              # Music app (to be created)
├── tours/              # Tours app (to be created)
├── videos/             # Videos app (to be created)
├── media/              # Uploaded files
├── dev.dockerfile      # Development Docker config
├── docker-compose.yml  # Container orchestration
└── requirements.txt    # Python dependencies
```

## Next Steps

1. Follow Django tutorial: https://docs.djangoproject.com/en/5.1/intro/tutorial01/
2. Follow DRF tutorial: https://www.django-rest-framework.org/tutorial/1-serialization/
3. Build your models matching `frontend/lib/interfaces/`
