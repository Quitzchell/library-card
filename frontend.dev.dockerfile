FROM node:24-alpine

RUN mkdir -p /var/www/html
COPY ./frontend.entrypoint.sh /usr/local/bin/docker-entrypoint.sh

WORKDIR /var/www/html

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
