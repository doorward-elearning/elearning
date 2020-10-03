# Project variables
PROJECT_NAME ?= doorward-frontend

# File names
DOCKER_DEV_COMPOSE_FILE := docker/dev/docker-compose.yml

start:
	${INFO} "Creating PostgreSQL database volume"
	@ docker volume create --name=doorward_data > /dev/null
	@ echo " "
	@ ${INFO} "Building required docker images"
	@ docker image inspect dev_doorward:latest >/dev/null 2>&1 && echo "Image already exists" ||  docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} build doorward
	@
	@ ${INFO} "Starting the application"
	@ COMPOSE_HTTP_TIMEOUT=200 docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up doorward_frontend &


build:
	@ ${INFO} "Building required docker images"
	@ docker image inspect doorward:${APP_VERSION} >/dev/null 2>&1 && echo "Image already exists" || docker build -t doorward:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/doorward-frontend/Dockerfile -t chuchu:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/doorward-backend/Dockerfile -t thala:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/doorward-website/Dockerfile -t swagat:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/openvidu-backend/Dockerfile -t vidu:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@
	@ ${INFO} "Tagging doorward image"
	@ docker tag doorward:${APP_VERSION} core.harbor.doorward.tech/doorward/doorward:${APP_VERSION}
	@ ${INFO} "Tagging frontend image"
	@ docker tag chuchu:${APP_VERSION} core.harbor.doorward.tech/doorward/chuchu:${APP_VERSION}
	@ ${INFO} "Tagging backend image"
	@ docker tag thala:${APP_VERSION} core.harbor.doorward.tech/doorward/thala:${APP_VERSION}
	@ ${INFO} "Tagging website image"
	@ docker tag swagat:${APP_VERSION} core.harbor.doorward.tech/doorward/swagat:${APP_VERSION}
	@ ${INFO} "Tagging vidu image"
	@ docker tag vidu:${APP_VERSION} core.harbor.doorward.tech/doorward/vidu:${APP_VERSION}
	@
	@ ${INFO} "Pushing images to GCP"
	@ docker push core.harbor.doorward.tech/doorward/doorward:${APP_VERSION}
	@ docker push core.harbor.doorward.tech/doorward/chuchu:${APP_VERSION}
	@ docker push core.harbor.doorward.tech/doorward/thala:${APP_VERSION}
	@ docker push core.harbor.doorward.tech/doorward/swagat:${APP_VERSION}
	@ docker push core.harbor.doorward.tech/doorward/vidu:${APP_VERSION}

meeting:
	@ ${INFO} "Building the meeting docker image"
	@ docker image inspect doorward:${APP_VERSION} >/dev/null 2>&1 && echo "Image already exists" || docker build -t doorward:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ docker build -f docker/production/doorward-meeting/Dockerfile -t meeting:${APP_VERSION} . --build-arg APP_VERSION=${APP_VERSION}
	@ ${INFO} "Tagging meeting image"
	@ docker tag meeting:${APP_VERSION} core.harbor.doorward.tech/doorward/meeting:${APP_VERSION}
	@ ${INFO} "Pushing images to Harbor"
	@ docker push core.harbor.doorward.tech/doorward/meeting:${APP_VERSION}

openvidu:
	@ ${INFO} "Starting the OpenVIDU server"
	@ ./docker/dev/openvidu/openvidu.sh
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up --build doorward_openvidu

redis:
	@ ${INFO} "Starting the REDIS server"
	@ echo "--> Ensure the volume has permissions for the UID 1001 (chown 1001 /var/lib/docker/doorward_redis_data)"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} up -d --build doorward_redis

stop:
	${INFO} "Stopping all containers"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ ${SUCCESS} "All containers stopped successfully"

clean:
	${INFO} "Cleaning your local environment"
	${INFO} "Not that all ephemeral volumes will be destroyed"
	@ docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} down -v
	@ docker volume rm doorward_data
	@ ${INFO} "Removing dangling images"
	@ docker images -q -f label=application${PROJECT_NAME} | xargs -I ARGS docker rmi -f ARGS
	@ docker system prune
	@ ${SUCCESS} "Clean complete"

ssh:
	docker-compose -f ${DOCKER_DEV_COMPOSE_FILE} exec doorward_frontend sh


# COLORS
GREEN	:= $(shell tput -Txterm setaf 2)
YELLOW 	:= $(shell tput -Txterm setaf 3)
WHITE	:= $(shell tput -Txterm setaf 7)
NC		:= "\e[0m"
RESET 	:= $(shell tput -Txterm sgr0)

# SHELL FUNCTIONS
INFO 	:= @bash -c 'printf "\n"; printf $(YELLOW); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
SUCCESS	:= @bash -c 'printf "\n"; printf $(GREEN); echo "===> $$1"; printf "\n"; printf $(NC)' SOME_VALUE
