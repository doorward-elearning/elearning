ARG APP_VERSION=1.0.0

FROM edudoor:$APP_VERSION

RUN npm install -g serve

COPY . /usr/app

RUN yarn install

EXPOSE 5000

RUN chmod +x /usr/app/docker/production/edudoor-frontend/entrypoint.sh

RUN yarn build edudoor-frontend

ENTRYPOINT ["serve", "-s", "/usr/app/dist/apps/edudoor-frontend/index.html"]
