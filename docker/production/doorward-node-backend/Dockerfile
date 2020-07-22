ARG APP_VERSION=1.0.0

FROM doorward:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN cd /usr/app/

RUN yarn install

RUN yarn build doorward-node-backend --prod

RUN cp .env dist/apps/doorward-node-backend/.env

RUN chmod +x docker/production/doorward-node-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-node-backend/entrypoint.sh"]
