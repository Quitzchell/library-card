project_name=$(notdir $(shell pwd))

.PHONY: all
all: build up

.PHONY: detached
d: build detached

.PHONY: build
build:
	PROJECT_NAME="${project_name}" docker compose build

.PHONY: up
up:
	PROJECT_NAME="${project_name}" docker compose up --no-build

.PHONY: detached
detached:
	PROJECT_NAME="${project_name}" docker compose up --no-build -d

.PHONY: login-front
login-front:
	docker exec -it library-card-frontend /bin/sh

.PHONY: login-back
login-back:
	docker exec -it library-card-backend /bin/bash

.PHONY: clean
clean:
	PROJECT_NAME="${project_name}" docker compose down --rmi local --volumes
