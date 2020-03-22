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


build:
	@ ${INFO} "Building required docker images"
	@ docker image inspect edudoor:${APP_VERSION} >/dev/null 2>&1 && echo "Image already exists" || docker build . -t edudoor:${APP_VERSION} --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/edudoor-frontend/Dockerfile -t chuchu:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/edudoor-node-backend/Dockerfile -t thala:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/edudoor-website/Dockerfile -t swagat:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@
	@ ${INFO} "Tagging edudoor image"
	@ docker tag edudoor:${APP_VERSION} gcr.io/edudoor/edudoor:${APP_VERSION}
	@ ${INFO} "Tagging frontend image"
	@ docker tag chuchu:${APP_VERSION} gcr.io/edudoor/chuchu:${APP_VERSION}
	@ ${INFO} "Tagging backend image"
	@ docker tag thala:${APP_VERSION} gcr.io/edudoor/thala:${APP_VERSION}
	@ ${INFO} "Tagging website image"
	@ docker tag swagat:${APP_VERSION} gcr.io/edudoor/swagat:${APP_VERSION}
	@
	@ ${INFO} "Pushing images to GCP"
	@ docker push gcr.io/edudoor/edudoor:${APP_VERSION}
	@ docker push gcr.io/edudoor/chuchu:${APP_VERSION}
	@ docker push gcr.io/edudoor/thala:${APP_VERSION}
	@ docker push gcr.io/edudoor/swagat:${APP_VERSION}

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
