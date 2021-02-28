# these variables are consistent with docker-compose.yml
BACKEND_CONTAINER = backend 
DB_CONTAINER = db

.PHONY: frontend backend

# quick way to get everything up and running
run: build up
	echo 'Everything is up and running! Run `make down` to shut things down.'

# restarts all containers
restart: down build up
	echo 'Restarted containers! Run `make down` to shut things down.'

# build frontend assets and backend docker image
build:
	docker build -t $(BACKEND_CONTAINER) .
	yarn --cwd frontend
	yarn --cwd frontend build

# builds frontend assets; changes will automatically sync to container
frontend:
	yarn --cwd frontend build

# restarts backend container; new changes to backend should take effect
backend:
	docker restart $(BACKEND_CONTAINER)

# start up containers
up:
	docker-compose up -d

# shut down containers
down:
	docker-compose down

# view logs of backend container
logs:
	docker logs $(BACKEND_CONTAINER)

# open bash shell in backend container
backend-shell:
	docker exec -it $(BACKEND_CONTAINER) bash

# open bash shell in db container
db-shell:
	docker exec -it $(DB_CONTAINER) bash

