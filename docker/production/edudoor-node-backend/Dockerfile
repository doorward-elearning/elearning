ARG APP_VERSION
FROM edudoor:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN yarn install

RUN chmod +x /usr/app/docker/production/edudoor-node-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/edudoor-node-backend/entrypoint.sh"]
