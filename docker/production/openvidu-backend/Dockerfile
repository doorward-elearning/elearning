ARG APP_VERSION=1.0.0

FROM 210607809234.dkr.ecr.ap-south-1.amazonaws.com/doorward-elearning/doorward:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN cd /usr/app/

RUN yarn install

RUN yarn build openvidu-backend --prod

RUN cp .env dist/apps/openvidu-backend/.env

RUN chmod +x docker/production/openvidu-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/openvidu-backend/entrypoint.sh"]
