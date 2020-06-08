ARG APP_VERSION=1.0.0

FROM edudoor:$APP_VERSION

RUN npm install -g serve

COPY . /usr/app

RUN yarn install

EXPOSE 5000

RUN chmod +x /usr/app/docker/production/edudoor-website/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/edudoor-website/entrypoint.sh"]
