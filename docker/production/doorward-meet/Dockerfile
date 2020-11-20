FROM node:12.18

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com>"
LABEL APPLICATION="doorward"

RUN npm install -g serve

COPY /apps/jitsi-meet /usr/app
COPY /docker/production/doorward-meet/entrypoint.sh /usr/app

RUN npm install

EXPOSE 5000

RUN chmod +x /usr/app/entrypoint.sh

RUN cd /usr/app && make build

ENTRYPOINT ["/usr/app/entrypoint.sh"]
