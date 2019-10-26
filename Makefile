# Project variables
PROJECT_NAME ?= edudoor-frontend

# File names
DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

start:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=edudoor_data > /dev/null
	@ echo " "
	@ ${INFO} "Building required docker images"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} build edudoor_frontend
	@ ${INFO} "Starting the application"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up -d edudoor_frontend

api:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=edudoor_data > /dev/null
	@ echo " "
	@ ${INFO} "Starting the backend"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up -d edudoor_backend


db:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=edudoor_data > /dev/null
	@ echo " "
	@ ${INFO} "Starting the database"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up -d edudoor_database

stop:
	${INFO} "Stopping all containers"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ ${SUCCESS} "All containers stopped successfully"


clean:
	${INFO} "Cleaning your local environment"
	${INFO} "Not that all ephemeral volumes will be destroyed"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ docker volume rm edudoor_data
	@ ${INFO} "Removing dangling images"
	@ docker images -q -f label=application${PROJECT_NAME} | xargs -I ARGS docker rmi -f ARGS
	docker system prune
	@ ${SUCCESS} "Clean complete"

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
