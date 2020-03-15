ARG APP_VERSION

FROM edudoor:${APP_VERSION}

RUN chmod +x /usr/app/docker/production/edudoor-frontend/entrypoint.sh

RUN npm install -g serve

COPY . /usr/app

RUN yarn install

EXPOSE 5000

ENTRYPOINT ["/usr/app/docker/production/edudoor-frontend/entrypoint.sh"]
