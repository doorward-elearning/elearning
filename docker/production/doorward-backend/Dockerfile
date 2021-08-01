ARG APP_VERSION=1.0.0

FROM 210607809234.dkr.ecr.ap-south-1.amazonaws.com/doorward-elearning/doorward:$APP_VERSION

EXPOSE 7000

COPY . /usr/app

RUN cd /usr/app/

RUN yarn install

RUN yarn build doorward-backend --prod

RUN cp .envexample dist/apps/doorward-backend/.env

RUN node/buildOrganizationConfig.js

RUN chmod +x docker/production/doorward-backend/entrypoint.sh

ENTRYPOINT ["/usr/app/docker/production/doorward-backend/entrypoint.sh"]
