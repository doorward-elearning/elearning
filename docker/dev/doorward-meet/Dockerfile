FROM node:12.18

LABEL MAINTAINER="Moses Gitau <gitaumoses4@gmail.com>"
LABEL APPLICATION="doorward"

RUN npm install -g serve

COPY /apps/jitsi-meet/dist /usr/app
COPY docker/production/doorward-meet/entrypoint.sh /usr/app

EXPOSE 5000

RUN chmod +x /usr/app/entrypoint.sh

RUN chmod +x /usr/app/serve-static.sh

ENTRYPOINT ["/usr/app/entrypoint.sh"]
