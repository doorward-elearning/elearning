ARG APP_VERSION=1.0.0

FROM edudoor:$APP_VERSION

EXPOSE 3333

COPY . /usr/app

RUN yarn install

RUN chmod +x /usr/app/docker/production/openvidu-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/openvidu-backend/entrypoint.sh"]
