FROM python:3.14-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    VIRTUAL_ENV=/opt/venv \
    PATH="/opt/venv/bin:$PATH"

RUN mkdir -p /opt/venv

RUN apt-get update && apt-get install -y \
    postgresql-client \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home --shell /bin/bash docker

RUN mkdir -p /var/www/html && chown docker:docker /var/www/html /opt/venv

WORKDIR /var/www/html

COPY backend.entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER docker

RUN python -m venv $VIRTUAL_ENV

COPY --chown=docker:docker backend/requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

EXPOSE 8000

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
