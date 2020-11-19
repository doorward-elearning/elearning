ARG APP_VERSION=1.0.0

FROM doorward:$APP_VERSION

RUN npm install -g serve

COPY . /usr/app

RUN yarn install

EXPOSE 5000

RUN chmod +x /usr/app/docker/production/doorward-meet/entrypoint.sh

RUN cd /usr/app && yarn build:meeting

ENTRYPOINT ["/usr/app/docker/production/doorward-meet/entrypoint.sh"]
