# Project variables
PROJECT_NAME ?= edudoor-frontend

# File names
DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

start:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=openolat_data > /dev/null
	@ docker volume create --name=edudoor_data > /dev/null
	@ docker volume create --name=ldap_data > /dev/null
	@ echo " "
	@ ${INFO} "Building required docker images"
	@ docker image inspect dev_edudoor:latest >/dev/null 2>&1 && echo "Image already exists" ||  docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} build edudoor
	@
	@ ${INFO} "Starting the application"
	@ COMPOSE_HTTP_TIMEOUT=200 docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up edudoor_frontend &

api:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=edudoor_data > /dev/null
	@ docker volume create --name=openolat_data > /dev/null
	@ echo " "
	@ ${INFO} "Starting the backend"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up -d edudoor_node_backend

openolat:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=openolat_data > /dev/null
	@ echo " "
	@ ${INFO} "Starting the OpenOLAT backend"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up openolat

ldap:
	${INFO} "Creating LDAP database volume"
	@ docker volume create --name=ldap_data > /dev/null
	@ echo " "
	@ ${INFO} "Starting the LDAP server"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up edudoor_ldap_auth

openvidu:
	@ ${INFO} "Starting the OpenVIDU server"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up edudoor_openvidu

stop:
	${INFO} "Stopping all containers"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ ${SUCCESS} "All containers stopped successfully"

clean:
	${INFO} "Cleaning your local environment"
	${INFO} "Not that all ephemeral volumes will be destroyed"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ docker volume rm edudoor_data
	@ docker volume rm openolat_data
	@ ${INFO} "Removing dangling images"
	@ docker images -q -f label=application${PROJECT_NAME} | xargs -I ARGS docker rmi -f ARGS
	docker system prune
	@ ${SUCCESS} "Clean complete"

build:
	${INFO} "Building the backend application"
	@ cp docker/demo/backend/Dockerfile edudoor_node_backend
	@ echo 'node_modules' > edudoor_node_backend/.dockerignore
	${INFO} "Building the docker image"
	@ docker build -t edudoor_demo_backend edudoor_node_backend
	@ rm -rf edudoor_node_backend/Dockerfile
	@ rm -rf edudoor_node_backend/.dockerignore

	${INFO} "Building the frontend application"
	@ cp docker/demo/frontend/Dockerfile edudoor_frontend
	@ echo 'node_modules' > edudoor_frontend/.dockerignore
	${INFO} "Building the frontend docker image"
	@ docker build -t edudoor_demo_frontend edudoor_frontend
	@ rm -rf edudoor_frontend/Dockerfile
	@ rm -rf edudoor_frontend/.dockerignore
	${SUCCESS} "Successfully created docker images"

build-staging:
	${INFO} "Building the backend application"
	@ cd edudoor_node_backend && yarn build && cd ..
	@ cp docker/staging/backend/Dockerfile edudoor_node_backend
	@ cp edudoor_node_backend/.env edudoor_node_backend/dist/.env
	@ echo 'node_modules' > edudoor_node_backend/.dockerignore
	${INFO} "Building the docker image"
	@ docker build -t dev_edudoor_rest_api edudoor_node_backend
	@ rm -rf edudoor_node_backend/Dockerfile
	@ rm -rf edudoor_node_backend/.dockerignore
	${INFO} "Building the frontend application"
	@
	@ ${INFO} "Building the frontend application"
	@ cp docker/staging/frontend/Dockerfile edudoor_frontend
	@ echo 'node_modules' > edudoor_frontend/.dockerignore
	${INFO} "Building the frontend docker image"
	@ docker build -t dev_edudoor_frontend edudoor_frontend
	@ rm -rf edudoor_frontend/Dockerfile
	@ rm -rf edudoor_frontend/.dockerignore
	${SUCCESS} "Successfully created docker images"

ssh:
	docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} exec edudoor_frontend sh


# COLORS
GREEN	:= $(shell tput -Txterm setaf 2)
YELLOW 	:= $(shell tput -Txterm setaf 3)
WHITE	:= $(shell tput -Txterm setaf 7)
NC		:= "\e[0m"
RESET 	:= $(shell tput -Txterm sgr0)

# SHELL FUNCTIONS
INFO 	:= @bash -c 'printf "\n"; printf $(YELLOW); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS	:= @bash -c 'printf "\n"; printf $(GREEN); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
