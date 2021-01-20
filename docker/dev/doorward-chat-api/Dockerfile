ARG APP_VERSION=1.0.0

FROM core.harbor.doorward.tech/doorward/doorward@sha256:$APP_VERSION

EXPOSE 7001

COPY . /usr/app

RUN cd /usr/app/

RUN yarn install

RUN yarn build doorward-chat-api --prod

RUN cp .env dist/apps/doorward-chat-api/.env

RUN chmod +x docker/production/doorward-chat-api/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-chat-api/entrypoint.sh"]
