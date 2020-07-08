ARG APP_VERSION=1.0.0

FROM doorward:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN yarn install

RUN chmod +x /usr/app/docker/production/doorward-node-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-node-backend/entrypoint.sh"]
